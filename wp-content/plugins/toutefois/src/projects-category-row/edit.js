import { InspectorControls } from "@wordpress/block-editor";
import {
  Notice,
  PanelBody,
  SelectControl,
  Spinner,
  ToggleControl,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useMemo, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

const CPT_SLUG = "projet";
const TAXONOMY = "category"; // or 'project_category'
const TAX_REST_BASE =
  TAXONOMY === "category" ? "categories" : "project_category";
const PREVIEW_LIMIT = 6;

// simple helper to indent hierarchical options
const labelWithDepth = (name, depth) => `${"— ".repeat(depth)}${name}`;

export default function Edit({ attributes, setAttributes }) {
  const { category: categoryAttr /* store ID as string */ } = attributes;

  const [includeChildren, setIncludeChildren] = useState(true);

  const categoryId = useMemo(() => {
    const n = Number(categoryAttr);
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [categoryAttr]);

  // --- TERMS (light payload)
  const { terms, termsIsResolving, termsError } = useSelect((select) => {
    const core = select("core");
    const query = {
      per_page: -1,
      _fields: "id,name,parent,slug",
      context: "view",
    };
    const isResolving = select("core/data").isResolving(
      "core",
      "getEntityRecords",
      ["taxonomy", TAXONOMY, query]
    );

    return {
      terms: core.getEntityRecords("taxonomy", TAXONOMY, query),
      termsIsResolving: isResolving,
      termsError:
        core.getLastEntityRecordsError?.("taxonomy", TAXONOMY, query) ?? null,
    };
  }, []);

  // Build a map for quick depth/children traversal
  const { options, descendantsById } = useMemo(() => {
    if (!terms)
      return {
        options: [{ label: __("All", "toutefois"), value: "" }],
        descendantsById: new Map(),
      };

    const byParent = new Map();
    terms.forEach((t) => {
      const list = byParent.get(t.parent || 0) || [];
      list.push(t);
      byParent.set(t.parent || 0, list);
    });

    // depth-first build of options to retain hierarchy ordering
    const result = [{ label: __("All", "toutefois"), value: "" }];
    const descendants = new Map();

    const walk = (parentId = 0, depth = 0) => {
      const children = (byParent.get(parentId) || []).sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );
      children.forEach((t) => {
        result.push({
          label: labelWithDepth(t.name, depth),
          value: String(t.id),
        });
        // compute descendants list for quick inclusion later
        const stack = [t.id];
        const acc = new Set([t.id]);
        while (stack.length) {
          const cur = stack.pop();
          const kids = byParent.get(cur) || [];
          kids.forEach((k) => {
            if (!acc.has(k.id)) {
              acc.add(k.id);
              stack.push(k.id);
            }
          });
        }
        descendants.set(t.id, Array.from(acc));
        // continue DFS
        walk(t.id, depth + 1);
      });
    };

    walk(0, 0);
    return { options: result, descendantsById: descendants };
  }, [terms]);

  // --- POST QUERY
  const categoriesFilter = useMemo(() => {
    if (!categoryId) return undefined;
    if (!includeChildren) return [categoryId];
    // include selected + all descendants (if any)
    const all = descendantsById.get(categoryId) || [categoryId];
    return all;
  }, [categoryId, includeChildren, descendantsById]);

  const postsQuery = useMemo(() => {
    const q = {
      per_page: PREVIEW_LIMIT,
      _embed: true,
      _fields:
        "id,slug,title,featured_media,_embedded.wp:featuredmedia.media_details.sizes",
      orderby: "date",
      order: "desc",
      status: "publish",
      context: "view",
    };
    if (categoriesFilter) {
      q[TAX_REST_BASE] = categoriesFilter;
    }
    return q;
  }, [categoriesFilter]);

  const { posts, postsIsResolving, postsError } = useSelect(
    (select) => {
      const core = select("core");
      const isResolving = select("core/data").isResolving(
        "core",
        "getEntityRecords",
        ["postType", CPT_SLUG, postsQuery]
      );
      return {
        posts: core.getEntityRecords("postType", CPT_SLUG, postsQuery),
        postsIsResolving: isResolving,
        postsError:
          core.getLastEntityRecordsError?.("postType", CPT_SLUG, postsQuery) ??
          null,
      };
    },
    [postsQuery]
  );

  const getThumb = (post) => {
    const sizes =
      post?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes || null;
    // prefer medium_large > medium > thumbnail
    const src =
      sizes?.medium_large?.source_url ||
      sizes?.medium?.source_url ||
      sizes?.thumbnail?.source_url ||
      null;
    return src;
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Projects Row Settings", "toutefois")} initialOpen>
          <SelectControl
            label={__("Category", "toutefois")}
            value={categoryAttr || ""}
            options={options}
            onChange={(val) => setAttributes({ category: val })}
            help={
              TAXONOMY === "category"
                ? __("Filters by WordPress “Categories”.", "toutefois")
                : __("Filters by custom taxonomy.", "toutefois")
            }
          />
          <ToggleControl
            label={__("Include child categories in preview", "toutefois")}
            checked={includeChildren}
            onChange={setIncludeChildren}
          />
        </PanelBody>
      </InspectorControls>

      <div
        className="toutefois-projects-row__preview"
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        }}
      >
        {(termsIsResolving || postsIsResolving) && <Spinner />}

        {termsError && (
          <Notice status="error" isDismissible={false}>
            {__("Failed to load categories.", "toutefois")}
          </Notice>
        )}

        {postsError && (
          <Notice status="error" isDismissible={false}>
            {__("Failed to load projects.", "toutefois")}
          </Notice>
        )}

        {!termsIsResolving &&
          !postsIsResolving &&
          posts &&
          posts.length === 0 && (
            <Notice status="info" isDismissible={false}>
              {__("No projects found for this selection.", "toutefois")}
            </Notice>
          )}

        {!postsIsResolving &&
          Array.isArray(posts) &&
          posts.map((p) => {
            const thumb = getThumb(p);
            return (
              <div
                key={p.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                {thumb ? (
                  <img
                    src={thumb}
                    alt=""
                    style={{
                      width: "100%",
                      display: "block",
                      aspectRatio: "16 / 9",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div
                    style={{
                      background: "#f2f2f2",
                      width: "100%",
                      aspectRatio: "16 / 9",
                    }}
                  />
                )}
                <div style={{ padding: 10 }}>
                  <strong style={{ display: "block", marginBottom: 6 }}>
                    {p.title?.rendered || __("(No title)", "toutefois")}
                  </strong>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

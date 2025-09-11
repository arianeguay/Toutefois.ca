import { InspectorControls } from "@wordpress/block-editor";
import {
  Notice,
  PanelBody,
  SelectControl,
  Spinner,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useMemo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

// --- CONFIG ---
// If you use the default "Categories", keep TAXONOMY = 'category' and TAX_REST_BASE = 'categories'.
// For a custom taxonomy (e.g. 'project_category'), set TAXONOMY = 'project_category' and TAX_REST_BASE = 'project_category'.
const CPT_SLUG = "projets"; // your CPT slug (post_type)
const TAXONOMY = "category"; // or 'project_category'
const TAX_REST_BASE =
  TAXONOMY === "category" ? "categories" : "project_category";
const PREVIEW_LIMIT = 6;

export default function Edit({ attributes, setAttributes }) {
  const {
    category /* storing ID is better; if you already store slug, see note below */,
  } = attributes;

  // Load taxonomy terms
  const terms = useSelect(
    (select) =>
      select("core").getEntityRecords("taxonomy", TAXONOMY, { per_page: -1 }),
    []
  );

  // Coerce value to a number if you store IDs as strings
  const categoryId = useMemo(() => {
    if (!category) return null;
    const n = Number(category);
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [category]);

  // Build query for CPT, filtered by taxonomy (IDs)
  const cptQuery = useMemo(() => {
    const q = { per_page: PREVIEW_LIMIT, _embed: true };
    if (categoryId) {
      // Filter by taxonomy. For default categories use 'categories', for custom use its rest_base.
      q[TAX_REST_BASE] = [categoryId];
    }
    return q;
  }, [categoryId]);

  // Fetch CPT posts
  const posts = useSelect(
    (select) => select("core").getEntityRecords("postType", CPT_SLUG, cptQuery),
    [cptQuery]
  );

  // Build select options
  const options = useMemo(() => {
    const base = [{ label: __("All", "toutefois"), value: "" }];
    if (!terms) return base;
    return base.concat(
      terms.map((t) => ({
        label: t.name,
        value: String(t.id), // store ID as string in attributes
      }))
    );
  }, [terms]);

  // Helpers to read featured media from _embed
  const getThumb = (post) => {
    const media =
      post?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
        ?.medium ||
      post?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
        ?.thumbnail;
    return media ? media.source_url : null;
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Projects Row Settings", "toutefois")}>
          <SelectControl
            label={__("Category", "toutefois")}
            value={category || ""}
            options={options}
            onChange={(val) => setAttributes({ category: val })}
            help={
              TAXONOMY === "category"
                ? __("Filters by WordPress “Categories”.", "toutefois")
                : __("Filters by custom taxonomy.", "toutefois")
            }
          />
        </PanelBody>
      </InspectorControls>

      {/* Editor Preview */}
      <div
        className="toutefois-projects-row__preview"
        style={{
          display: "grid",
          gap: "12px",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        }}
      >
        {!terms && <Spinner />}

        {terms && posts === undefined && (
          <div style={{ gridColumn: "1 / -1" }}>
            <Spinner />
          </div>
        )}

        {terms && posts && posts.length === 0 && (
          <Notice status="info" isDismissible={false}>
            {__("No projects found for this selection.", "toutefois")}
          </Notice>
        )}

        {posts &&
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
                  {/* Optional: small taxonomy badges */}
                  {/* <small style={{ opacity: 0.7 }}>{/* badges here */}
                  {/*}</small> */}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

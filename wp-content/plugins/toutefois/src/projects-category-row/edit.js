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

const CPT_SLUG = "projet";
const TAXONOMY = "category"; // keep using the categories endpoint
const TAX_REST_BASE = "categories"; // wp/v2/categories
const PREVIEW_LIMIT = 4; // tiny to avoid load

export default function Edit({ attributes, setAttributes }) {
  const { category } = attributes; // store category ID as string

  // --- Load categories (id + name only)
  const terms = useSelect(
    (select) =>
      select("core").getEntityRecords("taxonomy", TAXONOMY, {
        per_page: -1,
        _fields: "id,name",
        context: "view",
      }),
    []
  );

  const options = useMemo(() => {
    const base = [{ label: __("All", "toutefois"), value: "" }];
    if (!Array.isArray(terms)) return base;
    return base.concat(
      terms
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((t) => ({ label: t.name, value: String(t.id) }))
    );
  }, [terms]);

  const categoryId = useMemo(() => {
    const n = Number(category);
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [category]);

  // --- Fetch posts (title only)
  const posts = useSelect(
    (select) => {
      const query = {
        per_page: PREVIEW_LIMIT,
        _fields: "id,title.rendered",
        orderby: "date",
        order: "desc",
        status: "publish",
        context: "view",
      };
      if (categoryId) query[TAX_REST_BASE] = [categoryId];
      return select("core").getEntityRecords("postType", CPT_SLUG, query);
    },
    [categoryId]
  );

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Projects Row Settings", "toutefois")} initialOpen>
          <SelectControl
            label={__("Category", "toutefois")}
            value={category || ""}
            options={options}
            onChange={(val) => setAttributes({ category: val })}
            help={__("Filters by WordPress “Categories”.", "toutefois")}
          />
        </PanelBody>
      </InspectorControls>

      <div
        className="toutefois-projects-row__preview"
        style={{ display: "grid", gap: 8 }}
      >
        {!terms || posts === undefined ? (
          <Spinner />
        ) : Array.isArray(posts) && posts.length > 0 ? (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {posts.map((p) => (
              <li key={p.id} style={{ lineHeight: 1.4 }}>
                {p.title?.rendered || __("(No title)", "toutefois")}
              </li>
            ))}
          </ul>
        ) : (
          <Notice status="info" isDismissible={false}>
            {__("No projects found for this selection.", "toutefois")}
          </Notice>
        )}
      </div>
    </>
  );
}

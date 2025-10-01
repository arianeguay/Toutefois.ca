import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  SelectControl,
  TextControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes, setAttributes }) {
  const {
    contentType,
    title,
    viewAllUrl,
    viewAllText,
    limit,
    noContentText,
    description,
    newsSource,
    facebookPageId,
  } = attributes;

  // Default titles based on content type
  const getDefaultTitle = () => {
    switch (contentType) {
      case "project":
        return __("Nos projets", "toutefois-blocks");
      case "news":
        return __("Quoi de neuf?", "toutefois-blocks");
      case "mixed":
        return __("Contenu récent", "toutefois-blocks");
      default:
        return "";
    }
  };

  // Default view all URL based on content type
  const getDefaultViewAllUrl = () => {
    switch (contentType) {
      case "project":
        return "/projets";
      case "news":
        return "/archives";
      case "mixed":
        return "/";
      default:
        return "";
    }
  };

  // Default view all text based on content type
  const getDefaultViewAllText = () => {
    switch (contentType) {
      case "project":
        return __("Voir tous les projets", "toutefois-blocks");
      case "news":
        return __("Voir tous les articles", "toutefois-blocks");
      case "mixed":
        return __("Voir tout", "toutefois-blocks");
      default:
        return "";
    }
  };

  // Update placeholders when content type changes
  const handleContentTypeChange = (newContentType) => {
    setAttributes({
      contentType: newContentType,
      title: title || getDefaultTitle(),
      viewAllUrl: viewAllUrl || getDefaultViewAllUrl(),
      viewAllText: viewAllText || getDefaultViewAllText(),
    });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Content Carousel Settings", "toutefois-blocks")}>
          <SelectControl
            label={__("Content Type", "toutefois-blocks")}
            value={contentType}
            options={[
              { label: __("Projects", "toutefois-blocks"), value: "project" },
              { label: __("News", "toutefois-blocks"), value: "news" },
              {
                label: __("Mixed (Projects & News)", "toutefois-blocks"),
                value: "mixed",
              },
            ]}
            onChange={handleContentTypeChange}
          />
          {contentType === "news" && (
            <>
              <SelectControl
                label={__("News Source", "toutefois-blocks")}
                value={newsSource || "both"}
                options={[
                  { label: __("Facebook Only", "toutefois-blocks"), value: "facebook" },
                  { label: __("WP News Only", "toutefois-blocks"), value: "wp" },
                  { label: __("Both", "toutefois-blocks"), value: "both" },
                ]}
                onChange={(value) => setAttributes({ newsSource: value })}
              />
              <TextControl
                label={__("Facebook Page ID (optional)", "toutefois-blocks")}
                help={__("Leave empty to use the default Toutefois page.", "toutefois-blocks")}
                value={facebookPageId}
                onChange={(value) => setAttributes({ facebookPageId: value })}
              />
            </>
          )}
          <TextControl
            label={__("Title", "toutefois-blocks")}
            value={title}
            placeholder={getDefaultTitle()}
            onChange={(value) => setAttributes({ title: value })}
          />
          <TextControl
            label={__("Description", "toutefois-blocks")}
            value={description}
            onChange={(value) => setAttributes({ description: value })}
          />
          <TextControl
            label={__("View All URL", "toutefois-blocks")}
            value={viewAllUrl}
            placeholder={getDefaultViewAllUrl()}
            onChange={(value) => setAttributes({ viewAllUrl: value })}
          />
          <TextControl
            label={__("View All Text", "toutefois-blocks")}
            value={viewAllText}
            placeholder={getDefaultViewAllText()}
            onChange={(value) => setAttributes({ viewAllText: value })}
          />
          <TextControl
            label={__("Limit", "toutefois-blocks")}
            value={limit}
            onChange={(value) => setAttributes({ limit: value })}
          />
          <TextControl
            label={__("No Content Text", "toutefois-blocks")}
            value={noContentText}
            onChange={(value) => setAttributes({ noContentText: value })}
          />
          <RangeControl
            label={__("Item Limit", "toutefois-blocks")}
            value={limit}
            onChange={(value) => setAttributes({ limit: value })}
            min={1}
            max={20}
          />
        </PanelBody>
      </InspectorControls>

      <div {...useBlockProps()}>
        <div className="wp-block-toutefois-content-carousel-placeholder">
          <h3>{__("Content Carousel", "toutefois-blocks")}</h3>
          <p>
            {contentType === "project" &&
              __("Displaying recent projects", "toutefois-blocks")}
            {contentType === "news" &&
              __("Displaying recent news", "toutefois-blocks")}
            {contentType === "mixed" &&
              __("Displaying recent projects and news", "toutefois-blocks")}
          </p>
          <p>
            {__("Limit:", "toutefois-blocks")} {limit}
          </p>
          <p>
            {__("Title:", "toutefois-blocks")} {title || getDefaultTitle()}
          </p>
          <p>
            {__(
              "This block will be rendered as a carousel in the frontend.",
              "toutefois-blocks"
            )}
          </p>
        </div>
      </div>
    </>
  );
}

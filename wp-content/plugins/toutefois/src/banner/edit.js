import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
} from "@wordpress/block-editor";
import {
  Button,
  ColorPalette,
  PanelBody,
  SelectControl,
  TextControl,
  ToggleControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes, setAttributes }) {
  const {
    title,
    description,
    image,
    font,
    verticalAlignment,
    horizontalAlignment,
    objectPosition,
    textColor,
    textShadowColor,
    template,
    blurredBackground,
    height,
    heightUnit,
    backgroundMode,
    backgroundColor,
    backgroundSvg,
  } = attributes;

  // Wrapper props with data-attributes for theme CSS hooks
  const wrapperProps = useBlockProps({
    className: "wp-block-toutefois-banner",
{{ ... }}
    "data-va": verticalAlignment,
    "data-ha": horizontalAlignment,
    "data-blurred": blurredBackground ? "1" : "0",
    "data-height": height,
    "data-height-unit": heightUnit,
    "data-background-mode": backgroundMode,
  });

  // Background preview styles based on mode
  const bgBase = {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  };

  let bgStyles = { ...bgBase };
  if (backgroundMode === "image") {
    bgStyles = {
      ...bgBase,
      backgroundImage: image?.url ? `url(${image.url})` : undefined,
      backgroundSize: "cover",
      backgroundPosition: objectPosition || "50% 50%",
      filter: blurredBackground ? "blur(4px)" : undefined,
      backgroundColor: image?.url ? undefined : backgroundColor || "#f0f0f0",
      border: image?.url ? undefined : "1px dashed #ccc",
    };
  } else if (backgroundMode === "color") {
    bgStyles = {
      ...bgBase,
      backgroundColor: backgroundColor || "#f0f0f0",
    };
  } else if (backgroundMode === "svg") {
    bgStyles = {
      ...bgBase,
      backgroundColor: backgroundColor || "transparent",
    };
  }

  const contentStyles = {
    position: "absolute",
    top: 0,
    left: 0,
{{ ... }}
              { label: "No Margin", value: "no-margin" },
              { label: "With Banner", value: "with-banner" },
              { label: "With Title", value: "with-title" },
            ]}
          />
          <SelectControl
            label={__("Background Mode", "toutefois")}
            value={backgroundMode || "image"}
            onChange={(value) => setAttributes({ backgroundMode: value })}
            options={[
              { label: __("Image", "toutefois"), value: "image" },
              { label: __("Color", "toutefois"), value: "color" },
              { label: __("SVG", "toutefois"), value: "svg" },
            ]}
          />
          {backgroundMode !== "color" && (
            <ToggleControl
              label={__("Blurred Background", "toutefois")}
              checked={!!blurredBackground}
              onChange={(value) => setAttributes({ blurredBackground: value })}
              help={__("Applies to image backgrounds", "toutefois")}
            />
          )}
          <SelectControl
            label={__("Font", "toutefois")}
            value={font}
            onChange={(value) => setAttributes({ font: value })}
            options={[
{{ ... }}
              { label: "Left", value: "flex-start" },
              { label: "Center", value: "center" },
              { label: "Right", value: "flex-end" },
            ]}
          />
          {backgroundMode === "image" && (
            <>
              <MediaUploadCheck>
                <MediaUpload
                  onAllowedTypes={["image"]}
                  value={image ? image.id : ""}
                  onSelect={onSelectImage}
                  render={({ open }) => (
                    <Button onClick={open} isPrimary>
                      {__("Choose Image", "toutefois")}
                    </Button>
                  )}
                />
              </MediaUploadCheck>
              <TextControl
                label={__("Image Position", "toutefois")}
                value={objectPosition}
                onChange={(value) => setAttributes({ objectPosition: value })}
                help={__('e.g., "center top", "25% 75%"', "toutefois")}
              />
            </>
          )}
          {(backgroundMode === "color" || backgroundMode === "image" || backgroundMode === "svg") && (
            <>
              <p>
                <strong>{__("Background Color", "toutefois")}</strong>
              </p>
              <ColorPalette
                value={backgroundColor}
                onChange={(value) => setAttributes({ backgroundColor: value })}
              />
            </>
          )}
          {backgroundMode === "svg" && (
            <TextControl
              label={__("SVG Markup", "toutefois")}
              help={__("Paste inline SVG markup.", "toutefois")}
              value={backgroundSvg}
              onChange={(value) => setAttributes({ backgroundSvg: value })}
              rows={4}
            />
          )}
          <p>
            <strong>{__("Text Color", "toutefois")}</strong>
          </p>
          <ColorPalette
            value={textColor}
{{ ... }}
            />
          </div>
        </PanelBody>
      </InspectorControls>
      <div {...wrapperProps}>
        <div className="toutefois-banner__bg" style={bgStyles}>
          {backgroundMode === "svg" && backgroundSvg && (
            <div
              className="toutefois-banner__bg-svg"
              style={{ position: "absolute", inset: 0 }}
              dangerouslySetInnerHTML={{ __html: backgroundSvg }}
            />
          )}
        </div>
        <div className="toutefois-banner__content" style={contentStyles}>
          <div
            className="toutefois-banner__body"
            style={{
              display: "flex",
{{ ... }}
              {title}
            </h1>
            <p className="toutefois-banner__description" style={{ width: "fit-content" }}>
              {description}
            </p>
            {backgroundMode === "image" && !image && (
              <p style={{ marginTop: "8px", opacity: 0.8 }}>
                {__("Please select an image", "toutefois")}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

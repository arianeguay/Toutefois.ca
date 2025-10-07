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
    bigTextShadow,
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
    style: {
      position: "relative",
      height: height || "350px",
      width: "100%",
      marginBottom: "24px",
    },
    "data-va": verticalAlignment,
    "data-ha": horizontalAlignment,
    "data-blurred": blurredBackground ? "1" : "0",
    "data-height": height,
    "data-height-unit": heightUnit,
    "data-background-mode": backgroundMode,
    "data-big-text-shadow": bigTextShadow ? "1" : "0",
    "data-background-svg": backgroundSvg ? "1" : "0",
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
    right: 0,
    bottom: 0,
    zIndex: 1,
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: horizontalAlignment,
    justifyContent: verticalAlignment,
    textAlign:
      horizontalAlignment === "flex-start"
        ? "left"
        : horizontalAlignment === "flex-end"
        ? "right"
        : "center",
    color: textColor,
  };

  const headingStyle = {
    width: "fit-content",
    fontFamily: font || "Poppins, sans-serif",
    textShadow: bigTextShadow
      ? `4px 3px 0px ${textShadowColor}`
      : `1px 1px 3px ${textShadowColor}`,
    margin: 0,
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Banner Settings", "toutefois")}>
          <TextControl
            label={__("Title", "toutefois")}
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />
          <TextControl
            label={__("Description", "toutefois")}
            value={description}
            onChange={(value) => setAttributes({ description: value })}
          />
          <SelectControl
            label={__("Template", "toutefois")}
            value={template}
            onChange={(value) => setAttributes({ template: value })}
            options={[
              { label: "Default", value: "default" },
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
              { label: "Poppins", value: "Poppins" },
              { label: "Cerebri", value: "Cerebri" },
              { label: "Gagalin", value: "Gagalin" },
              { label: "Montserrat", value: "Montserrat" },
            ]}
          />
          <SelectControl
            label={__("Vertical Alignment", "toutefois")}
            value={verticalAlignment}
            onChange={(value) => setAttributes({ verticalAlignment: value })}
            options={[
              { label: "Top", value: "flex-start" },
              { label: "Center", value: "center" },
              { label: "Bottom", value: "flex-end" },
            ]}
          />
          <SelectControl
            label={__("Horizontal Alignment", "toutefois")}
            value={horizontalAlignment}
            onChange={(value) => setAttributes({ horizontalAlignment: value })}
            options={[
              { label: "Left", value: "flex-start" },
              { label: "Center", value: "center" },
              { label: "Right", value: "flex-end" },
            ]}
          />
          <p>
            <strong>{__("Text Color", "toutefois")}</strong>
          </p>
          <ColorPalette
            value={textColor}
            onChange={(value) => setAttributes({ textColor: value })}
          />
          <ToggleControl
            label={__("Big Text Shadow", "toutefois")}
            checked={bigTextShadow}
            onChange={() => setAttributes({ bigTextShadow: !bigTextShadow })}
          />
          <p>
            <strong>{__("Text Shadow Color", "toutefois")}</strong>
          </p>
          <ColorPalette
            value={textShadowColor}
            onChange={(value) => setAttributes({ textShadowColor: value })}
          />
          <div style={{ marginTop: "16px" }}>
            <TextControl
              label={__('Banner Height', 'toutefois')}
              type="number"
              value={height?.replace ? height.replace(/[^0-9.]/g, '') : height}
              onChange={(value) => {
                const numValue = parseFloat(value);
                if (!isNaN(numValue) && numValue > 0) {
                  setAttributes({ height: `${numValue}${heightUnit}` });
                }
              }}
            />
            <SelectControl
              label={__('Height Unit', 'toutefois')}
              value={heightUnit}
              options={[
                { label: 'px', value: 'px' },
                { label: '%', value: '%' },
                { label: 'vh', value: 'vh' },
                { label: 'rem', value: 'rem' },
              ]}
              onChange={(value) => {
                setAttributes({ heightUnit: value });
                const heightValue = height?.replace ? parseFloat(height.replace(/[^0-9.]/g, '')) : 350;
                setAttributes({ height: `${heightValue}${value}` });
              }}
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
              flexDirection: "column",
              height: "100%",
              alignItems: horizontalAlignment,
              justifyContent: verticalAlignment,
              textAlign:
                horizontalAlignment === "flex-start"
                  ? "left"
                  : horizontalAlignment === "flex-end"
                  ? "right"
                  : "center",
              color: textColor,
            }}
          >
            <h1 className="toutefois-banner__title" style={headingStyle}>
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

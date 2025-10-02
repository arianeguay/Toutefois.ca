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
  } = attributes;

  // Wrapper props with data-attributes for theme CSS hooks
  const wrapperProps = useBlockProps({
    className: "wp-block-toutefois-banner",
    style: {
      position: "relative",
      height: "300px",
      width: "100%",
      marginBottom: "24px",
    },
    "data-template": template,
    "data-va": verticalAlignment,
    "data-ha": horizontalAlignment,
    "data-blurred": blurredBackground ? "1" : "0",
  });

  const bgStyles = {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundImage: image?.url ? `url(${image.url})` : undefined,
    backgroundSize: "cover",
    backgroundPosition: objectPosition || "50% 50%",
    filter: blurredBackground ? "blur(4px)" : undefined,
    backgroundColor: image?.url ? undefined : "#f0f0f0",
    border: image?.url ? undefined : "1px dashed #ccc",
  };

  const contentStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    padding: "16px",
  };

  const headingStyle = {
    width: "fit-content",
    fontFamily: font || "Poppins, sans-serif",
    textShadow: bigTextShadow
      ? `4px 3px 0px ${textShadowColor}`
      : `1px 1px 3px ${textShadowColor}`,
    margin: 0,
  };

  const onSelectImage = (media) => {
    setAttributes({ image: media });
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
          <ToggleControl
            label={__("Blurred Background", "toutefois")}
            checked={blurredBackground}
            onChange={(value) => setAttributes({ blurredBackground: value })}
          />
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
        </PanelBody>
      </InspectorControls>
      <div {...wrapperProps}>
        <div className="toutefois-banner__bg" style={bgStyles} />
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
            {!image && (
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

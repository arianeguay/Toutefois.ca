import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
} from "@wordpress/block-editor";
import {
  Button,
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
    fullWidth,
  } = attributes;

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
            label={__("Font", "toutefois")}
            value={font}
            onChange={(value) => setAttributes({ font: value })}
            options={[
              { label: "Poppins", value: "Poppins" },
              // Add other fonts here
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
          <ToggleControl
            label={__("Full Width", "toutefois")}
            checked={fullWidth}
            onChange={() => setAttributes({ fullWidth: !fullWidth })}
          />
        </PanelBody>
      </InspectorControls>
      <div
        {...useBlockProps()}
        style={{
          position: "relative",
          width: fullWidth ? "100%" : "auto",
          margin: fullWidth ? "0" : "0 2rem",
        }}
      >
        {image && (
          <img
            src={image.url}
            alt={title}
            style={{ width: "100%", height: 300, objectFit: "cover" }}
          />
        )}
        <div
          style={{
            display: "flex",
            alignItems: verticalAlignment,
            justifyContent: horizontalAlignment,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h2 style={{ color: "#E1A42B" }}>{title}</h2>
          {!!description && <p style={{ color: "#E1A42B" }}>{description}</p>}
        </div>
      </div>
    </>
  );
}

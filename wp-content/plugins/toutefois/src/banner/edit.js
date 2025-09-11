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
  ColorPalette,
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
  } = attributes;

  const blockStyles = {
    position: 'relative',
    height: '300px',
    border: '1px dashed #ccc',
    backgroundColor: '#f0f0f0',
    width: '100%',
    ...(!image && {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
  };

  const imageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: objectPosition,
    position: 'absolute',
    top: 0,
    left: 0,
  };

  const contentStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: horizontalAlignment,
    justifyContent: verticalAlignment,
    textAlign: horizontalAlignment === 'flex-start' ? 'left' : horizontalAlignment === 'flex-end' ? 'right' : 'center',
    fontFamily: font || 'Poppins, sans-serif',
    color: textColor,
    textShadow: bigTextShadow ? '3px 3px 6px rgba(0,0,0,0.7)' : '1px 1px 3px rgba(0,0,0,0.5)',
    padding: '1rem',
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
            label={__("Font", "toutefois")}
            value={font}
            onChange={(value) => setAttributes({ font: value })}
            options={[
              { label: "Poppins", value: "Poppins" },
              { label: "Cerebri", value: "Cerebri" },
              { label: "Gagalin", value: "Gagalin" },
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
            label={__('Image Position', 'toutefois')}
            value={objectPosition}
            onChange={(value) => setAttributes({ objectPosition: value })}
            help={__('e.g., "center top", "25% 75%"', 'toutefois')}
          />
          <p><strong>{__('Text Color', 'toutefois')}</strong></p>
          <ColorPalette
            value={textColor}
            onChange={(value) => setAttributes({ textColor: value })}
          />
          <ToggleControl
            label={__('Big Text Shadow', 'toutefois')}
            checked={bigTextShadow}
            onChange={() => setAttributes({ bigTextShadow: !bigTextShadow })}
          />
        </PanelBody>
      </InspectorControls>
      <div {...useBlockProps({ style: blockStyles })}>
        {image && <img src={image.url} alt={title} style={imageStyles} />}
        {!image && <p>{__('Please select an image', 'toutefois')}</p>}
        <div style={contentStyles}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}

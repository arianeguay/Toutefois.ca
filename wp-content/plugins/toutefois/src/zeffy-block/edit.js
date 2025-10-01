import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import {
  __experimentalNumberControl as NumberControl,
  PanelBody,
  TextControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes, setAttributes }) {
  const { src: attrSrc, height: attrHeight = 600 } = attributes; // store ID as string

  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        <PanelBody title={__("Zeffy Block Settings", "toutefois")} initialOpen>
          <TextControl
            label={__("Zeffy Block URL", "toutefois")}
            value={attrSrc || ""}
            onChange={(val) => setAttributes({ src: val })}
          />
          <NumberControl
            label={__("Zeffy Block Height", "toutefois")}
            __next40pxDefaultSize
            isShiftStepEnabled={true}
            shiftStep={10}
            value={attrHeight}
            onChange={(val) => setAttributes({ height: val })}
          />
        </PanelBody>
      </InspectorControls>
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: attrHeight,
          display: "flex",
          alignItems: "stretch",
          flexDirection: "column",
        }}
      >
        {attrSrc ? (
          <iframe
            title="Zeffy Shop"
            src={attrSrc}
            style={{ width: "100%", height: "auto", border: "0" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <p>{__("No URL provided", "toutefois")}</p>
        )}
      </div>
    </div>
  );
}

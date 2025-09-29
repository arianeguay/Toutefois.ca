import { useBlockProps } from "@wordpress/block-editor";
import {
  __experimentalNumberControl as NumberControl,
  PanelBody,
  TextControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes, setAttributes }) {
  const { src: attrSrc, height: attrHeight } = attributes; // store ID as string

  return (
    <p {...useBlockProps()}>
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
      {__("Zeffy Block Placeholder", "toutefois-blocks")}
    </p>
  );
}

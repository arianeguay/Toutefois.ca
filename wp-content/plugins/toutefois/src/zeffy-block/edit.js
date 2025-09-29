import { useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export default function Edit() {
  return (
    <p {...useBlockProps()}>
      {__("Zeffy Block Placeholder", "toutefois-blocks")}
    </p>
  );
}

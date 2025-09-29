import { useBlockProps } from "@wordpress/block-editor";

export default function Save() {
  const blockProps = useBlockProps.save({
    'data-dynamic-block': 'true'
  });
  return <div {...blockProps}></div>;
}

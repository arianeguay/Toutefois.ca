const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType('toutefois/collaborators', {
    title: __('Collaborators', 'toutefois'),
    icon: 'groups',
    category: 'toutefois-blocks',
    attributes: {
        layout: {
            type: 'string',
            default: 'vertical',
        },
    },

    edit: (props) => {
        const { attributes, setAttributes } = props;

        return (
            <div>
                <InspectorControls>
                    <PanelBody title={__('Layout Settings', 'toutefois')}>
                        <SelectControl
                            label={__('Layout', 'toutefois')}
                            value={attributes.layout}
                            options={[
                                { label: __('Vertical', 'toutefois'), value: 'vertical' },
                                { label: __('Horizontal', 'toutefois'), value: 'horizontal' },
                            ]}
                            onChange={(newLayout) => setAttributes({ layout: newLayout })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center' }}>
                    <p>{__('Collaborators Block', 'toutefois')}</p>
                    <p><small>{__('Layout:', 'toutefois')} {attributes.layout}</small></p>
                    <p><small>{__('Content is rendered on the front-end.', 'toutefois')}</small></p>
                </div>
            </div>
        );
    },

    save: () => {
        // Rendering is handled by PHP, so save() returns null
        return null;
    },
});

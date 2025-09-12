import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { layout } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Layout Settings', 'toutefois-blocks')}>
                    <SelectControl
                        label={__('Layout', 'toutefois-blocks')}
                        value={layout}
                        options={[
                            { label: __('Vertical', 'toutefois-blocks'), value: 'vertical' },
                            { label: __('Horizontal', 'toutefois-blocks'), value: 'horizontal' },
                        ]}
                        onChange={(value) => setAttributes({ layout: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...useBlockProps()}>
                <div className="wp-block-toutefois-collaborators-placeholder">
                    <h3>{__('Collaborators', 'toutefois-blocks')}</h3>
                    <p>{__('Layout:', 'toutefois-blocks')} {layout}</p>
                    <p>{__('This block will be rendered in the frontend.', 'toutefois-blocks')}</p>
                </div>
            </div>
        </>
    );
}

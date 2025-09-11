import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { title, description, image, font, verticalAlignment, horizontalAlignment } = attributes;

	const onSelectImage = (media) => {
		setAttributes({ image: media });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Banner Settings', 'toutefois')}>
					<TextControl
						label={__('Title', 'toutefois')}
						value={title}
						onChange={(value) => setAttributes({ title: value })}
					/>
					<TextControl
						label={__('Description', 'toutefois')}
						value={description}
						onChange={(value) => setAttributes({ description: value })}
					/>
					<SelectControl
						label={__('Font', 'toutefois')}
						value={font}
						onChange={(value) => setAttributes({ font: value })}
						options={[
							{ label: 'Poppins', value: 'Poppins' },
							// Add other fonts here
						]}
					/>
					<SelectControl
						label={__('Vertical Alignment', 'toutefois')}
						value={verticalAlignment}
						onChange={(value) => setAttributes({ verticalAlignment: value })}
						options={[
							{ label: 'Top', value: 'flex-start' },
							{ label: 'Center', value: 'center' },
							{ label: 'Bottom', value: 'flex-end' },
						]}
					/>
					<SelectControl
						label={__('Horizontal Alignment', 'toutefois')}
						value={horizontalAlignment}
						onChange={(value) => setAttributes({ horizontalAlignment: value })}
						options={[
							{ label: 'Left', value: 'flex-start' },
							{ label: 'Center', value: 'center' },
							{ label: 'Right', value: 'flex-end' },
						]}
					/>
					<MediaUploadCheck>
						<MediaUpload
							onAllowedTypes={['image']}
							value={image ? image.id : ''}
							onSelect={onSelectImage}
							render={({ open }) => (
								<Button onClick={open} isPrimary>
									{__('Choose Image', 'toutefois')}
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				{image && <img src={image.url} alt={title} />}
				<h2>{title}</h2>
				<p>{description}</p>
			</div>
		</>
	);
}

import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
  const blockProps = useBlockProps({
    className: 'wp-block-toutefois-projects-list',
  });

  return (
    <div {...blockProps}>
      <h2 className="toutefois-projects-list__title">
        {__('All Projects', 'toutefois-blocks')}
      </h2>
      <ul className="projects-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={`project-${i}`} className="project-item">
            <div
              style={{
                width: '100%',
                aspectRatio: '16/9',
                background: '#f2f2f2',
                borderRadius: 4,
              }}
            />
            <strong style={{ display: 'block', marginTop: 8 }}>
              {__('Project', 'toutefois-blocks')} #{i + 1}
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

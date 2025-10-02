import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
  const blockProps = useBlockProps({
    className: 'wp-block-toutefois-news-list',
  });

  return (
    <div {...blockProps}>
      <h2 className="toutefois-news-list__title">{__('News', 'toutefois-blocks')}</h2>
      <ul className="news-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={`news-${i}`} className="news-item">
            <div
              style={{
                width: '100%',
                aspectRatio: '16/9',
                background: '#f2f2f2',
                borderRadius: 4,
              }}
            />
            <strong style={{ display: 'block', marginTop: 8 }}>
              {__('Article', 'toutefois-blocks')} #{i + 1}
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

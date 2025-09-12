import React from 'react';
import { createRoot } from 'react-dom/client';
import CollaboratorsBlock from './index';
import { CollaboratorsBlockProps } from './types';

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.toutefois-collaborators-block-react-root');
    elements.forEach(el => {
        const data = el.getAttribute('data-props');
        if (data) {
            const props: CollaboratorsBlockProps = JSON.parse(data);
            const root = createRoot(el);
            root.render(<CollaboratorsBlock {...props} />);
        }
    });
});

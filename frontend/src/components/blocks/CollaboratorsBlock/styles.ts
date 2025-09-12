import styled from 'styled-components';

interface ContainerProps {
    layout: 'vertical' | 'horizontal';
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: ${props => (props.layout === 'vertical' ? 'column' : 'row')};
    flex-wrap: ${props => (props.layout === 'horizontal' ? 'wrap' : 'nowrap')};
    gap: 2rem;
    justify-content: center;
`;

export const Card = styled.a`
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
    width: 300px; /* Adjust width as needed */

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;

export const Photo = styled.img`
    width: 100%;
    height: 200px; /* Adjust height as needed */
    object-fit: cover;
`;

export const Info = styled.div`
    padding: 1rem;
`;

export const Name = styled.h3`
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
`;

export const Position = styled.p`
    margin: 0 0 0.5rem;
    font-style: italic;
    color: #555;
`;

export const Excerpt = styled.p`
    margin: 0;
    font-size: 0.9rem;
    color: #333;
`;

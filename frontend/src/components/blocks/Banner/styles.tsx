import styled from 'styled-components';

interface BannerProps {
  image?: string;
  verticalAlignment?: string;
  horizontalAlignment?: string;
  font?: string;
  objectPosition?: string;
  textColor?: string;
  bigTextShadow?: boolean;
}

export const BannerContainer = styled.div<BannerProps>`
  position: relative;
  width: 100%;
  height: 300px; /* Or whatever height you prefer */
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-size: cover;
  background-position: ${({ objectPosition }) => objectPosition || '50% 50%'};
`;

export const ContentWrapper = styled.div<BannerProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: ${({ horizontalAlignment }) => horizontalAlignment || 'center'};
  justify-content: ${({ verticalAlignment }) => verticalAlignment || 'center'};
  width: 100%;
  height: 100%;
  text-align: ${({ horizontalAlignment }) => {
    switch (horizontalAlignment) {
      case 'flex-start':
        return 'left';
      case 'flex-end':
        return 'right';
      default:
        return 'center';
    }
  }};
  font-family: ${({ font }) => font || 'Poppins'}, sans-serif;
  color: ${({ textColor }) => textColor || '#FFFFFF'};

  h1, p {
    margin: 0;
    padding: 0 1rem;
    text-shadow: ${({ bigTextShadow }) => (bigTextShadow ? '3px 3px 6px rgba(0,0,0,0.7)' : '1px 1px 3px rgba(0,0,0,0.5)')};
  }
`;

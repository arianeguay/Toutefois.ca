import { ContentCover, ContentImage } from '../styles';

interface CardCoverProps {
  src: string | undefined;
  alt: string;
}
const CardCover: React.FC<CardCoverProps> = ({ src, alt }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/Logo.png';
    e.currentTarget.style.objectFit = 'contain';
  };
  return (
    <ContentCover>
      {src && <ContentImage src={src} alt={alt} onError={handleImageError} />}
    </ContentCover>
  );
};

export default CardCover;

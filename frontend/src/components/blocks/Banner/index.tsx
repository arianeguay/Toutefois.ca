'use client';
import { useEffect, useRef, useState } from 'react';
import { BannerContainer, ContentWrapper } from './styles';

const Banner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [attributes, setAttributes] = useState<any>({});

  useEffect(() => {
    if (ref.current) {
      const data = ref.current.dataset;
      setAttributes({
        title: data.title || '',
        description: data.description || '',
        image: data.image || '',
        font: data.font || 'Poppins',
        verticalAlignment: data.verticalAlignment || 'center',
        horizontalAlignment: data.horizontalAlignment || 'center',
        objectPosition: data.objectPosition || '50% 50%',
        textColor: data.textColor || '#FFFFFF',
        bigTextShadow: data.bigTextShadow === 'true',
        textShadowColor: data.textShadowColor || 'rgba(0,0,0,0.5)',
      });
    }
  }, []);

  return (
    <BannerContainer ref={ref} {...attributes}>
      <ContentWrapper {...attributes}>
        {attributes.title && <h1>{attributes.title}</h1>}
        {attributes.description && <p>{attributes.description}</p>}
      </ContentWrapper>
    </BannerContainer>
  );
};

export default Banner;

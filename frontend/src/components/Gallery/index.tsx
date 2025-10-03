"use client";

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CloseBtn, Grid, Item, LightboxBackdrop, LightboxBody } from './styles';

export interface GalleryImage {
  id?: number | string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface GalleryProps {
  images: GalleryImage[];
  gap?: number;
  minColWidth?: number;
  aspectRatio?: string; // e.g. '1 / 1', '4 / 3', '16 / 9'
  lightbox?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({
  images,
  gap = 12,
  minColWidth = 220,
  aspectRatio,
  lightbox = true,
}) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const safeIndex = useMemo(() => Math.min(Math.max(index, 0), images.length - 1), [index, images.length]);
  const current = images[safeIndex];

  const close = useCallback(() => setOpen(false), []);
  const openAt = useCallback((i: number) => {
    if (!lightbox) return;
    setIndex(i);
    setOpen(true);
  }, [lightbox]);

  const go = useCallback((dir: 1 | -1) => {
    setIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  }, [images.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, go]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <Grid $gap={gap} $minColWidth={minColWidth}>
        {images.map((img, i) => (
          <Item key={img.id ?? `${img.src}-${i}`} onClick={() => openAt(i)} $aspectRatio={aspectRatio} aria-label={`View image ${i + 1}`}>
            <Image
              src={img.src}
              alt={img.alt || `Gallery image ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
            />
          </Item>
        ))}
      </Grid>

      {lightbox && open && current && (
        <LightboxBackdrop onClick={close} role="dialog" aria-modal="true">
          <LightboxBody onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={close} aria-label="Close">✕</CloseBtn>
            {/* Simple carousel controls */}
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 1002 }}
            >
              ‹
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 1002 }}
            >
              ›
            </button>

            <div style={{ position: 'absolute', inset: 0 }}>
              <Image
                src={current.src}
                alt={current.alt || 'Gallery image'}
                fill
                sizes="92vw"
                style={{ objectFit: 'contain', background: '#000' }}
                priority
              />
            </div>
          </LightboxBody>
        </LightboxBackdrop>
      )}
    </>
  );
};

export default Gallery;

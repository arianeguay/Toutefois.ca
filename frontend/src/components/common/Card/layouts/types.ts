import { MouseEventHandler, TouchEventHandler } from 'react';
import { ContentType } from '..';

export interface CardLayoutProps {
  type: 'project' | 'news' | 'facebook';
  title: string;
  description?: string;
  date?: string;
  cover?: string;
  alt?: string;
  permalink?: string;
  dateDebut?: string;
  dateFin?: string;
  permalinkType?: 'internal' | 'external';
}

export interface CardBodyProps {
  title: string;
  description?: string;
  date?: string;
  type: ContentType;
  dateDebut?: string;
  dateFin?: string;
}

export interface CardEventHandlers {
  onClick?: MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  onTouchStart?: TouchEventHandler<HTMLDivElement>;
  onTouchEnd?: TouchEventHandler<HTMLDivElement>;
}

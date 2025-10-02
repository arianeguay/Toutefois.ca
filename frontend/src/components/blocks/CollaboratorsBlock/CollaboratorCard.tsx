'use client';
import { WordpressCollaborator } from '@/types';
import { Element } from 'html-react-parser';
import parse, { domToReact } from 'html-react-parser';
import React from 'react';
import * as S from './styles';

interface CollaboratorCardProps {
  collaborator: WordpressCollaborator;
}

const CollaboratorCard: React.FC<CollaboratorCardProps> = ({
  collaborator,
}) => {
  // Process HTML content to prevent p tags nesting
  const processedContent = parse(collaborator.content, {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === 'p') {
        // Explicitly cast to the correct type expected by domToReact
        return <div className="paragraph">{domToReact(domNode.children as any)}</div>;
      }
      return domNode;
    },
  });

  return (
    <S.Card id={collaborator.slug}>
      <S.PhotoContainer>
        {collaborator.photoUrl && (
          <S.Photo src={collaborator.photoUrl} alt={collaborator.name} />
        )}
      </S.PhotoContainer>
      <S.Info>
        <S.Name>{parse(collaborator.name)}</S.Name>
        <S.Position>{collaborator.position}</S.Position>
        <S.Excerpt className="excerpt-container">{processedContent}</S.Excerpt>
      </S.Info>
    </S.Card>
  );
};

export default CollaboratorCard;

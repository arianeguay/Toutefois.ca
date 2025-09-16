import { WordpressCollaborator } from '@/types';
import parse from 'html-react-parser';
import React from 'react';
import * as S from './styles';

interface CollaboratorCardProps {
  collaborator: WordpressCollaborator;
}

const CollaboratorCard: React.FC<CollaboratorCardProps> = ({
  collaborator,
}) => {
  return (
    <S.Card style={{ textDecoration: 'none' }} id={collaborator.slug}>
      <S.PhotoContainer>
        {collaborator.photoUrl && (
          <S.Photo
            src={collaborator.photoUrl}
            alt={collaborator.name.rendered}
          />
        )}
      </S.PhotoContainer>
      <S.Info>
        <S.Name>{parse(collaborator.name.rendered)}</S.Name>
        <S.Position>{collaborator.position}</S.Position>
        <S.Excerpt>{parse(collaborator.excerpt.rendered)}</S.Excerpt>
      </S.Info>
    </S.Card>
  );
};

export default CollaboratorCard;

import { WordpressCollaborator } from '@/types';
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
          <S.Photo src={collaborator.photoUrl} alt={collaborator.name} />
        )}
      </S.PhotoContainer>
      <S.Info>
        <S.Name>{collaborator.name}</S.Name>
        <S.Position>{collaborator.position}</S.Position>
        <S.Excerpt dangerouslySetInnerHTML={{ __html: collaborator.excerpt }} />
      </S.Info>
    </S.Card>
  );
};

export default CollaboratorCard;

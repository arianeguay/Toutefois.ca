'use client';
import { WordpressCollaborator } from '@/types';
import parse from 'html-react-parser';
import Link from 'next/link';
import React from 'react';
import * as S from './styles';

interface CollaboratorCardProps {
  collaborator: WordpressCollaborator;
}

const CollaboratorCard: React.FC<CollaboratorCardProps> = ({
  collaborator,
}) => {
  console.log(collaborator);
  return (
    <S.Card
      id={collaborator.slug}
      as={Link}
      href={`/collaborateurs/${collaborator.slug}`}
      style={{ textDecoration: 'none' }}
    >
      <S.PhotoContainer>
        {collaborator.photoUrl && (
          <S.Photo src={collaborator.photoUrl} alt={collaborator.name} />
        )}
      </S.PhotoContainer>
      <S.Info>
        <S.Name>{parse(collaborator.name)}</S.Name>
        <S.Position>{collaborator.position}</S.Position>
        <S.Excerpt>{parse(collaborator.content)}</S.Excerpt>
      </S.Info>
    </S.Card>
  );
};

export default CollaboratorCard;

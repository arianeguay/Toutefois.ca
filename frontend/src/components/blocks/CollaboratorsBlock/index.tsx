'use client';
import React from 'react';
import CollaboratorCard from './CollaboratorCard';
import * as S from './styles';
import { CollaboratorsBlockProps } from './types';

const CollaboratorsBlock: React.FC<CollaboratorsBlockProps> = (props) => {
  const { layout, collaborators, noCollaboratorsText } = props;

  if (!collaborators || collaborators.length === 0) {
    return <p>{noCollaboratorsText || 'No collaborators to display.'}</p>;
  }

  return (
    <S.Container $layout={layout}>
      {collaborators.map((collaborator) => (
        <CollaboratorCard key={collaborator.id} collaborator={collaborator} />
      ))}
    </S.Container>
  );
};

export default CollaboratorsBlock;

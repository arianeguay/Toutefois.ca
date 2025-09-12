'use client';
import React from 'react';
import CollaboratorCard from './CollaboratorCard';
import * as S from './styles';
import { CollaboratorsBlockProps } from './types';

const CollaboratorsBlock: React.FC<CollaboratorsBlockProps> = (props) => {
  const { layout, collaborators, memberStatus } = props;
  console.log(props);
  if (!collaborators || collaborators.length === 0) {
    return <p>No collaborators to display.</p>;
  }

  return (
    <S.Container layout={layout}>
      {collaborators.map((collaborator) => (
        <CollaboratorCard key={collaborator.id} collaborator={collaborator} />
      ))}
    </S.Container>
  );
};

export default CollaboratorsBlock;

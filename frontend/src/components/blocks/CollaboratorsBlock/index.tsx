import React from 'react';
import { CollaboratorsBlockProps } from './types';
import CollaboratorCard from './CollaboratorCard';
import * as S from './styles';

const CollaboratorsBlock: React.FC<CollaboratorsBlockProps> = ({ layout, collaborators }) => {
    if (!collaborators || collaborators.length === 0) {
        return <p>No collaborators to display.</p>;
    }

    return (
        <S.Container layout={layout}>
            {collaborators.map(collaborator => (
                <CollaboratorCard key={collaborator.id} collaborator={collaborator} />
            ))}
        </S.Container>
    );
};

export default CollaboratorsBlock;

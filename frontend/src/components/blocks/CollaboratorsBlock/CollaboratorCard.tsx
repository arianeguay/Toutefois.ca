import React from 'react';
import { Collaborator } from './types';
import * as S from './styles';

interface CollaboratorCardProps {
    collaborator: Collaborator;
}

const CollaboratorCard: React.FC<CollaboratorCardProps> = ({ collaborator }) => {
    return (
        <S.Card href={collaborator.link}>
            {collaborator.photoUrl && <S.Photo src={collaborator.photoUrl} alt={collaborator.name} />}
            <S.Info>
                <S.Name>{collaborator.name}</S.Name>
                <S.Position>{collaborator.position}</S.Position>
                <S.Excerpt dangerouslySetInnerHTML={{ __html: collaborator.excerpt }} />
            </S.Info>
        </S.Card>
    );
};

export default CollaboratorCard;

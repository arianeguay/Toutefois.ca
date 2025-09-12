export interface Collaborator {
    id: number;
    name: string;
    position: string;
    excerpt: string;
    photoUrl: string;
    link: string;
}

export interface CollaboratorsBlockProps {
    layout: 'vertical' | 'horizontal';
    collaborators: Collaborator[];
}

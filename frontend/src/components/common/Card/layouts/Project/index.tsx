import CardCover from '../../components/Cover';
import LinkWrapper from '../../components/LinkWrapper';
import { CardLayoutProps } from '../types';
import ProjectCardBody from './Body';
import { ProjectContentCardContainer } from './styles';

const CardProjectLayout: React.FC<CardLayoutProps> = ({
  type,
  title,
  description,
  date,
  cover,
  alt,
  permalink,
  permalinkType = 'internal',
  dateDebut,
  dateFin,
  ...eventHandlers
}) => {
  return (
    <LinkWrapper linkPath={permalink} linkType={permalinkType}>
      <ProjectContentCardContainer {...eventHandlers}>
        <CardCover src={cover} alt={alt ?? title} />
        <ProjectCardBody
          type={type}
          title={title}
          description={description}
          date={date}
          dateDebut={dateDebut}
          dateFin={dateFin}
        />
      </ProjectContentCardContainer>
    </LinkWrapper>
  );
};

export default CardProjectLayout;

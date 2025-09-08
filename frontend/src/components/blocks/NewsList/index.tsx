import Container from '@/components/common/Container';
import Typography from '@/components/common/typography';
import Api from '../../../api';
import { ListContainer, ListItem } from './styles';

const NewsList = async () => {
  const articles = await Api.fetchAllNews();

  if (!articles.length) {
    return <p>No news found.</p>;
  }

  return (
    <Container>
      <ListContainer>
        {articles.map((article) => (
          <ListItem key={article.id}>
            <Typography variant="h3">{article.title.rendered}</Typography>
            <Typography variant="body">{article.excerpt.rendered}</Typography>
          </ListItem>
        ))}
      </ListContainer>
    </Container>
  );
};

export default NewsList;

import api from '@/api';

interface ErrorPageProps {
  error: string;
}

const ErrorPage = async ({ error }: ErrorPageProps) => {
  const options = await api.fetchOptions();
  const title = options?.error_title || 'Erreur';
  const message = options?.error_message || 'Une erreur est survenue.';

  return (
    <div className="error">
      <h1>{title}</h1>
      <p>{message} {error}</p>
    </div>
  );
};

export default ErrorPage;

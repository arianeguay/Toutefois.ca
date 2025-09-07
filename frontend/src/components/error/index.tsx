interface ErrorPageProps {
  error: string;
}

const ErrorPage = ({ error }: ErrorPageProps) => {
  return (
    <div className="error">
      <h1>Erreur</h1>
      <p>Une erreur est survenue. {error}</p>
    </div>
  );
};

export default ErrorPage;

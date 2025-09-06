import { Link } from 'react-router-dom';

interface ButtonLinkWrapperProps {
  to?: string;
}
const ButtonLinkWrapper: React.FC<
  React.PropsWithChildren<ButtonLinkWrapperProps>
> = ({ to, children }) => {
  if (!to) return <>{children}</>;
  return <Link to={to}>{children}</Link>;
};

export default ButtonLinkWrapper;

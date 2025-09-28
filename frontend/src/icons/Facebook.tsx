import { IconProps } from './types';

const FacebookIcon: React.FC<IconProps> = ({
  size = 20,
  color,
  className,
  style,
  id,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ ...style, color: color }}
      id={id}
    >
      <path
        d="M15.0002 1.66675H12.5002C11.3951 1.66675 10.3353 2.10573 9.55388 2.88714C8.77248 3.66854 8.3335 4.72835 8.3335 5.83341V8.33341H5.8335V11.6667H8.3335V18.3334H11.6668V11.6667H14.1668L15.0002 8.33341H11.6668V5.83341C11.6668 5.6124 11.7546 5.40044 11.9109 5.24416C12.0672 5.08788 12.2791 5.00008 12.5002 5.00008H15.0002V1.66675Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FacebookIcon;

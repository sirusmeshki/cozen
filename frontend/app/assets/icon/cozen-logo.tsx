export default function CozenLogo({
  className,
  color = '#111111',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={className}
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g mask="url(#mask0_187_331)">
        <path
          d="M30.0343 38.5884C34.7587 38.5884 38.5885 34.7586 38.5885 30.0342C38.5885 25.3098 34.7587 21.48 30.0343 21.48C25.3099 21.48 21.4801 25.3098 21.4801 30.0342C21.4801 34.7586 25.3099 38.5884 30.0343 38.5884Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60ZM30 47.28C39.5435 47.28 47.28 39.5435 47.28 30C47.28 20.4565 39.5435 12.72 30 12.72C20.4565 12.72 12.72 20.4565 12.72 30C12.72 39.5435 20.4565 47.28 30 47.28Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

export interface LoadingProps {
  title?: string;
}

export const Loading = ({ title = "Loading..." }: LoadingProps) => {
  return (
    <div className={`m-auto flex h-full items-center justify-center`}>
      <div className="flex text-zinc-700/70">
        <svg
          version="1.1"
          id="L7"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enableBackground="new 0 0 100 100"
          xmlSpace="preserve"
          height={50}
          width={50}
        >
          <path
            fill="currentColor"
            d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
  L82,35.7z"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="2s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
        </svg>
        <div className="pl-2 pt-2 text-lg font-semibold">{title}</div>
      </div>
    </div>
  );
};

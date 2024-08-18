import React from "react";

const MediaIcon = ({
  name,
  url,
  icon,
}: {
  name: string;
  url: string;
  icon: any;
}) => {
  return (
    <a
      key={1}
      href={url}
      aria-label={`${name} site`}
      target="_blank"
      rel="noreferrer"
      className={`nav__link nav__link--${name}`}
    >
      <img
        className="media tooltip-test"
        title={`${name}`}
        src={icon}
        alt=""
        style={{ width: "20px", height: "20px" }}
      />
    </a>
  );
};

export default MediaIcon;

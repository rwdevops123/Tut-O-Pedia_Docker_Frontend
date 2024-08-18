import React from "react";
import { FaListAlt, FaPersonBooth } from "react-icons/fa";
import AWSPages from "../../../enum/AWSPages";
import { FaBucket } from "react-icons/fa6";
import { log } from "../../../Logging/Logger";

const AWSNavigationButton = ({
  page,
  active,
  displayItemsCount,
  navigateToAWSPage,
}: {
  page: string;
  active: boolean;
  displayItemsCount: boolean;
  navigateToAWSPage(page: string): void;
}) => {
  log("AWSNavigationButton", "Setting Up AWS");

  const handleClick = (page: string): void => {
    log("AWSNavigationButton", `Clicked ${page}`);
    navigateToAWSPage(page);
  };

  return (
    <>
      <button
        className={
          "list-group-item list-group-item-action py-2 ripple m-1 " +
          (active ? "active" : "")
        }
        onClick={() => handleClick(page)}
      >
        <span>
          {page === AWSPages.IAM ? <FaPersonBooth /> : <></>}
          {page === AWSPages.S3 ? <FaBucket /> : <></>}
          {page === AWSPages.Tutorials ? <FaListAlt /> : <></>}
          &nbsp; {page}
          &nbsp;
          {displayItemsCount && (
            <span className="badge bg-primary rounded-pill">2</span>
          )}
        </span>
      </button>
    </>
  );
};

export default AWSNavigationButton;

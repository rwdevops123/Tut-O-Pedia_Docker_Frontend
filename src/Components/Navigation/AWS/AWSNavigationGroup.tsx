import React from "react";
import AWSNavigationButton from "./AWSNavigationButton";
import AWSPages from "../../../enum/AWSPages";

const AWSNavigationGroup = ({
  awspages,
  currentAWSPage,
  navigateToAWSPage,
}: {
  awspages: any;
  currentAWSPage: string;
  navigateToAWSPage(page: string): void;
}) => {
  return awspages.map((page: string) => (
    <AWSNavigationButton
      key={page}
      page={page}
      active={page === currentAWSPage}
      displayItemsCount={page === AWSPages.Tutorials}
      navigateToAWSPage={navigateToAWSPage}
    />
  ));
};

export default AWSNavigationGroup;

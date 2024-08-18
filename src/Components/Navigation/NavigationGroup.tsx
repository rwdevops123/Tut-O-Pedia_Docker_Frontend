import React from "react";

import NavigationButton from "./NavigationButton";

const NavigationGroup = ({
  pages,
  currentPage,
  navigateToPage,
}: {
  pages: any;
  currentPage: string;
  navigateToPage(page: string): void;
}) => {
  return pages.map((page: string) => (
    <NavigationButton
      key={page}
      page={page}
      currentPage={currentPage}
      navigateToPage={navigateToPage}
    />
  ));
};

export default NavigationGroup;

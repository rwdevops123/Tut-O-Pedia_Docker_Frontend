import React from "react";

import { Col } from "react-bootstrap";

import { FaAws, FaPlusSquare } from "react-icons/fa";
import { FaHouse, FaMagnifyingGlassArrowRight } from "react-icons/fa6";

import { log } from "../../Logging/Logger";

import LogLevel from "../../enum/LogLevel";
import Pages from "../../enum/Pages";

const NavigationButton = ({
  page,
  currentPage,
  navigateToPage,
}: {
  page: string;
  currentPage: string;
  navigateToPage(page: string): void;
}) => {
  log(
    "NavigationButton",
    `Page = ${page}, selected = ${page === currentPage}, disabled = ${
      page === currentPage
    }`,
    LogLevel.Debug
  );

  const handleChangePage = (page: string): void => {
    log("NavigationButton", `Changing to page = ${page}`, LogLevel.Debug);
    navigateToPage(page);
  };

  return (
    <Col md="auto" className="p-1">
      <input
        className="btn-check"
        type="checkbox"
        id={`btn-${page}`}
        checked={page === currentPage}
        disabled={page === currentPage}
        onChange={() => handleChangePage(page)}
      />
      <label className="btn btn-outline-primary" htmlFor={`btn-${page}`}>
        {page === Pages.Home ? <FaHouse /> : <></>}
        {page === Pages.Create ? <FaPlusSquare /> : <></>}
        {page === Pages.Find ? <FaMagnifyingGlassArrowRight /> : <></>}
        {page === Pages.Aws ? <FaAws /> : <></>}
        &nbsp;
        {page}
      </label>
    </Col>
  );
};

export default NavigationButton;

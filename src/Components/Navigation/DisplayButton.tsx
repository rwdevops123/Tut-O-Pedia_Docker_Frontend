import React from "react";

import { Button } from "react-bootstrap";

import { log } from "../../Logging/Logger";

import LogLevel from "../../enum/LogLevel";

const DisplayButton = ({
  view,
  currentView,
  disabled,
  handleChangeView,
}: {
  view: string;
  currentView: string;
  disabled: boolean;
  handleChangeView(view: string): void;
}) => {
  log(
    "DisplayButton",
    `View = ${view}, disabled = ${disabled || view === currentView}`,
    LogLevel.Debug
  );

  return (
    <>
      <Button
        variant="outline-success"
        id={`"btn-${view}"`}
        disabled={view === currentView || disabled}
        onClick={() => handleChangeView(view)}
      >
        {view}
      </Button>
    </>
  );
};

export default DisplayButton;

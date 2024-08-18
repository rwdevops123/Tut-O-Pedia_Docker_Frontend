import React from "react";

import { Button } from "react-bootstrap";

import { log } from "../../Logging/Logger";

import LogLevel from "../../enum/LogLevel";

const ActionButton = ({
  action,
  disabled,
  handleActionClick,
}: {
  action: string;
  disabled: boolean;
  handleActionClick(action: any): void;
}) => {
  log(
    "ActionButton",
    `Button = ${action}, disabled = ${disabled}`,
    LogLevel.Debug
  );

  return (
    <>
      <Button
        variant="outline-success"
        id={`"btn-${action}"`}
        disabled={disabled}
        onClick={() => handleActionClick(action)}
      >
        {action}
      </Button>
    </>
  );
};

export default ActionButton;

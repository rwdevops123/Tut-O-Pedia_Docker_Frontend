import React from "react";

import { ButtonGroup, Col } from "react-bootstrap";

import ActionButton from "./ActionButton";

import { log } from "../../Logging/Logger";

import LogLevel from "../../enum/LogLevel";
import Actions from "../../enum/Actions";

const ActionGroup = ({
  actions,
  disabled,
  deleteAllTutorialsInView,
  publishAllTutorialsInView,
}: {
  actions: string[];
  disabled: boolean;
  deleteAllTutorialsInView(): void;
  publishAllTutorialsInView(): void;
}) => {
  const handleActionClick = (action: any): void => {
    if (action === Actions.PublishAll) {
      log("ActionGroup", `Publishing all displayed tutorials`, LogLevel.Debug);
      publishAllTutorialsInView();
    } else {
      log("ActionGroup", `Deleting all displayed tutorials`, LogLevel.Debug);
      deleteAllTutorialsInView();
    }
  };

  return (
    <Col md={3} className="p-1">
      <ButtonGroup className="float-end">
        {actions.map((action) => (
          <ActionButton
            key={action}
            action={action}
            disabled={disabled}
            handleActionClick={handleActionClick}
          />
        ))}
      </ButtonGroup>
    </Col>
  );
};

export default ActionGroup;

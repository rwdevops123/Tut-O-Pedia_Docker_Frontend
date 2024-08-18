import React from "react";

import { ButtonGroup, Col } from "react-bootstrap";

import DisplayButton from "./DisplayButton";

const DisplayGroup = ({
  views,
  currentView,
  disabled,
  handleChangeView,
}: {
  views: string[];
  currentView: string;
  disabled: boolean;
  handleChangeView(view: string): void;
}) => {
  return (
    <>
      <Col md={4} className="p-1">
        <ButtonGroup>
          {views.map((view) => (
            <DisplayButton
              key={view}
              view={view}
              currentView={currentView}
              disabled={disabled}
              handleChangeView={handleChangeView}
            />
          ))}
        </ButtonGroup>
      </Col>
    </>
  );
};

export default DisplayGroup;

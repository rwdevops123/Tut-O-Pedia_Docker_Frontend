import React from "react";

import {
  Badge,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from "react-bootstrap";
import {
  FaFileAlt,
  FaFileExport,
  FaHeading,
  FaKey,
  FaPenFancy,
  FaTrashAlt,
} from "react-icons/fa";

import Pages from "../../enum/Pages";
import LogLevel from "../../enum/LogLevel";

import { log } from "../../Logging/Logger";

const TutorialDetail = ({
  tutorial,
  deleteTutorialById,
  publishTutorialById,
  selectTutorialForUpdate,
  navigateToPage,
}: {
  tutorial: ITutorial;
  deleteTutorialById(id: number): Promise<boolean>;
  publishTutorialById(id: number): Promise<boolean>;
  selectTutorialForUpdate(tutorial: ITutorial): void;
  navigateToPage(page: string): void;
}) => {
  log(
    "TutorialDetail",
    `Tutorial = ${JSON.stringify(tutorial)}`,
    LogLevel.Debug
  );

  return (
    <>
      <Row>
        <Col md={11} className="p-1 me-auto">
          <h6
            className="m-1 p-1 tutorialdetail-title-color"
            style={{ fontFamily: "Quicksand" }}
          >
            <FaKey className="tooltip-test" title="id" /> &nbsp;[{tutorial.id}
            ]&nbsp;
            <FaHeading />
            &nbsp;
            {tutorial.title}
          </h6>
          <Card className="bg-light m-1">
            <CardBody>
              <p className="card-text">{tutorial.description}</p>
            </CardBody>
            <CardHeader>
              <FaFileAlt
                className="tutorialdetail-filename-color tooltip-test"
                title="file"
              />
              &nbsp;
              <span className="tutorialdetail-filename-color">
                {tutorial.filename === undefined ? "" : tutorial.filename}
              </span>
            </CardHeader>
          </Card>
        </Col>
        <Col md={1} className="p-2">
          <Badge
            className={`"m-1 p-1 badge-pill ${
              tutorial.published ? "bg-danger" : "bg-success"
            }`}
          >
            Published: {tutorial.published ? "yes" : "no"}
          </Badge>

          {!tutorial.published && (
            <Row>
              <ButtonGroup className="p-3">
                <FaPenFancy
                  className="mx-2 tooltip-test"
                  title="update"
                  onClick={() => {
                    selectTutorialForUpdate(tutorial);
                    navigateToPage(Pages.Update);
                  }}
                />
                <FaFileExport
                  className="mx-2 tooltip-test"
                  title="publish"
                  onClick={() => publishTutorialById(tutorial.id!)}
                />
                <FaTrashAlt
                  className="mx-2 tooltip-test"
                  title="delete"
                  onClick={() => deleteTutorialById(tutorial.id!)}
                />
              </ButtonGroup>
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};

export default TutorialDetail;

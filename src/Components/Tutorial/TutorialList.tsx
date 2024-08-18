import React, { useState } from "react";

import { ButtonGroup, Card, Col, FormSelect, Row } from "react-bootstrap";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import TutorialDetail from "./TutorialDetail";

import { log } from "../../Logging/Logger";

import LogLevel from "../../enum/LogLevel";

const TutorialList = ({
  tutorials,
  deleteTutorialById,
  publishTutorialById,
  selectTutorialForUpdate,
  setPaginatedTutorials,
  navigateToPage,
}: {
  tutorials: ITutorial[];
  deleteTutorialById(id: number): Promise<boolean>;
  publishTutorialById(id: number): Promise<boolean>;
  selectTutorialForUpdate(tutorial: ITutorial): void;
  setPaginatedTutorials(tutorials: ITutorial[]): void;
  navigateToPage(page: string): void;
}) => {
  tutorials = tutorials ? tutorials : [];

  log("TutorialList", `Tutorials = ${tutorials.length}}`, LogLevel.Debug);

  for (let tutorial of tutorials) {
    log(
      "TutorialList",
      `Tutorial = ${JSON.stringify(tutorial)}`,
      LogLevel.Debug
    );
  }

  const [tutorialsPerPage, setTutorialsPerPage] = useState<number>(3);
  const [beginOffset, setBeginOffset] = useState<number>(0);
  const endOffset = beginOffset + tutorialsPerPage;
  const paginatedTutorials = tutorials.slice(beginOffset, endOffset);

  setPaginatedTutorials(paginatedTutorials);

  const pageCount = Math.ceil(tutorials.length / tutorialsPerPage);

  const handlePageClick = (event: any): void => {
    const newOffset = (event.selected * tutorialsPerPage) % tutorials.length;
    setBeginOffset(newOffset);
  };

  const handleChangeTutorialsPerPage = (e: any) => {
    setTutorialsPerPage(Number(e.target.value));
    setPaginatedTutorials(paginatedTutorials);
  };

  return (
    <>
      <Row>
        <Col md={12} className="p-2">
          {paginatedTutorials.map((tutorial) => (
            <Card className="m-1 p-1 bg-light" key={tutorial.id}>
              <TutorialDetail
                tutorial={tutorial}
                deleteTutorialById={deleteTutorialById}
                publishTutorialById={publishTutorialById}
                selectTutorialForUpdate={selectTutorialForUpdate}
                navigateToPage={navigateToPage}
              />
            </Card>
          ))}
        </Col>
      </Row>

      <Row>
        <Col md={2} className="form-inline float-left">
          <FormSelect
            hidden={tutorials.length < 4}
            value={tutorialsPerPage}
            onChange={handleChangeTutorialsPerPage}
          >
            <option value="3">3 tutorials per page</option>
            <option value="4">4 tutorials per page</option>
            <option value="6">6 tutorials per page</option>
          </FormSelect>
        </Col>

        <Col md={10}>
          <ButtonGroup className="float-end">
            <ReactPaginate
              previousLabel={
                <IconContext.Provider
                  value={{ color: "#B8C1CC", size: "22px" }}
                >
                  <AiFillLeftCircle />
                </IconContext.Provider>
              }
              nextLabel={
                <IconContext.Provider
                  value={{ color: "#B8C1CC", size: "22px" }}
                >
                  <AiFillRightCircle />
                </IconContext.Provider>
              }
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              pageCount={pageCount}
              pageRangeDisplayed={4}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName="pagination justify-content-center"
              pageLinkClassName="page-link"
              previousLinkClassName="page-link"
              nextLinkClassName="page-link"
              activeClassName="active"
              // eslint-disable-next-line no-unused-vars
              hrefBuilder={(page, pageCount, selected) =>
                page >= 1 && page <= pageCount ? `/page/${page}` : "#"
              }
              hrefAllControls
              onClick={(clickEvent) => {
                // Return false to prevent standard page change,
                // return false; // --> Will do nothing.
                // return a number to choose the next page,
                // return 4; --> Will go to page 5 (index 4)
                // return nothing (undefined) to let standard behavior take place.
              }}
            />
          </ButtonGroup>
        </Col>
      </Row>
    </>
  );
};

export default TutorialList;

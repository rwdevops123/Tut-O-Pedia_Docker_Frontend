import React from "react";

import { Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import NavigationGroup from "./NavigationGroup";
import DisplayGroup from "./DisplayGroup";
import SearchGroup from "./SearchGroup";
import Actions from "../../enum/Actions";
import ActionGroup from "./ActionGroup";

import { log } from "../../Logging/Logger";

import LogLevel from "../../enum/LogLevel";
import Pages from "../../enum/Pages";
import Views from "../../enum/Views";

const NavigationBar = ({
  tutorials,
  currentPage,
  currentView,
  searchTutorialId,
  navigateToPage,
  handleChangeView,
  findTutorialById,
  existsNonPublishedTutorials,
  deleteAllTutorialsInView,
  publishAllTutorialsInView,
}: {
  tutorials: ITutorial[];
  currentPage: string;
  currentView: string;
  searchTutorialId: number | null;
  navigateToPage(page: string): void;
  handleChangeView(page: string): void;
  findTutorialById(id: string): void;
  existsNonPublishedTutorials: boolean;
  deleteAllTutorialsInView(): Promise<void>;
  publishAllTutorialsInView(): Promise<void>;
}) => {
  tutorials = tutorials ? tutorials : [];

  log(
    "TutorialsList",
    `Tutorials to display = ${JSON.stringify(tutorials)}`,
    LogLevel.Debug
  );
  return (
    <header>
      <Container fluid>
        <Row>
          <NavigationGroup
            pages={[Pages.Home, Pages.Create, Pages.Find, Pages.Aws]}
            currentPage={currentPage}
            navigateToPage={navigateToPage}
          />

          <DisplayGroup
            views={[Views.AllPub, Views.NonPub, Views.All]}
            currentView={currentView}
            disabled={currentPage !== Pages.Home}
            handleChangeView={handleChangeView}
          />

          <SearchGroup
            disabled={tutorials.length === 0 || currentPage !== Pages.Home}
            searchTutorialId={searchTutorialId}
            findTutorialById={findTutorialById}
          />

          <ActionGroup
            actions={[Actions.DeleteAll, Actions.PublishAll]}
            disabled={
              currentPage === Pages.Create ||
              currentPage === Pages.Find ||
              !existsNonPublishedTutorials
            }
            deleteAllTutorialsInView={deleteAllTutorialsInView}
            publishAllTutorialsInView={publishAllTutorialsInView}
          />
        </Row>
      </Container>
      <Outlet />
    </header>
  );
};

export default NavigationBar;

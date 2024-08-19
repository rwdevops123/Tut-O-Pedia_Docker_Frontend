// HOME page
import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import NavigationBar from "../Navigation/NavigationBar";
import TutorialList from "./TutorialList";
import CreateTutorial from "./Creation/CreateTutorial";
import FindTutorial from "./Find/FindTutorial";
import ModalDialog from "../Dialog/ModalDialog";

import { log } from "../../Logging/Logger";

import Views from "../../enum/Views";
import Pages from "../../enum/Pages";
import LogLevel from "../../enum/LogLevel";
import { DialogIds, dialogInfo } from "../../enum/Dialogs";

import {
  createTutorialWithFileREST,
  deleteTutorialByIdREST,
  deleteTutorialsByIdsREST,
  getAllTutorialsREST,
  publishTutorialByIdREST,
  publishTutorialsByIdsREST,
  updateTutorialREST,
} from "../../Services/RestService";
import AWS from "../AWS/Aws";
import IAM from "../AWS/IAM";
import S3 from "../AWS/S3";
import Tutorials from "../AWS/Tutorials";

const Tutorial = () => {
  const navigate = useNavigate();
  const modalRef = useRef<any>();

  const tutorials = useRef<ITutorial[]>();
  const [viewTutorials, setViewTutorials] = useState<ITutorial[]>();
  const paginatedTutorials = useRef<ITutorial[]>();

  const setPaginatedTutorials = (tutorials: ITutorial[]): void => {
    log("Tutorial", "set Paginated Tutorials to", LogLevel.Debug);

    for (let tutorial of tutorials) {
      log("Tutorial", `Paginated Tutorials ID = ${tutorial.id}`);
    }

    paginatedTutorials.current = tutorials;
  };

  const [currentPage, setCurrentPage] = useState<string>(Pages.Home);
  const navigateToPage = (page: string): void => {
    log("Tutorial", `Navigate to new page = ${page}`);
    if (page === Pages.Create) {
      log("Tutorial", `Update mode = false`);
      setUpdateMode(false);
    } else if (page === Pages.Update) {
      page = Pages.Create;
      log("Tutorial", `Update mode = true`);
      setUpdateMode(true);
    }

    log("Tutorial", `Navigate to ${page}`);
    navigate(`/${page}`);

    setCurrentPage(page);
  };

  const searchTutorialId = useRef<any>(null);

  const [currentView, setCurrentView] = useState<string>(Views.All);
  const changeView = (view: string) => {
    log("Tutorial", `Change view to ${view}`);
    setCurrentView(view);

    if (view === Views.All) {
      log("Tutorial", "ViewTutorials = All");
      setViewTutorials(tutorials.current);
    } else if (view === Views.AllPub) {
      const _tutorials = tutorials.current!.filter(
        (tutorial) => tutorial.published
      );
      log("Tutorial", "ViewTutorials = All Published");
      setViewTutorials(_tutorials);
    } else if (view === Views.NonPub) {
      const _tutorials = tutorials.current!.filter(
        (tutorial) => !tutorial.published
      );
      log("Tutorial", "ViewTutorials = All Non Published");
      setViewTutorials(_tutorials);
    } else if (view === Views.Search) {
      if (searchTutorialId) {
        const _tutorials = tutorials.current!.filter((tutorial) => {
          return tutorial
            .id!.toString()
            .trim()
            .includes(searchTutorialId.current);
        });
        log("Tutorial", "ViewTutorials = Search By Id");
        setViewTutorials(_tutorials);
      }
    }
  };

  const updateMode = useRef<boolean>(false);
  const setUpdateMode = (isUpdate: boolean) => (updateMode.current = isUpdate);
  const selectedTutorialForUpdate = useRef<ITutorial | any>(null);

  const selectTutorialForUpdate = (tutorial: ITutorial): void => {
    log(
      "Tutorial",
      `Selected tutorial for update = ${JSON.stringify(tutorial)}`
    );
    selectedTutorialForUpdate.current = tutorial;
  };

  const showTutorialDialog = (
    dialogId: string,
    alternate: string = ""
  ): void => {
    log("Tutorial", `Show Dialog ${dialogId}`, LogLevel.Debug);
    const data = dialogInfo.filter((info) => info.id === dialogId);

    if (data) {
      modalRef.current.setModalData(
        data[0].id,
        data[0].title,
        alternate.length > 0 ? alternate : data[0].message
      );
      modalRef.current.showDialog();
    }
  };

  useEffect(() => {
    log("Tutorial", "STARTING TUT-O-PEDIA");

    log("Tutorial", "Loading Tutorials");
    loadAllTutorials();
    // eslint-disable-next-line
  }, []);

  const loadAllTutorials = async () => {
    const result: ITutorial[] | null = await getAllTutorialsREST();

    log(
      "Tutorial",
      `Loaded ${result === null ? 0 : result.length} Tutorials`,
      LogLevel.Warning
    );

    if (result) {
      tutorials.current = result;
    } else {
      showTutorialDialog(DialogIds.LoadEmpty);
      tutorials.current = [];
    }

    changeView(Views.All);
    navigateToPage(Pages.Home);
  };

  const existsNonPublishedTutorials = (): boolean => {
    if (viewTutorials) {
      const tutorialList = viewTutorials!.filter(
        (tutorial) => !tutorial.published
      );

      log(
        "Tutorial",
        `Exists there NON published Tutorials = ${tutorialList.length > 0}`,
        LogLevel.Debug
      );

      return tutorialList.length > 0;
    }

    return false;
  };

  // DELETE
  const deleteTutorialByIdSilent = (id: number): void => {
    log("Tutorial", `Delete tutorial = ${id} silent`, LogLevel.Debug);
    const tutorialsList = tutorials.current!.filter((item) => item.id !== id);

    tutorials.current = tutorialsList;
  };

  const deleteTutorialById = async (id: number): Promise<boolean> => {
    log("Tutorial", `Delete tutorial = ${id}`);
    let result: boolean = await deleteTutorialByIdREST(id);
    log("Tutorial", `Delete tutorial result = ${result}`, LogLevel.Debug);

    if (result) {
      deleteTutorialByIdSilent(id);
    }

    changeView(Views.All);

    return result;
  };

  const deleteAllTutorialsInView = async (): Promise<void> => {
    log("Tutorial", `Delete all displayed tutorials`, LogLevel.Debug);

    let tutorialIds: (number | undefined)[] = paginatedTutorials
      .current!.filter((t) => !t.published)
      .map((tutorial) => {
        if (!tutorial.published) {
          return tutorial.id;
        }

        return undefined;
      });

    let result = await deleteTutorialsByIdsREST(tutorialIds);
    if (result) {
      for (let id of tutorialIds) {
        deleteTutorialByIdSilent(id!);
      }
    }

    if (!searchTutorialId.current) {
      log(
        "Tutorial",
        `Set current search tutorial to ${searchTutorialId.current}`,
        LogLevel.Debug
      );
      const searchedTutorials = tutorials.current!.filter(
        (tutorial) => tutorial.id === searchTutorialId.current
      );

      searchTutorialId.current =
        searchedTutorials.length === 0 ? undefined : searchTutorialId.current;
    }

    changeView(Views.All);
  };

  // PUBLISH
  const publishTutorialByIdSilent = (id: number): void => {
    log("Tutorial", `Publish tutorial = ${id} silent`, LogLevel.Debug);
    const tutorialsList = tutorials.current!.map((obj) =>
      obj.id === id ? { ...obj, published: true } : obj
    );

    tutorials.current = tutorialsList;
  };

  const publishTutorialById = async (id: number): Promise<boolean> => {
    log("Tutorial", `Publish tutorial ${id}`);
    let result: boolean = await publishTutorialByIdREST(id);
    log("Tutorial", `Publish tutorial result = ${result}`, LogLevel.Debug);

    if (result) {
      publishTutorialByIdSilent(id);
    }

    changeView(Views.All);
    return result;
  };

  const publishAllTutorialsInView = async (): Promise<void> => {
    log("Tutorial", `Publish all tutorials in View`);

    let tutorialIds: (number | undefined)[] = paginatedTutorials
      .current!.filter((t) => !t.published)
      .map((tutorial) => {
        if (!tutorial.published) {
          return tutorial.id;
        }

        return undefined;
      });

    log("Tutorial", `Publish all tutorials with IDS ${tutorialIds}`);

    let result = await publishTutorialsByIdsREST(tutorialIds);
    if (result) {
      for (let id of tutorialIds) {
        publishTutorialByIdSilent(id!);
      }
    }

    changeView(Views.AllPub);
  };

  const containsKeywords = (
    title: string,
    description: string,
    keywords: IKeyword[]
  ): boolean => {
    log("Tutorial", `Contains ${title}`);
    log("Tutorial", `Or ${description}`);
    log("Tutorial", `Any Of ${JSON.stringify(keywords)}`);
    let results = keywords.filter(
      (keyword) =>
        title.includes(keyword.content) || description.includes(keyword.content)
    );

    log("Tutorial", `${results.length}`);

    return results.length > 0;
  };

  // FIND
  const findTutorialById = (id: String): void => {
    log("Tutorial", `Find tutorial by ${id}`);
    const tutorialsList = tutorials.current!.filter((tutorial) => {
      return tutorial.id!.toString().trim().includes(id.valueOf());
    });

    log("Tutorial", `Found tutorial by ${id} = ${tutorialsList.length > 0}`);

    if (tutorialsList.length === 0) {
      showTutorialDialog(DialogIds.NotFound, `Tutorial with ${id} Not Found`);
      changeView(Views.All);
    } else {
      searchTutorialId.current = id;
      changeView(Views.Search);
    }
  };

  const findByTutorialsByKeywords = (keywords: IKeyword[]): void => {
    log("Tutorial", `Find tutorials by keyword = ${JSON.stringify(keywords)}`);
    const tutorialsFound = tutorials.current!.filter((tutorial) =>
      containsKeywords(tutorial.title, tutorial.description, keywords)
    );

    log(
      "Tutorial",
      `Found tutorials by keyword = ${tutorialsFound.length > 0}`
    );

    if (tutorialsFound.length > 0) {
      setViewTutorials(tutorialsFound);
      changeView(Views.Multi);
    } else {
      log("Tutorial", `No Turorials found with keywords`, LogLevel.Warning);
      const nrOfKeywords = keywords.length;

      showTutorialDialog(
        DialogIds.NotFound,
        `No Tutorials Found With ${
          nrOfKeywords === 1 ? "That Keyword" : "Those Keywords"
        }`
      );
      changeView(Views.All);
    }

    navigateToPage(Pages.Home);
  };

  // UPDATE
  const updateTutorial = async (
    values: ICreateFormValue,
    file: File
  ): Promise<void> => {
    log("Tutorial", `Update tutorial ${JSON.stringify(values)}`);

    const tutorialsToUpdate = tutorials.current!.map((item) =>
      item.id === values.id
        ? {
            ...item,
            title: values.title,
            description: values.description,
            filename:
              values.filename === undefined ? item.filename : values.filename,
          }
        : item
    );

    const updatingTutorial = tutorialsToUpdate.find(
      (tutorial) => tutorial.id === values.id
    );

    log("Tutorial", `Updating tutorial ${JSON.stringify(updatingTutorial)}`);
    let result: boolean = await updateTutorialREST(updatingTutorial, file);
    log("Tutorial", `Updating tutorial result = ${result}`);

    if (result) {
      tutorials.current = tutorialsToUpdate;

      log("Tutorial", `Set search id to ${values.id}`);
      searchTutorialId.current = values.id;

      changeView(Views.Search);
    }

    navigateToPage(Pages.Home);
  };

  // CREATE
  const createTutorial = async (
    values: ICreateFormValue,
    file: File
  ): Promise<void> => {
    log("Tutorial", `Create tutorial ${JSON.stringify(values)}`);
    if (
      tutorials.current!.filter((tutorial) => tutorial.title === values.title)
        .length > 0
    ) {
      showTutorialDialog(
        DialogIds.Duplicate,
        `Tutorial With Same Name Already Exists "${values.title}"`
      );
      return;
    }

    const tutorialToPersist: ITutorial = {
      id: values.id,
      title: values.title,
      description: values.description,
      filename: values.filename,
      published: false,
    };
    log("Tutorial", `Persist tutorial ${JSON.stringify(tutorialToPersist)}`);

    const newTutorialId = await createTutorialWithFileREST(
      tutorialToPersist,
      file
    );

    log("Tutorial", `Persist tutorial result = ${newTutorialId != null}`);
    if (newTutorialId != null) {
      const newTutorialsList = [
        ...tutorials.current!,
        { ...tutorialToPersist, id: newTutorialId.id },
      ];
      tutorials.current = newTutorialsList;

      searchTutorialId.current = newTutorialId;

      changeView(Views.Search);
    }
  };

  const handleCreateOrUpdateTutorial = (
    values: ICreateFormValue,
    file: File
  ): void => {
    if (updateMode.current) {
      updateTutorial(values, file);
    } else {
      createTutorial(values, file);
    }
  };

  return (
    <div>
      <ModalDialog ref={modalRef} />
      <Routes>
        <Route
          path="/"
          element={
            <NavigationBar
              tutorials={viewTutorials!}
              currentPage={currentPage}
              currentView={currentView}
              searchTutorialId={searchTutorialId.current}
              navigateToPage={navigateToPage}
              handleChangeView={changeView}
              findTutorialById={findTutorialById}
              existsNonPublishedTutorials={existsNonPublishedTutorials()}
              deleteAllTutorialsInView={deleteAllTutorialsInView}
              publishAllTutorialsInView={publishAllTutorialsInView}
            />
          }
        >
          <Route
            index
            element={
              <TutorialList
                tutorials={viewTutorials!}
                deleteTutorialById={deleteTutorialById}
                publishTutorialById={publishTutorialById}
                selectTutorialForUpdate={selectTutorialForUpdate}
                setPaginatedTutorials={setPaginatedTutorials}
                navigateToPage={navigateToPage}
              />
            }
          />

          <Route
            path="create"
            element={
              <CreateTutorial
                isUpdateMode={updateMode.current}
                selectedTutorialForUpdate={selectedTutorialForUpdate.current}
                navigateToPage={navigateToPage}
                handleCreateOrUpdateTutorial={handleCreateOrUpdateTutorial}
              />
            }
          />

          <Route
            path="find"
            element={
              <FindTutorial
                navigateToPage={navigateToPage}
                findByTutorialsByKeywords={findByTutorialsByKeywords}
              />
            }
          />

          <Route path="aws" element={<AWS />}>
            <Route path="iam" element={<IAM />} />
            <Route path="s3" element={<S3 />} />
            <Route path="tutorials" element={<Tutorials />} />
          </Route>

          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Tutorial;

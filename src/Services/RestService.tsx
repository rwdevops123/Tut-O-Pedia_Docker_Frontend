import {} from "./Api/ApiDummy";

import {
  createTutorial,
  deleteAllTutorials,
  deleteTutorialById,
  deleteTutorialsByIds,
  publishAllTutorials,
  publishTutorialById,
  publishTutorialsByIds,
  updateTutorial,
  updateTutorialWithFile,
  getAllTutorials,
} from "./Api/Api";

const getAllTutorialsREST = async (): Promise<ITutorial[] | null> => {
  const response: ITutorial[] | null = await getAllTutorials();

  return response;
};

const createTutorialWithFileREST = async (
  tutorial: ITutorial,
  file: File
): Promise<ITutorial | null> => {
  return await createTutorial(tutorial, file);
};

const updateTutorialREST = async (
  tutorial: ITutorial | undefined,
  file: File
): Promise<boolean> => {
  if (tutorial) {
    console.log("[RW] UPDATE = " + file);
    if (file === undefined) {
      return await updateTutorial(tutorial!);
    }

    return await updateTutorialWithFile(tutorial!, file);
  }

  return false;
};

const deleteAllTutorialsREST = async (): Promise<boolean> => {
  return await deleteAllTutorials();
};

const deleteTutorialByIdREST = async (id: number): Promise<boolean> => {
  return await deleteTutorialById(id);
};

const deleteTutorialsByIdsREST = async (
  ids: (number | undefined)[]
): Promise<boolean> => {
  return await deleteTutorialsByIds(ids);
};

const publishAllTutorialsREST = async (): Promise<boolean> => {
  return await publishAllTutorials();
};

const publishTutorialByIdREST = async (id: number): Promise<boolean> => {
  return await publishTutorialById(id);
};

const publishTutorialsByIdsREST = async (
  ids: (number | undefined)[]
): Promise<boolean> => {
  return await publishTutorialsByIds(ids);
};

export {
  getAllTutorialsREST,
  deleteAllTutorialsREST,
  deleteTutorialByIdREST,
  deleteTutorialsByIdsREST,
  publishAllTutorialsREST,
  publishTutorialByIdREST,
  publishTutorialsByIdsREST,
  createTutorialWithFileREST,
  updateTutorialREST,
};

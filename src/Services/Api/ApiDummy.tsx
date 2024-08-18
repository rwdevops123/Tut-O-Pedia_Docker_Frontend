import dummyData from "./DummyData/DummyData";
import { log } from "../../Logging/Logger";
import LogLevel from "../../enum/LogLevel";

import configData from "../../tutorial_env.json";

const getAllTutorials = async (): Promise<ITutorial[] | null> => {
  let data: ITutorial[] | null = null;

  data = dummyData;

  return data;
};

const deleteAllTutorials = async (): Promise<boolean> => {
  let result: boolean = false;

  return result;
};

const buildArgs = (ids: (Number | undefined)[]): string => {
  let result: string = "";

  for (let id in ids) {
    result += `id${id}=${ids[id]!.toString()}`;
    if (Number.parseInt(id) < ids.length - 1) {
      result += "&";
    }
  }

  return result;
};

const deleteTutorialsByIds = async (
  ids: (Number | undefined)[]
): Promise<boolean> => {
  let result: boolean = false;

  return result;
};

const deleteTutorialById = async (id: number): Promise<boolean> => {
  let result: boolean = false;

  return result;
};

const publishAllTutorials = async (): Promise<boolean> => {
  let result: boolean = false;

  return result;
};

const publishTutorialById = async (id: number): Promise<boolean> => {
  let result: boolean = false;

  return result;
};

const publishTutorialsByIds = async (
  ids: (Number | undefined)[]
): Promise<boolean> => {
  let result: boolean = false;

  return result;
};

const createTutorial = async (
  tutorial: ITutorial,
  file: File
): Promise<ITutorial | null> => {
  let result: ITutorial | null = null;

  if (!result) {
    return null;
  }

  return result;
};

const updateTutorialWithFile = async (
  tutorial: ITutorial,
  file: File
): Promise<boolean> => {
  let result: boolean = false;

  return result;
};

const updateTutorial = async (tutorial: ITutorial): Promise<boolean> => {
  let result: boolean = false;

  return result;
};

export {
  getAllTutorials,
  deleteAllTutorials,
  deleteTutorialById,
  deleteTutorialsByIds,
  publishAllTutorials,
  publishTutorialById,
  publishTutorialsByIds,
  createTutorial,
  updateTutorialWithFile,
  updateTutorial,
};

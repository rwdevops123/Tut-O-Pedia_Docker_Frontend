import React, { useState } from "react";

import { Badge, Button, InputGroup } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";

import { log } from "../../../Logging/Logger";

import LogLevel from "../../../enum/LogLevel";
import Pages from "../../../enum/Pages";

const FindTutorial = ({
  navigateToPage,
  findByTutorialsByKeywords,
}: {
  navigateToPage(page: string): void;
  findByTutorialsByKeywords(keywords: IKeyword[]): void;
}) => {
  const [keywords, setKeywords] = useState<IKeyword[]>([]);

  const isValid = (): boolean => {
    return keywords.filter((keyword) => keyword.content === "").length === 0;
  };

  const isDisabled = (): boolean => {
    return !isValid();
  };

  const getMaxIdValue = () => {
    return keywords.reduce((acc, i) => (i.id > acc ? i.id : acc), 0);
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    if (isValid()) {
      findByTutorialsByKeywords(keywords);
    }
  };

  const handleAddKeyword = (): void => {
    log("FindTutorial", `Adding new keyword placeholder`, LogLevel.Debug);
    if (keywords.length === 0 || isValid()) {
      const nextId = getMaxIdValue() + 1;
      if (keywords.length < 5) {
        const keyword = {
          id: nextId,
          content: "",
        };
        const keywordsArray = [...keywords, keyword];
        setKeywords(keywordsArray);
      }
    }
  };

  const handleRemoveKeyword = (id: number): void => {
    log("FindTutorial", `Removing keyword ${id}`, LogLevel.Debug);
    const keywordsAfterRemove = keywords.filter((keyword) => keyword.id !== id);
    log(
      "FindTutorial",
      `Remaining keywords ${JSON.stringify(keywordsAfterRemove)}`,
      LogLevel.Debug
    );
    setKeywords(keywordsAfterRemove);
  };

  const handleChangeInput = (e: any, _keyword: IKeyword): void => {
    e.preventDefault();
    const value = e.target.value;
    if (value.trim().length > 0) {
      log(
        "FindTutorial",
        `Add keyword ${value.trim().length}}`,
        LogLevel.Debug
      );
      const keywordsArray = keywords.map((keyword) =>
        keyword.id === _keyword.id ? { ...keyword, content: value } : keyword
      );
      setKeywords(keywordsArray);
    }
  };

  return (
    <>
      <form
        id="findForm"
        className="was-validated"
        noValidate
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="form-group m-2">
          <Button variant="success m-1" onClick={handleAddKeyword}>
            Keyword
            <Badge
              className={keywords.length > 4 ? "bg-danger m-1" : "bg-info m-1"}
            >
              {keywords.length}
            </Badge>
            <span className="visually-hidden">remaining keywords</span>
          </Button>

          {keywords.map((keyword) => (
            <InputGroup className="m-1" key={keyword.id}>
              <input
                type="text"
                className="form-control"
                id={keyword.id.toString()}
                placeholder="Enter keyword"
                defaultValue={keyword.content}
                required
                onChange={(e) => handleChangeInput(e, keyword)}
              />
              <span className="input-group-text" id={keyword.id.toString()}>
                <FaTrashAlt
                  className="tooltip-test"
                  title="delete keyword"
                  onClick={() => handleRemoveKeyword(keyword.id)}
                />
              </span>
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please enter a keyword.</div>
            </InputGroup>
          ))}
        </div>

        <button
          className="btn btn-primary m-2"
          type="submit"
          disabled={isDisabled()}
        >
          Find Tutorial
        </button>
        <button
          className="btn btn-secondary m-2"
          type="button"
          onClick={() => navigateToPage(Pages.Home)}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default FindTutorial;

import React, { useEffect, useRef } from "react";

import { Col, InputGroup } from "react-bootstrap";
import { FaIdCardClip } from "react-icons/fa6";

import { log } from "../../Logging/Logger";

import LogLevel from "../../enum/LogLevel";

const SearchGroup = ({
  disabled,
  searchTutorialId,
  findTutorialById,
}: {
  disabled: boolean;
  searchTutorialId: number | null;
  findTutorialById(id: string): void;
}) => {
  log(
    "SearchGroup",
    `SearchTutorialId = ${
      searchTutorialId ? searchTutorialId.toString() : ""
    }, disabled = ${disabled}`,
    LogLevel.Debug
  );

  const searchedId = useRef<String | null>(
    searchTutorialId ? searchTutorialId.toString() : ""
  );

  useEffect(() => {
    const node = document.getElementById("inputId");
    node!.addEventListener("keyup", (event: any) => {
      if (event.key === "Enter") {
        searchedId.current = event.target.value.trim();
        if (searchedId.current) {
          findTutorialById(searchedId.current.valueOf());
        }
      } else {
        handleChangeInput(event);
      }
    });
    // eslint-disable-next-line
  }, []);

  const handleChangeInput = (e: any): void => {
    e.preventDefault();

    searchedId.current = e.target.value.trim();
    log("SearchGroup", `SearchedId = ${searchedId.current}`, LogLevel.Debug);
    if (searchedId.current) {
      findTutorialById(searchedId.current.toString());
    }
  };

  return (
    <>
      <Col md="auto" className="p-1">
        <InputGroup>
          <div className="input-text-group p-1">
            <FaIdCardClip />
          </div>
          &nbsp;
          <input
            id="inputId"
            name="inputName"
            disabled={disabled}
            type="text"
            placeholder="Enter Tutorial ID"
            defaultValue={
              searchedId.current ? searchedId.current.toString() : ""
            }
            onChange={(e) => handleChangeInput(e)}
          />
        </InputGroup>
      </Col>
    </>
  );
};

export default SearchGroup;

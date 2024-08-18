import React, { useRef } from "react";

import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FaFileExport } from "react-icons/fa";

import * as formik from "formik";
import * as yup from "yup";

import { log } from "../../../Logging/Logger";

import LogLevel from "../../../enum/LogLevel";
import Pages from "../../../enum/Pages";

const CreateTutorial = ({
  isUpdateMode,
  selectedTutorialForUpdate,
  navigateToPage,
  handleCreateOrUpdateTutorial,
}: {
  isUpdateMode: boolean;
  selectedTutorialForUpdate: ITutorial | null;
  navigateToPage(page: string): void;
  handleCreateOrUpdateTutorial(values: ICreateFormValue, file: File): void;
}) => {
  log("CreateTutorial", `Update mode = ${isUpdateMode}`, LogLevel.Debug);

  if (isUpdateMode) {
    log(
      "CreateTutorial",
      `Tutorial selected for update = ${JSON.stringify(
        selectedTutorialForUpdate
      )}`,
      LogLevel.Debug
    );
  }

  const { Formik } = formik;

  const file = useRef<any>(null);

  const validationSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    filename: isUpdateMode ? yup.string() : yup.string().required(),
  });

  const handleChangeFile = (event: any, handleChange: any): void => {
    let selectedFile: File = event.target.files[0];
    if (selectedFile) {
      file.current = event.target.files[0];
    }

    handleChange(event);
  };

  const shortFilename = (filename: string | undefined): string | undefined => {
    let result: string | undefined = "";

    if (filename) {
      log("CreateTutorial", `Refactor filename = ${filename}`, LogLevel.Debug);

      result = filename.split("\\").pop()!.split("/").pop();

      log("CreateTutorial", `Refactored filename = ${result}`, LogLevel.Debug);
    }

    return result;
  };

  const handleSubmitForm = (values: ICreateFormValue) => {
    if (values.filename) {
      values.filename = shortFilename(values.filename);
    }

    handleCreateOrUpdateTutorial(values, file.current);
  };

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
        initialValues={{
          id: isUpdateMode ? selectedTutorialForUpdate!.id : undefined,
          title: isUpdateMode ? selectedTutorialForUpdate!.title : "",
          description: isUpdateMode
            ? selectedTutorialForUpdate!.description
            : "",
          filename: isUpdateMode ? selectedTutorialForUpdate!.filename : "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          setErrors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Container fluid className="m-1">
              <Row className="mb-3">
                <Form.Group controlId="validationFormikUsername2">
                  <Form.Label className="formik">Tutorial Title</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      aria-describedby="inputGroupPrepend"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.title}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  controlId="validationFormik103"
                  className="position-relative"
                >
                  <Form.Label className="formik">
                    Tutorial Description
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                  />

                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group className="position-relative mb-3">
                <FaFileExport className="formik" />
                &nbsp;
                <Form.Label className="formik">Attachment :</Form.Label>&nbsp;
                <Form.Label className="tutorialdetail-filename-color">
                  {shortFilename(values.filename)}
                </Form.Label>
                <Form.Control
                  type="file"
                  required
                  name="filename"
                  onChange={(e) => handleChangeFile(e, handleChange)}
                  isInvalid={!!errors.filename}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.filename}
                </Form.Control.Feedback>
              </Form.Group>
            </Container>
            <Row>
              <Col md={1} className="p-2 offset-md-5">
                <Button type="submit">
                  {isUpdateMode ? "Update" : "Create"}
                </Button>
              </Col>
              <Col md={1} className="p-2">
                <Button
                  type="button"
                  onClick={() => {
                    setErrors({});
                    navigateToPage(Pages.Home);
                  }}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateTutorial;

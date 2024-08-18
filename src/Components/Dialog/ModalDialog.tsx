import React, { forwardRef, useImperativeHandle, useState } from "react";

import { Button, Modal } from "react-bootstrap";

import connectIcon from "../../assets/connect.svg";
import duplicateIcon from "../../assets/duplicate.svg";
import serverIcon from "../../assets/server.svg";
import notfoundIcon from "../../assets/notfound.svg";

import { DialogIds } from "../../enum/Dialogs";

const getIconOfDialogId = (dialogId: string): string => {
  let icon: string = "";
  switch (dialogId) {
    case DialogIds.LoadEmpty:
      icon = serverIcon;
      break;
    case DialogIds.Duplicate:
      icon = duplicateIcon;
      break;
    case DialogIds.NotFound:
      icon = notfoundIcon;
      break;
    case DialogIds.Connecting:
      icon = connectIcon;
      break;
  }

  return icon;
};

const ModalDialog = forwardRef((props, ref) => {
  const [modalData, setModalData] = useState<{
    id: string;
    title: string;
    message: string;
    hidden: boolean;
  }>({
    id: "",
    title: "",
    message: "",
    hidden: false,
  });

  const [show, setShow] = useState<boolean>(false);
  const handleCloseModalDialog = () => setShow(false);
  const handleShowModalDialog = () => setShow(true);

  useImperativeHandle(ref, () => ({
    setModalData(
      _id: string,
      _title: string,
      _message: string,
      _hidden: boolean = false
    ) {
      setModalData({
        id: _id,
        title: _title,
        message: _message,
        hidden: _hidden,
      });
    },
    showDialog() {
      handleShowModalDialog();
    },
    closeDialog() {
      console.log("CLOSE DIALOG");
      handleCloseModalDialog();
    },
  }));

  return (
    <>
      <Modal show={show}>
        <Modal.Header id="modalHeader" className="modalDialog">
          <Modal.Title id="modalTitle">
            <img
              src={getIconOfDialogId(modalData.id)}
              alt=""
              style={{ width: "32px", height: "32px" }}
            />
            &nbsp;
            {modalData.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body id="modalBody" className="modal-body modalDialog">
          {modalData.message}
        </Modal.Body>
        <Modal.Footer className="modalDialog">
          <Button
            id="modalButton"
            variant="primary"
            onClick={handleCloseModalDialog}
            hidden={modalData.hidden}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default ModalDialog;

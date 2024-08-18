import React, { useEffect } from "react";
import { useRef, useState } from "react";

import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

// import HeartBeat from "./Components/HeartBeat";
import Tutorial from "./Components/Tutorial/Tutorial";
import ModalDialog from "./Components/Dialog/ModalDialog";
import HeartBeat from "./Components/HeartBeat";

import { Logger } from "./Logging/Logger";

import configData from "./tutorial_env.json";
import { DialogIds, dialogInfo } from "./enum/Dialogs";

const Main = () => {
  const mainRef = useRef<any>();
  const [serverConnected, setServerConnected] = useState(false);
  // const [serverConnected, setServerConnected] = useState(true);

  useEffect(() => {
    if (configData.activeServer) {
      const data = dialogInfo.filter(
        (info) => info.id === DialogIds.Connecting
      );

      mainRef.current.setModalData(
        DialogIds.Connecting,
        data[0].title,
        data[0].message,
        true
      );

      mainRef.current.showDialog();
    } else {
      setServerConnected(true);
    }
  }, []);

  const notify = (count: Number, connected: boolean): void => {
    setServerConnected(connected);
    if (!connected) {
      const data = dialogInfo.filter(
        (info) => info.id === DialogIds.Connecting
      );

      mainRef.current.setModalData(
        DialogIds.Connecting,
        data[0].title,
        data[0].message,
        true
      );
    }

    if (count === 0) {
      mainRef.current.showDialog();
    }

    if (connected) {
      mainRef.current.closeDialog();
    }
  };

  return (
    <Container fluid>
      <Logger
        active={configData.Logging.active}
        timeout={configData.Logging.timeout}
      />
      <ModalDialog ref={mainRef} />
      <HeartBeat
        active={configData.activeServer}
        timeout={configData.Heartbeat.timeout}
        URL={configData.Server.URL}
        notify={notify}
      />
      <Header />
      <Router>{serverConnected && <Tutorial />}</Router>
      <Footer />
    </Container>
  );
};

export default Main;

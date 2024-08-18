import React from "react";
import { useEffect, useState } from "react";
import { log } from "../Logging/Logger";
import LogLevel from "../enum/LogLevel";

const HeartBeat = ({
  active,
  timeout,
  URL,
  notify,
}: {
  active: boolean;
  timeout: number;
  URL: string;
  notify(count: Number, connected: boolean): void;
}) => {
  const [count, setCount] = useState(1);
  const [ws, setWs] = useState<any>(null);

  log("HeartBeat", "Starting up server polling", LogLevel.Debug);

  useEffect(() => {
    if (active) {
      const timeoutId = setTimeout(() => {
        setCount(count + 1);
        const wsClient = new WebSocket(URL);
        wsClient.onopen = () => {
          log("HeartBeat", "Socket connection open", LogLevel.Debug);
          setWs(wsClient);
          notify(count, true);
        };
        wsClient.onclose = () => {
          log("HeartBeat", "Socket connection closed", LogLevel.Debug);
          setWs(null);
          setCount(0);
          notify(count, false);
        };
        // }
      }, timeout);

      return () => {
        clearTimeout(timeoutId);
        if (ws) {
          ws.close();
        }
      };
    }
    // eslint-disable-next-line
  }, [count]);

  return <></>;
};

export default HeartBeat;

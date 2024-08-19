import React, { useEffect, useState } from "react";

let data: BlobPart[] = [];
let isAdded = false;
let isActive = false;

const log = (
  module: string | null,
  message: string,
  level: string = "INFO"
) => {
  //  if (isActive) {
  let moduleInfo: string = `[${module ? module : "general"}]::`;
  let info =
    moduleInfo +
    new Date().toLocaleString() +
    " : <" +
    level +
    "> : " +
    message;

  const blob = new Blob([info + "\n"], { type: "text/plain" });
  data.push(blob);
  isAdded = true;

  console.log(info);
  //  }
};

const loggerflush = () => {
  if (isAdded && isActive) {
    const writeblob = new Blob(data, { type: "text/plain" });
    const url = URL.createObjectURL(writeblob);

    const link = document.createElement("a");

    link.download =
      new Date().toLocaleDateString().replaceAll("/", "_") + "_tutopedia.log";
    link.href = url;

    link.click();
    isAdded = false;
  }
};

const clear = () => {
  if (isActive) {
    data = [];
  }
};

const Logger = ({ active, timeout }: { active: boolean; timeout: number }) => {
  //  clear();

  isActive = active;

  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    if (isActive) {
      const timeoutId = setTimeout(() => {
        if (count === 9) {
          setCount(count + 1);
        } else {
          setCount(count + 1);
        }

        loggerflush();
      }, timeout);

      return () => {
        clearTimeout(timeoutId);
      };
    }
    // eslint-disable-next-line
  }, [count]);

  return <></>;
};

export { log, Logger, clear };

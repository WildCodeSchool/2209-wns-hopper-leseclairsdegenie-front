import React, { useEffect, useState } from "react";
import "./notification.css";
import errorIcon from "../assets/error.png"
import succesIcon from "../assets/succes.png";
interface INotification {
  type: "validation" | "form";
  icon: "succes" | "error";
  message: string;
  textButton: string;
  onValidate: Function;
}
export function Notification({
  type,
  icon,
  message,
  textButton,
  onValidate,
}: INotification) {
  const [iconChosed, setIconChose] = useState("");
  const [backgroundDissable, setBackgroundDissable] = useState(false);
  useEffect(() => {
    if (icon === "succes") {
      setIconChose(succesIcon);
    }
    if (icon === "error") {
      setIconChose(errorIcon);
    }
  }, [icon]);

  return (
    <button
      className="notificationContainer"
      disabled={backgroundDissable}
      onClick={() => onValidate()}
    >
      {type === "validation" && (
        <div
          className="notificationContainerContain"
          onMouseEnter={() => setBackgroundDissable(true)}
          onMouseLeave={() => setBackgroundDissable(false)}
        >
          <img alt="" src={iconChosed} className="notificationIcon" />

          <div className="notificationMessage">{message}</div>
          <button
            className="notificationFormSubmit"
            onClick={() => onValidate()}
          >
            {textButton}
          </button>
        </div>
      )}
    </button>
  );
}

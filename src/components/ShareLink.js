import React from "react";
import "./style/shareComponent.scss";
import CopyLinkComponent from "./CopyLinkComponent";
export default function ShareLink({ link }) {
  return (
    <div className="shareContainer">
      <div className="top">
        <p>Share</p>
        <i className="pi pi-share-alt"></i>
      </div>
      <CopyLinkComponent link={link} />
    </div>
  );
}

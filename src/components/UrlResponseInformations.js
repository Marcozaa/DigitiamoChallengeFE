import React from "react";
import "./style/urlResponseInfo.scss";
export default function UrlResponseInformations({
  fullUrl,
  scheme,
  path,
  host,
}) {
  return (
    <div className="infoContainer">
      <p>URL INFO</p>
      <div className="domainName">
        <div className="title">Domain Name</div>
        <div className="value">{fullUrl}</div>
      </div>
      <div className="scheme">
        <div className="title">Scheme</div>
        <div className="value">{scheme}</div>
      </div>
      <div className="path">
        <div className="title">Path</div>
        <div className="value">{path}</div>
      </div>
    </div>
  );
}

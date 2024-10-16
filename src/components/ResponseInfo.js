import React from "react";
import "./style/responseInfo.scss"; // Import the SCSS file

const ResponseInfo = ({ server, fullUrl, scheme, path, host, statusLine }) => {
  console.log("Server Info:", server);
  return (
    <div className="responseContainer">
      <p>RESPONSE</p>
      <div className="responseStatus">
        <div className="value">{statusLine}</div>
      </div>
      <div className="responseLocation">
        <div className="title">Location</div>
        <div className="value">{path}</div>
      </div>
      <div className="responseServer">
        <div className="title">Server</div>
        <div className="value">
          <p>{server ? server : "No server info available"}</p>
        </div>
      </div>
    </div>
  );
};

export default ResponseInfo;

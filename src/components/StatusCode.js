import React from "react";
import "./style/statusCode.scss";
export default function StatusCode({ code }) {
  const statusDescriptions = [
    { code: 200, description: "Everything is fine!" },
    { code: 201, description: "Resource created." },
    { code: 202, description: "Request accepted." },
    { code: 204, description: "No content." },
    { code: 400, description: "Bad request." },
    { code: 401, description: "Unauthorized." },
    { code: 403, description: "Forbidden." },
    { code: 404, description: "Not found." },
    { code: 405, description: "Method not allowed." },
    { code: 408, description: "Request timeout." },
    { code: 500, description: "Internal server error." },
    { code: 502, description: "Bad gateway." },
    { code: 503, description: "Service unavailable." },
    { code: 504, description: "Gateway timeout." },
  ];
  return (
    <div className="statusCodeContainer">
      <div className="statusCode">{code}</div>
      <div className="statusDescription">
        {statusDescriptions.find((status) => status.code === code)?.description}
      </div>
    </div>
  );
}

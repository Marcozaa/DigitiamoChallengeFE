import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import "./requestSelector.css";
export default function RequestTypeSelector({
  selectedRequest,
  setSelectedRequest,
}) {
  const requests = [
    { name: "GET", code: "GET" },
    { name: "POST", code: "POST" },
  ];

  return (
    <div className="requestSelector">
      <Dropdown
        value={selectedRequest}
        onChange={(e) => setSelectedRequest(e.value)}
        options={requests}
        optionLabel="name"
        editable
        placeholder=""
        className=""
      />
    </div>
  );
}

import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { OverlayPanel } from "primereact/overlaypanel";

const CopyLinkComponent = ({ link }) => {
  const op = useRef(null);
  console.log(link);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="p-d-flex p-ai-center">
      <InputText value={link} readOnly />
      <OverlayPanel ref={op}>
        <p>Link copied to clipboard!</p>
      </OverlayPanel>
      <Button
        icon="pi pi-copy"
        label="Copy"
        className="p-ml-2"
        onClick={(e) => {
          op.current.toggle(e);
          copyToClipboard();
        }}
      />
    </div>
  );
};

export default CopyLinkComponent;

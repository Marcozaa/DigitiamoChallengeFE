import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

export default function DialogInsertRequest({ visible, setVisible }) {
  return (
    <Dialog
      header="Errore"
      visible={visible}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
      style={{ width: "50vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
    >
      <p className="m-0">Inserisci il tipo di richiesta e l'url!</p>
    </Dialog>
  );
}

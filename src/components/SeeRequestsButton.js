import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputText } from "primereact/inputtext";

export default function SeeRequestsButton({ setResult }) {
  const op = useRef(null);
  const [searchedRequest, setSearchedRequest] = useState("");
  const [loading, setLoading] = useState(false);

  const load = (e) => {
    setLoading(true);

    fetch("http://localhost:3001/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specifica che stai inviando JSON
      },
      body: JSON.stringify({ searchedRequest }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Gestisci la risposta dal server
        console.log(data);
        setResult(data);
        console.log("test");
      });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <>
      <div
        className="buttonSeePrevRequests"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Button
          onClick={(e) => op.current.toggle(e)}
          label="Cerca una richiesta"
          severity="secondary"
          icon="pi pi-search"
        />
      </div>
      <OverlayPanel ref={op}>
        <p>Inserisci il link della richiesta cercata</p>
        <InputText
          value={searchedRequest}
          onChange={(e) => setSearchedRequest(e.target.value)}
        />
        <Button
          label="Search"
          icon="pi pi-search"
          loading={loading}
          onClick={load}
          id="searchButton"
        />
      </OverlayPanel>
    </>
  );
}

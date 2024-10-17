import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import RequestTypeSelector from "./components/RequestTypeSelector";
import { Button } from "primereact/button";
import UrlResponseInformations from "./components/UrlResponseInformations";
import ResponseInfo from "./components/ResponseInfo";
import StatusCode from "./components/StatusCode";
import ShareLink from "./components/ShareLink";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import LoadTimeProgressBar from "./components/LoadTimeProgressBar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Dialog } from "primereact/dialog";
import DialogInsertRequest from "./components/DialogInsertRequest";
import SeeRequestsButton from "./components/SeeRequestsButton";
function App() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [url, setUrl] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [result, setResult] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const load = (e) => {
    if (selectedRequest != null && url != "") {
      if (selectedRequest.code === "GET") {
        setLoading(true);

        fetch("http://localhost:3001/api/HTTP/GET", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specifica che stai inviando JSON
          },
          body: JSON.stringify({ url }), // Invia il link come JSON
        })
          .then((response) => response.json())
          .then((data) => {
            setTimeout(() => {
              setLoading(false);
            }, 2000);
            // Gestisci la risposta dal server
            setResult(data);
            console.log(data.loadTime);
          })
          .catch((error) => {
            console.error("Errore:", error);
          });
      }
      if (selectedRequest.code === "POST") {
        setLoading(true);

        fetch("http://localhost:3001/api/HTTP/POST", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specifica che stai inviando JSON
          },
          body: JSON.stringify({ url }), // Invia il link come JSON
        })
          .then((response) => response.json())
          .then((data) => {
            // Gestisci la risposta dal server
            setResult(data);
            console.log(data.headers);
          })
          .catch((error) => {
            console.error("Errore:", error);
          });
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } else {
      setVisible(true);
    }
  };

  React.useEffect(() => {
    fetch("http://localhost:3001/api")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setData(data.message))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, []);

  return (
    <div className="App">
      <DialogInsertRequest visible={visible} setVisible={setVisible} />
      {result && <StatusCode code={result.firstRequest.statusCode} />}
      <header className="App-header">
        <div className="searchContainer">
          <RequestTypeSelector
            selectedRequest={selectedRequest}
            setSelectedRequest={setSelectedRequest}
          />
          <FloatLabel>
            <InputText id="link" onChange={(e) => setUrl(e.target.value)} />
            <label htmlFor="link">Link</label>
          </FloatLabel>
          <div className="card flex flex-wrap justify-content-center gap-3">
            <Button
              label="Search"
              icon="pi pi-search"
              loading={loading}
              onClick={load}
              id="searchButton"
            />
          </div>
        </div>
      </header>
      {result && (
        <>
          <div className="urlInfo">
            <Carousel
              showStatus={false}
              style={{
                width: "100%",
              }}
            >
              <UrlResponseInformations
                fullUrl={result.firstRequest.fullUrl}
                scheme={result.firstRequest.scheme}
                host={result.firstRequest.host}
                path={result.firstRequest.path}
              />
              {[result.firstRequest, result.secondRequest].map((res, index) => {
                if (!res) return <></>; // Se res non esiste, non renderizzare nulla

                return (
                  <div key={index}>
                    <ResponseInfo
                      server={res.serverInfo}
                      fullUrl={res.fullUrl}
                      scheme={res.scheme}
                      host={res.host}
                      path={res.path}
                      statusLine={res.statusLine}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
          <ShareLink link={result.firstRequest.requestId} />
          <div className="slideUpComponent">
            <SwipeableBottomSheet overflowHeight={64}>
              <div style={{ height: "50vh" }}>
                <div
                  className="topBar"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "grey",
                      width: "100px",
                      height: "15px",
                      borderRadius: "16px",
                      boxShadow: "0 0 16px 0 rgba(0, 0, 0, 0.16)",
                    }}
                  >
                    {" "}
                  </div>
                </div>
                <LoadTimeProgressBar
                  loadTime={result.firstRequest.loadTime * 0.001}
                />
              </div>
            </SwipeableBottomSheet>
          </div>
        </>
      )}
      {!result && <SeeRequestsButton setResult={setResult} />}
    </div>
  );
}

export default App;

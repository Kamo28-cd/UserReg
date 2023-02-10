import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./App.css";

ReactDOM.hydrateRoot(
  document.getElementById("app") as HTMLElement,
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);

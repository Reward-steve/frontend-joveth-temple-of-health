import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot from react-dom/client
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

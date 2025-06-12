import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot from react-dom/client
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "./context/ApiProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "./context/AuthProvider";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ApiProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </ApiProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

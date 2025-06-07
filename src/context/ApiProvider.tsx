import { useReducer, useCallback } from "react";
import { ApiContext } from "../hooks/createApi";
import { apiReducer, initialState } from "../hooks/apiReducer";
import apiClient from "../utils/apiClient";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ApiProviderProps {
  children: React.ReactNode;
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const [state, dispatch] = useReducer(apiReducer, initialState);
  const navigate = useNavigate();
  const api = useCallback(
    async (method: string, url: string, body?: object) => {
      dispatch({ type: "LOADING" });

      try {
        const response = await apiClient.request({ method, url, data: body });

        dispatch({
          type: "SUCCESS",
          payload: {
            data: response.data,
            message: response.data.message || "Success",
          },
        });

        return response.data;
      } catch (err: unknown) {
        console.error("API Error:", err);
        if (typeof err === "object" && err !== null && "status" in err) {
          const status = (err as { status?: number }).status;
          if (status === 403) navigate("/forbidden");
          if (status === 404) navigate("/page-not-found");
        }
        const errorMessage =
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : "An unknown error occurred";

        dispatch({ type: "ERROR", payload: errorMessage });
        return null;
      }
    },
    [dispatch]
  );

  return (
    <ApiContext.Provider
      value={{
        message: state.message,
        data: state.data,
        isLoading: state.isLoading,
        error: state.error,
        api,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

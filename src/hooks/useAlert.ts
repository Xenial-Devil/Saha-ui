"use client";

import { useContext } from "react";
import { AlertContextType } from "../components/Alert/Alert.types";
import { AlertContext } from "../components/Alert/AlertProvider";


export function useAlert(): AlertContextType {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error(
      "useAlert must be used within an AlertProvider. " +
        "Wrap your app with <AlertProvider> to use this hook."
    );
  }

  return context;
}

export default useAlert;

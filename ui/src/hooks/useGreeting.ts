import { useMemo } from "react";
import { getGreeting } from "../utils/greeting";

export function useGreeting() {
  return useMemo(() => getGreeting(), []);
}
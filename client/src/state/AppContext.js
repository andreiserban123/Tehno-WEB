import { createContext } from "react";
import task from "../../../server/models/task.mjs";

export default createContext({
  user: null,
  project: null,
  task: null,
  userSuggestion: null,
});

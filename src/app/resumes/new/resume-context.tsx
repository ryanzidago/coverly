import { createContext } from "react";

export const ResumeContext = createContext({
  resume: {},
  updateResume: (resume) => {},
});

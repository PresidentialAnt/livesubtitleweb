import { createContext } from "react";
// Context to pass the blob and word from Record.js to Replay.js

export const UrlContext = createContext("passed from urlcontext.js"); // Initialise a global variable to pass audio blob and prompted word
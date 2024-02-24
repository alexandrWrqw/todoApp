import { createRoot } from "react-dom/client";

import App from "./components/App/App";

const container = document.querySelector(".root");
const root = createRoot(container);

root.render(<App />);

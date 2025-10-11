import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

import "@qpokychuk/sf-pro-display/index.css";
import "@qpokychuk/sf-pro-display/normal.css";
import "@qpokychuk/sf-pro-display/italic.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

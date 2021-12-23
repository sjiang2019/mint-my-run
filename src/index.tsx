import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import "./index.css";
import AppRouter from "./router/AppRouter";
import reportWebVitals from "./reportWebVitals";
import reducers from "./reducers";

ReactDOM.render(
  <Provider store={createStore(reducers, composeWithDevTools())}>
    <AppRouter />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

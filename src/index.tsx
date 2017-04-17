import * as React from "react";
import * as ReactDOM from "react-dom";
import Index from "./pages/Index";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {playbackMiddleware} from "./middleware";
import reducer from "./reducers";
import "./main.css";

const store = createStore(
  reducer,
  applyMiddleware(playbackMiddleware),
);

ReactDOM.render(
  <Provider store={store}>
    <Index/>
  </Provider>,
  document.getElementById("root") as HTMLElement
);

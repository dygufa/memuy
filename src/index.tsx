import * as React from "react";
import * as ReactDOM from "react-dom";
import {observable, autorun} from "mobx";
import {observer} from "mobx-react";
import DevTools from "mobx-react-devtools";
import {Provider} from "mobx-react";
import {syncHistoryWithStore} from "mobx-react-router";
import { Route } from "react-router-dom";
import * as history from 'history';
import { Router } from 'react-router'

const browserHistory = history.createBrowserHistory();

import { RootStore } from "./stores";

import App from "./containers/App";

const rootStore = new RootStore();

const routeHistory = syncHistoryWithStore(browserHistory, rootStore.routerStore);

ReactDOM.render(
<Provider {...rootStore}>
    <Router history={routeHistory}>
        <Route path="/:roomId?" component={App} />
    </Router>
</Provider>, document.getElementById('root'));
import * as React from "react";
import * as ReactDOM from "react-dom";
import {observable, autorun} from "mobx";
import {observer} from "mobx-react";
import DevTools from "mobx-react-devtools";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import {Provider} from "mobx-react";
import {syncHistoryWithStore} from "mobx-react-router";

import {RoomStore, RouterStore} from "./stores";

import App from "./containers/App";
import DropFile from "./containers/DropFile";

const routingStore = new RouterStore();
const roomStore = new RoomStore();
const rootStores = {
    roomStore: roomStore,
    routingStore: routingStore
};

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
    <Provider {...rootStores}>
    <Router history={history}>
        <Route path="/" component={App}>
            <Route path="/:roomId" component={DropFile}/>
        </Route>
    </Router>
</Provider >, document.getElementById('root'));
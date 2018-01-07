import * as React from "react";
import * as ReactDOM from "react-dom";
import {observable, autorun} from "mobx";
import {observer} from "mobx-react";
import DevTools from "mobx-react-devtools";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import {Provider} from "mobx-react";
import {syncHistoryWithStore} from "mobx-react-router";

import { RootStore } from "./stores";

import App from "./containers/App";
import DropFile from "./containers/DropFile";

const rootStore = new RootStore();

const history = syncHistoryWithStore(browserHistory, rootStore.routerStore);

ReactDOM.render(
<Provider {...rootStore}>
    <Router history={history}>
        <Route path="/" component={App}>
            <Route path="/:roomId" component={DropFile}/>
        </Route>
    </Router>
</Provider >, document.getElementById('root'));
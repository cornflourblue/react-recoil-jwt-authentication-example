import { Router, Route } from 'react-router-dom';

import { Nav, PrivateRoute } from '_components';
import { history } from '_helpers';
import { Home } from 'home';
import { Login } from 'login';

export { App };

function App() {
    return (
        <div className="app-container bg-light">
            <Router history={history}>
                <Nav />
                <div className="container pt-4 pb-4">
                    <PrivateRoute exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                </div>
            </Router>
        </div>
    );
}


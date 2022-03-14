import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import {
  LOGIN,
  SIGN_UP,
  DASHBOARD,
  PROFILE,
  NOT_FOUND,
} from './constants/routes';
import './styles/tailwind.css';

const Login = lazy(() => import('./pages/login'));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={LOGIN} component={Login} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;

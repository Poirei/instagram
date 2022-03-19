import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import {
  LOGIN,
  SIGN_UP,
  DASHBOARD,
  PROFILE,
  NOT_FOUND,
} from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';
import './styles/tailwind.css';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const NotFound = lazy(() => import('./pages/not-found'));
const Dashboard = lazy(() => import('./pages/dashboard'));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={LOGIN} component={Login} />
            <Route path={SIGN_UP} component={SignUp} />
            <Route path={NOT_FOUND} component={NotFound} />
            <Route path={DASHBOARD} component={Dashboard} exact />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

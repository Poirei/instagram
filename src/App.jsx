import { lazy, Suspense } from 'react';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';
import ProtectedRoute from './helpers/protected-routes';
import IsUserLoggedIn from './helpers/is-user-logged-in';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/tailwind.css';
import {
  LOGIN,
  SIGN_UP,
  DASHBOARD,
  PROFILE,
  NOT_FOUND,
} from './constants/routes';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const NotFound = lazy(() => import('./pages/not-found'));
const Profile = lazy(() => import('./pages/profile'));
const Dashboard = lazy(() => import('./pages/dashboard'));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <IsUserLoggedIn user={user} loggedInPath={DASHBOARD} path={LOGIN}>
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn user={user} loggedInPath={DASHBOARD} path={SIGN_UP}>
              <SignUp />
            </IsUserLoggedIn>
            <Route path={PROFILE} component={Profile} />
            <Route path={NOT_FOUND} component={NotFound} />
            <ProtectedRoute user={user} path={DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

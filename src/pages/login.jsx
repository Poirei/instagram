import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import FirebaseContext from '../context/firebase';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DASHBOARD } from '../constants/routes';

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = email === '' || password === '';

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push(DASHBOARD);
    } catch (error) {
      resetForm();
      setError(error.message);
    }
  };

  useEffect(() => (document.title = 'Login - Instagram'), []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone with profile" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram logo"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && (
            <p className="mb-4 text-xs text-red-primary">{error.message}</p>
          )}
          <form method="POST" onSubmit={handleLogin}>
            <input
              type="text"
              aria-label="Enter your email address"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 outline-none border border-gray-primary focus:border-b-blue-medium rounded mb-2"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
              autoComplete="email"
            />
            <input
              type="password"
              aria-label="Enter your password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 outline-none border border-gray-primary focus:border-b-blue-medium rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              autoComplete="current-password"
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full h-8 rounded font-bold ${
                isInvalid && 'opacity-50'
              }`}
            >
              Log In
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Don't have an account ?&nbsp;
            <Link to="/sign-up" className="font-bold text-blue-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

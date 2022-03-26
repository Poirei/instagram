import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import FirebaseContext from '../context/firebase';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DASHBOARD } from '../constants/routes';
import { doesUserNameExists } from '../services/firebase';

const SignUp = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = email === '' || password === '';

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setUserName('');
    setFullName('');
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUserNameExists(userName);

    if (usernameExists.length === 0) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult.user.updateProfile({
          displayName: userName,
        });

        await firebase
          .firestore()
          .collection('users')
          .add({
            userId: createdUserResult.user.uid,
            username: userName.toLowerCase(),
            fullName,
            emailAddress: email,
            following: ['SFFAa7RdivS9cCdoWsvl3PCVoM82'],
            followers: [],
            dateCreated: Date.now(),
          });

        history.push(DASHBOARD);
      } catch (error) {
        resetForm();
        setError(error.message);
      }
    } else {
      setError('That username is already taken. Please try another!');
    }
  };

  useEffect(() => (document.title = 'Sign Up - Instagram'), []);

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
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form method="POST" onSubmit={handleSignUp}>
            <input
              type="text"
              aria-label="Enter your username"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 outline-none border border-gray-primary focus:border-b-blue-medium rounded mb-2"
              onChange={({ target }) => setUserName(target.value)}
              value={userName}
            />
            <input
              type="text"
              aria-label="Enter your fullname"
              placeholder="Fullname"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 outline-none border border-gray-primary focus:border-b-blue-medium rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
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
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Already have an account ?&nbsp;
            <Link to="/login" className="font-bold text-blue-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import FirebaseContext from '../context/firebase';
import { useEffect } from 'react';

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = email === '' || password === '';

  const handleLogin = () => {};

  useEffect(() => (document.title = 'Login - Instagram'), []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/public/images/iphone-with-profile.jpg"
          alt="iPhone with profile"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <p>I will be the form</p>
      </div>
    </div>
  );
};

export default Login;

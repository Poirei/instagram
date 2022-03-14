import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './context/firebase';
import { FieldValue, app } from './lib/firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase: app, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

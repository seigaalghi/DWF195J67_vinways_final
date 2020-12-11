import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import PopUp from './components/PopUp';
import Login from './pages/Login';
import Register from './pages/Register';
import Registered from './pages/Registered';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import UploadProgres from './components/UploadProgres';

// REDUX
import store from './redux/store';
import { Provider } from 'react-redux';
import setAuth from './redux/utility/setAuthToken';
import { loadUser } from './redux/action/auth';
import { useEffect } from 'react';

if (localStorage.token) {
  setAuth(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <PopUp />
          <UploadProgres />
          <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <PrivateRoute
              exact
              path={['/', '/artist/:artistId', '/playlist/', '/payment', '/add-artist', '/add-music', '/list-trans', '/management']}
              component={Registered}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
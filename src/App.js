import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
//Components
import Table from './components/Table';
import Login from './components/Login';
import AuthRoute from './util/AuthRoute';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './redux/types';

//Firebase
import { admin } from './firebaseConfig';
import { getUserData } from './redux/actions/dataActions';

const theme = createMuiTheme(themeFile);

function App() {
  useEffect(() => {
    let unsuscribeFromAuth = null;

    unsuscribeFromAuth = admin.onAuthStateChanged((user) => {
      if (user) {
        store.dispatch({ type: SET_AUTHENTICATED });
        store.dispatch(getUserData(user.uid));
      } else {
        store.dispatch({ type: SET_UNAUTHENTICATED });
      }
    });
    return () => {
      unsuscribeFromAuth();
    };
  }, []);
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <div className='container'>
            <Switch>
              <AuthRoute exact path='/' component={Login} />
              <Route exact path='/inventario' component={Table} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;

import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
//Components
import NavBar from './components/NavBar';
import Table from './components/Table';

const theme = createMuiTheme(themeFile);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <NavBar />
      <Table />
    </MuiThemeProvider>
  );
}

export default App;

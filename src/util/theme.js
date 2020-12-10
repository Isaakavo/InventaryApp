const theme = {
  palette: {
    primary: {
      light: '#f05545',
      main: '#b71c1c',
      dark: '#7f0000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      // main: '#fff',
      dark: '#b22a00',
      contrastText: '#fff',
    },
  },
  spreadThis: {
    root: {
      width: '100%',
      marginTop: '15px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    table: {
      minWidth: 100,
      fontWeight: 'bold',
    },
    tableContainer: {
      maxHeight: 700,
    },
    textField: {
      margin: '5px auto ',
      width: '70%',
    },
    headerRow: {
      fontWeight: 'bold',
    },
    button: {
      position: 'relative',
      width: '50%',
      margin: '15px auto',
    },
    progress: {
      position: 'absolute',
    },
    formControl: {
      margin: '10px auto 10px 50px',
      paddingTop: '10px',
      paddingBottom: '5px',
      minWidth: 120,
      borderColor: '#fff',
      color: '#fff',
    },
    selectEmpty: {
      marginTop: 10,
    },
    exportButton: {
      // marginLeft: '85%',
    },
    form: {
      textAlign: 'center',
      padding: '20px',
    },
    pageTitle: {
      margin: '10px auto 10px auto',
    },
    login: {
      // width: '30%',
      margin: '150px auto',
      padding: '8px',
      paddingTop: '10px',
      paddingBottom: '20px',
      textAlign: 'center',
    },
    loginForm: {
      display: 'flex',
      flexDirection: 'column',
    },
    imageContainer: {
      paddingTop: '10px',
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
};

export default theme;

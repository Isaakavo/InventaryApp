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
      // main: '#ff3d00',
      main: '#fff',
      dark: '#b22a00',
      contrastText: '#fff',
    },
  },
  spreadThis: {
    root: {
      width: '95%',
      marginTop: '120px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    table: {
      minWidth: 100,
      fontWeight: 'bold',
    },
    tableContainer: {
      maxHeight: 610,
    },
    textField: {
      margin: '10px auto 10px auto',
    },
    headerRow: {
      fontWeight: 'bold',
    },
    button: {
      marginTop: 20,
      position: 'relative',
    },
    progress: {
      position: 'absolute',
    },
    formControl: {
      margin: '10px auto 10px 50px',
      paddingTop: '15px',
      paddingBottom: '5px',
      minWidth: 120,
      borderColor: '#fff',
      color: '#fff',
    },
    selectEmpty: {
      marginTop: 10,
    },
  },
};

export default theme;

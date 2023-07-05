import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import TableStateProvider from './contexts/TableState.context';
import CustomThemeProvider from './contexts/Theme.context';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      {/* <TableStateProvider> */}
        <App />
      {/* </TableStateProvider> */}
    </CustomThemeProvider>
  </React.StrictMode>
);



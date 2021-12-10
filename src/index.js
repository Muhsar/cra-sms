/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import "style.css"
// import reportWebVitals from 'reportWebVitals';
import { QueryClientProvider, QueryClient } from 'react-query';
const queryClient = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


// console.log(reportWebVitals());
// reportWebVitals(console.log);

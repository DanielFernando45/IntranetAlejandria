import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from './store/';
import { Provider } from "react-redux";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,

)

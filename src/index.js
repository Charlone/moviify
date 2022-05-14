import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ReduxProvider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ReduxProvider>
);

reportWebVitals();

import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme'
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

//redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from "redux-persist/integration/react";
import reducers from "./redux/reducers/";

//redux
const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer);
const persitore = persistStore(store);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persitore}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);


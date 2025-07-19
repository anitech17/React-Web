// src/main.tsx
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import type { SnackbarKey } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { CustomSnackbar } from './Components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        preventDuplicate
        Components={{
          default: CustomSnackbar,
          success: CustomSnackbar,
          error: CustomSnackbar,
          warning: CustomSnackbar,
          info: CustomSnackbar,
        }}
        action={(snackbarId: SnackbarKey) => (
          <IconButton onClick={() => closeSnackbar(snackbarId)} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        )}
      >
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
);

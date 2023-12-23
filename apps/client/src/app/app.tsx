import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginRegisterPage } from './pages/login/LoginRegisterPage';
import { AppLayout } from './components/common/AppLayout/AppLayout';

const queryClient = new QueryClient();

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: '#665080',
        bg: 'white',
        margin: 0,
        padding: 0,
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        color: '#665080',
        _hover: { color: '#665080' },
        _active: { color: '#665080' },
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={
                <AppLayout>
                  <LoginRegisterPage isFor="Login" />
                </AppLayout>
              }
              path="/login"
            />
            <Route
              element={
                <AppLayout>
                  <LoginRegisterPage isFor="Register" />
                </AppLayout>
              }
              path="/register"
            />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;

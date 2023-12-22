import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { AppLayout } from './components/common/AppLayout/AppLayout';

const queryClient = new QueryClient();

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: 'pink.800',
        bg: 'white',
        margin: 0,
        padding: 0,
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
                  <Login />
                </AppLayout>
              }
              path="/login"
            />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;

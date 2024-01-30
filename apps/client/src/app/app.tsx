import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppLayout } from './components/common/AppLayout/AppLayout';
import { LoginRegisterPage } from './pages/LoginRegisterPage/LoginRegisterPage';
import { TodosPage } from './pages/TodosPage/TodosPage';
import { useIsAuthenticated } from './hooks/useIsAuthenticated';

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
  const isUserAuthenticated = useIsAuthenticated();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route
                index
                element={
                  !isUserAuthenticated ? (
                    <LoginRegisterPage isFor="Login" />
                  ) : (
                    <Navigate to="/todos" replace />
                  )
                }
                path="/login"
              />
              <Route
                element={
                  !isUserAuthenticated ? (
                    <LoginRegisterPage isFor="Register" />
                  ) : (
                    <Navigate to="/todos" replace />
                  )
                }
                path="/register"
              />
              <Route
                element={
                  isUserAuthenticated ? (
                    <TodosPage />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
                path="/todos"
              />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;

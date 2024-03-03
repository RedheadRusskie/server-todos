import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppLayout } from './components/common/AppLayout/AppLayout';
import { LoginRegisterPage } from './pages/LoginRegisterPage/LoginRegisterPage';
import { TodosPage } from './pages/TodosPage/TodosPage';

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
        _focus: {
          boxShadow: '#665080',
          outline: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route
                path="login"
                element={<LoginRegisterPage isFor="Login" />}
              />
              <Route
                path="register"
                element={<LoginRegisterPage isFor="Register" />}
              />

              <Route path="todos" element={<TodosPage />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;

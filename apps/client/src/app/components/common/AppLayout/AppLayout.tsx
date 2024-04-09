import { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import styles from './AppLayout.module.scss';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();

  const shouldHideLayout =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <Box className={styles.appBg}>
      <Flex direction="column" minH="100vh">
        <Box as="main" flex="1">
          {children}
        </Box>
        {!shouldHideLayout && <Footer />}
      </Flex>
    </Box>
  );
};

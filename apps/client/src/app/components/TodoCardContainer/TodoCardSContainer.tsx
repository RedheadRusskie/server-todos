import { ReactNode } from 'react';
import { Box, Center, SimpleGrid } from '@chakra-ui/react';
import styles from './TodoCardsContainer.module.scss';

interface TodoCardsContainerProps {
  children: ReactNode;
}

export const TodoCardsContainer: React.FC<TodoCardsContainerProps> = ({
  children,
}) => (
  <Center>
    <Box
      className={styles.scrollContainer}
      mx="2em"
      maxW={{ base: '95%', md: '1300px' }}
      w={{ base: '100%', md: '85%' }}
    >
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {children}
      </SimpleGrid>
    </Box>
  </Center>
);

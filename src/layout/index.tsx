import { Nav } from '@/components';
import { ReactNode } from 'react';
import Container from '../common/ui/Container/Container';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container as="main" className="max-w-[1990px]  w-full mx-auto  min-h-[100vh]">
      <Nav />
      {children}
    </Container>
  );
};

export default MainLayout;

import { NextPage } from 'next';

import { Hero, Products } from '@/components';

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <Products />
    </>
  );
};

export default Home;

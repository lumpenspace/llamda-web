import React from 'react';
import { AsciiBG } from '@/components/asciirenderer/AsciiExamples';
import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>qliphoth:systems</title>
      </Head>
      <AsciiBG />
    </>
  );
};
  export default Home;
"use client"
import React, { useEffect, useState } from 'react';
import { AsciiBG } from '@/components/asciirenderer/AsciiExamples';
import Head from 'next/head';
import useDeviceOrientation  from '@/components/asciirenderer/useOrientation';

const Home = () => {
  const {orientationChange} = useDeviceOrientation();


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
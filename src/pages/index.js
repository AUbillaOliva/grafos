import { MainLayout, Container } from '@components/Layout';
import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import Network from '@components/Network'
import { ThemeProvider } from 'styled-components';
import Navbar from '@components/Navbar';
import Graph from 'templates/Graph';
import Footer from '@components/Footer';

const Home = () => {

  const theme = useSelector((state) => state.persistedThemeReducer.theme);

  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
      <MainLayout>
        <Container>
          <Graph/>
        </Container>
      </MainLayout>
      {/* <Footer/> */}
    </ThemeProvider>
  )

}

export default Home;
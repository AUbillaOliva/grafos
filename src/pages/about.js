import { Divider } from '@components/Divider';
import { Container, MainLayout } from '@components/Layout';
import Navbar from '@components/Navbar';
import { Subtitle, Text, Title } from '@components/Text';
import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

const About = () => {

    const theme = useSelector((state) => state.persistedThemeReducer.theme);

    return (
        <ThemeProvider theme={theme}>
            <Navbar />
            <MainLayout>
                <Container>
                    <Title>About</Title>
                    <Subtitle>About</Subtitle>
                    <Divider/>
                    <Text>Deserunt eiusmod sint et adipisicing adipisicing incididunt voluptate. Id consequat ut occaecat elit. Proident cupidatat enim eiusmod mollit ea officia exercitation excepteur nulla mollit elit cupidatat.</Text>
                </Container>
            </MainLayout>
        </ThemeProvider>
    )
}

export default About;

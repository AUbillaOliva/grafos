import styled from "styled-components";

export const MainLayout = styled.div`
    background-color: ${(props) => props.theme.BACKGROUND.SURFACE};
    min-height: 100%;
    position: relative;
`;

export const Container = styled.div`
    padding: 10%;
    height: 100%;
    width: 100%;

    @media screen and (max-width: 992px) {
        padding: 15% 5%;
    }
`;
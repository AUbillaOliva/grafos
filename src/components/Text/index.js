import styled from "styled-components";

export const Title = styled.h1`
    color: ${(props) => props.theme.TEXT.PRIMARY};
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 42px;
`;

export const Subtitle = styled.h4`
    color: ${(props) => props.theme.TEXT.PRIMARY};
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 24px;
`;

export const Text = styled.p`
    color: ${(props) => props.theme.TEXT.PRIMARY};
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
`;

export const ErrorText = styled.p`
	color: ${(props) => props.theme.ERROR_COLOR};
	display: inline-block;
	letter-spacing: 0.017057rem;
	font-size: 0.9rem;
	text-align: justify;
	font-weight: 400;
`;

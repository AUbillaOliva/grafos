import styled from "styled-components";

export const Divider = styled.div`
    background-color: ${(props) => props.theme.DIVIDER_COLOR};
    height: 2px;
    width: 100%;
    margin: 15px 0;
`;
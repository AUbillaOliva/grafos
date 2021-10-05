import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Icon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.BUTTON.TEXT.PRIMARY};
    cursor: pointer;
`
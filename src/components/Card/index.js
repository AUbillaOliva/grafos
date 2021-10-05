import styled from "styled-components";
import PropTypes from 'prop-types';

const CardContainer = styled.div`
    background-color: ${(props) => props.theme.BACKGROUND.PRIMARY};
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.35);
    border-radius: 15px;
    height: ${(props) => props.height};
`;

const Card = (props) => {
    return (
        <CardContainer onClick={props.onClick} height={props.height}>
            {props.children}
        </CardContainer>
    )
}

Card.Container = CardContainer;

Card.propTypes = {
    height: PropTypes.any,
    children: PropTypes.any
}

export default Card;
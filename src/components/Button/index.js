import styled from "styled-components";
import PropTypes from 'prop-types';
import { FontAwesomeIcon, IconDefinition } from "@fortawesome/react-fontawesome";
import { Icon } from "@components/Icon";

const ButtonContainer = styled.button`
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.35);
    background-color: ${(props) => props.theme.BUTTON.BACKGROUND.PRIMARY};
    color: ${(props) => props.theme.BUTTON.TEXT.PRIMARY};
    border-radius: 8px;
    padding: 10px;
    margin: 10px;
    border: none;
    transition: box-shadow 150ms ease-in-out;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    cursor: pointer;

    &:hover {
        box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.35);
    }

    &:active {
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
    }
`;

const Button = (props) => {
    return (
        <ButtonContainer onClick={props.onClick}>
            <div className="row center">
                <Icon className="mh-2" icon={props.icon}/>
                {props.text}
            </div>
        </ButtonContainer>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.object,
}

export default Button;


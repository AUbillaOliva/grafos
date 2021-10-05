import styled from 'styled-components';
import React from 'react'
import { useDispatch } from 'react-redux';

// Store
import store from '@redux/store';

// Action
import { switchTheme } from '@redux/actions/theme.action';

// Themes
import { LightTheme, DarkTheme } from '@constants/theme/theme';

const StyledSwitch = styled.input`
	&:checked + .slider {
		background-color: ${(props) => props.theme.COLOR_ACCENT};
	}
`;
 
export const SwitchContainer = styled.label`
    user-select: none;
    position: relative;
    display: block;
    right: 0;
    margin: auto 20px;
    width: 50px;
    height: 24px;
    float: right;

    @media screen and (max-width: 992px) {
        margin: 20px auto;
        float: none;
    }

    input {
        opacity: 0;
        width: 0;
        height: 0;
    
        &:focus + .slider {
          box-shadow: 0 0 1px #2196f3;
        }
    
        &:checked + .slider {
          &:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
          }
        }
    }
`;

export const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;

    &::before {
        position: absolute;
        border-radius: 50%;
        content: "";
        height: 23px;
        width: 23px;
        left: 1px;
        bottom: 1px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }
}
`;

const Switch = () => {

    const dispatch = useDispatch();

    const handleSwitch = () => {
        if (store.getState().persistedThemeReducer.theme.mode === "light") {
            dispatch(switchTheme(DarkTheme));
        } else {
            dispatch(switchTheme(LightTheme));
        }
    }

    return (
        <SwitchContainer>
            <StyledSwitch type="checkbox" onChange={() => handleSwitch()} checked={store.getState().persistedThemeReducer.theme.mode === "light" ? false : true} />
            <Slider className="slider">🌜  🌞</Slider>
        </SwitchContainer>
    )
}

export default Switch;
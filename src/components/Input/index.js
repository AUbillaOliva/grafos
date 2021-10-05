import styled from "styled-components";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import { ErrorText, Subtitle, Text } from "@components/Text";
import { isEmpty } from "utils/validate";

// Interface

export const InputContainer = styled.div`
	display: block;
	width: 100%;
	position: relative;

	input[type=number].no-spinner::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
    	-webkit-appearance: none; 
     	margin: 0; 
	}
`;

export const InputComponent = styled.input`
	position: relative;
	margin: 0;
	color: ${(props) => props.theme.TEXT.PRIMARY};
	background-color: ${(props) => props.theme.BACKGROUND.PRIMARY};
	display: block;
	font-size: 16px;
	font-family: "Roboto", sans-serif;
	padding: 5px 10px;
	width: 100%;
	min-height: 38px;

	border-radius: 5px;
	border: 1px solid ${(props) => props.theme.DIVIDER_COLOR};
	outline: none;

	&:focus, &:active {
		border: 1px solid ${(props) => props.theme.COLOR_ACCENT};
	}
`;

export const TextAreaInput = styled.textarea`
	font-size: 16px;
	color: ${(props) => props.theme.TEXT.PRIMARY};
	background-color: ${(props) => props.theme.BACKGROUND.PRIMARY};
	font-family: "Roboto", sans-serif;
	width: 100%;
	max-width: 100%;
	max-height: 200px;
	padding: 10px;
	min-width: 100%;

	border-radius: 5px;
	border: 1px solid ${(props) => props.theme.DIVIDER_COLOR};
	
	&:focus {
		outline: none;
	}
`;

export const InputSubmit = styled.input`
	display: block;
	color: ${(props) => props.theme.BUTTON_TEXT_COLOR};
	background-color: ${(props) => props.theme.COLOR_ACCENT};
	padding: 10px 15px;
	border: none;
	outline: none;
	cursor: pointer;
	font-family: 'Poppins', sans-serif;
	font-weight: 700;
	border-radius: 5px;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
	transition: box-shadow 200ms ease-in-out;

	&:hover {
		box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
	}
`;

// TODO: PROP TYPES
export const TextArea = (props) => {

    const [count, setCount] = useState(0);
    const [hasErrors, setHasErrors] = useState(false);
    const theme = useSelector((state) => state.persistedThemeReducer.theme);

    const handleInput = (e) => {

        setCount(e.target.value.length);

        if (e.target.value.length > props.maxLength) {
            setHasErrors(true);
            e.target.style.borderColor = theme.ERROR_COLOR;
        } else if (props.required) {
            if (e.target.value.length < 1) {
                setHasErrors(true);
                e.target.style.borderColor = theme.ERROR_COLOR;
            }
        } else {
            setHasErrors(false);
            e.target.style.borderColor = "rgba(0, 0, 0, 0.15)";
        }
    }

    return (
        <InputContainer>
            <Subtitle className="mv-3">{props.label}</Subtitle>{props.required ? <ErrorText className="ml-1">*</ErrorText> : null}
            <TextAreaInput
                placeholder={props.placeholder}
                id={props.name}
                required={props.required}
                value={props.value}
                defaultValue={props.defaultValue}
                onChange={(e) => { handleInput(e), props.onChange(e) }}
            />
            <div className="row">
                {hasErrors ?? props.errorMessage !== undefined ? <Text color={theme.ERROR_COLOR} align={'start'}>{props.errorMessage}</Text> : null}
                {props.maxLength !== undefined ? <Text align="end" color={count > props.maxLength ? theme.ERROR_COLOR : theme.TEXT.PRIMARY} >{count + "/" + props.maxLength}</Text> : null}
            </div>

        </InputContainer>
    );

}

export const Input = (props) => {

    const [count, setCount] = useState(0);
    const [hasErrors, setHasErrors] = useState(false);
    const theme = useSelector((state) => state.persistedThemeReducer.theme);

    const handleInput = (e) => {
        setCount(e.target.value.length);

        if (props.errorEnabled) {
            if (e.target.value.length > props.maxLength) {
                setHasErrors(true);
                e.target.style.borderColor = theme.ERROR_COLOR;
            } else if (e.target.value.length < 1) {
                setHasErrors(true);
                e.target.style.borderColor = theme.ERROR_COLOR;
            } else {
                setHasErrors(false);
                e.target.style.borderColor = "rgba(0, 0, 0, 0.15)";
            }
        }
    }

    /* const onClearClick = (e) => {
        setCount(0)
        props.onClearClick(() => {
            setCount(0)
        })
    } */

    return (
        <InputContainer>
            {!isEmpty(props.label) ? (<Fragment><Subtitle className="mv-3">{props.label}</Subtitle>{props.required ? <ErrorText className="ml-1">*</ErrorText> : null}</Fragment>) : null}

            <div className="row" style={{ height: 38, position: 'relative' }}>
                <InputComponent
                    pattern={props.pattern}
                    className={props.className}
                    type={props.type}
                    placeholder={props.placeholder}
                    max={props.maxLength}
                    id={props.id}
                    name={props.name}
                    value={props.value}
                    required={props.required}
                    disabled={props.disabled}
                    onChange={(e) => { handleInput(e), props.onChange(e) }}
                    min={1}
                    style={props.style}
                    autoComplete={props.autoComplete}
                    defaultValue={props.defaultValue}
                    autoCorrect={props.autoCorrect}
                />
                {
                    props.clearable ?
                        <div style={{ position: 'absolute', right: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 38 }}>
                            {count > 0 ? <FontAwesomeIcon icon={faTimes} style={{ color: theme.TEXT.PRIMARY }} onClick={(e) => onClearClick(e)} /> : null}
                        </div>
                        : null
                }
            </div>
            <div className="row">
                <div className="w-80">
                    {props.errorMessage !== undefined ? hasErrors ? <Text className="mt-1" color={theme.ERROR_COLOR} align={'start'}>{props.errorMessage}</Text> : null : null}
                    {props.helperMessage !== undefined ? <Text className="mt-3" color={theme.TEXT.PRIMARY} align={'start'}>{props.helperMessage}</Text> : props.helperMessage}
                </div>
                <div className="w-20">
                    {props.maxLength !== undefined ? <Text align="end" color={count > props.maxLength ? theme.ERROR_COLOR : theme.TEXT.PRIMARY} >{count + "/" + props.maxLength}</Text> : null}
                </div>
            </div>
        </InputContainer >
    );
};

Input.propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    helperMessage: PropTypes.string,
    pattern: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    maxLength: PropTypes.number,
    errorMessage: PropTypes.string,
    errorColor: PropTypes.string,
    icon: PropTypes.any,
    style: PropTypes.objectOf(React.CSSProperties),
    errorEnabled: PropTypes.bool,
    autoComplete: PropTypes.string,
    autoCorrect: PropTypes.string,
    defaultValue: PropTypes.string,
    onClearClick: PropTypes.any,
    disabled: PropTypes.bool,
    clearable: PropTypes.bool,
    ref: PropTypes.objectOf(React.Ref)
}

/* interface SubmitInputProps {
    title: string;
    className?: string;
    style?: any;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
} */

export const Submit = (props) => {

    const validateForm = (e) => {
    }

    return (
        <InputSubmit className={props.className} type="submit" onClick={props.onClick} onSubmit={(e) => e.preventDefault()} value={props.title} style={props.style} />
    )
}

export default Input;


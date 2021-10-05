import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useCallback, useEffect, useRef, MouseEvent } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import store from '@redux/store';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export const ModalContainer = styled.div`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    color: ${(props) => props.theme.TEXT.PRIMARY};
    display: flex;
    height: 100%;
    justify-content: center;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999999;
`;

export const ModalWrapper = styled.div`
    align-items: center;
    background-color: ${(props) => props.theme.PRIMARY_COLOR};
    border-radius: 10px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 900px;
    min-width: 60%;
    padding: 20px;
    margin: 20px;
    position: relative;
    width: ${(props) => props.width !== undefined ? props.width : '100%'};
    height: ${(props) => props.height !== undefined ? props.height : 'auto'};
    z-index: 999999;

    max-height: 70%;
    overflow: auto;

    @media screen and (max-width: 992px) {
        max-width: 90%;
        width: 90%;
        right: 0;
    }
`;

export const CloseModalButton = styled(FontAwesomeIcon)`
    cursor: pointer;
    height: 32px;
    padding: 0;
    position: absolute;
    right: 30px;
    top: 20px;
    width: 32px;
    z-index: 3;
`;

const Modal = (props) => {

    const modalRef = useRef();
    const theme = useSelector((state) => state.persistedThemeReducer.theme);

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            props.setModalShow(false);
        }
    };

    const onUserAuth = () => {
        store.subscribe(() => props.setModalShow(false));
    }

    const keyPress = useCallback(
        (e) => {
            if (e.key === 'Escape' && props.showModal) {
                props.setModalShow(false);
            }
        },
        [props.setModalShow, props.showModal]
    );

    useEffect(
        () => {
            onUserAuth();
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    return (
        <Fragment>
            {
                props.showModal ?
                    <ModalContainer className={props.className} onClick={(e) => closeModal(e)} ref={modalRef}>
                        <ModalWrapper height={props.height} width={props.width}>
                            {props.children}
                            <CloseModalButton
                                color={theme.TEXT.PRIMARY}
                                aria-label='Close modal'
                                icon={faTimes}
                                onClick={() => props.setModalShow((prev) => !prev)}
                                size="2x" />
                        </ModalWrapper>
                    </ModalContainer>
                    : null
            }
        </Fragment>
    )
}

Modal.propTypes = {
    showModal: PropTypes.bool,
    setModalShow: PropTypes.func,
    children: PropTypes.any,
    width: PropTypes.any,
    height: PropTypes.any,
    className: PropTypes.string
}

export default Modal;
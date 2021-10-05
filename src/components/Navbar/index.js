import { Component, useEffect } from "react";
import styled from "styled-components";
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useRouter } from "next/dist/client/router";
import Switch from "@components/Switch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from "@components/Icon";

const NavbarContainer = styled.nav`
    background-color: ${(props) => props.theme.BACKGROUND.PRIMARY};
    height: 50px;
    padding: 0 10%;
    position: relative;
    z-index: 999;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.35);
`;

const NavbarList = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: absolute;
    top: 0;
    margin: 0;
    right: 10%;
`;

const NavbarLogo = styled.div`

`;

const NavbarListItem = styled.li`
    color: ${(props) => props.theme.TEXT.NAVLINK};
    font-family: 'Poppins', serif;
    font-weight: 800;
    cursor: pointer;
    margin: 0 10px;

    &:hover {
        color: ${(props) => props.theme.COLOR_ACCENT};
    }
`;

const NavbarListItemComponent = (props) => {

    const router = useRouter();

    return (
        <NavbarListItem onClick={() => router.push(props.path)}>
            {props.label}
        </NavbarListItem>
    )
}

NavbarListItemComponent.propTypes = {
    path: PropTypes.string,
    label: PropTypes.string.isRequired,
}

const Navbar = () => {

    const router = useRouter();

    return (
        <NavbarContainer>
            <NavbarLogo>
                {
                    // TODO
                }
            </NavbarLogo>
            <NavbarList>
                <Switch className="mh-3" />
                {
                    router.pathname !== '/' && <NavbarListItemComponent label="Inicio" path="/" />
                }
                <NavbarListItemComponent label="Acerca de" path="/about" />
                <NavbarListItemComponent label="Código" path="/code" />
            </NavbarList>
        </NavbarContainer>
    )
}

export default Navbar;
import styled from 'styled-components';
import { Subtitle, Text } from '@components/Text';
import { Divider } from '@components/Divider';

const FooterContainer = styled.footer`
    background-color: ${(props) => props.theme.BACKGROUND.PRIMARY};
    padding: 10%;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <Subtitle>Acerca de</Subtitle>
                        <Divider />
                        <Text>Dolore nulla sint voluptate commodo velit ipsum velit occaecat eiusmod consequat excepteur. Lorem ex magna culpa ullamco ipsum officia aliqua reprehenderit eu ad. Voluptate velit non adipisicing sunt ex commodo amet ut Lorem excepteur consequat exercitation. Sint magna nisi ipsum irure mollit nostrud voluptate tempor exercitation officia aute eu labore eiusmod. Ea occaecat labore ex ipsum incididunt commodo ipsum.</Text>
                    </div>
                    <div className="col-4">
                        <Subtitle>Acerca de</Subtitle>
                        <Divider />
                        <Text>Dolore nulla sint voluptate commodo velit ipsum velit occaecat eiusmod consequat excepteur. Lorem ex magna culpa ullamco ipsum officia aliqua reprehenderit eu ad. Voluptate velit non adipisicing sunt ex commodo amet ut Lorem excepteur consequat exercitation. Sint magna nisi ipsum irure mollit nostrud voluptate tempor exercitation officia aute eu labore eiusmod. Ea occaecat labore ex ipsum incididunt commodo ipsum.</Text>
                    </div>
                    <div className="col-4">
                        <Subtitle>Acerca de</Subtitle>
                        <Divider />
                        <Text>Dolore nulla sint voluptate commodo velit ipsum velit occaecat eiusmod consequat excepteur. Lorem ex magna culpa ullamco ipsum officia aliqua reprehenderit eu ad. Voluptate velit non adipisicing sunt ex commodo amet ut Lorem excepteur consequat exercitation. Sint magna nisi ipsum irure mollit nostrud voluptate tempor exercitation officia aute eu labore eiusmod. Ea occaecat labore ex ipsum incididunt commodo ipsum.</Text>
                    </div>
                </div>
                <div className="center">Página creada con </div>
            </div>
        </FooterContainer>
    )
}

export default Footer;
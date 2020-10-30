import React from 'react';
import { Row } from 'simple-flexbox';
import logo from '../../assets/img/logo.png';

function Logo() {
    return (
        <Row className="logo-container" horizontal="start" vertical="center">
            <span className="logo-title">Toggly </span>
            <img src={logo} alt="avatar" className="logo-img cursorPointer" />
        </Row>
    );
}

export default Logo;
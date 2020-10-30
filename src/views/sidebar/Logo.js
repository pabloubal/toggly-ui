import React from 'react';
import { Row } from 'simple-flexbox';

function Logo() {
    return (
        <Row className="logo-container" horizontal="center" vertical="center">
            <span className="logo-title">Toggly</span>
        </Row>
    );
}

export default Logo;
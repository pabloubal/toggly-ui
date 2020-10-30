 
import { string } from 'prop-types';
import React from 'react';
import { Row } from 'simple-flexbox';
import './Header.css';

function HeaderComponent(props) {
  const { icon, title, ...otherProps } = props;
  return (
      <Row className="container" vertical="center" horizontal="space-between" {...otherProps}>
          <span className="title">{title}</span>
          <Row vertical="center">
              
              <div className="separator"></div>
              <Row vertical="center">
                  <span className="name cursor-pointer">Anonymous user</span>
                  <img src="https://winaero.com/blog/wp-content/uploads/2019/09/Chrome-Incognito-Mode-Icon-256.png" alt="avatar" className="avatar cursorPointer" />
              </Row>
          </Row>
      </Row>
  );
}

HeaderComponent.propTypes = {
  title: string
};

export default HeaderComponent;
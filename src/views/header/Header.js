 
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
                  <span className="name cursor-pointer">User</span>
                  <img src="https://camo.githubusercontent.com/7710b43d0476b6f6d4b4b2865e35c108f69991f3/68747470733a2f2f7777772e69636f6e66696e6465722e636f6d2f646174612f69636f6e732f6f637469636f6e732f313032342f6d61726b2d6769746875622d3235362e706e67" alt="avatar" className="avatar cursorPointer" />
              </Row>
          </Row>
      </Row>
  );
}

HeaderComponent.propTypes = {
  title: string
};

export default HeaderComponent;
import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from "prop-types";

const PrivateHeader = ({title}) => (
  <div className="header">
    <div className="header__content">
    <h1 className="header__title">{title}</h1>
    <button className="button button--link-text" onClick={ () => Accounts.logout() }>Logout</button>
    </div>
  </div>
);

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PrivateHeader;
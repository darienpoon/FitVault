import React from 'react';

const MyAccount = ({onMyAcc}) => {
  return onMyAcc ? (
    <div>
      <h3>My Account Page Content</h3>
    </div>
  ) : 'null';
};

export default MyAccount;
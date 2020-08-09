import React from 'react';

import './maintheme.css';

export default function MainTheme(props) {
  return (
    <div className="main--dark-theme">
      {props.children}
    </div>
  );
}
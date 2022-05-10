import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

// Бул жерде headerдеги A Typical Page текстию Бул сайтка киргенде эле чыгып турат
// Ичинде Navigation компонентти камтыйт жана пропс берет

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      <Navigation isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} />
    </header>
  );
};

export default MainHeader;

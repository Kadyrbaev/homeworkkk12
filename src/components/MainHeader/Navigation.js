import React from 'react';

import classes from './Navigation.module.css';

// Мында Logout тан башка эч кандай логика жок, Жон гана киргизип койгонбуз.
// Ал эми Logout бул бизге App.jsтен logoutHandler деген функциядан келген
// просттан onLogout келди жана бул onClickти иштетет

const Navigation = (props) => {
  return (
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

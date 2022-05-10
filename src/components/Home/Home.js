import React from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';

// App.js теги login (IsLoggedId) болсо Welcome back conteiner чыгат
// Welcome back жон гана экранга корунот

const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
    </Card>
  );
};

export default Home;

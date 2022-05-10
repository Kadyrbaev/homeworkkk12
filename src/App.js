import React, { useState } from 'react';
import { useEffect } from 'react'

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

  // App.js функциясы озунун ичинде MainHeader,Login,Home компоненттерин озунун ичинде чакырат
  // 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Бул жерде useEffect перезагруска кылганда isLoggedInди текшерет ал бар болсо setIsLoggedIn труе болот
  // Бул туура болгон болсо Home функциябыз чакырылат. Тагыраагы биз регистрация кылдык дегенибиз.
  // Ал томондогу функцияда берилген (loginHandler функциясы) localStorage.setItem('isLoggedIn', '1')
  useEffect(()=>{
    const storedUserLoggedInfo = localStorage.getItem('isLoggedIn')

    if(storedUserLoggedInfo === '1'){
      setIsLoggedIn(true)
    }
  }, [])

  // localStorage ке сактап атабыз. Биз sideEffectти функциянын ичине беришибиз кк, анткени 
  // функциядан сыртта берсек  isLoggedIn озгоргон сайын аны localStorageке сактай берет.
  // 1 деген (true)
  // Бул функция email, password сактап жатат жана setIsLoggedIn true болот;
  //

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true);
  };
  
  // Бул logout кнопкасы (button). Мындагы  localStorage.removeItem('isLoggedIn') коду кнопка баылган сайын
  // localStorage тазаланып турушу учун. 

  const logoutHandler = async () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;

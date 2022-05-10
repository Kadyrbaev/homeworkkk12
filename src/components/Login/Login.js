
import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState(''); // inputta jazylgan email
  const [emailIsValid, setEmailIsValid] = useState(); // boolean, email tuura je tuura emes jazylganyn tekweret
  const [enteredPassword, setEnteredPassword] = useState(''); // passwor
  const [passwordIsValid, setPasswordIsValid] = useState(); // passworddu tekweret
  const [formIsValid, setFormIsValid] = useState(false); // bul email,pasword ekoonu ten tekweret


// Мында useEffect - email жана password le проверка кылат.
// Бул ошол инпуттун ичиндеги значенияда @ (собачка (email)) бар болуш кк жана
//  пароль 6 мааниден (сандан) жогору болушу кк деген логиканы берип жатат.
// Мында setTimeout функциясы жок пусттой массив [] калтырсак да иштейт. Бирок ал бир гана жолу
// иштейт жана башка нерсе кошсок ал кайра башынан текшербейт. Ошон учун массивдин [dependencies] ичине 
// [enteredEmail, enteredPassword] бул значенияларды беришибиз керек. Бул экоо бирнерсе жазган сайын 
// useEffecte да иштеп озгоруп турат.

// Бул нерсе мн эле проблема чечилип калган жок. Себеби бул биз ар бир букваны баскан сайын проверка журуп жатат.
// Бул нерсе туура эмес, бул биз жазып буткондо гана бир проверка кылышы керек. Бул нерсе реактта Debauncing деп аталат.
// Ал ушул проблемадан качуу учун setTimeout колдонобуз. Бул мн деле проблема чечилбейт.Бул да
// ошол сыяктуу эле логика биз канча жолу буква бассак ошончо проверка кылып салат (биз берген секунда мн)
// Ошол учун биз clearTimeout функ колдонобуз. Бул ошол проверканы тазалап турат. Мына ушул нерсе биздин 
// баскан проверканы контроль кылып турат. Бул timer ди тазалап турат жана бизге жазып буткондо 1 эле проверканы
// чыгарып берет.

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6
    );
    console.log('change');
    }, 1000)

    // clean up function
    return ()=>{
      clearTimeout(timer)
    } 
    
  }, [enteredEmail, enteredPassword])

  // Бул функция кадимки эле инпуттан келген значениени сактаган onChange функциясы
  // (email ди сактайт)

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

  };

  // Бул функция дагы инпуттан келген значениени сактаган onChange функциясы
  // (password  сактайт)

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

  };
  // onBlur событиясы берилген бул функцияларга
  // Фокус болгондо иштоочу функция (тагыраагы фокус болуп буткондо)
  // Инпуттун сырткы корунушун козомолдойт
  // Бул функция инпуттун ичиндеги значенияда @ (собачка (email)) бар болуш кк деген проверканы 
  // жургузуп жатат. includes аркылуу. Ушул шарттар аткарылса анда (true)

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  // Фокус болгондо иштоочу функция (тагыраагы фокус болуп буткондо)
  // Инпуттун сырткы корунушун козомолдойт
  // Бул да проверка кылыт парольго. Демек бул жерде пароль 6 мааниден (сандан) жогору болушу кк.
  // мында пробелдерди кошпогондо               (true)

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  // Биздин инпуттагы значенияларыбыз лифтинг ап болот кнопка басылганда
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword); // Lifting up
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : '' // Бул жогоруда айтылган функциянын (фокус болгондо иштеген) CSSи. False болгондо ушул стиль аткарылат
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}

            // Событие onBlur вызывается при пропадании фокуса с элемента (включая дочерние элементы внутри него).
            // Например, это событие запустится, если пользователь кликнет за пределы текстового поля ввода, находящегося в фокусе.
           
            // onBlur биз фокусту кайра алып салганда IsValid true болот жогорудагы классты (invalid) иштетпей очуруп коет

            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : '' // Бул жогоруда айтылган функциянын (фокус болгондо иштеген) CSSи. False болгондо ушул стиль аткарылат
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}

            // Мында да ошол эле onBlur пароль инпутка берилген
            // Событие onBlur вызывается при пропадании фокуса с элемента (включая дочерние элементы внутри него).
            // Например, это событие запустится, если пользователь кликнет за пределы текстового поля ввода, находящегося в фокусе.
           
            // onBlur биз фокусту кайра алып салганда IsValid true болот жогорудагы классты (invalid) иштетпей очуруп коет
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>

          {/*  disabled={!formIsValid} Бул жогорудагы проверкалар отпосо (труе болбосо) 
          Button кнопкасы иштебесин деген логика */}

          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

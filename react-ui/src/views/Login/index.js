import React, {useState} from 'react';
import styles from './index.module.scss';
import {withUser} from '../../contexts/userContext';

const Login=({user}) => {
  const [form, setForm]=useState({
    email: '',
    password: '',
  });

  const handlerInput=(evt) => {
    const {name, value}=evt.target;
    setForm((prevForm) => ({...prevForm, [name]: value}));
  };

  const submit=() => {
    user.login({...form});
  };

  return (
    <div>
      <div className={`${styles.loginContainer}`}>
        <h2>Ingreso al Gestor Documental</h2>
        <div className={`${styles.inputContainer}`}>
          <input
            id="email"
            label="Correo"
            value={form.email}
            name={'email'}
            onChange={handlerInput}
          />
        </div>
        <div className={`${styles.inputContainer}`}>
          <input
            id="password"
            name={'password'}
            type={'password'}
            label="Contraseña"
            value={form.password}
            onChange={handlerInput}
          />
        </div>

        <button
          className={`${styles.btn} ${
            !form.password || (!form.email && styles.disabled)
          }`}
          onClick={submit}
        >
          <i className="fas fa-lock" />
          Iniciar sesión
        </button>
        {/*<Collapse*/}
        {/*  in={user.loginError}*/}
        {/*  style={{width: '100%', marginTop: '30px'}}*/}
        {/*>*/}
        {/*  <Alert*/}
        {/*    severity="error"*/}
        {/*    style={{width: '100%'}}*/}
        {/*    action={*/}
        {/*      <IconButton*/}
        {/*        aria-label="close"*/}
        {/*        color="inherit"*/}
        {/*        size="small"*/}
        {/*        onClick={() => {*/}
        {/*          user.setLoginError(false);*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        <CloseIcon fontSize="inherit"/>*/}
        {/*      </IconButton>*/}
        {/*    }*/}
        {/*  >*/}
        {/*    {user.loginError}*/}
        {/*  </Alert>*/}
        {/*</Collapse>*/}
      </div>
    </div>
  );
};


export default withUser(Login);

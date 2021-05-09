import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IoIosClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import styles from './login.module.css';

const Login = ({ authService, onLoginClose }) => {
  let history = useHistory();
  let goToDashboard = userId => {
    history.push({
      pathname: '/dashboard',
      state: { id: userId },
    });
  };

  const onLogin = (event) => {
    authService //
      .login(event.currentTarget.textContent)
      .then(data => goToDashboard(data.user.uid));
    onLoginClose();
  }

  const onLogout = () => {
    authService.logout();
    onLoginClose();
  }

  useEffect(() => {
    authService.onAuthChange(user => {
      user && goToDashboard(user.uid);
    });
  });

  return (
    <div className={styles.login}>
      <ul className={styles.menu}>
        <li className={styles.google} onClick={onLogin}>Google</li>
        <li className={styles.github} onClick={onLogin}>Github</li>
        <span className={styles.dashboard} onClick={onLoginClose}><Link to="/dashboard">Account</Link></span>
        <span className={styles.line}>|</span>
        <span className={styles.logout} onClick={onLogout}><Link to="/">Log out</Link></span>
      </ul>
      <i className={styles.close} onClick={onLoginClose}><IoIosClose /></i>
    </div>
  )
};

export default Login;
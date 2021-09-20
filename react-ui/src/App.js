import React from 'react';
import './App.css';
import Login from './views/Login';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import styles from './App.module.scss';
// import LeftMenu from './components/LeftMenu';
import Campaign from './views/Campaign';
// import Dj from './views/Dj';
import {withUser} from './contexts/userContext';
import UserDashboard from './views/UserDashboard';

function App({user}) {
  const token=localStorage.getItem('loggedUser');

  if (!token) {
    return <Login/>;
  }
  return (
    <div className={`${styles.container}`}>
      <BrowserRouter>
        {/*<LeftMenu/>*/}
        <Switch>
          <Route path="/admin/new-campaign" component={Campaign}/>
          {user.user.profile === "finalUser" ? (<Route path="/"><UserDashboard /></Route>) : (
            <Route path="/"><h3>Admin</h3></Route>)}
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default withUser(App);

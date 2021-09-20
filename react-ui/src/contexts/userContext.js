import React, {useState, useContext, useEffect} from 'react';

import createContainer from 'constate';

const nameHOC=(Component, suffix='') =>
  `${
    Component.originalName ||
    Component.displayName ||
    Component.name ||
    'Component'
  }${suffix}`;

function useUserContext() {
  const user=JSON.parse(localStorage.getItem('user') || '{}');
  const [loading, setLoading]=useState({});
  const [userDetails, setUserDetails]=useState({
    campaigns: []
  });
  const [users, setUsers]=useState([]);
  const [error, setError]=useState(false);
  const [changePasswordModal, setChangePasswordModal]=useState(false);
  const [newUserModal, setNewUserModal]=useState(false);
  const [deleteUserModal, setDeleteUserModal]=useState({
    opened: false,
    id: '',
    fullName: '',
  });
  const [editUserModal, setEditUserModal]=useState({
    opened: false,
    data: null,
  });
  const [loginError, setLoginError]=useState(false);
  const getUsers=() => {
    fetch('/api/users', {
      headers: {
        'auth-token': localStorage.getItem('loggedUser'),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setUsers(json.data.reverse());
        setLoading(false);
      })
      .catch((e) => {
        console.log(`API call failed: ${e}`);
        setLoading(false);
      });
  };

  const getUserDetails=() => {
    fetch(`/api/users/${user.id}`, {
      headers: {
        'auth-token': localStorage.getItem('loggedUser'),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setUserDetails(json.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(`API call failed: ${e}`);
        setLoading(false);
      });
  };
  const newUser=(credentials) =>
    fetch('/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('loggedUser'),
      },
      body: JSON.stringify({
        ...credentials,
      }),
    })
      .then((result) => {
        getUsers();
        return result.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(false);
          setNewUserModal(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  const deleteUser=(userId) => {
    fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('loggedUser'),
      },
    })
      .then((result) => {
        getUsers();
        return result.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(false);
          setDeleteUserModal(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const editUser=(credentials) => {
    fetch(`/api/users/${credentials._id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('loggedUser'),
      },
      body: JSON.stringify({
        name: credentials.name,
        lastName: credentials.lastName,
        email: credentials.email,
        profile: credentials.profile,
        zones: credentials.zones,
      }),
    })
      .then((result) => {
        getUsers();
        return result.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(false);
          setEditUserModal({opened: false, data: null});
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const login=(credentials) => {
    setLoading(true);
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...credentials}),
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((err) => {
            setLoginError(JSON.stringify(err.error));
          });
          throw new Error(`status ${response.status}`);
        } else {
          setLoginError(false);
        }

        return response.json();
      })
      .then((json) => {
        localStorage.setItem('loggedUser', json.data.token);
        localStorage.setItem('user', JSON.stringify(json.data));
        setLoading(false);
        window.location.href='/users';
      })
      .catch((e) => {
        console.log(`API call failed: ${e}`);
        setLoading(false);
      });
    setLoading(false);
  };
  const logout=() => {
    localStorage.clear();
    window.location.href='/';
  };
  const changePass=(credentials={newPass: null}) => {
    fetch(`/api/pass/${credentials.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('loggedUser'),
      },
      body: JSON.stringify({
        password: credentials.newPass,
      }),
    })
      .then((result) => {
        getUsers();
        const u=JSON.parse(localStorage.getItem('user'));
        u.logged=true;
        localStorage.setItem('user', JSON.stringify(u));
        return result.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(false);
          setChangePasswordModal(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (!user.logged) {
      setChangePasswordModal(true);
    }
  }, [user]);

  return {
    user,
    users,
    setUsers,
    loading,
    setLoading,
    error,
    setError,
    loginError,
    setLoginError,
    newUserModal,
    setNewUserModal,
    deleteUserModal,
    setDeleteUserModal,
    editUserModal,
    setEditUserModal,
    changePasswordModal,
    setChangePasswordModal,
    getUserDetails,
    userDetails,
    getUsers,
    newUser,
    deleteUser,
    editUser,
    login,
    logout,
    changePass,
  };
}

const UserContext=createContainer(useUserContext);

const withUser=(WrappedComponent) => {
  const {getInitialProps}=WrappedComponent;
  const ComponentWithUserData=(props) => {
    const userDataWithState=useContext(UserContext.Context);
    return <WrappedComponent {...props} user={userDataWithState}/>;
  };
  if (typeof getInitialProps === 'function') {
    ComponentWithUserData.getInitialProps=getInitialProps;
  }
  ComponentWithUserData.originalName=nameHOC(WrappedComponent);
  ComponentWithUserData.displayName=nameHOC(WrappedComponent, 'WithUser');
  return ComponentWithUserData;
};

export default UserContext;
export {withUser};

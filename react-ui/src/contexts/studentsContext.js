import React, {useState, useContext} from 'react';

import createContainer from 'constate';

const nameHOC=(Component, suffix='') =>
  `${
    Component.originalName ||
    Component.displayName ||
    Component.name ||
    'Component'
  }${suffix}`;

function useStudentsContext() {
  const [loading, setLoading]=useState({});
  const [students, setStudents]=useState([]);
  const [error, setError]=useState(false);
  const [newStudentsModal, setNewStudentsModal]=useState(false);
  const [deleteStudentsModal, setDeleteStudentsModal]=useState({
    opened: false,
    id: '',
    fullName: '',
  });
  const [editStudentsModal, setEditStudentsModal]=useState({
    opened: false,
    data: null,
  });
  const getStudents=() => {
    fetch('/api/students', {
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
        setStudents(json.data.reverse());
        setLoading(false);
      })
      .catch((e) => {
        console.log(`API call failed: ${e}`);
        setLoading(false);
      });
  };
  const newStudents=(credentials) => {
    fetch('/api/students', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('loggedStudents'),
      },
      body: JSON.stringify({
        ...credentials,
      }),
    })
      .then((result) => {
        getStudents();
        return result.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(false);
          setNewStudentsModal(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deleteStudents=(studentId) => {
    fetch(`/api/students/${studentId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('loggedStudents'),
      },
    })
      .then((result) => {
        getStudents();
        return result.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(false);
          setDeleteStudentsModal(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const editStudents=(credentials) => {
    fetch(`/api/students/${credentials._id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('loggedStudents'),
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
        getStudents();
        return result.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(false);
          setEditStudentsModal({opened: false, data: null});
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return {
    students,
    setStudents,
    loading,
    setLoading,
    error,
    setError,
    newStudentsModal,
    setNewStudentsModal,
    deleteStudentsModal,
    setDeleteStudentsModal,
    editStudentsModal,
    setEditStudentsModal,
    getStudents,
    newStudents,
    deleteStudents,
    editStudents,
  };
}

const StudentsContext=createContainer(useStudentsContext);

const withStudents=(WrappedComponent) => {
  const {getInitialProps}=WrappedComponent;
  const ComponentWithStudentsData=(props) => {
    const studentDataWithState=useContext(StudentsContext.Context);
    return <WrappedComponent {...props} student={studentDataWithState}/>;
  };
  if (typeof getInitialProps === 'function') {
    ComponentWithStudentsData.getInitialProps=getInitialProps;
  }
  ComponentWithStudentsData.originalName=nameHOC(WrappedComponent);
  ComponentWithStudentsData.displayName=nameHOC(WrappedComponent, 'WithStudents');
  return ComponentWithStudentsData;
};

export default StudentsContext;
export {withStudents};

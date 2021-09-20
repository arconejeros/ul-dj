import React, {useState, useContext} from 'react';

import createContainer from 'constate';

const nameHOC=(Component, suffix='') =>
  `${
    Component.originalName ||
    Component.displayName ||
    Component.name ||
    'Component'
  }${suffix}`;

function useCourseContext() {
  const [loading, setLoading]=useState({});
  const [courses, setCourses]=useState([]);
  const [error, setError]=useState(false);
  const [newCourseModal, setNewCourseModal]=useState(false);
  const [deleteCourseModal, setDeleteCourseModal]=useState({
    opened: false,
    id: '',
  });
  const [editCourseModal, setEditCourseModal]=useState({
    opened: false,
    data: null,
  });
  const getCourses=() => {
    fetch('/api/courses', {
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
        setCourses(json.data.reverse());
        setLoading(false);
      })
      .catch((e) => {
        console.log(`API call failed: ${e}`);
        setLoading(false);
      });
  };
  const newCourse=(credentials) => {
    fetch('/api/courses', {
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
        getCourses();
        return result.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(false);
          setNewCourseModal(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deleteCourse=(courseId) => {
    fetch(`/api/courses/${courseId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('loggedUser'),
      },
    })
      .then((result) => {
        getCourses();
        return result.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(false);
          setDeleteCourseModal(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const editCourse=(credentials) => {
    fetch(`/api/courses/${credentials._id}`, {
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
        getCourses();
        return result.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(false);
          setEditCourseModal({opened: false, data: null});
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return {
    courses,
    setCourses,
    loading,
    setLoading,
    error,
    setError,
    newCourseModal,
    setNewCourseModal,
    deleteCourseModal,
    setDeleteCourseModal,
    editCourseModal,
    setEditCourseModal,
    getCourses,
    newCourse,
    deleteCourse,
    editCourse,
  };
}

const CourseContext=createContainer(useCourseContext);

const withCourse=(WrappedComponent) => {
  const {getInitialProps}=WrappedComponent;
  const ComponentWithCourseData=(props) => {
    const courseDataWithState=useContext(CourseContext.Context);
    return <WrappedComponent {...props} course={courseDataWithState}/>;
  };
  if (typeof getInitialProps === 'function') {
    ComponentWithCourseData.getInitialProps=getInitialProps;
  }
  ComponentWithCourseData.originalName=nameHOC(WrappedComponent);
  ComponentWithCourseData.displayName=nameHOC(WrappedComponent, 'WithCourse');
  return ComponentWithCourseData;
};

export default CourseContext;
export {withCourse};

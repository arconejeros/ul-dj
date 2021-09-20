import React, {useState, useContext} from 'react';
import { data } from './data';

import createContainer from 'constate';
import _ from 'lodash';

const nameHOC=(Component, suffix='') =>
  `${
    Component.originalName ||
    Component.displayName ||
    Component.name ||
    'Component'
  }${suffix}`;

function useDjContext() {
  const [djs, setDjs]=useState([]);
  const [questions, setQuestions]=useState(data);
  const [error, setError]=useState(false);
  const [loading, setLoading]=useState(false);
  const sendForm = (l) => {
    setLoading(true);
    fetch('/api/sendmail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('loggedUser'),
      },
      body: JSON.stringify({
        to: "aconejeros@uplevelcap.cl",
        subject: "Aceptaste la DJ",
        text: "Aceptaste la dj",
        html: "<h3>Aceptaste la dj</h3>"
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        // setLocalesThree(groupedbyRegion);
        setLoading(false);
        return json;
      })
      .catch((e) => {
        console.log(`API call failed: ${e}`);
        setLoading(false);
      });
  };

  return {
    djs,
    setDjs,
    error,
    setError, questions, setQuestions,
    sendForm
  };
}

const DjContext=createContainer(useDjContext);

const withDj=(WrappedComponent) => {
  const {getInitialProps}=WrappedComponent;
  const ComponentWithDjData=(props) => {
    const djDataWithState=useContext(DjContext.Context);
    return <WrappedComponent {...props} dj={djDataWithState}/>;
  };
  if (typeof getInitialProps === 'function') {
    ComponentWithDjData.getInitialProps=getInitialProps;
  }
  ComponentWithDjData.originalName=nameHOC(WrappedComponent);
  ComponentWithDjData.displayName=nameHOC(WrappedComponent, 'WithDj');
  return ComponentWithDjData;
};

export default DjContext;
export {withDj};

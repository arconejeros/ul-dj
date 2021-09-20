import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserContext from './contexts/userContext';
import NavContext from './contexts/navContext';
import CammpaignContext from './contexts/campaignContext';
import CourseContext from './contexts/courseContext';
import StudentContext from './contexts/studentsContext';
import DjContext from './contexts/djContext';
import "antd/dist/antd.css";

ReactDOM.render(
  <NavContext.Provider>
    <UserContext.Provider>
      <StudentContext.Provider>
        <DjContext.Provider>
          <CourseContext.Provider>
            <CammpaignContext.Provider>
              <App/>
            </CammpaignContext.Provider>
          </CourseContext.Provider>
        </DjContext.Provider>
      </StudentContext.Provider>
    </UserContext.Provider>
  </NavContext.Provider>,
  document.getElementById('root')
)
;

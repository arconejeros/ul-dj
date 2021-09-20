import React, {useState, useContext} from 'react';

import createContainer from 'constate';

const nameHOC=(Component, suffix='') =>
  `${
    Component.originalName ||
    Component.displayName ||
    Component.name ||
    'Component'
  }${suffix}`;

function useNavContext() {
  const [userMenu, setUserMenu]=useState(false);
  const [nav, setNav]=useState([]);
  const [elements, setElements]=useState([
    {
      title: 'Inicio',
      icon: 'fas fa-home',
      url: '/home',
      profile: ['admin', 'coordinador', 'rrhh'],
    },
    {
      title: 'Crear Campañas',
      icon: 'fas fa-home',
      url: '/new-campaign',
      profile: ['admin', 'coordinador', 'rrhh'],
    },
    // {
    //   title: 'Gestión',
    //   icon: 'fas fa-briefcase',
    //   toggle: false,
    //   profile: ['admin', 'coordinador', 'rrhh'],
    //   subMenus: [
    //     {
    //       title: 'Agregar Personal',
    //       icon: 'fas fa-user-shield',
    //       url: '/personal',
    //       profile: ['any'],
    //     },
    //     {
    //       title: 'Gestión Documental',
    //       icon: 'fas fa-file-pdf',
    //       url: '/gestion-documental',
    //       profile: ['any'],
    //     },
    //     {
    //       title: 'Reportes',
    //       icon: 'far fa-file-excel',
    //       url: '/reports',
    //       profile: ['any'],
    //     },
    //   ],
    // },
    // {
    //   title: 'Configuración',
    //   profile: ['admin'],
    //   icon: 'fas fa-cog',
    //   toggle: false,
    //   subMenus: [
    //     {
    //       title: 'Usuarios',
    //       icon: 'fas fa-users',
    //       url: '/users',
    //       profile: ['admin'],
    //     },
    //     {
    //       title: 'Zonas / Locales',
    //       icon: 'fas fa-map-marker-alt',
    //       url: '/zones',
    //       profile: ['admin'],
    //     },
    //   ],
    // },
    // {
    //   title: 'Otro Menu',
    //   icon: 'fas fa-home',
    //   url: '/otroMenu',
    //   profile: ['admin', 'coordinador', 'rrhh'],
    // },
    // {
    //   title: 'Ultimo Menu',
    //   icon: 'fas fa-home',
    //   url: '/ultimoMenu',
    //   profile: ['coordinador', 'rrhh'],
    // },
  ]);

  return {
    nav,
    setNav,
    elements,
    setElements,
    userMenu,
    setUserMenu,
  };
}

const NavContext=createContainer(useNavContext);

const withNav=(WrappedComponent) => {
  const {getInitialProps}=WrappedComponent;
  const ComponentWithNavData=(props) => {
    const navDataWithState=useContext(NavContext.Context);
    return <WrappedComponent {...props} nav={navDataWithState}/>;
  };
  if (typeof getInitialProps === 'function') {
    ComponentWithNavData.getInitialProps=getInitialProps;
  }
  ComponentWithNavData.originalName=nameHOC(WrappedComponent);
  ComponentWithNavData.displayName=nameHOC(WrappedComponent, 'WithNav');
  return ComponentWithNavData;
};

export default NavContext;
export {withNav};

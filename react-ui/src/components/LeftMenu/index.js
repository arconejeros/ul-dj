import React, {useEffect, useState} from 'react';

import {gsap, Back} from 'gsap';
import {Link} from 'react-router-dom';

import uplevelIcon from '../../assets/images/uplevelIcon.png';
import {withNav} from '../../contexts/navContext';
import {withUser} from '../../contexts/userContext';
import styles from './index.module.scss';

const LeftMenu=({nav, user}) => {
  let menuRef;
  const elementsRef=[];
  const [toggle, setToggle]=useState(false);

  const toggler=() => {
    if (!toggle) {
      gsap.to(menuRef, {width: '330px', duration: 0.3, ease: Back.easeOut});
      for (let i=0; i < elementsRef.length; i++) {
        const item=elementsRef[i];
        gsap.to(item, {
          width: '220px',
          duration: 0.3,
          ease: Back.easeOut,
        });
        gsap.to(item.children[1], {
          // Text
          display: 'inline',
          opacity: 1,
          duration: 0.3,
          delay: 0.7,
          width: 'auto',
        });
        if (item.children[2]) {
          gsap.to(item.children[2], {
            // If has subElements
            display: 'inline',
            opacity: 1,
            duration: 0.3,
            delay: 0.7,
            width: 'auto',
          });
        }
      }
    } else {
      gsap.to(menuRef, {width: '100px', duration: 0.3, ease: Back.easeOut});
      for (let i=0; i < elementsRef.length; i++) {
        const item=elementsRef[i];
        gsap.to(item, {
          width: '50px',
          duration: 0.3,
          ease: Back.easeOut,
        });
        const tl=gsap.timeline();
        if (item.children[2]) {
          tl.set(item.children[2], {
            display: 'none',
          });
        }
        tl.to(item.children[1], {
          width: 0,
          opacity: 0,
          duration: 0.3,
          padding: 0,
        });

        tl.set(item.children[1], {
          display: 'none',
        });
      }
    }
    setToggle(!toggle);
  };

  useEffect(() => {
    // toggler();
  }, []);

  const subMenuToggler=(el) => {
    const newElements=JSON.parse(JSON.stringify(nav.elements));
    const pointer=newElements.find((e) => e.title === el.title);

    pointer.toggle= !pointer.toggle;
    nav.setElements(newElements);
  };
  return (
    <div
      className={`${styles.container} ${toggle && styles.opened}`}
      ref={(ref) => {
        menuRef=ref;
      }}
    >
      <div
        className={`${styles.element} ${styles.logo}`}
        ref={(el) => {
          elementsRef.push(el);
        }}
      >
        <img src={uplevelIcon} alt="Uplevel Logo"/>
        <span>Uplevel DJ</span>
      </div>
      {nav.elements.map((element, index) => {
        const Element=element.url ? Link : 'div';
        return (
          <div key={index.toString()}>
            {element.profile.includes(user.user.profile) && (
              <>
                <Element
                  key={index.toString()}
                  to={element.url || ''}
                  className={`${styles.element} `}
                  onClick={() => subMenuToggler(element)}
                  ref={(el) => {
                    elementsRef.push(el);
                  }}
                >
                  <i className={`${styles.icon} ${element.icon}`}/>
                  <span>{element.title}</span>
                  {element.subMenus && (
                    <i
                      className={`fas fa-chevron-down ${styles.chevron} ${
                        element.toggle && styles.toggledChevron
                      }`}
                    />
                  )}
                  {!toggle && <div className={`${styles.before}`}>{element.title}</div>}

                </Element>
                {element.subMenus && (
                  <div
                    key={`sub${index.toString()}`}
                    className={`${styles.sub} ${
                      element.toggle && styles.subOpen
                    }`}
                    id="subContainer"
                  >
                    {element.subMenus.map((subMenu, ind) => (
                      <Link
                        key={ind.toString()}
                        to={subMenu.url}
                        id={'subMenu'}
                        className={`${styles.element} ${styles.subElement}`}
                        ref={(el) => {
                          elementsRef.push(el);
                        }}
                      >
                        <i className={`${styles.icon} ${subMenu.icon}`}/>
                        <span>{subMenu.title}</span>
                        <div className={`${styles.beforeSub}`}>{subMenu.title}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )
      })}
      <div
        className={`${styles.element} ${styles.toggler}`}
        onClick={toggler}
        ref={(el) => {
          elementsRef.push(el);
        }}
      >
        {toggle ? (
          <i className={`${styles.icon} fas fa-chevron-left`}/>
        ) : (
          <i className={`${styles.icon} fas fa-chevron-right`}/>
        )}
        <span>Cerrar Menú</span>
      </div>
    </div>
  );
};
export default withUser(withNav(LeftMenu));

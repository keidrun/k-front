import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FontAwesome from 'react-fontawesome';

import styles from './Menu.css';

import { BASE_URI } from '../../../utils';

class Logged extends Component {
  static muiName = 'IconMenu';

  renderMenu() {
    const menuItems = [
      {
        icon: 'home',
        text: 'Dashboard',
        link: '/dashboard',
      },
      {
        icon: 'exchange',
        text: 'Trade Rules',
        link: '/rules',
      },
      {
        icon: 'meetup',
        text: 'Find Events',
        link: '/meetup',
      },
      {
        icon: 'cog',
        text: 'Settings',
        link: '/settings',
      },
      {
        icon: 'info-circle',
        text: 'Help',
        link: '/help',
      },
    ];

    return menuItems.map((item, i) => {
      return (
        <div key={i}>
          <Link to={item.link} className={styles.nav_logged_link}>
            <MenuItem
              primaryText={
                <span>
                  <FontAwesome name={item.icon} /> {item.text}
                </span>
              }
            />
          </Link>
        </div>
      );
    });
  }

  render() {
    return (
      <IconMenu
        {...this.props}
        iconButtonElement={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {this.renderMenu()}
        <MenuItem
          primaryText={
            <a
              href={`${BASE_URI}/auth/logout`}
              className={styles.nav_logged_link}
            >
              <span>
                <FontAwesome name="sign-out" /> Sign out
              </span>
            </a>
          }
        />
      </IconMenu>
    );
  }
}

export default Logged;

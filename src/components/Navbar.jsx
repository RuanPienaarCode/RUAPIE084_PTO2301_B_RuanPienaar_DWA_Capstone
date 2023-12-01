import React, { useRef } from 'react';
import { supabase } from '../supabase/SupabaseClient';
import { NavLink } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/FlashOn';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { GithubLogin } from '../store/authSlice';
import configJson from '../config';

export default function Navbar() {
  const dispatch = useDispatch();

  const logOut = async () => {
    supabase.auth.signOut();
    localStorage.removeItem('sb-iljjyaxfycermifsypsy-auth-token');
    dispatch(GithubLogin(configJson));
  };

  const menuHandle = () => {
    menu.current.classList.toggle('active');
  };

  const menu = useRef();
  const { user } = useSelector((state) => state.authReducer);
  return (
    <div style={{ width: '100%' }}>
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">
            <AdbIcon
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
              onClick={() => navigate('/')}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              onClick={() => navigate('/')}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              PODSPACE
            </Typography>
          </div>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className="nav-links">
          {user.email ? null : <NavLink to={'/auth/login'}>Login</NavLink>}
          <NavLink to={'/'}>Home</NavLink>
          <div className="menu">
            {user.user_metadata.avatar_url ? (
              <img
                onClick={menuHandle}
                src={user.user_metadata.avatar_url}
                alt=""
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 25,
                  cursor: 'pointer',
                }}
              />
            ) : null}
            <div ref={menu} className="list">
              <NavLink to="">Menu item 1</NavLink>
              <NavLink onClick={logOut} to="/auth/login">
                Logout
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

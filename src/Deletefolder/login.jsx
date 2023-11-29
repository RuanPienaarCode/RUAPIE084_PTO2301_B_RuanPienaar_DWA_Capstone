import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../supabase/SupabaseClient';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineGithub } from 'react-icons/ai';
import { FaDiscord } from 'react-icons/fa';
import '../global.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function Login() {
  const login = async (provider) => {
    await supabase.auth.signInWithOAuth({
      provider: provider,
      redirectTo: 'http://localhost:3000/',
    });
  };

  if (!localStorage.getItem('sb-iljjyaxfycermifsypsy-auth-token')) {
    return (
      <div>
        <Navbar />
        <box>
          <paper>
            <span
              style={{
                fontSize: 40,
                marginBottom: 15,
                fontWeight: 500,
                color: '#4e4c4c',
                // color: '#222',
              }}
            >
              Login
            </span>
            <Input onClick={() => login('google')}>
              <FcGoogle
                style={{ marginRight: 'auto', color: '#4e4c4c' }}
                size={30}
                color="white"
              />
              <span style={{ flex: 1, color: '#4e4c4c' }}>
                Sign in with Google
              </span>
            </Input>
            <box onClick={() => login('github')}>
              <AiOutlineGithub
                style={{ marginRight: 'auto', color: '#4e4c4c' }}
                size={30}
              />
              <span style={{ flex: 1, color: '#4e4c4c' }}>
                Sign in with Github
              </span>
            </box>
            <box onClick={() => login('discord')}>
              <FaDiscord
                style={{ marginRight: 'auto' }}
                size={30}
                color="#5562EA"
              />
              <span style={{ flex: 1, color: '#4e4c4c' }}>
                Sign in with Discord
              </span>
            </box>
          </paper>
        </box>
      </div>
    );
  }
  if (localStorage.getItem('sb-iljjyaxfycermifsypsy-auth-token')) {
    <div>{(window.location.href = '/')}</div>;
  }
}

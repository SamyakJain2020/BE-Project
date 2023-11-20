'use client';
import React, { useState } from 'react';
import img1 from './signin-image.jpg';
import Navber from '../navbar';
import Footer from '../footer';
import { Input, TextInput } from '@mantine/core';
const Page = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const signIn = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    if (email === '' || password === '') {
      setErrorMessage('All fields are required.');
      setTimeout(() => setErrorMessage(''), 3000);
    } else {
      try {
        const response = await fetch('http://127.0.0.1:5000/signin', {
          method: 'POST',
          body: new URLSearchParams({ email, pass: password }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        const data = await response.json();

        if (data.status === true) {
          setLoginMessage(`Welcome ${data.username}, Login Successfully.`);
          setTimeout(() => {
            window.location = '/';
          }, 3000);
        } else {
          setErrorMessage('Incorrect Email and Password.');
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error as needed
      }
    }
  };

  return (
    <>
      <Navber />
      <div className="main">
        <section className="sign-in">
          <div className="container">
            <div className="signin-content">
              <div className="signin-image">
                <figure>
                  <img src={img1.src} alt="sign up image" />
                </figure>
              </div>

              <div className="signin-form">
                <h2 className="form-title">Sign In</h2>
                <div style={{ marginBottom: '10px' }}>
                  <label
                    className="label-agree-term error_message"
                    style={{
                      color: 'red',
                      display: errorMessage ? '' : 'none',
                    }}
                  >
                    {errorMessage}
                  </label>
                </div>
                <form
                  action="http://192.168.0.1:5000/signin"
                  method="POST"
                  className="register-form"
                  id="login-form"
                >
                  <div className="form-group">
                    <label htmlFor="your_email">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="your_pass">
                      <i className="zmdi zmdi-lock"></i>
                    </label>
                    <input
                      type="password"
                      name="pass"
                      id="pass"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                      className="agree-term"
                    />
                    <label htmlFor="remember-me" className="label-agree-term">
                      <span>
                        <span></span>
                      </span>
                      Remember me
                    </label>
                  </div>
                  <div className="form-button">
                    <input
                      type="button"
                      name="signin"
                      id="signin"
                      className="form-submit"
                      onClick={signIn}
                      value="Log in"
                    />
                  </div>
                  <div style={{ marginTop: '5px' }}>
                    <label
                      className="label-agree-term"
                      id="login_message"
                      style={{
                        color: 'green',
                        display: loginMessage ? '' : 'none',
                      }}
                    >
                      {loginMessage}
                    </label>
                  </div>
                </form>
                <div className="social-login">
                  <a href="/register" className="signup-image-link">
                    Create an account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Page;

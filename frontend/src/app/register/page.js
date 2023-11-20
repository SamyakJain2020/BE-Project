'use client';
import React, { useState } from 'react';
import img from '../../../public/signup-image.jpg';
import Navber from '../navbar';
import Footer from '../footer';
const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [signupMessage, setSignupMessage] = useState('');

  const register = async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    const repeatPassword = document.getElementById('repass').value;

    if (
      name === '' ||
      email === '' ||
      password === '' ||
      repeatPassword === ''
    ) {
      setErrorMessage('All fields are required');
      setTimeout(() => setErrorMessage(''), 3000);
    } else if (password !== repeatPassword) {
      setErrorMessage('Passwords are not the same');
      setTimeout(() => setErrorMessage(''), 3000);
    } else {
      try {
        const response = await fetch('http://127.0.0.1:5000/register', {
          method: 'POST',
          body: new URLSearchParams({ name, email, pass: password }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        const data = await response.json();

        if (data === true) {
          setSignupMessage('Registration Successful');
          setTimeout(() => {
            window.location = '/';
          }, 3000);
        } else {
          setErrorMessage('Email ID already exists.');
          setTimeout(() => setErrorMessage('Error'), 3000);
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
      <div className="main ">
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <div style={{ marginBottom: 10 }}>
                  <label
                    className="label-agree-term"
                    id="error_message"
                    style={{
                      color: 'red',
                      display: errorMessage ? '' : 'none',
                    }}
                  >
                    {errorMessage}
                  </label>
                </div>
                <form
                  method="POST"
                  className="register-form"
                  id="register-form"
                >
                  {/* ... (unchanged code) ... */}
                  <div className="form-group">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-email"></i>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass">
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
                    <label htmlFor="re-pass">
                      <i className="zmdi zmdi-lock-outline"></i>
                    </label>
                    <input
                      type="password"
                      name="repass"
                      id="repass"
                      placeholder="Repeat your password"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="agree-term" className="label-agree-term">
                      <a href="/login" className="signup-image-link">
                        I am already member
                      </a>
                    </label>
                  </div>
                  <div className="form-button">
                    <input
                      type="button"
                      name="signup"
                      id="signup"
                      className="form-submit"
                      onClick={register}
                      value="Register"
                    />
                  </div>
                  <div style={{ marginTop: '5px' }}>
                    <label
                      className="label-agree-term"
                      id="signup_message"
                      style={{
                        color: 'green',
                        display: signupMessage ? '' : 'none',
                      }}
                    >
                      {signupMessage}
                    </label>

                    <div
                      className={`label-agree-term fixed bottom-0 inset-x-0 pb-2 sm:pb-5`}
                      id="signup_message"
                      style={{
                        color: 'green',
                        display: signupMessage ? '' : 'none',
                      }}
                    ></div>
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure>
                  <img src={img.src} alt="sign up image" />
                </figure>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Register;

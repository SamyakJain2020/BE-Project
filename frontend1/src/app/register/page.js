'use client';
import React from 'react';
import img from '../../../public/signup-image.jpg';
const Register = () => {
  let register = () => {
    console.log('in register');
    if (
      document.getElementById('name').value == '' ||
      document.getElementById('email').value == '' ||
      document.getElementById('pass').value == '' ||
      document.getElementById('repass').value == ''
    ) {
      document.getElementById('error_message').innerText =
        'All fields are required';
      document.getElementById('error_message').style.display = ''.delay(
        3000
      ).style.display = 'none';
    } else if (
      document.getElementById('pass').value !=
      document.getElementById('repass').value
    ) {
      document.getElementById('error_message').innerText =
        'Passwords are not same';
      document.getElementById('error_message').style.display = ''.delay(
        3000
      ).style.display = 'none';
    } else {
      var data = new FormData();
      data.append('name', document.getElementById('name').value);
      data.append('email', document.getElementById('email').value);
      data.append('pass', document.getElementById('pass').value);
      fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        body: data,
        headers: {
          enctype: 'multipart/form-data',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === true) {
            console.log('in true: DATA ', data);
            let m = document.getElementById('signup_message');
            m.style.display = '';
            // m.delay(3000);
            // m.style.display = 'none';

            setTimeout(function () {
              window.location = '/';
            }, 3000);
          } else {
            document.getElementById('error_message').innerText =
              'Email Id was already exists.';
            document.getElementById('error_message').style.display = ''.delay(
              3000
            ).style.display = 'none';
          }
        });
    }
  };
  return (
    <div className="main h-full">
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <div style={{ marginBottom: 10 }}>
                <label
                  className="label-agree-term"
                  id="error_message"
                  style={{ color: 'red', display: 'none' }}
                ></label>
              </div>
              <form method="POST" className="register-form" id="register-form">
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
                    onClick={() => register()}
                    value="Register"
                  />
                </div>
                <div style={{ marginTop: '5px' }}>
                  <label
                    className="label-agree-term"
                    id="signup_message"
                    style={{ color: 'green', display: 'none' }}
                  >
                    Registeration Successfully
                  </label>
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src={'./signup-image.jpg'} alt="sing up image" />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Register;

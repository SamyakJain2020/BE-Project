'use client';
import React from 'react';
import img1 from './signin-image.jpg';
const Page = () => {
  let signIn = () => {
    console.log('in Sign IN');
    if (
      document.getElementById('email').value == '' ||
      document.getElementById('pass').value == ''
    ) {
      document.getElementByClassName('error_message').innerText =
        'All fields are required.';
      document.getElementByClassName('error_message').style.display = ''.delay(
        3000
      ).style.display = 'none';
    } else {
      console.log('in else');
      var data = new FormData();
      data.append('email', document.getElementById('email').value);
      data.append('pass', document.getElementById('pass').value);
      fetch('http://127.0.0.1:5000/signin', {
        method: 'POST',
        body: data,
        headers: {
          enctype: 'multipart/form-data',
        },
      })
        .then((response) => {
          console.log('resp: ', response);
          return response.json();
        })
        .then((data) => {
          if (data.status === true) {
            document.getElementById('login_message').innerText =
              'Welcome ' + data.username + ', Login Successfully.';
            document.getElementById('login_message').style.display = '';
            setTimeout(function () {
              window.location = '/';
            }, 3000);
          } else {
            document.getElementsByClassName('error_message')[0].innerText =
              'Incorrect Email and Password.';
            document.getElementsByClassName('error_message')[0].style.display =
              '';
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle error as needed
        });
    }
  };
  return (
    <div className="main">
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={img1.src} alt="sing up image" />
              </figure>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign In</h2>
              <div style={{ marginBottom: '10px' }}>
                <label
                  className="label-agree-term error_message"
                  style={{ color: 'red', display: 'none' }}
                ></label>
              </div>
              <form
                action="htpp://192.168.0.1:5000/signin"
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
                    style={{ color: 'green', display: 'none' }}
                  ></label>
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
  );
};

export default Page;

import './components.css';
import { registerAction } from '@/app/redux/actions/authActions';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function CenteredModalAdmin(props) {
  const dispatch = useDispatch();
  const { title, subheader } = props;

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordconfirmValue, setPasswordConfrimValue] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const registerIsFail = useSelector(state => state.registerReducer.error);
  const [showAlertRegisterSuccess, setShowAlertRegisterSuccess] = useState(false);
  const [showAlertRegisterFail, setShowAlertRegisterFail] = useState(false);
  const [showAlertRegisterLoading, setShowAlertRegisterLoading] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    }
    if (field === 'confirmpassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleUsernameChange = (e) => {
    setUsernameValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
    setPasswordsMatch(e.target.value === passwordconfirmValue)
  };

  const handlePasswordConfrimChange = (e) => {
    setPasswordConfrimValue(e.target.value);
    setPasswordsMatch(e.target.value === passwordValue);
  };

  const formLoad = () => {
    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (passwordValue !== passwordconfirmValue) {
      return;
    }
    
    setShowAlertRegisterLoading(true);
    dispatch(registerAction({
      "username": usernameValue,
      "password": passwordValue,
      "passwordConfirm": passwordconfirmValue,
      "role": "administrator"
    })).then(() => {
      setShowAlertRegisterLoading(false);
      if (registerIsFail) {
        setShowAlertRegisterFail(true);
        const timer = setTimeout(() => {
          setShowAlertRegisterFail(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
      else {
        setShowAlertRegisterSuccess(true);
        const timer = setTimeout(() => {
          setShowAlertRegisterSuccess(false);
          props.onHide()
        }, 200);
        setUsernameValue('');
        setPasswordValue('');
        setPasswordConfrimValue('');
        return () => clearTimeout(timer);
      }
    }
    );
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='rounded'
    >
    <Modal.Header closeButton className='bg-primary'>
    </Modal.Header>
    <Modal.Body className='bg-light p-5'>
        <Modal.Title id="contained-modal-title-vcenter" className='px-2 text-global text-bold text-center'>
          {title}
        </Modal.Title>
        <div className='underline-Bold mx-auto mt-2 mb-5'></div>
        <h4>{subheader}</h4>
        {showAlertRegisterLoading && (
          <Alert variant="primary" className="text-center">
            Creating admin...
          </Alert>
        )}
        {showAlertRegisterSuccess && (
          <Alert variant="success" className="text-center">
            Admin created successfully
          </Alert>
        )}
        {showAlertRegisterFail && (
          <Alert variant="danger" className="text-center">
            Failed to create admin
          </Alert>
        )}

        <form onLoad={formLoad} onSubmit={(e) => handleSubmit(e)} noValidate className='text-semibold mx-3 needs-validation'>
          <div className="mt-3 row">
            <label htmlFor="usernameInput ">Email</label>
            <input
              onChange={handleUsernameChange}
              type="email"
              className="form-control ms-2 my-1"
              id="usernameInput"
              placeholder="Enter Email"
              value={usernameValue}
              required
            />
            <div class="invalid-feedback">
              Please provide a valid email.
            </div>
          </div>
          <div className='row'>
            <div className='row'>
              <div className="form-group my-3 col-md-6">
                <label htmlFor="passwordInput">Password</label>
                <div className="mb-3 row my-1">
                  <div className="col-md-10">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control ${passwordsMatch ? '' : 'is-invalid'}`}
                      placeholder="Password"
                      name="password"
                      id='passwordInput'
                      value={passwordValue}
                      onChange={handlePasswordChange}
                      required
                    />
                    <div className="invalid-feedback">
                      This field is required.
                    </div>
                  </div>
                  <div className="col-md-2 d-flex align-items-center bg-light rounded">
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('password')}
                      className="border-0  bg-light rounded mx-auto     "
                    >
                      <Image src={showPassword ?  "/show.svg":"/hide.svg" } width={35} height={35} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group my-3 col-md-6">
                <label htmlFor="passwordInput">Confirm Password</label>
                <div className="mb-3 row my-1">
                  <div className="col-md-10">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className={`form-control ${passwordsMatch ? '' : 'is-invalid'}`}
                      placeholder="Confirm Password"
                      name="passwordConfirm"
                      id='passwordConfirmInput'
                      value={passwordconfirmValue}
                      onChange={handlePasswordConfrimChange}
                      required
                    />
                    <div className="invalid-feedback">
                      {passwordsMatch ? 'This field is required.' : 'Passwords do not match.'}
                    </div>
                  </div>
                  <div className="col-md-2 d-flex align-items-center bg-light rounded">
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmpassword')}
                      className="border-0  bg-light rounded mx-auto"
                    >
                      <Image src={showConfirmPassword ? "/show.svg":"/hide.svg" } width={35} height={35} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="row justify-content-end align-items-center mt-5 mb-2">
            <button type="submit" className="btn btn-primary mx-auto col-md-4">Submit</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default CenteredModalAdmin;

import axios from 'axios'
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput }
  from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';

import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const nameRef = useRef()
  const emailRef = useRef()
  const firstRef = useRef()
  const lastRef = useRef()
  const passwordRef = useRef()
  const password2Ref = useRef()
  const isDoctorRef = useRef()
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate()

  const handleSumbit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value
    console.log(nameRef.current.value);
    const email = emailRef.current.value
    const first_name = firstRef.current.value
    const last_name = lastRef.current.value
    const password = passwordRef.current.value
    const password2 = password2Ref.current.value
    const doctor = isDoctorRef.current.value
    



    const data = {
      username: name,
      email: email,
      first_name: first_name,
      last_name: last_name,
      password: password,
      password2: password2,
      is_doctor: doctor

    }
    console.log('register', data);

    // fetch("http://127.0.0.1:8000/register/",{
    //     method:"POST",
    //     body :JSON.stringify(data),
    //     headers:{
    //         'Content-Type': 'application/json',
    //         //   'Authorization': 'Bearer ' + String(authToken.access),
    //     }
    // })


    // axios.post('http://127.0.0.1:8000/register/', JSON.stringify(data), {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })

    try {
      const response = await axios.post('http://127.0.0.1:8000/register/', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        
        alert('Registration successful. You can now log in', {
          autoClose: 5000,
        });
        navigate('/');

      } else {
        toast.error('Registration failed. Please check your details and try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      
      alert(error.response.data.username)
      alert(error.response.data.email)
      setSuccessMessage('');
    }

  }
  return (
    <div>
      <MDBContainer className="my-5">
      <ToastContainer />
        <MDBCard>
          <MDBRow className='g-0'>

            <MDBCol md='6'>
              <MDBCardImage src='https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="login form" className='rounded-start w-100' />
            </MDBCol>

            <MDBCol md='6'>
              <MDBCardBody className='d-flex flex-column'>

                <div className='d-flex flex-row mt-2'>
                  <MDBIcon fas icon="https://img.icons8.com/?size=80&id=l7dPia52hnsM&format=png" />
                  <span className="h1 fw-bold mb-0">ABC Hospital</span>
                </div>

                {/* <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5> */}
                <form onSubmit={handleSumbit}>
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Username'
                    id='username'
                    type='text'
                    size="lg"
                    name='username'
                    ref={nameRef}

                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    label='First Name'
                    id='first_name'
                    type='text'
                    size="lg"
                    name='first_name'
                    ref={firstRef}
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Last Name'
                    id='last_name'
                    type='text'
                    size="lg"
                    name='last_name'
                    ref={lastRef}
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Email'
                    id='email'
                    type='email'
                    size="lg"
                    name='email'
                    ref={emailRef}
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Password'
                    id='password'
                    type='password'
                    size="lg"
                    name='password'
                    ref={passwordRef}
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Confirm Password'
                    id='password2'
                    type='password'
                    size="lg"
                    name='password2'
                    ref={password2Ref}
                  />


                  <Form.Select
                    aria-label="Default select example"
                    ref={isDoctorRef}
                  >
                    <option value="False">I'm not a Doctor</option>
                    <option value="True">I'm a Doctor</option>
                  </Form.Select>
                  <br />



                  <MDBBtn className="mb-4 px-5" color='dark' size='lg' type='submit'>Register</MDBBtn>

                </form>


                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>You have an account? <a href="/" style={{ color: '#393f81' }}>Login here</a></p>
                <div className='d-flex flex-row justify-content-start'>

                </div>

              </MDBCardBody>
            </MDBCol>

          </MDBRow>
        </MDBCard>

      </MDBContainer>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}


    </div>
  )
}

export default Register
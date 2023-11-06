import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit';


const Loginpage = () => {
  const { loginUser } = useContext(AuthContext)



  return (
    <div >
      <MDBContainer className="my-5">

        <MDBCard>
          <MDBRow className='g-0'>

            <MDBCol md='5'>
              <MDBCardImage src='https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="login form" className='rounded-start w-100' />
            </MDBCol>

            <MDBCol md='5'>
              <MDBCardBody className='d-flex flex-column'>

                <div className='d-flex flex-row mt-2'>
                  <MDBIcon fas icon="https://img.icons8.com/?size=80&id=l7dPia52hnsM&format=png"  />
                  <span className="h1 fw-bold mb-0">ABC Hospital</span>
                </div> 

                {/* <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5> */}
                <form onSubmit={loginUser}>
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Username'
                    id='username'
                    type='text'
                    size="lg"
                    name='username'
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Password'
                    id='password'
                    type='password'
                    size="lg"
                    name='password'
                  />
                  <MDBBtn className="mb-4 px-5" color='dark' size='lg' type='submit'>Login</MDBBtn>

                </form>

                <a className="small text-muted" href="#!">Forgot password?</a>
                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a href="/register" style={{ color: '#393f81' }}>Register here</a></p>
                
                <div className='d-flex flex-row justify-content-start'>
                  
                </div>

              </MDBCardBody>
            </MDBCol>

          </MDBRow>
        </MDBCard>

      </MDBContainer>
     
    </div>
  )
}

export default Loginpage
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import {
  MDBFooter,
  MDBBtn,
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { Breadcrumb, Card, Col, Container, Row } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import UpdateProfile from './UpdateProfile';
import axios from 'axios'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';



const Homepage = () => {
  const [users, setUser] = useState([]);
  const { authToken, logoutUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [doctorList, setDoctorList] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);


  // const navigate = useNavigate();



  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/doctorlist/", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access),
        }
      });
      if (response.status === 200) {
        const data = await response.data;
        setDoctorList(data);
        // console.log(data, 'data');
      } else if (response.status === 401) {
        alert('hol');
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    if (doctorList === null) {
      fetchUsers();
    }
  }, [doctorList]);






  const getUser = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/userprofile/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access),
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
        // console.log(data, 'data');
      } else if (response.status === 401) {
        logoutUser();
      }
    } catch (error) {
      console.error('Error:', error);

    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, [authToken]);

  if (loading) {

    return <p>Loading....</p>;
  }


  // popup code
  const openPopup = () => {
    setPopupVisible(true);
  };
  const closePopup = () => {
    setPopupVisible(false);
  };

  const backgroundStyle = {
    backgroundImage: 'url("https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=1983&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: '500px'

  };
  console.log(doctorList);


  return (
    <>

      {/*_______________________________________________ navbar________________________________________ */}

      <MDBNavbar expand='lg' light bgColor='light'>
        <MDBNavbarNav left>

          <MDBNavbarBrand href='#'>
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRND-xV3Wgh1czLx0NVoyiym9g2tzeFg0YT9A&usqp=CAU'
              height='40'

              alt=''
              loading='lazy'
            />
          </MDBNavbarBrand>
          <h2>ABC</h2>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavbarItem className='ms-auto'>
            <MDBBtn onClick={logoutUser}>Logout</MDBBtn>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBNavbar>




      {/*___________________________ username and background image ______________________________________*/}
      {/* {console.log(users.doctor_profile)} */}

      {users.is_doctor ?
        <div style={backgroundStyle}>
          <div className="container px-4 py-5">
            <div className="col-lg-6">
              <div className="col align-items-center">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  <span>Welcome Dr. <span className="animated-text">{users && users.first_name}</span>!</span><br />
                </h1>
              </div>
            </div>
          </div>
        </div>
        :
        <div>
          <div style={backgroundStyle}>
            <div className="container px-4 py-5">
              <div className="col-lg-6">
                <div className="col align-items-center">
                  <h1 className="my-5 display-3 fw-bold ls-tight">
                    <span>Welcome <span className="animated-text">{users && users.first_name}</span>!</span><br />
                  </h1>
                </div>
              </div>
            </div>
          </div>

        </div>

      }




      {/* _____________________________________________Profile____________________________________________________ */}


      <section style={{ backgroundColor: '#eee' }}>
        <Container className="py-5">
          <Row>
            <Col>
              <Breadcrumb className="bg-light rounded-3 p-3 mb-4">
                <Breadcrumb.Item active>User Profile</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>

          <Row>
            {/* {console.log(users.is_doctor)}   */}
            {users.is_doctor ?
              <Col lg={4}>
                <Card className="mb-4">
                  <Card.Body className="text-center">
                    <img
                      src="https://media1.thehungryjpeg.com/thumbs2/ori_3799449_6u081xqht6gojrr2bydx29yp114oilagsxwzdhm5_icon-character-female-doctor-purple-background.jpg"
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: '250px' }}
                    />
                    <h5 className="my-3">{users && users.first_name} {users && users.last_name}</h5>
                 
                    <div className="d-flex justify-content-center mb-2">

                      <button type="button" className="btn btn-primary" onClick={openPopup} >
                        Edit
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              :
              <Col lg={4}>
                <Card className="mb-4">
                  <Card.Body className="text-center">
                    <img
                      src="https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png"
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: '250px' }}
                    />
                    <h5 className="my-3">{users && users.first_name} {users && users.last_name}</h5>
                    <div className="d-flex justify-content-center mb-2">

                      <button type="button" className="btn btn-primary" onClick={openPopup} >
                        Edit
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

            }

            <Col lg={8}>
              <Card className="mb-4">
                <Card.Body>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Username</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{users && users.username}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">First Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{users && users.first_name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Last Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{users && users.last_name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{users && users.email}</p>
                    </div>
                  </div>


                  <hr></hr>
                  {users.is_doctor ?
                    <div>
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Hospital</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{users && users.doctor_profile && users.doctor_profile.hospital && (
                            <div>{users.doctor_profile.hospital}</div>
                          )}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Specialization</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0"><p className="text-muted mb-0">{users && users.doctor_profile && users.doctor_profile.speciality && (
                            <div>{users.doctor_profile.speciality}</div>
                          )}</p></p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Department</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0"><p className="text-muted mb-0">{users && users.doctor_profile && users.doctor_profile.department && (
                            <div>{users.doctor_profile.department}</div>
                          )}</p></p>
                        </div>
                      </div>
                    </div>
                    :
                    <div>
                      <div className="row">

                        <div className="col-sm-9">

                          {/* <img
                                src="https://img.freepik.com/free-vector/scientists-working-lab_23-2148481244.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1696982400&semt=ais"
                                alt="avatar"
    
                                style={{ width: '200px' }}
                              /> */}
                          <img
                            src="https://img.freepik.com/free-vector/call-doctor-concept-doctors-answer-patient-questions-phone_1150-50289.jpg?w=2000"
                            alt="avatar"

                            style={{ width: '200px' }}
                          />
                          <img
                            src="https://img.freepik.com/premium-vector/team-medical-specialist_118813-2772.jpg?w=360"
                            alt="avatar"

                            style={{ width: '200px' }}
                          />
                          <img
                            src="https://img.freepik.com/premium-vector/online-medical-with-team-doctors-nurses_180264-180.jpg?w=360"
                            alt="avatar"

                            style={{ width: '200px' }}
                          />
                        </div>
                      </div>

                    </div>
                  }


                </Card.Body>
              </Card>
              {/* Add more cards for other sections as needed */}
            </Col>
          </Row>
        </Container>
      </section>




      {/* <button onClick={openPopup}>Edit</button> */}

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={closePopup}>
              Close
            </button>
            <UpdateProfile onClose={closePopup} />
          </div>
        </div>
      )}



      {/* {doctorList && doctorList.length > 0 && (
  <div>
    {doctorList.map((doctor, index) => (
      <div key={index}>
        <p>First Name: {doctor.first_name} {doctor.last_name}</p>
        {doctor.doctor.map((doctorDetail, subIndex) => (
          <div key={subIndex}>
            <p>Hospital: {doctorDetail.hospital}</p>
            <p>Speciality: {doctorDetail.speciality}</p>
            <p>Department: {doctorDetail.department}</p>
          </div>
        ))}
       
        <hr />
      </div>
    ))}
  </div>
)} */}

      {users.is_doctor ? <div></div> :
        <div className="row">

          <MDBTable >
            <MDBTableHead>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Department</th>
                <th scope='col'>Specialization</th>
                {/* <th scope='col'>Status</th> */}
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {doctorList && doctorList.length > 0 && (
                doctorList.map((doctor, index) => (
                  <tr key={index}>
                    <td>
                      <div className='d-flex align-items-center'>
                        {/* <img
                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              /> */}
                        <div className='ms-3'>
                          <p className='fw-bold mb-1'>{doctor.first_name} {doctor.last_name}</p>
                          {/* <p className='text-muted mb-0'>john.doe@gmail.com</p> */}
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className='fw-normal mb-1'>Department: {doctor.doctor[0].department}</p>
                      <p className='text-muted mb-0'>Hospital: {doctor.doctor[0].hospital}</p>
                    </td>
                    <td>
                      <p className='fw-normal mb-1'> {doctor.doctor[0].speciality}</p>
                    </td>
                  </tr>
                ))
              )}
            </MDBTableBody>
          </MDBTable>

        </div>

      }
      {/* {doctorList.username} */}


      {/* ___________________________________footer________________________________________________ */}




      <MDBFooter className='bg-light text-center text-white'>
        <MDBContainer className='p-4 pb-0'>
          <section className='mb-4'>
            <MDBBtn
              floating
              className='m-1'
              style={{ backgroundColor: '#3b5998' }}
              href='#!'
              role='button'
            >
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn
              floating
              className='m-1'
              style={{ backgroundColor: '#55acee' }}
              href='#!'
              role='button'
            >
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn
              floating
              className='m-1'
              style={{ backgroundColor: '#dd4b39' }}
              href='#!'
              role='button'
            >
              <MDBIcon fab icon='google' />
            </MDBBtn>
            <MDBBtn
              floating
              className='m-1'
              style={{ backgroundColor: '#ac2bac' }}
              href='#!'
              role='button'
            >
              <MDBIcon fab icon='instagram' />
            </MDBBtn>

            <MDBBtn
              floating
              className='m-1'
              style={{ backgroundColor: '#0082ca' }}
              href='#!'
              role='button'
            >
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>

            <MDBBtn
              floating
              className='m-1'
              style={{ backgroundColor: '#333333' }}
              href='#!'
              role='button'
            >
              <MDBIcon fab icon='github' />
            </MDBBtn>
          </section>
        </MDBContainer>

        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>

        </div>
      </MDBFooter>

    </>
  );
};

export default Homepage;

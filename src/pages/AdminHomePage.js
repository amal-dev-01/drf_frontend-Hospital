import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import AuthContext from '../context/AuthContext';
import {
    MDBNavbarItem,
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBListGroup,
} from 'mdb-react-ui-kit';


const AdminHomePage = () => {
    const [allUser, setAllUser] = useState(null)
    const { authToken, logoutUser } = useContext(AuthContext)
    const adminFetch = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/userlist/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authToken.access),
                }
            });

            if (response.status === 200) {
                const data = await response.data;
                setAllUser(data);
            } else if (response.status === 401) {
                console.log('erorr');
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
    useEffect(() => {
        if (allUser === null) {
            adminFetch();
        }
    }, [allUser]);



    const blockDoctor = async (pk) => {
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/userlist/${pk}/`, null, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authToken.access),


                },
            });

            if (response.status === 200) {
                console.log('User blocked successfully.');
                window.location.reload();
            } else {
                console.log('Failed to block user.');
            }
        } catch (error) {
            console.error('Error blocking user:', error);
        }
    };


    return (


        <div>
            <div>
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
            </div>



            <section style={{ backgroundColor: '#eee' }}>
                <MDBContainer className="py-5">
                    <MDBRow>
                        <MDBCol>
                            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">

                                <MDBBreadcrumbItem active>Admin Profile</MDBBreadcrumbItem>
                            </MDBBreadcrumb>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol lg="4">
                            <MDBCard className="mb-4">
                                <MDBCardBody className="text-center">
                                    <MDBCardImage
                                        src="https://cdn.vectorstock.com/i/preview-1x/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg"
                                        alt="avatar"
                                        className="rounded-circle"
                                        style={{ width: '150px' }}
                                        fluid />
                                    <p className="text-muted mb-1">Admin</p>

                                    <img
                                        src='https://media.geeksforgeeks.org/wp-content/uploads/20210518104305/FinalPhoto1.jpg'
                                        height='200'

                                        alt=''
                                        loading='lazy'
                                    />

                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-4 mb-lg-0">
                                <MDBCardBody className="p-0">
                                    <MDBListGroup flush className="rounded-3">

                                    </MDBListGroup>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol lg="8">
                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Full Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">Amal Dev</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">admin@gmail.com</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Phone</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Mobile</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                </MDBCardBody>
                            </MDBCard>

                            <MDBRow>
                                <MDBCol md="6">
                                    <MDBCard className="mb-4 mb-md-0">
                                        <MDBCardBody>
                                            <MDBCardText className="mb-4"><span className="text-primary font-italic me-1"> Reviews</span> User Status</MDBCardText>
                                            <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Service</MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Users</MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Bookings</MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Cancel</MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Appointment</MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                                            </MDBProgress>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                <MDBCol md="6">
                                    <MDBCard className="mb-4 mb-md-0">
                                        <MDBCardBody>
                                            <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Reviews</span> Doctor Status</MDBCardText>
                                            <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Service </MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Doctor</MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Bookings</MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Cancel</MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Appointment</MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                                            </MDBProgress>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>


            <div style={{ padding: '50px' }}>
                <h2>UsersList</h2>
                <div className="row">
                    <MDBTable >
                        <MDBTableHead>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Username</th>
                                <th scope='col'>Phone</th>
                                <th scope='col'>Status</th>

                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {allUser && allUser.length > 0 && (
                                allUser
                                    .filter((user) => !user.is_doctor && !user.is_admin)
                                    .map((user) => (
                                        <tr key={user.id}>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    <div className='ms-3'>
                                                        <p className='fw-bold mb-1'>{user.first_name} {user.last_name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className='fw-normal mb-1'>{user.email}</p>
                                            </td>
                                            <td>
                                                <p className='fw-normal mb-1'>{user.username}</p>
                                            </td>
                                            <td>
                                                <p className='fw-normal mb-1'>{user.phone}</p>
                                            </td>
                                            <td>
                                                {user.is_active ? (
                                                    <MDBBadge color='success' pill>
                                                        Active
                                                    </MDBBadge>
                                                ) : (
                                                    <MDBBadge color='danger' pill>
                                                        Not Active
                                                    </MDBBadge>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                            )}

                        </MDBTableBody>
                    </MDBTable>
                </div>
                <h2>Doctor List</h2>
                <MDBTable align='middle'>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Username</th>
                            <th scope='col'>Phone</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Block</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {allUser && allUser.length > 0 && (
                            allUser
                                .filter((user) => user.is_doctor)
                                .map((user) => (
                                    <tr key={user.pk}>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1'>{user.first_name} {user.last_name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {/* <p>{user.pk}</p> */}
                                            <p className='fw-normal mb-1'>{user.email}</p>
                                        </td>
                                        <td>
                                            <p className='fw-normal mb-1'>{user.username}</p>
                                        </td>
                                        <td>
                                            <p className='fw-normal mb-1'>{user.phone}</p>
                                        </td>
                                        <td>
                                            {user.is_active ? (
                                                <MDBBadge color='success' pill>
                                                    Active
                                                </MDBBadge>
                                            ) : (
                                                <MDBBadge color='danger' pill>
                                                    Blocked
                                                </MDBBadge>
                                            )}
                                        </td>
                                        <td>
                                            <MDBBtn onClick={() => blockDoctor(user.pk)}>
                                                Block/Unblock
                                            </MDBBtn>
                                        </td>
                                    </tr>
                                ))
                        )}

                    </MDBTableBody>
                </MDBTable>

            </div>

        </div>

    )
}

export default AdminHomePage
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import axios from 'axios'




const AuthContext = createContext()

export default AuthContext;



export const AuthProvider = ({ children }) => {


  const nav = useNavigate()

  let [authToken, SetAuthToken] = useState(localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
  let [user, SetUser] = useState(localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')) : null)
  let [loading, setLoading] = useState(false)


  // let loginUser = async(e)=>{
  //     e.preventDefault()
  //         const response = await axios.post('http://127.0.0.1:8000/login/', {

  //          username:e.target.username.value,
  //           password:e.target.password.value 
  //         });
  //         let data = response.data
  //         if(response.status === 200){
  //           setLoading(true)
  //             SetAuthToken(data)
  //             SetUser(jwtDecode(data.access))
  //             localStorage.setItem('authToken',JSON.stringify(data))
  //             if(user && user.is_admin){
  //               nav('/admin')
  //             }
  //             else if(user && (user.is_user || user.is_doctor)){
  //               nav('/home')
  //             }
  //         }
  //         else{
  //           alert('something Wrong')
  //         }
  //       }
  //     let loginUser = async (e) => {
  //   e.preventDefault();
  //   try{

  //     const response = await axios.post('http://127.0.0.1:8000/login/', {
  //       username: e.target.username.value,
  //     password: e.target.password.value,
  //   });

  //   if (response.status === 200) {
  //     const data = response.data;
  //     setLoading(true);
  //     SetAuthToken(data);
  //     const user = jwtDecode(data.access);
  //     SetUser(user);
  //     localStorage.setItem('authToken', JSON.stringify(data));

  //     // if (user.is_blocked) {
  //     //   alert('Your account is blocked. Please contact support for assistance.');
  //     // } else 
  //     if (user.is_admin) {
  //       nav('/admin');
  //     } else if (user.is_user || user.is_doctor) {
  //       nav('/home');
  //     }
  //   } 

  // }catch(error){
  //   alert('Your account is blocked');

  // }
  // }




  // login function

  let loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', {
        username: e.target.username.value,
        password: e.target.password.value,
      });

      if (response.status === 200) {
        const data = response.data;
        setLoading(true);
        SetAuthToken(data);
        const user = jwtDecode(data.access);
        SetUser(user);
        localStorage.setItem('authToken', JSON.stringify(data));

        if (!user.is_active) {
          alert('Your account is blocked. Please contact support for assistance.');
        } else if (user.is_admin) {
          nav('/admin');
        } else if (user || user.is_doctor) {
          nav('/home');
        } 
        else {
          alert('Unknown user role or condition.');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert(error.response.data.detail);
      } else {

        alert('An error occurred while trying to log in. Please try again later.');
      }
    }
  }


  // loginout function

  let logoutUser = () => {
    const shouldLogout = window.confirm("Are you sure you want to log out?");
    if (shouldLogout) {
      SetAuthToken(null);
      SetUser(null);
      localStorage.removeItem('authToken');
      nav('/');
    }
  }
  let updateToken = async (e) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/refresh/', {
        refresh: authToken?.refresh
      });

      let data = response.data


      if (response.status === 200) {
        SetAuthToken(data)
        SetUser(jwtDecode(data.access))
        localStorage.setItem('authToken', JSON.stringify(data))
      }

      else {

        logoutUser()
      }
      if (loading) {
        setLoading(false)
      }
    }
    catch {
      console.log('error');
    }

  }


  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    authToken: authToken,
    // fetchUsers:fetchUsers,
  }

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    let fourMinutes = 1000 * 60 * 15;
    let interval = setInterval(() => {
      if (authToken) {
        // console.log("bfgerfgrgfgbfrgfbfgr");
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authToken, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}
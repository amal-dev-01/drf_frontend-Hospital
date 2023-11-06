
// import axios from 'axios'
// import { jwtDecode } from 'jwt-decode'
// import dayjs from 'dayjs'



// const baseURL = 'http://127.0.0.1:8000'


// let authToken = localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken') ): null
// console.log(authToken);

// const axiosInstance = axios.create({
//     baseURL,
//     headers:{Authorization:`Bearer ${authToken.access}`}
// })
// axiosInstance.interceptors.request.use(async (req) => {
//     if (!authToken) {
//         authToken = localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null;
//     }
//     req.headers.Authorization = `Bearer ${authToken?.access}`;
//     const user =jwtDecode(authToken.access)
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()<1)
//     if(!isExpired) return req
//     const response =await axios.post(`${baseURL}/refresh/`,{

//         refresh:authToken.refresh
//     })
    
//     localStorage.setItem('authToken',JSON.stringify(response.data))
//     req.headers.Authorization =`Bearer ${authToken?.access}`
//     return req
// })

// export default axiosInstance
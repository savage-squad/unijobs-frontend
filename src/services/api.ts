import axios from 'axios';

// new ip v2
const api = axios.create({
  baseURL: `http://localhost:8080`,
});

// async function getRefreshToken(error: Error) {
//   return new Promise((resolve, reject) => {
//     try {
//       const refresh_token = localStorage.getItem('@UniJobs:refreshToken');

//       if (refresh_token) {
//         console.log("aki");
//         api
//           .post(`/refreshToken`, refresh_token)
//           .then(async res => {
//             const { token, refreshToken } = res.data.token;

//             localStorage.setItem('@UniJobs:token', token);
//             localStorage.setItem('@UniJobs:refreshToken', refreshToken);

//             return resolve(res);
//           })
//           .catch(err => {
//             // Fazer algo caso não seja feito o refresh token
//             return reject(err);
//           });
//       }
//     } catch (err) {
//       return reject(err);
//     }
//   });
// }

// Response interceptor for API calls
api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const token = localStorage.getItem('@UniJobs:token');
    if (error.response.status === 401 && token) {
      console.log('Token inválido ou expirado');
      // const response = await getRefreshToken(error);
      // return response;
    }
  },
);

export default api;

// import axios from 'axios'

// export async function logIn(inputs) {
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/signin', inputs);
//       if (res.status === 200) {
//         const token = res.data.accessToken;
//         localStorage.setItem('token', token);
//       } else {
//         console.log('Error');
//       }
//     } catch (error) {
//       console.log('Error', error);
//     }
//   }
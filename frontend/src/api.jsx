import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.API_URL || 'http://localhost:8080',
  withCredentials: true,
}
);

// lägga till refreshtoken logik här?
// efter snabb koll ser det ut som det skulle va bra, men verkar va lite too much just nu med queues och grejer? oklart. 
// inte prio ...

// apiClient.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response) {
//             console.error('API Error:', error.response.data);
//         } else {
//             console.error('Network Error:', error.message);
//         }
//         return Promise.reject(error);
//     }
// );

export default apiClient;
// import { Route, Redirect } from 'react-router-dom';

// function PrivateRoute({ component: Component, ...rest }) {
//   const token = localStorage.getItem('token');
//   const isAuthenticated = !!token;

//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// }

// export default PrivateRoute;
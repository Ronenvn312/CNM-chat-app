// import {Route} from 'react-router-dom'
// import {UserAuth} from '../context/AuthContext'

// export default function PrivateRoute({elemment:elemment, ...rest}) {
//   const {currentUser} = UserAuth()

//   return (
//     <Route
//       {...rest}
//       render={props => {
//         return currentUser?.emailVerified ? <Element {...props} /> : <Route path='/login' />
//     }}>
//     </Route>
//   )
// }
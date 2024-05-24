import { Route } from "react-router-dom";

export const PublicRoute = ({ element, ...rest }) => {
  return <Route {...rest} element={element} />;
};

// export const privateRoute = () => {
//   return (
//     <div>
//       <h1>Customed Route 2</h1>
//     </div>
//   );
// };

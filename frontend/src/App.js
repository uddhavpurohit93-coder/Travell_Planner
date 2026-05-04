// import Signup from "./Signup";
// import Login from "./Login";
// import MainApp from "./MainApp";

// function App() {
//   const token = localStorage.getItem("token");

//   return (
//     <div>
//       {token ? (
//         <MainApp />
//       ) : (
//         <>
//           <Signup />
//           <hr />
//           <Login />
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
import MainApp from "./MainApp";
import AuthPage from "./AuthPage";

function App() {
  const token = localStorage.getItem("token");

  return token ? <MainApp /> : <AuthPage />;
}

export default App;
import GlobalStyles from "./styles/global";
import AuthContext from "./context/AuthContext";

import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <AuthContext.Provider value={{ name: "anderson" }}>
        <SignIn />
      </AuthContext.Provider>
      <GlobalStyles />
    </>
  );
}

export default App;

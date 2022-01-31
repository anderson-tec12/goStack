import GlobalStyles from "./styles/global";
import { AuthProvider } from "./context/AuthContext";

import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <GlobalStyles />
    </>
  );
}

export default App;

import GlobalStyles from "./styles/global";
import { AuthProvider } from "./hooks/AuthContext";

import { ToastContainer } from "./components/ToastContainer";
import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <ToastContainer />
      <GlobalStyles />
    </>
  );
}

export default App;

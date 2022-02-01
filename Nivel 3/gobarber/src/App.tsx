import GlobalStyles from "./styles/global";

import { AppProvider } from "./hooks";
import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <AppProvider>
        <SignIn />
      </AppProvider>

      <GlobalStyles />
    </>
  );
}

export default App;

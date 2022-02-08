import { BrowserRouter } from "react-router-dom";

import GlobalStyles from "./styles/global";

import { AppProvider } from "./hooks";
import { Routes } from "./routes";

function App() {
  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AppProvider>

      <GlobalStyles />
    </>
  );
}

export default App;

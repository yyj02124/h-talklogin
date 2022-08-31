import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import FormikLoginPage from "./FormikLoginPage";
import LoginPage from "./LoginPage";
import LoginPageQuery from "./LoginPageQuery";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      {/* <QueryClientProvider client={queryClient}>
        <LoginPageQuery />
      </QueryClientProvider> */}
      <LoginPage />
    </div>
  );
}

export default App;

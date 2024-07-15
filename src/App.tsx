import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { LoginFormData } from "./types";
import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Login successful", data);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };
  return <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />;
}

export default App;

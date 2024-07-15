import { useState } from "react";
import "../styles/form.css";

export function Form() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  function handleChange() {
    console.log("I'm a function");
  }

  return (
    <form id="loging-form" action="">
      <h1>Welcome to Blisko!</h1>
      <h2>The Ultimate Friendship Organizer</h2>
      <h3>Log in now and discover the magic of perfectly timed hangouts!</h3>
      <label htmlFor="username">
        Enter your cool nickname here
        <input
          type="text"
          className="form__input-username"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="email">
        Where we send good vibes and friendship updates
        <input
          type="text"
          className="form__input-email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password">
        Shh… It’s the key to your social kingdom
        <input
          type="text"
          className="form__input-password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </label>
      <button className="form__button-login">Login</button>
    </form>
  );
}

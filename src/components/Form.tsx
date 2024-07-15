import { useState } from "react";
import { z } from "zod";
import "../styles/form.css";

const schema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must not exceed 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters long")
    .max(50, "Email must not exceed 50 characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must not exceed 50 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export function Form() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const result = schema.safeParse(formData);
  }

  return (
    <form id="loging-form" onSubmit={handleSubmit}>
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
          value={formData.username}
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
          value={formData.email}
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
          value={formData.password}
        />
      </label>
      <button className="form__button-login">Login</button>
    </form>
  );
}

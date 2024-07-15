import { useState } from "react";
import { z } from "zod";
import { LoginFormData } from "../types";
import "../styles/loginForm.css";

const loginSchema = z.object({
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

interface FormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading = false }: FormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

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

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError(null);
    onSubmit(result.data);
  }

  return (
    <div className="loging-page">
      <form className="loging-page__form" onSubmit={handleSubmit}>
        <h1>Welcome to Blisko!</h1>
        <h5>The Ultimate Friendship Organizer</h5>
        <p>Log in now and discover the magic of perfectly timed hangouts!</p>
        <label className="form__label" htmlFor="email">
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
        <label className="form__label" htmlFor="password">
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
        {error && (
          <p className="form__error-message" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <button
          className="form__button-loging"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="loging-page__image-container">
        <img
          className="loging-page__image"
          src="./src/assets/10124049.jpg"
          alt="login illustration"
        />
      </div>
    </div>
  );
}

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.fname) {
      validationErrors.fname = "First Name is required.";
    }
    if (!formData.lname) {
      validationErrors.lname = "Last Name is required.";
    }
    if (!formData.email) {
      validationErrors.email = "Email Address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is invalid.";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      validationErrors.password =
        "Password must be at least 6 characters long.";
    }
    if (formData.cpassword !== formData.password) {
      validationErrors.cpassword = "Passwords do not match.";
    }

    setErrors(validationErrors);

    // Only show success message if no validation errors
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:8000/users", formData)
        .then((result) => {
          alert("Nice to Meet you 😎");
          navigate("/login");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="details">
      <form onSubmit={handleSubmit}>
        <h1 className="det-titl">
          <Link to="/" className="logo">
            Foodie<span>Space</span>
          </Link>
        </h1>
        <h3 className="slogan">From your eyes to your stomach!</h3>
        <h2>Welcome!</h2>
        <p>Create your Account here:</p>
        {Object.keys(errors).length > 0 && (
          <div className="error-messages">
            {errors.fname && <div>{errors.fname}</div>}
            {errors.lname && <div>{errors.lname}</div>}
            {errors.email && <div>{errors.email}</div>}
            {errors.password && <div>{errors.password}</div>}
            {errors.cpassword && <div>{errors.cpassword}</div>}
          </div>
        )}

        <label>First Name :</label>
        <input
          type="text"
          name="fname"
          placeholder="First Name"
          onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
        />

        <label>Last Name :</label>
        <input
          type="text"
          name="lname"
          placeholder="Last Name"
          onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
        />

        <label>Email address :</label>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <label>Password :</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <label>Confirm Password :</label>
        <input
          type="password"
          name="cpassword"
          placeholder="Confirm Password"
          onChange={(e) =>
            setFormData({ ...formData, cpassword: e.target.value })
          }
        />

        <button className="btn">Sign up</button>

        <p style={{ marginTop: "2vh" }}>
          <Link to="/login">Already have an account?</Link>
        </p>
      </form>
    </div>
  );
}

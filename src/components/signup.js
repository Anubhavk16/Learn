



import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


function Signup() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Set the default role to "user"

  async function submit(e) {
    e.preventDefault();
    
    try {
      await axios.post("http://localhost:8000/signup", {
        email,
        password,
        role, 
      })
      .then(res => {
        if (res.data === "exist") {
          alert("User already exists");
        } else if (res.data === "notexist") {
          history("/");
        }
      })
      .catch(e => {
        alert("Wrong details");
        console.log(e);
      });

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login">
      <h1>Signup</h1>
      <form>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div>
          <input
            type="radio"
            id="superadmin"
            name="role"
            value="superadmin"
            checked={role === "superadmin"}
            onChange={() => setRole("superadmin")}
          />
          <label htmlFor="superadmin">Superadmin &nbsp;</label>
          <input
            type="radio"
            id="user"
            name="role"
            value="user"
            checked={role === "user"}
            onChange={() => setRole("user")}
          />
          <label htmlFor="user">User &nbsp;</label>
        </div>
        <input type="submit" onClick={submit} />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/">Login Page</Link>
    </div>
  );
}

export default Signup;


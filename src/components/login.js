
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// function Login() {
//   const history = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function submit(e) {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8000/", {
//         email,
//         password,
//       });

//       const { data } = response;

//       if (data.status === "matched" && data.token) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("role", data.role); // Set the user's role in localStorage

//         history("/home", { state: { id: email } });
//       } else if (data.status === "notexist") {
//         alert("User has not signed up");
//       }
//     } catch (e) {
//       alert("Wrong details");
//       console.log(e);
//     }
//   }

//   return (
//     <div className="login">
//       <h1>Login</h1>
//       <form>
//         <input
//           type="email"
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <input type="submit" onClick={submit} />
//       </form>
//       <br />
//       <p>OR</p>
//       <br />
//       <Link to="/signup">Signup Page</Link>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/", {
        email,
        password,
        
      });

      const { data } = response;
      console.log(response,"dfdfg");

      if (data.status === "matched" && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
         // Store the role in localStorage

        navigate("/home", { state: { id: email } });
      } else if (data.status === "notexist") {
        alert("User has not signed up");
      }
    } catch (e) {
      alert("Wrong details");
      console.log(e);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
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
        <input type="submit" onClick={submit} />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/signup">Signup Page</Link>
    </div>
  );
}

export default Login;



// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import { useNavigate, Link } from "react-router-dom"


// function Login() {
//     const history=useNavigate();

//     const [email,setEmail]=useState('')
//     const [password,setPassword]=useState('')
//     // const role = localStorage.getItem("role");

//     async function submit(e){
//         e.preventDefault();

//         try{

//             await axios.post("http://localhost:8000/signup",{
//                 email,password
//             })
//             .then(res=>{
//                 console.log(res,"zdxfcgvhbjnkm");
//                 if(res.data=="exist"){
//                     alert("User already exists")
                    
//                 }
//                 else if(res.data.data){
//                     // localStorage.setItem("role", res.data.role);
//                     // localStorage.setItem("token",res.data.token);
//                     history("/home")
//                 }
//             })
//             .catch(e=>{
//                 alert("wrong details")
//                 console.log(e);
//             })

//         }
//         catch(e){
//             console.log(e);

//         }

//     }


//     return (
//         <div className="login">

//             <h1>Signup</h1>

//             <form action="POST">
//                 <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
//                 <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
//                 <div >
//             <input
//               type="radio"
//               id="exampleCheck1"
//               name="Choose"
//               value="Superuser"
          
//             /><label htmlFor="exampleCheck1">SuperAdmin &nbsp;</label>
//             <input
//               type="radio"
//               id="exampleCheck2"
//               name="Choose"
//               value="user"
            
//             />
//             <label htmlFor="exampleCheck2">user &nbsp;</label>
//                 <input type="submit" onClick={submit} />
//                 </div>

//             </form>

//             <br />
//             <p>OR</p>
//             <br />

//             <Link to="/">Login Page</Link>

//         </div>
//     )
// }

// export default Login



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
        role, // Include the user's role in the request
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


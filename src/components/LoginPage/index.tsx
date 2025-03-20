// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { useNavigationControl } from "../../NavigationProvide";

// const LoginInPage: React.FC = () => {
//   const navigate = useNavigate();

//   const { enableNavigation } = useNavigationControl();

//   const [logindata, setLogindata] = useState<{
//     email: string;
//     password: string;
//   }>({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState<{
//     email: string;
//     password: string;
//   }>({
//     email: "",
//     password: "",
//   });

//   const [storedData, setStoredData] = useState<any[]>([]);

//   useEffect(() => {
//     const storedFormData = localStorage.getItem("users");

//     if (storedFormData) {
//       try {
//         const parsedData = JSON.parse(storedFormData);
//         setStoredData(Array.isArray(parsedData) ? parsedData : [parsedData]);
//       } catch (error) {
//         console.error("Error parsing stored data:", error);
//         setStoredData([]);
//       }
//     }
//   }, []);

//   const validateEmail = (email: string) => {
//     if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
//       return false;
//     }
//     return true;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setLogindata((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: "",
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     let validationErrors = {
//       email: "",
//       password: "",
//     };

//     if (!logindata.email || !validateEmail(logindata.email)) {
//       validationErrors.email = "Please enter a valid email address.";
//     }

//     if (!logindata.password) {
//       validationErrors.password = "Password is required.";
//     }

//     if (validationErrors.email || validationErrors.password) {
//       setErrors(validationErrors);
//       return;
//     }

//     console.log(storedData, "storedData", logindata, "logindata");

//     if (storedData) {
//       const matchedIndex = storedData.findIndex(
//         (user: any) =>
//           user.email === logindata.email && user.password === logindata.password
//       );

//       if (matchedIndex !== -1) {
//         console.log("Login successful");
//         alert("Login Successful");

//         // Get the name based on the matched index
//         const matchedName = storedData[matchedIndex].name;
//         const matchedMail = storedData[matchedIndex].email;

//         // Pass the matched user's name via state
//         enableNavigation();
//         navigate("/LandingPage", {
//           state: { name: matchedName, email: matchedMail },
//         });
//       } else {
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           email: "Invalid email or password.",
//           password: "",
//         }));
//       }
//     }
//   };

//   return (
//     <>

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           flexDirection:"column",
//           alignItems: "center",
//           height: "100vh",
//           width: "100%",
//         }}
//       >
//         <div style={{ height: "50px", display: "flex", alignItems: "center"}}>
//         <div style={{ color: "#1E3A8A", fontSize: "20px",fontWeight:"bolder" }}>
//           Welcome to Planoroma!
//         </div>
//       </div>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             border: "1px solid #d3d3d3",
//             borderRadius: "10px",
//             backgroundColor: "white",
//             boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//             gap: "25px",
//             padding: "50px",
//           }}
//         >
//           <div style={{ color: "#1E3A8A", fontSize: "20px",fontWeight:"700" }}>Login</div>
//           <div>
//             <input
//               type="text"
//               name="email"
//               placeholder="Enter your email"
//               value={logindata.email}
//               onChange={handleChange}
//               style={{
//                 padding: "10px",
//                 borderRadius: "5px",
//                 border: "1px solid #ccc",
//                 fontSize: "14px",
//                 backgroundColor: "white",
//                 outline: "none",
//               }}
//             />
//             {errors.email && (
//               <div
//                 style={{
//                   color: "red",
//                   fontSize: "10px",
//                   fontWeight: "500",
//                   marginTop: "5px",
//                 }}
//               >
//                 {errors.email}
//               </div>
//             )}
//           </div>
//           <div>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={logindata.password}
//               onChange={handleChange}
//               style={{
//                 padding: "10px",
//                 borderRadius: "5px",
//                 border: "1px solid #ccc",
//                 fontSize: "14px",
//                 backgroundColor: "white",
//                 outline: "none",
//               }}
//             />
//             {errors.password && (
//               <div
//                 style={{
//                   color: "red",
//                   fontSize: "10px",
//                   fontWeight: "500",
//                   marginTop: "5px",
//                 }}
//               >
//                 {errors.password}
//               </div>
//             )}
//           </div>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: "10px",
//             }}
//           >
//             <button
//               type="submit"
//               onClick={handleSubmit}
//               style={{
//                 padding: "8px 15px",
//                 borderRadius: "4px",
//                 border: "none",
//                 cursor: "pointer",
//                 backgroundColor: "#1E3A8A",
//                 color: "white",
//                 fontSize: "14px",
//                 fontWeight: "600",
//               }}
//             >
//               Login
//             </button>
//             <div style={{ color: "black" }}>or</div>
//             <div
//               style={{
//                 color: "black",
//                 fontSize: "12px",
//                 fontWeight: "500",
//                 cursor: "pointer",
//               }}
//             >
//               Don't have an account ?
//             </div>
//             <button
//               type="submit"
//               onClick={() => navigate("/sign-in-page")}
//               style={{
//                 padding: "8px 15px",
//                 borderRadius: "4px",
//                 border: "none",
//                 cursor: "pointer",
//                 backgroundColor: "#1E3A8A",
//                 color: "white",
//                 fontSize: "14px",
//                 fontWeight: "600",
//               }}
//             >
//               Sign in
//             </button>
//             <button>Signin with google</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginInPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useNavigationControl } from "../../NavigationProvide";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA59tEBKuXiwHxxq9H7m_bh_qsPgMZP10s",
  authDomain: "planoroma-a628c.firebaseapp.com",
  projectId: "planoroma-a628c",
  storageBucket: "planoroma-a628c.firebasestorage.app",
  messagingSenderId: "1091304697662",
  appId: "1:1091304697662:web:f05826787fefa7939dc66f",
  measurementId: "G-W0Y0N79LQV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const LoginInPage: React.FC = () => {
  const navigate = useNavigate();
  const { enableNavigation } = useNavigationControl();

  const [logindata, setLogindata] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const [storedData, setStoredData] = useState<any[]>([]);

  useEffect(() => {
    const storedFormData = localStorage.getItem("users");
    if (storedFormData) {
      try {
        const parsedData = JSON.parse(storedFormData);
        setStoredData(Array.isArray(parsedData) ? parsedData : [parsedData]);
      } catch (error) {
        console.error("Error parsing stored data:", error);
        setStoredData([]);
      }
    }
  }, []);

  const validateEmail = (email: string) =>
    email.includes("@") && email.includes(".");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogindata((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let validationErrors = { email: "", password: "" };

    if (!logindata.email || !validateEmail(logindata.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }
    if (!logindata.password) {
      validationErrors.password = "Password is required.";
    }
    if (validationErrors.email || validationErrors.password) {
      setErrors(validationErrors);
      return;
    }

    const matchedIndex = storedData.findIndex(
      (user: any) =>
        user.email === logindata.email && user.password === logindata.password
    );

    if (matchedIndex !== -1) {
      alert("Login Successful");
      const matchedUser = storedData[matchedIndex];
      enableNavigation();
      navigate("/LandingPage", {
        state: { name: matchedUser.name, email: matchedUser.email },
      });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email or password.",
        password: "",
      }));
    }
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email } = result.user;
        localStorage.setItem(
          "googleUser",
          JSON.stringify({ name: displayName, email })
        );
        alert(`Welcome ${displayName}!`);
        enableNavigation();
        navigate("/LandingPage", { state: { name: displayName, email } });
      })
      .catch((error) => {
        console.error("Google sign-in failed:", error);
        alert(`Google sign-in failed: ${error.message}`);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div style={{ height: "50px", display: "flex", alignItems: "center" }}>
        <div
          style={{ color: "#1E3A8A", fontSize: "20px", fontWeight: "bolder" }}
        >
          Welcome to Planoroma!
        </div>
      </div>
      <div
        style={{
        
          border: "1px solid #d3d3d3",
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        
          padding: "50px",
        }}
      >
        <div style={{  display: "flex",
          flexDirection: "column",
          alignItems: "center",  gap: "25px",}}>
          <div
            style={{ color: "#1E3A8A", fontSize: "20px", fontWeight: "700" }}
          >
            Login
          </div>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={logindata.email}
            onChange={handleChange}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
              backgroundColor: "white",
              outline: "none",
            }}
          />
          {errors.email && (
            <div
              style={{
                color: "red",
                fontSize: "10px",
                fontWeight: "500",
                marginTop: "5px",
              }}
            >
              {errors.email}
            </div>
          )}
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={logindata.password}
            onChange={handleChange}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
              backgroundColor: "white",
              outline: "none",
            }}
          />
          {errors.password && (
            <div
              style={{
                color: "red",
                fontSize: "10px",
                fontWeight: "500",
                marginTop: "5px",
              }}
            >
              {errors.password}
            </div>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              padding: "8px 15px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#1E3A8A",
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Login
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
            marginTop:"10px"
          }}
        >
          <div style={{ color: "black", fontSize: "12px", fontWeight: "500" }}>
            Dont have an account?
          </div>
          <button
            type="submit"
            onClick={() => navigate("/sign-in-page")}
            style={{
              padding: "8px 15px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#1E3A8A",
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Sign in
          </button>
          <div style={{ color: "black", fontSize: "12px", fontWeight: "500" }}>
            or
          </div>
          <button
            onClick={handleGoogleSignIn}
            style={{
              padding: "8px 15px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#DB4437",
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginInPage;

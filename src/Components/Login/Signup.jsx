import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useHistory } from "react-router-dom";
import { REGISTER } from "../../Config/Config";
import axios from "axios";
import { ProgressBar } from 'react-loader-spinner'
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const handleEmailChange = (e) => {
    let str = e.target.value;
    if (str.includes("@") && str.includes(".")) {
      setShowPassword(true);
      setEmail(e.target.value)
    } else {
      setShowPassword(false);
    }
  };



  const handlePasswordChange =(e)=>{
    setPassword(e.target.value);
  }

  const handleRegister =async(e)=>{
    const payload ={
      email,
      password
    }
    try {
      setLoader(true);
      const res = await axios.post(REGISTER, payload);
      const result = res.data;
      localStorage.setItem("login", JSON.stringify(result));
      setLoader(false);
      history.push("/");
      alert("Succesfully created account!!")
    } catch (error) {
      console.log(error);
      const erroMsg = error.response.data.error.message;
      alert(erroMsg);
      setLoader(false);
    }
   
  }

  return (
    <div className={styles.login}>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <Link to="/">
            <p><span>BookMyHotel</span><span>.com</span></p>
          </Link>
        </div>
        
      </div>
      {loader && <div>
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor='#003580'
          barColor='#006FBF'
        />
      </div>}
      <div className={styles.form}>
        <h2 className={styles.formheading}>Create an account</h2>
        <form action="">
          <label htmlFor="email">Email address</label>
          <input
            onChange={handleEmailChange}
            className={styles.input}
            type="email"
            name="email"
            id="email"
            autoFocus
          />
          {showPassword ? (
            <div>
              <label htmlFor="password1">Password</label>
              <input
                className={styles.input}
                type="password"
                name="password1"
                id="password1"
              />
              <label htmlFor="password2">Confirm Password</label>
              <input
                className={styles.input}
                onChange={handlePasswordChange}
                type="password"
                name="password2"
                id="password2"
              />
            </div>
          ) : null}
          <button
            className={styles.button}
            type="button"
            onClick={handleRegister}
            value="Create account"
          >Create account</button>
          <div className={styles.account}>
            Already have account login <Link to="/login" >Here!</Link>
          </div>
        </form>
      </div>
      <div className={styles.line1}>
        <hr />
        <p className={styles.p1}>
          By signing in or creating an account, you agree with our{" "}
          <span style={{ color: "blue" }}>Terms & Conditions</span> and{" "}
          <span style={{ color: "blue" }}>Privacy Statement</span>
        </p>
        <hr />
      </div>
      <div className={styles.line1}>
        <p className={styles.p1}>All rights reserved.</p>
        <p className={styles.p1}>Copyright - 2023 – BookMyHotel.com™</p>
      </div>
    </div>
  );
};

export default SignUp;



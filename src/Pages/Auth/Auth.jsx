// Auth.jsx
import React from "react";
import { Link } from "react-router-dom";
import classes from "./SignIn.module.css";

function Auth() {
  return (
    <section className={classes.login}>
      {/* logo */}
      <Link>
        <img
          className={classes.logo}
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
        />
      </Link>
      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="Email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="Password" />
          </div>
          <button className={classes.login_signInButton}>Sign In</button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        {/* create account button */}
        <button className={classes.login_registerButton}>
          Create your Amazon account
        </button>
      </div>
    </section>
  );
}

export default Auth;

// import React from "react";
// import { Link } from "react-router-dom";
// import classes from "./SignIn.module.css";

// function Auth() {
//   return (
//     <section className={classes.login}>
//       {/* logo */}
//       <Link>
//         <img
//           className={classes.logo}
//           src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
//           alt="Amazon Logo"
//         />
//       </Link>
// {/* form */}
//       <div className={classes.login_container}>
//         <h1>Sign In</h1>
//         <form>
//           <div>
//             <label>Email</label>
//             <input type="email" />
//           </div>
//           <div>
//             <label>Password</label>
//             <input type="password" />
//           </div>
//           <button className={classes.login_signInButton}>Sign In</button>
//         </form>

//         <p>
//           By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
//           Sale. Please see our Privacy Notice, our Cookies Notice and our
//           Interest-Based Ads Notice.
//         </p>

//         <Link to="/signup">
//           <button className={classes.login_registerButton}>
//             Create your Amazon account
//           </button>
//         </Link>
//       </div>
//     </section>
//   );
// }

// export default Auth;

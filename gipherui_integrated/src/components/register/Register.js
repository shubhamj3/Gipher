import React, { useState } from 'react'
import { useHistory } from 'react-router';
import './Register.css';
import { BrowserRouter, Link, Router } from 'react-router-dom';
import { Box, Typography, Button, ListItem, withStyles } from '@material-ui/core';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import swal from 'sweetalert';

// import Radium, {Style} from 'radium';


const schema = yup.object().shape({

    userName: yup.string()
    .matches(/^[A-Za-z][a-zA-Z0-9-_.]{2,10}/,"UserName cannot start with a number and must be between 3 to 10 characters")
    .required('First Name is required'),

    email: yup.string()
    .required('Email is required')
    .email('Email is invalid'),

    password: yup.string()
    // .min(6, 'Password must be at least 6 characters')
    .matches(
        /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 6 characters, one uppercase, one number and one special case character"
      )
    .required('Password is required'),

    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function Register() {

    const history = useHistory();
    // const style={
    //     color: '#000000',
    //     ':hover': {
    //       color: '#ffffff'
    //     }
    // }


    const { register, handleSubmit, reset, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = data => {
        // display form data on success
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        // const UserNameToken = data.userName;
         fetch('http://localhost:8765/api/v1/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // mode:"no-cors",
            body: JSON.stringify({"username":data.userName , "email": data.email , "password": data.password})
        }).then(res => res.json())
        .then(data=>
            // localStorage.setItem('username',UserNameToken),
            swal({
                title: "Registration Successful!",
                text: "Please Login!",
                icon: "success",
              }),
            history.push('/login')
            ).catch(error=>swal("User With Given Credentials Already Exists!", "Please Return To Login!", "error"));

    
    }




    return (
        <body>
            <div className="register-box">
                <h2 >Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
                    <div className="user-box">
                        {/* <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)}  required="All the fields are required" />
                        <span><i className="fa fa-user"></i></span> */}
                        {/* <label className="username">Username</label> */}

                        {/* <label>User Name</label> */}
                        <span><i className="fa fa-user"></i></span>
                            <input name="userName" placeholder= "User Name" type="text" {...register('userName')} className={`form-control ${errors.userName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.userName?.message}</div>

                    </div>
                    <div className="user-box">
                        {/* <input type="email" className="form-control" onChange={(e) => setemail(e.target.value)} required="All the fields are required" />
                        <span><i className="fa fa-envelope"></i></span>
                        <label>Email Address</label> */}

                        {/* <label>Email</label> */}
                        <span><i className="fa fa-envelope"></i></span>
                        <input name="email" placeholder= "Email"  type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                    <div className="user-box">
                        {/* <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}  required="All the fields are required" />
                        <span><i className="fa fa-key"></i></span>
                        <label>Password</label> */}

                        {/* <label>Password</label> */}
                        <span><i className="fa fa-key"></i></span>
                        <input name="password" placeholder= "Password"  type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <div className="user-box">
                        {/* <input type="confirmPassword" className="form-control" onChange={(e) => setPassword(e.target.value)} required="All the fields are required" />
                        <span><i className="fa fa-key"></i></span>
                        <label>Confirm Password</label> */}

                        {/* <label>Confirm Password</label> */}
                        <span><i className="fa fa-key"></i></span>
                        <input name="confirmPassword" placeholder= "Confirm Password"  type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                    </div>
                    {/* <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: 'none' }}
            type="file"
             />
          <Button
            className="btn-choose btn-info"
            variant="contained"
            size="small"
            component="span" >
             select profile picture
          </Button>
        </label> */}
                    {/* <button className="loginbtn"  onClick={RegisterHandler} >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                            Register
                        </button> */}

                        <button type="submit" className="loginbtn">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                            Register</button>
                        {/* <button className="btn btn-secondary" type="reset">Reset</button> */}

                    <div className="create text-center">
                        <Link to="/login" className="newaccount">
                            Already have an Account ?
                        </Link>
                    </div>
                </form>
            </div>
        </body>
    )
}



















// import React, { useState } from 'react'
// import { useHistory } from 'react-router';
// import './Register.css';
// import { BrowserRouter, Link, Router } from 'react-router-dom';
// import { Box, Typography, Button, ListItem, withStyles } from '@material-ui/core';

// // const cors = require("cors");
// export default function Register() {

//     const history = useHistory();
//     const [emai, setemail] = useState('');
//     const [password, setPassword] = useState('');
//     const [UserName, setUsername] = useState('');
//     const RegisterHandler = async () => {
//         await  fetch('http://localhost:8765/api/v1/user/register', {
//             // //crossDomain:true,
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             mode:"cors",
//             body: JSON.stringify({ "email": emai, "password": password, "username": UserName })
//         }).then(res => res.json())
//         .then(data=>
//             console.log(data)
//             // history.push('/login')
//             )
//     }

//     return (
//         <body>
//             <div className="register-box">
//                 <h2 >Register</h2>
//                 <form>
//                     <div className="user-box">
//                         <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)}  required="All the fields are required" />
//                         <span><i className="fa fa-user"></i></span>
//                         <label className="username">Username</label>
//                     </div>
//                     <div className="user-box">
//                         <input type="text" className="form-control" onChange={(e) => setemail(e.target.value)} required="All the fields are required" />
//                         <span><i className="fa fa-envelope"></i></span>
//                         <label>Email Address</label>
//                     </div>
//                     <div className="user-box">
//                         <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}  required="All the fields are required" />
//                         <span><i className="fa fa-key"></i></span>
//                         <label>Password</label>
//                     </div>
//                     <div className="user-box">
//                         <input type="confirmPassword" className="form-control" onChange={(e) => setPassword(e.target.value)} required="All the fields are required" />
//                         <span><i className="fa fa-key"></i></span>
//                         <label>Confirm Password</label>
//                     </div>
//                     <label htmlFor="btn-upload">
//           <input
//             id="btn-upload"
//             name="btn-upload"
//             style={{ display: 'none' }}
//             type="file"
//              />
//           <Button
//             className="btn-choose btn-info"
//             variant="outlined"
//             component="span" >
//              Choose Files
//           </Button>
//         </label>
//                     <button className="loginbtn"  onClick={RegisterHandler} >
//                         <span></span>
//                         <span></span>
//                         <span></span>
//                         <span></span>
//                             Register
//                         </button>

//                     <div className="create text-center">
//                         <Link to="/login" className="newaccount">
//                             Already have an Account ?
//                         </Link>
//                     </div>
//                 </form>
//             </div>
//         </body>
//     )
// }



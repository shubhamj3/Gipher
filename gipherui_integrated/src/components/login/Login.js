import React, { useState,useContext } from 'react'
import { useHistory } from 'react-router';
import './Login.css';
import { BrowserRouter, Link, Router } from 'react-router-dom';
import { Box, Typography, Button, ListItem, withStyles } from '@material-ui/core';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MyAppContext from '../MyAppContext';
import Swal from 'sweetalert2';
// import Radium, {Style} from 'radium';


const schema = yup.object().shape({


    email: yup.string()
    .required('Email is required')
    .email('Email is invalid'),

    password: yup.string()
    .min(6, 'Password is required')
    .required('Password is required'),

});

export default function Login() {

    const { state, dispatch } = useContext(MyAppContext);

    const history = useHistory();


    const { register, handleSubmit, reset, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit =  data => {
        // display form data on success
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
    //    const isLoggedIn= false;
        //    this.isLoggedIn= false; 
        // state.isLoggedIn;
        const EmailToken= data.email;
       

         fetch('http://localhost:8765/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // mode:"no-cors",
            body: JSON.stringify({ "email": data.email , "password": data.password})
        }).then(res => res.json())
        .then((data)=>{
            
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', EmailToken);
                localStorage.setItem('username', data.username);
              
                    if(data.token)
                     {   
                        //  history.push('/userprofile');
                        dispatch({
                            type: "LogInStatus",
                            value: {
                              isLoggedIn: true,
                            },
                          });
                          history.push('/userprofile');
                          Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Login Successful',
                            showConfirmButton: false,
                            timer: 1500,
                            backdrop: `
                            rgba(0,0,123,0.4)
                            url("/images/nyan-cat.gif")
                            left top
                            no-repeat
                          `
                          })
                        }
        }).catch(error=>Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Password is not correct!'
            // footer: '<a href="/Register.js">New User?</a>'
          }))
            }
        

    return (
        <body>
            <div className="register-box">
                <h2 >Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>

                    <div className="user-box">
                        <span><i className="fa fa-envelope"></i></span>
                        <input name="email" placeholder= "Email"  type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                    <div className="user-box">
                        <span><i className="fa fa-key"></i></span>
                        <input name="password" placeholder= "Password"  type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                  
                

                        <button type="submit" className="loginbtn">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                            Login</button>
 
                 <div className="create text-center">
                     <Link to="/register" className="newaccount">
                         Create A New Account ?
                 </Link>
                 </div>
           
         
                </form>
            </div>
        </body>
    )
}


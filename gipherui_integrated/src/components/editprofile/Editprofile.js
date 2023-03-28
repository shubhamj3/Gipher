import React from 'react'
import { useState, useEffect } from "react";
import { useHistory } from 'react-router';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
const schema = yup.object().shape({

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


export default function Editprofile () {

    const history = useHistory();

    const { register, handleSubmit, reset, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = async data => {
        // display form data on success
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        // const UserNameToken = data.userName;
        // preventDefault();
        console.log(data);
       await fetch('http://localhost:8765/api/v1/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            // mode:"no-cors",
            body: JSON.stringify({ username : localStorage.getItem('username'), email: localStorage.getItem('email'), password: data.password })
        }).then(res => res.json())
            .then(data =>
                // localStorage.setItem('username',UserNameToken),
                swal({
                    title: "Update Successful!",
                    // text: "Please Login!",
                    icon: "success",
                }),
                history.push('/userprofile')
            ).catch(error => swal("Please provide correct credentials!", "error"));


    }

    return (
        
              <body>
                    <div className="register-box">
                        <h2 >Update Profile</h2>
                        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>

                            <div className="user-box">
                                <span><i className="fa fa-key"></i></span>
                                <input name="password" placeholder="Password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </div>
                            <div className="user-box">
                                <span><i className="fa fa-key"></i></span>
                                <input name="confirmPassword" placeholder="Confirm Password" type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                            </div>
                        
 

                            {/* <button type="submit" className="loginbtn" onClick={onSubmit} >Submit</button> */}
                            <button type="submit" className="loginbtn">
                            <span></span>
                            <span></span>
                             <span></span>
                            <span></span>
                            Update</button>
                            {/* <button className="btn btn-secondary" type="reset">Reset</button> */}
                            
                 
                         
                        </form>
                    </div>
                </body>
        
    )
}


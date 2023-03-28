import DisplayCard from "../card/DisplayCard";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import "./Userprofile.css";
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
import { BrowserRouter, Link, Router } from 'react-router-dom';


// const schema = yup.object().shape({

//     password: yup.string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),

//     confirmPassword: yup.string()
//     .oneOf([yup.ref('password'), null], 'Passwords must match')
//     .required('Confirm Password is required'),
// });

const Userprofile = () => {

    const history = useHistory();
    const [reaction, setReaction] = useState([]);
    useEffect(() => {
        fetch('https://api.giphy.com/v1/gifs/trending?api_key=1KMPHCBIOe3hOjJwCJQX49sRc6cM0oIm')
            .then(res => res.json())
            .then((data1) => {
                console.log(data1.data);
                setReaction(data1.data)
            });

        //featured_gif.images.downsized_large
    }, [])


    return (
        <div className="container {classes.root}">
            <div className="row">
                <h1 id="Userprofile">User Profile</h1>
                <p>Hello {localStorage.getItem('username')} <span><i class="fas fa-check-circle"></i></span></p>
         
                <ButtonGroup className="buttongroup" size="large" color="primary" aria-label="large outlined primary button group">
                    <Button > 

                    <Link to="/editprofile"  className="nav-link editprofile">Edit Profile</Link>
                    </Button>
                    {/* <Button>Bookmarked Gifs</Button> */}
                    <Button>
                    <Link to="/likedgifs"  className="nav-link likedgifs">Liked Gifs</Link>
                        </Button>
                </ButtonGroup>


                <hr />
                {
                    reaction.map(item => <DisplayCard Poster={item.images.original.url} id={item.id} />)
                }

            </div>
        </div>
    )
}

export default Userprofile;

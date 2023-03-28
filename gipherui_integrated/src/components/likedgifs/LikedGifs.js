import React from 'react'
import { useState, useEffect } from 'react';
import DisplayCard from '../card/DisplayCard';
import { BiMinusBack } from 'react-icons/bi';
import { BrowserRouter, Link, Router } from 'react-router-dom';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { GoChevronLeft } from 'react-icons/go';
import CardWithoutLike from '../card/CardWithoutLike';

const LikedGifs = () => {
    const [likes, setlikes] = useState([])
    useEffect(() => {
        const emailToken = localStorage.getItem('email');
        const encodedEmail = encodeURIComponent(emailToken);
        fetch(`http://localhost:8765/api/v1/gipher/getusergifs?email=${encodedEmail}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },

        })

            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setlikes(data)
            });
    }, [])


    return (
        <div className="container">
            <div className="row">
                <h1 id="Artist">My Liked GIFs</h1>
                
        
                
                <p>@{localStorage.getItem('username')}'s Liked Gifs <span><i class="fas fa-check-circle"></i></span></p>

                <ButtonGroup className="buttongroup" size="large" color="primary" aria-label="large outlined primary button group">
                    <Button > 

                    <Link to="/editprofile"  className="nav-link editprofile">Edit Profile</Link>
                    </Button>
                    {/* <Button>Bookmarked Gifs</Button> */}
                    <Button>
                    <Link to="/userprofile"  className="nav-link likedgifs"><GoChevronLeft/></Link>
                        </Button>
                </ButtonGroup>

                <hr />
                {
                    likes.map(item => <CardWithoutLike Poster={item.embedURL} id={item.id} />)
                }

            </div>
        </div>
    )
}
export default LikedGifs;
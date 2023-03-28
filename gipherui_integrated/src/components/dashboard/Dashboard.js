import React from 'react'
import { useState, useEffect } from 'react';
import DisplayCard from '../card/DisplayCard';
import "./Dashboard.css";
import CardWithoutLike from '../card/CardWithoutLike';
 
const Dashboard = () => {
    const [likes, setlikes] = useState([])
    useEffect(() => {
        fetch('http://localhost:8765/api/v1/gipher/getall', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            
        },{ mode: 'no-cors'}) 

            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setlikes(data)
            });
    }, [])
 
    return (
        <div className="container">
            <div className="row">
                <h1 id="Dashboard">Trending Gifs</h1>
                <p>@TrendingGifs <span><i class="fas fa-check-circle"></i></span></p>
                <hr />
                {
                    likes.map(item => <CardWithoutLike Poster={item.embedURL} id={item.id} />)
                }
 
            </div>
        </div>
    )
}
export default Dashboard;














// import React from 'react'
// import { useState, useEffect } from "react";
// import "./Dashboard.css";
// import DisplayCard from "../card/DisplayCard";
 
// function Dashboard() {
 
//     const [trending, setTrending] = useState([]);
//     useEffect(() => {
//         fetch('https://api.giphy.com/v1/gifs/trending?api_key=1KMPHCBIOe3hOjJwCJQX49sRc6cM0oIm&q=artist')
//             .then(res => res.json())
//             .then((data1) => setTrending(data1.data));
//     }, [])
 
//     return (
//         <div className="container">
//             <div className="row">
//               <h1 id="Artist">Trending GIFs</h1>
//               <p>@ trending <span><i class="fas fa-check-circle"></i></span></p>
//               <hr />
//                 {
//                     trending.map(item => <DisplayCard   Poster={item.images.original.url} />)
//                 }
              
//             </div>
//         </div>
//     )
// }
 
// export default Dashboard
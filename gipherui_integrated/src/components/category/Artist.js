import DisplayCard from "../card/DisplayCard";
import { useState, useEffect } from "react";
import "./Artist.css";
const Artist = () => {
    
    
    const [reaction, setReaction] = useState([]);
    useEffect(() => {
        fetch('https://api.giphy.com/v1/gifs/search?api_key=1KMPHCBIOe3hOjJwCJQX49sRc6cM0oIm&q=artist')
            .then(res => res.json())
            .then((data1) => setReaction(data1.data));
            //featured_gif.images.downsized_large
    }, [])

   
    return (
        <div className="container">
            <div className="row">
              <h1 id="Artist">Artist GIFs</h1>
              <p>@ artist <span><i className="fas fa-check-circle"></i></span></p>
              <hr />
                {
                    reaction.map(item => <DisplayCard   Poster={item.images.original.url} id={item.id} />)
                }
              
            </div>
        </div>
    )
}

export default Artist;

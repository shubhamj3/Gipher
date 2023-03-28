import DisplayCard from "../card/DisplayCard";
import { useState, useEffect } from "react";
import "./Entertainment.css"

const Entertainment = () => {
    const [reaction, setReaction] = useState([]);
    useEffect(() => {
        fetch('https://api.giphy.com/v1/gifs/search?api_key=1KMPHCBIOe3hOjJwCJQX49sRc6cM0oIm&q=Entertainment')
            .then(res => res.json())
            .then((data1) => setReaction(data1.data));
    }, [])


    return (
        <div className="container">
            <div className="row">
                <h1 id="Entertainment">Entertainment GIFs</h1>
                <p>@ entertainment <span><i className="fas fa-check-circle"></i></span></p>
                <hr />
                {
                    reaction.map(item => <DisplayCard Poster={item.images.original.url} id={item.id} />)
                }

            </div>
        </div>
    )
}

export default Entertainment;
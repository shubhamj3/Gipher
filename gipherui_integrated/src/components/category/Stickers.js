import DisplayCard from "../card/DisplayCard";
import { useState, useEffect } from "react";
import "./Stickers.css";
const Stickers = () => {


    const [reaction, setReaction] = useState([]);
    useEffect(() => {
        fetch('https://api.giphy.com/v1/gifs/search?api_key=1KMPHCBIOe3hOjJwCJQX49sRc6cM0oIm&q=Stickers')
            .then(res => res.json())
            .then((data1) => setReaction(data1.data));
    }, [])


    return (
        <div className="container">
            <div className="row">
                <h1 id="Stickers">Stickers GIFs</h1>
                <p>@ stickers <span><i className="fas fa-check-circle"></i></span></p>
                <hr />
                {
                    reaction.map(item => <DisplayCard Poster={item.images.original.url} id={item.id} />)
                }

            </div>
        </div>
    )
}

export default Stickers;

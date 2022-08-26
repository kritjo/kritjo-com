import React, {useEffect} from "react";
const Home = (props) => {

    useEffect(() => {
        props.set_page_title("kritjo.com - Kristian Tjelta Johansen")
    })

    return (
        <div>
            <p>Hei!</p>
        </div>
    )
}

export default Home
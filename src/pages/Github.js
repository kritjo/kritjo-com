import React, {useState, useEffect} from "react";
import axios from "axios";
import Carousel from "../components/carousel";
import ErrorBoundary from "../components/errorBoundary"

const Github = (props) => {
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState([])

    useEffect(() => {
        props.set_page_title("")
    })

    useEffect(() => {
        const loadRepo = async () => {
            setLoading(true);

            const response = await axios.get(
                "https://api.github.com/users/kritjo/subscriptions"
            );

            //setCards(response.data)
            setLoading(false);
            return response
        }
        loadRepo().then(value => {
            setCards(value.data.map((ghitem) => {
                return {
                    title: ghitem.name,
                    description: ghitem.description,
                    url: ghitem.html_url
                }
            }));
        }).catch(reason => {
            console.log("Error" + reason);
        });
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{marginTop: '3rem'}}>
                    <ErrorBoundary>
                        <Carousel cards={cards} />
                    </ErrorBoundary>
                </div>
            )
            }
        </div>
    );
}

export default Github;
import React, {useState, useEffect} from "react";
import axios from "axios";
import GhCarousel from "../components/carousel";

const Github = () => {
    const [loading, setLoading] = useState(false);
    const [repos, setRepos] = useState([])

    useEffect(() => {
        const loadRepo = async () => {
            setLoading(true);

            const response = await axios.get(
                "https://api.github.com/users/kritjo/subscriptions"
            );

            setRepos(response.data)
            setLoading(false);
        }

        loadRepo();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <GhCarousel repos={repos} />
            )
            }
        </div>
    );
}

export default Github;
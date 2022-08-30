const axios = require('axios');

const CORS_PROXY = "https://cors-proxy-kritjo-com.herokuapp.com";

const MET_TOKEN = process.env.MET_TOKEN;


export default async function handler(request, response) {
    const res = await axios.get(
        CORS_PROXY + "/https://frost.met.no/locations/v0.jsonld",
        {
            headers: {
                "Origin": "https://kritjo.com",
            },
            auth: {
                username: MET_TOKEN,
                password: "",
            }
        },
    );
    response.status(res.status).json(res.data);
}
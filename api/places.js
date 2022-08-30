const axios = require('axios');

const MET_TOKEN = process.env.MET_TOKEN;

export default async function handler(request, response) {
    const res = await axios.get(
        "https://frost.met.no/locations/v0.jsonld",
        {
            auth: {
                username: MET_TOKEN,
                password: "",
            }
        },
    ).catch(reason => {
        if (reason.response) {
            throw new Error(`${reason.response.data.error.reason} (${reason.response.status}: ${reason.response.statusText})`);
        }
    });
    response.status(res.status).json(res.data);
}
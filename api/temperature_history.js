const axios = require('axios');

const MET_TOKEN = process.env.MET_TOKEN;

const getNearestSource = async (coordinates) => {
    const response = await axios.get(
        'https://frost.met.no/sources/v0.jsonld',
        {
            params: {
                geometry: `nearest(POINT(${coordinates[0]} ${coordinates[1]}))`,
                elements: "air_temperature",
            },
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
    return response.data.data[0].id;
}

const getWeatherHistory = async (source, year) => {
    const response = await axios.get(
        'https://frost.met.no/observations/v0.jsonld',
        {
            params: {
                sources: source,
                referencetime: `${year}-01-01/${year}-12-31`,
                elements: "air_temperature",
            },
            auth: {
                username: MET_TOKEN,
                password: "",
            }
        },
    ).catch(reason => {
        if (reason.response) {
            const error = {
                reason: reason.response.data.error.reason,
                status: reason.response.status,
                statusText: reason.response.statusText,
            }
            throw new Error(JSON.stringify(error));
        }
    });
    return response.data.data;
}

export default async function handler(request, response) {
    // Coordinates are in the format [longitude, latitude]
    const { coordinates, year, temperature, temperature_type } = request.query;

    let weatherHistory;
    try {
        const source = await getNearestSource(coordinates);
        weatherHistory = await getWeatherHistory(source, year);
    } catch (error) {
        const errorMessage = JSON.parse(error.message);
        response.status(errorMessage.status).json({
            reason: errorMessage.reason,
            statusText: errorMessage.statusText,
        });
        return;
    }

    // Count the number of days with a temperature over or under the given temperature,
    // based on the given temperature type.
    let current_day = 0;
    let counted_current_day = false;
    const days_temperature = weatherHistory.filter((hour) => {
        if (hour.referenceTime.split("T")[0] !== current_day) {
            current_day = hour.referenceTime.split("T")[0];
            counted_current_day = false;
        }
        let should_count = false;
        if (!counted_current_day) {
            if (temperature_type === '0') {
                if (hour.observations[0].value > temperature) {
                    counted_current_day = true;
                    should_count = true;
                }
            } else if (temperature_type === '1') {
                if (hour.observations[0].value < temperature) {
                    counted_current_day = true;
                    should_count = true
                }
            } else {
                throw new Error("Invalid temperature type");
            }
        }
        return should_count;
    }).length;

    response.status(200).json({
        days: days_temperature,
    });

}
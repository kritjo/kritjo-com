import {Alert, Button, Form, InputGroup, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import Select from "react-select";
import qs from "qs";


const WeatherHistoryState = {
    loading_places: 0,
    loaded_places: 1,
    loading_weather: 2,
    loaded_weather: 3,
    error: 4,
}

const TemperatureType = {
    over: 0,
    under: 1,
}

const TemperatureHistory = (props) => {
    const [state, setState] = useState(WeatherHistoryState.loading_places);
    const [places, setPlaces] = useState("");
    const [chosenPlace, setChosenPlace] = useState("");
    const [chosenYear, setChosenYear] = useState(0);
    const [chosenTemperature, setChosenTemperature] = useState(0);
    const [chosenTemperatureType, setChosenTemperatureType] = useState(0);
    const [daysHistoric, setDaysHistoric] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        props.set_page_title("Weather history");
    }, []);

    // Handle loading weather state
    useEffect(() => {
        switch(state) {
            case WeatherHistoryState.loading_places:
                if (places.length === 0) {
                    const loadPlaces = async () => {
                        setState(WeatherHistoryState.loading_places);
                        const response = await axios.get(
                            window.location.origin + "/api/places"
                        );
                        setState(WeatherHistoryState.loaded_places);
                        return response;
                    };
                    loadPlaces().then(value => {
                        setPlaces(value.data.data.map((place) => {
                            return {
                                "label": `${place.name} (${place.geometry.coordinates[1]}, ${place.geometry.coordinates[0]})`,
                                "value": place.geometry.coordinates,
                            };
                        }));
                    }).catch(reason => {
                        setError(reason.response.data.reason);
                        setState(WeatherHistoryState.error);
                    });
                }
                break;
            case WeatherHistoryState.loaded_places:
                break;
            case WeatherHistoryState.loading_weather:
                break;
            case WeatherHistoryState.loaded_weather:
                break;
        }
    }, [state]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setState(WeatherHistoryState.loading_weather);
        const loadWeather = async () => {
            return await axios.get(
                window.location.origin + "/api/temperature_history/", {
                    params: {
                        coordinates: chosenPlace.value,
                        year: chosenYear,
                        temperature: chosenTemperature,
                        temperature_type: chosenTemperatureType,
                    },
                    paramsSerializer: (params) => {
                        return qs.stringify(params, {arrayFormat: "repeat"});
                    }
                }
            )
        };
        loadWeather().then(value => {
            setDaysHistoric(value.data.days);
            setState(WeatherHistoryState.loaded_weather);
        }).catch(reason => {
            setError(reason.response.data.reason);
            setState(WeatherHistoryState.error);
        });
    }

    return (
        <div>{state === WeatherHistoryState.loading_places || state === WeatherHistoryState.loading_weather ? (
            <div>
                <p>Loading...</p>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                {state === WeatherHistoryState.loading_weather ? (
                    <p>This will take some time!</p>
                ): null}
            </div>
        ) : ( state === WeatherHistoryState.loaded_places ? (
            //Q: How can i get the value of the chosen place?
            // A: I can use the value of the chosen place in the onChange event of the select element.
            <Form onSubmit={handleSubmit}>
                <Select options={places} onChange={(value) => setChosenPlace(value)}
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                boxShadow: "none",
                                border: "none",
                            }),
                            menu: (provided, state) => ({
                                ...provided,
                                border: "none",
                                boxShadow: "none",
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: (state.isFocused) ? "lightgray" : "white",
                                color: "black",
                            }),

                        }}
                />
                <InputGroup className={"mb-3"}
                            style={{"marginTop": "1rem"}}>
                    <InputGroup.Text>Year</InputGroup.Text>
                    <Form.Control type={"number"} id={"year"} placeholder={"2021"} onChange={(value) => setChosenYear(value.target.valueAsNumber)}/>
                </InputGroup>
                <InputGroup className={"mb-3"}>
                    <Form.Select id={"search-type"} onChange={(value) => {
                        if (value.target.value === "Temperature over") {
                            setChosenTemperatureType(TemperatureType.over);
                        } else {
                            setChosenTemperatureType(TemperatureType.under);
                        }
                    }
                    }>
                        <option>Temperature over</option>
                        <option>Temperature under</option>
                    </Form.Select>
                    <Form.Control type={"number"} id={"search-type-arg"} onChange={(value) => setChosenTemperature(value.target.valueAsNumber)}/>
                    <InputGroup.Text>°C</InputGroup.Text>
                </InputGroup>
                <Button variant={"primary"} type={"submit"}>
                    Go
                </Button>
            </Form>
        ) : ( state === WeatherHistoryState.loaded_weather ? (
            <div>
                <Alert key={"success"} variant={"success"}>
                    There were <b>{daysHistoric}</b> days with temperatures {
                        chosenTemperatureType === TemperatureType.over ? "over" : "under"
                    } {chosenTemperature}°C in {chosenYear} for {chosenPlace.label}.
                </Alert>
                <Button variant={"primary"} onClick={() => setState(WeatherHistoryState.loading_places)}>
                    Reset
                </Button>
            </div>
        ) : (
          <div>
              <Alert key={"danger"} variant={"danger"}>
                  Error: {error}
              </Alert>
              <Button variant={"primary"} onClick={() => setState(WeatherHistoryState.loading_places)}>
                  Reset
              </Button>
          </div>
        )))
        }
        </div>
    );
};

export default TemperatureHistory;
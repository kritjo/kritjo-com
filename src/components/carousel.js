import React, { Component } from "react";
import ReactCardCarousel from "react-card-carousel";

class GhCarousel extends Component {

    static get CONTAINER_STYLE() {
        return {
            position: "relative",
            height: "50vh",
            width: "100%",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "middle"
        };
    }

    static get CARD_STYLE() {
        return {
            height: "200px",
            width: "400px",
            paddingTop: "10px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingBottom: "10px",
            textAlign: "center",
            background: "#52C0F5",
            color: "#FFF",
            fontFamily: "sans-serif",
            fontSize: "12px",
            textTransform: "uppercase",
            borderRadius: "10px",
            boxSizing: "border-box"
        };
    }

    render() {
        return (
            <div style={GhCarousel.CONTAINER_STYLE}>
                <ReactCardCarousel autoplay={false} autoplay_speed={5000}>
                    {this.props.repos.map ((repo) =>
                        <div style={GhCarousel.CARD_STYLE}>
                            <h2>{repo.name}</h2>
                            <p>{repo.description}</p>
                            <a href={repo.html_url}>{repo.html_url} <i className="fa fa-external-link"></i>
                            </a>
                        </div>
                    )}
                </ReactCardCarousel>
            </div>
        );
    }
}

export default GhCarousel;
import {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";


const Carousel = (props) => {
    const [index, setIndex] = useState(0)
    useEffect(() => {
        setIndex(0);
    }, []);

    const slideLeft = () => {
        if (index > 0) {
            setIndex(index - 1);
        } else {
            setIndex(props.cards.length - 1);
        }
    };

    const slideRight = () => {
        if (index < props.cards.length - 1) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    };
    return (
        <div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-sm">
                        <FontAwesomeIcon
                            onClick={slideLeft}
                            className="leftBtn"
                            icon={faChevronLeft}
                        />
                    </div>
                    <div className="col-sm">
                        <div className={'card text-white bg-primary mb-3'} style={{width: '36rem'}}>
                            <div className={'card-body'}>
                                <h5 className={'card-title'}>{props.cards[index].title}</h5>
                                <p className={'card-text'}>{props.cards[index].description}</p>
                                <a className={'card-link link-light'} href={props.cards[index].url}>{props.cards[index].url}</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <FontAwesomeIcon
                            onClick={slideRight}
                            className="rightBtn"
                            icon={faChevronRight}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
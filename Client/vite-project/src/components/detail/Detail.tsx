import React, { useEffect, version } from "react";
import { useParams } from "react-router-dom";
import React, { useEffect, version } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../Redux/Reducer/reducer";
import { getRoomById } from "../../Redux/Actions/actions";
import ReviewForm from "../reviewForm/reviewForm";
import "./detail.css";

const Detail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const currentRoom = useSelector((state: State) => state.currentRoom);

  useEffect(() => {
    if (id) {
      dispatch(getRoomById(id));
    }
  }, [dispatch, id]);

  return (
    <div className="detailContainer">
      {currentRoom && (
        <div className="detail">
          <h1>{currentRoom.name}</h1>

          <div className="leftColumn">
            <div className="aColumn">
              <h3>Address:</h3>
              <p>{currentRoom.address}</p>
              <h3>Details:</h3>
              <p>{currentRoom.details}</p>
              <h3>Services:</h3>
              <p>{currentRoom.services}</p>
              <h3>Contact:</h3>

              {currentRoom.contact && (
                <div>
                  <p>Phone: {currentRoom.contact.phone}</p>
                  <p>Email: {currentRoom.contact.mail}</p>
                </div>
              )}
            </div>
            <div className="bColumn">
            </div>
          </div>

          <div className="rightColumn">
            {/* Carrusel de imágenes (a futuro) */}
            {currentRoom.images && (
              <div className="imageCarousel">
                {currentRoom.images.map((image, index) => (
                  <img key={index} src={image} alt={`Image ${index}`} />
                ))}
              </div>
            )}
          </div>
          <div className="reviews">
            <h3>Reviews:</h3>
            {currentRoom.reviews && (
              <ul>
                {currentRoom.reviews.map((review, index) => (
                  <div key={index}>
                    <p>Description: {review.description}</p>
                    <p>Score: {review.score}</p>
                    <p>Date: {review.date}</p>
                  </div>
                ))}
              </ul>
            )}
          </div>
          <div className="revs">
            <ReviewForm />
          </div>
          <div className="reservation">
            <Link to="/reservation">
              <button>Pay for your reservation!</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;

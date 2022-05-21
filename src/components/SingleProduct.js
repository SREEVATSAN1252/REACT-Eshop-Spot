import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../pages/Rating";
import { Button } from "react-bootstrap";
import "./Product.css";
import { CartState } from "../Context/Context";
const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  console.log("caart===>",cart);
  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={prod.image} />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle>
            <span>₹ {prod.price}</span>
            {prod.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>3 days delivery</div>
            )}
            <Rating rating={prod.ratings} />
          </Card.Subtitle>
          {cart?.some((p) => p.id === prod.id) ? (
            <Button
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                });
              }}
              variant="danger"
            >
              Remove from cart
            </Button>
          ) : (
            <>
              {prod.inStock ? (
                <Button
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: prod
                    });
                  }}
                >
                  Add to cart
                </Button>
              ) : (
                <Button disabled>Out of Stock</Button>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;

import React from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "../Context/Context";
import Avatar from "@mui/material/Avatar";
import "./Product.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = () => {
    const history = useHistory();
    const handleButton=()=>{
      history.push("/cart")
    }
  const {
    state: { cart },
    dispatch,productDispatch
  } = CartState();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">Eshop Spot</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            className="m-auto"
            style={{ width: 500 }}
            placeholder="Search a Product"
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown alignRight style={{ width: 200 }}>
            <Dropdown.Toggle>
              <FaShoppingCart />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 370 }}>
              {!cart.length ? (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              ) : (
                <>
                  {cart?.map((p) => (
                    <div className="cartlist">
                      <Avatar src={p.image} />
                      <div className="cartinfo">
                        <span>{p.name}</span>
                        <span>₹ {p.price}</span>
                      </div>

                      <DeleteIcon
                        style={{cursor:"pointer",color:"red"}}
                        onClick={() => {
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: p,
                          });
                        }}
                      />
                      
                    </div>
                   
                  ))}
                  <Button onClick={handleButton} style={{width:"95%", margin:"0 8px"}}>Prceed to Checkout</Button>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

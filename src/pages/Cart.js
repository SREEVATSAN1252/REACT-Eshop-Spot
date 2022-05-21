import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { CartState } from '../Context/Context';
import Rating from "./Rating";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.css"
const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total,setTotal] = useState();
  useEffect(() => {
   setTotal(
     cart.reduce((acc,curr)=>acc+Number(curr.price)*curr.qty,0)


   )
  }, [cart])
  

  return (
    <div className='home'>
      <div className='ProductContainer'>
        <ListGroup>
          {cart?.map((prod)=>(
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image  src={prod.image} fluid rounded/>
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>₹ {prod.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.ratings}/>
                </Col>
                <Col md={2}>
                  <Form.Control as="select" value={prod.qty}
                  onChange={(e)=>{
                    dispatch({
                      type:"CHANGE_CART_QTY",
                      payload:{
                        id:prod.id,
                        qty:e.target.value
                      }
                    })
                  }}>

                    {[...Array(prod.inStock).keys()].map((x)=>(
                      <option key={x+1}>{x+1}</option>
                    ))}

                  </Form.Control>
                </Col>
                <Col md={2}>
                <DeleteIcon
                        style={{cursor:"pointer",color:"red"}}
                        onClick={() => {
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          });
                        }}
                      />
                </Col>
              </Row>

            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className='filters'>
        <span className='tittle'>Subtotal ({cart.length}) items</span>
        <span style={{fontWeight:700,fontSize:20}}>Total: ₹ {total}</span>
        <Button type="button" disabled={cart.length===0}>Proceed to Checkout</Button>
      </div>

    
    
    </div>
  )
}

export default Cart
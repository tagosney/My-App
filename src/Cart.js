import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import './Cart.css'


function Cart({ initialItems }) {
    const initialState = JSON.parse(window.localStorage.getItem("items"));
    const [items, setItems] = useState(initialState || initialItems);

    useEffect(()  => {
        // console.log("Hello from your effect")
        window.localStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    const updateQty = (id, newQty) => {
        const newItems = items.map(item =>{
            if(item.id === id) {
                return { ...item, qty: newQty};
            }
            return item;
        });
        setItems(newItems);
    }
    
    const grandTotal = items.reduce((total, item) => (
        total + item.qty * item.price
    ), 0 ).toFixed(2);
return (
    <div className="Cart">
        <h1 className="Cart-title">Shopping Cart</h1>
        <div className="Cart-items">
            {items.map(item => (
                <CartItem key={item.id} updateQty={updateQty} {...item} />
                ))}

        </div>
            <h2>Grand Total: ${grandTotal}</h2>
    </div>
    )
}

export default Cart;
import "./css/UserCartItemsContent.css";
import UserCartWrapper from "./cart-wrapper";
import { useNavigate } from "react-router-dom";

function UserCartItemsContent({ cartItems, setIsCartOpen }) {
  const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((sum, currentItem) => {
          return sum + currentItem.price * currentItem.quantity;
        }, 0)
      : 0;

  return (
    <div className="cart-items-content">
      {/* Cart items container */}
      <div className="cart-scroll-view">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartWrapper key={item.productId} cartItems={item} />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Cart footer */}
      <div className="cart-items-footer">
        <div className="subtotal">
          <h3>Subtotal</h3>
          <span>${totalCartAmount.toFixed(2)}</span>{" "}
        </div>
        <div className="totalPrice">
          <h3>Total</h3>
          <span>${totalCartAmount.toFixed(2)}</span>
        </div>
        <button
          onClick={() => {
            navigate("/shop/checkout/cart");
            setIsCartOpen(false);
          }}
          className="checkout-button"
        >
          Checkout
        </button>
        <div className="view-cart">
          <p>View cart</p>
        </div>
      </div>
    </div>
  );
}

export default UserCartItemsContent;

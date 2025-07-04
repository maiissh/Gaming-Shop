<div className="page-content">
  <h1>Shopping Cart 🛒</h1>
  {cartItems.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    <div>
      {cartItems.map(item => (
        <div className="cart-item" key={item._id}>
          <img src={item.image} alt={item.name} />
          <div>
            <h3>{item.name}</h3>
            <p>Qty: {item.quantity}</p>
            <p>Price: {item.price} ₪</p>
          </div>
        </div>
      ))}
      <hr />
      <h2>Total: {total} ₪</h2>
    </div>
  )}
</div>

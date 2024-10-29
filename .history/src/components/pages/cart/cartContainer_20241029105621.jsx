import { Link } from "react-router-dom";

const CartContainer = () => {
  return (
    <div>
      <h1>Tus productos añadidos</h1>
      <Link to="/checkout" style={{ color: "black" }}>
        Finalizar compra
      </Link>
    </div>
  );
};

export default CartContainer;

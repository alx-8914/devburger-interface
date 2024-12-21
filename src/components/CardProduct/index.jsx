import PropTypes from "prop-types";

import { useCart } from "../../hooks/CartContext";
import { CardImage, Container } from "./styles";
import { CartButton } from "../CartButton";

export function CardProduct({ product }) {
  const { putProductInCart } = useCart();
  return (
    <Container>
      <CardImage
        $imageurl={`http://localhost:3001/product-file/${product.path}`}
      />
      <div>
        <p>{product.name}</p>
        <strong>{product.currencyValue}</strong>
      </div>
      <CartButton onClick={ () => putProductInCart(product)}></CartButton>
    </Container>
  );
}

CardProduct.propTypes = {
  product: PropTypes.object,
};

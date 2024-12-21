import TrashIcon from "../../assets/trash.svg";
import { useCart } from "../../hooks/CartContext";
import { formatPrice } from "../../utils/formatPrice";
import { Table } from "../index";
import {
  ButtonGroup,
  EmptyCart,
  ProductImage,
  ProductToatalPrice,
  TrashImage
} from "./styles";

export function CartItems() {
  const {
    cartProducts,
    decreaseProduct,
    increaseProduct,
    deleteProduct,
  } = useCart();

  return (
    <Table.Root>
      <Table.Header>
        <Table.Tr>
          <Table.Th></Table.Th>
          <Table.Th>Itens</Table.Th>
          <Table.Th>Preço</Table.Th>
          <Table.Th>Quantidade</Table.Th>
          <Table.Th>Total</Table.Th>
          <Table.Th>Remover</Table.Th>
        </Table.Tr>
      </Table.Header>
      <Table.Body>
        {cartProducts?.length ? (
          cartProducts.map((product) => (
            <Table.Tr key={product.id}>
              <Table.Td>
                <ProductImage
                  src={product.url.replace("https://", "http://")}
                />
              </Table.Td>
              <Table.Td>{product.name}</Table.Td>
              <Table.Td>{product.currencyValue}</Table.Td>
              <Table.Td>
                <ButtonGroup>
                  <button onClick={() => decreaseProduct(product.id)}>-</button>
                  {product.quantity}
                  <button onClick={() => increaseProduct(product.id)}>+</button>
                </ButtonGroup>
              </Table.Td>
              <Table.Td>
                <ProductToatalPrice>
                  {formatPrice(product.quantity * product.price)}
                </ProductToatalPrice>
              </Table.Td>
              <Table.Td>
                <TrashImage
                  src={TrashIcon}
                  alt="lixeira"
                  onClick={() => deleteProduct(product.id)}
                />
              </Table.Td>
            </Table.Tr>
          ))
        ) : (
          <EmptyCart>Carrinho vazio</EmptyCart>
        )}
      </Table.Body>
    </Table.Root>
  );
}

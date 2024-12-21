import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import { Container, ProductImage, EditButton } from "./styles";
import { CheckCircle, Pencil, XCircle } from "@phosphor-icons/react";

import { formatPrice } from '../../../utils/formatPrice'

export function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get("/products");

      console.log(data);

      setProducts(data);
    }
    loadProducts();
  }, []);

  function isOffer(offer) {
    if(offer){
      return <CheckCircle color="#61a120" size='28'/>
    }else{
      return <XCircle color="#ff3205" size='28'/>
    }
  }

  function editProduct(product){
    navigate('/admin/editar-produto', { state: { product} });
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center">Produto em Oferta</TableCell>
              <TableCell align="center">Imagem do Produto</TableCell>
              <TableCell align="center">Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="center">{formatPrice(product.price)}</TableCell>
                <TableCell align="center">{isOffer(product.offer)}</TableCell>
                <TableCell align="center">
                  <ProductImage src={product.url} />
                </TableCell>
                <TableCell align="center">
                  <EditButton onClick={() => editProduct(product)}>
                    <Pencil />
                  </EditButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { formatPrice } from "../../utils/formatPrice";
import { CardProduct } from "../../components/CardProduct";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Container,
  Banner,
  CategoryMenu,
  ProductsContainer,
  CategoryButton,
  BackButton,
} from "./styles";

export function Menu() {
  console.log("Componente Menu montado");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate();
  const { search } = useLocation(); 
  const queryParams = new URLSearchParams(search);

  const [activeCategory, setActiveCategory] = useState(() => {
    const categoryId = +queryParams.get("categoria");

    if (categoryId) {
      return categoryId;
    }
    return 0;
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get("/categories");
        const newCategories = [{ id: 0, name: "Todas" }, ...data];
        setCategories(newCategories);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        setCategories([{ id: 0, name: "Todas" }]); // Garantir que haja uma categoria padrão
      }
    }

    async function loadProducts() {
      try {
        const { data } = await api.get("/products");
        const newProducts = data.map((product) => ({
          currencyValue: formatPrice(product.price),
          ...product,
        }));
        setProducts(newProducts);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setProducts([]); // Garantir que o array de produtos não seja indefinido
      }
    }

    loadCategories();
    loadProducts();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(search); // Recria os parâmetros a cada mudança
    const categoryId = parseInt(queryParams.get("categoria"), 10); // Converte para número
    setActiveCategory(categoryId || 0); // Atualiza a categoria ativa
  }, [search]);

  // Filtra os produtos com base na categoria ativa
  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProducts(products); // Mostrar todos os produtos se nenhuma categoria for selecionada
    } else {
      const newFilteredProducts = products.filter(
        (product) => product.category_id === activeCategory
      );
      setFilteredProducts(newFilteredProducts);
    }
  }, [products, activeCategory]);

  return (
    <Container>
      <Banner>
        <h1>
          O MELHOR
          <br />
          HAMBURGER
          <br />
          ESTÁ AQUI!
          <span>Esse cardápio está irresistível!</span>
        </h1>
      </Banner>
      <CategoryMenu>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            $isActiveCategory={category.id === activeCategory}
            onClick={() => {
              // Navegar para a nova categoria
              navigate(
                {
                  pathname: "/cardapio",
                  search: `?categoria=${category.id}`,
                },
              );

              // Atualizar estado interno da categoria
              setActiveCategory(category.id);
            }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryMenu>
      <ProductsContainer>
        {filteredProducts.map((product) => (
          <CardProduct product={product} key={product.id} />
        ))}
      </ProductsContainer>
      <BackButton onClick={() => navigate("/")}>Voltar</BackButton>
    </Container>
  );
}

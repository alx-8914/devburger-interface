import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { api } from "../../services/api";
import { CategoryButton, Container, ContainerItems, Title } from "./styles";
import { useNavigate } from "react-router-dom";

export default function CategoriesCarousel() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get("/categories");
        console.log("Categorias carregadas:", data);
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    }
    loadCategories();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1280 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1280, min: 690 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 690, min: 0 },
      items: 2,
    },
  };

  return (
    <Container>
      <Title>Categorias</Title>
      <Carousel
        responsive={responsive}
        infinite={true}
        partialVisbile={false}
        itemClass="carousel-item"
      >
        {categories.length > 0 ? (
          categories.map((category) => (
            <ContainerItems
              key={category.id}
              $imageurl={`http://localhost:3001/category-file/${category.path}`}
            >
              <CategoryButton
              key={category.id}
                onClick={() => {
                  if (!category.id) {
                    console.error("Erro: ID da categoria está indefinido!");
                  } else {
                    console.log("Categoria ID:", category.id);
                    navigate({
                      pathname: "/cardapio",
                      search: `?categoria=${category.id}`,
                    });
                    console.log("Navegação realizada para:", `/cardapio?categoria=${category.id}`);
                  }
                }}
              >
                {category.name}
              </CategoryButton>
            </ContainerItems>
          ))
        ) : (
          <p>Carregando categorias...</p>
        )}
      </Carousel>
    </Container>
  );
}

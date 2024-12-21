import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { api } from "../../services/api";
import { CategoryButton, Container, ContainerItems, Title } from "./styles";
import { useNavigate } from "react-router-dom";

export function CategoriesCarousel() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get("/categories");

      console.log(data);

      setCategories(data);
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
        {categories.map((category) => {
          //console.log(category.url); // Verificar a URL aqui
          return (
            <ContainerItems
              key={category.id}
              $imageurl={`http://localhost:3001/category-file/${category.path}`}
            >
              <CategoryButton
                onClick={() => {
                  console.log("Categoria clicada:", category.id); // Log para conferir a categoria
                  navigate({
                    pathname: "/cardapio",
                    search: `?categoria=${category.id}`,
                  });
                  console.log("Navegação iniciada");
                }}
              >
                {category.name}
              </CategoryButton>
            </ContainerItems>
          );
        })}
      </Carousel>
    </Container>
  );
}

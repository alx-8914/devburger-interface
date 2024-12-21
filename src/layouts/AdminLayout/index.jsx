import { Outlet, Navigate } from "react-router-dom";
import { SideNavAdmin } from "../../components";
import { Container } from "./styles";
import { Footer } from "../../components";

export function AdminLayout() {
  const userData = JSON.parse(localStorage.getItem("devburger:userData"));
  const isAdmin = userData?.admin || false;

  return isAdmin ? (
    <Container>
      <SideNavAdmin />
      <main>
        <section>
          <Outlet />
        </section>
      </main>
      <Footer />
    </Container>
  ) : (
    <Navigate to="/login" />
  );
}

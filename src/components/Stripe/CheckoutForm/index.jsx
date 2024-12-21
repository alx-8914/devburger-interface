import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Stripe/CheckoutForm/";
import "./styles.css";
import { useCart } from "../../../hooks/CartContext";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

export default function CheckoutForm() {
  const { cartProducts, clearCart } = useCart();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  // Corrigindo o uso do useLocation como função
  const location = useLocation();
  const dpmCheckerLink = location.state?.dpmCheckerLink; // Verifica se dpmCheckerLink existe

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe ou Elements com falha, tente novamente");
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    // Corrigindo a condição para lidar com sucesso e erro separadamente
    if (error) {
      setMessage(error.message);
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        const products = cartProducts.map((product) => {
          return { 
            id: product.id, 
            quantity: product.quantity, 
            price: product.price,
          };
        });

        const { status } = await api.post(
          "/orders",
          { products },
          {
            validateStatus: () => true,
          }
        );
        
        if (status === 200 || status === 201) {
          setTimeout(() => {
            navigate(`/Complete?payment_intent_client_secret=${paymentIntent.client_secret}`,
            );
          }, 3000);
          clearCart();
  
          toast.success("Pedido Realizado com Sucesso!😋🍔🥤");
        } else if (status === 409) {
          toast.error("Falha ao Realizar seu Pedido");
        } else {
          throw new Error();
        }
      } catch (error) {
        toast.error("😭 Falha no Sistema! Tente novamente.");
      }
    } else {
      navigate(`/Complete?payment_intent_client_secret=${paymentIntent.client_secret}`,      
      );
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="container">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit" className="button">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pagar Agora"
            )}
          </span>
        </button>
        {/* Exibe mensagens de erro ou sucesso */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      {/* [DEV]: Exibição de anotações de métodos de pagamento dinâmicos e verificador de integração */}
      <div id="dpm-annotation">
        <p>
          Os métodos de pagamento são disponibilizados de acordo com a sua região.&nbsp;
          {dpmCheckerLink && (
            <a
              href={dpmCheckerLink}
              target="_blank"
              rel="noopener noreferrer"
              id="dpm-integration-checker"
            >
              Ver métodos de pagamento
            </a>
          )}
        </p>
      </div>
    </div>
  );
}

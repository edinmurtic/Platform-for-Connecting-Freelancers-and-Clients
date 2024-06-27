import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Success.css"
const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <div className="transaction-success">
      <div className="checkmark-circle">
        <svg width="64" height="64" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="green" strokeWidth="2" fill="none" />
          <path d="M6 12l4 4 8-8" stroke="green" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <p>Vaša transakcija je uspješno završena. Narudžba je dodana na listu aktivnih narudžbi!</p>
      <p>Ubrzo ćete biti preusmjereni na stranicu s vašim naružbama!</p>

    </div>
  );
};

export default Success;
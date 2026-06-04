import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useState } from 'react'

const CheckOutPage = () => {
  const [showpayment, setshowpayment] = useState(false);
  const location = useLocation()
  const navigate = useNavigate();

  const {
    flight,
    selectedSeats
  } = location.state;
  // const flight={
  //   id:1,
  //   flightNumber:"A12",
  //   source:"DEL",
  //   destination:"BOM",
  //   price:1
  // }
  // const selectedSeats=["A1","A2"];

  const loadRazorpayscript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';

      script.onload = () => {
        resolve(true);
      }
      script.onerror = () => {
        resolve(false);
      }
      document.body.appendChild(script);
    })
  }


  const handlepayment = async () => {
    const loaded = await loadRazorpayscript();
    if (!loaded) {
      alert("Razorpay SDK failed to load")
      return;
    }
    try {
      const orderresponse = await api.post("/payments/create-order", {
        amount: flight.price * selectedSeats.length,
        flightId: flight.id,
        seats: selectedSeats

      })
      const order = orderresponse.data;
      console.log(import.meta.env.VITE_RAZORPAY_KEY_ID)
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "SkyBook Airlines",
        description: "Flight Booking",
        order_id: order.order_id,
        handler: function (response: any) {
          console.log("Handler fired!!!")
          api.post("/payments/verify-payments", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            flightId: flight.id,
            seats: selectedSeats,
          })
            .then((verifyresp) => {
              console.log("verifyres ka data:", verifyresp.data);
              const bookingData = {
                flight,
                seats: selectedSeats,
                paymentId: response.razorpay_payment_id,
              };
              const existing = JSON.parse(localStorage.getItem("booking") || "[]");
              localStorage.setItem("booking", JSON.stringify([...existing, bookingData]));
              alert("Payment Successful!");
              navigate("/mybookings");

            })
            .catch((error) => {
              console.log("Verify error:", error);
              alert("Verification failed: " + error.message);
            });
        },
        theme: {
          color: "#2563eb",
        },
      };
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on('payment.failed', function (response: any) {
        console.log("Full failure response:", JSON.stringify(response));
        alert(`Payment failed: ${response.error.description}`); // add alert so you actually see it
      });
      paymentObject.open()
    } catch (error) {
      console.log(error);
    }
  }








  // const flight={
  //     flightNumber:1,
  //     source:"DEL",
  //     destination:"BOM",
  //     price:5000
  // }
  // const selectedSeats=["A1","A2","B1"]
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Checkout</h1>
      <div className='border rounded-2xl p-6 shadow-md'>
        <h2 className='text-2xl font-bold'>{flight.flightNumber}</h2>
        <p className='mt-2'>{flight.source}→{flight.destination}</p>
        <p className='mt-2'>Seats:{" "}{selectedSeats.join(", ")}</p>
        <p className='mt-2 text-xl font-bold text-green-600'>Total:{" "}₹{flight.price * selectedSeats.length}</p>
      </div>
      <button
        onClick={() => setshowpayment(true)}
        className='hover:-translate-y-1 transition mt-6 text-white bg-green-600 hover:bg-green-700 px-6 py-4 rounded-xl'>Proceed to Payment</button>
      {showpayment && (
        <div className='
              fixed
              inset-0
              bg-black/50
              flex
              items-center
              justify-center
              '>
          <div className='bg-white p-8 rounded-2xl shadow-2xl w-[400px]'>
            <h2 className='text-2xl font-bold mb-4'>Payment</h2>
            <p className='mb-6'>
              Total Amount:{" "}₹ {flight.price * selectedSeats.length}
            </p>
            <button onClick={handlepayment}
              className='
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  py-3
                  rounded-xl
                  '
            >Pay Now
            </button>
            <button
              className='
                  w-full
                  mt-3
                  border
                  py-3
                  rounded-xl'
              onClick={() => setshowpayment(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckOutPage
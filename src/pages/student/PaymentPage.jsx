import React, { useState } from "react";
import countries from "world-countries";
import {
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaGooglePay,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const PaymentPage = (lesson) => {
  const [country, setCountry] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
 
  
  return (
    <>
      <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row gap-6">
        {/*  Billing + Payment */}
        <div className="flex-1 space-y-6">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl text-black font-bold mb-4">CheckOut</h2>
            <h3 className="text-lg text-black font-semibold mb-2">
              Billing address
            </h3>

            <label className="block text-gray-700 mb-2">Country</label>
            <select
              className="w-full border text-black rounded-md p-2"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">-- Select Country --</option>
              {countries.map((c) => (
                <option key={c.cca2} value={c.name.common}>
                  {c.name.common}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg text-black font-semibold mb-4">
              Payment Method
            </h3>

            {/* Payment Method Options */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setSelectedMethod("card")}
                className={`flex items-center justify-center p-4 border rounded-lg shadow-sm hover:shadow-md transition ${
                  selectedMethod === "card"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                <FaCcVisa className="text-3xl text-blue-600 hover: cursor-pointer" />
                <FaCcMastercard className="text-3xl text-red-500 ml-2 hover: cursor-pointer" />
              </button>

              <button
                onClick={() => setSelectedMethod("paypal")}
                className={`flex items-center justify-center p-4 border rounded-lg shadow-sm hover:shadow-md transition ${
                  selectedMethod === "paypal"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                <FaPaypal className="text-3xl text-blue-700 hover: cursor-pointer" />
              </button>

              <button
                onClick={() => setSelectedMethod("google")}
                className={`flex items-center justify-center p-4 border rounded-lg shadow-sm hover:shadow-md transition ${
                  selectedMethod === "google"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                <FaGooglePay className="text-3xl text-green-600 hover: cursor-pointer" />
              </button>
            </div>

            {/* Form */}
            {selectedMethod === "card" && (
              <div className="space-y-4 text-black">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full border rounded-md p-2 text-gray-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full border rounded-md p-2"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Name on Card"
                  className="w-full border rounded-md p-2"
                />
              </div>
            )}

            {selectedMethod === "paypal" && (
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="PayPal Email"
                  className="w-full border rounded-md p-2 text-black"
                />
              </div>
            )}

            {selectedMethod === "google" && (
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Google Account Email"
                  className="w-full border rounded-md p-2 text-black"
                />
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-80 p-6 bg-gray-50 shadow-lg rounded-lg h-fit">
          <h3 className="text-xl font-semibold mb-4 text-black">
            Order Summary
          </h3>

          <div className="flex justify-between mb-2 text-black">
            <span className="text-black">Lesson Course </span>
            <span>$45</span>
          </div>

          <hr className="my-3 text-gray-400" />

          <div className="flex justify-between font-bold text-black">
            <span>Total (1 Course) : </span>
            <span>$45</span>
          </div>
          <div>
            <p className="text-gray-500 text-xs mt-5">
              By completing your purchase, you agree to{" "}
              <Link className="text-red-500">these Terms of Use.</Link>
            </p>
            <p className="text-black mt-5 font-bold">
              30-Day Money-Back Guarantee
            </p>
            <p className="text-gray-500 mt-5 text-xs">
              {" "}
              Not satisfied? Get a full refund within 30 days. Simple and
              straightforward!{" "}
            </p>
          </div>

          <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;

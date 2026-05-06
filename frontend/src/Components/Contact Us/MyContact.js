import React, { useState } from "react";
import contactIMG from "../../assests/img/video.jpg";
import Slide from 'react-reveal/Slide';

const MyContact = () => {
  const [reservation, setReservation] = useState({
    name: "",
    email: "",
    mobile: "",
    table_type: "",
    children: 0,
    date_time: "",
    special_request: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReservation = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.message || "Erreur lors de la réservation");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion");
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="container lg:max-w-[1324px] px-5 py-2 lg:py-14 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 overflow-hidden flex items-end justify-start">
            <img className="object-cover h-full w-fit" src={contactIMG} alt="Contact" />
          </div>
          <div className="lg:w-2/3 md:w-1/2 bg-black p-3 lg:p-10 flex flex-col md:ml-auto w-full md:py-8 md:mt-0">
            <Slide bottom duration={1000}>
              <p className="title-font text-orange-400 sec-heading font-medium text-3xl mb-2">Reservation</p>
              <h1 className="font-nunito hero-text font-black text-white text-2xl mb-3 lg:text-5xl">
                Book A Table Online
              </h1>

              {/* Name Field */}
              <div className="relative mb-4">
                <input
                  type="text"
                  name="name"
                  value={reservation.name}
                  onChange={handleChange}
                  placeholder="Enter Name..."
                  className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              {/* Email Field */}
              <div className="relative mb-4">
                <input
                  type="email"
                  name="email"
                  value={reservation.email}
                  onChange={handleChange}
                  placeholder="Enter Email..."
                  className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              {/* Mobile Field */}
              <div className="relative mb-4">
                <input
                  type="tel"
                  name="mobile"
                  value={reservation.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number..."
                  className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              {/* Table Type Selection */}
              <div className="relative mb-4">
                <select
                  name="table_type"
                  value={reservation.table_type}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option value="">Select Table Type</option>
                  <option value="1">Table for 1</option>
                  <option value="2">Table for 2</option>
                  <option value="3">Table for 3</option>
                  <option value="4">Table for 4</option>
                  <option value="5">Table for 5</option>
                  <option value="6">Table for 6</option>
                  <option value="7">Table for 7</option>
                  <option value="8">Table for 8</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Number of Children Field */}
              <div className="relative mb-4">
                <input
                  type="number"
                  name="children"
                  value={reservation.children}
                  onChange={handleChange}
                  placeholder="Number of Children"
                  className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  min="0"
                />
              </div>

              {/* Booking Time (Date & Time) */}
              <div className="relative mb-4">
                <input
                  type="datetime-local"
                  name="date_time"
                  value={reservation.date_time}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              {/* Special Request Field */}
              <div className="relative mb-4">
                <textarea
                  name="special_request"
                  value={reservation.special_request}
                  onChange={handleChange}
                  placeholder="Special request..."
                  className="w-full bg-white rounded border border-gray-300 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>

              {/* Book Now Button */}
              <button
                className="text-white font-bold bg-orange-400 border-0 py-2 mb-2 lg:text-lg"
                onClick={handleReservation}
              >
                BOOK NOW
              </button>
            </Slide>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyContact;

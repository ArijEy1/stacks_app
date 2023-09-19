import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './StacksComponents.css';
import Navbar from '../Navbar';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Popup from './Popup'; // Import your Popup component
import './Popup.css'; // Import your CSS file for styling

const StacksComponent = () => {
  const [stacks, setStacks] = useState([]);
  const [selectedStack, setSelectedStack] = useState(null); // State to store the selected stack
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false); // State for the popup visibility

  useEffect(() => {
    axios
      .get('https://zenml-frontend-challenge-backend.fly.dev/stacks')
      .then((response) => {
        const stackData = response.data;

        // Calculate the totalLength for each stack
        const stacksWithTotalLength = stackData.map((stackItem) => {
          let totalLength = 0;

          for (const key in stackItem.components) {
            if (stackItem.components.hasOwnProperty(key)) {
              totalLength += stackItem.components[key].length;
            }
          }

          return { ...stackItem, totalLength };
        });

        // Set the stacks state with the data including totalLength
        setStacks(stacksWithTotalLength);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleStackClick = (stack) => {
    setSelectedStack(stack);
    togglePopup(); // Open the modal when a stack is clicked
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div>
      <Navbar />
      <h1>List of Stacks</h1>
      <div className="MySwiper">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {stacks.map((stack) => (
            <SwiperSlide key={stack.id}>
              <div
                className="stack-card"
                onClick={() => handleStackClick(stack)} // Handle stack click
              >
                <div className="stack-info">
                  <h3>{stack.name}</h3>
                  <p>Total stack components: {stack.totalLength}</p>
                  <p>{stack.is_shared}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Conditionally render the Popup based on the state */}
      {isPopupOpen && selectedStack && (
  <Popup
    stack={selectedStack}
    componentNames={Object.keys(selectedStack.components)} // Pass the component names
    onClose={togglePopup}
  />
)}
    </div>
  );
};

export default StacksComponent;

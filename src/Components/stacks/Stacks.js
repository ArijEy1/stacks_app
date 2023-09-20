import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Stacks.css'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import axios from 'axios';
import Popup from '../popup/Popup';
import Navbar from '../navbar/Navbar';
import Alert from '@mui/material/Alert';
import { ApiUrls } from '../../config/ApiUrls';
import Footer from '../footer/Footer';
import { GridLoader } from 'react-spinners';

const Stacks = () => {
  const [stacks, setStacks] = useState([]);
  const [selectedStack, setSelectedStack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    axios
      .get(ApiUrls.FetchStacks)
      .then((response) => {
        const stackData = response.data;
        const stacksWithTotalLength = stackData.map((stackItem) => {
          let totalLength = 0;

          for (const key in stackItem.components) {
            if (stackItem.components.hasOwnProperty(key)) {
              totalLength += stackItem.components[key].length;
            }
          }

          return { ...stackItem, totalLength };
        });

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
    togglePopup();
  };
  if (loading) {
    return (
      <div className="loader">
<GridLoader
                  color="#7c3679"
                  loading={loading}
                  size={30}
                  style={{
                    marginTop: '15vh',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'block',
                  }}
                />      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <Alert severity="error">Error: {error.message}</Alert>
      </div>
    );
  }

  return (
    <><div>
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
          autoplay={{ delay: 3000 }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {stacks.map((stack) => (
            <SwiperSlide key={stack.id}>
              <div
                className="stack-card"
                onClick={() => handleStackClick(stack)}
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

      {isPopupOpen && selectedStack && (
        <Popup
          stack={selectedStack}
          componentNames={Object.keys(selectedStack.components)}
          onClose={togglePopup} />
      )}
    </div>
    <Footer /></>
  );
};

export default Stacks;

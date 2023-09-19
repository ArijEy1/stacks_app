import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './App.css';
import Navbar from './Navbar';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import axios from 'axios';
import { Button } from '@mui/material';

const App = () => {
  const [stacks, setStacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://zenml-frontend-challenge-backend.fly.dev/stacks')
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
              <div className="stack-card">
                <div className='stack-info'>
                <h3>{stack.name}</h3>
                <p>Total stack components: {stack.totalLength}</p>
                <p>{stack.is_shared}</p>
                <Button style={{ textTransform: 'lowercase',marginTop:'50%' }}>View components</Button>
                <ul className="stack-component">
                  {Array.isArray(stack.components) ? (
                    stack.components.map((componentId) => (
                      <li key={componentId}>{componentId}</li>
                    ))
                  ) : (
                    <></>
                  )}
                </ul>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default App;

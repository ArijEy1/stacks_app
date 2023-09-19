// src/components/StackList.js

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './App.css';
import Navbar from './Navbar';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';

const App = () => {
  const [stacks, setStacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data (replace with your actual API call)
    setTimeout(() => {
      const data = [
        {
          id: '1',
          name: 'Stack 1',
          description: 'This is Stack 1',
          components: ['1', '2'],
        },
        {
          id: '2',
          name: 'Stack 2',
          description: 'This is Stack 2',
          components: ['3'],
        },
        {
          id: '3',
          name: 'Stack 2',
          description: 'This is Stack 2',
          components: ['3'],
        },
        {
          id: '4',
          name: 'Stack 2',
          description: 'This is Stack 2',
          components: ['3'],
        },
        {
          id: '5',
          name: 'Stack 2',
          description: 'This is Stack 2',
          components: ['3'],
        },
        {
          id: '6',
          name: 'Stack 2',
          description: 'This is Stack 2',
          components: ['3'],
        },
      ];
      setStacks(data);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div>
    <Navbar/>
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
        <h2>{stack.name}</h2>
        <p>{stack.description}</p>
        <ul className="stack-component">
          {stack.components.map((componentId) => (
            <li key={componentId}>{componentId}</li>
          ))}
        </ul>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
       
      </div>

    </div>

  );
};

export default App;

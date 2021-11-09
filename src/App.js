import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import Card from "./components/Card";

import "./App.css";
SwiperCore.use([Navigation]);

const App = () => {
  const [data, setData] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    async function fetch() {
      const res = await axios.get(
        "https://tvapiv2.voot.com/wsv_1_0/episode/list.json?tvSeriesId=361251&from=1&to=20&sortId=mostPopular"
      );
      setData(res.data);
      console.log(res);
    }
    fetch();
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <h2>Hot Picks Of The Week</h2>
      <Swiper
        slidesPerView={5}
        modules={[Navigation]}
        spaceBetween={5}
        breakpoints={{
          // when window width is >= 375px
          375: {
            width: 375,
            slidesPerView: 1,
          },
          // when window width is >= 640px
          640: {
            width: 640,
            slidesPerView: 2,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 3,
          },
          900: {
            width: 900,
            slidesPerView: 3,
          },
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {data?.assets?.map((x) => (
          <>
            <SwiperSlide>
              <Card data={x} />
            </SwiperSlide>
          </>
        ))}
        <div className="btns">
          <div className="btn" ref={prevRef}>
            Prev
          </div>
          <div className="btn" ref={nextRef}>
            Next
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default App;

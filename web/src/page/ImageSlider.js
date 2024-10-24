import React, { useState, useEffect, useRef } from 'react';
import './ImageSlider.css'; // 스타일링을 위한 CSS 파일

const images = [
  '/img/door.png',
  '/img/khuonbird.png',
  '/img/numbsball.png',
  '/img/tetris.png'
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
    };

    startInterval();

    return () => clearInterval(intervalRef.current); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // 기존 인터벌 클리어
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 인터벌 재설정
  };

  return (
    <div className='sliderBackground'>
      <div className="slider">
        <div className="slides-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <div
              key={index}
              className="slide"
              style={{ backgroundImage: `url(${image})` }}
            >
            </div>
          ))}
          
        </div>
        <div className="dots-container">
          {images.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
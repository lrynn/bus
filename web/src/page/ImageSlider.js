import React, { useState, useEffect, useRef } from 'react';
import './ImageSlider.css'; // 스타일링을 위한 CSS 파일

const images = [
  '/img/thumbnail_test0.jpg', 
  '/img/thumbnail_test1.jpg',
  '/img/thumbnail_test2.jpg',
  '/img/thumbnail_test3.jpg',
  '/img/KakaoTalk_20240820_034704755.jpg'
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
  );
};

export default ImageSlider;

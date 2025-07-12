import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductSlider.css";

const ProductSlider = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="product-slider-container">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id}>
            <div className="product-card-landing">
              <img
                src={product.image}
                alt={product.title}
                className="product-card-image"
              />
              <h3 className="product-card-title">{product.title}</h3>
              <p className="product-card-description">{product.description}</p>
              <button className="product-card-button">View Details</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;

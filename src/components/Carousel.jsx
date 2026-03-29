import Slider from "react-slick";
import "../css/carousel.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false // Recommended so text doesn't jitter
  };

  const slides = [
    { src: "/static/images/third.jpg.jfif", title: "Latest Gadgets", sub: "Explore the new frontier of tech." },
    { src: "/static/images/first.jpg.webp", title: "Smart Living", sub: "Upgrade your home with AI electronics." },
    { src: "/static/images/second.jpg.jfif", title: "Exclusive Offers", sub: "Save up to 20% on flagship models." }
  ];

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide-item">
            <img src={slide.src} alt={slide.title} className="carousel-img" />
            <div className="carousel-caption">
              <h2>{slide.title}</h2>
              <p>{slide.sub}</p>
              <button className="shop-btn">Shop Now</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
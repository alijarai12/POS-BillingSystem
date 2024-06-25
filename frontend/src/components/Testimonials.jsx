import React, { useEffect, useRef } from "react";
import { FaQuoteRight } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      position: "CEO, Example Company",
      quote:
        "Using POS Biling has transformed our sales process. It's intuitive, fast, and our staff loves how easy it is to use.",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Marketing Director, Another Company",
      quote:
        "The real-time insights from POS Biling have been invaluable. We can make data-driven decisions on the fly.",
    },
    {
      id: 3,
      name: "Michael Johnson",
      position: "Owner, Small Business",
      quote:
        "I've tried other POS systems before, but none compare to POS Biling. It's affordable and does everything we need.",
    },
    {
      id: 4,
      name: "Emily Davis",
      position: "CFO, Tech Corp",
      quote:
        "POS Biling is a game-changer for our accounting. It's seamless and integrates perfectly with our existing systems.",
    },
    {
      id: 5,
      name: "David Wilson",
      position: "Operations Manager, Retail Inc.",
      quote:
        "We saw a significant increase in efficiency after switching to POS Biling. Highly recommended!",
    },
    {
      id: 6,
      name: "Sarah Lee",
      position: "Owner, Cafe Delight",
      quote:
        "The customer support is outstanding. POS Biling has helped us streamline our operations and serve our customers better.",
    },
  ];

  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    const slider = sliderRef.current;
    slider.style.transition = "transform 1s ease-in-out";
    slider.style.transform = "translateX(-100%)";
    setTimeout(() => {
      slider.appendChild(slider.firstElementChild);
      slider.style.transition = "none";
      slider.style.transform = "translateX(0)";
    }, 1000);
  };

  const prevSlide = () => {
    const slider = sliderRef.current;
    slider.style.transition = "none";
    slider.prepend(slider.lastElementChild);
    slider.style.transform = "translateX(-100%)";
    setTimeout(() => {
      slider.style.transition = "transform 1s ease-in-out";
      slider.style.transform = "translateX(0)";
    }, 0);
  };

  return (
    <section className="testimonials scroll-smooth" id="testimonials">
      <div
        className="absolute inset-0 bg-gradient-to-t from-slate-700 to-transparent"
        style={{ zIndex: 1 }}
      >
        <div className="font-roboto pt-[50px] text-white font-semibold">
          <p className="text-xl mb-3 text-center">
            <span>Reviews</span>
            <br />
          </p>
          <p className="text-4xl text-center">Happy Clients & Feedbacks</p>
        </div>
        <div className="relative mt-[60px]">
          <div className="slider-container overflow-hidden relative h-80">
            <div className="slider flex" ref={sliderRef}>
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="slide p-4 text-white w-full flex-shrink-0 flex flex-col justify-center items-center"
                >
                  <FaQuoteRight className="text-4xl mb-2" />
                  <p className="text-lg pb-6">{testimonial.quote}</p>
                  <p className="text-xl font-semibold">{testimonial.name}</p>
                  <p className="text-2xl">{testimonial.position}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

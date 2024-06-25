import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import BlogContainer from "../components/BlogContainer";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import Services from "../components/Services";
import Demo from "../components/Demo";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";

const Homepage = () => {
  const [navbarActive, setNavbarActive] = useState(false);
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { id: "home", text: "Home" },
    { id: "services", text: "Services" },
    { id: "testimonials", text: "Testimonials" },
    { id: "faq", text: "FAQ" },
    { id: "blog", text: "Blog" },
    { id: "contact", text: "Contact" },
  ];

  const changeNavbarBackground = () => {
    if (window.scrollY >= 80) {
      setNavbarActive(true);
    } else {
      setNavbarActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarBackground);
    return () => {
      window.removeEventListener("scroll", changeNavbarBackground);
    };
  }, []);

  return (
    <section id="home" className="smooth-scroll">
      <div
        className={`bg-gray-800 text-white sticky container mx-auto flex justify-around items-center top-0 z-50 p-4 ${
          navbarActive ? "active" : ""
        }`}
      >
        <div className="">
          <h1 className="text-2xl font-bold hover:text-red-500">
            <a href="/" className="">
              POS Biling
            </a>
          </h1>
        </div>
        <div className="hidden md:flex">
          <ul className="hidden md:flex cursor-pointer">
            {navItems.map((item) => (
              <li
                key={item.id}
                className="hover:text-red-500 px-3 py-2 rounded transition duration-300 ease-in-out"
              >
                <a href={`#${item.id}`} className="">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="gap-2 hidden md:flex">
          <Button
            endContent={<FaUserPlus />}
            size="sm"
            radius="md"
            className="border-none bg-inherit text-white"
          >
            Register
          </Button>
          <Button
            endContent={<FaUserCheck />}
            size="sm"
            radius="md"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          >
            Sign-in
          </Button>
        </div>
        <div onClick={handleNav} className="block md:hidden">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <ul
          className={
            nav
              ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
              : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
          }
        >
          <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
            POS Biling
          </h1>
          {navItems.map((item) => (
            <li
              key={item.id}
              className="p-4 border-b rounded-xl hover:text-[#00df9a] duration-300 cursor-pointer border-gray-600"
            >
              <a href={`#${item.id}`} className="">
                {item.text}
              </a>
            </li>
          ))}
          <div className="flex flex-col gap-2">
            <Button
              endContent={<FaUserPlus />}
              size="sm"
              radius="md"
              className="border-none bg-gray-800 text-white shadow-lg"
            >
              Register
            </Button>
            <Button
              endContent={<FaUserCheck />}
              size="sm"
              radius="md"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
              Sign-in
            </Button>
          </div>
        </ul>
      </div>
      <div className="relative">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-700 to-transparent"
            style={{ zIndex: 1 }}
          >
            <div className="font-roboto absolute top-[350px] left-[150px] text-white font-semibold">
              <p className="text-5xl mb-3">
                <span>Transforming Transactions</span>
                <br />
                <span>Empowering Business</span>
              </p>
              <p className="text-2xl">
                Discover Seamless POS Billing Solutions Today!
              </p>
            </div>
          </div>
        </div>
        <img
          src="https://images.pexels.com/photos/12935048/pexels-photo-12935048.jpeg"
          alt=""
          className="w-full h-[750px] object-cover"
          style={{ zIndex: 0 }}
        />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="demo">
        <Demo />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <div id="blog">
        <BlogContainer />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </section>
  );
};

export default Homepage;

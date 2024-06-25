import React from "react";
import { FaChartLine, FaShieldAlt, FaHeadset } from "react-icons/fa";
import { Button } from "@nextui-org/react";

const Services = () => {
  return (
    <section className="h-auto  p-6 bg-gray-100" id="services">
      <h2 className="font-bold text-center text-4xl font-roboto mb-10 ">
        Why Choose Us for Your POS Billing System?
      </h2>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaChartLine className="text-4xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Seamless Transactions</h3>
          <p>
            Fast, accurate, and hassle-free billing with an intuitive interface.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaShieldAlt className="text-4xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
          <p>
            Robust security features to protect your transactions and customer
            data.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaHeadset className="text-4xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
          <p>
            Dedicated customer support team to assist you whenever you need it.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaChartLine className="text-4xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Real-Time Insights</h3>
          <p>
            Access detailed sales reports and analytics to make informed
            business decisions.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaChartLine className="text-4xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Automated Inventory Management
          </h3>
          <p>
            Keep your stock updated effortlessly with real-time tracking and
            alerts.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaChartLine className="text-4xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Customizable Solutions
          </h3>
          <p>
            Tailor the POS system to fit your business needs with customizable
            features and workflows.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaChartLine className="text-4xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Integration with Third-party Apps
          </h3>
          <p>
            Seamlessly integrate with accounting software, CRM systems, and other
            third-party applications to streamline operations.
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <Button
          size="lg"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        >
          Learn More
        </Button>
      </div>
    </section>
  );
};

export default Services;

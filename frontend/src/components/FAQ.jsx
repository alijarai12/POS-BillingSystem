import React from 'react'

const FAQ = () => {
  return (
    <section className="h-auto mt-10 p-6 bg-white" id="faq">
    <h2 className="font-bold text-center text-4xl font-roboto mb-10">
      Frequently Asked Questions
    </h2>
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          What is a POS billing system?
        </h3>
        <p>
          A POS (Point of Sale) billing system is a combination of hardware
          and software that manages sales transactions, inventory, and
          customer data in retail environments.
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          How secure is the POS system?
        </h3>
        <p>
          Our POS system includes robust security features such as
          encryption, secure user authentication, and compliance with
          industry standards to protect your transactions and data.
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          Do you offer customer support?
        </h3>
        <p>
          Yes, we offer 24/7 customer support to assist you with any issues
          or questions you may have.
        </p>
      </div>
    </div>
  </section>  )
}

export default FAQ
import React from 'react';
import { Button } from '@nextui-org/react';

const Contact = () => {
  // Array of label information
  const formFields = [
    { id: 'name', label: 'Name', type: 'text', required: true },
    { id: 'email', label: 'Email', type: 'email', required: true },
    { id: 'message', label: 'Message', type: 'textarea', required: true }
  ];

  return (
    <section className="h-auto mt-10 p-6 bg-gray-100" id='contact'>
      <h2 className="font-bold text-center text-4xl font-roboto mb-10">
        Contact Us
      </h2>
      <div className="max-w-4xl mx-auto">
        <form>
          {formFields.map(field => (
            <div key={field.id} className="mb-4">
              <label
                className="block text-lg font-semibold mb-2"
                htmlFor={field.id}
              >
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  id={field.id}
                  name={field.id}
                  rows="5"
                  required={field.required}
                ></textarea>
              ) : (
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  required={field.required}
                />
              )}
            </div>
          ))}
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-tr from-green-500 to-purple-500 text-white shadow-lg hover:text-black"
            >
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;

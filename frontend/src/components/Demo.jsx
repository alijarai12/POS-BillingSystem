import { Button } from '@nextui-org/react'
import React from 'react'

const Demo = () => {
  return (
<div className="h-auto mt-4 p-6 bg-white">
        <h2 className="font-bold text-center text-4xl font-roboto mb-10">
          Product Demo
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="aspect-w-16 aspect-h-9 mb-6">
            <iframe
              className="w-full h-full rounded-lg shadow-md"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Product Demo"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
              Try Demo
            </Button>
          </div>
        </div>
      </div>  )
}

export default Demo
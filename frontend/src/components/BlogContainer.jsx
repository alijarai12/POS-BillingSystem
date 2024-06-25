import React from "react";

const blogs = [
  {
    id: 1,
    title: "10 Tips for Effective POS Billing",
    imageUrl:
      "https://images.pexels.com/photos/4473496/pexels-photo-4473496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae augue arcu.",
    date: "June 1, 2024",
  },
  {
    id: 2,
    title: "Why POS Systems Are Crucial for Retail Businesses",
    imageUrl:
      "https://images.pexels.com/photos/6347545/pexels-photo-6347545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    date: "May 15, 2024",
  },
  {
    id: 3,
    title: "How to Choose the Right POS System for Your Restaurant",
    imageUrl:
      "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Fusce tempor felis sit amet ultrices. Sed eu aliquam justo, vitae hendrerit mi.",
    date: "April 25, 2024",
  },
];

const BlogContainer = () => {
  return (
    <section id="blog">
      <h1 className="text-center p-10 font-semibold text-2xl">Stay Updated With Our News Feed.</h1>
      <div className="blogs-container grid grid-cols-1 md:grid-cols-3 gap-6 px-32 m-auto">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="blog-card bg-white rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.description}</p>
              <p className="text-sm text-gray-500">{blog.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogContainer;

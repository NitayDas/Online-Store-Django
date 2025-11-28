import React from "react";

export default function DetailsModal({ product, isOpen, onClose }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row gap-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-48 md:h-64 w-full md:w-1/2 object-contain"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-gray-800 font-semibold mb-1">Category: {product.category}</p>
            <p className="text-blue-600 font-bold text-xl">${product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

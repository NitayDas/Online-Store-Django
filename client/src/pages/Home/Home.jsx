import { useEffect, useState } from "react";
import AxiosInstance from "../../components/AxiosInstance";
import DetailsModal from "./DetailsModal";
import EditModal from "./EditModal";
import DeleteModal from "./deleteModal";
import { useUser } from "../../Provider/UserProvider";



export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { user } = useUser();

  const fetchProducts = () => {
    AxiosInstance.get("products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openDetails = (product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };

  const openEdit = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const openDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        {user?.is_superuser && (
          <button
            onClick={() => openEdit(null)} // null indicates adding new product
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Add New Product
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-contain mb-4"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600 mt-1">${product.price}</p>
              <p className="text-gray-500 text-sm mt-1">{product.category}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openDetails(product)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
              >
                Details
              </button>
              {user?.is_superuser && (
                <>
                  <button
                    onClick={() => openEdit(product)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDelete(product)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <DetailsModal
        product={selectedProduct}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
      <EditModal
        product={selectedProduct}
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedProduct(null);
          fetchProducts();
        }}
      />

      <DeleteModal
        product={selectedProduct}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDeleteSuccess={fetchProducts}
      />
    </div>
  );
}

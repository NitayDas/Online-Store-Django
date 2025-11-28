// DeleteModal.jsx
import AxiosInstance from "../../components/AxiosInstance";


const DeleteModal = ({ product, isOpen, onClose, onDeleteSuccess }) => {
  if (!isOpen || !product) return null;

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`products/${product.id}/`);
      onDeleteSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete "{product.title}"?</p>
        <div className="flex justify-center gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

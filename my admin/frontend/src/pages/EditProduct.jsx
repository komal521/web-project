import { useState, useEffect } from "react";
import axios from "axios";
import downArrowIcon from "../assets/down-arrow.png";
import leftArrowIcon from "../assets/left-arrow.png";

const EditProduct = ({ darkMode, editData, setActive }) => {
  const [product, setProduct] = useState({
    id: "",
    product_name: "",
    description: "",
    sku: "",
    brand: "",
    category: "",
    sub_category: "",
    base_price: "",
    discount_price: "",
    stock_quantity: "",
    is_active: 1,
    is_featured: 0,
    weight: "",
    length: "",
    width: "",
    height: "",
    base_color: "",
    variants: [],
    tags: []
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editData) {
      setProduct({
        id: editData.id || "",
        product_name: editData.product_name || "",
        description: editData.description || "",
        sku: editData.sku || "",
        brand: editData.brand || "",
        category: editData.category || "",
        sub_category: editData.sub_category || "",
        base_price: editData.base_price || "",
        discount_price: editData.discount_price || "",
        stock_quantity: editData.stock_quantity || "",
        is_active: editData.is_active !== undefined ? editData.is_active : 1,
        is_featured: editData.is_featured !== undefined ? editData.is_featured : 0,
        weight: editData.weight || "",
        length: editData.length || "",
        width: editData.width || "",
        height: editData.height || "",
        base_color: editData.base_color || "",
        variants: editData.variants ? (typeof editData.variants === "string" ? JSON.parse(editData.variants) : editData.variants) : [],
        tags: editData.tags ? (typeof editData.tags === "string" ? JSON.parse(editData.tags) : editData.tags) : []
      });
      if (editData.displayedImage) {
        setImagePreview(editData.displayedImage);
      } else if (editData.images) {
        let imgs = editData.images;
        if (typeof imgs === "string") {
          try { imgs = JSON.parse(imgs); } catch { imgs = []; }
        }
        if (Array.isArray(imgs) && imgs.length > 0 && imgs[0]) {
          setImagePreview(`http://localhost:5000/uploads/${imgs[0]}`);
        }
      } else if (editData.image) {
        setImagePreview(`http://localhost:5000/uploads/${editData.image}`);
      }
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append("productName", product.product_name);
    formData.append("description", product.description);
    formData.append("sku", product.sku);
    formData.append("brand", product.brand);
    formData.append("category", product.category);
    formData.append("subCategory", product.sub_category);
    formData.append("basePrice", product.base_price);
    formData.append("discountPrice", product.discount_price);
    formData.append("stockQuantity", product.stock_quantity);
    formData.append("isActive", product.is_active);
    formData.append("isFeatured", product.is_featured);
    formData.append("weight", product.weight);
    formData.append("length", product.length);
    formData.append("width", product.width);
    formData.append("height", product.height);
    formData.append("baseColor", product.base_color);
    formData.append("variants", JSON.stringify(product.variants));
    formData.append("tags", JSON.stringify(product.tags));

    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(`http://localhost:5000/api/products/${product.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Product updated successfully!");
      setActive("Product Management");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`p-4 sm:p-6 lg:p-8 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-[#fcfbf9] text-gray-800"}`}>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setActive("Product Management")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
            darkMode ? "border-gray-700 bg-gray-800 text-gray-250 hover:bg-gray-700" : "border-gray-200 bg-white text-gray-650 hover:bg-gray-50"
          }`}  >
          <img src={leftArrowIcon} alt="back" className="w-3 h-3 dark:invert opacity-70" />
          Back to Products
        </button>
        <h1 className="text-2xl font-bold">Edit Product</h1>
      </div>
      <div className={`max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 shadow-sm border ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      }`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Product Name *</label>
              <input
                type="text"
                required
                value={product.product_name}
                onChange={(e) => setProduct({ ...product, product_name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">SKU / Product ID</label>
              <input
                type="text"
                value={product.sku}
                onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`} />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Brand</label>
              <input type="text" value={product.brand}
                onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Category</label>
              <div className="relative">
                <select
                  value={product.category}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
                  className={`w-full px-4 py-3 pr-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent appearance-none cursor-pointer ${
                    darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                  }`} >
                  <option value="" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Select Category</option>
                  <option value="Electronics" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Electronics</option>
                  <option value="Accessories" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Accessories</option>
                  <option value="Fashion" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Fashion</option>
                  <option value="Home" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Home</option>
                </select>
                <img src={downArrowIcon} alt="select arrow"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-60 dark:invert" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Sub-Category</label>
              <div className="relative">
                <select
                  value={product.sub_category}
                  onChange={(e) => setProduct({ ...product, sub_category: e.target.value })}
                  className={`w-full px-4 py-3 pr-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent appearance-none cursor-pointer ${
                    darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                  }`} >
                  <option value="" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Select Sub-Category</option>
                  <option value="Luxury" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Luxury</option>
                  <option value="Premium" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Premium</option>
                  <option value="Classic" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Classic</option>
                  <option value="New Arrival" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>New Arrival</option>
                </select>
                <img src={downArrowIcon} alt="select arrow"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-60 dark:invert"  />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Base Price (₹) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={product.base_price}
                onChange={(e) => setProduct({ ...product, base_price: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Discount Price (₹)</label>
              <input type="number" step="0.01" value={product.discount_price}
                onChange={(e) => setProduct({ ...product, discount_price: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Stock Quantity *</label>
              <input
                type="number"
                required
                value={product.stock_quantity}
                onChange={(e) => setProduct({ ...product, stock_quantity: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`}  />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Status</label>
              <div className="relative">
                <select
                  value={product.is_active}
                  onChange={(e) => setProduct({ ...product, is_active: Number(e.target.value) })}
                  className={`w-full px-4 py-3 pr-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent appearance-none cursor-pointer ${
                    darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                  }`}
                >
                  <option value={1} className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Active</option>
                  <option value={0} className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Draft</option>
                </select>
                <img
                  src={downArrowIcon}
                  alt="select arrow"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-60 dark:invert"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Current Image</label>
              {imagePreview && (
                <div className="mb-3">
                  <img
                    src={imagePreview}
                    alt="Current product image"
                    className="w-32 h-32 rounded-xl object-cover border border-gray-200"
                  />
                  <p className="text-xs text-gray-400 mt-1">Current image</p>
                </div>
              )}
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Change Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                  if (file) setImagePreview(URL.createObjectURL(file));
                }}
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold ${
                  darkMode ? "border-gray-700 text-white file:bg-gray-700 file:text-white" : "border-gray-200 text-gray-800 file:bg-gray-100 file:text-gray-700"
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description</label>
            <textarea
              rows={4}
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent ${
                darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
              }`}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setActive("Product Management")}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all border ${
                darkMode ? "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#8b4600be] hover:bg-opacity-90 disabled:opacity-50 transition-all shadow-md"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

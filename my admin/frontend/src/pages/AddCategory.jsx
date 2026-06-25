import { useState } from "react";
import dashboardIcon from "../assets/dashboard (1).png";
import chartIcon from "../assets/bar-chart.png";
import infoIcon from "../assets/information.png";
import downIcon from "../assets/down.png";
import imageIcon from "../assets/image.png";
import globalIcon from "../assets/global.png";
import closeIcon from "../assets/close.png";
import fileIcon from "../assets/file.png";
import axios from "axios";
const AddCategory = ({ darkMode }) => {
  const [featured, setFeatured] = useState(false);
  const [sitemap, setSitemap] = useState(true);
  const [globalSearch, setGlobalSearch] = useState(true);
  const [formData, setFormData] = useState({
  category_name: "",
  slug: "",
  parent_category: "",
  description: "",
  seo_title: "",
  seo_description: "",
  status: "Active",
  breadcrumb: "",
});
const [image, setImage] = useState(null);
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async () => {
  try {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    data.append("featured", featured);
    data.append("sitemap", sitemap);
    data.append("global_search", globalSearch);
    data.append("image", image);
    const res = await axios.post(
      "http://localhost:5000/api/categories",
      data
    );
    alert(res.data.message);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="p-3 sm:p-5 lg:p-7">
      <div
        className={`rounded-[32px] p-4 sm:p-6 lg:p-8 ${
          darkMode ? "bg-[#1b1b1b]" : "bg-[#f8f8f8]"
        }`}>
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1  className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-[#1b1b1b]"
              }`} >
              Add New Category
            </h1>
            <p  className={`mt-2 max-w-[620px] text-sm leading-6 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`} >
              Organize your product catalog by creating high-level groupings.
              Define SEO metadata and visual identifiers for better storefront
              discovery.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex min-w-[180px] items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f7f1e4]">
                <img src={dashboardIcon} alt="" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Total Active
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[#1b1b1b]">
                  42
                </h2>
              </div>
            </div>
            <div className="flex min-w-[180px] items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f7f1e4]">
                <img src={chartIcon} alt="" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Avg Traffic
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[#1b1b1b]">
                  1.2k
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
          <div className="rounded-[28px] bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-8 flex items-center">
              <h2 className="text-lg font-bold text-[#1b1b1b]">
                Basic Information
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-400">
                  Category Name
                </label>
                <input type="text" name="category_name" placeholder="e.g. Minimalist Home Decor"
              onChange={handleChange}
             className="h-[52px] w-full rounded-2xl border border-gray-200 bg-[#fafafa] px-4 text-sm outline-none"/>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-400">
                  Slug (URL Path)
                </label>
                <div className="flex h-[52px] overflow-hidden rounded-2xl border border-gray-200 bg-[#fafafa]">
                  <div className="flex items-center border-r border-gray-200 px-4 text-xs font-bold text-gray-500">
                    LUXE.COM/
                  </div>
                  <input type="text" name="slug"  placeholder="minimalist-home-decor"
            onChange={handleChange}  className="flex-1 bg-transparent px-4 text-sm outline-none"/>
                </div>
              </div>
            </div>
            <div className="mt-7">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Parent Category
                </label>
                <img src={infoIcon} alt="" className="h-4 w-4" />
              </div>
             <select name="parent_category" onChange={handleChange}
           className="h-[54px] w-full rounded-2xl border border-gray-200 bg-[#fafafa] px-4 text-sm outline-none">
         <option value="">None (Root Category)</option>
         <option value="Electronics">Electronics</option>
         <option value="Fashion">Fashion</option>
         <option value="Home Decor">Home Decor</option>
         </select>
              <p className="mt-2 text-xs text-gray-400">
                Select where this category fits in your catalog hierarchy.
              </p>
            </div>
            <div className="mt-7">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-400">
                Description
              </label>
              <textarea rows={7} name="description" placeholder="Describe the category's essence..."
            onChange={handleChange}
            className="w-full resize-none rounded-3xl border border-gray-200 bg-[#fafafa] p-5 text-sm outline-none"/>
            </div>
            
          </div>
          <div className="space-y-6">
            <div className="rounded-[28px] bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#1b1b1b]">
                  Visual Media
                </h2>
                <span className="rounded-full bg-[#f7f1e4] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#8a6413]">
                  Mandatory
                </span>
              </div>
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[30px] border-2 border-dashed border-gray-200 bg-[#fcfcfc] p-6 text-center">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#f7f1e4]">
                  <img src={imageIcon} alt="" className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-bold text-[#1b1b1b]">
                  Upload Category Image
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  Recommended 800x800px (PNG, JPG)
                </p>
                <button className="mt-6 rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-[#1b1b1b] transition-all duration-300 hover:bg-[#1b1b1b] hover:text-white">
                  Browse Files
                </button>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mt-4"/>
              </div>
            </div>
            <div className="rounded-[28px] bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold text-[#1b1b1b]">
                Classification
              </h2>
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Status
                  </label>
                  <img src={downIcon} alt="" className="h-4 w-4" />
                </div>
                <div className="flex h-[54px] items-center justify-between rounded-2xl border border-gray-200 bg-[#fafafa] px-4">
                  <span className="text-sm text-gray-600">Active</span>
                  <img src={downIcon} alt="" className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between rounded-2xl border border-gray-100 bg-[#fafafa] p-4">
                <div>
                  <h3 className="text-sm font-semibold text-[#1b1b1b]">
                    Featured Category
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">
                    Display prominently on home page carousel.
                  </p>
                </div>
                <button  onClick={() => setFeatured(!featured)}
                  className={`relative h-7 w-14 rounded-full transition-all duration-300 ${
                    featured ? "bg-[#8b5e34]" : "bg-gray-300"
                  }`} >
                  <div
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
                      featured ? "left-8" : "left-1"
                    }`} />
                </button>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#1b1b1b]">
                  Advanced Settings
                </h3>
                <img src={downIcon} alt="" className="h-4 w-4" />
              </div>
              <div className="mt-5 flex items-center justify-between border-b border-gray-100 pb-4">
                <span className="text-sm text-gray-500">
                  Enable Sitemap Indexing
                </span>
                <button onClick={() => setSitemap(!sitemap)}
                  className={`relative h-7 w-14 rounded-full transition-all duration-300 ${
                    sitemap ? "bg-[#8b5e34]" : "bg-gray-300"
                  }`}  >
                  <div
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
                      sitemap ? "left-8" : "left-1"
                    }`}  />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between border-b border-gray-100 pb-4">
                <span className="text-sm text-gray-500">
                  Include in Global Search
                </span>
                <button  onClick={() => setGlobalSearch(!globalSearch)}
                  className={`relative h-7 w-14 rounded-full transition-all duration-300 ${
                    globalSearch ? "bg-[#8b5e34]" : "bg-gray-300"
                  }`} >
                  <div
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
                      globalSearch ? "left-8" : "left-1"
                    }`} />
                </button>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Custom Breadcrumb Label
                </span>
                <input type="text" name="breadcrumb" placeholder="Minimalist" onChange={handleChange}
              className="rounded-full border border-gray-200 bg-[#fafafa] px-4 py-2 text-xs text-gray-500 outline-none"/>
              </div>
              <div className="mt-8 rounded-[24px] bg-[#faf7f0] p-5">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <img src={globalIcon} alt="" className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1b1b1b]">
                      Ready for Global Launch?
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      Categories with optimized SEO metadata perform better on
                      search rankings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
              <button className="flex items-center justify-center gap-2 rounded-2xl bg-[#6f4e37] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#5c4033]">
                <img src={closeIcon} alt=""
                  className="h-4 w-4 brightness-0 invert" />
                Cancel Changes
              </button>
              <button   onClick={handleSubmit} className="flex items-center justify-center gap-2 rounded-2xl bg-[#5c4033] px-7 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#4a332a]">
                <img  src={fileIcon}  alt=""
                  className="h-4 w-4 brightness-0 invert"  />
                Publish Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddCategory;
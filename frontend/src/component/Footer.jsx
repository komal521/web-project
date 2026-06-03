import facebookIcon from "../assets/facebook.png";
import instagramIcon from "../assets/instagram.png";
import twitterIcon from "../assets/twitter.png";
import youtubeIcon from "../assets/youtube.png";
import arrowIcon from "../assets/right-arrow.png";
const Footer = () => {
  return (
    <footer className="bg-[#f7f7f7] border-t">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-purple-700 mb-4">
              Lumina </h2>
            <p className="text-gray-600 leading-7 mb-6">
              Elevating your daily experience through carefully curated
              premium products and exceptional design. </p>
            <div className="flex gap-3">
              {[facebookIcon, instagramIcon, twitterIcon, youtubeIcon].map(
                (icon, index) => (
                  <div  key={index}
                    className="w-10 h-10 rounded-full border border-purple-200 flex items-center justify-center cursor-pointer hover:bg-purple-100 transition">
                    <img src={icon} alt="" className="w-5 h-5 object-contain"  />
                  </div>
                )  )}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-5 text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="hover:text-purple-700 cursor-pointer">
                Home
              </li>
              <li className="hover:text-purple-700 cursor-pointer">
                Shop
              </li>
              <li className="hover:text-purple-700 cursor-pointer">
                Categories
              </li>
              <li className="hover:text-purple-700 cursor-pointer">
                About Us
              </li>
              <li className="hover:text-purple-700 cursor-pointer">
                Contact
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-5 text-gray-900">
              Categories
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>Electronics</li>
              <li>Fashion</li>
              <li>Accessories</li>
              <li>Home & Living</li>
              <li>Beauty</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-5 text-gray-900">
              Subscribe </h3>
            <p className="text-gray-600 mb-5">
              Get updates about new arrivals and exclusive offers.
            </p>
            <div className="flex overflow-hidden rounded-lg border">
              <input type="email" placeholder="Your email"
                className="flex-1 px-4 py-3 outline-none bg-white" />
              <button className="bg-purple-700 hover:bg-purple-800 px-4 flex items-center justify-center transition">
                <img src={arrowIcon} alt="" className="w-5 h-5 invert"  />
              </button>
            </div>
            <div className="mt-6 text-gray-600 space-y-2">
              <p>support@lumina.com</p>
              <p>+91 98765 43210</p>
            </div>
          </div>
        </div>
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <p>© 2026 Lumina. All Rights Reserved.</p>
          <div className="flex gap-5">
            <span className="cursor-pointer hover:text-purple-700">
              Privacy Policy
            </span>
            <span className="cursor-pointer hover:text-purple-700">
              Terms & Conditions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
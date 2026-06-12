import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

import phoneCall from "../assets/phone-call.png";
import gmail from "../assets/gmail.png";
import location from "../assets/location.png";
import user from "../assets/user.png";
import copy from "../assets/copy.png";
import chat from "../assets/chat.png";
import send from "../assets/send.png";

const Contact = () => {
  return (
    <>
      <Navbar />

      <section className="bg-[#FAF9F7] py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif text-gray-900">
              Contact us
            </h1>

            <p className="text-gray-500 mt-3">
              Have questions about our collections? We'd love to hear from you.
            </p>

            <div className="w-20 h-1 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Card */}
            <div className="bg-[#F3F0F8] rounded-2xl p-8 shadow-sm">
              <h2 className="text-3xl font-serif mb-4">
                Concierge Services
              </h2>

              <p className="text-gray-600 mb-8">
                Our dedicated team is ready to assist you with sizing,
                styling, or order inquiries.
              </p>

              {/* Call */}
              <div className="flex gap-4 mb-8">
                <div className="bg-purple-600 p-3 rounded-full h-fit">
                  <img src={phoneCall} alt="" className="w-5 h-5 invert" />
                </div>

                <div>
                  <h4 className="text-purple-600 font-semibold">CALL US</h4>
                  <p className="text-gray-800">+91 98765 43210</p>
                  <p className="text-sm text-gray-500">
                    Mon-Fri, 9am - 6pm
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 mb-8">
                <div className="bg-purple-600 p-3 rounded-full h-fit">
                  <img src={gmail} alt="" className="w-5 h-5 invert" />
                </div>

                <div>
                  <h4 className="text-purple-600 font-semibold">EMAIL US</h4>
                  <p className="text-gray-800">support@shop.com</p>
                  <p className="text-sm text-gray-500">
                    24/7 Support Available
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4 mb-8">
                <div className="bg-purple-600 p-3 rounded-full h-fit">
                  <img src={location} alt="" className="w-5 h-5 invert" />
                </div>

                <div>
                  <h4 className="text-purple-600 font-semibold">
                    VISIT OUR STORE
                  </h4>
                  <p className="text-gray-800">
                    Jind, Haryana
                  </p>
                  <p className="text-sm text-gray-500">
                    India
                  </p>
                </div>
              </div>

              <hr className="my-8" />

              <div>
                <h4 className="font-medium mb-4">Follow Our Journey</h4>

                <div className="flex gap-5 text-sm text-gray-500">
                  <span>INSTAGRAM</span>
                  <span>FACEBOOK</span>
                  <span>LINKEDIN</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="text-sm text-gray-600">
                    FULL NAME
                  </label>

                  <div className="border rounded-lg px-3 py-3 flex items-center mt-2">
                    <img src={user} alt="" className="w-4 h-4 mr-2" />
                    <input
                      type="text"
                      placeholder="Enter name"
                      className="w-full outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm text-gray-600">
                    EMAIL ADDRESS
                  </label>

                  <div className="border rounded-lg px-3 py-3 flex items-center mt-2">
                    <img src={gmail} alt="" className="w-4 h-4 mr-2" />
                    <input
                      type="email"
                      placeholder="Enter email"
                      className="w-full outline-none"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm text-gray-600">
                    PHONE NUMBER
                  </label>

                  <div className="border rounded-lg px-3 py-3 flex items-center mt-2">
                    <img src={phoneCall} alt="" className="w-4 h-4 mr-2" />
                    <input
                      type="text"
                      placeholder="Enter number"
                      className="w-full outline-none"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-sm text-gray-600">
                    SUBJECT
                  </label>

                  <div className="border rounded-lg px-3 py-3 flex items-center mt-2">
                    <img src={copy} alt="" className="w-4 h-4 mr-2" />
                    <input
                      type="text"
                      placeholder="Subject"
                      className="w-full outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="mt-6">
                <label className="text-sm text-gray-600">
                  YOUR MESSAGE
                </label>

                <div className="border rounded-lg p-3 flex gap-2 mt-2">
                  <img src={chat} alt="" className="w-4 h-4 mt-1" />

                  <textarea
                    rows="5"
                    placeholder="Tell us how we can help..."
                    className="w-full outline-none resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Button */}
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg mt-6 flex justify-center items-center gap-3">
                <img
                  src={send}
                  alt=""
                  className="w-5 h-5 invert"
                />
                Send Message
              </button>

              <p className="text-center text-xs text-gray-500 mt-5">
                Secure SSL Encryption • Privacy Guaranteed
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
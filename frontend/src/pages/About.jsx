import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import a1 from "../assets/a1.webp";
import a2 from "../assets/a2.png";
import targetIcon from "../assets/target.png";
import visionIcon from "../assets/light-bulb.png";
import trustIcon from "../assets/checked.png";
import qualityIcon from "../assets/medal.png";
import innovationIcon from "../assets/star (1).png";
import supportIcon from "../assets/musical-note (1).png";
import u1 from "../assets/u1.avif";
import u2 from "../assets/u2.webp";
import u3 from "../assets/u3.avif";
import twitterIcon from "../assets/twitter.png";
import starIcon from "../assets/star (1).png";
const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-[#f8f5f2] min-h-screen">
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 rounded-3xl p-6 md:p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-xl">
            <div className="text-white max-w-xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Crafting Premium Digital
                <span className="text-yellow-400">
                  {" "}Experiences
                </span>
              </h1>
              <p className="text-base md:text-lg text-gray-100 mb-8">
                We create premium digital experiences that blend
                creativity, innovation, and elegance to deliver
                exceptional value to our customers.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
                  Explore Products
                </button>
                <button className="bg-white text-purple-700 px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
                  Our Legacy
                </button>
              </div>
            </div>
            <div className="w-full lg:w-auto">
              <img src={a1} alt="About"
                className="w-full lg:w-[500px] h-[250px] md:h-[350px] object-cover rounded-2xl shadow-lg" />
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <img src={a2} alt="Our Story"
                className="w-full h-[300px] md:h-[500px] object-cover rounded-2xl shadow-lg" />
            </div>
            <div>
              <span className="text-purple-600 font-semibold uppercase tracking-wider">
                About Us </span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 text-base md:text-lg mb-4">
                The journey of a thousand miles began with a
                single stitch of perfection. We started with
                a vision to bring premium quality products and
                unforgettable experiences to our customers.
              </p>
              <p className="text-gray-600 text-base md:text-lg mb-8">
                Founded in the heart of innovation, our brand
                continues to evolve while staying true to our
                values of excellence, craftsmanship, and trust.
              </p>
              <div className="flex flex-wrap gap-8 md:gap-12">
                <div>
                  <h3 className="text-4xl font-bold text-purple-600">
                    28+
                  </h3>
                  <p className="text-gray-600">
                    Years Experience
                  </p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-purple-600">
                    50K+
                  </h3>
                  <p className="text-gray-600">
                    Happy Customers
                  </p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-purple-600">
                    Global
                  </h3>
                  <p className="text-gray-600">
                    Presence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
<section className="bg-[#f3f3f3] py-12 md:py-16">
  <div className="max-w-7xl mx-auto px-4 md:px-6">
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      <div className="bg-gradient-to-br from-yellow-200 to-yellow-100 border border-gray-300 rounded-lg p-6 shadow-sm">
        <div className="w-12 h-12 bg-purple-700 rounded-lg flex items-center justify-center mb-4">
          <img src={targetIcon} alt="" className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-purple-700 mb-3">
          Our Mission
        </h3>
        <p className="text-gray-700 leading-relaxed">
          To redefine luxury shopping by merging timeless elegance
          with modern convenience, ensuring every customer feels
          empowered and distinguished by their choices.
        </p>
      </div>
      <div className="bg-gradient-to-br from-orange-100 to-yellow-200 border border-gray-300 rounded-lg p-6 shadow-sm">
        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
          <img src={visionIcon} alt="" className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-purple-700 mb-3">
          Our Vision
        </h3>
        <p className="text-gray-700 leading-relaxed">
          To be the global benchmark for digital craftsmanship,
          where technology becomes invisible and only the seamless,
          luxurious user experience remains.
        </p>
      </div>
    </div>
    <div className="bg-white rounded-xl p-6 md:p-10 shadow-sm">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-black mb-4">
        Why Choose Aura Digital
      </h2>
      <p className="text-center text-purple-600 text-base md:text-lg mb-10 max-w-4xl mx-auto">
        We combine artistic intuition with data-driven strategy
        to deliver results that exceed expectations.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#f8b81f] p-5 rounded-lg">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
            <img src={trustIcon} alt="" className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-black mb-2">
            Unyielding Trust
          </h4>
          <p className="text-sm text-black">
            Our commitment to security and transparency ensures
            your business data and goals are always protected.
          </p>
        </div>
        <div className="bg-[#f8b81f] p-5 rounded-lg">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
            <img src={qualityIcon} alt="" className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-black mb-2">
            Premium Quality
          </h4>
          <p className="text-sm text-black">
            We don't settle for good enough. Every pixel and line
            of code is meticulously inspected for perfection.
          </p>
        </div>
        <div className="bg-[#f8b81f] p-5 rounded-lg">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
            <img src={innovationIcon} alt="" className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-black mb-2">
            Rapid Innovation
          </h4>
          <p className="text-sm text-black">
            Agile methodologies allow us to push cutting-edge
            solutions faster than the competition.
          </p>
        </div>
        <div className="bg-[#f8b81f] p-5 rounded-lg">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
            <img src={supportIcon} alt="" className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-black mb-2">
            Elite Support
          </h4>
          <p className="text-sm text-black">
            Our support team is always available to assist with
            technical queries or strategic plans.
          </p>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
      <div className="bg-black text-white text-center py-8 rounded-lg">
        <h3 className="text-3xl md:text-4xl font-bold">1000+</h3>
        <p className="text-sm text-gray-300 mt-2">
          Active Customers
        </p>
      </div>
      <div className="bg-black text-white text-center py-8 rounded-lg">
        <h3 className="text-3xl md:text-4xl font-bold">500+</h3>
        <p className="text-sm text-gray-300 mt-2">
          Completed Projects
        </p>
      </div>
      <div className="bg-black text-white text-center py-8 rounded-lg">
        <h3 className="text-3xl md:text-4xl font-bold">99%</h3>
        <p className="text-sm text-gray-300 mt-2">
          Client Satisfaction
        </p>
      </div>
      <div className="bg-black text-white text-center py-8 rounded-lg">
        <h3 className="text-3xl md:text-4xl font-bold">24/7</h3>
        <p className="text-sm text-gray-300 mt-2">
          Support Availability
        </p>
      </div>
    </div>
  </div>
</section>
<section className="py-14 bg-[#f8f5f2]">
  <div className="max-w-7xl mx-auto px-4 md:px-6">
    <h2 className="text-3xl md:text-5xl font-bold text-center text-black mb-3">
      Meet the Leadership
    </h2>
    <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
      The visionaries steering Aura Digital toward the next frontier
      of digital innovation.
    </p>
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white border rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition">
        <img  src={u1}  alt=""  className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
        <h3 className="text-xl font-bold">
          Alexander Sterling
        </h3>
        <p className="text-purple-600 text-sm font-semibold mb-3">
          CEO & Founder
        </p>
        <p className="text-gray-600 text-sm mb-4">
          A former tech executive with 15 years of experience in
          high-end digital strategy.
        </p>
        <div className="flex justify-center gap-3">
          <img src={starIcon} alt="" className="w-5 h-5" />
          <img src={twitterIcon} alt="" className="w-5 h-5" />
        </div>
      </div>
      <div className="bg-gradient-to-b from-purple-700 to-purple-500 text-white rounded-xl p-6 text-center shadow-lg">
        <img src={u2} alt=""
          className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white" />
        <h3 className="text-xl font-bold">
          Isabella Rossi
        </h3>
        <p className="text-yellow-300 text-sm font-semibold mb-3">
          Creative Director
        </p>
        <p className="text-sm mb-4">
          Award-winning designer known for minimalist yet luxurious
          aesthetics. </p>
        <div className="flex justify-center gap-3">
          <img src={starIcon} alt="" className="w-5 h-5" />
          <img src={twitterIcon} alt="" className="w-5 h-5" />
        </div>
      </div>
      <div className="bg-white border rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition">
        <img src={u3} alt="" className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
        <h3 className="text-xl font-bold">
          Sophie Chen
        </h3>
        <p className="text-purple-600 text-sm font-semibold mb-3">
          Head of Strategy
        </p>
        <p className="text-gray-600 text-sm mb-4">
          A systems architect who believes every pixel should
          enhance performance.
        </p>
        <div className="flex justify-center gap-3">
          <img src={starIcon} alt="" className="w-5 h-5" />
          <img src={twitterIcon} alt="" className="w-5 h-5" />
        </div>
      </div>
    </div>
  </div>
</section>
<section className="bg-[#262626] py-14">
  <div className="max-w-7xl mx-auto px-4 md:px-6">
    <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-3">
      Client Experiences
    </h2>
    <p className="text-center text-yellow-400 max-w-3xl mx-auto mb-10">
      Read how Aura Digital transforms brands into
      market-leading digital experiences.
    </p>
    <div className="grid md:grid-cols-3 gap-6">
      {[u1, u2, u3].map((img, index) => (
        <div key={index}
          className="bg-white rounded-xl p-5 shadow" >
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={starIcon} alt="" className="w-4 h-4" /> ))}
          </div>
          <p className="text-gray-600 text-sm mb-5">
            Aura Digital didn't just build our website,
            they redefined our entire online presence.
          </p>
          <div className="flex items-center gap-3">
            <img src={img} alt="" className="w-12 h-12 rounded-full object-cover"/>
            <div>
              <h4 className="font-semibold">
                Client Name
              </h4>
              <p className="text-xs text-gray-500">
                Happy Customer
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
<section className="py-14 bg-[#f8f5f2]">
  <div className="max-w-7xl mx-auto px-4 md:px-6">
    <div className="bg-gradient-to-r from-[#5f0f40] via-[#7b1fa2] to-[#8e24aa] rounded-3xl p-8 md:p-14 text-center text-white">
      <h2 className="text-3xl md:text-5xl font-bold mb-5">
        Join Our Shopping Journey
      </h2>
      <p className="max-w-2xl mx-auto text-gray-200 mb-8">
        Experience the pinnacle of luxury commerce. Create an
        account today for exclusive early access to our seasonal
        collections.
      </p>
      <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
        Shop Now
      </button>
    </div>
  </div>
</section>
      <Footer />
    </>
  );
};
export default About;
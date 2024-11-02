// File: components/About.js
import React from "react";
import {
  TrendingUp,
  BarChart2,
  CheckCircle,
  Shield,
  Target,
  Activity,
} from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12">
      {" "}
      {/* Adds margins */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        About TrendGYPT
      </h1>
      <section className="text-gray-600 mb-8">
        <p className="text-lg text-center mb-6">
          Welcome to{" "}
          <span className="text-purple-700 font-semibold">TrendGYPT</span> —
          your go-to platform for sophisticated, algorithmic trading solutions
          in the crypto and forex markets. Our mission is to empower traders by
          offering ready-to-use, high-performance trading bots that can be
          bought or rented, with powerful monitoring and analytics to optimize
          your trading experience.
        </p>
      </section>
      <section className="bg-gray-100 rounded-lg p-6 mb-10 shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Our Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4">
            <BarChart2 className="text-purple-700" size={32} />
            <div>
              <h3 className="text-xl font-bold text-gray-700">
                Algorithmic Bots for Crypto & Forex
              </h3>
              <p className="text-gray-600">
                Access a range of high-quality, algorithmic trading bots
                designed to excel in both crypto and forex markets, with a
                special emphasis on cryptocurrencies. Whether you’re looking to
                buy or rent, our bots are optimized for performance and
                adaptability.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <TrendingUp className="text-purple-700" size={32} />
            <div>
              <h3 className="text-xl font-bold text-gray-700">
                Comprehensive Monitoring & Analytics
              </h3>
              <p className="text-gray-600">
                Get real-time insights and analytics on your bots’ performance,
                enabling you to monitor success, mitigate risks, and make
                data-driven decisions to refine your trading strategy.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Shield className="text-purple-700" size={32} />
            <div>
              <h3 className="text-xl font-bold text-gray-700">
                Enhanced Security and Privacy
              </h3>
              <p className="text-gray-600">
                We prioritize security at every step. From data encryption to
                secure protocols, we ensure that your trading data and
                strategies are safe and confidential.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Target className="text-purple-700" size={32} />
            <div>
              <h3 className="text-xl font-bold text-gray-700">
                Customizable Timeframes and Metrics
              </h3>
              <p className="text-gray-600">
                Tailor your bot’s performance metrics across different
                timeframes and indicators. Analyze short-term gains or long-term
                trends with flexibility and control over your data.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-700 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Our Mission
        </h2>
        <p className="text-lg leading-relaxed">
          At TrendGYPT, we believe in democratizing access to advanced trading
          technology, enabling traders of all levels to leverage algorithmic
          power in the ever-evolving crypto and forex markets. Our platform
          combines accessible bot rentals, advanced analytics, and user-friendly
          interfaces to bring professional-grade trading tools within reach.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          We are committed to fostering a community where traders feel
          empowered, informed, and ready to thrive in dynamic markets. With
          TrendGYPT, you can confidently trade smarter and adapt faster.
        </p>
      </section>
      <section className="text-gray-700 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Why Choose TrendGYPT?
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start space-x-3">
            <CheckCircle className="text-green-500" size={24} />
            <span>
              Professionally designed bots crafted for high efficiency in crypto
              and forex markets.
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircle className="text-green-500" size={24} />
            <span>
              Seamless integration of real-time monitoring and analytics for
              better decision-making.
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircle className="text-green-500" size={24} />
            <span>
              Strict adherence to security protocols, keeping your strategies
              and data safe.
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircle className="text-green-500" size={24} />
            <span>
              Flexible rental options that allow you to experiment and adapt
              strategies as you grow.
            </span>
          </li>
        </ul>
      </section>
      <section className="text-center mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Join Us on Your Trading Journey
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Ready to explore algorithmic trading and harness the power of advanced
          bots? TrendGYPT is here to support your journey with industry-leading
          tools and insights. Start today and elevate your trading strategies.
        </p>
        <a
          href="/strategies"
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Discover Our Bots
        </a>
      </section>
    </div>
  );
};

export default About;

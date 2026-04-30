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
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const About = () => {
  return (
    <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12">
      <h1 className="text-4xl font-bold text-center text-slate-900 mb-8">
        About GambiAI
      </h1>
      <section className="text-slate-600 mb-8">
        <p className="text-lg text-center mb-6">
          Welcome to{" "}
          <span className="text-emerald-700 font-semibold">GambiAI</span> -
          your go-to platform for sophisticated, algorithmic trading solutions
          in the forex markets. Our mission is to empower traders by
          offering ready-to-use, high-performance trading bots that can be
          bought or rented, with powerful monitoring and analytics to optimize
          your trading experience.
        </p>
      </section>

      {/* Core Features Section */}
      <section className="bg-white border border-slate-200 rounded-lg p-6 mb-10 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Our Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Feature
            icon={<BarChart2 className="text-emerald-600" size={32} />}
            title="Algorithmic Bots for Forex"
          >
            Access a range of high-quality, algorithmic trading bots designed to
            excel in forex markets across major and minor currency pairs.
            Whether you are looking to buy or rent, our bots are optimized for
            performance and adaptability.
          </Feature>
          <Feature
            icon={<TrendingUp className="text-emerald-600" size={32} />}
            title="Comprehensive Monitoring & Analytics"
          >
            Get real-time insights and analytics on your bots’ performance,
            enabling you to monitor success, mitigate risks, and make
            data-driven decisions to refine your trading strategy.
          </Feature>
          <Feature
            icon={<Shield className="text-emerald-600" size={32} />}
            title="Enhanced Security and Privacy"
          >
            We prioritize security at every step. From data encryption to secure
            protocols, we ensure that your trading data and strategies are safe
            and confidential.
          </Feature>
          <Feature
            icon={<Target className="text-emerald-600" size={32} />}
            title="Customizable Timeframes and Metrics"
          >
            Tailor your bot’s performance metrics across different timeframes
            and indicators. Analyze short-term gains or long-term trends with
            flexibility and control over your data.
          </Feature>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="text-slate-700 mb-10">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Why Choose GambiAI?
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start space-x-3">
            <CheckCircle className="text-emerald-500" size={24} />
            <span>
              Professionally designed bots crafted for high efficiency in forex
              markets.
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircle className="text-emerald-500" size={24} />
            <span>
              Seamless integration of real-time monitoring and analytics for
              better decision-making.
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircle className="text-emerald-500" size={24} />
            <span>
              Strict adherence to security protocols, keeping your strategies
              and data safe.
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircle className="text-emerald-500" size={24} />
            <span>
              Flexible rental options that allow you to experiment and adapt
              strategies as you grow.
            </span>
          </li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Join Us on Your Trading Journey
        </h2>
        <p className="text-lg text-slate-600 mb-6">
          Ready to explore algorithmic trading and harness the power of advanced
          bots? GambiAI is here to support your journey with industry-leading
          tools and insights. Start today and elevate your trading strategies.
        </p>
        <Link
          to="/strategies"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Discover Our Bots
        </Link>
      </section>
    </div>
  );
};

// Reusable Feature Component for Core Features Section
const Feature = ({ icon, title, children }) => (
  <div className="flex items-start space-x-4">
    {icon}
    <div>
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      <p className="text-slate-600">{children}</p>
    </div>
  </div>
);

export default About;

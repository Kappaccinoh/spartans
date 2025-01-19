'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section with Background */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Ultimate Frisbee"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
              SPARTANS
            </h1>
            <p className="text-2xl text-gray-200 mb-8">
              Kuala Lumpur's Premier Ultimate Frisbee Club
            </p>
            <div className="flex gap-6 justify-center">
              <Link href="/profile">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary shine-effect"
                >
                  <span className="text-white">Get Started</span>
                </motion.div>
              </Link>
              <a href="#about">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline shine-effect"
                >
                  <span>Learn More</span>
                </motion.div>
              </a>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDownIcon className="h-8 w-8 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Mission & Philosophy with Parallax */}
      <div id="about" className="relative py-24 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto mb-16 text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Philosophy</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Building champions through dedication, transparency, and continuous growth.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
            {[
              {
                title: "Excellence",
                description: "Striving for continuous improvement in every aspect of the game.",
                icon: "🏆",
                gradient: "from-gray-800 to-gray-700"
              },
              {
                title: "Community",
                description: "Building strong bonds through shared goals and mutual support.",
                icon: "🤝",
                gradient: "from-gray-800 to-gray-700"
              },
              {
                title: "Growth",
                description: "Fostering personal and collective development on and off the field.",
                icon: "📈",
                gradient: "from-gray-800 to-gray-700"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">What Sets Us Apart</h2>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-2 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Training Excellence</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500/50 rounded-full mr-3"></span>
                    Structured training programs
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500/50 rounded-full mr-3"></span>
                    Performance tracking
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500/50 rounded-full mr-3"></span>
                    Professional coaching
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Community Focus</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500/50 rounded-full mr-3"></span>
                    Regular team events
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500/50 rounded-full mr-3"></span>
                    Mentorship programs
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500/50 rounded-full mr-3"></span>
                    Inclusive environment
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24">
        <div className="absolute inset-0">
          <Image
            src="/cta-bg.jpg"
            alt="Ultimate Frisbee Action"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80" />
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Join?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Take your game to the next level with Spartans. Join a community of passionate players dedicated to excellence.
            </p>
            <Link href="/profile">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary shine-effect inline-block"
              >
                <span className="text-white">Start Your Journey</span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
            {/* About Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Spartans</h3>
              <p className="text-gray-400 text-sm">
                Kuala Lumpur's premier Ultimate Frisbee club, dedicated to excellence, community, and continuous growth.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a href="https://instagram.com" className="text-gray-400 hover:text-pink-400 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2z"></path>
                  </svg>
                </a>
                <a href="https://twitter.com" className="text-gray-400 hover:text-blue-300 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/profile" className="text-gray-400 hover:text-white transition-colors">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/actions" className="text-gray-400 hover:text-white transition-colors">
                    Training Log
                  </Link>
                </li>
                <li>
                  <Link href="/tournaments" className="text-gray-400 hover:text-white transition-colors">
                    Tournaments
                  </Link>
                </li>
                <li>
                  <Link href="/milestones" className="text-gray-400 hover:text-white transition-colors">
                    Milestones
                  </Link>
                </li>
              </ul>
            </div>

            {/* Training */}
            <div>
              <h3 className="text-white font-semibold mb-4">Training</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Tuesday 7:00 PM - 9:00 PM</li>
                <li className="text-gray-400">Thursday 7:00 PM - 9:00 PM</li>
                <li className="text-gray-400">Saturday 4:00 PM - 6:00 PM</li>
                <li className="text-gray-400 mt-4">
                  Location: Padang Merbok, KL
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:info@spartansfrisbee.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                    info@spartansfrisbee.com
                  </a>
                </li>
                <li>
                  <a href="tel:+60123456789" className="text-gray-400 hover:text-blue-400 transition-colors">
                    +60 12-345 6789
                  </a>
                </li>
                <li className="text-gray-400">
                  Kuala Lumpur, Malaysia
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Spartans Ultimate Frisbee. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

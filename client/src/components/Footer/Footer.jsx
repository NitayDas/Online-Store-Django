import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 font-sans">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-600">Contact Us</h3>
          <p>📍 Near Judge Court Mor, Dhaka</p>
          <p>📞 02223389807</p>
          <p>✉️ fakestore@gmail.com</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-600">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="/about" className="hover:text-green-500 transition">About</a>
            </li>
            <li>
              <a href="/products" className="hover:text-green-500 transition">Products</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-green-500 transition">Contact</a>
            </li>
          </ul>
        </div>

        {/* Social / Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-600">Resources</h3>
          <ul className="space-y-1">
            <li>
              <a href="https://bangladesh.gov.bd/" className="hover:text-green-500 transition">
                Bangladesh National Portal
              </a>
            </li>
            <li>
              <a href="https://www.supremecourt.gov.bd/" className="hover:text-green-500 transition">
                Supreme Court
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-100 text-center py-3 text-sm text-gray-500">
        <p>© 2025 Online Storefront. All rights reserved.</p>
        <p>Developed by Utshab Technology Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;

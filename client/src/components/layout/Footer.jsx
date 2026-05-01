import { Link } from 'react-router-dom';
import { useState } from 'react';

function Footer() {
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  const handleHomeClick = (e) => {
    e.preventDefault();
    window.location.href = '/';
    setTimeout(() => {
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleBrowseArchivesClick = (e) => {
    e.preventDefault();
    window.location.href = '/';
    setTimeout(() => {
      document.getElementById("libraries-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleGalleryClick = (e) => {
    e.preventDefault();
    setShowGalleryModal(true);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Archive of Archives</h3>
            <p className="text-gray-300 text-sm">
              Preserving digital heritage and making historical 
              materials accessible to everyone.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" onClick={handleHomeClick} className="text-gray-300 hover:text-white text-sm transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/libraries" onClick={handleBrowseArchivesClick} className="text-gray-300 hover:text-white text-sm transition">
                  Browse Archives
                </a>
              </li>
              <li>
                <a href="/gallery" onClick={handleGalleryClick} className="text-gray-300 hover:text-white text-sm transition">
                  Gallery
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">CONTACT INFORMATION</h3>
            <div className="space-y-3">
              <h4 className="text-white font-semibold">Get In Touch</h4>
              <p className="text-gray-300 text-sm">📍 Delhi, India</p>
              <p className="text-gray-300 text-sm">📞 8092828067</p>
              <p className="text-gray-300 text-sm">✉️ libraryarchivesdelhi@gmail.com</p>
            </div>
          </div>

          {/* Become a Contributor */}
          <div>
            <h3 className="text-lg font-semibold mb-4">BECOME A CONTRIBUTOR</h3>
            <p className="text-gray-300 text-sm mb-4">
              Join us in preserving digital heritage and making historical materials accessible to everyone.
            </p>
            <a
              href="https://share.google/kWAhsiU29Tu5PIaMV"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Contribute
            </a>
          </div>

        </div>
        
        {/* Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Archive of Archives. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Preserving history, one digital archive at a time.
          </p>
        </div>

      </div>
      
      {/* Gallery Modal */}
      {showGalleryModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowGalleryModal(false)}
        >
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Gallery</h3>
            <p className="text-gray-600 mb-6">Gallery will be available soon</p>
            <button
              onClick={() => setShowGalleryModal(false)}
              className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
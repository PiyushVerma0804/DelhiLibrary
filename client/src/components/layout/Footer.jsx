import { Link } from 'react-router-dom';

function Footer() {
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
                <Link to="/" className="text-gray-300 hover:text-white text-sm transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/libraries" className="text-gray-300 hover:text-white text-sm transition">
                  Browse Archives
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-white text-sm transition">
                  Gallery
                </Link>
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
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
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
    </footer>
  );
}

export default Footer;
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
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white text-sm transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
                    
          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              
              {/* Facebook placeholder */}
              <span className="h-6 w-6 flex items-center justify-center text-sm font-bold text-gray-400 hover:text-white cursor-pointer">
                f
              </span>

              {/* Twitter placeholder */}
              <span className="h-6 w-6 flex items-center justify-center text-sm font-bold text-gray-400 hover:text-white cursor-pointer">𝕏</span>

            </div>
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
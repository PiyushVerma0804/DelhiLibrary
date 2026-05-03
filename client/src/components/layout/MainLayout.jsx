import Navbar from './Navbar';
import Footer from './Footer';

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="text-gray-800 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;

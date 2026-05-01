import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import LibrariesSection from '../components/sections/LibrariesSection';
import Sidebar from '../components/sections/Sidebar';

function Home() {
  return (
    <main>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <About />
            <LibrariesSection />
          </div>
          <Sidebar />
        </div>
      </div>
    </main>
  );
}

export default Home;

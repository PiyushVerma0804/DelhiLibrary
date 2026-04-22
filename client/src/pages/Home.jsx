import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import LibrariesSection from '../components/sections/LibrariesSection';
import Contact from '../components/sections/Contact';

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <LibrariesSection />
      <Contact />
    </main>
  );
}

export default Home;

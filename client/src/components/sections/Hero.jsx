import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80)',
          opacity: 0.7
        }}
        role="img"
        aria-label="Library background"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 flex flex-col items-center gap-6">
        {/* Title */}
        <h1 className="font-display text-white font-light leading-tight text-4xl sm:text-5xl lg:text-6xl">
          Explore The Best<br />
          <em className="text-white not-italic">Libraries in Delhi</em>
        </h1>

        {/* Subtitle */}
        <p className="text-white/80 text-lg max-w-lg mx-auto leading-relaxed font-light">
          Discover Delhi's most treasured repositories of knowledge — from grand colonial archives to modern learning hubs, each with a story to tell.
        </p>

        {/* Actions */}
        <div className="flex gap-4 mt-4 justify-center">
          <button
            onClick={() => {
              document.getElementById("libraries-section")?.scrollIntoView({
                behavior: "smooth"
              });
            }}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-full text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            aria-label="Explore Libraries"
          >
            <span className="w-4 h-4">→</span>
            Explore Libraries
          </button>

          <button
            onClick={() => {
              document.getElementById("about-section")?.scrollIntoView({
                behavior: "smooth"
              });
            }}
            className="inline-flex items-center gap-2 bg-transparent hover:bg-white hover:text-primary-600 text-primary-600 border-2 border-white/30 hover:border-white font-semibold py-3 px-8 rounded-full text-base transition-all duration-300 hover:-translate-y-0.5"
            aria-label="Learn More"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;

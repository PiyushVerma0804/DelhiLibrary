import { Link, useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleExplore = () => {
    if (token) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80)'
      }}
    >

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="w-8 h-px bg-[#d4a017]" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[#d4a017]">
            Digital Archive
          </span>
        </div>

        {/* Title (FIXED: now light text) */}
        <h1 className="font-serif font-light leading-tight mb-6 text-[#f8f5f0]" 
            style={{ fontSize: 'clamp(2.6rem, 6vw, 4.8rem)' }}>
          Archive of Archives
        </h1>

        {/* Subtitle (FIXED contrast) */}
        <p className="text-lg leading-relaxed mb-12 max-w-2xl mx-auto text-[#e7e2d9]">
          A living repository of photographs, documents, and field notes preserving
          the historical and cultural memory of Delhi's libraries.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          <button
            onClick={handleExplore}
            className="px-8 py-3 font-medium rounded-full transition-all duration-300 hover:shadow-lg bg-[#a07c45] text-white border-2 border-[#a07c45] hover:bg-[#8a6a3d]"
          >
            Explore Archive
          </button>
          
          <Link
            to="/login"
            className="px-8 py-3 font-medium rounded-full transition-all duration-300 border-2 border-[#f8f5f0] text-[#f8f5f0] hover:bg-[#f8f5f0] hover:text-black"
          >
            Sign In
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Hero;


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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80)',
          opacity: 0.22
        }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(184,134,11,0.18) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(139,58,42,0.14) 0%, transparent 55%)
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-6">
          <div 
            className="w-8 h-px"
            style={{ backgroundColor: '#d4a017' }}
          />
          <span 
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: '#d4a017', letterSpacing: '0.22em' }}
          >
            Digital Archive
          </span>
        </div>

        {/* Title */}
        <h1 
          className="font-serif font-light leading-tight mb-6"
          style={{ 
            fontSize: 'clamp(2.6rem, 6vw, 4.8rem)',
            color: '#1a1209',
            fontWeight: 300
          }}
        >
          Archive of Archives
        </h1>

        {/* Subtitle */}
        <p 
          className="text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
          style={{ color: '#8a8074' }}
        >
          A living repository of photographs, documents, and field notes preserving
          the historical and cultural memory of Delhi's libraries.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleExplore}
            className="px-8 py-3 font-medium rounded-full transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: '#b8860b',
              color: '#fff',
              border: '2px solid #b8860b'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#d4a017';
              e.target.style.borderColor = '#d4a017';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#b8860b';
              e.target.style.borderColor = '#b8860b';
            }}
          >
            Explore Archive
          </button>
          
          <Link
            to="/login"
            className="px-8 py-3 font-medium rounded-full transition-all duration-300 border-2 hover:shadow-lg"
            style={{
              backgroundColor: 'transparent',
              color: '#b8860b',
              borderColor: '#b8860b'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#b8860b';
              e.target.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#b8860b';
            }}
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;

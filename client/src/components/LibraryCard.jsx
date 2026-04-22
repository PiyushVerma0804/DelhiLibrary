function LibraryCard({ library, onClick }) {
  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
      style={{ borderRadius: '12px' }}
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative h-60 overflow-hidden">
        {library.imageUrl ? (
          <img
            src={library.imageUrl}
            alt={library.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/400x300/f5f0e8/1a1209?text=Library";
            }}
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: '#f5f0e8' }}
          >
            <span style={{ color: '#1a1209', opacity: 0.5 }}>No Image</span>
          </div>
        )}
        
        {/* Badge */}
        <div 
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
          style={{
            backgroundColor: '#b8860b',
            color: '#fff',
            letterSpacing: '0.12em'
          }}
        >
          Archive
        </div>
      </div>

      {/* Content Section */}
      <div className="p-7">
        <h3 
          className="font-serif font-semibold text-xl mb-2 leading-tight"
          style={{ 
            color: '#1a1209',
            fontSize: '1.6rem',
            fontWeight: 600
          }}
        >
          {library.name}
        </h3>
        
        <p 
          className="text-sm leading-relaxed mb-4"
          style={{ 
            color: '#8a8074',
            fontSize: '0.9rem',
            lineHeight: 1.7
          }}
        >
          {library.description}
        </p>

        {/* Location */}
        <div className="flex items-center text-sm" style={{ color: '#8a8074' }}>
          <svg 
            className="w-4 h-4 mr-2" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
              clipRule="evenodd" 
            />
          </svg>
          Delhi, India
        </div>
      </div>
    </div>
  );
}

export default LibraryCard;

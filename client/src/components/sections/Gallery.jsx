import { Link } from 'react-router-dom';

function Gallery() {
  const galleryItems = [
    {
      id: 1,
      title: "Historical Manuscripts",
      category: "Documents",
      image: "https://images.unsplash.com/photo-1532152237343-583bb7270b66?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Rare Maps Collection",
      category: "Maps",
      image: "https://images.unsplash.com/photo-156933698092-583bb7270b66?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Field Research Notes",
      category: "Notes",
      image: "https://images.unsplash.com/photo-1434034314919-261b2635e69?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Photographic Archive",
      category: "Photographs",
      image: "https://images.unsplash.com/photo-1589997237348-1b8c3c2e1b5?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Ancient Texts",
      category: "Collections",
      image: "https://images.unsplash.com/photo-1456513985016-28b24d77566?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Historical Documents",
      category: "Archives",
      image: "https://images.unsplash.com/photo-1456513985016-28b24d77566?w=800&h=600&fit=crop"
    }
  ];

  return (
    <section className="py-12">
        <div className="text-center">
          <p className="text-primary-600 text-sm font-semibold tracking-widest uppercase mb-3">
            Gallery Highlights
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">
            Curated Collections
          </h2>
          <p className="text-neutral-600 text-base max-w-lg mx-auto">
            Explore our carefully selected digitized historical materials
            and archival treasures from Delhi's libraries.
          </p>
        </div>

        {/* Gallery Grid - Uneven Layout */}
        <div className="grid grid-cols-3 grid-rows-auto gap-4 mt-12">
          {/* Large Feature Item */}
          <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
            <div className="relative h-80 overflow-hidden">
              <img
                src={galleryItems[0].image}
                alt={galleryItems[0].title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x600?text=Gallery+Image";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/65 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-5">
                <span className="text-white font-display text-xl font-light italic">
                  {galleryItems[0].title}
                </span>
              </div>
            </div>
          </div>

          {/* Regular Grid Items */}
          {galleryItems.slice(1).map((item, index) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=Gallery+Image";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/65 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-5">
                  <span className="text-white font-display text-xl font-light italic">
                    {item.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            View Full Gallery
            <span className="ml-3 w-5 h-5 text-primary-600">→</span>
          </button>
        </div>
    </section>
  );
}

export default Gallery;

import { useEffect, useRef } from 'react';

function Sidebar() {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    if (sidebarRef.current) {
      observer.observe(sidebarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleContributeClick = () => {
    window.open("https://share.google/kWAhsiU29Tu5PIaMV", "_blank", "noopener,noreferrer");
  };

  return (
    <aside className="w-full lg:w-80 lg:sticky lg:top-24 self-start">
      <div
        ref={sidebarRef}
        className="border border-blue-200 rounded-md p-6 shadow-sm"
        style={{
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'opacity 500ms ease, transform 500ms ease'
        }}
      >
        <div className="space-y-8">
          {/* Team Section */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#6f655f] mb-4 font-bold">
              MEET THE TEAM: ARCHIVE OF ARCHIVES
            </p>

            <img
              src="/team-photo.jpg"
              alt="Team"
              className="w-full h-[180px] object-cover rounded-md mb-3"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/800x180?text=Team+Photo";
              }}
            />

            <div className="flex justify-center gap-6 text-xs text-[#1f1a17] text-center">
              <span>Aakanksha Singh</span>
              <span>Shamiparna Chatterjee</span>
              <span>Titiksha Monga</span>
            </div>
          </div>

          <div className="border-t border-[#ddd2c1] pt-6 mt-6">
            {/* Contributor Section */}
            <div>
              <p className="text-xs uppercase tracking-widest text-[#6f655f] mb-4">
                Contributor
              </p>

              <h3 className="text-lg font-semibold text-[#1f1a17] mb-3">
                Become a contributor
              </h3>

              <p className="text-sm text-[#6f655f] mb-4">
                Share your experience anonymously and help us analyse Delhi libraries better
              </p>

              <button
                onClick={handleContributeClick}
                className="w-full bg-[#a07c45] hover:bg-[#8a6a3d] text-white py-3 px-4 rounded-md font-medium transition-colors"
              >
                Contribute
              </button>
            </div>
          </div>

          <div className="border-t border-[#ddd2c1] pt-6 mt-6">
            {/* Map Section */}
            <div>
              <p className="text-xs uppercase tracking-widest text-[#6f655f] mb-4">
                Map
              </p>

              <h3 className="text-lg font-semibold text-[#1f1a17] mb-3">
                Navigate with us
              </h3>

              <div className="rounded-md overflow-hidden h-[380px]">
                <iframe
                  src="https://www.google.com/maps/d/embed?mid=1bqBwWs_SZmad_rZ6YgKqPcTL9Hh4gx4&ehbc=2E312F"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Libraries Map"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

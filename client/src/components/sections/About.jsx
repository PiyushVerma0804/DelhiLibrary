function About() {
  return (
    <section id="about-section" className="py-12 mb-12">
      <div className="max-w-3xl mx-auto">
        
        {/* Centered Heading */}
        <div className="text-center mb-10">
          <p className="text-primary-600 text-sm font-semibold tracking-wider uppercase mb-3">
            About
          </p>

          <h2 className="text-2xl md:text-3xl font-display font-semibold">
            Why Libraries Matter in a Changing World
          </h2>
        </div>

        {/* Left-aligned content */}
        <div className="text-left">
          
          {/* Vision */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-neutral-800 mb-3">
              Vision
            </h3>
            <p className="text-neutral-600 text-base leading-relaxed">
              To re-envision libraries in Delhi as living cultural spaces where knowledge, memory, and community intersect, highlighting their evolving significance in an age shaped by rapid digital transformation, foregrounding the voices and experiences of users as central to understanding these spaces, and preserving the library as both a repository of the past and a gateway to the future.
            </p>
          </div>

          {/* Mission */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-3">
              Mission
            </h3>
            <p className="text-neutral-600 text-base leading-relaxed">
              To document and analyse people’s lived experiences in libraries, understand their relevance in the digital age, and highlight how these spaces continue to shape learning, access, and community.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;
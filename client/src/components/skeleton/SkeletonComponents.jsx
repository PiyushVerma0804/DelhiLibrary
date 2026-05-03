export function CardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="h-44 bg-gray-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
        </div>
        <div className="space-y-1.5 pt-2">
          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>
        <div className="pt-3 mt-2">
          <div className="h-9 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <div className="space-y-3">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
      </div>
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/4" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/4" />
      </div>
      <div className="flex gap-2 pt-3">
        <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse" />
        <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="min-h-screen pt-20">
      <div className="bg-primary-900 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/4" />
            <div className="h-10 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
        </div>
      </div>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="w-full h-80 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="h-7 bg-gray-200 rounded animate-pulse w-1/4 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-200 rounded-lg p-4 h-32 animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

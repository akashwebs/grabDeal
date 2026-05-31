export default function Loading() {
  return (
    <div className="min-h-screen bg-[#fff5f8]">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-6 flex h-16 items-center justify-between rounded-2xl bg-white px-6 shadow-sm">
          <div className="h-8 w-32 animate-pulse rounded bg-purple-100" />
          <div className="hidden gap-4 md:flex">
            <div className="h-6 w-20 animate-pulse rounded bg-purple-100" />
            <div className="h-6 w-20 animate-pulse rounded bg-purple-100" />
            <div className="h-6 w-20 animate-pulse rounded bg-purple-100" />
          </div>
        </div>

        {/* Hero Skeleton */}
        <div className="h-[260px] animate-pulse rounded-[28px] bg-purple-100 shadow-xl md:h-[500px]" />

        {/* Section Skeleton */}
        {[1, 2, 3].map((section) => (
          <div key={section} className="mt-12">
            <div className="mb-6">
              <div className="mb-3 h-4 w-28 animate-pulse rounded bg-purple-100" />
              <div className="h-8 w-56 animate-pulse rounded bg-purple-100" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl bg-white p-4 shadow-sm"
                >
                  <div className="h-44 animate-pulse rounded-2xl bg-purple-100" />
                  <div className="mt-4 h-5 w-24 animate-pulse rounded bg-purple-100" />
                  <div className="mt-3 h-4 w-40 animate-pulse rounded bg-purple-100" />
                  <div className="mt-5 h-9 w-full animate-pulse rounded-xl bg-purple-100" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
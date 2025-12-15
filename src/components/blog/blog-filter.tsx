'use client'

export function BlogFilter() {
  const categories = ['All', 'React', 'Next.js', 'AI/ML', 'TypeScript', 'CSS', 'Performance']
  
  return (
    <div className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === 'All' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
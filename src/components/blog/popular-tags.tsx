'use client'

export function PopularTags() {
  const tags = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'CSS', 'Node.js', 
    'AI/ML', 'Web Development', 'Tutorial', 'Best Practices', 'Performance', 'Accessibility'
  ]
  
  return (
    <div className="py-8 px-6 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 text-center">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm hover:bg-purple-100 dark:hover:bg-purple-800 cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
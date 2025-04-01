export default function EmptyState({ title, description, icon }) {
       return (
              <div className="p-12 text-center">
                     <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                            {icon}
                     </div>
                     <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                            {title}
                     </h3>
                     <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                            {description}
                     </p>
              </div>
       )
}
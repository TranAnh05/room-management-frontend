import Header from './Header/Header'

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        {children}
      </main>

      <footer className="border-t border-slate-200/80 bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Room Management - Vananhdev.</p>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
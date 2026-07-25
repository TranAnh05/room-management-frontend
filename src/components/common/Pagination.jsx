import { useMemo } from 'react'

function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) {
  // create an array of ... when the total pages is much
  const pageNumbers = useMemo(() => {
    const pages = []
    const siblingCount = 1 // the number of displayed page numbers on each side of the current page

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      const leftSibling = Math.max(currentPage - siblingCount, 1)
      const rightSibling = Math.min(currentPage + siblingCount, totalPages)

      const showLeftDots = leftSibling > 2
      const showRightDots = rightSibling < totalPages - 1

      if (!showLeftDots && showRightDots) {
        const leftItemCount = 3 + 2 * siblingCount
        const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
        return [...leftRange, '...', totalPages]
      }

      if (showLeftDots && !showRightDots) {
        const rightItemCount = 3 + 2 * siblingCount
        const rightRange = Array.from(
          { length: rightItemCount },
          (_, i) => totalPages - rightItemCount + i + 1
        )
        return [1, '...', ...rightRange]
      }

      if (showLeftDots && showRightDots) {
        const middleRange = Array.from(
          { length: rightSibling - leftSibling + 1 },
          (_, i) => leftSibling + i
        )
        return [1, '...', ...middleRange, '...', totalPages]
      }
    }

    return pages
  }, [currentPage, totalPages])

  if (totalPages <= 0) return null

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }
  return (
    <div className="flex flex-col sm:flex-row items-center justify-end gap-4 py-3 px-1">
      <nav
        aria-label="Pagination"
        className="inline-flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200/80 shadow-xs"
      >
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 1}
          aria-label="Trang trước"
          className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex sm:hidden items-center px-3 text-xs font-bold text-slate-700">
          <span>{currentPage}</span>
          <span className="mx-1 text-slate-300">/</span>
          <span className="text-slate-400">{totalPages}</span>
        </div>

        <div className="hidden sm:flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-9 h-9 flex items-center justify-center text-xs font-semibold text-slate-400 select-none"
                >
                  •••
                </span>
              )
            }

            const isCurrent = page === currentPage

            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={isCurrent ? 'page' : undefined}
                className={`w-9 h-9 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-600/30'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Trang kế tiếp"
          className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>
    </div>
  )
}

export default Pagination
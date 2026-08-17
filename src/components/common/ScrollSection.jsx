import { useInView } from 'react-intersection-observer'

export default function ScrollSection({ children, delay = 0 }) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Chỉ chạy hiệu ứng 1 lần
    threshold: 0.15 // Xuất hiện 15% màn hình là kích hoạt
  })

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        transition-all duration-700 ease-out transform
        ${inView
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-16 pointer-events-none'
    }
      `}
    >
      {children}
    </div>
  )
}
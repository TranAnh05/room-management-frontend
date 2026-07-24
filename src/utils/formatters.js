export const formatCurrency = (price) => {
  return price
    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    : 'Chưa có giá'
}

export const formatDate = (dateValue) => {
  if (!dateValue) return '--/--/----'

  const date = new Date(dateValue)
  if (isNaN(date.getTime())) return '--/--/----'

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}
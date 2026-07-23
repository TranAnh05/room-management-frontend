export const formatCurrency = (price) => {
  return price
    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    : 'Chưa có giá'
}
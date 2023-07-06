export const formatPropertyStatus = (value) => {
  switch (value) {
    case 0:
      return 'Đã cho thuê'
    case 1:
      return 'Sẵn sàng giao dịch'
    case 2:
      return 'Đang chờ duyệt'
    case -1:
      return 'Bị hủy'
    default:
      return ''
  }
}
export const formatPropertyType = (value) => {
  switch (value) {
    case 1:
      return 'Căn hộ'
    case 2:
      return 'Nhà phố'
    case 3:
      return 'Đất nền'
    case 4:
      return 'Chung cư'
    default:
      return ''
  }
}
export const formatDateTime = (datetime) => {
  const date = new Date(datetime)
  return date.toLocaleDateString('en-GB') // 👉️ Sat Sep 24 2022
}
export const formatFormData = (data) => {
  return Object.keys(data).reduce((form, key) => {
    if (data[key] != null && typeof data[key] != 'undefined') {
      form.append(key, data[key])
      if (Array.isArray(data[key]) && data[key].length > 0)
        data[key].forEach((el) => {
          form.append(key, el)
        })
    }
    return form
  }, new FormData())
}
export const formatMoney = (money) => {
  if (isNaN(money)) return 0
  return money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}

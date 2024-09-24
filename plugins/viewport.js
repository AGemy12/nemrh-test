export default function ({ app }) {
  // حساب الطول الفعلي للشاشة
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  // استدعاء الدالة عند تحميل الصفحة
  setViewportHeight()

  // تحديث الطول عند تغيير حجم الشاشة
  window.addEventListener('resize', setViewportHeight)
}

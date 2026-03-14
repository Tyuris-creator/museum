const gallery = document.querySelector(".gallery")
const images = gallery.querySelectorAll(".slide-in")

function debounce(func, wait = 20, immediate = true) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

function checkSlide() {
  // Получаем текущую позицию скролла + высоту окна
  const windowBottom = window.scrollY + window.innerHeight

  images.forEach((image) => {
    // Получаем позицию изображения относительно документа
    const imageRect = image.getBoundingClientRect()
    const imageTop = window.scrollY + imageRect.top
    const imageBottom = imageTop + imageRect.height

    // Вычисляем точку активации (50% высоты изображения)
    const activationPoint = imageTop + imageRect.height * 0.5

    // Проверяем условия:
    // 1. Нижняя граница окна прошла точку активации
    // 2. Изображение еще не вышло из области видимости сверху
    const shouldActivate = windowBottom > activationPoint
    const stillVisible = window.scrollY < imageBottom

    if (shouldActivate && stillVisible) {
      image.classList.add("active")
    } else {
      image.classList.remove("active")
    }
  })
}

// Инициализация при загрузке
window.addEventListener("load", checkSlide)
window.addEventListener("scroll", debounce(checkSlide))
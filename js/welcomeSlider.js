const sliderArr = [
  "./assets/img/welcome-slider/1.jpg",
  "./assets/img/welcome-slider/2.jpg",
  "./assets/img/welcome-slider/3.jpg",
  "./assets/img/welcome-slider/4.jpg",
  "./assets/img/welcome-slider/5.jpg",
]

function shuffle(array) {
  let currentIndex = array.length
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
}

shuffle(sliderArr)

const welcomeBg = document.getElementById("welcomeBg")
console.log(welcomeBg)
const slider = document.getElementById("slider")
const buttonsContainer = slider.querySelector(".btn-switchers")
const prevButton = buttonsContainer.querySelector(".btnPrev")
const nextButton = buttonsContainer.querySelector(".btnCurr")
const picPrev = slider.querySelector(".picPrev")
const picCurr = slider.querySelector(".picCurr")
const icons__nav = slider.getElementsByClassName("square")

const bgColor = document.querySelector(".bg-color") // make touch swiper for it

let index = 0

window.addEventListener("DOMContentLoaded", function () {
  welcomeBg.style.backgroundImage = `url(${sliderArr[0]})`
  icons__nav[0].classList.add("active")

  let xStart = 0
  let xMove = 0
  let isMoving = false
  let deltaX = 0
  bgColor.addEventListener("mousedown", function (e) {
    e.preventDefault()
    isMoving = true
    xStart = e.pageX 
  })

  bgColor.addEventListener("mouseup", function () {
    isMoving = false
    if (deltaX < -5) {
      index += 1
      if (index > sliderArr.length - 1) {
        index = 0
      }
      Array.from(icons__nav).forEach((el, i) => {
        if (i == index) {
          el.classList.add("active")
        } else {
          el.classList.remove("active")
        }
      })
      welcomeBg.style.backgroundImage = `url(${sliderArr[index]})`
      picPrev.textContent = index + 1
    } else if (deltaX > 5) {
      index -= 1
      if (index < 0) {
        index = sliderArr.length - 1
      }
      welcomeBg.style.backgroundImage = `url(${sliderArr[index]})`
      picPrev.textContent = index + 1
      Array.from(icons__nav).forEach((el, i) => {
        if (i == index) {
          el.classList.add("active")
        } else {
          el.classList.remove("active")
        }
      })
    }

    deltaX = 0
    xMove = 0
    xStart = 0
    isMoving = false
  })

  bgColor.addEventListener("mousemove", function (e) {
    if (isMoving) {
      xMove = e.pageX
      // Пример перемещения элемента
      deltaX = xMove - xStart // Разница между текущим и начальным положением
      // Перемещение элемента
    }
  })

  // Добавление обработчика для mouseleave
  bgColor.addEventListener("mouseleave", function () {
    isMoving = false // Останавливаем движение, если мышь покинула область
  })
})

nextButton.addEventListener("click", function () {
  index += 1
  if (index > sliderArr.length - 1) {
    index = 0
  }
  // icons__nav[index].classList.add("active")
  // if (index - 1 > 0) {
  //   icons__nav[index - 1].classList.remove("active")
  // }
  // if (index == 1) {
  //   icons__nav[0].classList.remove("active")
  // }
  // if (index == 0) {
  //   icons__nav[sliderArr.length - 1].classList.remove("active")
  // }
  Array.from(icons__nav).forEach((el, i) => {
    if (i == index) {
      el.classList.add("active")
    } else {
      el.classList.remove("active")
    }
  })
  welcomeBg.style.backgroundImage = `url(${sliderArr[index]})`
  picPrev.textContent = index + 1
})

prevButton.addEventListener("click", function () {
  index -= 1
  if (index < 0) {
    index = sliderArr.length - 1
  }
  welcomeBg.style.backgroundImage = `url(${sliderArr[index]})`
  picPrev.textContent = index + 1
  Array.from(icons__nav).forEach((el, i) => {
    if (i == index) {
      el.classList.add("active")
    } else {
      el.classList.remove("active")
    }
  })
})

Array.from(icons__nav).forEach((el, i) => {
  el.addEventListener("click", function () {
    welcomeBg.style.backgroundImage = `url(${sliderArr[i]})`
    index = parseInt(i)
    el.classList.add("active")
    picPrev.textContent = i + 1
    Array.from(icons__nav).forEach((other, otherIndex) => {
      if (otherIndex != i) {
        other.classList.remove("active")
      }
    })
  })
})


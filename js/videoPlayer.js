const container = document.querySelector(".current_video")
const video = document.querySelector(".video-main")
const start = container.querySelector(".start")

const controls = document.querySelector(".video-controlls-btns")
const fullScreen = controls.querySelector(".fullScreen")
const startPause = controls.querySelector(".startPause")

const volume = controls.querySelector(".volume")

let previousVolume = 1

// Функция для переключения звука
function toggleMute() {
  if (video.volume > 0) {
    // Сохраняем текущую громкость перед выключением звука
    previousVolume = video.volume
    // Устанавливаем громкость на 0
    setVolume(0)
    // Обновляем иконку на "mute"
    volume.setAttribute("src", "./assets/videoPlayer/mute.svg")
  } else {
    // Восстанавливаем предыдущий уровень громкости
    setVolume(previousVolume)
    // Обновляем иконку на "volume"
    volume.setAttribute("src", "./assets/videoPlayer/volume.svg")
  }
}

// Константы для ограничений скорости и шага изменения
const MIN_PLAYBACK_RATE = 0.5
const MAX_PLAYBACK_RATE = 4.0
const PLAYBACK_RATE_STEP = 0.25

function increasePlaybackRate() {
  // Рассчитываем новую скорость
  const newRate = Math.min(
    video.playbackRate + PLAYBACK_RATE_STEP,
    MAX_PLAYBACK_RATE
  )

  // Применяем если изменилась
  if (newRate !== video.playbackRate) {
    video.playbackRate = newRate
    showPlaybackRateIndicator()
  }
}

function decreasePlaybackRate() {
  // Рассчитываем новую скорость
  const newRate = Math.max(
    video.playbackRate - PLAYBACK_RATE_STEP,
    MIN_PLAYBACK_RATE
  )

  // Применяем если изменилась
  if (newRate !== video.playbackRate) {
    video.playbackRate = newRate
    showPlaybackRateIndicator()
  }
}

function showPlaybackRateIndicator() {
  // Создаем или находим элемент индикатора
  let indicator = document.querySelector(".playback-rate-indicator")

  if (!indicator) {
    indicator = document.createElement("div")
    indicator.className = "playback-rate-indicator"
    indicator.style = `
      position: absolute;
      bottom: 60px;
      right: 20px;
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 10px 15px;
      border-radius: 5px;
      font-family: Arial, sans-serif;
      z-index: 100;
      transition: opacity 0.3s;
    `
    document.querySelector(".current_video").appendChild(indicator)
  }

  // Обновляем текст и показываем
  indicator.textContent = `Скорость: ${video.playbackRate.toFixed(2)}×`
  indicator.style.opacity = "1"

  // Скрываем через 2 секунды
  clearTimeout(indicator.timeout)
  indicator.timeout = setTimeout(() => {
    indicator.style.opacity = "0"
  }, 2000)
}

function checker() {
  if (video.paused) {
    start.classList.remove("hide-video")
  } else {
    start.classList.add("hide-video")
  }
  video.paused
    ? startPause.setAttribute("src", "./assets/videoPlayer/play.svg")
    : startPause.setAttribute("src", "./assets/videoPlayer/pause.svg")
}



function toggleFullScreen() {
  if (!document.fullscreenElement) {
    // Запрашиваем FS для контейнера, а не для видео
    container.requestFullscreen().catch((err) => {
      alert("Ошибка входа в полноэкранный режим: " + err.message)
    })
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

// Обновляем иконку при изменении режима
document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    fullScreen.setAttribute("src", "./assets/videoPlayer/exitFull.svg")
  } else {
    fullScreen.setAttribute("src", "./assets/videoPlayer/full.svg")
  }
})

function setVolume(vol) {
  video.volume = parseFloat(vol)
}

volume.addEventListener("click", function () {
  video.volume > 0 ? setVolume(0) : setVolume(1)
  video.volume > 0
    ? volume.setAttribute("src", "./assets/videoPlayer/volume.svg")
    : volume.setAttribute("src", "./assets/videoPlayer/mute.svg")
})

video.addEventListener("click", function () {
  video.paused ? video.play() : video.pause()
  checker()
})

start.addEventListener("click", function () {
  video.play()
  checker()
})

fullScreen.addEventListener("click", function () {
  toggleFullScreen()
})

startPause.addEventListener("click", function () {
  video.paused ? video.play() : video.pause()

  checker()
})

// document.addEventListener("keydown", (event) => {
//   switch (event.key) {
//     case " ": // Пробел
//       event.preventDefault() // Отменяем стандартное поведение (прокрутка страницы)
//       video.paused ? video.play() : video.pause()
//       checker()
//       break
//     case "m": // Клавиша M
//       toggleMute()
//       break
//     case "f": // Клавиша F
//       toggleFullScreen()
//       break
//     case ",": // Клавиша SHIFT + ,
//       if (event.shiftKey) {
//         increasePlaybackRate()
//       }
//       break
//     case ".": // Клавиша SHIFT + .
//       if (event.shiftKey) {
//         decreasePlaybackRate()
//       }
//       break
//   }
// })

document.addEventListener("keydown", (event) => {
  switch (
    event.code // Используем event.code вместо event.key
  ) {
    case "Space": // Пробел
      event.preventDefault()
      video.paused ? video.play() : video.pause()
      checker()
      break
    case "KeyM":
      toggleMute()
      break
    case "KeyF":
      toggleFullScreen()
      break
    case "Comma":
      if (event.shiftKey) {
        increasePlaybackRate()
      }
      break
    case "Period":
      if (event.shiftKey) {
        decreasePlaybackRate()
      }
      break
  }
})

// Добавляем ползунок прогресса видео
const progressBar = document.createElement("input")
progressBar.type = "range"
progressBar.min = 0
progressBar.max = 100
progressBar.value = 0
progressBar.classList.add("video-progress")
document.querySelector(".scroll-video-bar").appendChild(progressBar)

// Добавляем ползунок громкости
const volumeSlider = document.createElement("input")
volumeSlider.type = "range"
volumeSlider.min = 0
volumeSlider.max = 100
volumeSlider.value = video.volume * 100
volumeSlider.classList.add("volume-slider")
document.querySelector(".scroll-volume-bar").appendChild(volumeSlider)

// Обновление позиции прогресса при воспроизведении
video.addEventListener("timeupdate", (e) => {
  e.preventDefault()
  const percent = (video.currentTime / video.duration) * 100
  progressBar.value = isNaN(percent) ? 0 : percent
  checker()
})

// Перемотка видео при изменении прогресса
progressBar.addEventListener("input", () => {
  const time = (progressBar.value / 100) * video.duration
  video.currentTime = time
})

// Регулировка громкости
volumeSlider.addEventListener("input", () => {
  setVolume(volumeSlider.value / 100)
  if (volumeSlider.value < 1) {
    volume.setAttribute("src", "./assets/videoPlayer/mute.svg")
  }
  if (volumeSlider.value > 0) {
    volume.setAttribute("src", "./assets/videoPlayer/volume.svg")
  }
})

// Обновление громкости при изменении системного уровня
video.addEventListener("volumechange", () => {
  volumeSlider.value = video.volume * 100
})

// Инициализация позиции прогресса при загрузке метаданных
video.addEventListener("loadedmetadata", () => {
  progressBar.value = 0
})

// Обработчик для клика по прогресс-бару (дополнительная функция)
document.querySelector(".scroll-video-bar").addEventListener("click", (e) => {
  if (e.target !== progressBar) {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    video.currentTime = percent * video.duration
    checker()
  }
})

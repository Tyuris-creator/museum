document.addEventListener("DOMContentLoaded", function () {
  const beforeAfter = document.querySelector(".before-after")
  const devider = beforeAfter.querySelector(".devider")
  const before = beforeAfter.querySelector(".before")
  const after = beforeAfter.querySelector(".after")
  let isMoving = false
  devider.addEventListener("mousedown", function (e) {
    isMoving = true
    e.preventDefault()
  })
  beforeAfter.addEventListener("mouseup", function () {
    isMoving = false
  })
  beforeAfter.addEventListener("mousemove", function (e) {
    if (!isMoving) return

    const containerRect = beforeAfter.getBoundingClientRect()
    let xPos = e.clientX - containerRect.left

    const beforePercent = (xPos / containerRect.width) * 100
    const afterPercent = 100 - beforePercent

    before.style.width = `${beforePercent}%`
    devider.style.left = `${beforePercent - 2}%`
    let left = parseInt(devider.style.left)
    if (left <= -2.9) {
      devider.style.left = "-20px"
    }
    if (left > 97.5) {
      devider.style.left = "97.5%"
    }
    after.style.width = `${afterPercent}%`
  })
  
  document.addEventListener("mouseup",function(){
    isMoving = false
  })
})

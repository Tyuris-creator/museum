const radioInputs = document.querySelectorAll(
  '.radio-input input[name="radio"]'
)
const basic = document.querySelector(".basic")
const senior = document.querySelector(".senior")

const minusB = basic.querySelector(".minus")
const plusB = basic.querySelector(".plus")
const numberB = basic.querySelector(".number")

const minusS = senior.querySelector(".minus")
const plusS = senior.querySelector(".plus")
const numberS = senior.querySelector(".number")

const totalPriceForTickets = document.querySelector(".totalPriceForTickets")

const submitForm = document.querySelector(".buy-now")
let total = localStorage.getItem("ticketData")
  ? JSON.parse(localStorage.getItem("ticketData"))?.total
  : false || 0
let valueS =
  parseInt(numberS.innerText) || localStorage.getItem("ticketData")
    ? JSON.parse(localStorage.getItem("ticketData"))?.valueS
    : false || 0
let valueB =
  parseInt(numberB.innerText) || localStorage.getItem("ticketData")
    ? JSON.parse(localStorage.getItem("ticketData"))?.valueB
    : false || 0
let valueOfTicket = localStorage.getItem("ticketData")
  ? JSON.parse(localStorage.getItem("ticketData"))?.valueOfTicket
  : false || "perm"
const ticketInfo = {
  total,
  valueB,
  valueS,
  valueOfTicket,
}

document.addEventListener("DOMContentLoaded", function () {
  console.log(console.log(total, valueB, valueS, valueOfTicket))
  totalPriceForTickets.innerText = total
  numberB.innerText = valueB
  numberS.innerText = valueS
  totalPriceForTickets.innerText = total
  radioInputs.forEach((radio) => {
    radio.checked = false
    if (radio.value == ticketInfo.valueOfTicket) {
      radio.checked = true
    }
  })
})

function updateInfo(obj) {
  obj["total"] = total
  obj["valueB"] = valueB
  obj["valueS"] = valueS
  obj["valueOfTicket"] = valueOfTicket
}
const priceBasic = {
  perm: 20,
  temp: 25,
  comb: 40,
}

const priceSenior = {
  perm: 10,
  temp: 12.5,
  comb: 20,
}

function calcalateTotal(property, i = 0) {
  if (i == 1) {
    totalPriceForTickets.innerText = `${
      valueB * priceBasic[property] + valueS * priceSenior[property]
    }`
    return (valueS + valueB) * priceBasic[property]
  } else {
    totalPriceForTickets.innerText = `${
      valueB * priceBasic[property] + valueS * priceSenior[property]
    }`
  }
}

function increaseTicket(info, obj, type) {
  console.log(info, obj, type)
  total += Number(obj[type])
  info.innerText = total
}
function decreaseTicket(info, obj, type) {
  console.log(info, obj, type)
  total -= Number(obj[type])
  if (total <= 0) {
    total = 0
  }
  info.innerText = total
}

radioInputs.forEach((radio) => {
  radio.addEventListener("change", function () {
    if (this.checked) {
      // Получаем значение выбранной кнопки
      valueOfTicket = this.value
      calcalateTotal(radio.value)
      console.log(valueOfTicket)
    }

    updateInfo(ticketInfo)
    localStorage.setItem("ticketData", JSON.stringify(ticketInfo))
  })
})

minusS.addEventListener("click", function (e) {
  e.preventDefault()
  valueS--
  if (valueS < 0) {
    valueS = 0
    total =
      valueB * priceBasic[valueOfTicket] + valueS * priceSenior[valueOfTicket]
    return
  }
  
  numberS.innerText = valueS
  decreaseTicket(totalPriceForTickets, priceSenior, valueOfTicket)
  updateInfo(ticketInfo)
  localStorage.setItem("ticketData", JSON.stringify(ticketInfo))
})

plusS.addEventListener("click", function (e) {
  e.preventDefault()
  valueS++
  numberS.innerText = valueS
  increaseTicket(totalPriceForTickets, priceSenior, valueOfTicket)
  updateInfo(ticketInfo)
  localStorage.setItem("ticketData", JSON.stringify(ticketInfo))
})

minusB.addEventListener("click", function (e) {
  e.preventDefault()
  valueB--
  if (valueB < 0) {
    valueB = 0
    total =
      valueB * priceBasic[valueOfTicket] + valueS * priceSenior[valueOfTicket]
    return
  }
  
  numberB.innerText = valueB
  decreaseTicket(totalPriceForTickets, priceBasic, valueOfTicket)
  updateInfo(ticketInfo)
  localStorage.setItem("ticketData", JSON.stringify(ticketInfo))
})

plusB.addEventListener("click", function (e) {
  e.preventDefault()
  valueB++
  numberB.innerText = valueB
  increaseTicket(totalPriceForTickets, priceBasic, valueOfTicket)
  updateInfo(ticketInfo)
  localStorage.setItem("ticketData", JSON.stringify(ticketInfo))
})

// Вместо кнопки получаем форму
const form = document.querySelector(".ticket-panel")

// Вешаем обработчик на форму, а не на кнопку
form.addEventListener("submit", function (e) {
  e.preventDefault() // Блокируем переход на другую страницу
  console.log(ticketInfo)
  if (total > 0) {
    localStorage.setItem("ticketData", JSON.stringify(ticketInfo))
    window.location.href = "./buyNowPage.html"
  } else {
    alert("Please select at least one ticket")
  }
})

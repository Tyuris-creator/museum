const burger = document.querySelector(".burger");
const welcome = document.querySelector(".welcome-nav")
const welcome__header = document.querySelector(".welcome__header")
burger.addEventListener('click',function(){
  burger.classList.toggle('close')
  welcome.classList.toggle('show')
  welcome__header.classList.toggle('visibility')
})



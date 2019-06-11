var slides = document.querySelectorAll('.slide');
var contents = document.querySelectorAll('.contents');
var next = document.querySelector('#next');
var prev = document.querySelector('#prev');
var button1 = document.querySelector('#oneb');
var button2 = document.querySelector('#twob');
var button3 = document.querySelector('#threeb');
var blur1 = document.querySelector('#blurr1');
var blur2 = document.querySelector('#blurr2');

var auto = false;
var intervalTime = 5000;
let slideInterval;

var nextSlide = () =>{
  var current = document.querySelector('.current');
  current.classList.remove('current');
  if(current.nextElementSibling){
    current.nextElementSibling.classList.add('current');
  }else{
    slides[0].classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
}

var prevSlide = () =>{
  var current = document.querySelector('.current');
  current.classList.remove('current');
  if(current.previousElementSibling){
    current.previousElementSibling.classList.add('current');
  }else{
    slides[slides.length-1].classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
}

next.addEventListener('click', ()=>{
  nextSlide();
  if(auto){
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});
prev.addEventListener('click', ()=>{
  prevSlide();
  if(auto){
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});
//
button1.addEventListener('click', ()=> {
  var curr = document.querySelector('.curr');
  curr.classList.remove('curr');

  contents[0].classList.add('curr');
});
button2.addEventListener('click', ()=> {
  var curr = document.querySelector('.curr');
  curr.classList.remove('curr');

  contents[1].classList.add('curr');
});
button3.addEventListener('click', ()=> {
  var curr = document.querySelector('.curr');
  curr.classList.remove('curr');

  contents[2].classList.add('curr');
});

blur1.addEventListener('click', () => {
  var blurred = document.querySelector('.blurred');
  blurred.classList.remove('blurred');

  blur2.classList.add('blurred');

});
blur2.addEventListener('click', () => {
  var blurred = document.querySelector('.blurred');
  blurred.classList.remove('blurred');
  blur1.classList.add('blurred');
});



//auto slide feature
if(auto){
  slideInterval = setInterval(nextSlide, intervalTime);
}

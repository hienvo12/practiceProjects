var slides = document.querySelectorAll('.slide');
var next = document.querySelector('#next');
var prev = document.querySelector('#prev');
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

//auto slide feature
if(auto){
  slideInterval = setInterval(nextSlide, intervalTime);
}

const navigation = document.querySelector('nav');    
const navLinks = document.querySelectorAll('.nav_link'); 
const logoBox = document.querySelector('.nav_logo');
const navTitle = document.querySelector('.nav_title');
const timeOpen = document.querySelector('.time');    
const mobileFoot =  document.querySelector('footer');
    
function hideTitle(e){
	if(window.pageYOffset > document.documentElement.clientHeight && !navigation.classList.contains('open_navigation')){
		logoBox.classList.add('hide_logo');
		timeOpen.classList.add('hide_time');
		navTitle.classList.add('hide_title');
		navigation.classList.add('short_nav');
		for( let link of navLinks){          link.classList.add('short_link');
		}
		mobileFoot.classList.remove('hide_foot');

	} else {
		logoBox.classList.remove('hide_logo');
		timeOpen.classList.remove('hide_time');
		navTitle.classList.remove('hide_title');        
		navigation.classList.remove('short_nav');
		for( let link of navLinks){          link.classList.remove('short_link');
		}
		mobileFoot.classList.add('hide_foot');

	}
}    
    
document.addEventListener('scroll', hideTitle); 
    
const burgerButton = document.querySelector('.burger_container');
        
function openMenu(e) {
    
	if(navigation.classList.contains('short_nav')) {
		navigation.classList.remove('short_nav');
	}
	navigation.classList.toggle('open_navigation');   
	burgerButton.classList.toggle('close_burger');   
}
    
burgerButton.addEventListener('click', openMenu);     
    
    
const topButton = document.querySelector('.to_top');
    
function moveToTop() {
	window.scrollTo(0,0);  
} 
    
function showUpButton(e){
	if(window.pageYOffset > document.documentElement.clientHeight){
		topButton.style.transform = 'scale(1)';
	}   
	else{
		topButton.style.transform = 'scale(0)';
	}
}
    
topButton.addEventListener('click', moveToTop); 
document.addEventListener('scroll', showUpButton);     
    
const downButton = document.querySelector('.logo_picture');
  

function moveDown() {
	window.scrollBy(0,document.documentElement.clientHeight / 2);  
}    

if(downButton) {
	downButton.addEventListener('click', moveDown);
}   
/*smooth scroll*/    
    
/*lightBox*/

const images = document.querySelectorAll('.modalclass');
    
for(let bigImage of images) {
    
	function openLightBox() {
		addOverlay();
		addCloseBtn();
		if(bigImage.classList.contains('page_picture_down')) {
			bigImage.classList.remove('page_picture_down');       bigImage.classList.add('down_lightbox');
		}   
        
		if(bigImage.classList.contains('page_picture_top')) {
			bigImage.classList.remove('page_picture_top');       bigImage.classList.add('top_lightbox');
		}        
	}
    
	bigImage.addEventListener('click', openLightBox);
    
}   

function addOverlay() {
	let overlay = document.createElement('div');
	overlay.className = 'lightbox_overlay';
	document.body.appendChild(overlay);
}

function addCloseBtn() {
	let closeBtn = document.createElement('button');
	closeBtn.className = 'close_lightbox';
	closeBtn.innerHTML = 'X';
    
	function closeLightbox() {
		let overlay = document.querySelector('.lightbox_overlay');
		let closingButton = document.querySelector('.close_lightbox');
		overlay.parentNode.removeChild(overlay);
		closingButton.parentNode.removeChild(closingButton );
    
		for(let image of images) {

			if(image.classList.contains('down_lightbox')) {
				image.classList.add('page_picture_down');
				image.classList.remove('down_lightbox');
			}   
        
			if(image.classList.contains('top_lightbox')) {
				image.classList.add('page_picture_top');
				image.classList.remove('top_lightbox');        
			}        
		}  
	}     

	closeBtn.addEventListener('click', closeLightbox);
	document.body.appendChild(closeBtn);
}      
    
/*smooth scroll*/    

function init(){
	new SmoothScroll(document,200,30); // target / speed / smoothness
}

function SmoothScroll(target, speed, smooth) {
	if (target == document)
		target = (document.documentElement || document.body.parentNode || document.body); // cross browser support for document scrolling
	let moving = false;
	let pos = target.scrollTop;
	target.addEventListener('mousewheel', scrolled, false);
	target.addEventListener('DOMMouseScroll', scrolled, false); 
    
	function scrolled(e) {
   		let delta = e.delta || e.wheelDelta;
		if (delta === undefined) {
			//we are on firefox
			delta = -e.detail;
		}
		delta = Math.max(-1, Math.min(1, delta)); // cap the delta to [-1,1] for cross browser consistency
   		pos += -delta * speed;
		pos = Math.max(0, Math.min(pos, target.scrollHeight - target.clientHeight)); // limit scrolling

		function topClicked() {
			pos = 0;
		} 

		if (!moving) update();
    
		topButton.addEventListener('click',topClicked);
	}

	function update() {
		moving = true;
		let delta = (pos - target.scrollTop) / smooth;
		target.scrollTop += delta;
		if (Math.abs(delta) > 0.5)
			requestFrame(update);
		else
			moving = false;
	}

	let requestFrame = function() { 
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(func) {
				window.setTimeout(func, 1000 / 50);
			}
		);
	}();
    
}

init();   
    
/* moving on mousemove */ 
    
function startMovement(){    
	const moveBasicElem = document.querySelectorAll('.basemove');    
	const moveElem = document.querySelectorAll('.move');
	const clipText = document.querySelector('.clip_text');
    
	let random = 0; 
    
	function generateRandom(){    
		random = Math.round((Math.random() - 0.5) * 20);
	}
    
	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}    
        
	function moveElements(moveX,moveY){
		let moveDistanceX = moveX / 100;
		let moveDistanceY = moveY / 100;
		for(let item of moveElem) {
			generateRandom();
			item.style.transform = `translate(${moveDistanceX - random}px,${moveDistanceY + random}px) scale(${getRandomArbitrary(0.95, 1.05)}) rotate(${getRandomArbitrary(-1, 1)}deg)`;
		}
    
		for(let baseitem of moveBasicElem) {
			generateRandom();
			baseitem.style.transform = `translate(${moveDistanceX - random}px,${moveDistanceY + random}px) scale(${getRandomArbitrary(1.05, 1.1)}) rotate(${getRandomArbitrary(-1, 1)}deg)`;
		}
    
		generateRandom();
		clipText.style.backgroundPosition = `${getRandomArbitrary(-20, 20)}px ${getRandomArbitrary(-20, 0)}px`;
	}

	function mouseMovement(e){
		let moveX = e.clientX;
		let moveY = e.clientY;
		moveElements(moveX,moveY);
		window.removeEventListener('mousemove',mouseMovement);
	}

	window.addEventListener('mousemove',mouseMovement);
}

setInterval(startMovement,1000);    
    
/*reveal elements*/
function displayOnScroll(e) {
        
	const allHidden = document.querySelectorAll('.move');    
	for(let elem of allHidden) {
		let box = elem.getBoundingClientRect();
		let windowSize = document.documentElement.clientHeight;
		let pagePosition = box.top + pageYOffset;
		if( pagePosition - windowSize < window.pageYOffset) {
			elem.style.transform = 'translateY(0)';
			elem.style.opacity = 1;
		}             

	}
}
window.addEventListener('scroll',displayOnScroll);

let accordionItems = document.querySelectorAll('.article_title');
let i;

for (i = 0; i < accordionItems.length; i++) {
	function openAccordion() {
		for (j = 0; j < accordionItems.length; j++) {
			if(accordionItems[j] != this){
				if(accordionItems[j].classList.contains('open_accordion')){
					accordionItems[j].classList.remove('open_accordion');
					let panel = accordionItems[j].nextElementSibling;
					panel.style.maxHeight = null;
				}
			}
		}
		this.classList.toggle('open_accordion');
		let panel = this.nextElementSibling;
		if (panel.style.maxHeight){
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + 'px';
		} 
	}
    
	accordionItems[i].addEventListener('click',openAccordion);    
}    

const toLoadPic = document.querySelectorAll('.lazypic');

const options = {
	// If the image gets within 50px in the Y axis, start the download.
	root: null, // Page as root
	rootMargin: '0%',
	threshold: 0.1
};

const fetchImage = (url) => {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.src = url;
		image.onload = resolve;
		image.onerror = reject;
	});
};

const loadImage = (image) => {
	const src = image.dataset.src;
	fetchImage(src).then(() => {
		image.src = src;
	});
};

const handleIntersection = (entries, observer) => {
	entries.forEach(entry => {
		if(entry.intersectionRatio > 0) {
			loadImage(entry.target);
		}
	});
};

// The observer for the images on the page
const observer = new IntersectionObserver(handleIntersection, options);

toLoadPic.forEach(img => {
	observer.observe(img);
});
          
  
let loaderWrapper = document.querySelector('.loader_wrapper');   
const vLoader = document.querySelector('.grape_loader');
const loaderItemFirst = document.querySelector('#ball_one');  const loaderItemSecond = document.querySelector('#ball_two');  const loaderItemThird = document.querySelector('#ball_three');   
let currentAnimationTime = 0;
const amplitude = 20;
   
function animateVertically () {  
    
	const offset = amplitude * Math.sin(currentAnimationTime);
	const offsetSecond = amplitude * (Math.sin(currentAnimationTime - 1));
	const offsetThird = amplitude * Math.sin(currentAnimationTime - 2);
    
	loaderItemFirst.style.transform = `translateY(${offset}px) rotate(45deg)`;
    
	loaderItemSecond.style.transform = `translateY(${offsetSecond}px) rotate(43deg)`;
    
	loaderItemThird.style.transform = `translateY(${offsetThird}px) rotate(40deg)`;
    
	currentAnimationTime += 0.10;
    
	requestAnimationFrame(animateVertically);
}

animateVertically();

document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages;    
  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazyback");
   
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {   
        if (entry.isIntersecting) {
          var image = entry.target;
          image.classList.remove("lazyback");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazyback");
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    

      lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazyback');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
})

function pageLoaded() {
	loaderWrapper.classList.add('hide_loader');
}  
window.addEventListener('load', pageLoaded); 
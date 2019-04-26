import './css/style.css';
import './img/icons/cv.png';
import Swiper from './js/swiper.min.js';
import scrollToElement  from 'scroll-to-element';
import * as projectsEvent from './js/projectsTemplate';
import copy  from 'copy-text-to-clipboard';
import swal from 'sweetalert';


let isHidden = true;
const sendBtn = document.querySelector('#form-btn');

// projects buttons
const project1 = document.querySelector('#project-1');
const project2 = document.querySelector('#project-2');
const project3 = document.querySelector('#project-3');
const project4 = document.querySelector('#project-4');
const project5 = document.querySelector('#project-5');
const project6 = document.querySelector('#project-6');
const project7 = document.querySelector('#project-7');

(function () {
    var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = { x: 0, y: height };

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height + 'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for (var x = 0; x < width * 0.2; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }

    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function scrollCheck() {
        if (document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;
    }

    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;

        // constructor
        (function () {
            _this.pos = {};
            init();
        })();

        function init() {
            _this.pos.x = Math.random() * width;
            _this.pos.y = height + Math.random() * 100;
            _this.alpha = 0.1 + Math.random() * 0.4;
            _this.scale = 0.1 + Math.random() * 0.11;
            _this.velocity = Math.random();
        }

        this.draw = function () {
            if (_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
            ctx.fill();
        };
    }
})();

// Load more projects btn
document.querySelector('#button-load-more').addEventListener('click', function () {
    isHidden = !isHidden;
    if (!isHidden) {
        project5.classList.add('showMore')
        project6.classList.add('showMore')
        project7.classList.add('showMore')
    } else {
        project5.classList.remove('showMore')
        project6.classList.remove('showMore')
        project7.classList.remove('showMore')
    }
    if (!isHidden) {
        document.querySelector('#text-button').innerText = 'Mniej';
        document.querySelector('#arrow-more-projects').classList.remove('arrow-down')
        document.querySelector('#arrow-more-projects').classList.add('arrow-up')
    } else {
        document.querySelector('#text-button').innerText = 'Więcej projektów'
        document.querySelector('#arrow-more-projects').classList.remove('arrow-up')
        document.querySelector('#arrow-more-projects').classList.add('arrow-down')
    }

});

// Form section
document.querySelector('#form-btn').addEventListener('click', function (e) {
    e.preventDefault();
    const inputName = document.querySelector('#input-name');
    const inputEmail = document.querySelector('#input-email');
    const inputMsg = document.querySelector('#input-msg');
    const emailTest = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValidation = emailTest.test(String(inputEmail.value).toLowerCase());
    let correctValues = false;

    if (inputName.value === '') {
        inputName.style.borderBottom = '2px solid #d9534f'
    } else {
        inputName.style.borderBottom = '2px solid #D9D9D9'
    }

    if (inputEmail.value === '') {
        inputEmail.style.borderBottom = '2px solid #d9534f'
    } else {
        inputEmail.style.borderBottom = '2px solid #D9D9D9'
    }

    if (inputMsg.value === '') {
        inputMsg.style.borderBottom = '2px solid #d9534f'
    } else {
        inputMsg.style.borderBottom = '2px solid #D9D9D9'
    }


    if (!emailValidation) {
        inputEmail.style.borderBottom = '2px solid #d9534f'
    } else {
        inputEmail.style.borderBottom = '2px solid #D9D9D9'
    }

    if (inputName.value !== '' && inputEmail.value !== '' && inputMsg.value !== '' && emailValidation) {
        correctValues = true;
    } else {
        correctValues = false;
    }

    if (correctValues) {
        if(sendBtn.value === ''){
            sendBtn.innerHTML = 'Wysłano!'
            document.querySelector('#input-name').value = '';
            document.querySelector('#input-email').value = '';
            document.querySelector('#input-msg').value = '';
            swal("", "Wiadomość została wysłana", "success");
        }else{
        sendBtn.innerHTML = '';
        }
        fetch('https://bartlomiejolech.pl/emailapi/mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputName.value,
                email: inputEmail.value,
                msg: inputMsg.value
            })
        }).then(json => {
            console.log(json)
            sendBtn.innerHTML = 'Wysłano!';
            sendBtn.disabled = true;
        }).catch(err => console.log(err))
    }
})
document.querySelector('#input-name').addEventListener('keyup', function(){
    if(sendBtn.disabled){
        sendBtn.disabled = false;
        sendBtn.innerHTML = 'Wyślij';
    }
})
document.querySelector('#input-email').addEventListener('keyup', function(){
    if(sendBtn.disabled){
        sendBtn.disabled = false;
         sendBtn.innerHTML = 'Wyślij';
    }
})
document.querySelector('#input-msg').addEventListener('keyup', function(){
    if(sendBtn.disabled){
        sendBtn.disabled = false;
         sendBtn.innerHTML = 'Wyślij';
    }
})


//show / hide projects elements
project1.addEventListener('mouseover', function() {
    projectsEvent.mouseOver('#project-1-description', '#project-1-reference')
})
project1.addEventListener('mouseout', function() {
    projectsEvent.mouseOut('#project-1-description', '#project-1-reference')
})

project2.addEventListener('mouseover', function() {
    projectsEvent.mouseOver('#project-2-description', '#project-2-reference')
})
project2.addEventListener('mouseout', function() {
    projectsEvent.mouseOut('#project-2-description', '#project-2-reference')
})

project3.addEventListener('mouseover', function() {
    projectsEvent.mouseOver('#project-3-description', '#project-3-reference')
})
project3.addEventListener('mouseout', function() {
    projectsEvent.mouseOut('#project-3-description', '#project-3-reference')
})

project4.addEventListener('mouseover', function() {
    projectsEvent.mouseOver('#project-4-description', '#project-4-reference')
})
project4.addEventListener('mouseout', function() {
    projectsEvent.mouseOut('#project-4-description', '#project-4-reference')
})

project5.addEventListener('mouseover', function() {
    projectsEvent.mouseOver('#project-5-description', '#project-5-reference')
})
project5.addEventListener('mouseout', function() {
    projectsEvent.mouseOut('#project-5-description', '#project-5-reference')
})

project6.addEventListener('mouseover', function() {
    projectsEvent.mouseOver('#project-6-description', '#project-6-reference')
})
project6.addEventListener('mouseout', function() {
    projectsEvent.mouseOut('#project-6-description', '#project-6-reference')
})

project7.addEventListener('mouseover', function() {
    projectsEvent.mouseOver('#project-7-description', '#project-7-reference')
})
project7.addEventListener('mouseout', function() {
    projectsEvent.mouseOut('#project-7-description', '#project-7-reference')
})

// Swiper 

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
//header scroll arrow
document.querySelector('#header-arrow').addEventListener('click', function() {
    scrollToElement('.about-me', {
        offset: 0,
        ease: 'inQuad',
        duration: 1000
    });
})

// parallax
document.querySelector('#parallax-btn-skills').addEventListener('click', function() {
    scrollToElement('.skills', {
        offset: 0,
        ease: 'inQuad',
        duration: 1000
    });
})

document.querySelector('#parallax-btn-projects').addEventListener('click', function() {
    scrollToElement('.section-projects', {
        offset: 0,
        ease: 'inQuad',
        duration: 1000
    });
})

//copy e-mail to clickboard
document.querySelector('#email-text').addEventListener('click', function() {
    copy('olech.bartlomiej@gmail.com')
    swal("", "E-mail został skopiowany", "success");
       
})














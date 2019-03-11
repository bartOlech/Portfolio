let isHidden = true;
const sendBtn = document.querySelector('#form-btn');

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


document.querySelector('#button-load-more').addEventListener('click', function () {
    isHidden = !isHidden;
    if (!isHidden) {
        document.querySelector('#project-6').classList.add('showMore')
        document.querySelector('#project-7').classList.add('showMore')
    } else {
        document.querySelector('#project-6').classList.remove('showMore')
        document.querySelector('#project-7').classList.remove('showMore')
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

document.querySelector('#form-btn').addEventListener('click', function (e) {
    e.preventDefault();
    console.log('click')
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
        console.log('wysyłanie...')
        if(sendBtn.value === ''){
            sendBtn.innerHTML = 'Wysłano!'
        }else{
        sendBtn.innerHTML = '';
        }
        fetch('http://localhost:8080/api/mail', {
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

// projects buttons
const project1 = document.querySelector('#project-1');
const project2 = document.querySelector('#project-2');
const project3 = document.querySelector('#project-3');
const project4 = document.querySelector('#project-4');
const project5 = document.querySelector('#project-5');
const project6 = document.querySelector('#project-6');
const project7 = document.querySelector('#project-7');

project1.addEventListener('mouseover', function() {
    document.querySelector('#project-1-description').style.display = 'inline';
    document.querySelector('#project-1-reference').style.display = 'flex';
})
project1.addEventListener('mouseout', function() {
    document.querySelector('#project-1-description').style.display = 'none'
    document.querySelector('#project-1-reference').style.display = 'none';
})

project2.addEventListener('mouseover', function() {
    document.querySelector('#project-2-description').style.display = 'inline';
    document.querySelector('#project-2-reference').style.display = 'flex';
})
project2.addEventListener('mouseout', function() {
    document.querySelector('#project-2-description').style.display = 'none'
    document.querySelector('#project-2-reference').style.display = 'none';
})

project3.addEventListener('mouseover', function() {
    document.querySelector('#project-3-description').style.display = 'inline';
    document.querySelector('#project-3-reference').style.display = 'flex';
})
project3.addEventListener('mouseout', function() {
    document.querySelector('#project-3-description').style.display = 'none'
    document.querySelector('#project-3-reference').style.display = 'none';
})

project4.addEventListener('mouseover', function() {
    document.querySelector('#project-4-description').style.display = 'inline';
    document.querySelector('#project-4-reference').style.display = 'flex';
})
project4.addEventListener('mouseout', function() {
    document.querySelector('#project-4-description').style.display = 'none'
    document.querySelector('#project-4-reference').style.display = 'none';
})

project5.addEventListener('mouseover', function() {
    document.querySelector('#project-5-description').style.display = 'inline';
    document.querySelector('#project-5-reference').style.display = 'flex';
})
project5.addEventListener('mouseout', function() {
    document.querySelector('#project-5-description').style.display = 'none'
    document.querySelector('#project-5-reference').style.display = 'none';
})

project6.addEventListener('mouseover', function() {
    document.querySelector('#project-6-description').style.display = 'inline';
    document.querySelector('#project-6-reference').style.display = 'flex';
})
project6.addEventListener('mouseout', function() {
    document.querySelector('#project-6-description').style.display = 'none'
    document.querySelector('#project-6-reference').style.display = 'none';
})

project7.addEventListener('mouseover', function() {
    document.querySelector('#project-7-description').style.display = 'inline';
    document.querySelector('#project-7-reference').style.display = 'flex';
})
project7.addEventListener('mouseout', function() {
    document.querySelector('#project-7-description').style.display = 'none'
    document.querySelector('#project-7-reference').style.display = 'none';
})
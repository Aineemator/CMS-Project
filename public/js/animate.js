    $(document).ready(function(){

// Animate counters
$('.counter').each(function(){

let $this = $(this);
let targetCount = $this.data('count');

$({countNum:0}).animate({
countNum:targetCount
},
{
duration:2500,
easing:'swing',
step:function(){
$this.text(Math.floor(this.countNum) + "K+");
}
});

});

// Smooth scroll for navigation links
$('a[href^="#"]').click(function(e){
e.preventDefault();

let target = $(this).attr('href');
if($(target).length) {
$('html,body').animate({
scrollTop:$(target).offset().top - 80
}, 800);
}
});

// Add scroll animation for cards
$(window).on('scroll', function(){
$('.card, .step, .review').each(function(){
let elementTop = $(this).offset().top;
let elementHeight = $(this).height();
let windowTop = $(window).scrollTop();
let windowHeight = $(window).height();

if(windowTop + windowHeight > elementTop + elementHeight * 0.2) {
$(this).css({opacity: 1, transform: 'translateY(0)'});
}
});
});

// Initialize card opacity
$('.card, .step, .review').css({opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease'});

});


function startCounter() {
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute("data-target"));
        let count = 0;

        const increment = target / 100;

        const updateCounter = () => {

            if (count < target) {
                count += increment;

                if(target >= 1000){
                    counter.innerText =
                        Math.floor(count / 1000) + "K+";
                }
                else if(target === 4.9){
                    counter.innerText = count.toFixed(1) + "/5";
                }
                else if(target === 6){
                    counter.innerText = "~" + Math.floor(count) + "h";
                }
                else{
                    counter.innerText =
                        Math.floor(count) + "%";
                }

                requestAnimationFrame(updateCounter);
            } else {

                if(target >= 1000){
                    counter.innerText = "119K+";
                }
                else if(target === 4.9){
                    counter.innerText = "4.9/5";
                }
                else if(target === 6){
                    counter.innerText = "~6h";
                }
                else{
                    counter.innerText = "98%";
                }
            }
        };

        updateCounter();
    });
}

window.addEventListener("load", startCounter);

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

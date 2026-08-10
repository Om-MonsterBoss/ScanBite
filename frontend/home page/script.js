// Counter Animation

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        const increment = target / 120;

        if (count < target) {

            counter.innerText = Math.ceil(count + increment);

            setTimeout(updateCounter, 20);

        } else {

            counter.innerText = target;

        }

    }

    updateCounter();

});

// Scroll Reveal

const reveals = document.querySelectorAll(
".mission-card,.story-section,.step-card,.feature-card,.stat-card,.cta-card"
);

window.addEventListener("scroll",()=>{

    reveals.forEach(el=>{

        const top = el.getBoundingClientRect().top;

        if(top < window.innerHeight-100){

            el.classList.add("active");

        }

    });

});
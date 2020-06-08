import $ from 'jquery'
import 'slick-carousel';
import SectionParallax from "../util/sectionParallax";
import HeaderBlock from "../util/headerBlock";
import SideBarController from "../util/sideBarController";
import {gsap, Power2} from "gsap/all";

export default {
    init() {
        console.log()
    },
    finalize() {

        const section = new SectionParallax();
        const controller = section.controller();
        const master = new HeaderBlock(controller);

        setTimeout(() => {
            section.init(['header']);
            new SideBarController('.social-menu');
        }, 1000);

        // JavaScript to be fired on all pages, after page specific JS is fire
        $('#testimonial').slick({
            arrows: false,
            dots: true,
            autoplay: true,
            infinite: true,
            fade: true,
            autoplaySpeed: 5000,
        });

        this.buttons = document.querySelectorAll('[data-job]');
        this.buttonClose = document.querySelector('.overlay-close');
        for (const bt of this.buttons) {
            bt.addEventListener('click', (e) => {
                e.preventDefault();
                this.open(bt.dataset.job)
            });
        }

        this.buttonClose.addEventListener('click', (e) => {
            this.close();
        });
    }
    ,
    open ($id) {
        console.log($id)
        const jobs = window.jobData;
        let job;
        jobs.forEach((v) => {
            if($id === v.id){
                job = v;
            }
        })
        const popup = document.querySelector('.overlay-popup')
        const header = popup.querySelector('.overlay-header')
        const content = popup.querySelector('.content')
        header.innerHTML = job.title;
        content.innerHTML = `${job.content}<a href="mailto:${job.email}?subject=${job.title}" class="hollow button m-t-30">Apply</a>`;
        popup.classList.add('is-shown');
        gsap.fromTo(popup, { y: '100%'}, {y: '0', duration: 1, ease: Power2.easeInOut})
    },

    close () {
        const popup = document.querySelector('.overlay-popup')
        gsap.to(popup , {y: '100%', duration: 1, ease: Power2.easeInOut, onComplete:()=>{
                popup.classList.remove('is-shown');
            }})
    }
};

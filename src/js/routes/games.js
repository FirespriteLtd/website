import $ from 'jquery'
// import ScrollMagic from "scrollmagic/scrollmagic/minified/ScrollMagic.min";
// import animations from "../util/animations";
import Rellax from "rellax/rellax.min";
import 'slick-carousel';

const newsletter = () => {
    let error = false;
    $('#thanks').hide();
    $('#sending').hide();
    $('#error').hide();

    $("#newsletter-form").validate({
        rules : {
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            email: 'Please enter a valid email address',
        },
        submitHandler: function (form) {

            console.log('FORM', $(form).serialize())

            $('#newsletter-form-wrapper').fadeOut(500, () => $('#sending').fadeIn(500, ()=>{

                $.post($(form).attr("action"), $(form).serialize()).then(function(response) {
                    $('#sending').fadeOut(500, () => $('#thanks').fadeIn(500))
                });
            }));

            return false;
        }
    });


    $('.continue').on('click' , () => {

        if(!error) {
            $("#newsletter-form").reset();
            $('#thanks').fadeOut(500, () => $('#form').fadeIn(500))
        } else {
            $('#error').fadeOut(500, () => $('#form').fadeIn(500))
        }
    })
}

export default {
    init() {
        console.log()
    },
    finalize() {
        // JavaScript to be fired on all pages, after page specific JS is fire
        const rellax = new Rellax('.rellax');
        if($(window).find('#screenshots')) {
            $('.slick-slider').slick({
                arrows: false,
                dots: true,
                autoplay: true,
                infinite: true,
                fade: true,
                autoplaySpeed: 2500,
            });
        }
        if($(window).find('#newsletter')) {
            newsletter();
        }
    },
};

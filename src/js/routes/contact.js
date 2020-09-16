import $ from 'jquery';
import "jquery-validation"
import SideBarController from "../util/sideBarController";

export default {
    init() {
    },
    finalize() {

        new SideBarController('.social-menu');

        let error = false;
        $('#thanks').hide();
        $('#sending').hide();
        $('#error').hide();

        $("#contact").validate({
            rules : {
                name: 'required',
                telephone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: 'Please enter your full name',
                email: 'Please enter a valid email address',
                telephone: 'Please enter your telephone number'
            },
            submitHandler: function (form) {

                $('#form').fadeOut(500, () => $('#sending').fadeIn(500, ()=>{

                    $.post($(form).attr("action"), $(form).serialize()).then(function(response) {
                        $('#sending').fadeOut(500, () => $('#thanks').fadeIn(500))
                    });
                }));

                return false;
            }
        });

        $('.continue').on('click' , () => {
            if(!error) {
                $("#contact").reset();
                $('#thanks').fadeOut(500, () => $('#form').fadeIn(500))
            } else {
                $('#error').fadeOut(500, () => $('#form').fadeIn(500))
            }
        })

    },
};

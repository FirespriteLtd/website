import $ from 'jquery';
import "jquery-validation"
import SideBarController from "../util/sideBarController";

export default {
    init() {
    },
    finalize() {
        new SideBarController('.social-menu');

        $('#search').on('click', (e) => {
            e.preventDefault();
            const search = $('#searchform').serialize();
            console.log(search)
            window.location.href = `/support/knowledgebase/?${search}`
        })


        let error = false;
        $('#thanks').hide();
        $('#sending').hide();
        $('#error').hide();

        $('input[type=file]').change(function (e) {
            const f = $(e.target)[0];
            const n = f.id;
            console.log($(`#${n}-output`));
            $(`#${n}-output`)[0].value = f.value;
        });

        $("#support-request").validate({
            rules : {
                game: 'required',
                platform: 'required',
                name: 'required',
                email: {
                    required: true,
                    email: true
                },
                debug: {
                    extension: 'cmap|proj|log|dmp|dat|arr|mdmp|cfg|txt'
                },
                screen: {
                    extension: 'gif|jpg|jpeg|png'
                },
                message: {
                    required: true
                },
                ageverification:{
                    required: true,
                    maxlength: 2
                },
                consent:{
                    required : true
                },
                privacy:{
                    required : true
                }
            },
            messages: {
                name: 'Please enter your full name',
                email: 'Please enter a valid email address',
                ageverification: { required: 'You must be over the age of 13'},
                consent: {required: 'You must consent'},
                privacy: {required: 'You must agree to our privacy policy'},
                message: 'Detail description is required',

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
                $("#support-request").reset();
                $('#thanks').fadeOut(500, () => $('#form').fadeIn(500))
            } else {
                $('#error').fadeOut(500, () => $('#form').fadeIn(500))
            }
        })

    },
};

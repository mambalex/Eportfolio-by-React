var array = document.location.href.toString().split("/");
var username = array[array.length - 1];
//var allInfo = JSON.parse(localStorage.getItem(`${username}Info`)).personal_info
//$(".password").val(allInfo['name']);

$(document).ready(function(){
    displayAllInfo();
})

//click side bar

$(".fa-user").on('click',function(){
    $(".upload").hide();
    $(".basic").show();
    $(".rightbox").show();
    $("#profile").addClass('active');
    $(".photo_submit-container").hide();
    $("#privacy").removeClass('active');
})

$("#privacy").on('click',function(){
    $(".upload").show();
    $(".basic").hide();
    $(".rightbox").hide();
    $("#profile").removeClass('active');
    $(".photo_submit-container").css("display","flex");
    $("#privacy").addClass('active');
})


//display Info
function displayAllInfo(){
    return  $.ajax({
                type:'POST',
                url:'/api/get_self_profile',
                async:false,
                headers:{
                    'Authorization': 'Basic ' + btoa(JSON.parse(localStorage.getItem(username)).token+':')
                },
                success(rsp_data){
                            console.log(rsp_data);
                            $(".name").text(rsp_data['data']['name']);
                            $(".dob").text(rsp_data['data']['dob']);
                            $(".gender").text(rsp_data['data']['gender']);
                            $(".email").text(rsp_data['data']['email']);
                            var url = rsp_data['data']['photo'];
                            if(url=='None' || !url){
                                url = '../static/img/default.png';
                            }else{
                                var array = url.split("/");
                                var image = array[array.length - 1];
                                url = `../static/img/${image}`;
                                console.log(url);
                            }
                            $(".photo_submit-container img").attr('src',url);
                }
          })
}


$(document).on('click', ".upload", function(e){
    var file = $('.photo_submit-container').find("input[type=file]").prop('files')[0];
    var formData = new FormData();
    formData.append('photo', file);
    $.ajax({
                type: 'POST',
                url: '/api/change_photo',
                data: formData,
                contentType: false,
                cache: false,
                contentType: false,
                processData: false,
                async: false,
                headers:{
                    'Authorization': 'Basic ' + btoa(JSON.parse(localStorage.getItem(username)).token+':')
              },
              error: function(){
                      $(".alert-danger").text("Oops! Something went wrong!").show();
                      $(".alert-success").hide();
                      setTimeout(function(){
                        $(".alert-danger").hide();
                        },3000)
              },
              success: function(rsp_data){
                    console.log(rsp_data);
                    $(".alert-success").text("Successfully updated photo!").show();
                    $(".alert-danger").hide();
                    setTimeout(function(){
                        $(".alert-success").hide();
                    },3000);
                    displayPicture();
              }
          })

})





///api/get_self_profile

//update profile
$(document).on('click', ".basic", function(e){
    e.preventDefault();
        var formData = new FormData();
        formData.append('name', $(".name").text());
        formData.append('dob', $(".dob").text());
        formData.append('gender', $(".gender").text());
        formData.append('email', $(".email").text());
        formData.append('passwd', $(".password").val());
        $.ajax({
                type: 'POST',
                url: '/api/update_user_profile',
                data: formData,
                contentType: false,
                cache: false,
                contentType: false,
                processData: false,
                async: false,
                headers:{
                    'Authorization': 'Basic ' + btoa(JSON.parse(localStorage.getItem(username)).token+':')
              },
              error: function(){
                      $(".alert-danger").text("Oops! Something went wrong!").show();
                      $(".alert-success").hide();
                      setTimeout(function(){
                        $(".alert-danger").hide();
                        },3000)
              }
         }).done(function(rsp){
                console.log(rsp)
                if(rsp['code']==200){
                    $(".alert-success").text("Successfully updated!").show();
                    $(".alert-danger").hide();
                    setTimeout(function(){
                    $(".alert-success").hide();
                    },3000)
                }else{
                      $(".alert-danger").text("Oops! Something went wrong!").show();
                      $(".alert-success").hide();
                      setTimeout(function(){
                        $(".alert-danger").hide();
                        },3000)
                }
         })
})

function displayPicture(){
        return  $.ajax({
                type:'POST',
                url:'/api/get_self_profile',
                async:false,
                headers:{
                    'Authorization': 'Basic ' + btoa(JSON.parse(localStorage.getItem(username)).token+':')
                },
                success(rsp_data){
                        var url = rsp_data['data']['photo'];
                        if(url=='None' || !url){
                                url = '../static/img/default.png';
                            }else{
                                var array = url.split("/");
                                var image = array[array.length - 1];
                                url = `../static/img/${image}`
                            }
                        $("img").attr('src',url);
                }
                })
}



//update and conform btn
$(document).on('click', ".update", function(e){
    e.preventDefault();
    if($(this).text()=='update'){
    var data_to_update = $(this).siblings();
    // alert($(this).parent().contents().get(0).nodeValue);
    $(this).text('confirm');
    data_to_update.attr('contenteditable', 'true');
    data_to_update.focus();
    }else{
        // alert($(this).siblings().text());
        var data_to_update = $(this).siblings();
        data_to_update.attr('contenteditable', 'false');
        $(this).text('update');
    }
});



//upload photo

var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var PhotoSubmission = function () {
    function PhotoSubmission() {_classCallCheck(this, PhotoSubmission);
        var inputs = document.querySelectorAll('.js-photo_submit-input');

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('change', this.uploadImage);
        }
    }_createClass(PhotoSubmission, [{ key: 'uploadImage', value: function uploadImage(

        e) {
            var fileInput = e.target;
            var uploadBtn = e.target.parentNode;
            var deleteBtn = e.target.parentNode.childNodes[7];

            var reader = new FileReader();

            reader.onload = function (e) {
                uploadBtn.setAttribute('style', 'background-image: url(\'' + e.target.result + '\');');
                uploadBtn.classList.add('photo_submit--image');
                fileInput.setAttribute('disabled', 'disabled');
            };

            reader.readAsDataURL(e.target.files[0]);

            deleteBtn.addEventListener('click', function () {
                uploadBtn.removeAttribute('style');
                uploadBtn.classList.remove('photo_submit--image');

                setTimeout(function () {
                    fileInput.removeAttribute('disabled', 'disabled');
                }, 200);
            });
        } }]);return PhotoSubmission;}();
;

new PhotoSubmission();
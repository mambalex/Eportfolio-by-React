

// switch
var $loginMsg = $('.loginMsg'),
    $login = $('.login'),
    $signupMsg = $('.signupMsg'),
    $signup = $('.signup'),
    $frontbox = $('.frontbox');

$('#switch1').on('click', function() {
    $loginMsg.toggleClass("visibility");
    $frontbox.addClass("moving");
    $signupMsg.toggleClass("visibility");
    $signup.toggleClass('hide');
    $login.toggleClass('hide');
    $('#user-type').val('');
    $('#signup-username').val('');
    $('#signup-email').val('');
    $('#signup-password').val('');
    $('#successAlert').hide();
    $('#errorAlert').hide();
    $('#successAlert2').hide();
    $('#errorAlert2').hide();
})

$('#switch2').on('click', function() {
    $loginMsg.toggleClass("visibility");
    $frontbox.removeClass("moving");
    $signupMsg.toggleClass("visibility");
    $signup.toggleClass('hide');
    $login.toggleClass('hide');
    $('#login-email').val('');
    $('#login-password').val('');
    $('#successAlert').hide();
    $('#errorAlert').hide();
    $('#successAlert2').hide();
    $('#errorAlert2').hide();
 
})


//sign up request
$(".signup").on('submit',function (e){
    e.preventDefault();
    var data = {
        role: $('#user-type').val(),
        username: $('#signup-username').val(),
        email: $('#signup-email').val(),
        passwd: $('#signup-password').val(),
    };
    if(!$('#user-type').val()){
            $('#errorAlert2').text("please select a usertype").show();
            $('#successAlert2').hide();
            setTimeout(function(){
                    $('#errorAlert2').hide();
                },2000);
             return
    };
    $.ajax({
        type:'POST',
        url:'/api/create_user',
        data: data,
        // success:function (rsp_data) {
        //     console.log(rsp_data);
        //     $('#successAlert2').text("Successfully sign up").show();
        //     $('#errorAlert2').hide();
        //     setTimeout(function(){ 
        //        window.location.pathname = "./instructor";
        //     }, 2000);
        // },
        // error:function (rsp_data) {
        //     console.log(rsp_data);
        //     $('#errorAlert2').text("Oops! Something went wrong").show();
        //     $('#successAlert2').hide();
        // }
    }).done(function(rsp_data){
        console.log(rsp_data);
        var status = rsp_data['code'];
        if(status == '201'){
            $('#successAlert2').text("Successfully sign up").show();
            $('#errorAlert2').hide();
             setTimeout(function(){
                    $('#successAlert2').hide();
                },2000);
        }else if(status == '400'){
            $('#errorAlert2').text(rsp_data['msg']).show();
            $('#successAlert2').hide();
            setTimeout(function(){
                    $('#errorAlert2').hide();
                },2000);
        }
    })
    
});

//login request
$(".login").on('submit',function (e){
    e.preventDefault();
    var username = $('#login-username').val();
    var data = {
        username: $('#login-username').val(),
        passwd: $('#login-password').val(),
    };

    $.ajax({
        type:'POST',
        url:'/api/login',
        data: data,
    }).done(function(rsp_data){
            var status = rsp_data['code'];
            var role = rsp_data['role'];
            console.log(rsp_data);
            console.log(status);
            console.log(role);
            if(status == '400'){
                $('#errorAlert').text(rsp_data['msg']).show();
                $('#successAlert').hide();
            }else if(status == '200'){
                $('#successAlert').text("Successfully login").show();
                $('#errorAlert').hide();
                if(role == 'candidate'){
                    localStorage.setItem(username, JSON.stringify(rsp_data));
                    setTimeout(function(){window.location.pathname = `./candidate/${username}`;},2000);
                }else if(role=='employer'){
                    localStorage.setItem(username, JSON.stringify(rsp_data));
                    setTimeout(function(){window.location.pathname = `./employer/${username}`;},2000);
                }else if(role=='instructor'){
                    localStorage.setItem(username, JSON.stringify(rsp_data));
                    setTimeout(function(){window.location.pathname = `./instructor/${username}`;},2000);
                }
            }
        })
    
});






















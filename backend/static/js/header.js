$(document).on('click', '.user', function(e){
    e.preventDefault();
    if( $('.dropdown-content').css('display') === 'block' ){
        $('.dropdown-content').hide();
    }else{$('.dropdown-content').css('display','block');}
})

$( ".dropdown-content" ).on({
    mouseleave: function() {
        $('.dropdown-content').hide();
    }
})


$('#logout').on('click',  function(e){
	window.location.pathname = "./";
});
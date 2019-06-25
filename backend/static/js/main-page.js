var array = document.location.href.toString().split("/");
console.log(array);
if(array.length==5){
    $("nav ul").hide();
}
var username = array[3];


//click plus button
$(".plus").click(function(){
	$(".search-bar-container").css("bottom","10%");
	$(".tags").css("display","flex");
	$(this).hide();
	$(".minus").show();
	$(".search-candidate-btn").hide()
})


//click minus button
$(".minus").click(function(){
	$(".search-bar-container").css("bottom","35%");
	$(".tags").css("display","none");
	$(this).hide();
	$(".plus").show();
    $(".search-candidate-btn").show()
})

//click search candidate button
$(document).on('click', '.search-candidate-btn',function(e){
    e.preventDefault();
    if($(this).find('button').text() === "Finding Candidates?"){
        $(".search").hide();
        $(".search-candidate").show();
        $(".can-plus-minus").find(".minus").hide();
        $(this).find('button').text("Searching Jobs?");
        $('.search-bar-container').find('h2').text("Search For Candidates")
	}else{
        $(".search").show();
        $(".search-candidate").hide();
        $(".plus-minus").find(".minus").hide();
        $(this).find('button').text("Finding Candidates?");
        $('.search-bar-container').find('h2').text("Find A Job You Love")
	}

})

//click job plus tag
$(document).on('click', '.plus-tag', function(e){
	var flg = 1;
	e.preventDefault();
	var new_tag = $(".job-tag").val();
	if(new_tag.match(/^ *$/) === null){
		$(".tag-labels li").each(function(){
			if(new_tag === $(this).find(".tg").text() && $(this).css('display') !== "none" ){
				flg = 0;
			}else if(new_tag === $(this).find(".tg").text() && $(this).css('display') === "none"){
				flg = 0;
				$(this).css('display',"inline-block");
			}
		});
	if(flg === 1){
		$(".tag-labels").append("<li><span class='tg'>" + new_tag + "</span> <span class='x'>x</span></li>");
		$(".job-tag").val("");
	}
}})

//click can plus tag
$(document).on('click', '.plus-can-tag', function(e){
    var flg = 1;
    e.preventDefault();
    var new_tag = $(".candidate-tag").val();
    if(new_tag.match(/^ *$/) === null){
        $(".can-labels li").each(function(){
            if(new_tag === $(this).find(".tg").text() && $(this).css('display') !== "none" ){
                flg = 0;
            }else if(new_tag === $(this).find(".tg").text() && $(this).css('display') === "none"){
                flg = 0;
                $(this).css('display',"inline-block");
            }
        });
        if(flg === 1){
            $(".can-labels").append("<li><span class='tg'>" + new_tag + "</span> <span class='x'>x</span></li>");
            $(".candidate-tag").val("");
        }
}})

//delete job tag
$(document).on('click', '.tag-labels li span', function(e){
	e.preventDefault();
	$(this).parent().remove();
})

//delete can tag
$(document).on('click', '.can-labels li span', function(e){
    e.preventDefault();
    $(this).parent().remove();
})

//click search job
$(document).on('click', '#search', function(e){
    e.preventDefault();
    if(array.length!=5){
          alert('Please Login')
          return
    }
    var keyword = $(this).siblings(".input-wrapper").find("input[name='keyword']").val();
    var location = $(this).siblings(".input-wrapper").find("input[name='location']").val();
    var tags = [];
    $(this).siblings(".tags").find(".tg").each(function(idx, li){
        tags.push($(li).text());
    });
    var language = $("#lang").val();
    var salaries = $("#salaries").val();
    var workType = $("#workType").val();
    console.log(keyword,location,tags,language,salaries,workType)
    data={
        'keyword':keyword,
        'location':location,
        'tags':tags,
        'language':language,
        'salaries':salaries,
        'workType':workType,
        'username':username
    }
    localStorage.setItem(keyword, JSON.stringify(data));
    window.open(`/jobs/${keyword}`, '_blank');
//    window.location.pathname = `./jobs/${keyword}`;
});

//click search can
$(document).on('click', '#search-can', function(e){
    e.preventDefault();
    if(array.length!=5){
          alert('Please Login')
          return
    }
    var candidate = $(".search-candidate").find("input[name='candidate']").val();
    var language = $("#lang-can").val();
    var workType = $("#workType-can").val();
    var lct = $(this).siblings(".input-wrapper").find("input[name='location']").val();
    var tags = [];
    $(this).siblings(".tags").find(".tg").each(function(idx, li){
        tags.push($(li).text());
    });
    console.log(candidate,tags,language,workType)
    data={
        'candidate':candidate,
        'tags':tags,
        'language':language,
        'workType':workType,
        'location': lct,
        'username':username
    }
    localStorage.setItem(candidate, JSON.stringify(data));
//     window.location.pathname = `./candidates/${candidate}`;
     window.open(`/candidates/${candidate}`, '_blank');
})








var array = document.location.href.toString().split("/");
var username = array[array.length - 1];

//click search
$('.home').on('click',  function(e){
    e.preventDefault();
    window.open(`/${username}/search`, '_blank');
});


//click profile
$('#profile').on('click',  function(e){
    e.preventDefault();
    window.open("/profile/"+username, '_blank');
});

//click logout
$('#logout').on('click',  function(e){
	window.location.pathname = "./"
});


//click opening jobs
$(document).on('click', '.openings', function(e){
	e.preventDefault();
	$(this).css('border-bottom', '15px solid rgb(23,150,25)');
	$('.candidates').css('border-bottom', 'none');
	$('.interviews').css('border-bottom', 'none');
	$('.add-jobs').show();
	$('.candidate-wrapper').hide();
	$('.jobs-container').css('display','flex');
})

//click candidates
$(document).on('click', '.candidates', function(e){
	e.preventDefault();
	$(this).css('border-bottom', '15px solid rgb(75,163,243)');
	$('.openings').css('border-bottom', 'none');
	$('.interviews').css('border-bottom', 'none');
	$('.add-jobs').hide();
	$('.jobs-container').hide();
	$('.candidate-wrapper').show();
	$('.candidates-container').css('display','flex');
	$('.interviews-container').hide();
})

//click interviews
$(document).on('click', '.interviews', function(e){
	e.preventDefault();
	$(this).css('border-bottom', '15px solid rgb(250,80,100)');
	$('.openings').css('border-bottom', 'none');
	$('.candidates').css('border-bottom', 'none');
	$('.add-jobs').hide();
	$('.jobs-container').hide();
	$('.candidate-wrapper').show();
	$('.candidates-container').hide();
	$('.interviews-container').css('display','flex');
})


function welcomeUser(){
    var name = allData["personal_info"]['name'];
    $(".welcome-user").text(`Welcome, ${name}`);
    $(".welcome-user").show();
}


//===================================AJAX request========================================
var allData;
var openingJobList;
var savedCanList;



getAllInfo();
$('.openings').click();
welcomeUser();

function getAllInfo(){
    console.log(JSON.parse(localStorage.getItem(username)).token)
    return $.ajax({
            type:'POST',
            url:'/api/employer_get_main_data',
            async:false,
            headers:{
                'Authorization': 'Basic ' + btoa(JSON.parse(localStorage.getItem(username)).token+':')
            },
            success(rsp_data){
                        localStorage.setItem(`${username}Info`, JSON.stringify(rsp_data));
                        console.log(rsp_data);
                        allData = rsp_data;
                        //jobs
                        openingJobList = rsp_data['open_job_list'];
                        savedCanList = rsp_data['saved_user_list'];
                        //candidates

            }
          })
}




//===============================================Opening jobs====================================================

//total jobs
$(".openings .num").text(openingJobList.length);

//============job list=============

var jobIdTo
$(".job-wrapper .jobs-container").remove();
//display all opening jobs
openingJobList.forEach(function(job){
    let title = job['job_title'];
    let location = job['location'];
    let id = job['job_info_id'];
    let date = job['date'].split(" ")[0];
    let time = job['date'].split(" ")[1];
    let candidates = job["resume_list"].length;
    let firstInterview = job['first_interview_list'].length;
    let secondInterview = job['second_interview_list'].length;
    let test = job['test_list'].length;
    let offers = job['offer_list'].length;
    let engaged = job['engaged_list'].length;
    let totalCan = candidates + firstInterview + secondInterview + test + offers + engaged;
    $(".job-wrapper").append(`
                <div class="jobs-container">
		        	<div class="top">
		        		<div class="title">
								<span class="dot"></span>
								<span class="job-title">${title}</span>
		        				<i class="fas fa-map-marker-alt"></i>
		        				<span class="location">${location}</span>
		        		</div>
		        		<div class='id'>${id}</div>
		        		<div class="info"><button type="button">More Info</button></div>

		        	</div>

		        	<div class="middle">
		        		<div class="middle-container">
		        			<div><i class="fas fa-users"></i></div>
		        			<div class="num-text">
		        				<div class="num">${candidates}</div>
		        				<div class="text">Candidates</div>
		        			</div>

		        		</div>
		        		<div class="middle-container">
		        			<div><i class="flaticon-interview"></i></div>
		        			<div class="num-text">
		        				<div class="num">${firstInterview}</div>
		        				<div class="text">Interviews</div>
		        			</div>
		        		</div>
		        		<div class="middle-container">
		        			<div><i class="flaticon-test"></i></div>
		        			<div class="num-text">
		        				<div class="num">${test}</div>
		        				<div class="text">Tests</div>
		        			</div>
		        		</div>
		        		<div class="middle-container">
		        			<div><i class="flaticon-interview"></i></div>
		        			<div class="num-text">
		        				<div class="num">${secondInterview}</div>
		        				<div class="text">2nd Interviews</div>
		        			</div>
		        		</div>
		        		<div class="middle-container">
		        			<div><i class="flaticon-offer"></i></div>
		        			<div class="num-text">
		        				<div class="num">${offers}</div>
		        				<div class="text">Offers</div>
		        			</div>
		        		</div>

		        		<div class="middle-container engaged">
		        			<div><i class="flaticon-agreement"></i></div>
		        				<div class="num-text">
		        				<div class="num">${engaged}</div>
		        				<div class="text">Engaged</div>
		        			</div>
		        		</div>

		        	</div>
		        	<div class="bottom">
		        		<div><i class="far fa-clock"></i>published on ${date}  </div>
		        		<div class="interested"><i class="fas fa-users"></i>${totalCan} people interested</div>
		        	</div>
		        </div>
    `)
})

//============job-popup============

//click job popup
$(document).on('click', '.info', function(e){
	e.preventDefault();
	var id = $(this).siblings('div:hidden').text();
	for(var job of openingJobList){
            if(job['job_info_id']==id){
               var title = job['job_title'];
               var salary = job['salary'];
               var location = job['location'];
               var company = job['company_name'];
               var workType = job['job_type'];
               var jobSummary = job['description'];
               var responsibilities = job['responsibility'];
               var ITSkill = job['itskill'];
               var personalStrengths = job['personal_strength'];
               var others = job['others'];
                break
            }
    }
    $(".job-popup .title span").text(title);
    $(".job-popup #salary").text(salary);
    $(".job-popup #lct").text(location);
    $(".job-popup #company").text(company);
    $(".job-popup #work-type").text(workType);
    $(".job-popup .description p").text(jobSummary);
    //
    $(".job-popup .responsibilities ul li").remove();
    responsibilities.forEach(function(val){
      $(".job-popup .responsibilities ul").append(`<li>${val}</li>`);
    })
    $(".job-popup .skills-required ul li").remove();
    ITSkill.forEach(function(val){
      $(".job-popup .skills-required ul").append(`<li>${val}</li>`);
    })
    $(".job-popup .personal-skills ul li").remove();
    personalStrengths.forEach(function(val){
      $(".job-popup .personal-skills ul").append(`<li>${val}</li>`);
    })
    $(".job-popup .others ul li").remove();
        others.forEach(function(val){
      $(".job-popup .others ul").append(`<li>${val}</li>`);
    })
    $('.job-popup').css('display','flex');
	$('.new-opening-job').hide();
})


//close job popup
$(document).on('click', '.job-popup-close', function(e){
	e.preventDefault();
	$('.job-popup').hide();
})

//add job
$(document).on('click', '.add-jobs', function(e){
	e.preventDefault();
	$('.new-opening-job').css('display','flex');
	$('.job-popup').hide();
})

//close add-job popup
$(document).on('click', '.job-creation-close', function(e){
	e.preventDefault();
	$('.new-opening-job').hide()
})

//create job add
$(document).on('click', '.new-opening-job li button', function(e){
	e.preventDefault();
	var input = $(this).siblings("input");
	$(this).parent().parent().append(`
        <li>
            ${input.get(0).outerHTML}
            <i class="material-icons remove">
                remove_circle_outline
            </i>
        </li>
	`)
})

//create job delete
$(document).on('click', '.new-opening-job li .remove', function(e){
        $(this).parent().remove();
});


//create a job
$(document).on('click', '.create-job', function(e){
    var title = $(".new-opening-job .job-title input").val();
    var salary = $(".new-opening-job .salary input").val();
    var location = $(".new-opening-job .location input").val();
    var company = $(".new-opening-job .company input").val();
    var workType = $(".new-opening-job .work-type input").val();
    var jobSummary =$(".new-opening-job .add-job-summary").val();
    var responsibilities = [];
    var ITSkill = [];
    var personalStrengths = [];
    var others = [];
    $(".add-responsibilities").each(function(idx,rsp){
        responsibilities.push($(rsp).val());
    })
    $(".add-it-skills").each(function(idx,rsp){
        ITSkill.push($(rsp).val());
    })
    $(".add-personal-strengths").each(function(idx,rsp){
        personalStrengths.push($(rsp).val());
    })
    $(".add-ohters").each(function(idx,rsp){
        others.push($(rsp).val());
    })
    var data = {
        "title":title,
        "salary":salary,
        "location":location,
        "company":company,
        "workType":workType,
        "jobSummary":jobSummary,
        "responsibilities":responsibilities,
        "ITSkill":ITSkill,
        "personalStrengths":personalStrengths,
        "others":others
    }
   $.ajax({
            type:'POST',
            url:'/api/create_job_info',
            contentType: "application/json",
            data:JSON.stringify({create_job:data}),
            async:false,
            headers:{
                'Authorization': 'Basic ' + btoa(JSON.parse(localStorage.getItem(username)).token+':')
            },
            success(rsp_data){
                        console.log(rsp_data);
                        $('#successAlert').text("Successfully create a job!").show();
                        $('#errorAlert').hide();
                        setTimeout(function(){
                            $(".job-creation-close").click();
                            $('#successAlert').hide();
                        },2000);

            $(".openings .num").text(openingJobList.length);
            },
            error(rsp_data){
                        console.log(rsp_data);
                        $('#errorAlert').text("Oops! Something went wrong.").show();
                        $('#successAlert').hide();
                        setTimeout(function(){
                            $('#errorAlert').hide();
                        },2000);
            }
          })
});




////==================================================Candidates====================================================




function displayCandidate(can, tag, jobName){
        console.log(can);
        var id = can['username'];
        var interviewId = can['interview_uuid'];
        var name = can['name'];
        var location = can['location'];
        var aboutMe = can['about_me'];
        var image = can['personal_info']['photo'];
        if(image=='None'|| !image){
            image = '../static/img/default.png';
        }else{
            var array = image.split("/");
            var img = array[array.length - 1];
            image  = `../static/img/${img}`;
        }
        $(".candidate-wrapper").append(`
        <div class="candidates-container" style="display: flex;">
		        	<div class="top">
		        		<div class="name"><span><i class="fas fa-user-alt"></i></span>
		        		            <span>${name}</span>
		        					<i class="fas fa-map-marker-alt"></i>
		        				    <span class="location">${location}</span>
		        		</div>
		        		<div class='id'>${id}</div>
		        		<div class="interviewId">${interviewId}</div>
		        		<div class="candidate-info"><button type="button">More Info</button></div>

		        	</div>

		        	<div class="middle">
                            <img  src=${image} alt="user portrait" >
		        			<div class="profile-icon"><i class="fas fa-address-card fa fa-2x"></i></div>
		        		<div class="profile">${aboutMe}</div>
		        	</div>
		        	<div class="bottom">
		        		<div class="job-name"><i class="fas fa-briefcase"></i>Applying for ${jobName}</div>
		        		<div class="job-tag"><i class="fas fa-user-alt"></i>${tag}</div>

		        	</div>
		        </div>
`)
}

////============display all candidates============

var allCans={};
//remove all candidates
$(".candidate-wrapper .candidates-container").remove();

//display all saved cans
savedCanList.forEach(function(can){
    displayCandidate(can, "Saved candidate","none", "no");
    allCans[can['username']] = can;
})

//display other cans
openingJobList.forEach(function(job){
    let candidates = job["resume_list"];
    let recommendedCans = job["recommendation_list"];
    let firstInterview = job['first_interview_list'];
    let secondInterview = job['second_interview_list'];
    let test = job['test_list'];
    let offers = job['offer_list'];
    let engaged = job['engaged_list'];

    candidates.forEach(function(can){
        displayCandidate(can, "Candidate", can['job_name'], "no");
        allCans[can['username']] = can;
    })
    recommendedCans.forEach(function(can){
        let temp = `Recommeded by ${can['referrer']}`;
        displayCandidate(can, temp, can['job_name'], "no");
        allCans[can['username']] = can;
    })
    firstInterview.forEach(function(can){
        displayCandidate(can, "First interview", can['job_name'], "yes");
        allCans[can['username']] = can;
    })
    test.forEach(function(can){
        displayCandidate(can, "Test", can['job_name'], "no");
        allCans[can['username']] = can;
    })
    secondInterview.forEach(function(can){
        displayCandidate(can, "2nd interview", can['job_name'], "yes");
        allCans[can['username']] = can;
    })
    offers.forEach(function(can){
        displayCandidate(can, "Got offer", can['job_name'], "no");
        allCans[can['username']] = can;
    })
    engaged.forEach(function(can){
        displayCandidate(can, "Engaged", can['job_name'], "no");
        allCans[can['username']] = can;
    })
})

//move to the interview part
$(".candidate-wrapper .candidates-container .job-tag").each(function(idx,val){
    if($(val).text()=="First interview" || $(val).text()=="2nd interview" ){
        $(this).parent().parent().addClass("interviews-container");
    }
})

//highlight saved candidates
$(".candidate-wrapper .candidates-container .job-name").each(function(idx,val){
    if($(val).text()=="Applying for none"){
       $(this).text("");
       $(this).css("width","183px");
       $(this).siblings(".job-tag").css("color","#dc3545");
    }
})

//total cans & interviews
var numOfInterview = $(".candidate-wrapper .interviews-container").length;
var numOfCandidates = $(".candidate-wrapper .candidates-container").length - numOfInterview;
$(".candidates .num").text(numOfCandidates);
$(".interviews .num").text(numOfInterview);

////============candidate popup============


var aboutMe;
var personalInfo;
var image;
var personalSkilList;
var skillList;
var courseList;
var educationList;
var experienceList;

var clickCanName;
var interviewId;
var status;
//open candidate popup
$(document).on('click', '.candidate-info', function(e){
    e.preventDefault();
    clickCanName = $(this).siblings(".id").text();
    interviewId = $(this).siblings(".interviewId").text();
    status = $(this).parent().parent().find('.job-tag').text();
    for (var name in allCans) {
        if( name = clickCanName){
        var image = allCans[name]['personal_info']['photo']
        if(image=='None'|| !image){
            image = '../static/img/default.png';
        }else{
            var array = image.split("/");
            var img = array[array.length - 1];
            image  = `../static/img/${img}`;
        }

        $(".candidate-popup").find(".name").text( allCans[name]['name']);
        $(".candidate-popup").find(".email").text( allCans[name]['email']);
        $(".candidate-popup").find(".phone").text( allCans[name]['personal_info']['phone']);
        $(".candidate-popup").find(".github").text(allCans[name]['personal_info']['link']);
        $(".candidate-popup").find(".profile p").text(allCans[name]['about_me']);
        $(".candidate-popup").find("img").attr('src',image);
        skillList = allCans[name]['skill_set'];
        courseList = allCans[name]['course_list'];
        educationList = allCans[name]['education_exp'];
        projectList = allCans[name]['project_list'];
        experienceList = allCans[name]['experiences'];
        personalSkilList = allCans[name]['personal_skill'];
        displayITSkill();
        displayProjects();
        displayExperiences();
        displayEducation();
        displayPS();
        }
        break
    }
    //append job option to can popup
    $(".candidate-popup").find("select option").remove();
    openingJobList.forEach(function(job){
        let title = job['job_title'];
        let id = job['job_info_id'];
        $(".candidate-popup").find("select").append(`<option value=${id}>${title}</option>`);
    });
    //interview part remove shedual button
    if(status =='First interview'){
        $('#successAlert2').text("Successfully schedual a test!");
        $('.candidate-popup').find('.save-can button').text("Schedule a test");
    }
    if(status=='2nd interview'){
        $('#successAlert2').text("Successfully provide an offer!");
        $('.candidate-popup').find('.save-can button').text("Provide an Offer");
    }
    $(".candidate-popup").css("top",e.pageY-250);
    $('.candidate-popup').css('display','flex');
    $('.new-opening-job').hide();
    $('.job-popup').hide();
})




////close candidate popup
$(document).mouseup(function(e)
{
    var container = $(".candidate-popup");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        container.hide();
    }
});


//schedule an interview
$(document).on('click', '.candidate-popup .save-can', function(e){
        var status_uuid = "53e3baf0-cdd3-11e8-b600-4c3275989ef5";//first interview
        if(status=="Test"){
            //schedule second interview
            status_uuid = "827f3f10-cdd3-11e8-a548-4c3275989ef5";
        }else if(status=='First interview'){
            //schedule test
            status_uuid = "7413af9c-cdd3-11e8-b71a-4c3275989ef5";
        }else if(status =='2nd interview'){
            //give offer
            status_uuid = "2d4cbd28-cdd4-11e8-a778-4c3275989ef5";
        }
        if(status=='Got offer'){
                $('#errorAlert2').text("Can not schedual an interview").show();
                $('#successAlert2').hide();
                setTimeout(function(){
                    $('#errorAlert2').hide();
                },2000);
                return
        }
        var formData = new FormData();
        data={
        'job_info_id':$("#select_job").val(),
        'interview_id':interviewId,
        'student_id':clickCanName,
        'status_uuid': status_uuid
        }
           $.ajax({
            type:'POST',
            url:'/api/create_interview',
            contentType: "application/json",
            data:JSON.stringify({update_data:data}),
            async:false,
            headers:{
                'Authorization': 'Basic ' + btoa(JSON.parse(localStorage.getItem(username)).token+':')
            },
            success(rsp_data){
                console.log(rsp_data);
                $('#successAlert2').show();
                $('#errorAlert2').hide();
                setTimeout(function(){
                     $('#successAlert2').hide();
                      location.reload();
                },2000);
            },
            errow(rsp_data){
                console.log(rsp_data);
                $('#errorAlert2').text("Can not schedual an interview").show();
                $('#successAlert2').hide();
                setTimeout(function(){
                    $('#errorAlert2').hide();
                },2000);
                 }
            })
})


////=========skill set=========
function displayITSkill(){
    $(".candidate-popup").find(".skill-lists li").each(function(idx, li){
        let pct = skillList[Object.keys(skillList)[idx]];
        let name = Object.keys(skillList)[idx];
        $(li).find('a').text(name);
        $(li).find('.perct').text(pct+"%");
        change(`skill-${idx+1}`,`${pct}%`);
    })
}

// search the CSSOM  rule   //change("skill-1", "20%");
function findKeyframesRule(rule)
    {
        // gather all stylesheets into an array
        var ss = document.styleSheets;
        // loop through the stylesheets
        for (var i = 0; i < ss.length; ++i) {
            try {
                    rules = ss[i].rules || ss[i].cssRules;
                } catch (e) {
                    console.warn("Can't read the css rules of: " + ss[i].href, e);
                    continue;
                }
            if (rules) {
                // loop through all the rules
                for (var j = 0; j < ss[i].cssRules.length; ++j) {
                    // find therule whose name matches our passed over parameter and return that rule
                    if (ss[i].cssRules[j].type == window.CSSRule.KEYFRAMES_RULE && ss[i].cssRules[j].name == rule)
                        return ss[i].cssRules[j];
                }}
        }
        return null;
    }

// remove old keyframes and add new ones
function change(anim, percent)
    {
        var keyframes = findKeyframesRule(anim);
        keyframes.deleteRule("100%");
        keyframes.appendRule(`100%{width: ${percent};}`);
    }


////=========project=========

//display project
function displayProjects(){
    $(".candidate-popup .home-projects-name li").remove();
    projectList.forEach(function(val){
        let description = val['description'];
        let link = val['link'];
    //    let techs = val['description'];
        let name = val['name'];
        $(".candidate-popup .home-projects-name").append(`
                            <li>
                            <div class='id'>${val['working_exp_uuid']}</div>
                            <div>${name}</div>
                            </li>
        `)
    })
}

//project popup
$(document).on("click",".home-projects-name li div", function(){
   let id = $(this).siblings(".id").text();
   projectList.forEach(function(prj){
        if (prj['working_exp_uuid'] == id){
            $(".project-popup .title p").text(prj['name']);
            $(".project-popup .description").text(prj['description']);
            $(".project-popup .link a").text(prj['link']);
            $(".project-popup .link a").attr('href',prj['link']);
            $('.project-popup ul li').remove();
            prj['techs'].forEach(function(val){
                $(".project-popup ul").append(`<li>${val}</li>`)
            });
            $(".project-popup").show();
        }
   })
})
////close project popup
$(document).mouseup(function(e)
{
    var container = $(".project-popup");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        container.hide();
    }
});

////========= experience=========

//display all exps
function displayExperiences(){
    $(".candidate-popup .all-experience li").remove();
    experienceList.forEach(function(val){
        let date = val['description'].split("\n")[0];
        let description = val['description'].split("\n")[1];
        let name = val['name'];
        $(".candidate-popup .all-experience").append(`
                        <li class="experience">
                        <div class="title" data-placeholder='Please enter a title'>${name}</div>
                        <div class="date" data-placeholder='Please enter a date'>${date}</div>
                        <div class="text">
                            <p>${description}</p>
                        </div>
                        </li>
        `)
    })
}

////=========education=========

//display all edu
function displayEducation(){
    $(".candidate-popup").find(".all-edu li").remove();
    educationList.forEach(function(val){
        $(".candidate-popup").find(".all-edu").append(`
            <li class="edu">
                                        <div class="title">${val['university']}</div>
                                        <div class="date">${val['time_during']}</div>
                                        <div class="degree">- ${val['degree']} of ${val['major']}</div>
            </li>
        `)

    })
}

////=========personal skills=========

//display ps
function displayPS(){
$(".candidate-popup .personal-skill ul li").remove();
personalSkilList.forEach(function(ps){
    	$(".candidate-popup .personal-skill ul").append(`
									<li class="ps">
									<span>${ps}</span>
								</li>
	`);
})
}
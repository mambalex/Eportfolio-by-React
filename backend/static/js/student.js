//get username
var array = document.location.href.toString().split("/");
var username = array[array.length - 1];

//click search
$('.main-page').on('click',  function(e){
    e.preventDefault();
    window.open(`/${username}/search`, '_blank');
});

$('#profile').on('click',  function(e){
    e.preventDefault();
    var url = $(this).attr('href');
    window.open(url+"/"+personalInfo['username'], '_blank');
});

$('#logout').on('click',  function(e){
	window.location.pathname = "./"
});

$('.side-nav').on('click', function(e){
    e.preventDefault();
    $('input').val("");
})

$('.side-nav li').on('click', function(e){
	e.preventDefault();
	$('.side-nav li').removeClass('selected');
	$(this).addClass('selected');
})

$('.portfolio').on('click', function(event){
	$(".skill-set").hide();
	$(".projects").hide();
	$(".contact").hide();
	$(".jobs").hide();
	$(".contact").hide();
	$(".home").css('display','flex');
	$(".home>.bottom i").hide();
})

$(".home-nar").on('click',function(event){
	event.preventDefault();
	$(".skill-set").hide();
	$(".projects").hide();
	$(".contact").hide();
	$(".jobs").hide();
	$(".contact").hide();
	$(".home").css('display','flex');
    $(".home>.bottom i").show();
})

$(".skill-set-nar").on('click',function(event){
	event.preventDefault();
	$(".projects").hide();
	$(".jobs").hide();
	$(".home").hide();
	$(".contact").hide();
	$(".skill-set").css('display','flex');
})

$(".projects-nar").on('click',function(event){
	event.preventDefault();
	$(".skill-set").hide();
	$(".jobs").hide();
	$(".home").hide();
	$(".contact").hide();
	$(".projects").show();
})

$(".jobs-nar").on('click',function(event){
	event.preventDefault();
	$(".skill-set").hide();
	$(".projects").hide();
	$(".contact").hide();
	$(".home").hide();
	$(".jobs").css('display','flex');
})

$(".contact-nar").on('click',function(event){
	event.preventDefault();
	$(".skill-set").hide();
	$(".projects").hide();
	$(".contact").hide();
	$(".jobs").hide();
	$(".home").hide();
	$(".contact").css('display','flex');
})

function welcomeUser(){
    var name = allData["personal_info"]['name'];
    $(".welcome-user").text(`Welcome, ${name}`);
    $(".welcome-user").show();
}



//==============================================AJAX request==============================================//


var aboutMe;
var personalSkilList;
var skillList;
var personalInfo;
var courseList;
var educationList;
var experienceList;
var allData;
var savedJobList;
var rcmdJobList;
var allJobList;


$(document).ready(function(){
    $('.portfolio').click();
    getAllInfo();
    welcomeUser();
    displayHomePage();
    displayProjCourse();
    displayProjects();
    displayJobs();
})



function getAllInfo(){
    return $.ajax({
            type:'POST',
            url:'/api/candidate_get_main_data',
            async:false,
            headers:{
                'Authorization': 'Basic ' + btoa(JSON.parse(localStorage.getItem(username)).token+':')
            },
            success(rsp_data){
                        localStorage.setItem(`${username}Info`, JSON.stringify(rsp_data));
                        console.log(rsp_data);
                        allData = rsp_data;
                        aboutMe = rsp_data['about_me'];
                        personalInfo = rsp_data['personal_info'];
                        skillList = rsp_data['skill_set'];
                        courseList = rsp_data['course_list'];
                        educationList = rsp_data['education_exp'];
                        projectList = rsp_data['project_list'];
                        experienceList = rsp_data['experiences'];
                        personalSkilList = rsp_data['personal_skill'];
                        savedJobList = rsp_data['saved_job_list'];
                        rcmdJobList = rsp_data['recommendation_list'];
                        allJobList = savedJobList.concat(rcmdJobList);

            }
          })
}

//update allInfo
$(".update").on('click',function(){
    let aboutMe = $(".home").find(".about-me p").text();
    let allSkills =  updateSkills();
    let allCourses = updateCourses();
    let allEducation =  updateEducation();
    let allProjects =  updateProjects();
    let allExperiences = updateExperiences();
    let allPersonalSkills = updatePersonalSkills();
    let allContact = updateAllContact();
    allData = {
        "aboutMe": aboutMe,
        "allPersonalSkills":allPersonalSkills,
        "allSkills": allSkills,
        "allCourses": allCourses,
        "allEducation":allEducation,
        "allProjects": allProjects,
        "allExperiences":allExperiences,
        'allContact':allContact
    }
    console.log(allData);
    return $.ajax({
            type:'POST',
            url:'/api/student_update',
            contentType: "application/json",
            data:JSON.stringify({update_data:allData}),
            async:false,
            headers:{
                'Authorization': 'Basic ' + btoa(JSON.parse(localStorage.getItem(username)).token+':')
            },
            error: function(rsp_data){
                    console.log(rsp_data);
                    $("#successAlert2").hide();
                    $("#errorAlert2").show();
                    setTimeout(function(){
                        $('#errorAlert2').hide();
                    },2000);
                },
            success:function(rsp_data){
                    console.log(rsp_data);
                    $("#successAlert2").show();
                    $("#errorAlert2").hide();
                    setTimeout(function(){
                        $('#successAlert2').hide();
                        location.reload();
                    },2000);

                }
          })
})




function displayHomePage(){
//==================portfolio & home==================
    $(".home").find(".name").text(personalInfo['name']);
    $(".home .top-contact .email").text(personalInfo['email']);
    $(".home .top-contact .phone").text(personalInfo['phone']);
    $(".home .top-contact .github").text(personalInfo['link']);
    var image = personalInfo['photo'];
    if(image=='None'|| !image){
        image = '../static/img/default.png';
    }else{
        var array = image.split("/");
        var img = array[array.length - 1];
        image  = `../static/img/${img}`;
    }
    $(".home").find("img").attr("src", image);
//=========description=========
    var aboutMeEdit = $(".home .about-me i");
    $(".home").find(".about-me p").text(aboutMe);
//=========skill set=========
    var idx=0;
    $(".home").find(".skill-lists li").remove();
    for (var key in skillList) {
        idx += 1;
        let name =key;
        let pct =skillList[key];
        $(".home").find(".skill-lists ul").append(`
                                            <li>
                                            <a href="">${name}</a> 
                                            <div class="percentage"><div class="left"></div>
                                            <div class="perct">${pct}%</div>
                                            </div>
                                        </li>
        `)
         change(`skill-${idx}`,`${pct}%`);
        if(!skillList){
            $(".home").find(".skill-lists ul li").remove();
        }
    }
//========= project=========
    $(".home-projects-name li").remove();
    projectList.forEach(function (val) {
        let description = val['description'];
        let link = val['link'];
        let name = val['name'];
        $(".home-projects-name").append(`
                    	<li>
                    	<div class='id'>${val['working_exp_uuid']}</div>
                    	<div>${name}</div>
                    	</li>
    `)
    })
//========= experience=========
//display
    $(".all-experience li").remove();
    experienceList.forEach(function(val){
        let date = val['description'].split("\n")[0];
        let description = val['description'].split("\n")[1];
        let name = val['name'];
        $(".all-experience").append(`
                        <li class="experience">
                        <div class="title" data-placeholder='Please enter a title'>${name}</div>
                        <div class="date" data-placeholder='Please enter a date'>${date}</div>
                        <div class="text">
                            <p>${description}</p>
                        </div>
                        <div class="experience-delete"><i class="fas fa-trash-alt"></i></div>
                        <div class="experience-edit"><i class="fas fa-pencil-alt"></i></div>
                        </li>
        `)
    })
//========= education=========
    $(".home").find(".all-edu li").remove();
    educationList.forEach(function(val){
        $(".home").find(".all-edu").append(`
                <li class="edu">
                          <div class="title">${val['university']}</div>
                          <div class="date">${val['time_during']}</div>
                          <div class="degree">- ${val['degree']} of ${val['major']}</div>
                          <div class="education-delete"><i class="fas fa-trash-alt"></i></div>
                          <div class="education-edit"><i class="fas fa-pencil-alt"></i></div>
            </li>
        `)

    })

//=========personal skills=========
    //display ps
    $(".personal-skill ul li").remove();
    personalSkilList.forEach(function(ps){
            $(".personal-skill ul").append(`
                       <li class="ps">
                        <span>${ps}</span>
                        <div class="ps-delete"><i class="fas fa-trash-alt"></i></div>
                        <div class="ps-edit"><i class="fas fa-pencil-alt"></i></div>
                         </li>
        `);
    })

}





//edit about me
$('.profile-edit').on('click', function(event){
	event.preventDefault();
	var element = $(this).siblings('.edit');
	if (element.attr('contenteditable') ==='false'){
		element.attr('contenteditable', 'true');
		element.css("border",'1px solid rgb(200,200,200)');
	}else{
		element.attr('contenteditable', 'false');
		element.css("border",'none');
	}
})


// search the CSSOM  rule
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
                }
            }
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

//=========homepage project=========

// project popup
$(document).on("click",".home-projects-name li div", function(){
   let id = $(this).siblings(".id").text();
   projectList.forEach(function(prj){
        if (prj['working_exp_uuid'] == id){
            $(".project-popup .title p").text(prj['name']);
            $(".project-popup .description").text(prj['description']);
            $(".project-popup .link a").text(`-  ${prj['link']}`);
            $(".project-popup .link a").attr('href',prj['link']);
            $('.project-popup ul li').remove();
            prj['techs'].forEach(function(val){
                $(".project-popup ul").append(`<li>${val}</li>`)
            });
            $(".project-popup").show();
        }
   })
})

//close popup
$(document).mouseup(function(e)
{
    var container = $(".project-popup");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        container.hide();
    }
});



//=========experiences=========

// get update data
function updateExperiences(){
    var allExperience = [];
    $(".home-experience .experience").each(function(idx, li){
        var experience={};
        var flag = "no";
        for(var exp of experienceList){
            if(exp['name']==$(li).find(".title").text()){
                experience['uuid'] = exp['working_exp_uuid'];
                flag = "yes";
                break
            }
        }
        if(flag=="no"){experience['uuid']="none"};
        experience['title']= $(li).find(".title").text();
        experience['date']= $(li).find(".date").text();
        experience['text']= $(li).find("p").text();
        allExperience.push(experience)
    })
    return allExperience;
}


//delete experience
$(document).on('click', '.experience-delete', function(event){
	$(this).parent().remove();
})

//edit experience
$(document).on('click', '.experience-edit', function(event){
	event.preventDefault();
	var title = $(this).siblings('.title');
	var date = $(this).siblings('.date');
	var text = $(this).siblings('.text');
	if (title.attr('contenteditable') ==='false'){
		title.attr('contenteditable', 'true');
		title.css("border",'1px solid #ffcc00');
		date.attr('contenteditable', 'true');
		date.css("border",'1px solid #66cc99');
		text.attr('contenteditable', 'true');
		text.css("border",'1px solid rgb(200,200,200)');
	}else{
		title.attr('contenteditable', 'false');
		text.attr('contenteditable', 'false');
		date.attr('contenteditable', 'false');
		title.css("border",'none');
		date.css("border",'none');
		text.css("border",'none');
	}
})

//add experience
$('.experience-add').on('click', function(event){
	event.preventDefault();
	$(".all-experience").append("<li class='experience'><div class='title' data-placeholder='Please enter a title'></div><div class='date' data-placeholder='Please enter a date'></div><div class='text' data-placeholder='Please enter your experience'><p></p></div><div class='experience-delete'><i class='fas fa-trash-alt'></i></div><div class='experience-edit'><i class='fas fa-pencil-alt'></i></div></li>");
});


//=========education=========

//get update data
function updateEducation(){
    var allEducation = [];// [{title: "University of New South Wales", date: "2017-2 till 2018-11"..}]
    $(".home").find(".edu").each(function(idx, li){
        var education = {};
        var flag = "no";
        for(var edu of educationList){
            if(edu['time_during']==$(li).find(".date").text()){
                education['uuid'] = edu['education_exp_uuid'];
                flag='yes';
                break
            }
        }
        if(flag=="no"){education['uuid']="none"};

        education['title']= $(li).find(".title").text();
        education['date']= $(li).find(".date").text();
        education['degree']= $(li).find(".degree").text().split(" ")[1];
        education['major']= $(li).find(".degree").text().split(" ")[3];
        allEducation.push(education)
    })
    return allEducation;
}

// delete education
$(document).on('click', '.education-delete', function(event){
	$(this).parent().remove();
	// $(this).parent().hide();
})

//edit education
$(document).on('click', '.education-edit', function(event){
	event.preventDefault();
	var title = $(this).siblings('.title');
	var date = $(this).siblings('.date');
	var degree = $(this).siblings('.degree');
	if (title.attr('contenteditable') ==='false'){
		title.attr('contenteditable', 'true');
		title.css("border",'1px solid #ffcc00');
		date.attr('contenteditable', 'true');
		date.css("border",'1px solid #66cc99');
		degree.attr('contenteditable', 'true');
		degree.css("border",'1px solid rgb(200,200,200)');
	}else{
		title.attr('contenteditable', 'false');
		degree.attr('contenteditable', 'false');
		date.attr('contenteditable', 'false');
		title.css("border",'none');
		date.css("border",'none');
		degree.css("border",'none');
	}
})

//add education
$('.education-add').on('click', function(event){
	event.preventDefault();
	$(".all-edu").append("<li class='edu'><div class='title' data-placeholder='Please enter a title'></div><div class='date' data-placeholder='Please enter a date'></div><div class='degree' data-placeholder='Please enter a degree'></div><div class='education-delete'><i class='fas fa-trash-alt'></i></div><div class='education-edit'><i class='fas fa-pencil-alt'></i></div></li>");
});


//=========personal skills=========

//get update data
function updatePersonalSkills(){
    var allPersonalSkills = [];
    $(".ps").each(function(idx, li){
        allPersonalSkills.push($(li).find("span").text());
    })
    return allPersonalSkills;
}

// delete ps
$(document).on('click', '.ps-delete', function(event){
	$(this).parent().remove();
})

//add ps
$('.ps-add').on('click', function(event){
	event.preventDefault();
	$(".personal-skill ul").append(`
									<li class="ps">
									<span></span>
									<div class="ps-delete"><i class="fas fa-trash-alt"></i></div>
	        						<div class="ps-edit"><i class="fas fa-pencil-alt"></i></div>
								</li>
	`);
});

//edit ps
$(document).on('click', '.ps-edit', function(event){
	event.preventDefault();
	var ps = $(this).siblings('span');
	if (ps.attr('contenteditable') ==='false'){
		ps.attr('contenteditable', 'true');
		ps.css("border",'1px solid #ffcc00');
	}else{
		ps.attr('contenteditable', 'false');
	    ps.css("border",'none');
	}
})



//==================Skill Set & Courses==================

function displayProjCourse(){

//=========Skill=========
    $(".skill-set .skill-list li").remove();
    for (var key in skillList) {
      $(".skill-set .skill-list").append(`
         <li class="text">
             <div class="text">${key}</div> 
             <div class="percent">${skillList[key]}%</div><i class="far fa-trash-alt "></i>
         </li>
      `)
    }
//=========courses=========
    $(".courses-wrapper .courses li").remove();
    courseList.forEach(function(val){
        $(".courses-wrapper .courses").append(`
                                         <li class="course">
                                                <div class="wrapper">
                                                    <div class="course-title">${val['code']}</div>
                                                    <div class="text">-${val['name']}</div>
                                                     <i class="far fa-trash-alt "></i>
                                                 </div>
                                            </li>
        `)
    });
}



//==================Skill Set==================

//get update data
function updateSkills(){
    var skillSetPage={};
    $(".skill-set .skill-list li ").each(function(idx, li){
        skillSetPage[$(li).find(".text").text()] = $(li).find(".percent").text();
    })
    return skillSetPage;
}


//delete skill
$(".skill-list").on('click', 'i',function(event){
	event.preventDefault();
	$(this).parent().remove();
});

//add skill
$(".skill-form").on('click','button', function(e){
    var newVar = $(".input").val();
    var new_percent = $("#percentage").val();
	var flag = 1;
	e.preventDefault();
	if(newVar.match(/^ *$/) === null){
		$(".skill-list li").each(function(){
			// console.log(newVar);
			// console.log($(this).children(".text").text());
			if(newVar == $(this).find(".text").text() && $(this).css('display') !== "none" ){
				flag = 0;
				alert("The skill already exists")
			}
		});
		if(flag === 1){$(".skill-list").append("<li><div class='text'>" + newVar + "</div><div class='percent'>" + new_percent + "</div><i class='far fa-trash-alt'></i></li>");}
	}
	console.log(newVar, new_percent);
})

//=========courses=========

//get update data
function updateCourses(){
    var courses=[];    //[ {COMP9321: "-Data Services Engineering"} ]
    $(".skill-set .courses li").each(function(idx, li){
        var course={}
        var title = $(li).find(".text").text();
        title = title.substring(1, title.length);
        course[$(li).find(".course-title").text()] = title;
        courses.push(course);
    })
    return courses
}

//delete course
$(".courses").on('click', 'i',function(event){
	event.preventDefault();
	$(this).parent().parent().remove();
});
//click course add
$(".course-form").on('click','button', function(e){
	var flag = 1;
	e.preventDefault();
	var newVar = $("#course-title-input").val();
	var name = $("#course-name-input").val();
	if(newVar.match(/^ *$/) === null){
		$(".course-title").each(function(){
			if(newVar == $(this).text() && $(this).css('display') !== "none" ){
				flag = 0;
				alert("The course already exists")
			}
		});
		if(flag === 1){$(".courses").append("<li class='course'><div class='wrapper'><div class='course-title'>"+ newVar +"</div><div class='text'>-" + name + "</div><i class='far fa-trash-alt '></i></div></li>");}
	}
})

//==================Project==================

function displayProjects(){
    //display
    projectList.forEach(function(val){
        $(".projects .project").remove();
        $(".projects").append(`
                                <div class="project">
                                <div class="title" data-placeholder="title">${val['name']}</div>
                                <div class="prj-edit"><i class="fas fa-pencil-alt"></i></div>
                                <div class="prj-delete"><i class="fas fa-trash-alt"></i></div>
                                <div class="description" data-placeholder="description">${val['description']}</div>
                                <div class="tech">
                                    <div class="tech-title">Technologies:</div>
                                    <div class="tech-add"><i class="fas fa-plus"></i></div>
                                    <div class="text">
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                                <div class="link">
                                    <div class="link-title"> Link to the project:</div>
                                    <div class="url" data-placeholder="url">${val['link']}</div>
                                </div>
                            </div>
        `)
        $(".project").find(".tech ul li").remove();
        val['techs'].forEach(function(val){
                $(".project").find(".tech ul").append(`
                                          <li>
                                                <div class="tech-name" data-placeholder="technology">${val}</div>
                                                <div class="tech-delete"><i class="fas fa-trash-alt"></i></div>
                                            </li>
                    `)
        })

    })
}

//get update data
function updateProjects(){
    var projects=[];
    $(".projects .project").each(function(idx, proj){
        var project={};
        var flag = "no";
        for(var prj of projectList){
            if(prj['name']==$(proj).find(".title").text()){
                project['uuid'] = prj['working_exp_uuid'];
                flag = 'yes';
                break
            }
        }
        if(flag=="no"){project['uuid']="none"};
        var techs=[];
        project['title'] = $(proj).find(".title").text();
        project['description'] = $(proj).find(".description").text();
        project['link'] = $(proj).find(".url").text();
        $(proj).find(".tech-name").each(function(idx,tech){
            techs.push($(tech).text());
        })
        project['techs'] = techs;
        projects.push(project);
    })
    return projects;
}

//edit
$(document).on('click','.prj-edit',function(e){
    e.preventDefault();
	var title = $(this).siblings(".title");
	var description = $(this).siblings('.description');
	var tech = $(this).siblings(".tech").find(".tech-name");
	var link = $(this).siblings('.link').find(".url");

	if (title.attr('contenteditable') ==='false'){
		title.attr('contenteditable', 'true');
		title.css("border",'1px solid black');
		tech.attr('contenteditable', 'true');
		tech.css("border",'1px solid black');
		description.attr('contenteditable', 'true');
		description.css("border",'1px solid black');
		link.attr('contenteditable', 'true');
		link.css("border",'1px solid rgb(200,200,200)');
	}else{
		title.attr('contenteditable', 'false');
		tech.attr('contenteditable', 'false');
		description.attr('contenteditable', 'false');
		link.attr('contenteditable', 'false');
		title.css("border",'none');
		description.css("border",'none');
		link.css("border",'none');
		tech.css("border",'none');}
})

//delete
$(document).on('click','.prj-delete',function(e){
  $(this).parent().remove();
})

//add
$(document).on('click','.prj-add',function(e){
  $(this).siblings(".title").after(`
            <div class="project">
                                <div class="title" contenteditable="true" data-placeholder="Title"
                                style="border:1px solid black;"></div>
                                <div class="prj-edit"><i class="fas fa-pencil-alt"></i></div>
                                <div class="prj-delete"><i class="fas fa-trash-alt"></i></div>
                                <div class="description" data-placeholder="Description"
                                contenteditable="true" style="border:1px solid black;"></div>
                                <div class="tech">
                                    <div class="tech-title">Technologies:</div>
                                    <div class="tech-add"><i class="fas fa-plus"></i></div>
                                    <div class="text">
                                        <ul>
                                        <li>
                                            <div class="tech-name" data-placeholder="technology"
                                            contenteditable="true" style="border:1px solid black">

                                            </div>
                                            <div class="tech-delete"><i class="fas fa-trash-alt"></i></div>
                                        </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="link">
                                    <div class="link-title" > Link to the project:</div>
                                    <div class="url" data-placeholder="url" contenteditable="true"
                                    style="border:1px solid black;"></div>
                                </div>
	        			</div>

  `);
})

//add tech
$(document).on('click','.tech-add',function(e){
    $(this).siblings('.text').find('ul').append(`
        <li>
        <div class="tech-name" data-placeholder="technology"
        contenteditable="true" style="border:1px solid black">

        </div>
        <div class="tech-delete"><i class="fas fa-trash-alt"></i></div>
        </li>
    `)
})

//delete tech
$(document).on('click','.tech-delete',function(e){
   $(this).parent().remove();
})


//==================Jobs==================

function displayJobs (){
    //display all saved jobs
    $(".jobs .right .save-jobs li").remove();
    savedJobList.forEach(function(job){
    var id = job['job_info_id'];
    var companyId = job['company_id'];
    var title = job['job_name'];
    $(".jobs .right .save-jobs").append(`
                                        <li class="text">
                                            <div class="companyId">${companyId}</div>
											<div class="id">${id}</div>
											<span class="text popup">${title}</span>
											<i class="far fa-trash-alt "></i>
										</li>
    `)
    })
    //recommended jobs
    $(".rcm li").remove();
    rcmdJobList.forEach(function(job){
        var id = job['job_info_id'];
        var title = job['job_name'];
        var referrer = job['referrer'];
        $(".rcm").append(`
                <li>
                    <div class="id">${id}</div>
                    <div class="job popup">${title}</div>
                    <div class="referrer">by<a href="">${referrer}</a></div>
                </li>
        `)
    })
}




var jobId;
var companyId;
////============job-popup============

//click job popup
$(document).on('click', '.popup', function(e){
	e.preventDefault();
	jobId = $(this).siblings(".id").text();
	companyId = $(this).siblings('.companyId').text();
	for(var job of allJobList){
            if(job['job_info_id']== jobId){
               var title = job['job_name'];
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
    };
    $(".job-popup .title2 span").text(title);
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
    $(".job-popup").css("top",e.pageY+100);
})

//apply for a job

$(document).on('click', '.save-job', function(e){
            let company_id = companyId;
            let job_info_id = jobId;
            var formData = new FormData();
            formData.append('company_id', company_id);
            formData.append('job_info_id', job_info_id);
            $.ajax({
                type: 'POST',
                url: '/api/send_resume',
                data: formData,
                contentType: false,
                cache: false,
                contentType: false,
                processData: false,
                async: false,
                headers: {
                    'Authorization': 'Basic ' + btoa(JSON.parse(localStorage.getItem(username)).token + ':')
                },
                error: function(rsp_data){
                    console.log(rsp_data);
                    $("#successAlert").hide();
                    $("#errorAlert").show();
                    setTimeout(function(){
                        $('#errorAlert').hide();
                    },2000);
                },
                success:function(rsp_data){
                    console.log(rsp_data);
                    $("#successAlert").show();
                    $("#errorAlert").hide();
                    setTimeout(function(){
                        $('#successAlert').hide();
                    },2000);
                }
            })

})



////close job popup
$(document).mouseup(function(e)
{
    var container = $(".job-popup");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        container.hide();
    }
});


//delete save job
$(".save-jobs").on('click', 'i',function(event){
	event.preventDefault();
	$(this).parent().remove();
});


//==================Contact==================
//var contact={}; //{email: "alexzhangzhiqin@gmail.com", phone: "1223", github: "dfdf"}
$(".contact .contact-email").text(personalInfo['email']);
$(".contact .contact-phone").text(personalInfo['phone']);
$(".contact .contact-github").text(personalInfo['link']);

//get update data
function updateAllContact() {
    var allContact={};
    allContact['email'] = $(".contact .contact-email").text();
    allContact['phone'] = $(".contact .contact-phone").text();
    allContact['github'] = $(".contact .contact-github").text();
    return allContact;
}

//edit contact
$('.contact-l').find('.edit').on('click',function(event){
	event.preventDefault();
	var element = $(this).siblings('.text-2');
	if (element.attr('contenteditable') ==='false'){
		element.attr('contenteditable', 'true');
		element.css("border",'1px solid rgb(200,200,200)');
	}else{
		element.attr('contenteditable', 'false');
		element.css("border",'none');
	}
})




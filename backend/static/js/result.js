var array = document.location.href.toString().split("/");
var jobOrCan = array[3];
var keywordCan = array[4];
var searchInfo = JSON.parse(localStorage.getItem(keywordCan));
var username = searchInfo['username'];
var name;
var jobList;
var canList;
var allCans = {};
var role;

console.log(searchInfo);
displaySearchingCon();
if(jobOrCan=='jobs'){
    getJobInfo();
    displayJobs();
}else if(jobOrCan =='candidates'){
    getCanInfo();
    displayCans();
}
welcomeUser();






function displaySearchingCon(){
        //display left hand side
        if(jobOrCan=='jobs'){
            $(".can-list").hide();
            $(".job-list").show();
        }else{
            $(".job-list").hide();
            $(".can-list").show();
            $(".left .salary").hide();
        }

        //display tags
        $("#all-tags li").remove();
        var tags = searchInfo['tags'];
        if(tags){
            tags.forEach(function(val){
                $("#all-tags").append(`<li>${val}</li>`)
            })
        }

        //display worktype
        $("#workType li").remove();
        var workType = searchInfo['workType'];
        if(workType){
            $("#workType").append(`<li>${workType}</li>`)
        }

        //display location
        $("#lct li").remove();
        var lct = searchInfo['location'];
        if(lct){
            $("#lct").append(`<li>${lct}</li>`)
        }

        //display salary
        var salary = searchInfo['salaries'];
        if(salary){
            $("#salary").text(salary);
        }
}



function welcomeUser(){
    $(".welcome-user").text(`Welcome, ${name}`);
    $(".welcome-user").show();
}


//====================================================jobs====================================================


//getJobInfo
function getJobInfo(){
    var allData={
        'salary': searchInfo['salaries'],
        'location': searchInfo['location'],
        'workType': searchInfo['workType'],
        'tags':    searchInfo['tags'],
        'keyword':searchInfo['keyword'],
        'language': searchInfo['language']
     }
     console.log(allData)
    return $.ajax({
            type:'POST',
            url:'/api/search_job_info',
            contentType: "application/json",
            data:JSON.stringify({'search_data':allData}),
            async:false,
            headers:{
                'Authorization': 'Basic ' + btoa(JSON.parse(localStorage.getItem(username)).token+':')
            },
            success(rsp_data){
                        console.log(rsp_data);
                        jobList = rsp_data['data'];
                        name = rsp_data['name'];
                        role = rsp_data['role'];
            }
          })
}

//display all jobs
function displayJobs(){
    $(".job-list li").remove();
    jobList.forEach(function(job){
        let title = job['job_title'];
        let description = job['description'];
        let id = job['job_info_id'];
        $(".job-list").append(`
                              <li class="job">
                                <p class="title">${title}</p>
                                  <div class="id">${id}</div>
                                    <div class="description">${description}</div>
                                </li>

    `)
    })
}

//save a job
$(document).on('click', ".save-job", function(e){
            let id = $(this).siblings(".id").text();
            var formData = new FormData();
            formData.append('job_info_id', id);
            $.ajax({
            type: 'POST',
            url: '/api/add_saved_job',
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








//jobs popup
$(document).on('click', '.job p', function(e){
    e.preventDefault();
    let id = $(this).siblings('.id').text();
    for(var job of jobList){
        if(job['job_info_id'] == id){
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
    $(".job-popup .id").text(id);
    $(".job-popup .title span").text(title);
    $(".job-popup #salary2").text(salary);
    $(".job-popup #lct2").text(location);
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
    if(role=='employer'){
        $(".save-job").hide()
    }
    $(".job-popup").css("top",e.pageY-250);
    $('.job-popup').css('display','flex');
})

//job popup close
$(document).on('click', '.job-popup-close', function(e){
    e.preventDefault();
    $('.job-popup').hide();
})

//========================================Candidates=====================================================

//get candidates info
function getCanInfo(){
    var allData={
//        'workType': searchInfo['workType'],
        'keyword':  searchInfo['candidate'],
        'location': searchInfo['location'],
        'tags':    searchInfo['tags'],
        'language': searchInfo['language'],
     }
    return $.ajax({
            type:'POST',
            url:'/api/search_user',
            contentType: "application/json",
            data:JSON.stringify({'search_data':allData}),
            async:false,
            headers:{
                'Authorization': 'Basic ' + btoa(JSON.parse(localStorage.getItem(username)).token+':')
            },
            success(rsp_data){
                        console.log(rsp_data);
                        canList = rsp_data['data'];
                        role = rsp_data['role'];
                        name = rsp_data['name'];
            }
          })
}


//display all cans
function displayCans(){
    $(".can-list li").remove();
    canList.forEach(function(can){
        allCans[can['username']]= can;
        let name = can['name'];
        let description = can['about_me'];
        let id = can['username'];
        $(".can-list").append(`
                              <li class="can">
									<p class="title">${name}</p>
									<div class="id">${id}</div>
									<div class="description">${description}</div>
							  </li>

                              `)
    })
}


//============================================candidate popup============================================

var personalSkilList;
var skillList;
var courseList;
var educationList;
var experienceList;
var allCans;

var clickCanName;
var status;





//open candidate popup
$(document).on('click', '.can p', function(e){
    e.preventDefault();
    clickCanName = $(this).siblings(".id").text();
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
    $(".candidate-popup").css("top",e.pageY-250);
    $('.candidate-popup').css('display','flex');
    $('.job-popup').hide();
})

//close candidate popup
$(document).mouseup(function(e)
{
    var container = $(".candidate-popup");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        container.hide();
    }
});


$(document).on('click', ".save-can", function(e){
            let id = clickCanName;
            var formData = new FormData();
            formData.append('saved_user_id', id);
            $.ajax({
            type: 'POST',
            url: '/api/add_saved_user',
            data: formData,
            contentType: false,
            cache: false,
            contentType: false,
            processData: false,
            async: false,
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
///==========================================end candidates part=========================================


















//click profile
$('#profile').on('click',  function(e){
    e.preventDefault();
    window.open("/profile/"+username, '_blank');
});
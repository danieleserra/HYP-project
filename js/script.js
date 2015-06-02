$(document).ready(ready);

function ready(){
      console.log("I'm ready!");
      loadHome();
 	  $(".navbar-brand#home1").on("click",loadHome);
 	  $(".home").on("click",loadHome);
      $("#loc").on("click", loadLocation);
      $("#ins").on("click", loadInstructors);
      $("#cat").on("click",loadCategories);
    //$(document).on ("click", ".insegnanti", loadSingleIns());   
     

} 

function disableClick(){
 $(document).off("click");
    //ritorna a funzionare il menù a tendina
    var my_awesome_script = document.createElement('script');
    my_awesome_script.setAttribute('src','js/bootstrap.js'); 
    document.head.appendChild(my_awesome_script);
}

function loadHome(){	
        $( ".scorrimentoslide" ).show("slow");
        console.log("Sei nella home");
        $.ajax({
            method: "POST",
            //dataType: "json", //type of data
            crossDomain: true, //localhost purposes
            url: "./getCarousel.php", //Relative or absolute path to file.php file
            success: function(response) {
                $(".scorrimentoslide").html(" "+response);
            },
            error: function(request,error) {
                    console.log("Error");
            }
        });
        $.ajax({
            method: "POST",
            //dataType: "json", //type of data
            crossDomain: true, //localhost purposes
            url: "./getHome.php", //Relative or absolute path to file.php file
            success: function(response) {
                $(".contenuti").html(" "+response);
            },
            error: function(request,error) {
                console.log("Error");
            }
        });
}

function loadLocation(){
        $( ".scorrimentoslide" ).fadeOut( "slow" );
        window.onload = loadScript(); //Carica la mappa
        console.log("Location");
        $.ajax({
            method: "POST",
            //dataType: "json", //type of data
            crossDomain: true, //localhost purposes
            url: "./getLocation.php", //Relative or absolute path to file.php file
            success: function(response) {
                $(".contenuti").html(" "+response);
                $(".barrainbasso").fadeOut(1);
                $(".barrainbasso").fadeIn(1000);
            },
            error: function(request,error) 
            {
                console.log("Error");
            }
        });                    
}

function loadInstructors(){
    $( ".scorrimentoslide" ).fadeOut( "slow" );
    console.log("Instructors");
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "./getInstructors.php", //Relative or absolute path to file.php file
        success: function(response) {    
            $(".contenuti").html(" "+response);
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });     
                
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "./query/ins.php", //Relative or absolute path to file.php file
       
        success: function(response) {
			console.log(JSON.parse(response));
            var instructor=JSON.parse(response);
            var el="";
			for(var i=0;i<instructor.length;i++){
                $(document).on("click", ".insegnanti#i"+[i+1], loadSingleIns);
                el+="<div class='insegnanti' id='i"+instructor[i].id+"'><img src='"+instructor[i].th_image+"'><div class='ins_name'>"+instructor[i].name+" "+instructor[i].surname+"</div></div>";   
            }
            $(".contenitore-dinamico").html(el);
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });          
}
       

function loadSingleIns(){
    i = this.id.replace('i','');
    disableClick();

    $(".insegnanti").not(this).fadeOut(2000);
    $(this).find('.desc').fadeOut(2000);
    $(".headerline").html("<a href='#instructors'>Instructors <<</a>");
    $(document).on("click", ".headerline", loadInstructors);
    $(this).find('img').animate({
        opacity: 0,
        width: "220%",   
        height: "180%",   
    }, 2000, function() {
    // Animation complete.
    });
    
    setTimeout(function(){
        $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "./query/ins.php", //Relative or absolute path to file.php file
        success: function(response) {
			console.log(JSON.parse(response));
            var instructor=JSON.parse(response);
            var el="";
			i=i-1;
            el+="<style>.insegnanti{vertical-align: bottom}</style><div class='insegnanti' id='i"+instructor[i].id+"'><img src='"+instructor[i].image+"'><div class='desc'><b><p style='font-size:20px'>"+instructor[i].name+" "+instructor[i].surname+"</b></p><br><br>"+instructor[i].description+"</div></div><div class='twitter'><a class='twitter-timeline' href='https://twitter.com/"+instructor[i].twitter+"' data-widget-id='"+instructor[i].twitter_id+"'>Tweet di @"+instructor[i].twitter+"</a></div>";   
            
            $(".contenitore-dinamico").html(el);
            $(".contenitore-dinamico").hide();
            $(".contenitore-dinamico").fadeIn(3000);
            /*Mi annulla lo script twitter caricato in precedenza: mi evita il problema che le timeline di twitter 
            * appaiano una sola volta   */
            $('script#twitter-wjs').remove(); 
            //TWITTER FUNCTION
            !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
            
        },
        error: function(request,error)
            {
                console.log("Error");
            }
        });
    }, 1000);
}

function loadCategories(){
    $(".headerline").html("Categories");
    $( ".scorrimentoslide" ).fadeOut( "slow" );
    $(".contenitore-dinamico").innerHTML = "";
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "./getAllCategories.php", //Relative or absolute path to file.php file
        success: function(response) {
        $(".contenuti").html(" "+response);
                    },
                    error: function(request,error) 
                    {
                        console.log("Error");
                    }
    });     
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "./query/categ.php", //Relative or absolute path to file.php file
        success: function(response) {
            console.log(JSON.parse(response));
            var coursecategory=JSON.parse(response);
            var el="";
            for(var i=0;i<coursecategory.length;i++){
                $(document).on("click", ".category#i"+coursecategory[i].id, loadSingleCategory);
                el+="<div class='category' id='i"+coursecategory[i].id+"'><img src='"+coursecategory[i].image+"'></div>";   
            }
            $(".contenitore-dinamico").html( "<button type=\"button\" id=\"alphabetical\">Display all courses</button><br><button type=\"button\" id=\"bylevel\">Display courses by level</button><br><br><br>");
            $(document).on("click", "#alphabetical", loadAlphabetical);
            $(document).on("click", "#bylevel", loadbyLevel);
            $(".contenitore-dinamico").append(el);
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });        
}

function loadSingleCategory(){
    i = this.id.replace('i',''); //tolto la i iniziale da ID
    $( ".scorrimentoslide" ).fadeOut( "slow" );
    $(".contenitore-dinamico").innerHTML = "";
    disableClick();
    $(".headerline").html("<a href='#' id='categorie'>All categories <<</a>");
    $(document).on("click", "#categorie", loadCategories);
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "./query/categ.php", //Relative or absolute path to file.php file
        success: function(response) {
            var coursecategory=JSON.parse(response);
            var el="";
            i=i-1;
            el+="<style>.contenitore-dinamico{text-align: left;}.sfondocategorie{background-image: url("+coursecategory[i].sfondo+");    background-position: center; width:100%; height: 600px; margin-top: 0px; margin-left: 0px; margin-right: 0px;  opacity: 0.3;position: absolute;} .category{ width:100%; height: 1000px; margin-top: 0px; margin-left: 0px; margin-right: 0px; position: absolute;}</style><div class='sfondocategorie'></div><div class='category' id='i"+coursecategory[i].id+"'><div class='desc'><style>.desc{width:500px;color:#000000}</style><b><p style='font-size:45px'>"+coursecategory[i].title+"</b></p><br><br><p style='font-size:18px'>"+coursecategory[i].desc+"</p></div>";   
           $(".contenitore-dinamico").html(el);
            
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "./query/cate_has_courses.php", //Relative or absolute path to file.php file
        data: {id: i}, //passo i come parametro
        success: function(response) {
            var course=JSON.parse(response);
            var el1="";
			for(var j=0;j<JSON.parse(response).length;j++){
                console.log(JSON.parse(response).length+" contenuti");
                $(document).on("click", "#corso"+course[j].id, loadSingleCourse);
                el1+="<br><br><a href='#corso"+course[j].id+"'><p style='font-size:18px;line-height: 0.5;'>"+course[j].title+"</p><a>";   
            }
                        $(".category").append(el1);
            console.log("Appesi");
            
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
    
}

function loadSingleCourse(){

    i = this.id.replace('corso',''); 
    $(".contenitore-dinamico").innerHTML = "";
    disableClick();
    $(".headerline").html("<a href='#' id='courses'>All courses <<</a>");
    $(document).on("click", "#courses", loadAlphabetical);
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "./query/singlecourse.php", //Relative or absolute path to file.php file
        data: {id: i}, //passo i come parametro
        success: function(response) {
            var course=JSON.parse(response);
            var el1="";
            console.log(JSON.parse(response).length+" contenuti");
            el1="<br><p style='font-size:23px;line-height: 0.5;'>"+course[0].title+"</p><br><br><p style='font-size:18px;line-height: 1;'>"+course[0].description+"</p>";   
            
            $(".contenitore-dinamico").html(el1);
            
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });

}


function loadAlphabetical(){
    disableClick();
    $(".headerline").html("All courses");
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "./query/allcourses_alp.php", //Relative or absolute path to file.php file
        success: function(response) {
            var course=JSON.parse(response);
            var el="";
			for(var j=0;j<course.length;j++){
                $(document).on("click", "#corso"+course[j].id, loadSingleCourse);
                el+="<br><br><a href='#' id='corso"+course[j].id+"'><p style='font-size:18px;line-height: 0.5;'>"+course[j].title+"</p></a>";   
            }
                        $(".contenitore-dinamico").innerHTML = ""; //cancella contenuto di con.dinamico
                        $(".contenitore-dinamico").html( "<button type=\"button\" id=\"allcateg\">Display all categories</button><br><button type=\"button\" id=\"bylevel\">Display courses by level</button><br><br><br><style>.contenitore-dinamico{    text-align: center;}</style>");
                        $(document).on("click", "#allcateg", loadCategories);
                        $(document).on("click", "#bylevel", loadbyLevel);
                        $(".contenitore-dinamico").append(el);
            
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
    
}

function loadbyLevel(){
    disableClick();
    $(".headerline").html("All courses");
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "./query/allcourses_level.php", //Relative or absolute path to file.php file
        success: function(response) {
            var course=JSON.parse(response);
            var livello=1;
            var el="<p style='font-size:22px;line-height: 1.3;color:#56348d;'>Level "+livello+"</p>";
			for(var j=0;j<course.length;j++){
                $(document).on("click", "#corso"+course[j].title, loadSingleCourse);
                if (course[j].level!=livello){
                    livello=course[j].level;
                    el+="<br><p style='font-size:22px;line-height: 1.3;color:#56348d;'>Level "+livello+"</p>";
                }
                el+="<a href='#corso"+course[j].id+"'><p style='font-size:18px;line-height: 1;'>"+course[j].title+"</p></a>";   
            }
                        $(".contenitore-dinamico").innerHTML = ""; //cancella contenuto di con.dinamico
                        $(".contenitore-dinamico").html( "<button type=\"button\" id=\"allcateg\">Display all categories</button><br><button type=\"button\" id=\"alphabetical\">Display courses by Alphabetical Order</button><br><br><br><style>.contenitore-dinamico{    text-align: center;}</style>");
                        $(document).on("click", "#allcateg", loadCategories);
                        $(document).on("click", "#alphabetical", loadAlphabetical);
                        $(".contenitore-dinamico").append(el);
            
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
    
}


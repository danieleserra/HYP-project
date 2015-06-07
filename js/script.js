        $(document).ready(ready);

        function ready(){
              loadHome();
              $(".navbar-brand#home1").on("click",loadHome);
              $(".home").on("click",loadHome);
              $("#loc").on("click", loadLocation);
              $("#ins").on("click", loadInstructors);
              $("#cat").on("click",loadCategories);
              $("#level").on("click",loadbyLevel);
              $("#alpha").on("click",loadAlphabetical);
             

        } 

function disableClick(){
 $(document).off("click");
    //ritorna a funzionare il menù a tendina
    var my_awesome_script = document.createElement('script');
    my_awesome_script.setAttribute('src','js/bootstrap.js'); 
    document.head.appendChild(my_awesome_script);
}

function loadHome(){	
        $( ".scorrimentoslide" ).fadeIn("slow");
        //Ripristina il vecchio div dell'homepage in index.html 
        $('.contenitoredestra').load(document.URL +  ' .contenitoredestra');
        $('.scorrimentoslide').load(document.URL +  ' .scorrimentoslide');
        $( ".scorrimentoslide" ).show();
}


function loadLocation(){
    
        $( ".scorrimentoslide" ).fadeOut( "slow" );
        $( ".banner" ).fadeOut( "slow" );
        window.onload = loadScript(); //Carica la mappa
    
        $(".contenitoredestra").html(
            "<div class=\"headerline\">Location & Overall Scheduling</div> "+

                "<div id=\"map-canvas\"></div>"+

                "<div class=\"contenitore-dinamico\">"+
                "<div class=\"riquadroIndirizzo\"><b>Big Gym</b><br>1020 Waso St Hood River,<br>MI 97031</div>"+

                "<table id=\"table\">"+
                "  <tr>"+
                "    <th colspan=\"2\">Overall Schedule</th>"+
                "  </tr>"+
                "  <tr>"+
                "    <td>Mon - Fri</td>"+
                "    <td>6:00 am - 11:00 pm</td>"+
                "  </tr>"+
                "  <tr class=\"alt\">"+
                "    <td>Sat & Sun</td>"+
                "    <td>7:00 am - 7:00 pm</td>"+
                "  </tr>"+
                "</table></div><br><br><br><br>"+

                "<div class=\"barrainbasso\"><div class=\"link\"><a href=\"#location\">Where</a></div><div class=\"link\"><a href=\"#contact\" id=\"contact\">Contact</a></div></div>");
        $(document).on("click", "#contact", loadContact);
        $(".barrainbasso").hide();
        $(".barrainbasso").fadeIn(1000);
                              
}

function loadContact(){
    
    $(document).on("click", "#back", loadLocation);
    $(".contenitoredestra").html(
            "<div class=\"headerline\"><a href=\"#back\" id=\"back\">Location & Overall Scheduling </a><<<br> Contact us</div> "+

                "<div class=\"contenitore-dinamico\">"+
                "<div class=\"riquadroIndirizzo\"><b>Big Gym</b><br>1020 Waso St Hood River,<br>MI 97031</div>"+

                "<table id=\"table\">"+
                "  <tr>"+
                "    <th colspan=\"2\">Overall Schedule</th>"+
                "  </tr>"+
                "  <tr>"+
                "    <td>Mon - Fri</td>"+
                "    <td>6:00 am - 11:00 pm</td>"+
                "  </tr>"+
                "  <tr class=\"alt\">"+
                "    <td>Sat & Sun</td>"+
                "    <td>7:00 am - 7:00 pm</td>"+
                "  </tr>"+
                "</table></div><br><br><br><br>"+

                "<div class=\"barrainbasso\"><div class=\"link\"><a href=\"#location\">Where</a></div><div class=\"link\"><b>Contact</b></div></div>");            
}


function loadInstructors(){
    $( ".scorrimentoslide" ).fadeOut( "slow" );
    $( ".banner" ).fadeOut( "slow" );    
    $(".contenitoredestra").html("<div class=\"headerline\">Instructors</div><div class='contenitore-dinamico'></div>"); 
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://hyp.altervista.org/query/ins.php", //Relative or absolute path to file.php file
       
        success: function(response) {
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
    $(".contenitoredestra").html("<div class=\"headerline\"><a href='#instructors' id='back'>Instructors <<</a></div><div class='contenitore-dinamico'></div>"); 
    $(document).on("click", "#back", loadInstructors);
    
    var $instructorID=0;
        $.ajax({
        method: "POST",
        async: false,
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://hyp.altervista.org/query/ins.php", //Relative or absolute path to file.php file
        success: function(response) {
            var instructor=JSON.parse(response);
            var el="";
			i=i-1;
            el="<div class='insegnanti' id='i"+instructor[i].id+"'><img src='"+instructor[i].image+"' style='max-width:100%;height:auto'><div class='desc'><b><p style='font-size:20px'>"+instructor[i].name+" "+instructor[i].surname+"</b></p><br><br>"+instructor[i].description+"</div></div><div class='twitter'><a class='twitter-timeline' href='https://twitter.com/"+instructor[i].twitter+"' data-widget-id='"+instructor[i].twitter_id+"'>Tweet di @"+instructor[i].twitter+"</a></div>";   
            //converte id in int
            $instructorID=parseInt(instructor[i].id);
            
            $(".contenitore-dinamico").hide(el);
            $(".contenitore-dinamico").html(el);
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
    var el1="";
    $.ajax({
        method: "POST",
        async: false,
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://hyp.altervista.org/query/instructor_has_courses.php", //Relative or absolute path to file.php file
        data: {id: $instructorID}, //passo instructor come parametro
        success: function(response) {
            var course=JSON.parse(response);
            for(var j=0;j<JSON.parse(response).length;j++){
                el1+="<div class='elencocorsi' id='corso"+course[j].id+"'><a href='#course' id='#i'"+course[j].id+">"+course[j].title+"</a></div>"; 
                 $(document).on("click", ".elencocorsi#corso"+course[j].id, loadSingleCourse);
            }
            $(".contenitore-dinamico").append("<br><br><br><p style='font-size:25px;line-height: 0.5;font-family: arial;'>Courses teached:</p><br>"+el1);
            
    
           
            
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}

function loadCategories(){
    
    $( ".scorrimentoslide" ).fadeOut( "slow" );
    $(".contenitoredestra").html("<div class=\"headerline\">Course Categories</div><div class=\"contenitore-dinamico\"></div>");
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://hyp.altervista.org/query/categ.php", //Relative or absolute path to file.php file
        success: function(response) {
            var coursecategory=JSON.parse(response);
            var el="";
            for(var i=0;i<coursecategory.length;i++){
                $(document).on("click", ".category#i"+coursecategory[i].id, loadSingleCategory);
                el+="<div class='category' id='i"+coursecategory[i].id+"'><img src='"+coursecategory[i].image+"'></div>";   
            }
            $(".contenitore-dinamico").html( "<button type=\"button\" id=\"alphabetical\">Display all courses</button><br><br><button type=\"button\" id=\"bylevel\">Display courses by level</button><br><br><br>");
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
    disableClick();
    
     $(".categoria").html("");
     $(".sfondocategorie").html("");
     $(".desc").html("");
    $(".contenitoredestra").html("");
     $(".contenitore-dinamico").html("");
    
    $(".contenitoredestra").html("<div class=\"headerline\"><a href='#' id='categorie'>All categories <<</a></div>");
    $(document).on("click", "#categorie", loadCategories);
    var el="";
    $.ajax({ 
            method: "POST",
            async: false,
            //dataType: "json", //type of data
            crossDomain: true, //localhost purposes
            url: "http://hyp.altervista.org/query/categ.php", //Relative or absolute path to file.php file
            success: function(response) {
                var coursecategory=JSON.parse(response);
                i=i-1;
                var el="";
                el="<style>.contenitore-dinamico{text-align: left;}.sfondocategorie{background-image: url("+coursecategory[i].sfondo+");    background-position: top; width:100%; height: 900px; margin-top: 0px; margin-left: 0px; margin-right: 0px;  background-repeat: no-repeat;opacity: 0.3;position: relative;}</style><div class='contenitore-dinamico'><div class='sfondocategorie'></div><div class='categoria' id='i"+coursecategory[i].id+"'><div class='desc'><style>.desc{width:100%;color:#000000;text-align: center;}</style><b><p style='font-size:45px'>"+coursecategory[i].title+"</b></p><br><br><p style='font-size:18px'>"+coursecategory[i].desc+"</p></div></div>";   
               $(".contenitoredestra").append(el);

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
        url: "http://hyp.altervista.org/query/cate_has_courses.php", //Relative or absolute path to file.php file
        data: {id: i}, //passo i come parametro
        success: function(response) {
            var course=JSON.parse(response);
            var el="";
			for(var j=0;j<JSON.parse(response).length;j++){
                $(document).on("click", "#corso"+course[j].id, loadSingleCourse);
                el+="<br><a href='#' id='corso"+course[j].id+"'><p style='font-size:18px;line-height: 0.4;'>"+course[j].title+"</p></a>";   
            }                
                $(".desc").append(el);           
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
    
       
}

function loadSingleCourse(){

    i = this.id.replace('corso',''); 
    $(".category").html("");
    $(".contenitore-dinamico").html("");
    $(".contenitoreSpeciale").html("");
    $(".contenitoreSpeciale2").html("");
    disableClick();
    $(".contenitoredestra").html("<div class=\"headerline\"><a href='#' id='courses'>All courses <<</a></div><div class=\"contenitore-dinamico\"></div>");
    $(document).on("click", "#courses", loadAlphabetical);
    var $instructorID=3;
    
    $.ajax({
        //mi completa la prima chiamata... poi passa alla successiva
        async: false,
        method: "POST",
        
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://hyp.altervista.org/query/singlecourse.php", //Relative or absolute path to file.php file
        data: {id: i}, //passo i come parametro
        success: function(response) {
            var course=JSON.parse(response);
            var el1="";
            el1="<br><p style='font-size:53px;line-height: 0.5;font-family: Gloria Hallelujah;'>"+course[0].title+"</p><br><br><div class='contenitoreSpeciale'><style> .contenitoreSpeciale {border-radius: 25px;   background-color: #d7dcfa;border: 4px solid #6e98f7;    padding: 20px;     width: 90%; margin-left:5%;   height: auto}</style><img src='http://hyp.altervista.org/images/courses/"+course[0].image+"' style='max-width:100%;height:auto'><br><br><br><p style='font-size:18px;line-height: 1;'>"+course[0].description+"</p></div>";   
            
            
            $instructorID=course[0].instructor;
            $(".contenitore-dinamico").html(el1);
            
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
    $.ajax({
        method: "POST",
        async: false,
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://hyp.altervista.org/query/course_has_instructor.php", //Relative or absolute path to file.php file
        data: {id: $instructorID}, //passo instructor come parametro
        success: function(response) {
            var instructor=JSON.parse(response);
            var el="";
            var value= parseInt(instructor[0].id);
            el="<br><br><br><div class='contenitoreSpeciale2' id='i"+(value)+"'><style> .contenitoreSpeciale2 { background-color: #baa8ba;border: 2px solid #534053;    padding: 20px;     width: 90%; margin-left:5%;   height: 150px}</style><p style='font-size:25px;line-height: 1;font-family: Gloria Hallelujah;'>Teacher of the course: "+instructor[0].name+" "+instructor[0].surname+"<br><img align='right' src='"+instructor[0].th_image+"'>"; 
            $(document).on("click", ".contenitoreSpeciale2#i"+(value), loadSingleIns);
            $(".contenitoreSpeciale").append(el);
           
            
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });

}


function loadAlphabetical(){
    $( ".scorrimentoslide" ).fadeOut( "slow" );
    $(".contenitore-dinamico").html("");
    $(".contenitoredestra").html("<div class=\"headerline\">All courses</div><div class=\"contenitore-dinamico\"></div>");
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://hyp.altervista.org/query/allcourses_alp.php", //Relative or absolute path to file.php file
        success: function(response) {
            var course=JSON.parse(response);
            var el="";
			for(var j=0;j<course.length;j++){
                $(document).on("click", "#corso"+course[j].id, loadSingleCourse);
                el+="<br><br><a href='#' id='corso"+course[j].id+"'><p style='font-size:18px;line-height: 0.5;'>"+course[j].title+"</p></a>";   
            }
                        $(".contenitore-dinamico").html( "<button type=\"button\" id=\"allcateg\">Display all categories</button><br><br><button type=\"button\" id=\"bylevel\">Display courses by level</button><br><br><br><style>.contenitore-dinamico{    text-align: center;}</style>");
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
    $( ".scorrimentoslide" ).fadeOut( "slow" );
    $(".contenitore-dinamico").html("");
    $(".contenitoredestra").html("<div class=\"headerline\">All courses</div><div class=\"contenitore-dinamico\"></div>");
     $(".contenitore-dinamico").html( "<button type=\"button\" id=\"allcateg\">Display all categories</button><br><br><button type=\"button\" id=\"alphabetical\">Display courses by Alphabetical Order</button><br><br><br><style>.contenitore-dinamico{    text-align: center;}</style>");
    $(document).on("click", "#allcateg", loadCategories);
    $(document).on("click", "#alphabetical", loadAlphabetical);
    var el="";
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://hyp.altervista.org/query/allcourses_level.php", //Relative or absolute path to file.php file
        success: function(response) {
            var course=JSON.parse(response);
            var livello=1;
            el="<p style='font-size:22px;line-height: 1.3;color:#56348d;'>Level "+livello+"</p>";
			for(var j=0;j<course.length;j++){
                $(document).on("click", "#corso"+course[j].title, loadSingleCourse);
                if (course[j].level!=livello){
                    livello=course[j].level;
                    el+="<br><p style='font-size:22px;line-height: 1.3;color:#56348d;'>Level "+livello+"</p>";
                }
                $(document).on("click", "#corso"+course[j].id, loadSingleCourse);
                el+="<a href='#' id='corso"+course[j].id+"'><p style='font-size:18px;line-height: 1;'>"+course[j].title+"</p></a>";   
            }
             $(".contenitore-dinamico").append(el);
            
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
    
}


$(document).ready(ready);

function ready(){
      console.log("I'm ready!");
      loadHome();
 	  $(".navbar-brand#home1").on("click",loadHome);
 	  $(".home").on("click",loadHome);
      $("#loc").on("click", loadLocation);
      $("#ins").on("click", loadInstructors);
      $("#cat").on("click",loadCategories);

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
                    error: function(request,error) 
                    {
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
                    error: function(request,error) 
                    {
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

                    },
                    error: function(request,error) 
                    {
                        console.log("Error");
                    }
                });
}

function loadCategories(){
                     $( ".scorrimentoslide" ).fadeOut( "slow" );
                    console.log("Categories");
                    $.ajax({
                    method: "POST",
                    //dataType: "json", //type of data
                    crossDomain: true, //localhost purposes
                    url: "./getCategories.php", //Relative or absolute path to file.php file
                    success: function(response) {
                    
                        $(".contenuti").html(" "+response);

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
var id=1;
                    $.ajax({
        	    method: "POST",
       		    dataType: "json", //type of data
       		    crossDomain: true, //localhost purposes
                    url: "./getInstructors.php", //Relative or absolute path to file.php file
		    data: {instructor:id},
                    success: function(response) {
			console.log(JSON.parse(response));
            		var instructor=JSON.parse(response);
            		var el="";
			for(var i=0;i<instructor.length;i++){
                el+="<div class='insegnanti' id='i"+instructor[i].id+"'><img src='"+instructor[i].th_image+"'><div class='desc'>"+instructor[i].name+" "+instructor[i].surname+"</div></div>";             
                
            }
                    
                        $(".contenuti").html(response);
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });

}
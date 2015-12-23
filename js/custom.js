function showPrimaryMenu(parent){

	// sanitise parent paramater if from active tab
	parent = parent.replace('active','') 
	parent = parent.replace(/\s+/g, '');

	// if sub nav is active hide it
	if ($(".secondaryMobileNav").is(":visible")) {
		$(".secondaryMobileNav").fadeOut("fast");
	}

	// disabled, not needed
	// if ($(".sideNav").is(":visible") || $(".sideNav_subPage").is(":visible")) {
 	//  		$(".primaryMobileNav").fadeOut()
 	//  	} 

 	// reset all tempactive sates
	$("li").removeClass('tempactive');

	// if there is an active state, record what it is
	if ($('.active').attr('class')) { 
		activeToRestore = $('.active').attr('class').replace('active','') 
		activeToRestore = activeToRestore.replace(/\s+/g, '');
	}

	// remove the active state
	$(".mainNav li").removeClass('active');

	// global variable
	inactiveToActive = parent;

	// add temp active stat to clicked tab
	$("."+parent).addClass('tempactive');

	// load up hidden div with nav
	$(".primaryMobileNav").html($("."+parent+"SubNav").html())
	$(".primaryMobileNav").append("<a class='closePrimaryMenu' href='javascript:closePrimaryMenu()'><span class='hiddenText'>Close Primary Menu</span></a>")

	// find top padding of black overlay (looks poor if under nav when fading)
	var childElementsHeights = $('.primaryMobileNav li').length * 29
  	var pushDown = childElementsHeights + 250
  	$(".movileBlackFader").css("top", pushDown);
	$(".movileBlackFader").height($( document ).height() - pushDown);
	
	// just do it
	$(".primaryMobileNav").fadeIn("fast");
	$(".movileBlackFader").fadeIn("fast");
}


function showSubPageSideNav() {

	if (!$(".secondaryMobileNav").is(":visible")){

		if ($(".sideNav").is(":visible") || $(".sideNav_subPage").is(":visible")) {

	  		$(".primaryMobileNav").fadeOut("fast");
	  		$(".secondaryMobileNav").fadeOut("fast");
	  	} 

	  	$(".movileBlackFader").height($( document ).height() - 280);
		$(".movileBlackFader").fadeIn("fast");
		$(".movileBlackFader").css("top", 285);
	  	$(".secondaryMobileNav").html($(".sideNavHolder").html())
	  	$(".secondaryMobileNav").fadeIn("fast");
	  	$(".secondaryMobileNav li li").not(".hasChildren").addClass("child")

	  	setSubMenuClickActions()}

  	else {

  		closeSubPageSideNav();

  		
  	}

}

function closeSubPageSideNav(){

	$(".movileBlackFader").fadeOut("fast");
  	$(".secondaryMobileNav").fadeOut("fast");
}




function setSubMenuClickActions() {
$(".secondaryMobileNav .hasChildren a").not(".secondaryMobileNav .child a").on("click", function (e) {

	e.preventDefault();

	if ($("#"+e.currentTarget.parentNode.id+" li").is(":visible")){

		$(".secondaryMobileNav li").removeClass("open") 
		$(".child").hide()

	} else {

		$(".secondaryMobileNav li").removeClass("open")
		$(".child").hide()
		$("#"+e.currentTarget.parentNode.id).addClass("open")
		$("#"+e.currentTarget.parentNode.id + " li").show()

	}
	
});
}



function closePrimaryMenu() {

	$("."+inactiveToActive).removeClass('tempactive');
	$(".active").removeAttr("style")
	$("."+activeToRestore).addClass("active");
	$(".movileBlackFader").fadeOut("fast");
	$(".primaryMobileNav").fadeOut("fast");
	
}

$( window ).resize(function() {
  
  if ($(".sideNav").is(":visible")) {
  	$(".primaryMobileNav").fadeOut()
  } 
     
});


// On clicks // 

$(".movileBlackFader").on("click", function (e) {
	if ($(".secondaryMobileNav").is(":visible")){
		closeSubPageSideNav()
	}
	else{
		closePrimaryMenu();
	}
});

function containsWord(haystack, needle) {
    return (" " + haystack + " ").indexOf(" " + needle + " ") !== -1;
}


$("ul li").on("click", function (e) {

	var isActive = containsWord(e.target.parentElement.className, "active")
	var isTempActive = containsWord(e.target.parentElement.className, "tempactive")


	if (!$(".sideNavHolder").is(":visible")) {

		//if(isActive && $(".primaryMobileNav").is(":visible")){

			//e.preventDefault();
	  		//closePrimaryMenu();

		//} else {

		var clickedItem = e.delegateTarget.className.replace('active ','')

		// if current click item is tempactive
		if (!isTempActive){

			e.preventDefault();
			showPrimaryMenu(clickedItem)

		} 

	  else {

	  		e.preventDefault();
	  		closePrimaryMenu();
	  	}
  //}
  }
	
});

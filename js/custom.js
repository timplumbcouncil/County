function showPrimaryMenu(parent){

	// sanitise parent paramater if from active tab
	parent = parent.replace('active','') 
	parent = parent.replace(/\s+/g, '');

	// if sub nav is active hide it
	if ($(".secondaryMobileNav").is(":visible")) {
		closeSubPageSideNav();
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
	$(".primaryMobileNav").append("<a class='closePrimaryMenu CCCfont' href='javascript:closePrimaryMenu()'>c<span class='hiddenText'>Close Primary Menu</span></a>")

	// find top padding of black overlay (looks poor if under nav when fading)
	var childElementsHeights = $('.primaryMobileNav li').length * 48
  	var pushDown = childElementsHeights + 250
  	$(".movileBlackFader").css("top", pushDown);
	$(".movileBlackFader").height($( document ).height() - pushDown);
	
	// just do it
	$(".primaryMobileNav").fadeIn(100);
	$(".movileBlackFader").fadeIn(100);
}


function showSubPageSideNav() {

	if (!$(".secondaryMobileNav").is(":visible")){

		if ($(".sideNav").is(":visible") || $(".sideNav_subPage").is(":visible")) {

	  		$(".primaryMobileNav").fadeOut(100);
	  		$(".secondaryMobileNav").fadeOut(100);
	  	} 

	  	
	  	$(".activateSubNavIcon").html("b")
	  	$(".movileBlackFader").css("top", 285);
	  	$(".movileBlackFader").height($( document ).height() - 280);
		$(".movileBlackFader").fadeIn(100);
	  	$(".secondaryMobileNav").html($(".sideNavHolder").html())
	  	$(".secondaryMobileNav .hasChildren a").not(".hasChildren li a").append("<span class='CCCfont activateSubNavOpenClose '>e</span>")
	  	$(".secondaryMobileNav").fadeIn(100);
	  	$(".secondaryMobileNav li li").not(".hasChildren").addClass("child")

	  	setSubMenuClickActions()}

  	else {

  		closeSubPageSideNav();

  		
  	}

}

function closeSubPageSideNav(){

	$(".activateSubNavIcon").html("<span class='activateIcon'>a</span>")
	$(".movileBlackFader").fadeOut(100);
  	$(".secondaryMobileNav").fadeOut(100);
}




function setSubMenuClickActions() {
$(".secondaryMobileNav .hasChildren a").not(".secondaryMobileNav .child a").on("click", function (e) {

	e.preventDefault();

	if ($("#"+e.currentTarget.parentNode.id+" li").is(":visible")){

		$(".secondaryMobileNav li .activateSubNavOpenClose").html("e")
		$(".child").hide()

	} else {

		$(".secondaryMobileNav li .activateSubNavIcon").html("e")
		$(".child").hide()
		$("#"+e.currentTarget.parentNode.id + " .activateSubNavOpenClose").html("d")
		$("#"+e.currentTarget.parentNode.id + " li").show()

	}
	
});
}



function closePrimaryMenu() {

	$("."+inactiveToActive).removeClass('tempactive');
	$(".active").removeAttr("style")
	$("."+activeToRestore).addClass("active");
	$(".movileBlackFader").fadeOut(100);
	$(".primaryMobileNav").fadeOut(100);
	
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

function showPrimaryMenu(parent){

	if ($(".sideNav").is(":visible")) {
  		$(".primaryMobileNav").fadeOut()
  	} 

	$("li").removeClass('tempactive');

	if ($('.active').attr('class')) { 
		activeToRestore =  $('.active').attr('class').replace('active ','') 
	} else {
		activeToRestore = null;
	}

	inactiveToActive = parent;
	if (inactiveToActive != activeToRestore) {
		$("."+parent).addClass('tempactive');
		$(".active").css('background-color','#cfcbc0');
	} else {$(".active").removeAttr("style")}

	$(".primaryMobileNav").html($("."+parent+"SubNav").html())
	$(".primaryMobileNav").append("<a class='closePrimaryMenu' href='javascript:closePrimaryMenu()'><span class='hiddenText'>Close Primary Menu</span></a>")
	//$(".primaryMobileNav").fadeIn( function() {$('body').scrollTo('.primaryMobileNav');})
	$(".primaryMobileNav").fadeIn();
}


$("ul li").on("click", function (e) {

	var clickedItem = e.delegateTarget.className.replace('active ','')

	if (!$(".sideNav").is(":visible")) {
		e.preventDefault();
		showPrimaryMenu(clickedItem)
  	} 
	
});

function closePrimaryMenu() {

	//if (inactiveToActive != parent) {
		$("."+inactiveToActive).removeClass('tempactive');
		//$(".active").css('background-color','#dbd7ca');
		$(".active").removeAttr("style")
		$("."+activeToRestore).addClass("active");
	//}

	$(".primaryMobileNav").fadeOut();
}

$( window ).resize(function() {
  if ($(".sideNav").is(":visible")) {

  	$(".primaryMobileNav").fadeOut()

  } 
     
});

$.fn.scrollTo = function( target, options, callback ){
  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
  var settings = $.extend({
    scrollTarget  : target,
    offsetTop     : 50,
    duration      : 500,
    easing        : 'swing'
  }, options);
  return this.each(function(){
    var scrollPane = $(this);
    var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
    var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
    scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
      if (typeof callback == 'function') { callback.call(this); }
    });
  });
}
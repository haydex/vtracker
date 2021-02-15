/*
	
    Copyright © 2014 HAYDEX Inc. All Rights Reserved.

	" The people who are crazy enough to think they can change the world, are the ones who do. "
	
	Apple's Think Different Commercial 1997 - Narrated By: Steve Jobs, Directed by: Craig Tanimoto, Written By: Rob Siltanen and Lee Clow.
	
	http://www.youtube.com/watch?v=8rwsuXHA7RA
	https://thisisnotadvertising.wordpress.com/tag/craig-tanimoto/
	
*/



if (typeof HAYDEX === 'undefined')
{
	HAYDEX = {};
}

HAYDEX.slider = function()
{



	/************************************************************* Properties *********************************************************************/



	this.TITLEOPTIONS = { ENABLED : true , DISABLED : false };
	this.SUBTITLEOPTIONS = { ENABLED : true , DISABLED : false };
	this.ARROWSOPTIONS = { ENABLED : true , DISABLED : false };
	this.PAGINATIONOPTIONS = { ENABLED : true , DISABLED : false };
	this.AUTOSLIDEOPTIONS = { ENABLED : true , DISABLED : false };
	this.SPEEDOPTIONS = { FAST : 200 , NORMAL : 300 , SLOW : 400 };
	this.REPEATOPTIONS = { ENABLED : true , DISABLED : false };
	this.DIRECTIONOPTIONS = { LEFTTORIGHT : "leftToRight" , RIGHTTOLEFT : "RIGHTTOLEFT" };
	this.SLIDESPERPAGEOPTIONS = { ONE : 1 , TWO : 2 , THREE : 3 };
	this.MODEOPTIONS = { FULL : "full" , WINDOW : "window" };
	this.HOVEROPTIONS = { ENABLED : true, DISABLED : false };
	this.SCROLLTOLOADIMAGESOPTIONS = { ENABLED : true, DISABLED : false };
	this.LINKSOPTIONS = { ENABLED : true, DISABLED : false };
	this.TRANSITIONOPTIONS = { SLIDE : "slide", FADE : "fade", FADETHROUGH : "fadeThrough", APPEAR : "appear" };
	this.SIDEARROWSOPTIONS = { ENABLED : true, DISABLED : false };
	this.HOVERBORDEROPTIONS = { ENABLED : true, DISABLED : false };
	this.DYNAMICWIDTHOPTIONS = { ENABLED : true, DISABLED : false };

	this.CONTAINER;							/* Container node																				    			*/
	this.DATA; 								/* Data for text and subText ( CSV file created using Apple Numbers October-30-2014 )							*/
	this.GAP;								/* Gap between slides																							*/
	this.TITLE;								/* Create text fields for each slide																			*/
	this.SUBTITLE;							/* Create a subText field for each slide																	 	*/
	this.ARROWS;							/* Enable or disable arrows																						*/
	this.PAGINATION;						/* Enable or disable pagination																					*/
	this.AUTOSLIDE; 						/* Start sliding when slider is created																			*/
	this.SPEED;								/* Sliding speed in milliseconds 																				*/
	this.REPEAT; 							/* Repeat or no repeat																							*/
	this.DIRECTION;							/* Sliding direction																							*/
	this.SLIDESPERPAGE;						/* Slides per page																								*/
	this.MODE; 								/* Slides size																									*/
	this.HOVER;								/* Enable/Disable hover state																					*/
	this.SCROLLTOLOADIMAGES;				/* Enable/Disable loading images by scrolling																	*/
	this.PAUSE;								/* How much time to pause an auto scrolling slide																*/
	this.LINKS;								/* Disable/Enable slides links																					*/
	this.TRANSITION;						/* Animation type when transitioning from one page to another													*/

	this.WIDTH;								/* Width of the slider																							*/
	this.HEIGHT;							/* Height of the slider																							*/
	this.PAGEHEIGHT;						/* Height of slider page (To be calculated)																		*/
	this.PAGEWIDTH;							/* Width of slider page	(To be calculated)																		*/
	this.IMAGEMARGIN;						/* Margin size between image and title  																		*/
	this.NOOFSLIDES;
	this.NOOFPAGES;
	this.CURRENTPAGE;
	this.PUBLISHEDCLASS = "published";
	this.AUTOSLIDEINTERVAL;
	this.APPEARSPEED;
	this.COUNTER;
	this.SIDEARROWS;
	this.HOVERBORDER;
	this.DYNAMICWIDTH;
	this.ARROWSMARGINS;
	this.HEIGHTLIMIT;
	this.ASPECTRATIO;
	this.ARROWSINDENTATION;
	this.SLIDEHEIGHTPERCENTAGE = 0.8;

	var sliderClass = this;



	/************************************************************* Behaviour **********************************************************************/



	/************************************************************* Constructor ********************************************************************/



	this.create = function(
							container,
							data,
							gap,
							title,
							subtitle,
							arrows,
							pagination,
							autoSlide,
							speed,
							repeat,
							direction,
							slidesPerPage,
							mode,
							hover,
							scrollToLoadImages,
							pause,
							links,
							transition,
							appearSpeed,
							counter,
							sideArrows,
							hoverBorder,
							dynamicWidth,
							arrowsIndentation,
							arrowsMargins,
							heightLimit,
							aspectRatio
							)
	{
		this.CONTAINER = container;
		this.DATA = data;
		this.GAP = gap;
		this.TITLE = title ? title : this.TITLEOPTIONS.DISABLED;
		this.SUBTITLE = subtitle ? subtitle : this.SUBTITLEOPTIONS.DISABLED;
		this.ARROWS = arrows ? arrows : this.ARROWSOPTIONS.DISABLED;
		this.PAGINATION = pagination ? pagination : this.PAGINATIONOPTIONS.DISABLED;
		this.AUTOSLIDE = autoSlide ? autoSlide : this.AUTOSLIDEOPTIONS.DISABLED;
		this.SPEED = speed ? speed : this.SPEEDOPTIONS.FAST;
		this.REPEAT = repeat ? repeat : this.REPEATOPTIONS.DISABLED;
		this.DIRECTION = direction ? direction : this.DIRECTIONOPTIONS.LEFTTORIGHT;
		this.SLIDESPERPAGE = slidesPerPage ? slidesPerPage : this.SLIDESPERPAGEOPTIONS.ONE;
		this.MODE = mode ? mode : this.MODEOPTIONS.FULL;
		this.HOVER = hover ? hover : this.HOVEROPTIONS.DISABLED;
		this.SCROLLTOLOADIMAGES = scrollToLoadImages ? scrollToLoadImages : this.SCROLLTOLOADIMAGESOPTIONS.DISABLED;
		this.PAUSE = pause;
		this.LINKS = links ? links : this.LINKSOPTIONS.DISABLED;
		this.TRANSITION = transition ? transition : this.TRANSITIONOPTIONS.SLIDE;
		this.APPEARSPEED = appearSpeed ? appearSpeed : 100;

		this.WIDTH = parseInt($(this.CONTAINER).css("width"), 10);
		this.HEIGHT = parseInt($(this.CONTAINER).css("height"), 10);
		this.IMAGEMARGIN = 16;
		this.CURRENTPAGE = 1;
		this.COUNTER = counter;
		this.SIDEARROWS = sideArrows ? sideArrows : this.SIDEARROWSOPTIONS.DISABLED;
		this.HOVERBORDER = hoverBorder ? hoverBorder : this.HOVERBORDEROPTIONS.DISABLED;
		this.DYNAMICWIDTH = dynamicWidth ? dynamicWidth : this.DYNAMICWIDTHOPTIONS.DISABLED;
		this.ARROWSMARGINS = arrowsMargins ? arrowsMargins : "50px";
		this.HEIGHTLIMIT = heightLimit ? heightLimit : 600;
		this.ASPECTRATIO = aspectRatio ? aspectRatio : 16/9;
		this.ARROWSINDENTATION = arrowsIndentation;

		this.build();
	}



	/************************************************************* Build Slider *******************************************************************/



	this.build = function()
	{
		sliderClass.NOOFSLIDES = sliderClass.DATA.length;

		if (sliderClass.COUNTER)
		{
			$(sliderClass.COUNTER).text(sliderClass.NOOFSLIDES);
		}

		sliderClass.NOOFPAGES = Math.ceil(sliderClass.NOOFSLIDES/sliderClass.SLIDESPERPAGE);

		this.prepareInterface();
		this.loadSlides();
		if (this.NOOFPAGES > 1)
		{
			this.applyNavigation();
			if (this.AUTOSLIDE == this.AUTOSLIDEOPTIONS.ENABLED) this.enableAutoSlide();
		}
	}



	/************************************************************* Prepare Interface **************************************************************/



	this.prepareInterface = function()
	{
		if (this.SLIDESPERPAGE != this.SLIDESPERPAGE.ONE)
		{
			$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page div.slide").css("margin-right", this.GAP);
			$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page div.slide").css("margin-left", this.GAP);
		}

		var slideMarginRight = parseInt($(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page.blueprint div.slide.blueprint").css("margin-right"), 10);
		var	slideMarginLeft = parseInt($(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page.blueprint div.slide.blueprint").css("margin-left"), 10);

		if (this.MODE == this.MODEOPTIONS.FULL)
		{
			$(this.CONTAINER + " #HAYDEXSlider #wrapper").css("width", "100%");
			$(this.CONTAINER + " #HAYDEXSlider #wrapper").css("height", "100%");

			if (this.PAGINATION == this.PAGINATIONOPTIONS.ENABLED)
			{
				if (this.NOOFPAGES > 1)
				{
					$(this.CONTAINER + " #HAYDEXSlider #pagination").css("display", "block");
				}
				else
				{
					var paginationHeight = parseInt($(this.CONTAINER + " #HAYDEXSlider #pagination").css("height"), 10) + parseInt($(this.CONTAINER + " #HAYDEXSlider #pagination").css("padding-top"), 10) + parseInt($(this.CONTAINER + " #HAYDEXSlider #pagination").css("padding-bottom"), 10);
					$(this.CONTAINER).css("height", parseInt($(this.CONTAINER).css("height"), 10) - paginationHeight);
					$(this.CONTAINER).css("margin-top", -parseInt($(this.CONTAINER).css("height"), 10)/2);
				}
			}
		}
		else if (this.MODE == this.MODEOPTIONS.WINDOW)
		{
			if (this.ARROWS == this.ARROWSOPTIONS.DISABLED)
			{
				$(this.CONTAINER + " #HAYDEXSlider #wrapper").css("width", "100%");
			}

			if (this.PAGINATION == this.PAGINATIONOPTIONS.ENABLED)
			{
				if (this.NOOFPAGES > 1)
				{
					$(this.CONTAINER + " #HAYDEXSlider #pagination").css("display", "block");
					var paginationHeight = parseInt($(this.CONTAINER + " #HAYDEXSlider #pagination").css("height"), 10) + parseInt($(this.CONTAINER + " #HAYDEXSlider #pagination").css("padding-top"), 10) + parseInt($(this.CONTAINER + " #HAYDEXSlider #pagination").css("padding-bottom"), 10);
					$(this.CONTAINER + " #HAYDEXSlider #wrapper").css("height", this.HEIGHT - paginationHeight);
				}
				else
				{
					var paginationHeight = parseInt($(this.CONTAINER + " #HAYDEXSlider #pagination").css("height"), 10) + parseInt($(this.CONTAINER + " #HAYDEXSlider #pagination").css("padding-top"), 10) + parseInt($(this.CONTAINER + " #HAYDEXSlider #pagination").css("padding-bottom"), 10);
					$(this.CONTAINER).css("height", parseInt($(this.CONTAINER).css("height"), 10) - paginationHeight);
					$(this.CONTAINER).css("margin-top", -parseInt($(this.CONTAINER).css("height"), 10)/2);
				}
			}
		}

		var wrapperHeight = parseInt($(this.CONTAINER + " #HAYDEXSlider #wrapper").css("height"), 10);
		var wrapperWidth = parseInt($(this.CONTAINER + " #HAYDEXSlider #wrapper").css("width"), 10);

		if (this.DIRECTION == this.DIRECTIONOPTIONS.LEFTTORIGHT)
		{
			$(this.CONTAINER + " #HAYDEXSlider #left").addClass("backward");
			$(this.CONTAINER + " #HAYDEXSlider #right").addClass("forward");
			$(this.CONTAINER + " #HAYDEXSlider #wrapper").css("direction", "ltr");
			$(this.CONTAINER + " #HAYDEXSlider #pagination").css("direction", "ltr");
		}
		else if (this.DIRECTION == this.DIRECTIONOPTIONS.RIGHTTOLEFT)
		{
			$(this.CONTAINER + " #HAYDEXSlider #left").addClass("forward");
			$(this.CONTAINER + " #HAYDEXSlider #right").addClass("backward");
			$(this.CONTAINER + " #HAYDEXSlider #wrapper").css("direction", "rtl");
			$(this.CONTAINER + " #HAYDEXSlider #pagination").css("direction", "rtl");
		}

		$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page div.slide").css("width", (wrapperWidth / this.SLIDESPERPAGE) - (slideMarginRight + slideMarginLeft));
		var slideWidth = parseInt($(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page div.slide").css("width"), 10);

		$(this.CONTAINER + " #HAYDEXSlider #wrapper div.page").css("width", wrapperWidth);

		var imageHeight = parseInt($(this.CONTAINER + " #HAYDEXSlider #wrapper").css("height"), 10);

		if (this.TITLE == this.TITLEOPTIONS.ENABLED)
		{
			$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page div.slide #title").css("display", "block");
			imageHeight -= parseInt($(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page.blueprint div.slide.blueprint #title").css("height"), 10);
			imageHeight -= parseInt($(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page.blueprint div.slide.blueprint #title").css("margin-top"), 10);
			$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page div.slide #image").css("margin-bottom", this.IMAGEMARGIN);
		}

		if (this.SUBTITLE == this.SUBTITLEOPTIONS.ENABLED)
		{
			$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page div.slide #subtitle").css("display", "block");
			imageHeight -= parseInt($(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page.blueprint div.slide.blueprint #subtitle").css("height"), 10);
			imageHeight -= parseInt($(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page.blueprint div.slide.blueprint #subtitle").css("margin-top"), 10);
			$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page div.slide #image").css("margin-bottom", this.IMAGEMARGIN);
		}

		imageHeight -= parseInt($(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page.blueprint div.slide.blueprint #image").css("margin-bottom"), 10);

		$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page div.slide #image").css("height", imageHeight);

		$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page.blueprint div.slide.blueprint #image").css("width", slideWidth);
		var imageWidth = parseInt($(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page.blueprint div.slide.blueprint #image").css("width"), 10);

		$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page").css("height", wrapperHeight);
		$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page").css("width", wrapperWidth);

		this.PAGEHEIGHT = parseInt($(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page.blueprint").css("height"), 10);
		this.PAGEWIDTH = parseInt($(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page.blueprint").css("width"), 10);
		
		if (this.DYNAMICWIDTH == this.DYNAMICWIDTHOPTIONS.ENABLED)
		{
			this.implementDynamicSlide();
			
			$(window).resize(function() { 
				
				sliderClass.implementDynamicSlide();
				
				sliderClass.displayPage(sliderClass.CURRENTPAGE);
				
				if (sliderClass.ARROWSINDENTATION) {
					$(sliderClass.CONTAINER + " #HAYDEXSlider div.arrow").css("top", (sliderClass.PAGEHEIGHT - sliderClass.ARROWSINDENTATION) * 0.5);
					var arrowHeight = parseInt($(sliderClass.CONTAINER + " #HAYDEXSlider #right").css("height"), 10);
					$(sliderClass.CONTAINER + " #HAYDEXSlider div.arrow").css("margin-top", -(arrowHeight/2) + sliderClass.ARROWSINDENTATION);
				}
				else
				{
					$(sliderClass.CONTAINER + " #HAYDEXSlider div.arrow").css("top", imageHeight * 0.5);
					var arrowHeight = parseInt($(sliderClass.CONTAINER + " #HAYDEXSlider #right").css("height"), 10);
					$(sliderClass.CONTAINER + " #HAYDEXSlider div.arrow").css("margin-top", -(arrowHeight/2));
				}
			});
		}
		
		if (this.ARROWS == this.ARROWSOPTIONS.ENABLED)
		{
			if (this.SIDEARROWS == this.SIDEARROWSOPTIONS.ENABLED)
			{
				$(this.CONTAINER + " #HAYDEXSlider #right").css("right", this.ARROWSMARGINS);
				$(this.CONTAINER + " #HAYDEXSlider #left").css("left", this.ARROWSMARGINS);
			}
			
			if (this.ARROWSINDENTATION) {
				$(this.CONTAINER + " #HAYDEXSlider div.arrow").css("top", (this.PAGEHEIGHT - this.ARROWSINDENTATION) * 0.5);
				var arrowHeight = parseInt($(this.CONTAINER + " #HAYDEXSlider #right").css("height"), 10);
				$(this.CONTAINER + " #HAYDEXSlider div.arrow").css("margin-top", -(arrowHeight/2) + this.ARROWSINDENTATION);
			}
			else
			{
				$(this.CONTAINER + " #HAYDEXSlider div.arrow").css("top", imageHeight * 0.5);
				var arrowHeight = parseInt($(this.CONTAINER + " #HAYDEXSlider #right").css("height"), 10);
				$(this.CONTAINER + " #HAYDEXSlider div.arrow").css("margin-top", -(arrowHeight/2));
			}
		}

		if (this.TRANSITION == this.TRANSITIONOPTIONS.FADETHROUGH)
		{
			$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page.blueprint").css("position", "absolute");
		}
	}
	
	this.implementDynamicSlide = function()
	{
		var windowWidth = $(window).width();
		var pageHeight = Math.round((windowWidth/sliderClass.ASPECTRATIO) * sliderClass.SLIDEHEIGHTPERCENTAGE);
		
		$(sliderClass.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page div.slide #image").css("width", windowWidth);
		$(sliderClass.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page div.slide").css("width", windowWidth);
		$(sliderClass.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page").css("width", windowWidth);
		sliderClass.PAGEWIDTH = windowWidth;
		
		if (pageHeight > sliderClass.HEIGHTLIMIT)
		{
			$(sliderClass.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page div.slide #image").css("height", pageHeight);
			$(sliderClass.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page div.slide").css("height", pageHeight);
			$(sliderClass.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page").css("height", pageHeight);
			$(sliderClass.CONTAINER + " #HAYDEXSlider #wrapper #scroller").css("height", pageHeight);
			$(sliderClass.CONTAINER + " #HAYDEXSlider #wrapper").css("height", pageHeight);
			$(sliderClass.CONTAINER + " #HAYDEXSlider").css("height", pageHeight);
			$(sliderClass.CONTAINER).css("height", pageHeight);
			sliderClass.PAGEHEIGHT = pageHeight;
		}
		else
		{
			$(sliderClass.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page div.slide #image").css("height", sliderClass.HEIGHTLIMIT);
			$(sliderClass.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page div.slide").css("height", sliderClass.HEIGHTLIMIT);
			$(sliderClass.CONTAINER + " #HAYDEXSlider #wrapper #scroller #page").css("height", sliderClass.HEIGHTLIMIT);
			$(sliderClass.CONTAINER + " #HAYDEXSlider #wrapper #scroller").css("height", sliderClass.HEIGHTLIMIT);
			$(sliderClass.CONTAINER + " #HAYDEXSlider #wrapper").css("height", sliderClass.HEIGHTLIMIT);
			$(sliderClass.CONTAINER + " #HAYDEXSlider").css("height", sliderClass.HEIGHTLIMIT);
			$(sliderClass.CONTAINER).css("height", sliderClass.HEIGHTLIMIT);
			sliderClass.PAGEHEIGHT = sliderClass.HEIGHTLIMIT;
		}
	}



	/************************************************************* Load Slides ********************************************************************/



	this.loadSlides = function()
	{
		for(i = 0; i < this.NOOFPAGES; i++)
		{
			this.createPage(i+1);

			for(j = ((i+1) * this.SLIDESPERPAGE) - this.SLIDESPERPAGE; ((j < (i+1) * this.SLIDESPERPAGE) && (j < this.NOOFSLIDES)); j++)
			{
				this.createSlide();
			}
		}

		if (this.TRANSITION == this.TRANSITIONOPTIONS.FADETHROUGH)
		{
			$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:not(.blueprint):not(:first)").css("display", "none");
		}

		if (this.HOVER == this.HOVEROPTIONS.ENABLED)
		{
			this.enableHover();
		}

		if (this.TITLE == this.TITLEOPTIONS.ENABLED)
		{
			this.loadTitles();
		}

		if (this.SUBTITLE == this.SUBTITLEOPTIONS.ENABLED)
		{
			this.loadSubtitles();
		}

		if (this.LINKS == this.LINKSOPTIONS.ENABLED)
		{
			this.loadLinks();
		}

		if (this.SCROLLTOLOADIMAGES == this.SCROLLTOLOADIMAGESOPTIONS.ENABLED)
		{
			this.publishImages(this.CURRENTPAGE);
		}
		else if (this.SCROLLTOLOADIMAGES == this.SCROLLTOLOADIMAGESOPTIONS.DISABLED)
		{
			for (i = 1; i <= this.NOOFPAGES; i++)
			{
				this.publishImages(i);
			}
		}
	}

	this.createPage = function(index)
	{
		$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page.blueprint").clone().appendTo(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller");
		$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page.blueprint:last #slide").remove();
		$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page.blueprint:last").removeClass("blueprint");

		this.createIndicator();
	}

	this.createIndicator = function()
	{
		$(this.CONTAINER + " #HAYDEXSlider #pagination div.pageIndicator.blueprint").clone().appendTo(this.CONTAINER + " #HAYDEXSlider #pagination");
		$(this.CONTAINER + " #HAYDEXSlider #pagination div.pageIndicator.blueprint:last").removeClass("blueprint");
	}

	this.createSlide = function()
	{
		$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page.blueprint #slide").clone().appendTo(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:last");
		$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:last div.slide:last").removeClass("blueprint");
	}

	this.enableHover = function()
	{
		$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:not(.blueprint) div.slide #image").each(function(index) {
			if ((sliderClass.DATA[index][2] != "") && (sliderClass.DATA[index][2] != "\r"))
			{
				$(this).hover(function() {
					$(this).css("background-position", "center " + (-1) * $(this).height() + "px");
				}, function() {
					$(this).css("background-position", "center 0px");
				});
			}
		});
	}

	this.loadTitles = function()
	{
		$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:not(.blueprint) div.slide #title").each(function(index) {
			$(this).text($(sliderClass.DATA[index].outerHTML).attr("title"));
		});
	}

	this.loadSubtitles = function()
	{
		$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:not(.blueprint) div.slide #subtitle").each(function(index) {
			$(this).text($(sliderClass.DATA[index].outerHTML).attr("alt"));
		});
	}

	this.loadLinks = function()
	{
		$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:not(.blueprint) div.slide #image").each(function(index) {
			if ((sliderClass.DATA[index][3] != "\r") && (sliderClass.DATA[index][3] != ""))
			{
				$(this).wrap("<a href='" + sliderClass.DATA[index][3] + "'></a>");
			}
		});
	}



	/************************************************************* Apply Navigation ***************************************************************/



	this.applyNavigation = function()
	{
		this.registerEvents();
		this.updateNavigation();
	}

	this.registerEvents = function()
	{
		$(this.CONTAINER + " #HAYDEXSlider div.forward").click(this.slideForward);
		$(this.CONTAINER + " #HAYDEXSlider div.backward").click(this.slideBackward);

		$(this.CONTAINER + " #HAYDEXSlider #pagination div.pageIndicator:not(.blueprint)").each(function(index) {
			$(this).click(function(event) {
				if (event.originalEvent) sliderClass.disableAutoSlide();
				if (sliderClass.CURRENTPAGE != index + 1)
				{
					sliderClass.CURRENTPAGE = index + 1;
					sliderClass.publishImages(sliderClass.CURRENTPAGE);
					sliderClass.slideToPage(sliderClass.CURRENTPAGE);
				}
			});
		});
	}

	this.slideForward = function(event)
	{
		if (event.originalEvent) { sliderClass.disableAutoSlide(); }

		if (sliderClass.CURRENTPAGE < sliderClass.NOOFPAGES)
		{
			sliderClass.CURRENTPAGE++;
			sliderClass.publishImages(sliderClass.CURRENTPAGE);
			sliderClass.slideToPage(sliderClass.CURRENTPAGE);
		}
	}

	this.slideBackward = function(event)
	{
		if (event.originalEvent) sliderClass.disableAutoSlide();

		if (sliderClass.CURRENTPAGE > 1)
		{
			sliderClass.CURRENTPAGE--;
			sliderClass.publishImages(sliderClass.CURRENTPAGE);
			sliderClass.slideToPage(sliderClass.CURRENTPAGE);
		}
	}
	
	this.displayPage = function(page)
	{
		$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller").animate({right: -(this.PAGEWIDTH * (page - 1))}, 0);
	}

	this.slideToPage = function(page)
	{
		if (this.TRANSITION == this.TRANSITIONOPTIONS.SLIDE)
		{
			if (this.DIRECTION == this.DIRECTIONOPTIONS.LEFTTORIGHT)
			{
				$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller").animate({left: -(this.PAGEWIDTH * (page - 1))}, this.SPEED);
			}
			else if (this.DIRECTION == this.DIRECTIONOPTIONS.RIGHTTOLEFT)
			{
				$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller").animate({right: -(this.PAGEWIDTH * (page - 1))}, this.SPEED);
			}
		}
		else if (this.TRANSITION == this.TRANSITIONOPTIONS.FADETHROUGH)
		{
			$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:eq(" + page + ")").fadeIn(this.SPEED);
			$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:not(:eq(" + page + "))").fadeOut(this.SPEED);
		}
		else if (this.TRANSITION == this.TRANSITIONOPTIONS.FADE)
		{
			$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:eq(" + page + ")").delay(this.SPEED).fadeIn(this.SPEED);
			$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:not(:eq(" + page + "))").fadeOut(this.SPEED);
		}
		else if (this.TRANSITION == this.TRANSITIONOPTIONS.APPEAR)
		{
			if ($(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page div.slide:visible:first").parent().index() < page)
			{
			$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:not(:eq(" + page + "))").fadeOut(this.SPEED);
			$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:eq(" + page + ") div.slide *").css("display", "none");
			$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:eq(" + page + ")").delay(this.SPEED).show(0, function() {
				$(sliderClass.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:eq(" + page + ") div.slide").each(function(index){
					$(this).find("*").delay(sliderClass.APPEARSPEED * index).fadeIn(sliderClass.APPEARSPEED);
				});
			});
			}
			else if ($(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page div.slide:visible:first").parent().index() > page)
			{
				$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:not(:eq(" + page + "))").fadeOut(this.SPEED);
				$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:eq(" + page + ") div.slide *").css("display", "none");
				$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:eq(" + page + ")").delay(this.SPEED).show(0, function() {
					$($(sliderClass.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:eq(" + page + ") div.slide").get().reverse()).each(function(index){
						$(this).find("*").delay(sliderClass.APPEARSPEED * index).fadeIn(sliderClass.APPEARSPEED);
					});
				});
			}
		}

		this.updateNavigation();
	}

	this.updateNavigation = function()
	{
		if (this.ARROWS == this.ARROWSOPTIONS.ENABLED)
		{
			if (this.CURRENTPAGE == 1)
			{
				$(this.CONTAINER + " #HAYDEXSlider div.forward").css("display", "block");
				$(this.CONTAINER + " #HAYDEXSlider div.backward").css("display", "none");
			}
			else if (this.CURRENTPAGE == this.NOOFPAGES)
			{
				$(this.CONTAINER + " #HAYDEXSlider div.forward").css("display", "none");
				$(this.CONTAINER + " #HAYDEXSlider div.backward").css("display", "block");
			}
			else if (this.CURRENTPAGE < this.NOOFPAGES)
			{
				$(this.CONTAINER + " #HAYDEXSlider div.forward").css("display", "block");
				$(this.CONTAINER + " #HAYDEXSlider div.backward").css("display", "block");
			}
		}

		if (this.PAGINATION == this.PAGINATIONOPTIONS.ENABLED)
		{
			$(this.CONTAINER + " #HAYDEXSlider #pagination div.pageIndicator:not(.blueprint)").removeClass("selected");
			$(this.CONTAINER + " #HAYDEXSlider #pagination div.pageIndicator:eq(" + this.CURRENTPAGE + ")").addClass("selected");
		}
	}



	/************************************************************* AutoSliding ********************************************************************/



	this.enableAutoSlide = function()
	{
		this.AUTOSLIDEINTERVAL = setInterval(this.autoSlide, this.PAUSE);
	}

	this.autoSlide = function()
	{
		if (sliderClass.CURRENTPAGE == sliderClass.NOOFPAGES)
		{
			if (sliderClass.REPEAT == sliderClass.REPEATOPTIONS.ENABLED)
			{
				$(sliderClass.CONTAINER + " #HAYDEXSlider #pagination div.pageIndicator:not(.blueprint):first").trigger("click");
			}
			else
			{
				sliderClass.disableAutoSlide();
			}
		}
		else
		{
			$(sliderClass.CONTAINER + " #HAYDEXSlider div.forward").trigger("click");
		}
	}

	this.disableAutoSlide = function()
	{
		clearInterval(this.AUTOSLIDEINTERVAL);
	}



	/************************************************************* Common Methods *****************************************************************/



	this.publishImages = function(page)
	{
		for(var i = page * this.SLIDESPERPAGE - this.SLIDESPERPAGE, j = 0; ((i < page * this.SLIDESPERPAGE) && (i < this.NOOFSLIDES)); i++, j++)
		{

			var selector = $(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:eq(" + page + ") div.slide:eq(" + j + ") #image");

			if (this.HOVER == this.HOVEROPTIONS.ENABLED)
			{
				if (selector.find("img").length == 0) 
				{
					$(this.CONTAINER + " #HAYDEXSlider #wrapper #scroller div.page:eq(" + page + ") div.slide:eq(" + j + ") #image").append("<img id='staff" + i + "' src='" + $(sliderClass.DATA[i].outerHTML).attr("nosrc") + "'/>");
				}
			}
			else
			{
				selector.css("background-image", "url(" + $(this.DATA[i].outerHTML).attr("nosrc") + ")");
			}
		}
	}



}
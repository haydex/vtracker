/*



    " Reimplement the wheel to either learn, or make it better. "

    http://www.haydex.com/
    https://www.youtube.com/watch?v=QOlTGA3RE8I
    
    Product Name: YouTubeTracker,
	Description: Tracking YouTube videos.
	Beneficiary: COSMOS
	
	Copyright © 1992 - 2019 HAYDEX, All Rights Reserved.
	
	
	
*/

document.addEventListener("DOMContentLoaded", function() {

    /** Search START **/

    let searchBoxSelector = 'section#theme div#search input#searchBox';
    let searchBoxIconSelector = 'section#theme div#search div#searchIcon';
    let searchBoxLine = 'section#theme div#search div#line';

    let searchBox = document.querySelector(searchBoxSelector);

    searchBoxResetPlaceholder();

    //searchBox.style.minWidth = width + 'px';


    let searchIcon = document.querySelector(searchBoxIconSelector);
    let searchLine = document.querySelector(searchBoxLine);

    searchBox.addEventListener('input', searchBoxKeypressListener);

    function searchBoxKeypressListener() {
        let canvas = document.createElement('canvas'); // https://stackoverflow.com/questions/16478836/measuring-length-of-string-in-pixel-in-javascript
        let ctx = canvas.getContext("2d");
        let font = getComputedStyle(searchBox).fontWeight + " " + getComputedStyle(searchBox).fontSize + " " + getComputedStyle(searchBox).fontFamily;
        ctx.font = font;
        let width = ctx.measureText(this.value).width;
        canvas = null;
        ctx = null;

        searchBox.style.width = width + "px";
        if ((this.value.length + 1) > 1) {
            searchIcon.classList.add('typing');
            searchLine.classList.add('typing');
        } else {
            searchIcon.classList.remove('typing');
            searchLine.classList.remove('typing');
            searchBoxResetPlaceholder();
        }
    }

    searchIcon.addEventListener('click', searchIconClickListener);

    function searchIconClickListener() {
        if (this.classList.contains('typing')) {
            this.classList.remove('typing');
            searchLine.classList.remove('typing');
            searchBox.value = "";
            searchBox.dispatchEvent(new Event('input'));
            searchBoxResetPlaceholder();
        }
    }

    function searchBoxResetPlaceholder() {
        let canvas = document.createElement('canvas'); // https://stackoverflow.com/questions/16478836/measuring-length-of-string-in-pixel-in-javascript
        let ctx = canvas.getContext("2d");
        let font = getComputedStyle(searchBox).fontWeight + " " + getComputedStyle(searchBox).fontSize + " " + getComputedStyle(searchBox).fontFamily;
        ctx.font = font;
        let width = ctx.measureText(searchBox.getAttribute('placeholder')).width;
        canvas = null;
        ctx = null;

        searchBox.style.width = width + 'px';
    }

    /** Search END **/

    /** Staff START **/

    var staffSlider = undefined;

    staffSlider = new HAYDEX.slider();
    staffSlider.create(
        "#staff #slider",
        staffList,
        10,
        staffSlider.TITLEOPTIONS.ENABLED,
        staffSlider.SUBTITLEOPTIONS.ENABLED,
        staffSlider.ARROWSOPTIONS.ENABLED,
        staffSlider.PAGINATIONOPTIONS.DISABLED,
        staffSlider.AUTOSLIDEOPTIONS.DISABLED,
        600,
        staffSlider.REPEATOPTIONS.ENABLED,
        staffSlider.DIRECTIONOPTIONS.RIGHTTOLEFT,
        4,
        staffSlider.MODEOPTIONS.WINDOW,
        staffSlider.HOVEROPTIONS.ENABLED,
        staffSlider.SCROLLTOLOADIMAGESOPTIONS.ENABLED,
        4000,
        staffSlider.LINKSOPTIONS.DISABLED,
        staffSlider.TRANSITIONOPTIONS.SLIDE,
        undefined,
        undefined,
        undefined,
        staffSlider.HOVERBORDEROPTIONS.ENABLED
    );

    $("#staff #slider div.arrow").css("background-image", "url(" + interfaceSRC + ")");
    $("#staff #slider #HAYDEXSlider #wrapper #scroller #page div.slide #title").css("color", staffSliderTitleColor);
    $("#staff #slider #HAYDEXSlider #wrapper #scroller #page div.slide #subtitle").css("color", staffSliderSubtitleColor);

    /** Staff START **/

});
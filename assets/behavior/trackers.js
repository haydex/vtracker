/*



	" Reimplement the wheel to either learn, or make it better. "

    http://www.hayder.design/
    https://www.youtube.com/watch?v=QOlTGA3RE8I
    
    Product Name: YouTubeTracker,
	Description: Tracking YouTube"s data.
	Beneficiary: COSMOS
	
	Copyright © 1992 - 2019 HAYDER, All Rights Reserved.
	
	
	
*/



document.addEventListener("DOMContentLoaded", function() {

    // General

    class General {

        constructor() {

            this.document1 = document.body;
            this.document2 = document.documentElement;
            this.scrollClass = "scroll";
            this.range = 100;
            this.initialize();

        }

        initialize() {

            window.addEventListener("scroll", this.windowScroll.bind(this));

        }

        windowScroll() {

            if ((this.document1.scrollTop > this.range) || (this.document2.scrollTop > this.range)) {

                header.addCSSClass(this.scrollClass);
                search.addCSSClass(this.scrollClass);
                search.resizeSearchBox();
                options.addCSSClass(this.scrollClass);
                returnTop.addCSSClass(this.scrollClass);
                separator.addCSSClass(this.scrollClass);

            } else {

                header.removeCSSClass(this.scrollClass);
                search.removeCSSClass(this.scrollClass);
                search.resizeSearchBox();
                options.removeCSSClass(this.scrollClass);
                returnTop.removeCSSClass(this.scrollClass);
                separator.removeCSSClass(this.scrollClass);

            }

        }

    }

    // Header

    class Header {

        constructor() {

            this.header = document.querySelector("header");
            this.initialize();

        }

        initialize() {

            

        }

        addCSSClass(cssClass) {

            this.header.classList.add(cssClass);

        }

        removeCSSClass(cssClass) {

            this.header.classList.remove(cssClass);

        }

    }

    // Search

    class Search {
        
        // This class extends the functionality of a text input to be resizable to its content in realtime, and adds other useful search features.

        constructor() {
            
            this.search = document.querySelector("section#search");
            this.searchBox = document.querySelector("section#search input#searchBox");
            this.searchIcon = document.querySelector("section#search div#searchIcon");
            this.editingClass = "editing";
            this.displayedClass = "displayed";
            this.maxWidth = 0.8;
            this.initialize();

        }

        initialize() {

            this.searchIcon.classList.add(this.displayedClass);
            this.searchBox.addEventListener("focus", this.searchBoxFocusListener.bind(this));
            this.searchBox.addEventListener("blur", this.searchBoxBlurListener.bind(this));
            this.searchBox.addEventListener("input", this.searchBoxInputListener.bind(this));
            this.searchBox.addEventListener("keyup", this.searchBoxKeyUpListener.bind(this));
            window.addEventListener("resize", this.resizeSearchBox.bind(this));
            this.resizeSearchBox();

        }

        searchBoxFocusListener() {

            if (!this.searchIcon.classList.contains(this.editingClass)) {

                this.searchIcon.classList.add(this.editingClass);
                this.searchIconClickListenerCopy = this.searchIconClickListener.bind(this);
                this.searchIcon.addEventListener("click", this.searchIconClickListenerCopy);

            }

        }

        searchBoxBlurListener() {

            if (!this.searchBox.value && this.searchIcon.classList.contains(this.editingClass)) {

                this.searchIcon.classList.remove(this.editingClass);
                this.searchIcon.removeEventListener("click", this.searchIconClickListenerCopy);

            }

        }

        searchBoxInputListener() {

            this.resizeSearchBox();

        }

        searchBoxKeyUpListener(event) {

            if (event.key === "Enter") {

                this.searchBox.blur();
                counters.show();
                filters.center();
                console.log(this.searchBox.value);

                // THOMAS

            }

            if (event.key === "Escape") {
                
                this.searchBox.blur();

            }

        }

        searchIconClickListener() {
            
            this.searchIcon.classList.remove(this.editingClass);
            this.searchIcon.removeEventListener("click", this.searchIconClickListenerCopy);
            this.searchBox.value = "";
            this.resizeSearchBox();
            counters.hide();
            filters.reset();

        }

        resizeSearchBox() {

            let content = "";

            if (this.searchBox.value) {

                content = this.searchBox.value;

            } else {

                content = this.searchBox.getAttribute("placeholder");

            }
            
            let contentWidth = parseInt(this.getContentWidth(content));
            let windowWidth = parseInt(window.innerWidth * this.maxWidth);

            if (contentWidth < windowWidth) {

                this.searchBox.style.width = contentWidth + "px";

            } else {
                
                this.searchBox.style.width = windowWidth + "px";

            }

        }

        getContentWidth(content) {

            // https://stackoverflow.com/questions/16478836/measuring-length-of-string-in-pixel-in-javascript

            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            let font = getComputedStyle(this.searchBox).fontWeight + " " + getComputedStyle(this.searchBox).fontSize + " " + getComputedStyle(this.searchBox).fontFamily; 
            ctx.font = font;     
            let width = ctx.measureText(content).width;
            canvas = null;
            ctx = null;

            return width;

        }

        addCSSClass(cssClass) {

            this.search.classList.add(cssClass);

        }

        removeCSSClass(cssClass) {

            this.search.classList.remove(cssClass);

        }

    }

    // Separator

    class Separator {

        constructor() {

            this.separator = document.querySelector("div#separator");
            this.initialize();

        }

        initialize() {



        }

        addCSSClass(cssClass) {

            this.separator.classList.add(cssClass);

        }

        removeCSSClass(cssClass) {

            this.separator.classList.remove(cssClass);

        }

    }

    // Options

    class Options {

        constructor() {

            this.options = document.querySelector("section#options");
            this.initialize();

        }

        initialize() {



        }

        addCSSClass(cssClass) {

            this.options.classList.add(cssClass);

        }

        removeCSSClass(cssClass) {

            this.options.classList.remove(cssClass);

        }

    }

    class Counters {

        constructor() {

            this.counters = document.querySelector("section#options p#counters");
            this.videosCounter = document.querySelector("section#options p#counters span#videoCounter");
            this.channelsCounter = document.querySelector("section#options p#counters span#channelsCounter");
            this.hiddenClass = "hidden";
            this.initialize();

        }

        initialize() {

        }

        show() {
            
            this.counters.classList.remove(this.hiddenClass);
            
        }

        hide() {
            
            this.counters.classList.add(this.hiddenClass);
            
        }

    }

    class Views {

        constructor() {

            this.views = document.querySelector("section#options div#views");
            this.buttons = document.querySelectorAll("section#options div#views button");
            this.selectedClass = "selected";
            this.initialize();

        }

        initialize() {

            for (let i=0; i < this.buttons.length; i++) {

                this.buttons[i].addEventListener("click", this.buttonsClickListener.bind(this));

            }

        }

        buttonsClickListener(event) {
            
            if (!event.target.classList.contains("selected")) {

                for (let i = 0; i < this.buttons.length; i++) {

                    this.buttons[i].classList.remove(this.selectedClass);

                }

                event.target.classList.add(this.selectedClass);

                this.decide(event.target.id);

            }
            
        }

        decide(id) {

            switch (id) {

                case "gridView": {

                    cards.setGridView();
                    console.log("gridView");
                    break;

                }

                case "listView": {

                    cards.setListView();
                    console.log("listView");
                    break;

                }

            }

        }

    }

    // New Tracker

    class NewTracker {

        constructor() {

            this.newTrackerButton = document.querySelector("button#newTracker");
            this.createButton = document.querySelector("div#newTrackerWrapper div#form div#submitWrapper button#create");
            this.cancelButton = document.querySelector("div#newTrackerWrapper div#form div#submitWrapper button#cancel");
            this.titleInput = document.querySelector("div#newTrackerWrapper div#form input#title");
            this.descriptionTextArea = document.querySelector("div#newTrackerWrapper div#form textarea#description");
            this.editingClass = "editing";
            this.initialize();

        }

        initialize() {

            this.newTrackerButton.addEventListener("click", this.newTrackerButtonClickListener.bind(this));
            this.createButton.addEventListener("click", this.createButtonClickListener.bind(this));
            this.cancelButton.addEventListener("click", this.cancelButtonClickListener.bind(this));

        }

        newTrackerButtonClickListener() {

            this.addCSSClass(this.editingClass);

        }

        createButtonClickListener() {

            this.removeCSSClass(this.editingClass);
            this.titleInput.value = "";
            this.descriptionTextArea.value = "";

        }

        cancelButtonClickListener() {

            this.removeCSSClass(this.editingClass);
            this.titleInput.value = "";
            this.descriptionTextArea.value = "";

        }

        addCSSClass(cssClass) {

            this.newTrackerButton.parentNode.classList.add(cssClass);

        }

        removeCSSClass(cssClass) {

            this.newTrackerButton.parentNode.classList.remove(cssClass);

        }

    }

    class Cards {

        constructor() {

            this.cards = document.querySelector("main#trackers");
            this.initialize();

        }

        initialize() {

            

        }

        setGridView() {

            this.cards.classList.remove("listView");

        }

        setListView() {

            this.cards.classList.add("listView");

        }

    }

    // Return Top

    class ReturnTop {

        constructor() {

            this.returnTop = document.querySelector("button#returnTop");
            this.initialize();

        }

        initialize() {

            this.returnTop.addEventListener("click", this.returnTopClickListener.bind(this));

        }

        returnTopClickListener() {

            window.scrollTo(0, 0);

        }

        addCSSClass(cssClass) {

            this.returnTop.classList.add(cssClass);

        }

        removeCSSClass(cssClass) {

            this.returnTop.classList.remove(cssClass);

        }

    }

    // Initialization

    let newTracker = new NewTracker();
    let header = new Header();
    let search = new Search();
    let cards = new Cards();
    let views = new Views();
    let options = new Options();
    let returnTop = new ReturnTop();
    let separator = new Separator();
    let general = new General();

});
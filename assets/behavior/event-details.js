/*



	" Reimplement the wheel to either learn, or make it better. "

    http://www.hayder.design/
    https://www.youtube.com/watch?v=QOlTGA3RE8I
    
    Product Name: YouTubeTracker,
	Description: Tracking YouTube"s data.
	Beneficiary: COSMOS
	
	Copyright © 1992 - 2021 HAYDER, All Rights Reserved.
	
	
	
*/



document.addEventListener("DOMContentLoaded", function() {

    // General

    class General {

        constructor() {

            this.document1 = document.body;
            this.document2 = document.documentElement;
            this.menuButton = document.querySelector("header div#username div#menu");
            this.sideMenu = document.querySelector("div#sideMenu");
            this.scrollClass = "scroll";
            this.displayedClass = "displayed";
            this.range = 100;
            this.initialize();

        }

        initialize() {

            window.addEventListener("scroll", this.windowScroll.bind(this));
            this.menuButton.addEventListener("click", this.menuButtonClickHandler.bind(this));
            this.sideMenu.addEventListener("click", this.sideMenuClickHandler.bind(this));

        }

        sideMenuClickHandler(event) {

            if (event.target.id == "closeSideMenuButton") {

                // this.windowSideMenuClickHandler();

            }

        }

        windowSideMenuClickHandler(event) {
            console.log(event.target === this.sideMenu);
            //this.sideMenu.classList.toggle(this.displayedClass);
            window.removeEventListener("click", this.windowSideMenuClickHandlerCopy);
            

        }

        menuButtonClickHandler () {
            
            this.windowSideMenuClickHandlerCopy = this.windowSideMenuClickHandler.bind(this);
            window.addEventListener("click", this.windowSideMenuClickHandlerCopy);
            this.sideMenu.classList.toggle(this.displayedClass);

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

    class Filters {

        constructor() {

            this.options = document.querySelector("section#options");
            this.filters = document.querySelectorAll("section#options ul#filters li.filter");
            this.filtersLabel = document.querySelector("section#options ul#filters span#sortLabel");
            this.filterButtons = document.querySelectorAll("section#options ul#filters li.filter button.filter:not(.more)");
            this.moreButton = document.querySelector("section#options ul#filters li.filter button.filter.more");
            this.selectedClass = "selected";
            this.hiddenClass = "hidden";
            this.centerClass = "center";
            this.maxLength = 0;
            this.initialize();

        }

        initialize() {

            this.resize();

            for (let i = 0; i < this.filterButtons.length; i++) {

                this.filterButtons[i].addEventListener("click", this.filterButtonsClickListener.bind(this));

            }

        }

        filterButtonsClickListener(event) {

            /* if (!event.target.classList.contains("selected")) {

                this.deselectAll();
                this.select(event.target);

                let textContent = event.target.textContent;

                if (event.target.parentElement.classList.contains("more")) {

                    event.target.textContent = this.filterButtons[this.maxLength - 1].textContent;
                    this.filterButtons[this.maxLength - 1].textContent = textContent;
                    this.deselectAll();
                    this.select(this.filterButtons[this.maxLength - 1]);

                }

                

            }*/

            let textContent = event.target.textContent;
            this.decide(textContent);
            
        }

        select(target) {

            target.classList.add(this.selectedClass);

        }

        deselect(target) {

            target.classList.remove(this.selectedClass);

        }

        deselectAll() {

            for (let i = 0; i < this.filterButtons.length; i++) {

                this.filterButtons[i].classList.remove(this.selectedClass);

            }

        }

        resize() {

            if ((this.filters.length - 1) > this.maxLength) {

                for (let i = this.maxLength; i < (this.filters.length - 1); i++) {
                    
                    moreMenu.insertItem(this.filters[i]);

                }

                this.moreButton.classList.remove(this.hiddenClass);
                this.moreButton.addEventListener("click", this.moreButtonClickListener.bind(this));

            }

        }

        moreButtonClickListener() {

            if (moreMenu.moreMenu.classList.contains(this.hiddenClass)) {
                
                moreMenu.show();

            } else {

                moreMenu.hide();

            }

        }

        decide(textContent) {

            this.filtersLabel.textContent = textContent;

            /* switch (textContent) {

                case "All": {

                    console.log("All");

                    // THOMAS

                    break;

                }

                case "Date": {

                    console.log("Date");

                    // THOMAS

                    break;

                }

                case "Rating": {

                    console.log("Rating");

                    // THOMAS

                    break;

                }

                case "Relevance": {

                    console.log("Relevance");

                    // THOMAS

                    break;

                }

                case "Title": {

                    console.log("Title");

                    // THOMAS

                    break;

                }

                case "Video Count": {

                    console.log("Video Count");

                    // THOMAS

                    break;

                }

                case "View Count": {

                    console.log("View Count");

                    // THOMAS

                    break;

                }

            } */

        }

        center() {
            
            document.querySelector("section#options ul#filters").classList.add("center");

        }

        reset() {
            
            document.querySelector("section#options ul#filters").classList.remove("center");

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

    class MoreMenu {

        constructor() {

            this.moreMenuDummy = document.querySelector("div#moreMenu.dummy");
            this.moreButton = document.querySelector("section#options ul#filters li.filter button.filter.more");
            this.dummyClass = "dummy";
            this.hiddenClass = "hidden";
            this.initialize();

        }

        initialize() {

            this.clone();

        }

        clone() {

            this.moreMenu = this.moreMenuDummy.cloneNode(true);
            this.moreMenu.classList.remove(this.dummyClass);
            this.moreButton.parentElement.prepend(this.moreMenu);

        }

        show() {

            // https://stackoverflow.com/questions/33859113/javascript-removeeventlistener-not-working-inside-a-class
            // https://stackoverflow.com/questions/36695438/detect-click-outside-div-using-javascript

            filters.select(this.moreButton);
            this.moreMenu.classList.remove(this.hiddenClass);
            this.windowClickListenerCopy = this.windowClickListener.bind(this);
            window.addEventListener("touchend", this.windowClickListenerCopy);
            window.addEventListener("click", this.windowClickListenerCopy);

        }

        hide() {
            
            filters.deselect(this.moreButton);
            this.moreMenu.classList.add(this.hiddenClass);
            window.removeEventListener("touchend", this.windowClickListenerCopy);
            window.removeEventListener("click", this.windowClickListenerCopy);
            

        }

        insertItem(item) {
            
            item.classList.add("more");
            document.querySelector("div#moreMenu ul#list").append(item);

        }

        windowClickListener(event) {
            
            if (!((event.target.classList.contains("more")) && (event.target.classList.contains("filter")))) {

                this.hide();

            }

        }

    }

    // Content

    class TrackMenu {

        constructor() {

            this.trackMenuDummy = document.querySelector("div#trackMenu.dummy");
            this.initialize();

        }

        initialize() {



        }

        clone(type) {

            this.trackMenuCopy = this.trackMenuDummy.cloneNode(true);
            this.trackMenuCopy.classList.remove("dummy");
            this.show();

            if (type == "card") {
                
                this.trackMenuCopy.classList.add("card");

            } else if (type == "footer") {

                this.trackMenuCopy.classList.add("footer");

            }

            this.createTrackerForm = this.trackMenuCopy.querySelector("form#createTrackerForm");
            this.addTrackerButton = this.trackMenuCopy.querySelector("form#createTrackerForm button#addTracker");
            this.createTrackerButton = this.trackMenuCopy.querySelector("form#createTrackerForm button#createTracker");
            this.trackMenuCopy.addEventListener("touchend", this.menuClickListener);
            this.trackMenuCopy.addEventListener("click", this.menuClickListener);

        }

        setupTrackers() {

            this.trackers = this.trackMenuCopy.querySelectorAll("div#menu ul#trackers li");

            for (let i = 0; i < this.trackers.length; i++) {

                this.trackers[i].addEventListener("click", this.trackersClickListener.bind(this));

            }

        }

        trackersClickListener() {
            
            event.target.parentElement.querySelector("button#checkMark").classList.toggle("selected");

            // THOMAS

        }

        setupCreateTracker() {

            this.addTrackerButton.addEventListener("click", this.addTrackerClickListener.bind(this));
            this.createTrackerButton.addEventListener("click", this.addTrackerClickListener.bind(this));

        }

        addTrackerClickListener(event) {

            event.preventDefault();
            this.createTrackerForm.classList.toggle("creating");

            // THOMAS

        }

        show() {

            this.trackMenuCopy.classList.remove("hidden");

        }

        hide() {

            this.trackMenuCopy.classList.add("hidden");

        }

        create(type) {

            this.clone(type);
            this.setupTrackers();
            this.setupCreateTracker();

        }

        menuClickListener(event) {

            event.stopPropagation(); // https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element

        }

    }

    class Cards {

        constructor() {

            this.cards = document.querySelector("main#content ul#cards");
            this.thumbnails = document.querySelectorAll("main#content ul#cards li#card div#thumbnail");
            this.checkMarks = document.querySelectorAll("main#content ul#cards li#card div#thumbnail button#checkMark");
            this.favorButtons = document.querySelectorAll("main#content ul#cards li#card div#thumbnail button#favor");
            this.videoTitle = document.querySelectorAll("main#content ul#cards li#card.video div#detailsWrapper div#details p#title");
            this.channelTitle = document.querySelectorAll("main#content ul#cards li#card.channel div#detailsWrapper div#details p#title");
            this.trackStatusButtons = document.querySelectorAll("main#content ul#cards li#card div#wrapper button#trackStatusButton");
            this.selectedClass = "selected";
            this.numberOfSelectedVideos = 0;
            this.numberOfSelectedChannels = 0;
            this.initialize();

        }

        initialize() {
            
            for (let i = 0; i < this.thumbnails.length; i++) {

                this.thumbnails[i].addEventListener("click", this.thumbnailClickListener.bind(this));
                this.trackStatusButtons[i].addEventListener("click", this.trackStatusButtonClickListener.bind(this));

            }
            
            this.videoTitle.forEach(function(item) {

                item.addEventListener("click", this.videoTitleClickListener.bind(this));

            }.bind(this));

            this.channelTitle.forEach(function (item) {

                item.addEventListener("click", this.channelTitleClickListener.bind(this));

            }.bind(this));

        }

        channelTitleClickListener(event) {

            modals.show();
            channelModal.show();

        }

        videoTitleClickListener(event) {

            modals.show();
            videoModal.show();

        }

        thumbnailClickListener(event) {

            if (event.target.id == "favor") {

                this.favorClick(event);

            } else if (event.target.id == "checkMark") {
            
                this.checkMarkClick(event);

            } else {

                this.thumbnailClick(event);

            }

        }

        favorClick(event) {

            event.target.classList.toggle(this.selectedClass);
            console.log("favor");

            // THOMAS

        }

        thumbnailClick(event) {

            if (event.currentTarget.parentElement.classList.contains("video")) {

                modals.show();
                videoModal.show();

            } else {

                modals.show();
                channelModal.show();

            }

        }

        checkMarkClick(event) {

            this.selectDeselect(event);
            this.updateSelectionCounters(event);
            bottomMessage.update();

        }

        selectDeselect(event) {

            event.currentTarget.classList.toggle(this.selectedClass);

        }

        deselectAll() {

            this.numberOfSelectedChannels = 0;
            this.numberOfSelectedVideos = 0;
            let selectedCards = this.cards.querySelectorAll("li#card div#thumbnail.selected");

            for (let i = 0; i < selectedCards.length; i++) {

                selectedCards[i].classList.remove(this.selectedClass);

            }

        }

        updateSelectionCounters(event) {

            if (event.currentTarget.classList.contains(this.selectedClass)) {

                if (event.currentTarget.parentElement.classList.contains("video")) {

                    this.numberOfSelectedVideos += 1;

                } else {

                    this.numberOfSelectedChannels += 1;

                }

            } else {

                if (event.currentTarget.parentElement.classList.contains("video")) {

                    this.numberOfSelectedVideos -= 1;

                } else {

                    this.numberOfSelectedChannels -= 1;

                }

            }

        }

        trackStatusButtonClickListener(event) {

            if (event.target.classList.contains("selected") != true) {

                this.removeTrackMenu();
                this.deselectAllTrackStatusButtons();
                this.removeWindowListener();
                event.target.classList.add("selected");
                trackMenu.create("card");
                event.target.parentElement.prepend(trackMenu.trackMenuCopy);
                this.clickOutside();

            } else {

                this.removeTrackMenu();
                this.deselectAllTrackStatusButtons();
                this.removeWindowListener();

            }

        }

        deselectAllTrackStatusButtons() {

            let trackStatusButtonsSelected = document.querySelectorAll("main#content ul#cards li#card div#wrapper button#trackStatusButton.selected");
            
            for (let i = 0; i < trackStatusButtonsSelected.length; i++) {

                trackStatusButtonsSelected[i].classList.remove("selected");

            }

        }

        clickOutside() {
            
            // https://stackoverflow.com/questions/33859113/javascript-removeeventlistener-not-working-inside-a-class
            // https://stackoverflow.com/questions/36695438/detect-click-outside-div-using-javascript

            this.windowClickListenerCopy = this.windowClickListener.bind(this);
            window.addEventListener("touchend", this.windowClickListenerCopy);
            window.addEventListener("click", this.windowClickListenerCopy);

        }

        windowClickListener(event) {
            
            if (event.target.id != this.trackStatusButtons[0].id) {

                this.removeTrackMenu();
                this.deselectAllTrackStatusButtons();
                this.removeWindowListener();
                
            }

        }

        removeWindowListener() {

            window.removeEventListener("touchend", this.windowClickListenerCopy);
            window.removeEventListener("click", this.windowClickListenerCopy);

        }

        setGridView() {

            this.cards.classList.remove("listView");

        }

        setListView() {

            this.cards.classList.add("listView");

        }

        removeTrackMenu() {

            if (document.querySelector("button#trackStatusButton.selected")) document.querySelector("button#trackStatusButton.selected").parentElement.querySelector("div#trackMenu").remove();

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

    // Bottom message

    class BottomMessage {

        constructor() {

            this.noSelectionMessage = "Select Videos/Channels to track.";
            this.message = document.querySelector("section#bottom div#message");
            this.details = document.querySelector("section#bottom div#message div#wrapper p#details");
            this.trackButton = document.querySelector("section#bottom div#message div#wrapper div#buttonWrapper button#track");
            this.closeButton = document.querySelector("section#bottom div#message button#close");
            this.selectedClass = "selected";
            this.selectingClass = "selecting";
            this.selectionStatus = false;
            this.initialize();

        }

        initialize() {

            this.setMessage(this.noSelectionMessage);

        }

        update() {

            if ((cards.numberOfSelectedVideos + cards.numberOfSelectedChannels) > 0) {

                if (!this.selectionStatus) {
                    
                    this.startCancelSelection(true);

                }
                
                this.setMessage(this.buildMessage());

            } else {

                this.startCancelSelection(false);

            }

        }

        buildMessage() {

            let multiVideos = "";
            let multiChannels = "";
            let videosLabel = "";
            let channelsLabel = "";
            let separator = "";
            if (cards.numberOfSelectedVideos > 1) multiVideos = "s";
            if (cards.numberOfSelectedChannels > 1) multiChannels = "s";
            if ((cards.numberOfSelectedVideos >= 1) && (cards.numberOfSelectedChannels)) separator = " · ";
            if (cards.numberOfSelectedVideos > 0) videosLabel = cards.numberOfSelectedVideos + " Event" + multiVideos;
            if (cards.numberOfSelectedChannels > 0) channelsLabel = cards.numberOfSelectedChannels + " Channel" + multiChannels;
            return videosLabel + separator + channelsLabel + " selected";

        }

        startCancelSelection(selection) {

            if (selection) {

                this.addCSSClass(this.selectingClass);
                this.trackButtonClickListenerCopy = this.trackButtonClickListener.bind(this);
                this.closeButtonClickListenerCopy = this.closeButtonClickListener.bind(this);
                this.trackButton.addEventListener("click", this.trackButtonClickListenerCopy);
                this.closeButton.addEventListener("click", this.closeButtonClickListenerCopy);
                this.selectionStatus = true;

            } else {

                this.trackButton.removeEventListener("click", this.trackButtonClickListenerCopy);
                this.closeButton.removeEventListener("click", this.closeButtonClickListenerCopy);
                this.removeCSSClass(this.selectingClass);
                this.setMessage(this.noSelectionMessage);
                this.selectionStatus = false;

            }

        }

        trackButtonClickListener(event) {

            if (event.target.classList.contains(this.selectedClass) != true) {

                this.selectDeselectTrackButton(true);
                trackMenu.create("footer");
                event.target.parentElement.prepend(trackMenu.trackMenuCopy);
                overlay.addCSSClass(overlay.displayedClass);
                document.querySelector('body').classList.add('noScroll');
                this.clickOutside();

            } else {

                this.removeTrackMenu();
                this.selectDeselectTrackButton(false);
                overlay.removeCSSClass(overlay.displayedClass);
                document.querySelector('body').classList.remove('noScroll');

            }

        }

        selectDeselectTrackButton(selection) {

            if (selection) {

                this.trackButton.classList.add(this.selectedClass);

            } else {

                this.trackButton.classList.remove(this.selectedClass);

            }

        }

        clickOutside() {

            this.windowClickListenerCopy = this.windowClickListener.bind(this);
            window.addEventListener("touchend", this.windowClickListenerCopy);
            window.addEventListener("click", this.windowClickListenerCopy);

        }

        windowClickListener() {
            
            if (event.target != this.trackButton) {

                this.selectDeselectTrackButton(false);
                this.removeTrackMenu();
                this.removeWindowListener();
                overlay.removeCSSClass(overlay.displayedClass);
                document.querySelector('body').classList.remove('noScroll');

            }

        }

        removeWindowListener() {

            window.removeEventListener("touchend", this.windowClickListenerCopy);
            window.removeEventListener("click", this.windowClickListenerCopy);

        }

        removeTrackMenu() {

            if (this.trackButton.parentElement.querySelector("div#trackMenu")) this.trackButton.parentElement.querySelector("div#trackMenu").remove();

        }

        closeButtonClickListener(event) {

            this.selectDeselectTrackButton(false);
            this.removeTrackMenu();
            document.querySelector('body').classList.remove('noScroll');
            overlay.removeCSSClass(overlay.displayedClass);
            this.startCancelSelection(false);
            cards.deselectAll();

        }

        setMessage(message) {

            this.details.textContent = message;

        }

        addCSSClass(cssClass) {

            this.message.classList.add(cssClass);

        }

        removeCSSClass(cssClass) {

            this.message.classList.remove(cssClass);

        }

    }

    // Overlay
    
    class Overlay {

        constructor() {

            this.overlay = document.querySelector("div#overlay");
            this.displayedClass = "displayed";
            this.initialize();

        }

        initialize() {

            

        }

        addCSSClass(cssClass) {

            this.overlay.classList.add(cssClass);

        }

        removeCSSClass(cssClass) {

            this.overlay.classList.remove(cssClass);

        }

    }

    // Modals

    class Modals {

        constructor() {

            this.modals = document.querySelector("section#modals");
            this.displayedClass = "displayed";
            this.initialize();

        }

        initialize() {

            this.modals.addEventListener("click", this.close.bind(this));

        }

        close(event) {

            if (event.target == event.currentTarget) {

                if (videoModal.modal.classList.contains(this.displayedClass)) videoModal.closeClickListener();
                if (channelModal.modal.classList.contains(this.displayedClass)) channelModal.closeClickListener();

            }

        }

        show() {

            this.addCSSClass(this.displayedClass);

        }

        hide() {

            this.removeCSSClass(this.displayedClass);

        }

        addCSSClass(cssClass) {

            this.modals.classList.add(cssClass);

        }

        removeCSSClass(cssClass) {

            this.modals.classList.remove(cssClass);

        }

    }

    class VideoModal {

        constructor() {

            this.modal = document.querySelector("section#modals div#video");
            this.close = document.querySelector("section#modals div#window button#close");
            this.playerWindow = document.querySelector("section#modals div#video.modal div#player");
            this.toolsWindow = document.querySelector("section#modals div#video.modal div#tools");
            this.video = document.querySelector("section#modals div#video.modal div#player div#wrapper iframe");
            this.trackersWindow = document.querySelector("section#modals div#video.modal div#tools div#trackers ul#trackers");
            this.trackers = document.querySelectorAll("section#modals div#video.modal div#tools div#trackers ul#trackers li");
            this.search = document.querySelector("section#modals div#video.modal div#tools div#trackers input#search");
            this.createTrackerForm = document.querySelector("section#modals div#video.modal div#tools div#trackers form#createTrackerForm");
            this.trackerName = document.querySelector("section#modals div#video.modal div#tools div#trackers form#createTrackerForm input#trackerName");
            this.trackerDescription = document.querySelector("section#modals div#video.modal div#tools div#trackers form#createTrackerForm textArea#trackerDescription");
            this.addTrackerButton = document.querySelector("section#modals div#video.modal div#tools div#trackers form#createTrackerForm button#addTracker");
            this.createTrackerButton = document.querySelector("section#modals div#video.modal div#tools div#trackers form#createTrackerForm button#createTracker");
            this.cancelButton = document.querySelector("section#modals div#video.modal div#tools div#trackers form#createTrackerForm button#cancel");
            this.thumbnails = document.querySelectorAll("section#modals div#video.modal div#tools div#relatedVideos ul#cards li#card div#thumbnail");
            this.favorButtons = document.querySelectorAll("section#modals div#video.modal div#tools div#relatedVideos ul#cards li#card div#thumbnail button#favor");
            this.trackStatusButtons = document.querySelectorAll("section#modals div#video.modal div#tools div#relatedVideos ul#cards li#card div#wrapper button#trackStatusButton");
            // this.titleFavorButton = document.querySelector("section#modals div#video.modal div#player div#details div#head div#titleWrapper button#favor");
            // this.scrollDown = document.querySelector("section#modals div#video.modal button#scrollDown");
            this.displayedClass = "displayed";
            this.selectedClass = "selected";
            this.initialize();

        }

        initialize() {

            // this.titleFavorButton.addEventListener("click", this.titleFavorButtonClickListener.bind(this));

        }

        show() {

            document.querySelector('body').classList.add('noScroll');
            this.addCSSClass(this.displayedClass);
            this.registerEvents();
            this.setupTrackers();
            this.setupCreateTracker();
            // player.mute();
            player.playVideo();

            this.thumbnailClickListenerCopy = [];
            this.trackStatusButtonClickListenerCopy = [];

            for (let i = 0; i < this.thumbnails.length; i++) {
                
                this.thumbnailClickListenerCopy[i] = this.thumbnailClickListener.bind(this);
                this.thumbnails[i].addEventListener("click", this.thumbnailClickListenerCopy[i]);
                this.trackStatusButtonClickListenerCopy[i] = this.trackStatusButtonClickListener.bind(this);
                this.trackStatusButtons[i].addEventListener("click", this.trackStatusButtonClickListenerCopy[i]);

            }

            this.playerWindow.addEventListener("scroll", this.playerWindowScrollListener);

        }

        titleFavorButtonClickListener(event) {

            this.titleFavorButton.classList.toggle(this.selectedClass);

        }

        playerWindowScrollListener(event) {

            
            if (event.target.scrollTop < 20) {

                videoModal.scrollDown.classList.remove("scroll");

            } else {

                videoModal.scrollDown.classList.add("scroll");

            }

        }

        registerEvents() {
            
            this.closeClickListenerCopy = this.closeClickListener.bind(this);
            this.close.addEventListener("touchend", this.closeClickListenerCopy);
            this.close.addEventListener("click", this.closeClickListenerCopy);
            
        }

        setupTrackers() {

            this.trackersClickListenerCopy = this.trackersClickListener.bind(this);

            for (let i = 0; i < this.trackers.length; i++) {

                this.trackers[i].addEventListener("click", this.trackersClickListenerCopy);

            }

        }

        setupCreateTracker() {

            this.addTrackerClickListenerCopy = this.addTrackerClickListener.bind(this);
            this.addTrackerButton.addEventListener("click", this.addTrackerClickListenerCopy);
            this.createTrackerButton.addEventListener("click", this.addTrackerClickListenerCopy);
            this.cancelButton.addEventListener("click", this.addTrackerClickListenerCopy);

        }

        addTrackerClickListener(event) {

            event.preventDefault();
            this.createTrackerForm.classList.toggle("creating");

            // THOMAS

        }

        trackersClickListener() {

            event.target.parentElement.querySelector("button#checkMark").classList.toggle("selected");

            // THOMAS

        }

        videoChangeStateListener(event) {

            switch (event.data) {

                case 1 : {

                    break;

                }

                case 2 : {

                    break;

                }

            }

        }

        closeClickListener() {

            this.reset();
            this.hide();
            modals.hide();
            document.querySelector('body').classList.remove('noScroll');

        }

        reset() {

            this.close.removeEventListener("touchend", this.closeClickListenerCopy);
            this.close.removeEventListener("click", this.closeClickListenerCopy);
            player.stopVideo();

            this.search.value = "";

            for (let i = 0; i < this.trackers.length; i++) {

                this.trackers[i].removeEventListener("click", this.trackersClickListenerCopy);

            }

            this.trackerName.value = "";
            this.trackerDescription.value = "";
            this.createTrackerForm.classList.remove("creating");
            this.addTrackerButton.removeEventListener("click", this.addTrackerClickListenerCopy);
            this.createTrackerButton.removeEventListener("click", this.addTrackerClickListenerCopy);
            this.cancelButton.removeEventListener("click", this.addTrackerClickListenerCopy);
            this.playerWindow.scrollTop = 0;
            this.toolsWindow.scrollTop = 0;
            this.trackersWindow.scrollTop = 0;
            
            for (let i = 0; i < this.thumbnails.length; i++) {

                this.thumbnails[i].removeEventListener("click", this.thumbnailClickListenerCopy[i]);
                this.trackStatusButtons[i].removeEventListener("click", this.trackStatusButtonClickListenerCopy[i]);

            }

            this.playerWindow.removeEventListener("scroll", this.playerWindowScrollListener);

        }

        thumbnailClickListener(event) {

            if (event.target.id == "favor") {

                this.favorClick(event);

            } else if (event.target.id == "checkMark") {
            
                this.checkMarkClick(event);

            } else {

                this.thumbnailClick(event);

            }

        }

        favorClick(event) {
            
            event.target.classList.toggle(this.selectedClass);

            // THOMAS

        }

        thumbnailClick(event) {

            

        }

        trackStatusButtonClickListener(event) {

            if (event.target.classList.contains("selected") != true) {

                this.removeTrackMenu();
                this.deselectAllTrackStatusButtons();
                this.removeWindowListener();
                event.target.classList.add("selected");
                trackMenu.create("card");
                event.target.parentElement.prepend(trackMenu.trackMenuCopy);
                this.clickOutside();

            } else {

                this.removeTrackMenu();
                this.deselectAllTrackStatusButtons();
                this.removeWindowListener();

            }

        }

        deselectAllTrackStatusButtons() {

            let trackStatusButtonsSelected = document.querySelectorAll("section#modals div#video.modal div#tools div#relatedVideos ul#cards li#card div#wrapper button#trackStatusButton.selected");
            
            for (let i = 0; i < trackStatusButtonsSelected.length; i++) {

                trackStatusButtonsSelected[i].classList.remove("selected");

            }

        }

        clickOutside() {
            
            // https://stackoverflow.com/questions/33859113/javascript-removeeventlistener-not-working-inside-a-class
            // https://stackoverflow.com/questions/36695438/detect-click-outside-div-using-javascript

            this.windowClickListenerCopy = this.windowClickListener.bind(this);
            window.addEventListener("touchend", this.windowClickListenerCopy);
            window.addEventListener("click", this.windowClickListenerCopy);

        }

        windowClickListener(event) {
            
            if (event.target.id != this.trackStatusButtons[0].id) {

                this.removeTrackMenu();
                this.deselectAllTrackStatusButtons();
                this.removeWindowListener();
                
            }

        }

        removeWindowListener() {

            window.removeEventListener("touchend", this.windowClickListenerCopy);
            window.removeEventListener("click", this.windowClickListenerCopy);

        }

        removeTrackMenu() {

            if (document.querySelector("section#modals div#video.modal div#tools div#relatedVideos ul#cards li#card div#wrapper button#trackStatusButton.selected")) document.querySelector("section#modals div#video.modal div#tools div#relatedVideos ul#cards li#card div#wrapper button#trackStatusButton.selected").parentElement.querySelector("div#trackMenu").remove();

        }

        hide() {

            this.removeCSSClass(this.displayedClass);

        }

        addCSSClass(cssClass) {

            this.modal.classList.add(cssClass);

        }

        removeCSSClass(cssClass) {

            this.modal.classList.remove(cssClass);

        }

    }

    class ChannelModal {

        constructor() {

            this.modal = document.querySelector("section#modals div#channel.modal");
            this.close = document.querySelector("section#modals div#window button#close");
            this.master = document.querySelector("section#modals div#channel.modal div#master");
            this.side = document.querySelector("section#modals div#channel.modal div#side");
            this.trackersWindow = document.querySelector("section#modals div#channel.modal div#side div#trackers ul#trackers");
            this.trackers = document.querySelectorAll("section#modals div#channel.modal div#side div#trackers ul#trackers li");
            this.search = document.querySelector("section#modals div#channel.modal div#side div#trackers input#search");
            this.createTrackerForm = document.querySelector("section#modals div#channel.modal div#side div#trackers form#createTrackerForm");
            this.trackerName = document.querySelector("section#modals div#channel.modal div#side div#trackers form#createTrackerForm input#trackerName");
            this.trackerDescription = document.querySelector("section#modals div#channel.modal div#side div#trackers form#createTrackerForm textArea#trackerDescription");
            this.addTrackerButton = document.querySelector("section#modals div#channel.modal div#side div#trackers form#createTrackerForm button#addTracker");
            this.createTrackerButton = document.querySelector("section#modals div#channel.modal div#side div#trackers form#createTrackerForm button#createTracker");
            this.cancelButton = document.querySelector("section#modals div#channel.modal div#side div#trackers form#createTrackerForm button#cancel");
            this.thumbnails = document.querySelectorAll("section#modals div#channel.modal div#side div#relatedChannels ul#cards li#card div#thumbnail");
            this.favorButtons = document.querySelectorAll("section#modals div#channel.modal div#side div#relatedChannels ul#cards li#card div#thumbnail button#favor");
            this.trackStatusButtons = document.querySelectorAll("section#modals div#channel.modal div#side div#relatedChannels ul#cards li#card div#wrapper button#trackStatusButton");
            this.titleFavorButton = document.querySelector("section#modals div#channel.modal div#master div#content div#details div#channel div#topWrapper button#favor");
            this.scrollDown = document.querySelector("section#modals div#channel.modal button#scrollDown");
            this.displayedClass = "displayed";
            this.selectedClass = "selected";
            this.initialize();

        }

        initialize() {

            this.titleFavorButton.addEventListener("click", this.titleFavorButtonClickListener.bind(this));

        }

        show() {

            document.querySelector('body').classList.add('noScroll');
            this.addCSSClass(this.displayedClass); console.log(this);
            
            this.registerEvents();
            this.setupTrackers();
            this.setupCreateTracker();

            this.thumbnailClickListenerCopy = [];
            this.trackStatusButtonClickListenerCopy = [];

            for (let i = 0; i < this.thumbnails.length; i++) {

                this.thumbnailClickListenerCopy[i] = this.thumbnailClickListener.bind(this);
                this.thumbnails[i].addEventListener("click", this.thumbnailClickListenerCopy[i]);
                this.trackStatusButtonClickListenerCopy[i] = this.trackStatusButtonClickListener.bind(this);
                this.trackStatusButtons[i].addEventListener("click", this.trackStatusButtonClickListenerCopy[i]);

            }

            this.master.addEventListener("scroll", this.masterScrollListener);

        }

        titleFavorButtonClickListener(event) {

            this.titleFavorButton.classList.toggle(this.selectedClass);

        }

        masterScrollListener(event) {


            if (event.target.scrollTop < 20) {

                channelModal.scrollDown.classList.remove("scroll");

            } else {

                channelModal.scrollDown.classList.add("scroll");

            }

        }

        registerEvents() {

            this.closeClickListenerCopy = this.closeClickListener.bind(this);
            this.close.addEventListener("touchend", this.closeClickListenerCopy);
            this.close.addEventListener("click", this.closeClickListenerCopy);

        }

        setupTrackers() {

            this.trackersClickListenerCopy = this.trackersClickListener.bind(this);

            for (let i = 0; i < this.trackers.length; i++) {

                this.trackers[i].addEventListener("click", this.trackersClickListenerCopy);

            }

        }

        setupCreateTracker() {

            this.addTrackerClickListenerCopy = this.addTrackerClickListener.bind(this);
            this.addTrackerButton.addEventListener("click", this.addTrackerClickListenerCopy);
            this.createTrackerButton.addEventListener("click", this.addTrackerClickListenerCopy);
            this.cancelButton.addEventListener("click", this.addTrackerClickListenerCopy);

        }

        addTrackerClickListener(event) {

            event.preventDefault();
            this.createTrackerForm.classList.toggle("creating");

            // THOMAS

        }

        trackersClickListener() {

            event.target.parentElement.querySelector("button#checkMark").classList.toggle("selected");

            // THOMAS

        }

        closeClickListener() {

            this.reset();
            this.hide();
            modals.hide();
            document.querySelector('body').classList.remove('noScroll');

        }

        reset() {

            this.close.removeEventListener("touchend", this.closeClickListenerCopy);
            this.close.removeEventListener("click", this.closeClickListenerCopy);

            this.search.value = "";

            for (let i = 0; i < this.trackers.length; i++) {

                this.trackers[i].removeEventListener("click", this.trackersClickListenerCopy);

            }

            this.trackerName.value = "";
            this.trackerDescription.value = "";
            this.createTrackerForm.classList.remove("creating");
            this.addTrackerButton.removeEventListener("click", this.addTrackerClickListenerCopy);
            this.createTrackerButton.removeEventListener("click", this.addTrackerClickListenerCopy);
            this.cancelButton.removeEventListener("click", this.addTrackerClickListenerCopy);
            this.master.scrollTop = 0;
            this.side.scrollTop = 0;
            this.trackersWindow.scrollTop = 0;

            for (let i = 0; i < this.thumbnails.length; i++) {

                this.thumbnails[i].removeEventListener("click", this.thumbnailClickListenerCopy[i]);
                this.trackStatusButtons[i].removeEventListener("click", this.trackStatusButtonClickListenerCopy[i]);

            }

            this.master.removeEventListener("scroll", this.masterScrollListener);

        }

        thumbnailClickListener(event) {

            if (event.target.id == "favor") {

                this.favorClick(event);

            } else if (event.target.id == "checkMark") {

                this.checkMarkClick(event);

            } else {

                this.thumbnailClick(event);

            }

        }

        favorClick(event) {

            event.target.classList.toggle(this.selectedClass);

            // THOMAS

        }

        thumbnailClick(event) {



        }

        trackStatusButtonClickListener(event) {

            if (event.target.classList.contains("selected") != true) {

                this.removeTrackMenu();
                this.deselectAllTrackStatusButtons();
                this.removeWindowListener();
                event.target.classList.add("selected");
                trackMenu.create("card");
                event.target.parentElement.prepend(trackMenu.trackMenuCopy);
                this.clickOutside();

            } else {

                this.removeTrackMenu();
                this.deselectAllTrackStatusButtons();
                this.removeWindowListener();

            }

        }

        deselectAllTrackStatusButtons() {

            let trackStatusButtonsSelected = document.querySelectorAll("section#modals div#channel.modal div#side div#relatedChannels ul#cards li#card div#wrapper button#trackStatusButton.selected");

            for (let i = 0; i < trackStatusButtonsSelected.length; i++) {

                trackStatusButtonsSelected[i].classList.remove("selected");

            }

        }

        clickOutside() {

            // https://stackoverflow.com/questions/33859113/javascript-removeeventlistener-not-working-inside-a-class
            // https://stackoverflow.com/questions/36695438/detect-click-outside-div-using-javascript

            this.windowClickListenerCopy = this.windowClickListener.bind(this);
            window.addEventListener("touchend", this.windowClickListenerCopy);
            window.addEventListener("click", this.windowClickListenerCopy);

        }

        windowClickListener(event) {

            if (event.target.id != this.trackStatusButtons[0].id) {

                this.removeTrackMenu();
                this.deselectAllTrackStatusButtons();
                this.removeWindowListener();

            }

        }

        removeWindowListener() {

            window.removeEventListener("touchend", this.windowClickListenerCopy);
            window.removeEventListener("click", this.windowClickListenerCopy);

        }

        removeTrackMenu() {

            if (document.querySelector("section#modals div#channel.modal div#side div#relatedChannels ul#cards li#card div#wrapper button#trackStatusButton.selected")) document.querySelector("section#modals div#channel.modal div#side div#relatedChannels ul#cards li#card div#wrapper button#trackStatusButton.selected").parentElement.querySelector("div#trackMenu").remove();

        }

        hide() {

            this.removeCSSClass(this.displayedClass);

        }

        addCSSClass(cssClass) {

            this.modal.classList.add(cssClass);

        }

        removeCSSClass(cssClass) {

            this.modal.classList.remove(cssClass);

        }

    }

    // Initialization

    let modals = new Modals();
    let videoModal = new VideoModal();
    let channelModal = new ChannelModal();
    let header = new Header();
    let search = new Search();
    let moreMenu = new MoreMenu();
    let trackMenu = new TrackMenu();
    let cards = new Cards();
    let views = new Views();
    let counters = new Counters();
    let filters = new Filters();
    let options = new Options();
    let returnTop = new ReturnTop();
    let separator = new Separator();
    let general = new General();
    let bottomMessage = new BottomMessage();
    let overlay = new Overlay();

    
    // YouTubePlayer

    var tag = document.createElement('script');
    tag.id = 'iframe-demo';
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var player;

    window.onYouTubeIframeAPIReady = function () {

        player = new YT.Player(videoModal.video, {

            events: {

                'onStateChange': videoModal.videoChangeStateListener

            }

        });
    }

});
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


    class Cards {

        constructor() {

            this.cards = document.querySelectorAll("main#content div#videosChannels ul#list li#video");
            this.initialize();

        }

        initialize() {

            for (let i = 0; i < this.cards.length; i++) {

                this.cards[i].addEventListener("click", this.cardClickListener.bind(this));

            }

        }

        cardClickListener(event) {

            modals.show();
            videoModal.show();

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

                this.removeWindowListener();

            }

        }

        removeWindowListener() {

            window.removeEventListener("touchend", this.windowClickListenerCopy);
            window.removeEventListener("click", this.windowClickListenerCopy);

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

                case 1: {

                    break;

                }

                case 2: {

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

    let cards = new Cards();
    let modals = new Modals();
    let videoModal = new VideoModal();
    let channelModal = new ChannelModal();
    let header = new Header();


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
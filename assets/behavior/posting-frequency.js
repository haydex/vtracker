/*



	" Reimplement the wheel to either learn, or make it better. "

    http://www.hayder.io/
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

            this.figure = document.querySelectorAll("main#content div#dashboard section#visualizations figure.figure");
            this.datePickerButton = document.querySelector("main#content div#dashboard section#navigation div#navigationWrapper button#datePickerButton");
            this.datePickerMenu = document.querySelector("main#content div#dashboard section#navigation div#navigationWrapper button#datePickerButton div#datePicker");
            this.figureTables = document.querySelectorAll("main#content div#dashboard section#visualizations figure.figure table");
            this.channelsList = document.querySelector("main#content div#dashboard section#visualizations figure#postingFrequencyDiagram div#channelsWrapper ul#channelsList");
            this.sideMenuButton = document.querySelector("div#menu");
            this.sideMenu = document.querySelector("div#sideMenu");
            this.submenu = document.querySelectorAll(".submenu");
            this.timeoutClass = "timeout";
            this.displayedClass = "displayed";
            this.selectedClass = "selected";
            this.disabledClass = "disabled";
            this.activeClass = "active";
            this.submenuClass = "submenu";
            this.reverseClass = "reverse";
            this.tableHeadWrapperClass = "tableHeadWrapper";

            this.selectedChannels = 0;
            this.defaultSelection = 3;
            this.selection = [
                { 
                    "backgroundColor": "hsla(15,6%,40%,0.3)",
                    "color": "white",
                    "index": -1,
                    "order": -1
                },
                {
                    "backgroundColor" : "#ff0000",
                    "color": "white",
                    "index": -1,
                    "order": -1
                },
                {
                    "backgroundColor": "#2C8DFF",
                    "color": "white",
                    "index": -1,
                    "order": -1
                },
                {
                    "backgroundColor": "#00B19C",
                    "color": "white",
                    "index": -1,
                    "order": -1
                },
                {
                    "backgroundColor": "#FFF1D0",
                    "color": "black",
                    "index": -1,
                    "order": -1
                },
                {
                    "backgroundColor": "#DD1C1A",
                    "color": "white",
                    "index": -1,
                    "order": -1
                },
                {
                    "backgroundColor": "#643173",
                    "color": "white",
                    "index": -1,
                    "order": -1
                },
                {
                    "backgroundColor": "#D9BBF9",
                    "color": "black",
                    "index": -1,
                    "order": -1
                },
                {
                    "backgroundColor": "#CCA7A2",
                    "color": "black",
                    "index": -1,
                    "order": -1
                },
                {
                    "backgroundColor": "#AA9FB1",
                    "color": "black",
                    "index": -1,
                    "order": -1
                },
                {
                    "backgroundColor": "#320E3B",
                    "color": "white",
                    "index": -1,
                    "order": -1
                }
            ];

            this.initialize();

        }

        initialize() {

            setTimeout(this.timeout.bind(this), 3000);
            this.sideMenuButton.addEventListener("click", this.sideMenuButtonClickHandler.bind(this));
            this.datePickerButton.addEventListener("click", this.datePickerButtonClickHandler.bind(this));

            for (var i = 0; i < this.figureTables.length; i++) {

                this.figureTables[i].addEventListener("click", this.figureTablesClickHandler.bind(this));

            }

            this.channelsList.addEventListener("click", this.channelsListClickHandler.bind(this));


            /* Select three channels when loading the page for the first time */

            var children = this.channelsList.children;

            for (i = 0; i < this.defaultSelection; i++) {

                children[i].click();

            }

            window.addEventListener("click", this.windowClickHandler.bind(this));

        }

        channelsListClickHandler(event) {

            if ((event.target.tagName == "LI") && (!event.target.classList.contains(this.disabledClass))) {
                if (event.target.classList.contains(this.selectedClass)) {

                    event.target.removeAttribute("style");
                    event.target.classList.toggle(this.selectedClass);
                    this.selectedChannels -= 1;
                    
                    var targetIndex = (Array.from(event.currentTarget.children).indexOf(event.target)) + 1;

                    for (var i = 1; i <= this.selection.length; i++) {

                        if (this.selection[i].index == targetIndex) {

                            this.selection[i].index = -1;
                            this.selection[i].order = -1;
                            i = this.selection.length + 1;

                        }

                    }

                    var items = event.currentTarget.children;

                    for (var i = 0; i < items.length; i++) {

                        if (!items[i].classList.contains(this.selectedClass)) {

                            items[i].classList.remove(this.disabledClass);

                        }

                    }

                } else if (this.selectedChannels < (this.selection.length - 1)) {

                    event.target.classList.toggle(this.selectedClass);
                    this.selectedChannels += 1;

                    var targetIndex = (Array.from(event.currentTarget.children).indexOf(event.target)) + 1;

                    for (var i = 1; i <= this.selection.length; i++) {

                        if (this.selection[i].index == -1) {

                            event.target.style.backgroundColor = this.selection[i].backgroundColor;
                            event.target.style.color = this.selection[i].color;
                            this.selection[i].index = targetIndex;
                            this.selection[i].order = this.selectedChannels;
                            i = this.selection.length + 1;
                            
                        }

                    }

                    if (this.selectedChannels == (this.selection.length - 1)) {

                        var items = event.currentTarget.children;

                        for (var i = 0; i < items.length; i++) {

                            if (!items[i].classList.contains(this.selectedClass)) {

                                items[i].classList.add(this.disabledClass);

                            }

                        }

                    }

                }
            }
            

        }

        figureTablesClickHandler(event) {

            if ((event.target.classList.contains(this.tableHeadWrapperClass)) || (event.target.parentElement.classList.contains(this.tableHeadWrapperClass))) {

                var tableHeads = event.currentTarget.querySelectorAll("th div");
                var target = event.target.classList.contains(this.tableHeadWrapperClass) ? event.target : event.target.parentElement;

                if (target.classList.contains(this.activeClass)) {

                    target.classList.toggle(this.reverseClass);

                } else {

                    for (var i = 0; i < tableHeads.length; i++) {

                        tableHeads[i].classList.remove(this.activeClass);
                        tableHeads[i].classList.remove(this.reverseClass);

                    }

                    target.classList.add(this.activeClass);

                }

            }

        }

        timeout() {

            for (var i = 0; i < this.figure.length; i++) {

                this.figure[i].classList.add(this.timeoutClass);

            }

        }

        datePickerButtonClickHandler(event) {

            this.hideAllSubmenus();
            this.datePickerMenu.parentElement.classList.add(this.activeClass);
            this.datePickerMenu.classList.add(this.displayedClass);
            event.stopPropagation();

        }

        sideMenuButtonClickHandler(event) {

            this.hideAllSubmenus();
            this.sideMenu.parentElement.classList.add(this.activeClass);
            this.sideMenu.classList.add(this.displayedClass);
            event.stopPropagation();

        }

        windowClickHandler(event) {

            this.hideAllSubmenus();

        }

        hideAllSubmenus() {

            for (var i = 0; i < this.submenu.length; i++) {

                this.submenu[i].classList.remove(this.displayedClass);
                if (this.submenu[i].parentElement.classList.contains(this.activeClass)) this.submenu[i].parentElement.classList.remove(this.activeClass);

            }

        }

    }

    let general = new General();

});
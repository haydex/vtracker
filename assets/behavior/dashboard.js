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
            this.tableSortButtons = document.querySelectorAll("main#content div#dashboard section#visualizations figure.figure table.tableDiagram thead th button");
            this.sideMenuButton = document.querySelector("div#menu");
            this.sideMenu = document.querySelector("div#sideMenu");
            this.submenu = document.querySelectorAll(".submenu");
            this.timeoutClass = "timeout";
            this.displayedClass = "displayed";
            this.activeClass = "active";
            this.submenuClass = "submenu";
            this.reverseClass = "reverse";

            this.initialize();

        }

        initialize() {

            setTimeout(this.timeout.bind(this), 3000);
            this.sideMenuButton.addEventListener("click", this.sideMenuButtonClickHandler.bind(this));
            // this.datePickerButton.addEventListener("click", this.datePickerButtonClickHandler.bind(this));

            for(var i=0; i< this.tableSortButtons.length; i++) {

                this.tableSortButtons[i].addEventListener("click", this.tableSortButtonsClickHandler.bind(this));

            }

            window.addEventListener("click", this.windowClickHandler.bind(this));

        }

        tableSortButtonsClickHandler(event) {

            /* for (var i = 0; i < this.tableSortButtons.length; i++) {

                this.tableSortButtons[i].classList.contains(this.reverseClass).remove(this.reverseClass);

            } */

            if (event.currentTarget.classList.contains(this.activeClass)) {

                event.currentTarget.classList.toggle(this.reverseClass);

            } else {

                for (var i = 0; i < this.tableSortButtons.length; i++) {

                    this.tableSortButtons[i].classList.remove(this.activeClass);
                    this.tableSortButtons[i].classList.remove(this.reverseClass);

                }

                event.currentTarget.classList.add(this.activeClass);

            }

        }

        timeout() {

            for (var i = 0; i < this.figure.length; i++) {

                this.figure[i].classList.add(this.timeoutClass);

            }

        }

        // datePickerButtonClickHandler(event) {

        //     this.hideAllSubmenus();
        //     this.datePickerMenu.parentElement.classList.add(this.activeClass);
        //     this.datePickerMenu.classList.add(this.displayedClass);
        //     event.stopPropagation();

        // }

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
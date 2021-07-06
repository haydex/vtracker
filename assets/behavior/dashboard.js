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

            this.figure = document.querySelector("main#content div#dashboard section#visualizations figure#postingFrequencyDiagram");
            this.datePickerButton = document.querySelector("main#content div#dashboard section#navigation div#navigationWrapper button#datePickerButton");
            this.submenu = document.querySelectorAll(".submenu");
            this.timeoutClass = "timeout";
            this.selectedClass = "selected";
            this.submenuClass = "submenu"
            this.initialize();

        }

        initialize() {

            setTimeout(this.timeout.bind(this), 3000);
            this.datePickerButton.addEventListener("click", this.datePickerButtonClickHandler.bind(this));
            window.addEventListener("click", this.windowClickHandler.bind(this));

        }

        timeout() {

            this.figure.classList.add(this.timeoutClass);

        }

        datePickerButtonClickHandler(event) {

            this.hideAllSubmenus();
            event.currentTarget.classList.add(this.selectedClass);
            event.stopPropagation();

        }

        windowClickHandler(event) {

            this.hideAllSubmenus();

        }

        hideAllSubmenus() {

            for (var i = 0; i < this.submenu.length; i++) {

                this.submenu[i].parentElement.classList.remove(this.selectedClass);

            }

        }

    }

    let general = new General();

});
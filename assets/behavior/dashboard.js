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
            this.timeoutClass = "timeout";
            this.initialize();

        }

        initialize() {

            setTimeout(this.timeout.bind(this), 3000);

        }

        timeout() {

            this.figure.classList.add(this.timeoutClass);

        }

    }

    let general = new General();

});
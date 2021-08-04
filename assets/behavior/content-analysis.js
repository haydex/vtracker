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
            this.contentAnalysisDiagram = document.querySelector("main#content div#dashboard section#visualizations figure#contentAnalysisDiagram.figure");
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
            this.selectabelClass = "selectable";
            this.leadingFigures = [
                "assets/images/figures/language-content-analysis.svg",
                "assets/images/figures/category-content-analysis.svg",
                "assets/images/figures/opinion-content-analysis.svg",
                "assets/images/figures/keyword-content-analysis.svg",
                "assets/images/figures/emotions-content-analysis.svg"
            ];

            this.initialize();

        }

        initialize() {

            setTimeout(this.timeout.bind(this), 3000);
            this.sideMenuButton.addEventListener("click", this.sideMenuButtonClickHandler.bind(this));
            this.datePickerButton.addEventListener("click", this.datePickerButtonClickHandler.bind(this));

            this.contentAnalysisDiagram.addEventListener("click", this.contentAnalysisDiagramClickHandler.bind(this));

            this.contentAnalysisDiagram.querySelector(".component.selectable").click();

            for (var i = 0; i < this.figureTables.length; i++) {

                this.figureTables[i].addEventListener("click", this.figureTablesClickHandler.bind(this));

            }

            window.addEventListener("click", this.windowClickHandler.bind(this));

        }

        contentAnalysisDiagramClickHandler(event) {

            if ((event.target.classList.contains(this.selectabelClass)) || (event.target.parentElement.classList.contains(this.selectabelClass))) {
                
                var target = event.target.classList.contains(this.selectabelClass) ? event.target : event.target.parentElement;
                var selectedComponent = -1;

                if (!target.classList.contains(this.selectedClass)) {

                    switch (target.id) {
                        case "languageComponent" :  
                            selectedComponent = 0;
                            break;
                        case "categoryComponent":
                            selectedComponent = 1;
                            break;
                        case "opinionComponent":
                            selectedComponent = 2;
                            break;
                        case "keywordComponent":
                            selectedComponent = 3;
                            break;
                        case "emotionComponent":
                            selectedComponent = 4;
                            break;
                        default:
                            selectedComponent = -1;
                            break;
                    }

                    var leadingStatistics = event.currentTarget.querySelectorAll(".component.selectable");

                    for (var i=0; i < leadingStatistics.length; i++) {

                        leadingStatistics[i].classList.remove(this.selectedClass);

                    }

                    

                    target.classList.add(this.selectedClass);
                    event.currentTarget.querySelector("img").src = this.leadingFigures[selectedComponent];

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
window.onload = function(){

    // hide information div when the age laods since it is empty
    document.getElementById("information").style.display = "none";

    // get elements that are needed and save them into new variables
    var buttonGo = document.getElementById("go");
    var inputtedCountry = document.getElementById("input");
    var displayCountry = document.getElementById("country");
    var displayCases = document.getElementById("cases");
    var warning = document.getElementById("warningmessage");
    var countryCode = document.getElementById("countrycode");

    // Add event listener to the Go-button
    buttonGo.addEventListener("click", function() {

        // Save the inputted string into a variable
        var wantedCountry = inputtedCountry.value ;
        warning.innerHTML = "";
        inputtedCountry.value = "";

        // now get the date of the user
        // year-month-date
        var datum = new Date();
        var date = datum.getDate();
        var month = datum.getMonth();
        var year = datum.getFullYear();

        // Check if searchbar is empty
        if(wantedCountry === "" || wantedCountry === " "){
            warning.innerHTML = "Invalid input, try typing a country";
        }else{
            // TODO - input validation, does the wanted country exists
            displayCountry.innerHTML = wantedCountry;
            var xmlhttp = new XMLHttpRequest();

            // need to input the date in this form year-month-date
            xmlhttp.open("GET", "https://api.covid19api.com/total/country/" + wantedCountry.toLowerCase() + "/status/confirmed?from=2020-03-01T00:00:00Z&to="+ year + "-" + month + "-" + date + "T00:00:00Z", true);
            xmlhttp.send();

            var i;

            xmlhttp.onreadystatechange=function() {
                if(xmlhttp.readyState==4 && xmlhttp.status==200){
                    // save gotten data into variable
                    var data = xmlhttp.responseText;
                    // parse the data
                    var parsedData = JSON.parse(data) ;

                    // get the cases - number from the last array and display it to the right place
                    var caseAmount = parsedData[parsedData.length -1].Cases
                    displayCases.innerHTML = "Cases: " + caseAmount;

                }
            }
            // change information div to "block" to make it visible
            // at this point the is going to be text in the div
             document.getElementById("information").style.display = "block";
        }
    });
}
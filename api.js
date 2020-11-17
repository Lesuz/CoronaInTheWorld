window.onload = function(){

    // get elements that are needed and save them into new variables
    var buttonGo = document.getElementById("go");
    var inputtedCountry = document.getElementById("input");
    var displayCountry = document.getElementById("country");
    var displayCases = document.getElementById("cases");
    var warning = document.getElementById("warningmessage");

    // Add event listener to the Go-button
    buttonGo.addEventListener("click", function() {
        // Save the inputted string into a variable
        var wantedCountry = inputtedCountry.value ;
        console.log(wantedCountry);
        warning.innerHTML = "";
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
                    console.log(parsedData[parsedData.length -1].Cases);
                    var caseAmount = parsedData[parsedData.length -1].Cases
                    displayCases.innerHTML = "Cases: " + caseAmount;
                }
            }
        }
        //displayCountry.innerHTML = wantedCountry;
    });
}
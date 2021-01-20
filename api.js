window.onload = function(){

    
    // get elements that are needed and save them into new variables
    var buttonGo = document.getElementById("go");
    var inputtedCountry = document.getElementById("input");
    var displayCountry = document.getElementById("country");
    var displayCases = document.getElementById("cases");
    var warning = document.getElementById("warningmessage");
    var countryCode = document.getElementById("countrycode");
    var casesinmonth = document.getElementById("casesbymonth");

    // hide information div when the page loads since it is empty
    document.getElementById("information").style.display = "none";
    // hide cases by montth when the page laods because it is empty
    casesinmonth.style.display = "none";

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
        // getMonth() starts from 0 so have to add 1
        var month = datum.getMonth() + 1;
        var year = datum.getFullYear();

        // Check if searchbar is empty
        if(wantedCountry === "" || wantedCountry === " "){
            warning.innerHTML = "Invalid input, try typing a country";
            document.getElementById("information").style.display = "none";
        }else{
            // TODO - input validation, does the wanted country exists
            displayCountry.innerHTML = wantedCountry;
            var xmlhttp = new XMLHttpRequest();

            // need to input the date in this form year-month-date
            xmlhttp.open("GET", "https://api.covid19api.com/total/country/" + wantedCountry.toLowerCase() + "/status/confirmed?from=2020-01-01T00:00:00Z&to="+ year + "-" + month + "-" + date + "T00:00:00Z", true);
            xmlhttp.send();

            xmlhttp.onreadystatechange=function() {
                if(xmlhttp.readyState==4 && xmlhttp.status==200){
                    // save gotten data into variable
                    var data = xmlhttp.responseText;
                    // parse the data
                    var parsedData = JSON.parse(data) ;

                    console.log(parsedData);

                    // get the cases - number from the last array and display it to the right place
                    var caseAmount = parsedData[parsedData.length -1].Cases
                    displayCases.innerHTML = "Cases in total: " + caseAmount ;

                    // look for the information for every month
                    // saving the length of the table into variable - one day = one index
                    var tablelength = parsedData.length;

                    for ( var i = 0; i < tablelength; i++){
                        // date is a string in the array, and I want to use the month to get every months cases
                        // so I use substring() to get the indexes of 5 and 6

                        // january - takes the last index where month is still 01
                        if (parsedData[i].Date.substring(0 ,7) === "2020-01" ){

                            var jancases = parsedData[i].Cases ;
                            document.getElementById("casesinjan").innerHTML = jancases;
                        }
                        // february - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(0 ,7) === "2020-02"){

                            var febcases = parsedData[i].Cases ;
                            document.getElementById("casesinfeb").innerHTML = febcases - jancases;
                        }
                        // march - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(0 ,7) === "2020-03"){

                            var marchcases = parsedData[i].Cases;
                            document.getElementById("casesinmar").innerHTML = marchcases - febcases;
                        }
                        // april - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(0 ,7) === "2020-04"){

                            var aprilcases = parsedData[i].Cases;
                            document.getElementById("casesinapril").innerHTML = aprilcases - marchcases;
                        }
                        // may - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(0 ,7) === "2020-05"){

                            var maycases = parsedData[i].Cases;
                            document.getElementById("casesinmay").innerHTML = maycases - aprilcases ;
                        }
                        // june - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(0 ,7) === "2020-06"){

                            var junecases = parsedData[i].Cases;
                            document.getElementById("casesinjun").innerHTML = junecases - maycases;
                        }
                        // july - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(0 ,7) === "2020-07"){

                            var julycases = parsedData[i].Cases;
                            document.getElementById("casesinjul").innerHTML = julycases - junecases;
                        }
                        // august - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(0 ,7) === "2020-08"){

                            var augustcases = parsedData[i].Cases;
                            document.getElementById("casesinaug").innerHTML = augustcases - julycases;
                        }
                        // september - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(0 ,7) === "2020-09"){

                            var septembercases = parsedData[i].Cases;
                            document.getElementById("casesinsep").innerHTML = septembercases - augustcases;
                        }
                        // october - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(0 ,7) === "2020-10"){

                            var octobercases = parsedData[i].Cases;
                            document.getElementById("casesinoct").innerHTML = octobercases - septembercases;
                        }
                        // november - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(0 ,7) === "2020-11"){

                            var novembercases = parsedData[i].Cases;
                            document.getElementById("casesinnov").innerHTML = novembercases - octobercases;
                        }
                        // december - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(0 ,7) === "2020-12"){

                            var decembercases = parsedData[i].Cases;
                            document.getElementById("casesindec").innerHTML = decembercases - novembercases;
                        }


                    }
                    



                }
            }
            // change to "block" to make visible
            // at this point the is going to be text in the div
             document.getElementById("information").style.display = "block";
             casesinmonth.style.display = "block";
        }
    });
}
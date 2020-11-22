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

                    // get the cases - number from the last array and display it to the right place
                    var caseAmount = parsedData[parsedData.length -1].Cases
                   
                    displayCases.innerHTML = "Cases: " + caseAmount;

                    // Covid Api begins from the 1st or march so it is week 0
                    // look for the information for every month
                    // saving the length of the table into variable - one day = one index
                    var tablelength = parsedData.length
                    console.group(tablelength);

                    // TODO - Figure out why it shows the cases one month off
                    for ( var i = 0; i < tablelength; i++){
                        // january
                        if (parsedData[i].Date.substring(5 ,7) == "02"){

                            var jancases = parsedData[i - 1].Cases
                            document.getElementById("casesinjan").innerHTML = jancases;
                        }
                        // february
                        if (parsedData[i].Date.substring(5 ,7) == "03"){

                            var febcases = parsedData[i - 1].Cases
                            document.getElementById("casesinfeb").innerHTML = febcases - jancases;
                        }
                        // march
                        if (parsedData[i].Date.substring(5 ,7) == "04"){

                            var marchcases = parsedData[i - 1].Cases
                            document.getElementById("casesinmar").innerHTML = marchcases - febcases;
                        }
                        // april
                        if (parsedData[i].Date.substring(5 ,7) == "05"){

                            var aprilcases = parsedData[i - 1].Cases
                            document.getElementById("casesinapril").innerHTML = aprilcases - marchcases;
                        }
                        // may
                        if (parsedData[i].Date.substring(5 ,7) == "06"){
                            var maycases = parsedData[i - 1].Cases
                            document.getElementById("casesinmay").innerHTML = maycases - aprilcases ;
                        }
                        // june
                        if (parsedData[i].Date.substring(5 ,7) == "07"){

                            var junecases = parsedData[i - 1].Cases
                            document.getElementById("casesinjun").innerHTML = junecases - maycases;
                        }
                        // july
                        if (parsedData[i].Date.substring(5 ,7) == "08"){

                            var julycases = parsedData[i - 1].Cases
                            document.getElementById("casesinjul").innerHTML = julycases - junecases;
                        }
                        // august
                        if (parsedData[i].Date.substring(5 ,7) == "09"){

                            var augustcases = parsedData[i - 1].Cases
                            document.getElementById("casesinaug").innerHTML = augustcases - julycases;
                        }
                        // september
                        if (parsedData[i].Date.substring(5 ,7) == "10"){

                            var septembercases = parsedData[i - 1].Cases
                            document.getElementById("casesinsep").innerHTML = septembercases - augustcases;
                        }
                        // october
                        if (parsedData[i].Date.substring(5 ,7) == "11"){

                            var octobercases = parsedData[i - 1].Cases
                            document.getElementById("casesinoct").innerHTML = octobercases - septembercases;
                        }
                        // november
                        if (parsedData[i].Date.substring(5 ,7) == "12"){

                            var novembercases = parsedData[i - 1].Cases
                            document.getElementById("casesinnov").innerHTML = novembercases - octobercases;
                        }
                        // december
                        if (parsedData[i].Date.substring(5 ,7) == "01" && parsedData[i].Date.substring(0 ,5) == "2021"){

                            var decembercases = parsedData[i - 1].Cases
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
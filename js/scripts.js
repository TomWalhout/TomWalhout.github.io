/* Nav Script */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
}

// auto colors the table based on if I failed or passed a test
//This is a global variable because I couldn't figure out how else to do it. Sorry.
var skip = 0;

function checkPass() {
    // Get scores
    var scores = document.getElementsByClassName("mark");
    // Get ECs
    var ECs = document.getElementsByClassName("ECs");
    var totalECs = 0;
    var i = 0;
    // For every score, change the bgc to green or red. Say "tbd" if I don't have a mark yet
    for (i; i < scores.length; i++) {
        if (scores[i].innerHTML == "") {
            scores[i].innerHTML = "tbd";
        } else if (scores[i].innerHTML >= 5.5) {
            scores[i].style.backgroundColor = "green";
        } else {
            scores[i].style.backgroundColor = "red";
        }
    }
    //Had written this next block already and don't wanna change to some other var so i=0 works fine :)
    i = 0;
    // If I passed the course, my total ECs should display so
    for (i; i < scores.length; i++) {
        if (checkWeight(scores, i) === true) {
            totalECs = totalECs + parseFloat(ECs[i].innerHTML);
        }
        //This avoids double calculation and errors due to the way checkWeight works
        i += skip;
        skip = 0;
    };
    // Display the information in the header
    // Also calc the % I have toward completing 45 ECs and thus not getting a NBSA
    // Also update the progressBar
    var progress = Math.round(totalECs / 45 * 100);
    document.getElementById('totalECsHeader').innerHTML = "Total ECs: " + totalECs + "<br>That's " + progress + "% of BSA";
    document.getElementById('progressbar').value = progress;
}

function checkWeight(scores, i) {
    // Get all weights
    var weights = document.getElementsByClassName("weight");
    // Get them the one we care about and remove the "%";
    var weight = weights[i].innerHTML.substring(0, weights[i].innerHTML.length - 1);

    // We need to check the next of the weights until it does make 100. This variable stores how much we have up til now. 
    var subweights = [weight];
    var totalWeights = 0;
    // A var that holds the average while it's being calculated.
    var average = 0;
    // As long as we don't have all necessary weights yet, totalWeights will not be 100 (or 99 in case of 33%*3)
    // So, totalWeights is increased by the weight we're checking now
    totalWeights += parseFloat(weight);
    // If the total weight is 99 or 100, great, work is done, calc the average. Else, we need to find the rest
    while (totalWeights < 99) {
        //Find the next weight and push it into the array
        var nextWeight = weights[i + 1].innerHTML.substring(0, weights[i + 1].innerHTML.length - 1);
        subweights.push(nextWeight);
        // Add the newly found weight to totalweight
        totalWeights += parseFloat(nextWeight);
        // Make sure we remeber we already used this weight and therefore should skip this mark on our next iteration of checkPass()
        skip += 1;
    }

    // Take the weighted average of all the weights in the array
    for (var j = 0; j < subweights.length; j++) {
        average += parseFloat(scores[j + i].innerHTML * subweights[j] / 100);
    }

    // If I passed the average is 5.5 or higher. If it's not, I failed :(
    if (average >= 5.5) {
        return true;
    } else { return false; }

}
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
function checkPass() {
    // Get scores
    var scores = document.getElementsByClassName("mark");
    var ECs = document.getElementsByClassName("ECs");
    var totalECs = 0;
    var i = 0;
    // For every score, change the bgc to green or red. Say "tbd" if I don't have a mark yet
    for (i; i < scores.length; i++) {
        if (scores[i].innerHTML == "") {
            scores[i].innerHTML = "tbd";
        } else if (scores[i].innerHTML >= 5.5) {
            scores[i].style.backgroundColor = "green";
            //Also add the ECs to my total EC score
            totalECs = totalECs + parseFloat(ECs[i].innerHTML);
        } else {
            scores[i].style.backgroundColor = "red";
        }
    }

    //TODO: add weight check so total ecs actually works :)
    document.getElementById('totalECsHeader').innerHTML = "Total ECs: " + totalECs + "<br>That's " + Math.round(totalECs / 45 * 100) + "% of BSA";

}
<!DOCTYPE html>
<html lang="">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../style.css">
    <title>p5.js Snake</title>
    <style>
        body {
            padding: 0;
            margin: 0;
        }
        canvas {
            margin: 20px;
        }
    </style>
    <script src="../p5.js"></script>
    <script src="sketch.js"></script>
    <script src="snake.js"></script>
    <script src="fruit.js"></script>
    <link rel="text" href="highscores.txt" />
    
</head>

<body>
<div class="subsec right">
    <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
        <input type="text" placeholder="enter your name you dimwit" id="name" name="name">
        <input type="hidden" id="score" name="score"> 
        <input type="submit" value="Submit">
    </form>
    <p id="highscorenow"></p>
    <p id="scorenow"></p>
    <p>Highscores:</p>
    <?php 
            //do nothing without a name and a score
            if (!empty($_POST["name"]) && !empty($_POST["score"])) {
                $name = $_POST["name"];
                $score = $_POST["score"];
                testScores($score, $name);
            }
        //shows the highscores
        function readHighscores() {
            //opens file containing highscores, the "a+" means for reading and writing, don't erase contents
            $file = fopen("highscores.txt", "a+");
            //while not the end of the file    
            while(!feof($file)) {
                //echo one line
                echo fgets($file) . "<br>";
            }
            //close the file
            fclose($file);
        }
        //call the function :)
        readHighscores();

        function testScores($score, $name) {
            //the fun bit
            switch ($name) {
                //I am awesome
                case "Tom":
                    $score *= 2;
                    break;
                case "Christian":
                case "Chris":
                    $name = "Tortel";
                    break;
                case "Marlena":
                    $name = "Duif";
                    break;
                default:
                    break;
            }

            //Create an array
            $array = array();
            //open the file for reading
            $file = fopen("highscores.txt", "r");
            //manual for-loop I guess ///////DONT CHANGE, IT WORKS
            $i = 0;
            //same loop as before but save it in array
            while(!feof($file)) {
                $array[$i] = fgets($file);
                $i++;
            }
            //close the file
            fclose($file);
            //loop through list
            for($i = 0; $i < count($array); $i++) {
                //extract the score from the "PLAYER: SCORE" format
                $scorefromfile = substr($array[$i], strpos($array[$i], ": ") + 2, 10);
                //if score is higher than current score, this is the right place
                if ((int)$scorefromfile < $score) {
                    //Create new line in the right format
                    $txt = $name . ": " . $score . "\n";
                    //Splice this new line into the array at the right place
                    array_splice($array, $i, 0, $txt);
                    //pop the last element so we keep the 10 best scores
                    array_pop($array);
                    //okay real talk, I have 0 idea why I need to do this twice but it was buggy and this fixed so whatever
                    array_pop($array);
                    //exit the loop by increasing i
                    $i = 12;
                } 
            }
            //open file for writing/reading in override mode
            $file = fopen("highscores.txt", "w+");
            //for every line of the array 
            for($i = 0; $i < count($array); $i++) {
                //write the line in the file 
                fwrite($file, $array[$i]);
            }
        }
        
    ?>
    <p id="list"></p>
</div>
</body>

</html>
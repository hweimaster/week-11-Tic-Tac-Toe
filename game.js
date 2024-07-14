
const squares = document.querySelectorAll('.square'); //returns all the squares 
const secondMessage = document.querySelector("#secondMessage");//returns the first element matching the selector
const resetButton = document.querySelector("#resetButton")  
const winMessage = document.querySelector("#winMessage");//returns the first element matching the selector



const winning_combos = [ //lets the game know what the winning combos are 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let choices = ["","","","","","","","",""]; //makes each cell empty 
let currentPlayer = "X"; //game starts on x
let runningGame = false; //creates a boolean to stop the game when it's over 


start(); //makes the game start running

function start(){ 
    squares.forEach(square => square.addEventListener("click", clickSquare)); //add the event listener to each square
    resetButton.addEventListener("click", reset); //functions when clicked but also listens to the reset function
    secondMessage.textContent = `${currentPlayer}'s Turn`;
    runningGame = true;
}

function clickSquare(){
    const squareIndex = this.getAttribute("squareIndex");//gives the assigned attribute to the clicked on square

    if(choices[squareIndex] != "" || !runningGame){ //will see if game is still rinnign and if the squares are not empty
        return;
    }
    squareUpdate(this, squareIndex); // lets you conitnue to choose squares
    checkWinner(); //checks to see if any have won 
}

function squareUpdate(square, index){ 
    choices[index] = currentPlayer;
    square.textContent = currentPlayer; //takes the current players letter to use in square
}

function turn(){
     currentPlayer = (currentPlayer == "X") ? "O" : "X"; //changes the turn from x to o
     secondMessage.textContent = `${currentPlayer}'s Turn`; 
}


function checkWinner(){//checks the array to see if the winning combo matches whats on the game board
    let won = false;
    
    for (let i = 0; i < winning_combos.length; i++){ //loop checks the boxes
        let [a,b,c,] = winning_combos[i]
        if(squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer){
            won = true;
        }
    }
    if (won){//stops the game and declares winner 
        winMessage.textContent = `${currentPlayer} wins!`
        runningGame = false; 
    }
    else if(!choices.includes("")){ //if all cells are taken and none are a winner stops game 
        winMessage.textContent = 'Draw';
        runningGame = false;
    }
    else{
        turn();
    }
}

function reset(){
    currentPlayer = "X";
    choices = ["","","","","","","","",""];
    secondMessage.textContent = `${currentPlayer}'s Turn`; //resets the begiiners turn 
    squares.forEach(square => square.textContent = ""); //clears the square content
    runningGame = true; //resests the game to start running again 
    winMessage.textContent = ""; //clears the alert
}

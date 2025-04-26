//selectors
const cells = document.querySelectorAll(".cell")
const turn = document.querySelector("#turn")
const resetBtn = document.querySelector("#resetBtn")

//logic
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];  

let options = ["","","","","","","","","",];
let currentPlayer = "X";
let running = false;

initializeGame();

//functions

function initializeGame(){

    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    resetBtn.addEventListener("click", resetGame);
    turn.textContent = `${currentPlayer}'s turn`;
    running = true;

}

function cellClicked(){

    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();

}

function updateCell(cell,index){

    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    console.log(`Cell ${index} updated to ${currentPlayer}`);
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    turn.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        turn.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        turn.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function resetGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    turn.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
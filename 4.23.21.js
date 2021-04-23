//represents ticTacToe grid
let squaresClicked = []

//location of grid lines
let posOfLines = []

//tracks who's turn it is
let playerTurn = true

//gameState is practically binary, but I'm using strings to clarify the meaning of the states, and allow for potential additional states
let gameState = "running"

//length of a side of the grid
let gridSize = 3

let lockCount = 0




function setup() {
  createCanvas(400, 400);
  getLinePos()
  initArray()
  noFill()
  strokeWeight(10)
  //frameRate(1)
}

function draw() {
  if (lockCount < 1) {
    if(gameState == "running") {
      background(160);
      drawGrid()
      if(!playerTurn) {
        playMove()
      }
      if(playerTurn) {
        playMove()
      }

      drawMoves()
      if(checkWon() == "x") {
        console.log("X won!")
        //gameState = "stopped"
        reset()
      }
      if(checkWon() == "o") {
        console.log("O won!")
        //gameState = "stopped"
        reset()
      }
      if(checkWon() == "?") {
        console.log("Calef fucked something up lol")
        //gameState = "stopped"
        reset()
      }
    }
  } else {
    lockCount--
  }
}

function checkWon() {

  let won = false
  
  //check for horizontal wins
  for(let i = 0; i < gridSize; i++) {
    if(checkForStreak(squaresClicked[i]) == gridSize) {
      won = whoWon(squaresClicked[i])
    }
  }
  
  //check for vertical wins
  for(let x = 0; x < gridSize; x++) {
    let temp = []
    for(let y = 0; y < gridSize; y++) {
      temp.push(squaresClicked[y][x])
    }
    if(checkForStreak(temp) == gridSize) {
      won = whoWon(temp)
    }
  }
  
  //check for diagonal wins
  for(let t = 0; t < 2; t++) {
    let temp = []
    for(let i = 0; i < gridSize; i++) {
      if(t == 0) {
        temp.push(squaresClicked[i][i])
      }
      if(t == 1) {
        temp.push(squaresClicked[i][gridSize-1-i])
      }
    }
    if(checkForStreak(temp) == gridSize) {
      won = whoWon(temp)
    }
  }

  return won
}

function whoWon(lst) {
  if(lst[0] == "x") {
    return "x"
  }  else if(lst[0] == "o") {
    return "o"
  }  else {
    return "?"
  }
}

function checkForStreak(lst) {

  let streakLen = 0
  let currentLen = 0
  for(let i = 0; i < lst.length; i++) {
    
    
    if(lst[i] == lst[0] && lst[0] != false) {
      streakLen++
    }
  }
  
  return streakLen
  
}

function playMove() {
  
  let madeMove = false

  while(madeMove == false && emptySquares() > 0) {
  
    let j = int(random(0, gridSize))
    let i = int(random(0, gridSize))
    if(playerTurn == false) {
      if(move(j, i, "o")) {
        madeMove = true
      }
    }
    if(playerTurn == true) {
      if(move(j, i, "x")) {
        madeMove = true
      }
    }    
  }
  
  if(madeMove == false) {
    console.log("Draw!")
    reset()
  }
  
  if(playerTurn == false) {
    playerTurn = true
  } else {
    playerTurn = false 
  }
}
  
function move(y, x, player) {
  if(squaresClicked[y][x] == false){
    if(player == "o") {
      squaresClicked[y][x] = "o"
      return true
    }
    if(player == "x") {
      squaresClicked[y][x] = "x"
      return true
    }  
  }
  return false
}

function emptySquares() {
  let count = 0
  for(let i = 0; i < gridSize; i++) {
    for(let j = 0; j < gridSize; j++) {
      if(squaresClicked[j][i] == false) {
        count++
      }
    } 
  }
  return count
  
}

function mouseClicked() {
  if(playerTurn){
    let xPos
    let yPos
    let xFound = false
    let yFound = false
    for(let i = 0; i < gridSize; i++) {
      if(xFound == false && mouseX < posOfLines[i+1]) {
          xPos = i
          xFound = true
      }
      if(yFound == false && mouseY < posOfLines[i+1]) {
        yPos = i
        yFound = true
      }
    }
    if(squaresClicked[yPos][xPos] == false) {
      squaresClicked[yPos][xPos] = "x"
      playerTurn = false
    }
    lockCount = frameRate
  }
}

function getLinePos() {
  
  //get locations of all lines for use in calculations
  for(let i = 0; i <= gridSize; i++) {
    let temp = width*i/gridSize
    posOfLines.push(temp)
  }

}

function initArray() {
  //init squaresClicked array to all false
  for(let i = 0; i < gridSize; i++) {
    let filler = []
    squaresClicked.push(filler)
    for(let j = 0; j < gridSize; j++) {
      filler.push(false)
    }
  }
}

function reset() {
  for(let i = 0; i < gridSize; i++) {
    for(let j = 0; j < gridSize; j++) {
      squaresClicked[j][i] = false
    }
  }
  playerTurn = true
}

function drawGrid() {
  for(let i = 1; i < gridSize; i++) {
    let XorY = (width*i)/gridSize
    line(XorY, 0, XorY, width)
    line(0, XorY, width, XorY)
    posOfLines.push(XorY)
  }
}

function drawMoves() {
  for(let y = 0; y < gridSize; y++) {
    for(let x = 0; x < gridSize; x++) {
      if(squaresClicked[y][x] == "x") {
        line(posOfLines[x+1]-(100/gridSize), posOfLines[y+1]-(100/gridSize), posOfLines[x]+(100/gridSize), posOfLines[y]+(100/gridSize))
        
        line(posOfLines[x+1]-(100/gridSize), posOfLines[y]+(100/gridSize), posOfLines[x]+(100/gridSize), posOfLines[y+1]-100/gridSize)
        
      }
      else if(squaresClicked[y][x] == "o") {
        circle(posOfLines[x+1] - posOfLines[1]/2, posOfLines[y+1] - posOfLines[1]/2, posOfLines[1]/2)
      }
    }
  }
}

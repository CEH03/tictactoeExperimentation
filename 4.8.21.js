//represents ticTacToe grid
let squaresClicked = []

//location of grid lines
let posOfLines = []

//tracks who's turn it is
let playerTurn = true

let lockCount = 0
let gameState = "running"

//length of a side of the grid
let gridSize = 3


function setup() {
  createCanvas(400, 400);
  getLinePos()
  noFill()
}


function draw() {
    if(gameState == "running") {
    lockCount--
    if(lockCount == 0) {
      playerTurn = true
    }
    background(160);
    drawGrid()
    if(!playerTurn) {
      playMove()
    }
    drawMoves()
    if(checkWon() == true) {
      console.log("GG WP")
      gameState = "stopped"
    }
  }
}



function checkWon() {

  let won = false
  for(let i = 0; i < gridSize; i++) {
    console.log(checkForStreak(squaresClicked[i], gridSize))
    if(checkForStreak(squaresClicked[i], gridSize) == gridSize) {
      won = true
    }
  }
    
  return won
}

function checkForStreak(list, length) {
  
  for(let i = 0; i < list.length; i++) {
    
    let streakLen = 0
    if(list[i] == list[0] && list[0] != false) {
      streakLen++
    }
    
    return streakLen
  }
  
}

function playMove() {
  let madeMove = false
  for(let i = 0; i < gridSize; i++) {
    for(let j = 0; j < gridSize; j++) {
      if(squaresClicked[j][i] == false && madeMove == false) {
        squaresClicked[j][i] = "o"
        madeMove = true
      }
    }
  }
  playerTurn = true
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
  //init squaresClicked array to all false
  
  
  for(let i = 0; i < gridSize; i++) {
    let filler = []
    squaresClicked.push(filler)
    for(let j = 0; j < gridSize; j++) {
      filler.push(false)
    }
  }
  
  //get locations of all lines
  for(let i = 0; i <= gridSize; i++) {
    let temp = width*i/gridSize
    posOfLines.push(temp)
  }
  
  
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

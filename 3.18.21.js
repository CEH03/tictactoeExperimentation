let squaresClicked = []
let posOfLines = []
let playerTurn = true

//length of a side of the grid
let gridSize = 5


function setup() {
  createCanvas(400, 400);
  getLinePos()
}


function draw() {
  background(160);
  drawGrid()
  drawMoves()
}
function mouseClicked() {
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
  
  if(squaresClicked[yPos][xPos] == true) {
    squaresClicked[yPos][xPos] = false
  }
  else if(squaresClicked[yPos][xPos] == false) {
    squaresClicked[yPos][xPos] = true
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
      if(squaresClicked[y][x] == true) {
        line(posOfLines[x+1]-(100/gridSize), posOfLines[y+1]-(100/gridSize), posOfLines[x]+(100/gridSize), posOfLines[y]+(100/gridSize))
        
        line(posOfLines[x+1]-(100/gridSize), posOfLines[y]+(100/gridSize), posOfLines[x]+(100/gridSize), posOfLines[y+1]-100/gridSize)
        
      }
    }
  }
}

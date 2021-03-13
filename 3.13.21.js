let squaresClicked = []
let posOfLines = []

//length of a side of the grid
let gridSize = 5


function setup() {
  createCanvas(400, 400);
  getLinePos()
  console.table(squaresClicked)
}


function draw() {
  background(220);
  drawGrid()
  drawMoves()
}
function mouseClicked() {
  let xPos
  let yPos
  let xFound = false
  let yFound = false
  for(let i = 0; i < gridSize; i++) {
    if(xFound == false && mouseX < posOfLines[i]) {
        xPos = i
        xFound = true
      }
      if(yFound == false && mouseY < posOfLines[i]) {
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
  
  console.table(squaresClicked)
  console.log(xPos + " " + yPos)
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
  for(let i = 1; i <= gridSize; i++) {
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
        ellipse(posOfLines[x]-(0.5*posOfLines[0]), posOfLines[y]-(0.5*posOfLines[0]), 10)
      }
    }
  }
}

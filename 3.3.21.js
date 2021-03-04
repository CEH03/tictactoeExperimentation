let squaresClicked = []
let posOfLines = []

//length of a side of the grid
let gridSize = 5


function setup() {
  createCanvas(400, 400);
  getLinePos()
}


function draw() {
  background(220);
  drawGrid()
  //checkIfClicked()
  
  /*
  if(squaresClicked[0] == 0) {
    line(10, 10, width/gridSize-10, width/gridSize-10)
    line(width/gridSize-10, 10, 10, width/gridSize-10)
  }
  if(squaresClicked[0] == 1) {
    ellipse(width/6, width/6, width/6-20)
  }
  */
}
function mouseClicked() {
  let xPos
  let yPos
  let found = false
  console.table(posOfLines)
  for(let i = 0; i < posOfLines; i++) {
    for(let j = 0; j < posOfLines; j++) {
      if(found == false) {
        
        if(mouseX < posOfLines[i]) {
          xPos = i
          console.log("I set the xPos!")
        }
        if(mouseY < posOfLines[j]) {
          yPos = j
          console.log("I set the yPos!")
        }
      }
    }
  }
  squaresClicked[xPos][yPos] = true
  console.table(squaresClicked)
}
function getLinePos() {
  //init squaresClicked array to all false
  let filler = []
  for(let j = 0; j < gridSize; j++) {
    filler.push(false)
  }
  for(let i = 0; i < squaresClicked; i++) {
    squaresClicked.push(filler)
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
function checkIfClicked() {
  for(let i = 0; i < squaresClickedX.length; i++) {
    for(let j = 0; j < squaresClickedY.length; i++) {
      if(squaresClickedX[i][j] == true) {
        console.log("hi")
      }
    }
  }
}

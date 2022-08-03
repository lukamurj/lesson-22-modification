let myArr = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  divOfBlocks = "",
  mySection = document.querySelector("section"),
  myBtn = document.createElement("button"),
  myTable = document.createElement("table");

for (let i = 0; i < myArr.length; i++) {
  divOfBlocks += `
     <tr>
     <td></td>
     <td></td>
     <td></td>
     <td></td>
     <td></td>
     </tr>`;
}

myBtn.innerHTML = "START";

let div = document.createElement("div");
div.innerHTML = "GAME OVER";
mySection.appendChild(div);
div.classList.toggle("hidden");

myTable.innerHTML = divOfBlocks;
mySection.appendChild(myTable);
mySection.appendChild(myBtn);
const myArrCount = myArr.reduce(
  (currentCount, row) => currentCount + row.length,
  0
);

let myBlocks = document.getElementsByTagName("td"),
  greenBlocks = 0;

function randomNumGen() {
  for (let i = 0; i < 5; i++) {
    let randomNum = Math.floor(Math.random() * myArrCount);
    if (randomNum < 5) {
      if (myArr[0][randomNum] !== 1) {
        myArr[0][randomNum] = 1;
      } else {
        i--;
      }
    } else if (randomNum >= 5 && randomNum < 10) {
      randomNum -= 5;
      if (myArr[1][randomNum] !== 1) {
        myArr[1][randomNum] = 1;
      } else {
        i--;
      }
    } else if (randomNum >= 10 && randomNum < 15) {
      randomNum -= 10;
      if (myArr[2][randomNum] !== 1) {
        myArr[2][randomNum] = 1;
      } else {
        i--;
      }
    } else if (randomNum >= 15 && randomNum < 20) {
      randomNum -= 15;
      if (myArr[3][randomNum] !== 1) {
        myArr[3][randomNum] = 1;
      } else {
        i--;
      }
    } else {
      randomNum -= 20;
      if (myArr[4][randomNum] !== 1) {
        myArr[4][randomNum] = 1;
      } else {
        i--;
      }
    }
  }
  yellowBlocks();
  console.log("event happened");
  myBtn.removeEventListener("click", randomNumGen);
}

myBtn.addEventListener("click", randomNumGen);

function yellowBlocks() {
  let myNum = 0;
  for (let i = 0; i < myArr.length; i++) {
    for (let a = 0; a < myArr[i].length; a++) {
      if (myArr[i][a] === 1) {
        myBlocks[myNum].style.backgroundColor = "yellow";
      }
      myNum++;
    }
  }
  myNum = 0;
  setTimeout(() => {
    for (let i = 0; i < myArr.length; i++) {
      for (let a = 0; a < myArr[i].length; a++) {
        if (myArr[i][a] === 1) {
          myBlocks[myNum].style.backgroundColor = "white";
        }
        myNum++;
      }
    }
    addEventListenersToBlocks();
  }, "50");
}

function addEventListenersToBlocks() {
  for (let i = 0; i < myBlocks.length; i++) {
    myBlocks[i].addEventListener("click", messengerFunciton);
  }
}

function messengerFunciton() {
  rightOrWrongBlock(this);
}

function rightOrWrongBlock(block) {
  let i = 0;
  for (let a = 0; a < myBlocks.length; a++) {
    if (block === myBlocks[a]) {
      i = a;
    }
  }

  if (i < 5) {
    if (myArr[0][i] === 1) {
      block.style.backgroundColor = "green";
      greenBlocks++;
      myBlocks[i].removeEventListener("click", messengerFunciton);
    } else {
      block.style.backgroundColor = "red";
      userLost();
    }
  } else if (i >= 5 && i < 10) {
    i -= 5;
    if (myArr[1][i] === 1) {
      block.style.backgroundColor = "green";
      greenBlocks++;
      myBlocks[5 + i].removeEventListener("click", messengerFunciton);
    } else {
      block.style.backgroundColor = "red";
      userLost();
    }
  } else if (i >= 10 && i < 15) {
    i -= 10;
    if (myArr[2][i] === 1) {
      block.style.backgroundColor = "green";
      greenBlocks++;
      myBlocks[10 + i].removeEventListener("click", messengerFunciton);
    } else {
      block.style.backgroundColor = "red";
      userLost();
    }
  } else if (i >= 15 && i < 20) {
    i -= 15;
    if (myArr[3][i] === 1) {
      block.style.backgroundColor = "green";
      greenBlocks++;
      myBlocks[15 + i].removeEventListener("click", messengerFunciton);
    } else {
      block.style.backgroundColor = "red";
      userLost();
    }
  } else {
    i -= 20;
    if (myArr[4][i] === 1) {
      block.style.backgroundColor = "green";
      greenBlocks++;
      myBlocks[20 + i].removeEventListener("click", messengerFunciton);
    } else {
      block.style.backgroundColor = "red";
      userLost();
    }
  }

  if (greenBlocks === 5) {
    goingBackToBeggining();
    randomNumGen();
  }
}

function userLost() {
  removeEventListenersToBlocks();
  greenBlocks = 0;
  for (let i = 0; i < myArr.length; i++) {
    for (let a = 0; a < myArr[i].length; a++) {
      if (
        myArr[i][a] === 1 &&
        myBlocks[i * 5 + a].style.backgroundColor !== "green"
      ) {
        let rightBlockNum = i * 5 + a;
        myBlocks[rightBlockNum].style.backgroundColor = "yellow";
      }
    }
  }

  div.classList.toggle("hidden");

  setTimeout(() => {
    div.classList.toggle("hidden");
    myBtn.addEventListener("click", randomNumGen);
    goingBackToBeggining();
  }, "2000");
}

function removeEventListenersToBlocks() {
  for (let i = 0; i < myBlocks.length; i++) {
    myBlocks[i].removeEventListener("click", messengerFunciton);
  }
}

function goingBackToBeggining() {
  greenBlocks = 0;
  myNum = 0;
  for (let i = 0; i < myArr.length; i++) {
    for (let a = 0; a < myArr[i].length; a++) {
      myArr[i][a] = 0;
      myBlocks[myNum].style.backgroundColor = "white";
      myNum++;
    }
  }
}

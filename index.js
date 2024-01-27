"use strict";
let result ="";
//accessing the html elements
const display=document.getElementById('display');
const historyList = document.getElementById("history-list");
const removeLastCharButton = document.getElementById("remove-last-char");
const clearHistory=document.getElementById("clear-history");
const Contdate = document.getElementsByClassName("date-container");
//-------------------------
// removing last character entered in the display
removeLastCharButton.addEventListener("click", ()=>{
    const currentText = display.value;
  
  if (currentText.length > 0) {
    display.value = currentText.slice(0, -1); // Remove the last character
  }
});
//------------------------
// clear the display
function clearDisplay(){
    display.value = ""; 
}
//-------------
//calculating the entered expression in the display
function calculate() {
    const exp=display.value;
    try {
      const result = eval(display.value);
      if (typeof result === "number" && !Number.isInteger(result)) { // Check if float
        const formattedResult = parseFloat(result.toFixed(6)).toString();
        display.value = formattedResult.padEnd(9, "0");
        updateHistory(exp, result.toFixed(6));
      } else {
        // Display the result without formatting if not a float
        display.value = result;
        updateHistory(exp, result);
      }
    } catch (error) {
      console.log("Error calculating: ", error);
      display.value = "Error";
    }
  }
  //------------
  //update the history of calculation in the history section
function updateHistory(expression, output) {
    //date
    const historyList = document.getElementById("history-list");

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // Format the date
  
    const dateContainer = document.querySelector(".date-container");
    if (shouldUpdateDate(dateContainer, formattedDate)) { // Check if date updated
      dateContainer.textContent = formattedDate;
    }


    //calculation
    const li = document.createElement("li");
    li.textContent = `${expression} = ${output}`;
    // li.style.paddingRight = "3px";
    li.style.marginTop = "10px";
    li.style.listStyleType = "none";
    li.style.color = "white";
    li.style.fontSize = "15px";
    historyList.insertBefore(li, historyList.firstChild); // Prepend to the list
  }
  //---------------------
  //display result in the display section
  function appendToDisplay(input) {
    if (display.value === result) { // Check if the current display value is the last result
      display.value = ""; // Clear the display if it is
    }
    display.value += input; // Append the input normally
  }
//----------------
//clear history using clear button
  clearHistory.addEventListener('click',()=>{
    historyList.textContent="";
    Contdate.textContent="";
  })
  //-------------
  //check whether the date in history section is old
  function shouldUpdateDate(dateContainer, newDate) {
    // Implement logic to check if date needs to be updated
    // This could be based on comparing previous date in container with newDate
    if (dateContainer.textContent !== newDate) {
      return true;
    }
    return false;
  }
  //----------

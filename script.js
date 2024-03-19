// Function for evaluating the expression entered by the user
function calculate() {
  // Get the expression value from the input field
  let expression = document.getElementById("expression").value;
  try {
    // Evaluate the expression using the math library
    let result = math.evaluate(expression);
    // Display the result
    document.getElementById("result").innerText = `Result: ${result}`;
    // Check if the result is a valid number and fetch a fact about it
    if (!isNaN(result)) {
      let number = Number.isInteger(result) ? result : Math.floor(result);
      fetchFactByNumber(number, handleFactAboutNumber);
    }
  } catch (error) {
    // Handle errors if the expression is invalid
    document.getElementById("result").innerText = "Invalid Expression";
  }
}

// Function to fetch a fact about a given number from an API
function fetchFactByNumber(number, callback) {
  // Construct the API URL
  const API_URL = `http://numbersapi.com/${number}`;
  // Fetch data from the API
  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        // Handle network errors
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      // Invoke the callback function with the retrieved fact
      callback(data);
    })
    .catch((error) => {
      // Log errors if fetching the fact fails
      console.error("Error fetching the fact about the number: ", error);
    });
}

// Callback function to handle the retrieved fact and display it
function handleFactAboutNumber(fact) {
  document.getElementById("fact").innerText = `Fact : ${fact}`;
}

// Function to clear all input fields and result displays
function clearInput() {
  document.getElementById("expression").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("fact").innerText = "";
}

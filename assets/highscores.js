// DOM elements for highscores section
const highscoresButton = document.getElementById("highscores-btn");
const goBackButton = document.getElementById("go-back-btn");
const clearButton = document.getElementById("clear-btn");
const highscoresSection = document.getElementById("highscores-section");
const highscoresList = document.getElementById("highscores-list");

// Event listener for "Highscores" button
highscoresButton.addEventListener("click", showHighscores);

// Event listener for "Go Back" button in highscores section
goBackButton.addEventListener("click", goBackToQuiz);

// Event listener for "Clear Highscores" button
clearButton.addEventListener("click", clearHighscores);

// Function to show highscores
function showHighscores() {
  // Display the highscores section
  document.getElementById("main").style.display = "none";
  highscoresSection.style.display = "block";

  // Fetch and display highscores
  displayHighscores();
}

// Function to go back to the quiz from highscores section
function goBackToQuiz() {
  // Hide the highscores section and display the main quiz
  document.getElementById("intro").style.display = "block";
  document.getElementById("main").style.display = "none";
  location.reload();
  highscoresSection.style.display = "none";
}

// Function to clear highscores
function clearHighscores() {
  // Clear highscores from localStorage
  localStorage.removeItem("highscores");

  // Clear the displayed highscores
  highscoresList.innerHTML = "";
}

// Function to generate a random color for styling highscores
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to display highscores
function displayHighscores() {
  // Retrieve highscores from localStorage
  const highscores = getHighscores();

  // Display highscores in the highscoresList
  highscoresList.innerHTML = "";
  highscores.forEach((score) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `.${score.initials}&nbsp;&nbsp;&nbsp;&nbsp;- ${score.score}`;

    // Apply a random color to each highscore entry
    listItem.style.color = getRandomColor();

    highscoresList.appendChild(listItem);
  });
}

// Function to retrieve highscores from localStorage
function getHighscores() {
  // Retrieve highscores from localStorage
  const storedHighscores = localStorage.getItem("highscores");

  // Parse the stored string into an array or use an empty array if null
  return storedHighscores ? JSON.parse(storedHighscores) : [];
}

// Function to save the current score and initials to highscores
function saveHighscore() {
  // Get user's initials
  const initials = initialsInput.value.trim();

  // Get the existing highscores from localStorage
  const highscores = getHighscores();

  // Add the current score to the highscores array
  highscores.push({ initials, score });

  // Store the updated highscores array in localStorage
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

// Event listener for the "Submit" button to save highscores
saveButton.addEventListener("click", () => {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    saveHighscore();
    // Log the saved initials and score for testing
    console.log("Saved: ", initials, score);
    // Hide the submit button and display the highscores button
    document.getElementById("save-btn").style.display = "none";
    document.getElementById("highscores-btn").style.display = "block";
  }
});

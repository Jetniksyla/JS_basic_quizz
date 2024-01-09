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

function showHighscores() {
  // Display the highscores section
  document.getElementById("main").style.display = "none";
  highscoresSection.style.display = "block";

  // Fetch and display highscores
  displayHighscores();
}

function goBackToQuiz() {
  // Hide the highscores section and display the main quiz
  document.getElementById("intro").style.display = "block";
  document.getElementById("main").style.display = "none";
  location.reload();
  highscoresSection.style.display = "none";
}

function clearHighscores() {
  // Clear highscores from localStorage
  localStorage.removeItem("highscores");

  // Clear the displayed highscores
  highscoresList.innerHTML = "";
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function displayHighscores() {
  // Retrieve highscores from localStorage
  const highscores = getHighscores();

  // Display highscores in the highscoresList
  highscoresList.innerHTML = "";
  highscores.forEach((score) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `ID_${score.initials}&nbsp;&nbsp;&nbsp;&nbsp;Score: ${score.score}`;

    listItem.style.color = getRandomColor();

    highscoresList.appendChild(listItem);
  });
}

function getHighscores() {
  // Retrieve highscores from localStorage
  const storedHighscores = localStorage.getItem("highscores");

  // Parse the stored string into an array or use an empty array if null
  return storedHighscores ? JSON.parse(storedHighscores) : [];
}

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

// Modify your existing "Submit" button event listener
saveButton.addEventListener("click", () => {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    saveHighscore();
    // Log the saved initials and score for testing
    console.log("Saved: ", initials, score);
    document.getElementById("save-btn").style.display = "none";
    document.getElementById("highscores-btn").style.display = "block";
  }
});

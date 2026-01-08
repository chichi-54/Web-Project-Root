// ================== FILTERING LOGIC ==================
const filterButtons = document.querySelectorAll(".filter-btn");
const qnaCards = document.querySelectorAll(".qna-card");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category");
        
        qnaCards.forEach(card => {
            if (category === "all" || card.classList.contains(category)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// ================== ADD NEW QUESTION ==================
document.getElementById("questionForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const textarea = document.getElementById("newQuestion");
    const questionText = textarea.value.trim();

    if (questionText === "") return;

    // Create card
    const card = document.createElement("div");
    card.classList.add("qna-card", "student"); 
    // new questions default to "student" category

    card.innerHTML = `
        <h3 class="question"><strong>Student Submitted:</strong></h3>
        <p class="answer">${questionText}</p>
    `;

    // Append to list
    document.getElementById("qnaContainer").appendChild(card);

    textarea.value = "";
    alert("Your question has been submitted!");
});

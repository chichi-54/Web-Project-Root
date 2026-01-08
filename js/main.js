document.addEventListener("DOMContentLoaded", function () {
    const userType = document.getElementById("usertype");
    const gradeField = document.getElementById("grade");

    function updateGradeVisibility() {
        if (userType.value === "highschool") {
            gradeField.parentElement.style.display = "block";
        } else {
            gradeField.parentElement.style.display = "none";
            gradeField.value = "";
        }
    }

    userType.addEventListener("change", updateGradeVisibility);
    updateGradeVisibility();
});

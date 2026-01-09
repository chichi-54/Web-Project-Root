const steps = document.querySelectorAll('.survey-step');
let currentStep = 0;

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showStep(n) {
    steps.forEach((step, index) => step.classList.toggle('active', index === n));
    prevBtn.style.display = n === 0 ? 'none' : 'inline-block';
    nextBtn.textContent = n === steps.length - 1 ? 'Submit' : 'Next';
}

prevBtn.addEventListener('click', () => {
    if(currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
});

nextBtn.addEventListener('click', () => {
    if(currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
    } else {
        // Collect answers
        const subjects = Array.from(document.querySelectorAll('input[name="subjects"]:checked')).map(el => el.value);
        const preference = document.querySelector('input[name="preference"]:checked')?.value;
        const environment = document.querySelector('input[name="environment"]:checked')?.value;
        const problemSolving = document.querySelector('input[name="problemSolving"]:checked')?.value;
        const activities = Array.from(document.querySelectorAll('input[name="activities"]:checked')).map(el => el.value);
        const careerGoal = document.querySelector('input[name="careerGoal"]:checked')?.value;

        let result = '';

        if(subjects.includes('Math') && preference === 'Technology' && problemSolving === 'Analytical') {
            result = 'STEM Pathway: Engineering, Computer Science, or IT';
        } else if(subjects.includes('Science') && environment === 'Lab') {
            result = 'Science & Research Pathway: Biology, Chemistry, or Lab Work';
        } else if(subjects.includes('Art') && problemSolving === 'Creative') {
            result = 'Creative & Media Pathway: Design, Marketing, or Communications';
        } else if(subjects.includes('English') && activities.includes('Helping')) {
            result = 'Humanities & Education Pathway: Teaching, Counseling, or Writing';
        } else if(activities.includes('Leading') && careerGoal === 'Impact') {
            result = 'Leadership & Business Pathway: Management, Entrepreneurship, or Community Leadership';
        } else {
            result = 'Explore multiple fields to find your ideal career!';
        }

        document.getElementById('surveyResult').textContent = result;
        nextBtn.style.display = 'none';
    }
});

showStep(currentStep);

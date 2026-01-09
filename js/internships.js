const internships = [
    {
        name: "Tech Innovators Inc.",
        field: "Technology",
        type: "College",
        mode: "Remote",
        applied: "100+ applied",
        tags: ["Summer Program", "Coding Bootcamp"],
        link: "#"
    },
    {
        name: "Green Earth NGO",
        field: "Environmental",
        type: "High School",
        mode: "Hybrid",
        applied: "50+ applied",
        tags: ["Summer Program", "Community Service"],
        link: "#"
    },
    {
        name: "Marketing Hub",
        field: "Marketing",
        type: "High School",
        mode: "Onsite",
        applied: "200+ applied",
        tags: ["Summer Program", "Team Project"],
        link: "#"
    },
    {
        name: "HealthFirst Clinic",
        field: "Healthcare",
        type: "College",
        mode: "Onsite",
        applied: "30+ applied",
        tags: ["Summer Program", "Hybrid"],
        link: "#"
    },
    {
        name: "Code Academy",
        field: "Technology",
        type: "High School",
        mode: "Remote",
        applied: "150+ applied",
        tags: ["Online", "Summer Program"],
        link: "#"
    },
    {
        name: "Creative Minds Studio",
        field: "Arts",
        type: "High School",
        mode: "Onsite",
        applied: "80+ applied",
        tags: ["Summer Program", "Portfolio Development"],
        link: "#"
    },
    {
        name: "EcoTech Solutions",
        field: "Environmental",
        type: "College",
        mode: "Remote",
        applied: "120+ applied",
        tags: ["Research Project", "Hybrid"],
        link: "#"
    },
    {
        name: "Finance Futures",
        field: "Business",
        type: "High School",
        mode: "Onsite",
        applied: "90+ applied",
        tags: ["Summer Program", "Work Experience"],
        link: "#"
    },
    {
        name: "MedTech Innovations",
        field: "Healthcare",
        type: "College",
        mode: "Hybrid",
        applied: "60+ applied",
        tags: ["Research", "Summer Program"],
        link: "#"
    },
    {
        name: "Global Outreach NGO",
        field: "Social Work",
        type: "High School",
        mode: "Remote",
        applied: "75+ applied",
        tags: ["Community Service", "Summer Program"],
        link: "#"
    },
    {
        name: "Startup Launchpad",
        field: "Business",
        type: "College",
        mode: "Hybrid",
        applied: "110+ applied",
        tags: ["Entrepreneurship", "Team Project"],
        link: "#"
    },
    {
        name: "DesignWorks Agency",
        field: "Arts",
        type: "College",
        mode: "Onsite",
        applied: "40+ applied",
        tags: ["Portfolio Development", "Summer Program"],
        link: "#"
    }
];

// Filter function remains the same
function filterInternships() {
    const field = document.getElementById("fieldFilter").value;
    const type = document.getElementById("typeFilter").value;
    const mode = document.getElementById("modeFilter").value;

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    const filtered = internships.filter(intern => 
        (field === "All" || intern.field === field) &&
        (type === "All" || intern.type === type) &&
        (mode === "All" || intern.mode === mode)
    );

    if(filtered.length === 0){
        resultsDiv.innerHTML = "<p>No internships found matching your filters.</p>";
        return;
    }

    filtered.forEach(intern => {
        const div = document.createElement("div");
        div.className = "intern-card";
        div.innerHTML = `
            <h3>${intern.name}</h3>
            <p><strong>Field:</strong> ${intern.field}</p>
            <p><strong>Type:</strong> ${intern.type}</p>
            <p><strong>Mode:</strong> ${intern.mode}</p>
            <p><strong>Applied:</strong> ${intern.applied}</p>
            <div class="tags">
                ${intern.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <a href="${intern.link}" target="_blank">Apply Now</a>
        `;
        resultsDiv.appendChild(div);
    });
}

// Initialize with all internships
filterInternships();

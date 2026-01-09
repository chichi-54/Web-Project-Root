const scholarships = [
     {
        name: "Academic Excellence Scholarship",
        level: "High School",
        type: "Merit-Based",
        deadline: "Summer 2026",
        tags: ["Essay Required", "National"],
        link: "#"
    },
    {
        name: "Future Leaders Scholarship",
        level: "High School",
        type: "Merit-Based",
        deadline: "Summer 2026",
        tags: ["Essay Required", "National"],
        link: "#"
    },
    {
        name: "Tech Innovators Award",
        level: "College",
        type: "Merit-Based",
        deadline: "Fall 2026",
        tags: ["STEM Focus", "Team Project"],
        link: "#"
    },
    {
        name: "Creative Arts Grant",
        level: "High School",
        type: "Creative/Essay",
        deadline: "Spring 2026",
        tags: ["Portfolio Required", "Statewide"],
        link: "#"
    },
    {
        name: "Global Change Fellowship",
        level: "College",
        type: "Need-Based",
        deadline: "Summer 2026",
        tags: ["Community Service", "Hybrid"],
        link: "#"
    },
    {
        name: "Women in Tech Scholarship",
        level: "High School",
        type: "Merit-Based",
        deadline: "Fall 2026",
        tags: ["STEM", "Leadership"],
        link: "#"
    },
    {
        name: "Green Future Grant",
        level: "College",
        type: "Environmental",
        deadline: "Summer 2026",
        tags: ["Research Project", "Remote"],
        link: "#"
    },
    {
        name: "Healthcare Heroes Award",
        level: "College",
        type: "Need-Based",
        deadline: "Spring 2026",
        tags: ["Volunteer Experience", "Onsite"],
        link: "#"
    },
    {
        name: "Entrepreneurship Excellence Scholarship",
        level: "High School",
        type: "Merit-Based",
        deadline: "Summer 2026",
        tags: ["Business Plan Required", "Team Project"],
        link: "#"
    }
];

function filterScholarships() {
    const level = document.getElementById("levelFilter").value;
    const type = document.getElementById("typeFilter").value;
    const deadline = document.getElementById("deadlineFilter").value;

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    const filtered = scholarships.filter(sch => 
        (level === "All" || sch.level === level) &&
        (type === "All" || sch.type === type) &&
        (deadline === "All" || sch.deadline === deadline)
    );

    if(filtered.length === 0){
        resultsDiv.innerHTML = "<p>No scholarships found matching your filters.</p>";
        return;
    }

    filtered.forEach(sch => {
        const div = document.createElement("div");
        div.className = "scholarship-card";
        div.innerHTML = `
            <h3>${sch.name}</h3>
            <p><strong>Level:</strong> ${sch.level}</p>
            <p><strong>Type:</strong> ${sch.type}</p>
            <p><strong>Deadline:</strong> ${sch.deadline}</p>
            <div class="tags">
                ${sch.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <a href="${sch.link}" target="_blank">Apply Now</a>
        `;
        resultsDiv.appendChild(div);
    });
}

// Initialize page with all scholarships
filterScholarships();

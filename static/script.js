const selectedSkills = [];
const members = [];
const tasks = [];
let memberid = 0;
let taskid = 0;

const skillsList = [
    "Frontend", "Backend", "SQL", "Designer", "React", "Node.js",
    "Python", "JavaScript", "TypeScript", "HTML/CSS", "UI/UX Design",
    "DevOps", "AWS", "Docker", "MongoDB", "PostgreSQL",
    "Git", "Agile", "REST APIs", "GraphQL"
];


const input = document.getElementById("skillInput");
const tagsDiv = document.getElementById("tags");
const suggestionsDiv = document.getElementById("suggestions");
const summaryDiv = document.getElementById("summary");
const skillsBox = document.getElementById("skillsBox");

/* ---------- Helpers ---------- */

function renderTags() {
    tagsDiv.innerHTML = "";
    selectedSkills.forEach(skill => {
        const tag = document.createElement("div");
        tag.className = "tag";
        tag.innerHTML = `${skill} <span>&times;</span>`;
        tag.querySelector("span").onclick = () => removeSkill(skill);
        tagsDiv.appendChild(tag);
    });

    summaryDiv.innerHTML = selectedSkills.length
        ? `<strong>Selected Skills (${selectedSkills.length}):</strong><br>${selectedSkills.join(", ")}`
        : "";
}

function showSuggestions(filtered) {
    suggestionsDiv.innerHTML = "";
    if (!filtered.length) {
        suggestionsDiv.style.display = "none";
        return;
    }

    filtered.forEach(skill => {
        const div = document.createElement("div");
        div.className = "suggestion";
        div.textContent = skill;
        div.onclick = () => addSkill(skill);
        suggestionsDiv.appendChild(div);
    });

    suggestionsDiv.style.display = "block";
}

function addSkill(skill) {
    if (!selectedSkills.includes(skill)) {
        selectedSkills.push(skill);
        input.value = "";
        suggestionsDiv.style.display = "none";
        renderTags();

    }

    do {
        summaryDiv.style.display = "block";
        input.placeholder = "";   
    } while (false);
}

function removeSkill(skill) {
    const index = selectedSkills.indexOf(skill);
    if (index !== -1) {
        selectedSkills.splice(index, 1);
        renderTags();
    }
}

/* ---------- Events ---------- */

input.addEventListener("input", () => {
    const value = input.value.toLowerCase().trim();
    if (!value) {
        suggestionsDiv.style.display = "none";
        return;
    }

    const filtered = skillsList.filter(skill =>
        skill.toLowerCase().includes(value) &&
        !selectedSkills.includes(skill)
    );

    showSuggestions(filtered);
});

input.addEventListener("keydown", (e) => {

    if (e.key === "Enter" && input.value.trim()) {
        e.preventDefault();
        addSkill(input.value.trim());
    }


    if (e.key === "Backspace" && !input.value && selectedSkills.length) {
        removeSkill(selectedSkills[selectedSkills.length - 1]);
    }
});

skillsBox.addEventListener("click", () => input.focus());

document.addEventListener("click", (e) => {
    if (!skillsBox.contains(e.target)) {
        suggestionsDiv.style.display = "none";
    }
});


function assignTasks() {
    const members = members
    const tasks = tasks

    fetch("/assign", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            members: members,
            tasks: tasks
        })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("result").textContent =
                JSON.stringify(data.assignments, null, 2);
            console.log("Assignments:", data.assignments);
        })
        .catch(error => {
            document.getElementById("result").textContent =
                "Error connecting to SmartFlow API";
        });

    console.log("Members:", members);
    console.log("Tasks:", tasks);

}

function addMember() {
    const name = document.getElementById("teamMemberName").value;
    const availability = parseInt(document.getElementById("teamMemberAvailability").value);
    const skills = selectedSkills;

    if (name && !isNaN(availability) && skills.length) {
        members.push({ "id": memberid, "name": name, "availability": availability, "skills": skills });
        updateAddedMembersRecord();
        document.getElementById("teamMemberName").value = "";
        document.getElementById("teamMemberAvailability").value = "";
        selectedSkills.length = 0;
        renderTags();
        memberid++;
    } else {
        alert("Please fill in all member details and select at least one skill.");
    }
}

function updateAddedMembersRecord() {
    const recordTable = document.getElementById("addedMembersTableBody");
    const tableIndex = members.length - 1;
    const member = members[tableIndex];

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${member.name}</td>
        <td>${member.availability}</td>
        <td>${member.skills.join(", ")}</td>
    `;
    // console.log("Updating member record for:", members);
    // console.log("Adding member to table:", member);
    recordTable.appendChild(row);
}

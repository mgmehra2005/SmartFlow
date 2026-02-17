let selectedSkills = ["Frontedn"];
const membersList = [];
const tasks = [];
let memberid = 1;
let taskid = 1;

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
    fetch("/assign", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            request: "assignedData",
            members: membersList,
            tasks: tasks
        })
    })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok: ' + response.status);
            return response.json();
        })
        .then(data => {
            console.log("Assignments:", data.assignments);
            // document.getElementById("result").textContent = JSON.stringify(data.assignments, null, 2);
        })
        .catch(error => {
            console.error("Error in assignTasks:", error);
            // document.getElementById("result").textContent = "Error connecting to SmartFlow API";
});
}

function pushMembers() {
    fetch("/members", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            members: membersList
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status == 200) {
                console.log("Members Assigned Successfully");
                window.location.href = "/createTasks";
            }
        }).catch(error => {
            console.error("Error pushing members:", error);
        });
}

function pushTasks() {
    fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tasksList: tasks
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status == 200) {
                console.log("Tasks Assigned Successfully");
                window.location.href = "/assignedTasks";
                assignTasks();
            }
        }).catch(error => {
            console.error("Error pushing tasks:", error);
        });
}

function addMember() {
    const name = document.getElementById("teamMemberName").value;
    const availability = parseInt(document.getElementById("teamMemberAvailability").value);
    const skills = selectedSkills;

    if (name && !isNaN(availability) && skills.length) {
        membersList.push({ "id": memberid, "name": name, "availability": availability, "skills": skills });
        console.log({ "id": memberid, "name": name, "availability": availability, "skills": skills });
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
    const tableIndex = membersList.length - 1;
    const member = membersList[tableIndex];

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

function addTask() {
    const task = document.getElementById("taskName").value;
    const taskEffort = parseInt(document.getElementById("taskEffort").value);
    const priority = parseInt(document.getElementById("SetPrioritySelection").value);
    const skills = selectedSkills;

    // console.log(`${task}, ${taskEffort}, ${priority}, ${skills}`);
    if (task && !isNaN(taskEffort) && skills.length) {
        tasks.push({ 'id': taskid, 'title': task, 'required_skills': skills, 'priority': priority, 'effort': taskEffort })
        updateAddedTasksRecord();
        selectedSkills.length = 0;
        document.getElementById("taskName").value = "";
        document.getElementById("taskEffort").value = "";
        document.getElementById("SetPrioritySelection").value = 1;
        renderTags();
        taskid++;
    } else {
        alert("Please fill in all tasks details and select at least one skill.");
    }
}

function updateAddedTasksRecord() {
    const recordTable = document.getElementById("addedTasksTableBody");
    const tableIndex = tasks.length - 1;
    const task = tasks[tableIndex];

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${task.title}</td>
        <td>${task.effort}</td>
        <td>${task.required_skills.join(", ")}</td>
    `;
    recordTable.appendChild(row);
}
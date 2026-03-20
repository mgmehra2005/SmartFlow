<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
let selectedSkills = [];
=======
let selectedSkills = ["Frontedn"];
>>>>>>> a785bb4 (Restore initial members and tasks data in app.py; update selectedSkills default value in script.js)
=======
let selectedSkills = [];
>>>>>>> 54e9054 (Refactor assignment display logic and improve table styling in assignedTask.html and style.css; reset selectedSkills in script.js)
const membersList = [];
const tasks = [];
let memberid = 1;
let taskid = 1;
=======
const selectedSkills = [];
const members = [];
const tasks = [];
let memberid = 0;
let taskid = 0;
>>>>>>> 3ee15c4 (UI Update V.2.1 - Completed Add New Member Page and Started Work on New Task Add Page, Few Changes on script.js ( added function that updates new member record table and adds new member to members list) and few changes on styles.css ( added new style rules for new member add page ))
=======
let selectedSkills = [];
const membersList = [];
const tasks = [];
let memberid = 1;
let taskid = 1;
>>>>>>> 017e71a (Implement member and task management features with API integration and UI updates)

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
<<<<<<< HEAD
<<<<<<< HEAD
        input.placeholder = "";
=======
        input.placeholder = "";   
>>>>>>> 3ee15c4 (UI Update V.2.1 - Completed Add New Member Page and Started Work on New Task Add Page, Few Changes on script.js ( added function that updates new member record table and adds new member to members list) and few changes on styles.css ( added new style rules for new member add page ))
=======
        input.placeholder = "";
>>>>>>> 017e71a (Implement member and task management features with API integration and UI updates)
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
    console.log("Assigning tasks");
    fetch("/assign", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
<<<<<<< HEAD
<<<<<<< HEAD
            members: localStorage.getItem("membersList") ? JSON.parse(localStorage.getItem("membersList")) : [],
            tasksList: localStorage.getItem("tasksList") ? JSON.parse(localStorage.getItem("tasksList")) : []
        })
    })
<<<<<<< HEAD
=======
            request: "assignedData",
=======
            members: localStorage.getItem("membersList") ? JSON.parse(localStorage.getItem("membersList")) : [],
            tasksList: localStorage.getItem("tasksList") ? JSON.parse(localStorage.getItem("tasksList")) : []
>>>>>>> 3977dec (Fixed assignment not fetching error)
        })
    })
>>>>>>> 017e71a (Implement member and task management features with API integration and UI updates)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok: ' + response.status);
            return response.json();
        })
        .then(data => {
            console.log("Assignments:", data.assignments);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 54e9054 (Refactor assignment display logic and improve table styling in assignedTask.html and style.css; reset selectedSkills in script.js)
            const tableBody = document.getElementById("assignmentTableBody");
            tableBody.innerHTML = "";
            data.assignments.forEach(assignment => {
                const row = document.createElement("tr");
                row.innerHTML = `
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b4f88de (Refactor assignment display logic in script.js to use assigned task details; comment out debug print statements in app.py)
                    <td>${assignment.assigned_to}</td>
                    <td>${assignment.task_title}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error in assignTasks:", error);
            document.getElementById("result").textContent = "Error connecting to SmartFlow API";
=======
            // document.getElementById("result").textContent = JSON.stringify(data.assignments, null, 2);
        })
        .catch(error => {
            console.error("Error in assignTasks:", error);
            // document.getElementById("result").textContent = "Error connecting to SmartFlow API";
>>>>>>> 017e71a (Implement member and task management features with API integration and UI updates)
=======
            document.getElementById("result").textContent = JSON.stringify(data.assignments, null, 2);
=======
                    <td>${data.member}</td>
                    <td>${data.task}</td>
                `;
                tableBody.appendChild(row);
            });
>>>>>>> 54e9054 (Refactor assignment display logic and improve table styling in assignedTask.html and style.css; reset selectedSkills in script.js)
        })
        .catch(error => {
            console.error("Error in assignTasks:", error);
            document.getElementById("result").textContent = "Error connecting to SmartFlow API";
>>>>>>> d66d0ac (Fixed Skills not loading issue)
});
}

function pushMembers() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3977dec (Fixed assignment not fetching error)
    // fetch("/members", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         members: membersList
    //     })
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.status == 200) {
    //             console.log("Members Assigned Successfully");
    //             window.location.href = "/createTasks";
    //         }
    //     }).catch(error => {
    //         console.error("Error pushing members:", error);
    //     });

    localStorage.setItem("membersList", JSON.stringify(membersList));
    window.location.href = "/createTasks";
<<<<<<< HEAD
}

function pushTasks() {
    // fetch("/tasks", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         tasksList: tasks
    //     })
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.status == 200) {
    //             console.log("Tasks Assigned Successfully");
    //             window.location.href = "/assignedTasks";
    //             // assignTasks();
    //         }
    //     }).catch(error => {
    //         console.error("Error pushing tasks:", error);
    //     });

    localStorage.setItem("tasksList", JSON.stringify(tasks));
    window.location.href = "/assignedTasks";
}

function addMember() {
    const name = document.getElementById("teamMemberName").value;
    const availability = parseInt(document.getElementById("teamMemberAvailability").value);
    const skills = [...selectedSkills];

    if (name && !isNaN(availability) && skills.length) {
        membersList.push({ "id": memberid, "name": name, "availability": availability, "skills": skills });
        console.log({ "id": memberid, "name": name, "availability": availability, "skills": skills });
=======
=======
    fetch("/members", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            members: membersList
        })
    })
>>>>>>> 017e71a (Implement member and task management features with API integration and UI updates)
        .then(response => response.json())
        .then(data => {
            if (data.status == 200) {
                console.log("Members Assigned Successfully");
                window.location.href = "/createTasks";
            }
        }).catch(error => {
            console.error("Error pushing members:", error);
        });
=======
>>>>>>> 3977dec (Fixed assignment not fetching error)
}

function pushTasks() {
    // fetch("/tasks", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         tasksList: tasks
    //     })
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.status == 200) {
    //             console.log("Tasks Assigned Successfully");
    //             window.location.href = "/assignedTasks";
    //             // assignTasks();
    //         }
    //     }).catch(error => {
    //         console.error("Error pushing tasks:", error);
    //     });

    localStorage.setItem("tasksList", JSON.stringify(tasks));
    window.location.href = "/assignedTasks";
}

function addMember() {
    const name = document.getElementById("teamMemberName").value;
    const availability = parseInt(document.getElementById("teamMemberAvailability").value);
    const skills = [...selectedSkills];

    if (name && !isNaN(availability) && skills.length) {
<<<<<<< HEAD
        members.push({ "id": memberid, "name": name, "availability": availability, "skills": skills });
>>>>>>> 3ee15c4 (UI Update V.2.1 - Completed Add New Member Page and Started Work on New Task Add Page, Few Changes on script.js ( added function that updates new member record table and adds new member to members list) and few changes on styles.css ( added new style rules for new member add page ))
=======
        membersList.push({ "id": memberid, "name": name, "availability": availability, "skills": skills });
        console.log({ "id": memberid, "name": name, "availability": availability, "skills": skills });
>>>>>>> 017e71a (Implement member and task management features with API integration and UI updates)
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
<<<<<<< HEAD
<<<<<<< HEAD
    const skills = [...selectedSkills];
=======
    const skills = selectedSkills;
>>>>>>> 017e71a (Implement member and task management features with API integration and UI updates)
=======
    const skills = [...selectedSkills];
>>>>>>> d66d0ac (Fixed Skills not loading issue)

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
<<<<<<< HEAD
<<<<<<< HEAD
}

function setTeam() {
    const teamName = document.getElementById("teamName").value;
    if (teamName) {
        localStorage.setItem("teamName", teamName);
        console.log("Team name set to:", teamName);
        window.location.href = "/AddTeamMember";
    } else {
        alert("Please enter a team name.");
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 017e71a (Implement member and task management features with API integration and UI updates)
=======
}

>>>>>>> 54e9054 (Refactor assignment display logic and improve table styling in assignedTask.html and style.css; reset selectedSkills in script.js)
=======
}
>>>>>>> 3977dec (Fixed assignment not fetching error)

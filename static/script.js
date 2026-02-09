function assignTasks() {
    const members = JSON.parse(document.getElementById("members").value);
    const tasks = JSON.parse(document.getElementById("tasks").value);

    fetch("http://127.0.0.1:5000/assign", {
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

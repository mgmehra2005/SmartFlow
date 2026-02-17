from flask import Flask, jsonify, request, render_template
from smartflow_engine import Member, Task, assignTasks

app = Flask(__name__)

members = [
        Member(1, "Alice", ["frontend", "design"], 6),
        Member(2, "Bob", ["backend"], 5),
        Member(3, "Charlie", ["frontend", "backend"], 4),
        Member(4, "Diana", ["design", "backend"], 7)
    ]
tasks = [
        Task(1, "Landing Page", ["frontend"], 4, 3),
        Task(2, "API Development", ["backend"], 5, 4),
        Task(3, "UI Fixes", ["design"], 2, 2),
        Task(4, "Fullstack Feature", ["design", "api","backend"], 5, 5)
    ]
# members = []
# tasks = []
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/assign", methods=["POST"])
def assign():
    data = request.get_json()
    # members = [Member(m["id"], m["name"], m["skills"], m["availability"]) for m in data["members"]]

    # tasks = [Task(t["id"], t["title"], t["required_skills"], t["priority"], t["effort"]) for t in data["tasks"]]
    print(data["request"])
    print("Calling Smartflow Engine with Members: ", members)
    print("Calling Smartflow Engine with Tasks: ", tasks)
    assignments = assignTasks(members, tasks)

    print("Assignments from Smartflow Engine: ", assignments)
    return jsonify({"assignments": assignments})


@app.route("/members", methods=["POST"])
def assignMembers():
    data = request.get_json()
    for member in data["members"]:
        members.append(Member(member["id"], member["name"], member["skills"], member["availability"]))
        print("Added Member: ", member["name"], member["skills"], member["availability"])
    return jsonify({"status":200})

@app.route("/tasks", methods=["POST"])
def addTasks():
    data = request.get_json()
    for task in data["tasksList"]:
        tasks.append(Task(task["id"], task["title"], task["required_skills"], task["priority"], task["effort"]))
        print("Added Task: ", task["title"], task["required_skills"], task["priority"], task["effort"])
    return jsonify({"status":200})

@app.route("/createTeam")
def createTeam():
    return render_template("createTeam.html")

@app.route("/AddTeamMember")
def addTeamMember():
    return render_template("addTeamMember.html")

@app.route("/createTasks")
def createTasks():
    return render_template("createTasks.html")

@app.route("/assignedTasks")
def assignedTasks():
    return render_template("assignedTask.html")
if __name__ == "__main__":
    app.run(debug=True)
    
from flask import Flask, jsonify, request, render_template, session
from smartflow_engine import Member, Task, assignTasks

app = Flask(__name__)

members = []
tasks = []
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/assign", methods=["POST"])
def assign():
    data = request.get_json()
<<<<<<< HEAD
<<<<<<< HEAD
    members = [Member(i["id"], i["name"], i["skills"], i["availability"]) for i in data.get("members", [])]
    tasks = [Task(t["id"], t["title"], t["required_skills"], t["priority"], t["effort"]) for t in data.get("tasksList", [])]
    # print("Received Members: ", members)
    # print("Received Tasks: ", tasks)
=======
    # members = [Member(m["id"], m["name"], m["skills"], m["availability"]) for m in data["members"]]

    # tasks = [Task(t["id"], t["title"], t["required_skills"], t["priority"], t["effort"]) for t in data["tasks"]]
    print(data["request"])
    print("Calling Smartflow Engine with Members: ", members)
    print("Calling Smartflow Engine with Tasks: ", tasks)
>>>>>>> 017e71a (Implement member and task management features with API integration and UI updates)
=======
    # print(data["request"])
    # print("Calling Smartflow Engine with Members: ", members)
    # print("Calling Smartflow Engine with Tasks: ", tasks)
>>>>>>> d66d0ac (Fixed Skills not loading issue)
    assignments = assignTasks(members, tasks)
    jsonedData = jsonify({"assignments": assignments})
    print("Assignments from Smartflow Engine: ", jsonedData.get_json())
    return jsonedData


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
<<<<<<< HEAD
    
=======
>>>>>>> 017e71a (Implement member and task management features with API integration and UI updates)
    
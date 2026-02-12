from flask import Flask, jsonify, request, render_template, session
from smartflow_engine import Member, Task, assignTasks

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/assign", methods=["POST"])
def assign():
    data = request.get_json()
    members = [Member(i["id"], i["name"], i["skills"], i["availability"]) for i in data.get("members", [])]
    tasks = [Task(t["id"], t["title"], t["required_skills"], t["priority"], t["effort"]) for t in data.get("tasksList", [])]
    # print("Received Members: ", members)
    # print("Received Tasks: ", tasks)
    assignments = assignTasks(members, tasks)

    print("Assignments from Smartflow Engine: ", assignments)
    return jsonify({"assignments": assignments})


@app.route("/createTeam")
def createTeam():
    return render_template("createTeam.html")

@app.route("/AddTeamMember")
def addTeamMember():
    return render_template("addTeamMember.html")

@app.route("/createTasls")
def createTasks():
    return render_template("createTasks.html")

if __name__ == "__main__":
    app.run(debug=True)
    
    
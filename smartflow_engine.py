class Member:
    def __init__(self, member_id: int, name: str, skills, availability):
        self.id = member_id
        self.name = name
        self.skills = set(skills)        # List of skills the member possesses
        self.availability = availability    # Total available hours
        self.current_workload = 0

    def remaining_capacity(self):
        return self.availability - self.current_workload

class Task:
    def __init__(self, task_id, title, required_skills, priority, efforts):
        self.id = task_id
        self.title = title
        self.required_skills = set(required_skills)      # List of skills required for the task
        self.priority = priority             # Priority level of the task   (1-5)
        self.efforts = efforts        # Estimated effort required to complete the task in hours
        self.assigned_to = None

def calculateScore(member, task):

    # Match skills
    matched_skills = member.skills.intersection(task.required_skills)

    if not matched_skills:
        # print(f"Member {member.name} does not have required skills for task {task.title}.")
        return 0
    
    skill_score = len(matched_skills) / len(task.required_skills)

    # Availability Score
    if member.remaining_capacity() < task.efforts:
        # print(f"Member {member.name} does not have enough availability for task {task.title}.")
        return 0
    
    availability_score = member.remaining_capacity() / member.availability

    # Workload Score
    workload_score = 1 - (member.current_workload / member.availability)

    # Priority Score
    priority_score = task.priority / 5

    # Final Score Calculation

    score = (skill_score * 0.4) + (availability_score * 0.3) + (workload_score * 0.2) + (priority_score * 0.1)

    return round(score, 3)

def assignTasks(members, tasks):

    assignments = []

    sorted_tasks = sorted(sorted(tasks, key=lambda t: t.priority, reverse=True), key=lambda t: t.efforts, reverse=True)
    print("Sorted Tasks: ", [t.title for t in sorted_tasks])
    for task in sorted_tasks:
        best_member = None
        best_score = 0

        for member in members:
            score = calculateScore(member, task)

            if score > best_score:
                best_score = score
                best_member = member
            
        if best_member:
            task.assigned_to = best_member.name
            best_member.current_workload += task.efforts

            assignments.append({
                "task_id" : task.id,
                "task_title" : task.title,
                "assigned_to" : best_member.name,
                "assigned_to_id" : best_member.id,
                "score" : best_score
            })
        
    # print("Final Assignments: ", assignments)
    return assignments


if __name__ == "__main__":
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

    result = assignTasks(members, tasks)
    for r in result:
        print(r)
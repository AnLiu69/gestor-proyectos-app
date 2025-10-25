const STATUS_VALUES = [
    "pendiente",
    "en progreso",
    "hecho"
];

const PRIORITY_VALUES = [
    "alta",
    "media",
    "baja"
];

export const cleanDataTasks = (tasks) => {
    let tasksClean = tasks.filter((task) => task.projectId ? true : false);

    tasksClean = tasksClean.map((task) => ({
            id: task.id,
            title: task.title,
            priority: task.priority,
            status: task.status,
            id_project: task.projectId
        }));
    
    tasksClean = tasksClean.filter((task) => Object.values(task).every((value) => value != ""));

    tasksClean = tasksClean.filter((task) => STATUS_VALUES.includes(task.status)); 

    tasksClean = tasksClean.filter((task) => PRIORITY_VALUES.includes(task.priority));

    return tasksClean;
}
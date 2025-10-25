const STATUS_VALUES = [
    "activo",
    "inactivo"
]

export const cleanDataProjects = (projects) => {
    let projectsClean = projects.filter((project) => STATUS_VALUES.includes(project.status));

    projectsClean = projectsClean.map((project) => ({
        id: project.id, 
        name: project.name, 
        description: project.description, 
        status: project.status
    }));

    projectsClean = projectsClean.filter((project) => Object.values(project).every((value) => value != ""));

    return projectsClean;
}
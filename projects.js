const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");
 
let projects = [];
 
function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projects = projectData.map(project => {
                const sector = sectorData.find(s => s.id === project.sector_id);
                return { ...project, sector: sector ? sector.sector_name : "Unknown" };
            });
            resolve();
        } catch (error) {
            reject("Error initializing projects: " + error.message);
        }
    });
}
 
function getAllProjects() {
    return new Promise((resolve, reject) => {
        if (projects.length > 0) {
            resolve(projects);
        } else {
            reject("No projects available.");
        }
    });
}
 
function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            resolve(project);
        } else {
            reject(`Unable to find project with id: ${projectId}`);
        }
    });
}
 
function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        const matchingProjects = projects.filter(p =>
            p.sector.toLowerCase().includes(sector.toLowerCase())
        );
        if (matchingProjects.length > 0) {
            resolve(matchingProjects);
        } else {
            reject(`Unable to find projects in sector: ${sector}`);
        }
    });
}
 
module.exports = {
    initialize,
    getAllProjects,
    getProjectById,
    getProjectsBySector
};
 
initialize().then(() => {
    getAllProjects()
        .then(data => console.log("All Projects: ", data))
        .catch(err => console.error(err));
 
    getProjectById(9)
        .then(project => console.log("Project by ID 9: ", project))
        .catch(err => console.error(err));
 
    getProjectsBySector("agriculture")
        .then(projects => console.log("Projects in Agriculture Sector: ", projects))
        .catch(err => console.error(err));
}).catch(err => console.error(err));
 

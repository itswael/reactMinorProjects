import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import {useState} from "react";
import SelectedProject from "./components/selectedProject.jsx";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects:[],
        tasks: []
    })

    function handleAddTask(text){
        setProjectsState(prevState => {
            const taskId = Math.random()
            const newTask = {
                text: text,
                projectId: prevState.projectId,
                id: taskId
            }
            return {
                ...prevState,
                tasks: [newTask, ...prevState.tasks]
            }
        })
    }

    function handleDeleteTask(id){
        setProjectsState(prevState => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter(task => task.id !== id)
            }
        })
    }

    function handleStartAddProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: null
            }
        })
    }

    function handleCancelAddProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined
            }
        })
    }

    function handleSelectProject(id) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: id
            }
        })
    }

    function handleDeleteProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId)
            }
        })
    }

    function handleAddProject(projectData) {
        setProjectsState(prevState => {
            const projectId = Math.random()
            const newProject = {
                ...projectData,
                id: projectId
            }
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects, newProject]
            }
        })
    }
    const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

    let content = <SelectedProject onAddTask = {handleAddTask}
                                    tasks = {projectsState.tasks}
                                    onDeleteTask={handleDeleteTask}
                                    project={selectedProject}
                                    onDelete={handleDeleteProject}/>

    if (projectsState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    } else if (projectsState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
    }

  return (
    <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar onStartAddProject={handleStartAddProject}
                         onselectProject={handleSelectProject}
                         projects={projectsState.projects}
                         onAddProject={handleAddProject}
                         selectedProjectId={projectsState.selectedProjectId}/>
        {content}
    </main>
  );
}

export default App;

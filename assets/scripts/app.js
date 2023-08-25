
class ProjectItem{
    constructor(id,updateProjectHandlerFxn)
    {
        this.id=id;
        this.updateProjectHandlerFxn=updateProjectHandlerFxn;
        this.connectSwitchBtn();
    }
    connectSwitchBtn()
    {
        const switchBtn=document.querySelector(`#${this.id} button:last-of-type`);
        switchBtn.addEventListener('click',this.updateProjectHandlerFxn)
    }

}

class ProjectList
{

    Projects=[];
   
    constructor(name)
    {
        
        this.name=name;
        
        const allProjs=document.querySelectorAll(`#${name}-projects li`);

       for(const proj of allProjs){
        this.Projects.push(new ProjectItem(proj.id,this.swichProjectHandler.bind(this)));
        
       }

    
    }

    switchHandlerOutside(switchHandler){
        this.switchHandler=switchHandler;
    }
    addProjectHandler()
    {
        
        this.Projects.push(this.ProjectItem)
        console.log(this.Projects)
    }
    
    
    swichProjectHandler(projectId)
       {
        this.Projects=this.Projects.filter(p=>p.id!==projectId);
        
        this.switchHandler(this.Projects.find(p=>p.id==projectId))
        
        
       }
 

}

class App
{
    static init()
    {
        const activeProjects=new ProjectList("active");
        const finishedPorjects=new ProjectList("finished");
        activeProjects.switchHandlerOutside(finishedPorjects.addProjectHandler.bind(finishedPorjects))
        finishedPorjects.switchHandlerOutside(activeProjects.addProjectHandler.bind(activeProjects))
    }
    

}
App.init()
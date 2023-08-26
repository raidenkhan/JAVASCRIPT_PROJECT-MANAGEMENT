
class DOMHelper
{
    static removeEventListners(domElement)
    {
        const newEl=document.cloneNode(domElement);
        domElement=newEl;
        return newEl;
    }
    static moveElement(sourceId,destId)
    {
        const sourceEl=document.getElementById(`${sourceId}`);
        const destinatContainer=document.querySelector(`#${destId}-projects ul`);
        
        destinatContainer.append(sourceEl);

    }
}
class Tooltip{}
class ProjectItem{
    constructor(id,switchProjectItemFxn)
    {
        this.id=id;
        this.updateSwitchHandler=switchProjectItemFxn;
        this.connectSwitchBtn()

    }

    ///CONNECT SWITCH BUTTON
    connectSwitchBtn()

    {
        let switchBtn=document.querySelector(`#${this.id} button:last-of-type`)
        switchBtn.addEventListener('click',this.updateSwitchHandler.bind(null,this.id))
        switchBtn=DOMHelper.removeEventListners(switchBtn);
        
        switchBtn.innerHTML=switchBtn.innerHTML=='Activate'?'Finish':'Activate'
        
    }
    update(updateSwitchHandler)
    {
        this.updateSwitchHandler=updateSwitchHandler;
        this.connectSwitchBtn()

    }


}
class ProjectList
{
    Projects=[];
constructor(type){
    this.type=type;
    const allProjects=document.querySelectorAll(`#${type}-projects li`);
    for(const proj of allProjects)
    {
        this.Projects.push(new ProjectItem(proj.id,this.switchProject.bind(this)));

    }

}
//logic to add project after switching
    addProject(project)
    {
        this.Projects.push(project)
        DOMHelper.moveElement(project.id,this.type);
        project.update(this.switchProject.bind(this,project.id));
     
        
    }
    //logic to switchProject when button is clicked
    switchHandler(switchHandlerFxn)
    {
        this.switchHandler=switchHandlerFxn;
    }
switchProject(ProjectId)
    {
        this.switchHandler(this.Projects.find(p=>p.id==ProjectId))
        this.Projects=this.Projects.filter(p=>p.id!==ProjectId)
        
    }

}


class App{
    static init()
    {
        const activeProjects=new ProjectList('active');
        const finishedProjects=new ProjectList('finished');
        activeProjects.switchHandler(finishedProjects.addProject.bind(finishedProjects));
        finishedProjects.switchHandler(activeProjects.addProject.bind(activeProjects))

    }
}
App.init();
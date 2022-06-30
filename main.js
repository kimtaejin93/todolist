let inputArea=document.getElementById("input-area");
let addButton=document.getElementById("add-button");
let taskBoard=document.getElementById("task-board");
let taps=document.querySelectorAll(".task-taps div" );
let taskList=[];
let filterList=[];
let mode="all";
addButton.addEventListener("click", addTask);

for(i=1;i<taps.length;i++){
  taps[i].addEventListener("click",function(event){filter(event)});
}
function addTask(){
  let task={
    id:randomIDGenerate(),
    taskContent:inputArea.value,
    isComplete:false
  };
  taskList.push(task);
  console.log(taskList);
  render();

}
function render(){
  let resultHTML="";
  let list=[];
  if(mode=="all"){
    list=taskList;
  }
  else{
    list=filterList;
  }
  for(let i=0;i<list.length;i++){
    if(list[i].isComplete==true){

      resultHTML+=` <div class="task">
      <div class="task-done">
      ${list[i].taskContent}
      </div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-circle-check"></i></button>
        <button onclick="taskDelete('${list[i].id}')">delete</button>
      </div>
    </div>`

    }
    else{
    resultHTML+=` <div class="task">
    <div>
    ${list[i].taskContent}
    </div>
    <div>
      <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-circle-check"></i></button>
      <button onclick="taskDelete('${list[i].id}')">delete</button>
    </div>
  </div>`
    }
  }
  taskBoard.innerHTML=resultHTML;
}
function toggleComplete(id){
  console.log("id:",id);
  for(i=0;i<taskList.length;i++){
    if(taskList[i].id==id){
      if(taskList[i].isComplete==false){
      taskList[i].isComplete=true;
      }
      else taskList[i].isComplete=false;
      break;
    }
  }
  render()
}
function randomIDGenerate(){
  return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"");
}

function taskDelete(id){
  for(i=0;i<taskList.length;i++){
    if(taskList[i].id==id){
      taskList.splice(i,1);
}
  }
  render()
}

function filter(event){
  mode=event.target.id;
  
  if(mode=="all"){
    render()
  }
  else if(mode=="done"){
      filterList=[];
      for(i=0;i<taskList.length;i++){
        if(taskList[i].isComplete==true){
        filterList.push(taskList[i]);
      
      }
    }
    console.log(filterList);
    console.log(mode);
    render();
  }
  else if(mode=="left"){
    filterList=[];
    for(i=0;i<taskList.length;i++){
      if(taskList[i].isComplete==false){
      filterList.push(taskList[i]);
    
    }
  }
  render();
  }
  console.log(filterList);
  console.log(mode);
}
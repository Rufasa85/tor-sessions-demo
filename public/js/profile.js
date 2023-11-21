const addForm = document.querySelector("#addTodoForm");
const completeBtns = document.querySelectorAll(".markComplete");
const incompleteBtns = document.querySelectorAll(".markIncomplete");

addForm.addEventListener("submit",e=>{
    e.preventDefault();
    const todoObj = {
        task:document.querySelector("#addTodoInput").value
    };
    fetch("/api/todos",{
        method:"POST",
        body:JSON.stringify(todoObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})

for (const completeBtn of completeBtns) {
    completeBtn.addEventListener("click",e=>{
        const id = e.target.getAttribute("data-todoid");
        fetch(`/api/todos/${id}`,{
            method:"PUT",
            body:JSON.stringify({
                isComplete:true
            }),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
               location.reload()
            } else {
                alert("trumpet sound")
            }
        })
    })
}
for (const incompleteBtn of incompleteBtns) {
    incompleteBtn.addEventListener("click",e=>{
        const id = e.target.getAttribute("data-todoid");
        fetch(`/api/todos/${id}`,{
            method:"PUT",
            body:JSON.stringify({
                isComplete:false
            }),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
               location.reload()
            } else {
                alert("trumpet sound")
            }
        })
    })
}

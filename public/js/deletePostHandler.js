async function deletePostHandler(event){
    event.preventDefault();
    console.log("here");

    const blogpostid = event.target.getAttribute("value");
    const response = await fetch(`/api/blogposts/${blogpostid}`, {
        method: "DELETE"
    });
    if(response.ok){
        document.location.replace('/dashboard');
    }
    else{
        alert(response.statusText);
    }
}
const deletebtns = document.querySelectorAll(".deleteBtn");
for (let i=0; i< deletebtns.length; i++){
    deletebtns[i].addEventListener("click", deletePostHandler);
}
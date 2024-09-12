async function editHandler (event){
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const blog_content = document.getElementById('blogcontent').value.trim();
    const blogpostid = document.getElementById('blogpostid').value;

    if (title && blog_content){
        const response = await fetch(`/api/blogposts/${blogpostid}`,{
            method: "PUT",
            body: JSON.stringify({
                title,
                blog_content
            }),
            headers: {"Content-Type": "application/json"}
        });
        if(response.ok){
            document.location.replace('/dashboard');
        }
        else{
            alert(response.statusText);
        }
    }
}

document.getElementById("editBlogPost").addEventListener("submit", editHandler);
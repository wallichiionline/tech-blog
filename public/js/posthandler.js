async function newPostHandler(event){
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("blogcontent").value.trim();

    if (title && content){
        const response = await fetch('/api/blogposts', {
            method: "POST",
            body: JSON.stringify({
                title,
                content
            }),
            headers: {"content-type": "application/json"}
        });
        if (response.ok){
            document.location.replace('/dashboard');
        }
        else{
            alert(response.statusText);
        }
    }
}

document.getElementById("createBlogPost").addEventListener("submit", newPostHandler);
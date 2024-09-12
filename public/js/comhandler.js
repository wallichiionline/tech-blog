async function newCommentHandler(event){
    event.preventDefault();

    const comment = document.getElementById('comment').value.trim();
    const url = window.location.toString("/")[2];
    const blogpostid = url[url.length - 1];

    if(comment){
        const response = await fetch('/api/comments', {
            method: "POST",
            body: JSON.stringify({
                blogpostid,
                comment
            }),
            headers: { "Content-Type": "application/json" }
        });
        if(response.ok){
            document.location.reload();
        }
        else{
            alert(response.statusText);
        }
    }
}

document.getElementById('comment-form').addEventListener('submit', newCommentHandler);
async function logout (){
    const response = await fetch("/api/users/logout", {
        method: "POST",
        header: {"Content-Type": "application/json"}
    });
        
    if (response.ok) {
        document.location.replace("/");
    } else {
        alert(response.statusText);
    }
}

document.getElementById("logout").addEventListener("click", logout);
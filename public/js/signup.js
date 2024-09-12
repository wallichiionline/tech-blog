async function signupFormHandler(event) {
    event.preventDefault();
    
    const email = document.getElementById("email-signup").value.trim();
    const password = document.getElementById("password-signup").value.trim();
    const name = document.getElementById("name-signup").value.trim();

    if (email && password && name) {
        const response = await fetch("/api/users/signup", {
            method: "POST",
            body: JSON.stringify({ email, password, name }),
            headers: { "Content-Type": "application/json" }
        });
        
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert(response.statusText);
        }
    }
}

document.getElementById("signup-form").addEventListener("submit", signupFormHandler);
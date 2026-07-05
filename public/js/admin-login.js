       document
            .getElementById("adminLoginForm")
            .addEventListener(
                "submit",
                async (e) => {

                    e.preventDefault();

                    const email =
                        document.getElementById("email").value;

                    const password =
                        document.getElementById("password").value;

                    try {

                    const response = await fetch("http://localhost:1000/api/admin/login",
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type":
                                            "application/json"
                                    },
                                    body: JSON.stringify({
                                        email,
                                        password
                                    })
                                }
                            );

                        const data =
                            await response.json();

                        if (response.ok) {

                            localStorage.setItem(
                                "token",
                                data.token
                            );

                            localStorage.setItem(
                                "userRole",
                                "admin"
                            );

                        window.location.href = "adminDashboard.html";
                        } 
                        else { document.getElementById("message").innerHTML = `<span class="error"> ${data.message} </span>`;

                        }

                    } 
                    
                    catch (error) {
                        document.getElementById("message").innerHTML = `<span class="error">Server Error </span>`;

                    }

                });

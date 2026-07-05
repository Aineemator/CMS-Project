 const token = localStorage.getItem("token");

 console.log("TOKEN =", token);

 async function loadAnalytics() {
    try {
        const response = await fetch("/api/tasks/analytics",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        document.getElementById("userCount").innerHTML = data.totalUsers || 0;

    }

    catch (error) {
        console.log(error);
    }
 }
//==============================

    if (!token) {

        window.location.href = "login.html";
    }


    // LOAD ALL COMPLAINTS

    async function loadComplaints() {
        try {
            const response = await fetch("/api/tasks/all",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


        const complaints = await response.json();

        const container = document.getElementById("allComplaints");

        container.innerHTML = "";


// COUNTER SECTION 
        let total = complaints.length;

        let pending = 0;
        let progress = 0;
        let resolved = 0;

        complaints.forEach(c => {
            if (c.status === "Pending") {
                pending++;
            }

            if (c.status === "In Progress") {
                progress++;
            }

            if (c.status === "Resolved") {
                resolved++;
            }
            container.innerHTML += `
                <div class="complaint-card">
                <h3>${c.title}</h3>

                <P><b>User:</b>${c.userId?.name}</p>
                <P><b>Email:</b>${c.userId?.email}</p>
                <P><b>Category:</b>${c.category}</p>
                <P><b>Priority:</b>${c.priority}</p>
                <P><b>Description:</b>${c.description}</p>
                
                <br>

            <select class="status-select" onchange="changeStatus('${c._id}', this.value)">

            <option ${c.status === "Pending" ? "selected" : ""}>Pending</option>
            <option ${c.status === "In Progress" ? "selected" : ""}>In Progress</option>
            <option ${c.status === "Resolved" ? "selected" : ""}>Resolved</option>
            
            </select>

            <button class="delete-btn" onclick="deleteComplaint('${c._id}')">Delete</button>

            </div>
            `;
        });


        document.getElementById("totalCount").innerText = total;

        document.getElementById("pendingCount").innerText = pending;

        document.getElementById("progressCount").innerText = progress;

        document.getElementById("resolvedCount").innerText = resolved;
        }

        catch (error) {
            console.log(error);
        }
    }

    // UPDATE STATUS

    async function changeStatus(
        id,
        status
    ) {
        try {
            await fetch(`/api/tasks/${id}`,

                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        status
                    })
                }
            );

            loadComplaints();
            loadAnalytics();
        }

        catch (error) {
            console.log(error);
        } 
    }


    // DELETE

    async function deleteComplaint(id) {
        if(

         !confirm(
            "Delete Complaint?"
        )
        ) {
            return;
        }

        try {
            await fetch(`/api/tasks/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            loadComplaints();
            loadAnalytics();
        }

        catch (error) {
            console.log(error);
        }
    }


    // LOGOUT

    function logout() {
        localStorage.removeItem("token");

        localStorage.removeItem("role");

        window.location.href = "admin-login.html";
    }

    loadComplaints();
    loadAnalytics();
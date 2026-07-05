const API_URL = "http://localhost:1000/api/tasks";

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login-signup.html";
}

document.addEventListener("DOMContentLoaded", () => {

    loadComplaints();

    document
        .getElementById("taskForm")
        .addEventListener("submit", createComplaint);

});

// Submit Complaint

async function createComplaint(e) {

    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value;
    const priority = document.getElementById("priority").value;
    const description = document.getElementById("description").value.trim();

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify({

                title,
                category,
                priority,
                description

            })

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        alert("Complaint Submitted Successfully");

        document.getElementById("taskForm").reset();

        loadComplaints();

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

}

// part two

// Load User Complaints

async function loadComplaints() {

    try {

        const response = await fetch(API_URL, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const complaints = await response.json();

        showComplaints(complaints);

        updateCards(complaints);

    }

    catch (error) {

        console.log(error);

    }

}


// Show Complaints

function showComplaints(complaints) {

    const container = document.getElementById("tasks");

    container.innerHTML = "";

    if (complaints.length === 0) {

        container.innerHTML = `
            <p>No complaints submitted yet.</p>
        `;

        return;

    }

    complaints.forEach(item => {

        container.innerHTML += `

        <div class="complaint-card">

            <h3>${item.title}</h3>

            <p><strong>Category:</strong> ${item.category}</p>

            <p><strong>Priority:</strong> ${item.priority}</p>

            <p>${item.description}</p>

            <p>
                <strong>Status:</strong>

                <span class="status ${item.status.replace(/\s/g,"")}">

                    ${item.status}

                </span>

            </p>

        </div>

        `;

    });

}


// Update Dashboard Cards

function updateCards(complaints) {

    document.getElementById("totalCount").innerText =
        complaints.length;

    document.getElementById("pendingCount").innerText =
        complaints.filter(x => x.status === "Pending").length;

    document.getElementById("progressCount").innerText =
        complaints.filter(x => x.status === "In Progress").length;

    document.getElementById("resolvedCount").innerText =
        complaints.filter(x => x.status === "Resolved").length;

}


// Logout

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    window.location.href = "login-signup.html";

}
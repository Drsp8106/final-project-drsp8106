document.addEventListener("DOMContentLoaded", () => {
    const volunteerBtn = document.getElementById("volunteerBtn");
    const form = document.querySelector("form");
    const messageInput = document.getElementById("message");
    const charCount = document.getElementById("charCount");

    // Ensure the elements exist
    if (volunteerBtn && form) {
        form.style.display = "none";

        volunteerBtn.addEventListener("click", () => {
            if (form.style.display === "none") {
                form.style.display = "block";
                volunteerBtn.textContent = "Hide Form";
            } else {
                form.style.display = "none";
                volunteerBtn.textContent = "Volunteer Now";
            }
        });
    }

    if (messageInput && charCount) {
        messageInput.addEventListener("input", () => {
            charCount.textContent = `Characters: ${messageInput.value.length}`;
        });
    }
});

dodocument.addEventListener("DOMContentLoaded", async () => {
    const apiUrl = "https://api.charityapi.org/api/organizations/search/:MO";
    const charityList = document.getElementById("charityList");

    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Authorization": "Bearer S_4qEeXQ9JtDwZlDUKqGvTUO4OVnCDZUO_Y3NtOK60Uljtr2vW5Ua9XVm2ZN7jc6H-AiqP4zWPCF5hw" 
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
            charityList.innerHTML = data.map(charity => `
                <div class="charity-item">
                    <h3>${charity.name}</h3>
                    <p>${charity.description || "No description available."}</p>
                    <a href="${charity.website}" target="_blank">Visit Website</a>
                </div>
            `).join('');
        } else {
            charityList.innerHTML = "<p>No charities found.</p>";
        }
    } catch (error) {
        charityList.innerHTML = `<p class="error">Unable to load charities. Please try again later.</p>`;
        console.error("Fetch error:", error);
    }
});

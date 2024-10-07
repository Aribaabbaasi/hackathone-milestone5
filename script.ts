document.addEventListener('DOMContentLoaded', () => {
    // Get references to the form and display areas
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
    const imageInputElement = document.getElementById('uploading') as HTMLInputElement; // Image upload input

    const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
    const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
    const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

    // Handle form submission
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault(); // Prevent page reload

        // Collect input values
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

        // Save form data in localStorage with the username as the key
        const resumeData = {
            name,
            email,
            phone,
            education,
            experience,
            skills,
        };
        localStorage.setItem(username, JSON.stringify(resumeData)); // Save data locally

        // Handle image upload if any
        const imageFile = imageInputElement.files?.[0];
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageDataURL = e.target?.result as string;

                // Generate the resume content dynamically with the uploaded image
                const resumeHTML = `
                    <h2>Editable Resume</h2>
                    <img src="${imageDataURL}" alt="Uploaded Image" style="width: 150px; height: 150px; border-radius: 50%;">
                    <h3>Personal Information</h3>
                    <p><b>Name:</b> <span contenteditable="true">${name}</span></p>
                    <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
                    <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>
                    <h3>Education</h3>
                    <p contenteditable="true">${education}</p>
                    <h3>Experience</h3>
                    <p contenteditable="true">${experience}</p>
                    <h3>Skills</h3>
                    <p contenteditable="true">${skills}</p>
                `;

                // Display the generated resume with image
                resumeDisplayElement.innerHTML = resumeHTML;

                // Generate the shareable URL
                const shareableURL = `http://127.0.0.1:5501/?username=Beautyofnature${encodeURIComponent(username)}`;
                shareableLinkContainer.style.display = 'block'; // Show the link container
                shareableLinkElement.href = shareableURL; // Set the href attribute
                shareableLinkElement.textContent = shareableURL; // Display the URL text
            };
            reader.readAsDataURL(imageFile); // Trigger the file reader to convert the image to DataURL
        } else {
            // If no image is uploaded, generate resume without image
            const resumeHTML = `
                <h2>Editable Resume</h2>
                <h3>Personal Information</h3>
                <p><b>Name:</b> <span contenteditable="true">${name}</span></p>
                <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
                <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>
                <h3>Education</h3>
                <p contenteditable="true">${education}</p>
                <h3>Experience</h3>
                <p contenteditable="true">${experience}</p>
                <h3>Skills</h3>
                <p contenteditable="true">${skills}</p>
            `;
            resumeDisplayElement.innerHTML = resumeHTML;

            // Generate the shareable URL
            const shareableURL = `http://127.0.0.1:5501/?username=Beautyofnature${encodeURIComponent(username)}`;
            shareableLinkContainer.style.display = 'block'; // Show the link container
            shareableLinkElement.href = shareableURL; // Set the href attribute
            shareableLinkElement.textContent = shareableURL; // Display the URL text
        }
    });

    // Handle PDF download
    downloadPdfButton.addEventListener('click', () => {
        window.print(); // This will open the print dialog and allow the user to save as PDF
    });

    // Prefill the form based on the username in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
        }
    }
});

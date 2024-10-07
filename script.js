document.addEventListener('DOMContentLoaded', function () {
    // Get references to the form and display areas
    var form = document.getElementById('resume-form');
    var resumeDisplayElement = document.getElementById('resume-display');
    var imageInputElement = document.getElementById('uploading'); // Image upload input
    var shareableLinkContainer = document.getElementById('shareable-link-container');
    var shareableLinkElement = document.getElementById('shareable-link');
    var downloadPdfButton = document.getElementById('download-pdf');
    // Handle form submission
    form.addEventListener('submit', function (event) {
        var _a;
        event.preventDefault(); // Prevent page reload
        // Collect input values
        var username = document.getElementById('username').value;
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('education').value;
        var experience = document.getElementById('experience').value;
        var skills = document.getElementById('skills').value;
        // Save form data in localStorage with the username as the key
        var resumeData = {
            name: name,
            email: email,
            phone: phone,
            education: education,
            experience: experience,
            skills: skills,
        };
        localStorage.setItem(username, JSON.stringify(resumeData)); // Save data locally
        // Handle image upload if any
        var imageFile = (_a = imageInputElement.files) === null || _a === void 0 ? void 0 : _a[0];
        if (imageFile) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                var imageDataURL = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                // Generate the resume content dynamically with the uploaded image
                var resumeHTML = "\n                    <h2>Editable Resume</h2>\n                    <img src=\"".concat(imageDataURL, "\" alt=\"Uploaded Image\" style=\"width: 150px; height: 150px; border-radius: 50%;\">\n                    <h3>Personal Information</h3>\n                    <p><b>Name:</b> <span contenteditable=\"true\">").concat(name, "</span></p>\n                    <p><b>Email:</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n                    <p><b>Phone:</b> <span contenteditable=\"true\">").concat(phone, "</span></p>\n                    <h3>Education</h3>\n                    <p contenteditable=\"true\">").concat(education, "</p>\n                    <h3>Experience</h3>\n                    <p contenteditable=\"true\">").concat(experience, "</p>\n                    <h3>Skills</h3>\n                    <p contenteditable=\"true\">").concat(skills, "</p>\n                ");
                // Display the generated resume with image
                resumeDisplayElement.innerHTML = resumeHTML;
                // Generate the shareable URL
                var shareableURL = "http://127.0.0.1:5501/?username=Beautyofnature".concat(encodeURIComponent(username));
                shareableLinkContainer.style.display = 'block'; // Show the link container
                shareableLinkElement.href = shareableURL; // Set the href attribute
                shareableLinkElement.textContent = shareableURL; // Display the URL text
            };
            reader.readAsDataURL(imageFile); // Trigger the file reader to convert the image to DataURL
        }
        else {
            // If no image is uploaded, generate resume without image
            var resumeHTML = "\n                <h2>Editable Resume</h2>\n                <h3>Personal Information</h3>\n                <p><b>Name:</b> <span contenteditable=\"true\">".concat(name, "</span></p>\n                <p><b>Email:</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n                <p><b>Phone:</b> <span contenteditable=\"true\">").concat(phone, "</span></p>\n                <h3>Education</h3>\n                <p contenteditable=\"true\">").concat(education, "</p>\n                <h3>Experience</h3>\n                <p contenteditable=\"true\">").concat(experience, "</p>\n                <h3>Skills</h3>\n                <p contenteditable=\"true\">").concat(skills, "</p>\n            ");
            resumeDisplayElement.innerHTML = resumeHTML;
            // Generate the shareable URL
            var shareableURL = "http://127.0.0.1:5501/?username=Beautyofnature".concat(encodeURIComponent(username));
            shareableLinkContainer.style.display = 'block'; // Show the link container
            shareableLinkElement.href = shareableURL; // Set the href attribute
            shareableLinkElement.textContent = shareableURL; // Display the URL text
        }
    });
    // Handle PDF download
    downloadPdfButton.addEventListener('click', function () {
        window.print(); // This will open the print dialog and allow the user to save as PDF
    });
    // Prefill the form based on the username in the URL
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});

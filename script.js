let sections=document.querySelectorAll('section');
let navlinks=document.querySelectorAll('header nav a');
console.log(sections);
// sections.forEach(sec =>{
//     let id=sec.getAttribute('id')
//     console.log(id);
// } );
let cv=document.querySelector('#cv');
window.onscroll=()=>{
    sections.forEach(sec =>{
        let top=window.scrollY;
        console.log("top is"+top);
        let offset=sec.offsetTop-100;
        console.log("offset is"+offset);
        let height=sec.offsetHeight;
        console.log("height is"+height);
        let id=sec.getAttribute('id')
        console.log(id);
        if(top>=offset && top< offset+height)
        {
            navlinks.forEach(links=>{
                links.classList.remove('active');
                document.querySelector('header nav a[href*='+id+']').classList.add('active');
            })
        }
    });
}
// cv.addEventListener('click',()=>{
//     // console.log("button was clicked");
//     window.open('https://drive.google.com/file/d/1dmNK_qXr2Im4D4KgUbvBEy3FcMWt9mQA/view?usp=sharing', '_blank');
// })

//const cv = document.getElementById("cv");

cv.addEventListener("click", () => {
    window.open("photo/enhComRes.pdf", "_blank");
});




// Select elements
const menuButton = document.querySelector('#manu');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');

// Toggle the navbar visibility on menu button click
menuButton.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Hide the navbar when a navigation link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

emailjs.init('DYgE0Qf1sCF2HopNF'); // Keep your actual User ID

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validate form inputs
    if (!validateForm()) {
        return;
    }

    // Show loading state
    const submitBtn = document.querySelector('#contactForm input[type="submit"]');
    const originalBtnText = submitBtn.value;
    submitBtn.value = 'Sending...';
    submitBtn.disabled = true;

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phno').value,
        email: document.getElementById('e-mail').value,
        message: document.getElementById('message').value,
        date: new Date().toLocaleString()
    };

    // Send email using EmailJS
    emailjs.send('service_o9k44tu', 'template_wm0m2x3', formData)
        .then(function(response) {
            console.log('Email sent successfully!', response);
            showAlert('Message sent successfully!', 'success');
            document.getElementById('contactForm').reset();
        }, function(error) {
            console.error('Failed to send email:', error);
            showAlert('Failed to send message. Please try again later.', 'error');
        })
        .finally(() => {
            submitBtn.value = originalBtnText;
            submitBtn.disabled = false;
        });
});

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('e-mail').value.trim();
    const message = document.getElementById('message').value.trim();
    const phone = document.getElementById('phno').value.trim();
    
    if (!name) {
        showAlert('Please enter your name', 'error');
        return false;
    }
    
    if (!email) {
        showAlert('Please enter your email', 'error');
        return false;
    } else if (!validateEmail(email)) {
        showAlert('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!message) {
        showAlert('Please enter your message', 'error');
        return false;
    }
    if (!phone) {
        showAlert('Please enter your PhoneNo', 'error');
        return false;
    }
    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showAlert(message, type) {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.form-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `form-alert ${type}`;
    alert.textContent = message;
    
    // Insert before form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alert, form);
    
    // Remove after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}
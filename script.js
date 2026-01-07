// Feedback Form Submission
function submitFeedback() {
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const category = document.getElementById('category').value;
    const rating = document.getElementById('rating').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields (Name, Email, and Feedback).');
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Create feedback object
    const feedback = {
        name: name,
        email: email,
        category: category,
        rating: rating,
        message: message,
        timestamp: new Date().toISOString()
    };

    // Store feedback in localStorage
    let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
    feedbackList.push(feedback);
    localStorage.setItem('feedbackList', JSON.stringify(feedbackList));

    // Show success message
    document.getElementById('successMessage').style.display = 'block';

    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('category').value = '';
    document.getElementById('rating').value = '';
    document.getElementById('message').value = '';

    // Hide success message after 5 seconds
    setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
    }, 5000);

    // Log to console (for development)
    console.log('Feedback submitted:', feedback);
    console.log('All feedback:', feedbackList);
}

// Optional: Function to retrieve all feedback (for admin panel)
function getAllFeedback() {
    return JSON.parse(localStorage.getItem('feedbackList')) || [];
}
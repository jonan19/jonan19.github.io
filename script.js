// ===== FEEDBACK FORM SUBMISSION =====
function submitFeedback() {
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const userType = document.getElementById('userType').value;
    const category = document.getElementById('category').value;
    const message = document.getElementById('message').value.trim();
    const anonymous = document.getElementById('anonymous').checked;
    
    // Get selected rating
    const ratingInputs = document.getElementsByName('rating');
    let rating = '';
    for (const input of ratingInputs) {
        if (input.checked) {
            rating = input.value;
            break;
        }
    }

    // Validation
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

    // Message length validation
    if (message.length < 20) {
        alert('Please provide at least 20 characters in your feedback.');
        return;
    }

    // User type validation
    if (!userType) {
        alert('Please select your role.');
        return;
    }

    // Category validation
    if (!category) {
        alert('Please select a feedback category.');
        return;
    }

    // Rating validation
    if (!rating) {
        alert('Please select a rating.');
        return;
    }

    // Create feedback object
    const feedback = {
        name: anonymous ? 'Anonymous' : name,
        email: email,
        phone: phone,
        userType: userType,
        category: category,
        rating: rating,
        message: message,
        anonymous: anonymous,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };

    // Store feedback
    let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
    feedbackList.push(feedback);
    localStorage.setItem('feedbackList', JSON.stringify(feedbackList));

    // Show success message
    document.getElementById('successMessage').style.display = 'block';

    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('userType').value = '';
    document.getElementById('category').value = '';
    document.getElementById('message').value = '';
    document.getElementById('anonymous').checked = false;
    
    // Uncheck all rating radio buttons
    for (const input of ratingInputs) {
        input.checked = false;
    }

    // Scroll to success message
    document.getElementById('successMessage').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });

    // Hide success message after 8 seconds
    setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
    }, 8000);

    // Log to console
    console.log('Feedback submitted:', feedback);
}

// ===== QUICK CONTACT MESSAGE =====
function sendQuickMessage() {
    const name = document.getElementById('quick-name').value.trim();
    const email = document.getElementById('quick-email').value.trim();
    const subject = document.getElementById('quick-subject').value.trim();
    const message = document.getElementById('quick-message').value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Create message object
    const contactMessage = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };

    // Store message
    let messageList = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messageList.push(contactMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messageList));

    // Show success message
    document.getElementById('quickMessageSuccess').style.display = 'block';

    // Clear form
    document.getElementById('quick-name').value = '';
    document.getElementById('quick-email').value = '';
    document.getElementById('quick-subject').value = '';
    document.getElementById('quick-message').value = '';

    // Scroll to success message
    document.getElementById('quickMessageSuccess').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
        document.getElementById('quickMessageSuccess').style.display = 'none';
    }, 5000);

    console.log('Contact message sent:', contactMessage);
}

// ===== UTILITY FUNCTIONS =====

// Get all feedback (for admin use)
function getAllFeedback() {
    return JSON.parse(localStorage.getItem('feedbackList')) || [];
}

// Get all contact messages (for admin use)
function getAllContactMessages() {
    return JSON.parse(localStorage.getItem('contactMessages')) || [];
}

// Clear all feedback (for admin use)
function clearAllFeedback() {
    if (confirm('Are you sure you want to clear all feedback?')) {
        localStorage.removeItem('feedbackList');
        console.log('All feedback cleared');
    }
}

// Clear all contact messages (for admin use)
function clearAllContactMessages() {
    if (confirm('Are you sure you want to clear all contact messages?')) {
        localStorage.removeItem('contactMessages');
        console.log('All contact messages cleared');
    }
}

// Export feedback as JSON (for admin use)
function exportFeedbackAsJSON() {
    const feedback = getAllFeedback();
    const dataStr = JSON.stringify(feedback, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'feedback_export.json';
    link.click();
    console.log('Feedback exported');
}

// Show feedback statistics (for admin use)
function showFeedbackStats() {
    const feedback = getAllFeedback();
    const stats = {
        total: feedback.length,
        byCategory: {},
        byRating: {},
        byUserType: {},
        anonymous: feedback.filter(f => f.anonymous).length
    };
    
    feedback.forEach(f => {
        stats.byCategory[f.category] = (stats.byCategory[f.category] || 0) + 1;
        stats.byRating[f.rating] = (stats.byRating[f.rating] || 0) + 1;
        stats.byUserType[f.userType] = (stats.byUserType[f.userType] || 0) + 1;
    });
    
    console.log('Feedback Statistics:', stats);
    return stats;
}

// ===== SMOOTH SCROLL FOR INTERNAL LINKS =====
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll to all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

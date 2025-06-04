// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed

$(document).ready(function() {
  AOS.init( {
    // uncomment below for on-scroll animations to played only once
    // once: true  
  }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});

function calculateAge(birthDate) {
    // Convert the birthDate string into a Date object
    const birth = new Date(birthDate);

    // Get the current date
    const today = new Date();

    // Calculate the initial age difference in years
    let age = today.getFullYear() - birth.getFullYear();

    // Calculate the difference in months
    const monthDiff = today.getMonth() - birth.getMonth();

    // Calculate the difference in days within the month
    const dayDiff = today.getDate() - birth.getDate();

    // If the birth month hasn't occurred yet this year, or if it's the birth month
    // but the birthday hasn't happened yet, subtract one from the age
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age; // Return the calculated age
}

// Example usage:
// Replace "YYYY-MM-DD" with your actual birthdate
const myBirthDate = "1994-03-18"; 
console.log("Your age is:", calculateAge(myBirthDate));
document.getElementById("ageDisplay").textContent = calculateAge(myBirthDate);

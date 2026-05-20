document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load

  // Active Link Highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-links a');
  
  navItems.forEach(item => {
    const linkPage = item.getAttribute('href');
    if (linkPage === currentPage) {
      item.classList.add('active');
    }
  });

  // Modals for Departments
  const modalBtns = document.querySelectorAll('.open-modal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.querySelector('.modal-close');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  if (modalBtns.length > 0 && modalOverlay && modalClose && modalTitle && modalBody) {
    modalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const dept = btn.getAttribute('data-dept');
        
        // Mock data for departments
        const deptData = {
          civil: { 
            title: 'Civil Engineering', 
            desc: 'The Civil Engineering department focuses on building infrastructure, structural design, and modern construction techniques. Established with standard laboratory testing equipment, we prepare highly qualified engineering technicians to meet local and global requirements.' 
          },
          mech: { 
            title: 'Mechanical Engineering', 
            desc: 'Mechanical Engineering blends physics and mathematics with materials science. Students learn standard principles of thermodynamics, robotics, machine design, and advanced manufacturing technologies through extensive lab sessions.' 
          },
          eee: { 
            title: 'Electrical & Electronics Engineering', 
            desc: 'The EEE department specializes in power systems, electrical machinery, automation, control engineering, and green energy technologies. Hands-on experience with modern equipment ensures our graduates excel.' 
          },
          ece: { 
            title: 'Electronics Engineering', 
            desc: 'Electronics Engineering covers communications, microprocessors, signal processing, and embedded systems. Students gain expertise in circuit design, troubleshooting, and programming for industry applications.' 
          }
        };

        if (deptData[dept]) {
          modalTitle.textContent = deptData[dept].title;
          modalBody.textContent = deptData[dept].desc;
          modalOverlay.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
      });
    });

    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Filter System for News/Events
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('.filter-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        filterItems.forEach(item => {
          if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');

      // Simple validation
      if (!name || name.value.trim() === '') {
        if(name) showError(name, 'Name is required');
        isValid = false;
      } else {
        removeError(name);
      }

      if (!email || email.value.trim() === '') {
        if(email) showError(email, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
      } else {
        removeError(email);
      }

      if (!subject || subject.value.trim() === '') {
        if(subject) showError(subject, 'Subject is required');
        isValid = false;
      } else {
        removeError(subject);
      }

      if (!message || message.value.trim() === '') {
        if(message) showError(message, 'Message is required');
        isValid = false;
      } else {
        removeError(message);
      }

      if (isValid) {
        // Mock submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = 'Message Sent Successfully!';
          submitBtn.style.backgroundColor = '#28a745';
          
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
          }, 3000);
        }, 1500);
      }
    });

    function showError(input, message) {
      const formGroup = input.parentElement;
      const errorDiv = formGroup.querySelector('.error-msg');
      if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
      }
      input.style.borderColor = 'red';
    }

    function removeError(input) {
      const formGroup = input.parentElement;
      const errorDiv = formGroup.querySelector('.error-msg');
      if (errorDiv) {
        errorDiv.style.display = 'none';
      }
      input.style.borderColor = '';
    }

    function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
});

// Cursor
const cursor = document.getElementById('cursor');
const follower = document.getElementById('follower');
const glow = document.getElementById('cursor-glow');
let mx = 0, my = 0, fx = 0, fy = 0, gx = 0, gy = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});

function animateFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.transform = `translate(${fx - 18}px, ${fy - 18}px)`;
  
  gx += (mx - gx) * 0.04;
  gy += (my - gy) * 0.04;
  if (glow) glow.style.transform = `translate(${gx - 250}px, ${gy - 250}px)`;

  requestAnimationFrame(animateFollower);
}
animateFollower();

// Scroll Reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
});
reveals.forEach(el => observer.observe(el));

// Enhanced Button Interactions
const buttons = document.querySelectorAll('.btn-primary, .btn-outline');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s ease-out';
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => ripple.remove(), 600);
    
    // Button click feedback
    this.style.transform = 'scale(0.98)';
    setTimeout(() => {
      this.style.transform = '';
    }, 100);
  });

  // Hover feedback
  button.addEventListener('mouseenter', function() {
    this.style.letterSpacing = '0.18em';
  });

  button.addEventListener('mouseleave', function() {
    this.style.letterSpacing = '0.12em';
  });
});

// Download button special effect
const downloadBtn = document.querySelector('a[download]');
if(downloadBtn) {
  downloadBtn.addEventListener('click', function() {
    // Show success message
    const originalText = this.textContent;
    this.textContent = '✓ CV Loading...';
    setTimeout(() => {
      this.textContent = originalText;
    }, 2000);
  });
}

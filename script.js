document.addEventListener('DOMContentLoaded', function() {
    // Menu mobilne
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Efekt przewijania dla linków nawigacji
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('cta-button')) {
                // Dla przycisków CTA, przewiń natychmiast
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                // Dla linków nawigacji, zamknij menu mobilne najpierw
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
                
                setTimeout(() => {
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });

    // Efekt scrollu nagłówka
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animacja liczników
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(number => {
            observer.observe(number);
        });
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // Animation duration in ms
        const step = Math.ceil(target / (duration / 16)); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            element.textContent = current;
        }, 16);
    }

    // Animacja elementów czasu
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }

    // Efekty hover obrazów
    const images = document.querySelectorAll('.about-img, .future-img, .hero-img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.5s ease';
        });
    });

    // Podanie formularza
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Symulacja wysyłania formularza
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Wysyłanie...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'Wysłano!';
                
                // Resetowanie formularza
                setTimeout(() => {
                    this.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Pokaż komunikat sukcesu
                    alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
                }, 1500);
            }, 2000);
        });
    }

    // Animacja kropek
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.style.animationDelay = `${index * 2}s`;
    });

    // Animacja na load
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);

    // funkcja quizu
    const submitButton = document.getElementById('submit-quiz');
    const quizResult = document.getElementById('quiz-result');

    // odpowiedzi poprawne
    const correctAnswers = {
        q1: 'a',
        q2: 'a',
        q3: 'a',
        q4: 'a',
        q5: 'a',
        q6: 'a',
        q7: 'a',
        q8: 'a',
        q9: 'a',
        q10: 'a'
    };

    submitButton.addEventListener('click', function() {
        let score = 0;
        let totalQuestions = Object.keys(correctAnswers).length;
        let answeredQuestions = 0;

        // sprawdzenie każdego pytania
        for (let i = 1; i <= totalQuestions; i++) {
            const questionName = 'q' + i;
            const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
            
            if (selectedAnswer) {
                answeredQuestions++;
                if (selectedAnswer.value === correctAnswers[questionName]) {
                    score++;
                }
            }
        }

        // pokazanie wyniku
        if (answeredQuestions < totalQuestions) {
            quizResult.textContent = 'Proszę odpowiedzieć na wszystkie pytania!';
            quizResult.className = 'quiz-result error';
        } else {
            const percentage = (score / totalQuestions) * 100;
            let message = '';
            
            if (percentage >= 80) {
                message = `Gratulacje! Uzyskałeś ${score}/${totalQuestions} punktów (${percentage}%) - świetna znajomość tematu!`;
                quizResult.className = 'quiz-result success';
            } else if (percentage >= 50) {
                message = `Uzyskałeś ${score}/${totalQuestions} punktów (${percentage}%) - dobry wynik!`;
                quizResult.className = 'quiz-result success';
            } else {
                message = `Uzyskałeś ${score}/${totalQuestions} punktów (${percentage}%) - spróbuj jeszcze raz!`;
                quizResult.className = 'quiz-result error';
            }
            
            quizResult.textContent = message;
        }
    });
});

// funkcja preloadera
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    
    // Dodanie klasy fade-out do preloadera
    preloader.classList.add('fade-out');
    
    // Koniec preloadera
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 990);
});

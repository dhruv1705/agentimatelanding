document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting animations');
    
    // Check if anime.js is loaded
    if (typeof anime === 'undefined') {
        console.error('anime.js is not loaded. Please check the library path.');
        // Try to load it dynamically if not available
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
        script.onload = initAnimations;
        document.head.appendChild(script);
    } else {
        console.log('anime.js is loaded successfully');
        initAnimations();
    }
    
    function initAnimations() {
        console.log('Initializing animations');
        
        // Animate the background shapes
        anime({
            targets: '.shape',
            translateX: function() { return anime.random(-15, 15) + 'px'; },
            translateY: function() { return anime.random(-15, 15) + 'px'; },
            rotate: function() { return anime.random(-10, 10) + 'deg'; },
            scale: function() { return 0.9 + anime.random(0, 0.2); },
            duration: 3000,
            easing: 'easeInOutQuad',
            direction: 'alternate',
            loop: true
        });

        // Animate the heading with a typing effect
        const h1Text = document.querySelector('h1').textContent;
        document.querySelector('h1').innerHTML = '';
        
        const h1 = document.querySelector('h1');
        for (let i = 0; i < h1Text.length; i++) {
            const span = document.createElement('span');
            span.textContent = h1Text[i];
            span.style.opacity = '0';
            h1.appendChild(span);
        }

        anime({
            targets: 'h1 span',
            opacity: 1,
            duration: 50,
            easing: 'linear',
            delay: anime.stagger(70)
        });

        // Animate the button
        anime({
            targets: '.gradient-btn',
            scale: [0.9, 1],
            opacity: [0, 1],
            duration: 1000,
            delay: 1500,
            easing: 'easeOutElastic(1, .5)'
        });

        // Create fireflies animation
        const firefliesContainer = document.getElementById('fireflies-animation');
        console.log('Fireflies container:', firefliesContainer);
        
        if (!firefliesContainer) {
            console.error('Fireflies container not found');
            return;
        }
        
        // Clear any existing fireflies
        firefliesContainer.innerHTML = '';
        
        const firefliesCount = 30;
        
        // Create fireflies
        for (let i = 0; i < firefliesCount; i++) {
            const firefly = document.createElement('div');
            firefly.classList.add('firefly');
            firefly.style.opacity = 0;
            
            // Random initial position
            firefly.style.left = anime.random(0, 100) + '%';
            firefly.style.top = anime.random(0, 100) + '%';
            
            // Random size
            const size = anime.random(2, 6);
            firefly.style.width = size + 'px';
            firefly.style.height = size + 'px';
            
            firefliesContainer.appendChild(firefly);
        }
        
        console.log(`Created ${firefliesCount} fireflies`);
        
        // Animate each firefly with more visible properties
        anime({
            targets: '.firefly',
            opacity: [0, 1, 0],
            scale: [0.8, 1.8, 0.8],
            translateX: () => anime.random(-20, 20) + 'px',
            translateY: () => anime.random(-20, 20) + 'px',
            backgroundColor: [
                'rgba(255, 255, 255, 0.8)',
                'rgba(255, 182, 193, 0.8)',
                'rgba(173, 216, 230, 0.8)',
                'rgba(255, 255, 255, 0.8)'
            ],
            delay: anime.stagger(100),
            duration: () => anime.random(2000, 4000),
            easing: 'easeInOutSine',
            loop: true,
            direction: 'alternate',
            complete: function(anim) {
                console.log('Firefly animation completed');
            }
        });
        
        // Store card animations for reference and to pause them when needed
        let currentCardAnimation = null;
        const animationContainer = document.querySelector('.animation-container');
        
        // Card animation functions based on text prompts
        const cardAnimations = {
            "float": () => {
                if (currentCardAnimation) currentCardAnimation.pause();
                currentCardAnimation = anime({
                    targets: '.animation-container',
                    translateY: ['0px', '-10px', '0px'],
                    duration: 3000,
                    easing: 'easeInOutSine',
                    loop: true,
                    direction: 'alternate'
                });
            },
            "rotate": () => {
                if (currentCardAnimation) currentCardAnimation.pause();
                currentCardAnimation = anime({
                    targets: '.animation-container',
                    rotate: ['0deg', '2deg', '-2deg', '0deg'],
                    duration: 6000,
                    easing: 'easeInOutSine',
                    loop: true
                });
            },
            "size": () => {
                if (currentCardAnimation) currentCardAnimation.pause();
                currentCardAnimation = anime({
                    targets: '.animation-container',
                    scale: [1, 0.9, 1],
                    duration: 3000,
                    easing: 'easeInOutQuad',
                    loop: true
                });
            },
            "bounce": () => {
                if (currentCardAnimation) currentCardAnimation.pause();
                // Set initial state
                anime.set('.animation-container', {
                    translateY: 0
                });
                currentCardAnimation = anime({
                    targets: '.animation-container',
                    translateY: [0, -15, 0, -7, 0, -3, 0],
                    duration: 1200,
                    easing: 'easeInOutElastic(1.5, 0.5)',
                    loop: true,
                    delay: 500
                });
            },
            "color": () => {
                if (currentCardAnimation) currentCardAnimation.pause();
                // Reset background to initial gradient
                document.querySelector('.animation-container').style.background = '';
                
                currentCardAnimation = anime({
                    targets: '.animation-container',
                    background: [
                        'linear-gradient(135deg, rgba(255, 105, 180, 0.2), rgba(100, 149, 237, 0.2))',
                        'linear-gradient(135deg, rgba(100, 149, 237, 0.3), rgba(144, 238, 144, 0.2))',
                        'linear-gradient(135deg, rgba(255, 165, 0, 0.2), rgba(255, 99, 71, 0.2))',
                        'linear-gradient(135deg, rgba(138, 43, 226, 0.2), rgba(75, 0, 130, 0.2))',
                        'linear-gradient(135deg, rgba(255, 105, 180, 0.2), rgba(100, 149, 237, 0.2))'
                    ],
                    duration: 8000,
                    easing: 'easeInOutSine',
                    loop: true
                });
            },
            "sparkle": () => {
                if (currentCardAnimation) currentCardAnimation.pause();
                
                // Clear existing sparkles
                const existingSparkles = document.querySelectorAll('.sparkle');
                existingSparkles.forEach(sparkle => sparkle.remove());
                
                // Create sparkles
                for (let i = 0; i < 15; i++) {
                    const sparkle = document.createElement('div');
                    sparkle.classList.add('sparkle');
                    sparkle.style.position = 'absolute';
                    sparkle.style.width = anime.random(3, 6) + 'px';
                    sparkle.style.height = sparkle.style.width;
                    sparkle.style.borderRadius = '50%';
                    sparkle.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                    sparkle.style.boxShadow = '0 0 8px 2px rgba(255, 255, 255, 0.8)';
                    sparkle.style.opacity = 0;
                    sparkle.style.top = anime.random(0, 100) + '%';
                    sparkle.style.left = anime.random(0, 100) + '%';
                    
                    animationContainer.appendChild(sparkle);
                }
                
                currentCardAnimation = anime({
                    targets: '.sparkle',
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    delay: anime.stagger(200, {grid: [5, 3], from: 'center'}),
                    duration: function() { return anime.random(1000, 2000); },
                    easing: 'easeOutCubic',
                    loop: true
                });
            }
        };

        // Setup cycling text for input field with typing animation
        const inputField = document.querySelector('.input-field');
        const textSpan = inputField.querySelector('span:first-child');
        const cursor = inputField.querySelector('.cursor');
        
        const textPrompts = [
            "Now float it gently...",
            "Now rotate it slowly...",
            "Now reduce the size...",
            "Now make it bounce...",
            "Now change the color...",
            "Now make it sparkle..."
        ];
        
        let currentTextIndex = 0;
        let typingAnimation = null;
        let deletingAnimation = null;
        let isAnimating = false;
        
        // Function to create typing animation
        function typeText(text) {
            // Create a container for the characters
            const container = document.createElement('div');
            container.style.display = 'inline-block';
            container.style.position = 'relative';
            container.style.whiteSpace = 'pre';
            
            // Split text into individual span elements
            for (let i = 0; i < text.length; i++) {
                const charSpan = document.createElement('span');
                
                // Handle spaces properly
                if (text[i] === ' ') {
                    charSpan.innerHTML = '&nbsp;';
                    charSpan.style.marginRight = '4px'; // Add extra space between words
                } else {
                    charSpan.textContent = text[i];
                }
                
                charSpan.style.opacity = 0;
                charSpan.style.display = 'inline-block';
                container.appendChild(charSpan);
            }
            
            // Replace the text span content with our new container
            textSpan.textContent = '';
            textSpan.appendChild(container);
            
            // Get all the character spans
            const charSpans = Array.from(container.querySelectorAll('span'));
            
            // Animate each character
            typingAnimation = anime({
                targets: charSpans,
                opacity: 1,
                duration: 40,
                easing: 'linear',
                delay: anime.stagger(40),
                complete: function() {
                    // Apply the corresponding animation to the card based on current text
                    applyCardAnimation(textPrompts[currentTextIndex]);
                    
                    // Wait longer before starting deletion
                    setTimeout(() => {
                        deleteText();
                    }, 5000);
                }
            });
        }
        
        // Function to apply animation to the card based on the current text
        function applyCardAnimation(text) {
            if (text.includes("float")) {
                cardAnimations.float();
            } else if (text.includes("rotate")) {
                cardAnimations.rotate();
            } else if (text.includes("size")) {
                cardAnimations.size();
            } else if (text.includes("bounce")) {
                cardAnimations.bounce();
            } else if (text.includes("color")) {
                cardAnimations.color();
            } else if (text.includes("sparkle")) {
                cardAnimations.sparkle();
            }
        }
        
        // Function to create deletion animation
        function deleteText() {
            const container = textSpan.querySelector('div');
            if (!container) {
                nextPrompt();
                return;
            }
            
            const charSpans = Array.from(container.querySelectorAll('span'));
            
            if (charSpans.length === 0) {
                nextPrompt();
                return;
            }
            
            // Animate deletion from end to start
            deletingAnimation = anime({
                targets: charSpans.reverse(),
                opacity: 0,
                duration: 30,
                easing: 'easeInQuad',
                delay: anime.stagger(25),
                complete: function() {
                    if (container && container.parentNode) {
                        container.parentNode.removeChild(container);
                    }
                    nextPrompt();
                }
            });
        }
        
        // Function to go to the next prompt
        function nextPrompt() {
            currentTextIndex = (currentTextIndex + 1) % textPrompts.length;
            typeText(textPrompts[currentTextIndex]);
        }
        
        // Start the animation
        typeText(textPrompts[currentTextIndex]);

        // Animated input cursor effect
        anime({
            targets: cursor,
            opacity: [0, 1],
            duration: 600,
            easing: 'linear',
            loop: true
        });

        // Initialize Starlings animation inspired by timeline-refresh-starlings example
        const starlingsContainer = document.getElementById('starlings-animation');
        let starlingsAnimation = null;

        // Create starlings animation
        function createStarlings() {
            if (!starlingsContainer) return;
            
            // Clear container
            starlingsContainer.innerHTML = '';
            
            // Create a grid of starlings
            const gridSize = { x: 12, y: 8 };
            const starlingCount = gridSize.x * gridSize.y;
            const containerWidth = starlingsContainer.offsetWidth;
            const containerHeight = starlingsContainer.offsetHeight;
            const spacing = {
                x: containerWidth / (gridSize.x + 1),
                y: containerHeight / (gridSize.y + 1)
            };
            
            // Shape definitions - each one is a collection of points
            const shapes = [
                // Circle
                Array(starlingCount).fill().map((_, i) => {
                    const radius = Math.min(containerWidth, containerHeight) * 0.3;
                    const angle = (i / starlingCount) * Math.PI * 2;
                    const centerX = containerWidth / 2;
                    const centerY = containerHeight / 2;
                    return {
                        x: centerX + Math.cos(angle) * radius,
                        y: centerY + Math.sin(angle) * radius
                    };
                }),
                // Heart shape
                Array(starlingCount).fill().map((_, i) => {
                    const t = (i / starlingCount) * Math.PI * 2;
                    const scale = 0.25 * Math.min(containerWidth, containerHeight);
                    const centerX = containerWidth / 2;
                    const centerY = containerHeight / 2;
                    // Heart parametric equation
                    return {
                        x: centerX + 16 * Math.sin(t) * Math.sin(t) * Math.sin(t) * scale / 16,
                        y: centerY - (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * scale / 16
                    };
                }),
                // Grid layout
                Array(starlingCount).fill().map((_, i) => {
                    const row = Math.floor(i / gridSize.x);
                    const col = i % gridSize.x;
                    return {
                        x: (col + 1) * spacing.x,
                        y: (row + 1) * spacing.y
                    };
                }),
                // Random positions
                Array(starlingCount).fill().map(() => {
                    return {
                        x: anime.random(0, containerWidth),
                        y: anime.random(0, containerHeight)
                    };
                }),
                // Spiral
                Array(starlingCount).fill().map((_, i) => {
                    const angle = 0.2 * i;
                    const radius = 2 * angle;
                    const normalizedRadius = radius * Math.min(containerWidth, containerHeight) / 60;
                    const centerX = containerWidth / 2;
                    const centerY = containerHeight / 2;
                    return {
                        x: centerX + Math.cos(angle) * normalizedRadius,
                        y: centerY + Math.sin(angle) * normalizedRadius
                    };
                })
            ];
            
            // Create starlings
            const starlings = [];
            const colors = ['#FF69B4', '#6495ED', '#FF6EC7', '#9787FF'];
            
            for (let i = 0; i < starlingCount; i++) {
                const starling = document.createElement('div');
                starling.classList.add('starling');
                // Random size between 6 and 10px
                const size = anime.random(6, 10);
                starling.style.width = `${size}px`;
                starling.style.height = `${size}px`;
                // Random initial position
                starling.style.left = anime.random(0, containerWidth) + 'px';
                starling.style.top = anime.random(0, containerHeight) + 'px';
                // Random color from our palette
                starling.style.backgroundColor = colors[anime.random(0, colors.length - 1)];
                // Add a glow effect
                starling.style.boxShadow = `0 0 ${size * 1.5}px ${starling.style.backgroundColor}`;
                starling.style.opacity = '0';
                starlingsContainer.appendChild(starling);
                starlings.push(starling);
            }
            
            // Create timeline animation with auto-loop
            starlingsAnimation = anime.timeline({
                easing: 'easeOutExpo',
                duration: 900,
                loop: true,
                complete: function() {
                    // Animation will automatically restart due to loop: true
                }
            });
            
            // Initial animation to bring all starlings into view
            starlingsAnimation
                .add({
                    targets: starlings,
                    opacity: [0, 1],
                    scale: [0, 1],
                    delay: anime.stagger(15, {from: 'center'}),
                    duration: 600
                })
                // First shape - Circle
                .add({
                    targets: starlings,
                    left: (el, i) => shapes[0][i].x + 'px',
                    top: (el, i) => shapes[0][i].y + 'px',
                    scale: 1,
                    delay: anime.stagger(20, {from: 'center', grid: [gridSize.x, gridSize.y]}),
                    duration: 1200
                })
                // Second shape - Heart
                .add({
                    targets: starlings,
                    left: (el, i) => shapes[1][i].x + 'px',
                    top: (el, i) => shapes[1][i].y + 'px',
                    delay: anime.stagger(20, {from: 'last'}),
                    duration: 1200
                })
                // Third shape - Grid
                .add({
                    targets: starlings,
                    left: (el, i) => shapes[2][i].x + 'px',
                    top: (el, i) => shapes[2][i].y + 'px',
                    delay: anime.stagger(15, {from: 'center', grid: [gridSize.x, gridSize.y]}),
                    easing: 'spring(1, 100, 12, 0)',
                    duration: 1000
                })
                // Fourth shape - Random dispersion
                .add({
                    targets: starlings,
                    left: (el, i) => shapes[3][i].x + 'px',
                    top: (el, i) => shapes[3][i].y + 'px',
                    scale: anime.random(0.8, 1.2),
                    delay: anime.stagger(5),
                    duration: 1000
                })
                // Fifth shape - Spiral
                .add({
                    targets: starlings,
                    left: (el, i) => shapes[4][i].x + 'px',
                    top: (el, i) => shapes[4][i].y + 'px',
                    scale: 1,
                    delay: anime.stagger(30, {from: 'center'}),
                    easing: 'easeInOutQuad',
                    duration: 1500
                });
                
            // Start playing animation - will loop automatically
            starlingsAnimation.play();
            
            return starlingsAnimation;
        }
        
        // Initialize starlings animation on page load
        createStarlings();
        
        // Hover effects for interactive elements
        document.querySelector('.gradient-btn').addEventListener('mouseenter', () => {
            anime({
                targets: '.gradient-btn',
                scale: 1.05,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        document.querySelector('.gradient-btn').addEventListener('mouseleave', () => {
            anime({
                targets: '.gradient-btn',
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        // Add hover effect for the view button
        document.querySelector('.view-btn').addEventListener('mouseenter', () => {
            anime({
                targets: '.view-btn',
                scale: 1.05,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        document.querySelector('.view-btn').addEventListener('mouseleave', () => {
            anime({
                targets: '.view-btn',
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        // Animate testimonials with a staggered entrance
        const testimonials = document.querySelectorAll('.testimonial');
        if (testimonials.length > 0) {
            anime({
                targets: testimonials,
                translateY: [50, 0],
                opacity: [0, 1],
                delay: anime.stagger(200),
                duration: 1200,
                easing: 'easeOutElastic(1, .8)',
                complete: function() {
                    // Add subtle hover animation
                    testimonials.forEach(testimonial => {
                        testimonial.addEventListener('mouseenter', () => {
                            anime({
                                targets: testimonial.querySelector('.avatar'),
                                scale: [1, 1.15],
                                duration: 500,
                                easing: 'easeOutElastic(1, .8)'
                            });
                        });
                        
                        testimonial.addEventListener('mouseleave', () => {
                            anime({
                                targets: testimonial.querySelector('.avatar'),
                                scale: [1.15, 1],
                                duration: 500,
                                easing: 'easeOutElastic(1, .8)'
                            });
                        });
                    });
                }
            });
        }
    }
}); 
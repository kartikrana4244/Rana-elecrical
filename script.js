/* ============================================
   Rana Electrical - JavaScript
   Interactive Features and Functionality
   ============================================ */

// Global error handler to prevent blank pages
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error, e.filename, e.lineno);
    // Prevent errors from breaking the page
    return true;
});

// ============================================
// Loading Screen
// ============================================
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(function() {
            loadingScreen.classList.add('hidden');
            document.body.classList.add('loaded');
        }, 800);
    } else {
        document.body.classList.add('loaded');
    }
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // ============================================
    // Contact Form Handling
    // ============================================
    try {
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !phone || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                showFormMessage('Please enter a valid phone number.', 'error');
                return;
            }
            
            // Simulate form submission (in production, this would send to a server)
            // For now, we'll just show a success message
            showFormMessage('Thank you for your message! We will contact you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Optional: In production, you would send the data to your server here
            // Example:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name, phone, message })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     showFormMessage('Thank you for your message! We will contact you soon.', 'success');
            //     contactForm.reset();
            // })
            // .catch(error => {
            //     showFormMessage('Sorry, there was an error. Please try again later.', 'error');
            // });
            });
        }
    } catch (error) {
        console.error('Error in contact form:', error);
    }
    
    // Function to show form messages
    function showFormMessage(message, type) {
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = 'form-message ' + type;
            
            // Hide message after 5 seconds
            setTimeout(function() {
                formMessage.className = 'form-message';
                formMessage.textContent = '';
            }, 5000);
        }
    }
    
    // ============================================
    // Smooth Scrolling for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ============================================
    // Sticky Navigation Background on Scroll
    // ============================================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ============================================
    // Premium Scroll Animations
    // ============================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections for smooth animations
    document.querySelectorAll('.feature-card, .service-card, .service-detail-card, .contact-item, .about-section').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(element);
    });
    
    // ============================================
    // Phone Number Formatting (Optional)
    // ============================================
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Remove all non-digit characters
            let value = e.target.value.replace(/\D/g, '');
            
            // Format as (XXX) XXX-XXXX if it's a US number
            // You can customize this based on your country's format
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = '(' + value;
                } else if (value.length <= 6) {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
                } else {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }
            
            e.target.value = value;
        });
    }
    
    // ============================================
    // Button Micro-interactions (Subtle)
    // ============================================
    // Removed excessive hover animations for cleaner feel
    
    // ============================================
    // Mobile Action Bar - Show/Hide on Scroll
    // ============================================
    const mobileActionBar = document.querySelector('.mobile-action-bar');
    let lastScrollTop = 0;
    
    if (mobileActionBar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down
                mobileActionBar.style.transform = 'translateY(100%)';
            } else {
                // Scrolling up
                mobileActionBar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // ============================================
    // Welcome Popup Modal - SIMPLIFIED VERSION
    // ============================================
    function initWelcomePopup() {
        const welcomePopup = document.getElementById('welcomePopup');
        const popupClose = document.getElementById('popupClose');
        const popupOverlay = document.querySelector('.popup-overlay');
        const popupServiceCards = document.querySelectorAll('.popup-service-card');
        
        if (!welcomePopup) {
            console.error('Welcome popup element not found!');
            return;
        }
        
        console.log('Welcome popup initialized');
        
        // Function to show the popup
        function showWelcomePopup() {
            console.log('Showing welcome popup');
            welcomePopup.classList.add('show');
            document.body.classList.add('popup-open');
            sessionStorage.setItem('welcomePopupShown', 'true');
        }
        
        // Function to close the popup
        function closeWelcomePopup() {
            console.log('Closing welcome popup');
            welcomePopup.classList.remove('show');
            document.body.classList.remove('popup-open');
        }
        
        // Check if popup was already shown
        const popupShown = sessionStorage.getItem('welcomePopupShown');
        
        // Show popup after loading screen (or after 2 seconds)
        if (!popupShown) {
            // Wait for loading screen to finish
            const loadingScreen = document.getElementById('loadingScreen');
            
            function showPopupAfterDelay() {
                setTimeout(function() {
                    if (!welcomePopup.classList.contains('show')) {
                        showWelcomePopup();
                    }
                }, 1500);
            }
            
            if (loadingScreen) {
                // Check if loading screen is hidden
                const checkInterval = setInterval(function() {
                    if (loadingScreen.classList.contains('hidden')) {
                        clearInterval(checkInterval);
                        showPopupAfterDelay();
                    }
                }, 100);
                
                // Fallback: show after 3 seconds regardless
                setTimeout(function() {
                    clearInterval(checkInterval);
                    if (!welcomePopup.classList.contains('show')) {
                        showWelcomePopup();
                    }
                }, 3000);
            } else {
                // No loading screen, show after 1.5 seconds
                showPopupAfterDelay();
            }
        }
        
        // Close popup when close button is clicked
        if (popupClose) {
            popupClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeWelcomePopup();
            });
        }
        
        // Close popup when overlay is clicked
        if (welcomePopup) {
            welcomePopup.addEventListener('click', function(e) {
                if (e.target === welcomePopup || e.target === popupOverlay) {
                    closeWelcomePopup();
                }
            });
            
            // Prevent clicks on popup content from closing
            const popupContent = document.querySelector('.popup-content');
            if (popupContent) {
                popupContent.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            }
        }
        
        // Close popup when Escape key is pressed
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && welcomePopup && welcomePopup.classList.contains('show')) {
                closeWelcomePopup();
            }
        });
        
        // Track service selection
        if (popupServiceCards.length > 0) {
            popupServiceCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    const service = this.getAttribute('data-service');
                    console.log('Service selected:', service);
                    setTimeout(function() {
                        closeWelcomePopup();
                    }, 200);
                });
            });
        }
    }
    
    // Initialize popup when DOM is ready
    initWelcomePopup();
    
    // ============================================
    // Console Welcome Message (Development)
    // ============================================
    console.log('%cRana Electrical', 'color: #0B5ED7; font-size: 20px; font-weight: bold;');
    console.log('%cPremium Website Loaded Successfully!', 'color: #6C757D; font-size: 12px;');
    
});

// ============================================
// Utility Functions
// ============================================

// Function to validate email (if needed in future)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function to format phone number
function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

// ============================================
// Services Search Functionality
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const serviceSearchInput = document.getElementById('serviceSearch');
    const searchClearBtn = document.getElementById('searchClear');
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    const servicesContainer = document.getElementById('servicesContainer');
    
    if (!serviceSearchInput || !servicesContainer) {
        return; // Not on services page
    }
    
    const serviceCards = servicesContainer.querySelectorAll('.service-detail-card');
    
    // Function to filter services
    function filterServices(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        let visibleCount = 0;
        
        if (term === '') {
            // Show all services
            serviceCards.forEach(card => {
                card.classList.remove('filtered-out', 'filter-match');
                card.style.display = '';
                visibleCount++;
            });
            
            searchResultsInfo.style.display = 'none';
            searchClearBtn.style.display = 'none';
        } else {
            // Filter services
            serviceCards.forEach(card => {
                const serviceName = card.getAttribute('data-service') || '';
                const keywords = card.getAttribute('data-keywords') || '';
                const cardText = card.textContent.toLowerCase();
                
                // Search in service name, keywords, and card content
                const matches = 
                    serviceName.toLowerCase().includes(term) ||
                    keywords.toLowerCase().includes(term) ||
                    cardText.includes(term);
                
                if (matches) {
                    card.classList.remove('filtered-out');
                    card.classList.add('filter-match');
                    card.style.display = '';
                    visibleCount++;
                    
                    // Remove highlight after animation
                    setTimeout(() => {
                        card.classList.remove('filter-match');
                    }, 500);
                } else {
                    card.classList.add('filtered-out');
                    card.classList.remove('filter-match');
                    card.style.display = 'none';
                }
            });
            
            // Update results info
            document.getElementById('resultsCount').textContent = visibleCount;
            searchResultsInfo.style.display = 'block';
            searchClearBtn.style.display = 'flex';
        }
        
        // Smooth scroll to top of results if on mobile
        if (window.innerWidth <= 768 && term !== '') {
            setTimeout(() => {
                servicesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
    
    // Search input event listener
    serviceSearchInput.addEventListener('input', function(e) {
        filterServices(e.target.value);
    });
    
    // Clear search button
    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', function() {
            serviceSearchInput.value = '';
            filterServices('');
            serviceSearchInput.focus();
        });
    }
    
    // Enter key to focus search (when not typing in search box)
    document.addEventListener('keydown', function(e) {
        // Press '/' to focus search (when not in input field)
        if (e.key === '/' && document.activeElement !== serviceSearchInput) {
            e.preventDefault();
            serviceSearchInput.focus();
        }
    });
    
    // Highlight search term in results (optional enhancement)
    function highlightSearchTerm(text, term) {
        if (!term) return text;
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    // ============================================
    // Service Detail Section (Product Page Style)
    // ============================================
    // Function to initialize service detail handlers
    function initializeServiceDetailHandlers() {
        const serviceDetailSection = document.getElementById('serviceDetailSection');
        const servicesContainer = document.getElementById('servicesContainer');
        
        // If we're not on the services page, return early
        if (!servicesContainer) return;
        
        // If service detail section doesn't exist, we can still set up click handlers
        // but we'll need to create it dynamically if needed
        
        try {
            const backToServicesBtn = document.getElementById('backToServices');
            const clickableServices = document.querySelectorAll('.clickable-service');
            
            let selectedProductType = null;
            
            // Function to open service detail section
            function openServiceDetail(serviceCard) {
                if (!serviceCard) {
                    console.error('No service card provided to openServiceDetail');
                    return;
                }
                
                if (!serviceDetailSection) {
                    console.error('Service detail section not found!');
                    return;
                }
                
                try {
                    const serviceName = serviceCard.getAttribute('data-service');
                    const servicePrice = serviceCard.getAttribute('data-price') || 'Contact for pricing';
                    const serviceDescription = serviceCard.querySelector('p')?.textContent || '';
                    const serviceFeatures = serviceCard.querySelectorAll('.service-features li');
                    
                    console.log('Opening service detail:', serviceName);
                    
                    // Safely parse JSON data attributes
                    let serviceImages = [];
                    let productTypes = [];
                    try {
                        const imagesAttr = serviceCard.getAttribute('data-images');
                        if (imagesAttr) {
                            serviceImages = JSON.parse(imagesAttr);
                        }
                    } catch (e) {
                        console.error('Error parsing images:', e);
                        serviceImages = [serviceCard.getAttribute('data-image') || ''];
                    }
                    
                    try {
                        const typesAttr = serviceCard.getAttribute('data-product-types');
                        if (typesAttr) {
                            productTypes = JSON.parse(typesAttr);
                        }
                    } catch (e) {
                        console.error('Error parsing product types:', e);
                        productTypes = [];
                    }
                    
                    // Hide services container and show detail section with smooth transition
                    if (servicesContainer) {
                        servicesContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        servicesContainer.style.opacity = '0';
                        servicesContainer.style.transform = 'translateY(-20px)';
                        setTimeout(() => {
                            servicesContainer.style.display = 'none';
                        }, 300);
                    }
                    if (serviceDetailSection) {
                        serviceDetailSection.style.display = 'block';
                        serviceDetailSection.style.visibility = 'visible';
                        serviceDetailSection.style.opacity = '0';
                        serviceDetailSection.style.transform = 'translateY(20px)';
                        serviceDetailSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        
                        // Trigger animation
                        setTimeout(() => {
                            serviceDetailSection.style.opacity = '1';
                            serviceDetailSection.style.transform = 'translateY(0)';
                        }, 50);
                        console.log('Service detail section shown');
                    }
                    
                    // Populate service details
                    document.getElementById('detailServiceTitle').textContent = serviceName;
                    document.getElementById('detailServicePrice').textContent = servicePrice;
                    document.getElementById('detailServiceDescription').textContent = serviceDescription;
                    
                    // Populate images gallery
                    const mainImage = document.getElementById('detailMainImage');
                    const thumbnailsContainer = document.getElementById('serviceImageThumbnails');
                    
                    // Use fallback image if no images provided
                    if (serviceImages.length === 0) {
                        const fallbackImage = serviceCard.getAttribute('data-image') || 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80';
                        serviceImages = [fallbackImage];
                    }
                    
                    if (mainImage && serviceImages.length > 0) {
                        mainImage.src = serviceImages[0];
                        mainImage.alt = serviceName;
                        mainImage.style.display = 'block';
                        
                        // Handle image load error
                        mainImage.onerror = function() {
                            this.src = 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80';
                            this.alt = 'Service Image';
                        };
                        
                        if (thumbnailsContainer) {
                            thumbnailsContainer.innerHTML = '';
                            serviceImages.forEach((img, index) => {
                                const thumbnail = document.createElement('div');
                                thumbnail.className = 'service-thumbnail' + (index === 0 ? ' active' : '');
                                const thumbImg = document.createElement('img');
                                thumbImg.src = img;
                                thumbImg.alt = `${serviceName} ${index + 1}`;
                                thumbImg.onerror = function() {
                                    this.src = 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80';
                                };
                                thumbnail.appendChild(thumbImg);
                                thumbnail.addEventListener('click', function() {
                                    if (mainImage) {
                                        mainImage.src = img;
                                        document.querySelectorAll('.service-thumbnail').forEach(t => t.classList.remove('active'));
                                        thumbnail.classList.add('active');
                                    }
                                });
                                thumbnailsContainer.appendChild(thumbnail);
                            });
                        }
                    }
                    
                    // Populate product types
                    const productTypesGrid = document.getElementById('productTypesGrid');
                    productTypesGrid.innerHTML = '';
                    selectedProductType = null;
                    
                    productTypes.forEach((product, index) => {
                        const productCard = document.createElement('div');
                        productCard.className = 'product-type-card';
                        productCard.innerHTML = `
                            <div class="product-type-name">${product.name}</div>
                            <div class="product-type-price">${product.price}</div>
                            <div class="product-type-description">${product.description}</div>
                        `;
                        productCard.addEventListener('click', function() {
                            document.querySelectorAll('.product-type-card').forEach(c => c.classList.remove('selected'));
                            productCard.classList.add('selected');
                            selectedProductType = product;
                        });
                        productTypesGrid.appendChild(productCard);
                    });
                    
                    // Populate features
                    const featuresList = document.getElementById('detailServiceFeatures');
                    featuresList.innerHTML = '';
                    serviceFeatures.forEach(feature => {
                        const li = document.createElement('li');
                        li.textContent = feature.textContent;
                        featuresList.appendChild(li);
                    });
                    
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } catch (error) {
                    console.error('Error opening service detail:', error);
                }
            }
    
    // Function to close service detail section
    function closeServiceDetail() {
                    serviceDetailSection.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    serviceDetailSection.style.opacity = '0';
                    serviceDetailSection.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        serviceDetailSection.style.display = 'none';
                        if (servicesContainer) {
                            servicesContainer.style.display = 'grid';
                            servicesContainer.style.opacity = '0';
                            servicesContainer.style.transform = 'translateY(-20px)';
                            setTimeout(() => {
                                servicesContainer.style.opacity = '1';
                                servicesContainer.style.transform = 'translateY(0)';
                            }, 50);
                        }
                    }, 300);
                    
                    selectedProductType = null;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
        
            // Use event delegation for dynamically loaded services
            // This works even if services are added/removed later
            if (servicesContainer) {
                // Remove any existing listener by using a named function
                if (servicesContainer._serviceClickHandler) {
                    servicesContainer.removeEventListener('click', servicesContainer._serviceClickHandler);
                }
                
                // Create handler function
                servicesContainer._serviceClickHandler = function(e) {
                    console.log('Click detected on services container', e.target);
                    
                    // Check if clicked on View Details button
                    const viewBtn = e.target.closest('.btn-view-service');
                    if (viewBtn) {
                        e.preventDefault();
                        e.stopPropagation();
                        const card = viewBtn.closest('.clickable-service') || viewBtn.closest('.service-detail-card');
                        if (card) {
                            console.log('Opening service detail for:', card.getAttribute('data-service'));
                            openServiceDetail(card);
                        } else {
                            console.error('Could not find service card for View Details button');
                        }
                        return;
                    }
                    
                    // Check if clicked on service card (but not on links or buttons)
                    const card = e.target.closest('.clickable-service');
                    if (card && !e.target.closest('a') && !e.target.closest('button') && !e.target.closest('.btn-view-service')) {
                        console.log('Opening service detail for card:', card.getAttribute('data-service'));
                        openServiceDetail(card);
                    }
                };
                
                // Add event listener using delegation
                servicesContainer.addEventListener('click', servicesContainer._serviceClickHandler);
                console.log('Event listener attached to services container');
            } else {
                console.error('servicesContainer not found!');
            }
            
            // Also add direct listeners for better compatibility
            clickableServices.forEach(card => {
                const viewBtn = card.querySelector('.btn-view-service');
                if (viewBtn) {
                    // Remove old listener if exists
                    if (viewBtn._clickHandler) {
                        viewBtn.removeEventListener('click', viewBtn._clickHandler);
                    }
                    
                    // Create new handler
                    viewBtn._clickHandler = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        openServiceDetail(card);
                    };
                    
                    viewBtn.addEventListener('click', viewBtn._clickHandler);
                }
            });
            
            // Back button handler
            if (backToServicesBtn) {
                backToServicesBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    closeServiceDetail();
                });
            }
            
                // Update book button to include selected product type
                const bookNowBtn = document.querySelector('.btn-book-now');
                if (bookNowBtn) {
                    // Update href when product type is selected
                    const updateBookButton = () => {
                        try {
                            const titleEl = document.getElementById('detailServiceTitle');
                            if (titleEl && selectedProductType) {
                                const serviceName = titleEl.textContent;
                                bookNowBtn.href = `contact.html?service=${encodeURIComponent(serviceName)}&type=${encodeURIComponent(selectedProductType.name)}&price=${encodeURIComponent(selectedProductType.price)}`;
                            } else if (titleEl) {
                                const serviceName = titleEl.textContent;
                                bookNowBtn.href = `contact.html?service=${encodeURIComponent(serviceName)}`;
                            }
                        } catch (e) {
                            console.error('Error updating book button:', e);
                        }
                    };
                    
                    // Watch for product type selection
                    document.addEventListener('click', function(e) {
                        if (e.target.closest('.product-type-card')) {
                            setTimeout(updateBookButton, 100);
                        }
                    });
                }
        } catch (error) {
            console.error('Error in service detail section:', error);
        }
    }
    
    // Make function globally accessible
    window.initializeServiceDetailHandlers = initializeServiceDetailHandlers;
    
    // Initialize on page load (with delay to ensure DOM is ready)
    setTimeout(function() {
        initializeServiceDetailHandlers();
    }, 100);
    
    // Re-initialize when services are loaded/updated
    document.addEventListener('servicesLoaded', function() {
        console.log('Services loaded event received, re-initializing handlers...');
        setTimeout(function() {
            initializeServiceDetailHandlers();
        }, 300);
    });
    
    window.addEventListener('servicesUpdated', function() {
        console.log('Services updated event received, re-initializing handlers...');
        setTimeout(function() {
            initializeServiceDetailHandlers();
        }, 300);
    });
    
    // Also listen for DOM mutations in case services are added dynamically
    setTimeout(function() {
        const servicesContainer = document.getElementById('servicesContainer');
        if (servicesContainer && typeof MutationObserver !== 'undefined') {
            const observer = new MutationObserver(function(mutations) {
                let shouldReinit = false;
                mutations.forEach(function(mutation) {
                    if (mutation.addedNodes.length > 0) {
                        shouldReinit = true;
                    }
                });
                if (shouldReinit) {
                    console.log('Services container changed, re-initializing handlers...');
                    setTimeout(function() {
                        initializeServiceDetailHandlers();
                    }, 200);
                }
            });
            
            observer.observe(servicesContainer, {
                childList: true,
                subtree: true
            });
        }
    }, 500);
});

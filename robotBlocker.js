// robotBlocker.js
/**
 * RobotBlocker - A comprehensive JavaScript library to prevent robot indexing, scraping, and unauthorized access
 * @version 1.1.1
 * @author Amarta Dey
 * @license MIT
 * @see https://github.com/amartadey/robotBlocker
 */
(function(window) {
    'use strict';

    // Default configuration
    const defaultConfig = {
        blockBots: true,              // Block known bot user agents
        noIndex: true,               // Add noindex meta tags
        noFollowLinks: true,         // Add nofollow to all links
        blockRightClick: true,       // Prevent right-click
        blockSelection: true,        // Prevent text selection
        preventFraming: true,        // Prevent iframe embedding
        obscureLocation: false,      // Obscure window.location (might break some functionality)
        blockDevTools: true,         // Disable F12 and browser developer tools
        blockCopy: true,             // Prevent copy-paste
        disableDownload: true,       // Prevent downloading of images and text selection
        blockPrintScreen: false,     // Attempt to block print screen (limited effectiveness)
        disableDragDrop: false,      // Prevent dragging of images/content
        redirectBots: null,          // Redirect bots to a specified URL (null = no redirect)
        blockCopyPaste: false,       // Prevent copy-paste actions
        logAttempts: false,          // Log security violation attempts
        customAlertMessage: 'Access Denied',  // Custom message for security violations
        forceMetaTags: true,         // Force meta tags even if other plugins exist
        botPatterns: [               // List of bot patterns to detect
            /googlebot/i,
            /bingbot/i,
            /slurp/i,
            /duckduckbot/i,
            /baiduspider/i,
            /yandexbot/i
        ]
    };

    // Merge user config with defaults
    const config = Object.assign({}, defaultConfig, window.RobotBlockerConfig || {});

    const RobotBlocker = {
        init: function() {
            if (config.noIndex) this.addMetaTags();
            if (config.noFollowLinks) this.processLinks();
            if (config.blockBots) this.detectAndBlockBots();
            this.addEventListeners();
            if (config.preventFraming) this.preventFraming();
            this.setXRobotsTag();
            if (config.obscureLocation) this.obscureLocation();
            
            // New methods from version 2 (optional based on config)
            if (config.blockDevTools) this.blockDevTools();
            if (config.disableDownload) this.preventDownload();
            if (config.blockPrintScreen) this.blockPrintScreen();
            if (config.disableDragDrop) this.disableDragDrop();
        },

        addMetaTags: function() {
            const metaTags = [
                { name: "robots", content: "noindex, nofollow, noarchive, nosnippet" },
                { name: "googlebot", content: "noindex, nofollow" },
                { name: "bingbot", content: "noindex, nofollow" }
            ];

            metaTags.forEach(tag => {
                let existingTag = document.querySelector(`meta[name="${tag.name}"]`);
                
                if (config.forceMetaTags) {
                    // Remove existing tag if force is enabled
                    if (existingTag) {
                        existingTag.remove();
                    }
                    
                    // Create and append new tag
                    const meta = document.createElement('meta');
                    meta.name = tag.name;
                    meta.content = tag.content;
                    document.head.appendChild(meta);
                } else if (!existingTag) {
                    // Only add if no existing tag when force is disabled
                    const meta = document.createElement('meta');
                    meta.name = tag.name;
                    meta.content = tag.content;
                    document.head.appendChild(meta);
                }
            });

            // Add inline script to ensure tags are not removed (optional)
            if (config.forceMetaTags) {
                const script = document.createElement('script');
                script.textContent = `
                    (function() {
                        const observer = new MutationObserver((mutations) => {
                            mutations.forEach((mutation) => {
                                if (mutation.type === 'childList') {
                                    const robotsTags = [
                                        { name: "robots", content: "noindex, nofollow, noarchive, nosnippet" },
                                        { name: "googlebot", content: "noindex, nofollow" },
                                        { name: "bingbot", content: "noindex, nofollow" }
                                    ];
                                    
                                    robotsTags.forEach(tag => {
                                        let existingTag = document.querySelector(\`meta[name="\${tag.name}"]\`);
                                        if (!existingTag) {
                                            const meta = document.createElement('meta');
                                            meta.name = tag.name;
                                            meta.content = tag.content;
                                            document.head.appendChild(meta);
                                        }
                                    });
                                }
                            });
                        });
                        
                        observer.observe(document.head, { 
                            childList: true, 
                            subtree: true 
                        });
                    })();
                `;
                document.head.appendChild(script);
            }
        },

        processLinks: function() {
            const processLink = (link) => {
                // Ensure link is not already processed
                if (!link.getAttribute('data-robotblocker-processed')) {
                    link.setAttribute('rel', 'nofollow noopener noreferrer');
                    link.setAttribute('data-robotblocker-processed', 'true');
                    
                    link.addEventListener('click', (e) => {
                        if (!e.isTrusted) {
                            e.preventDefault();
                            return false;
                        }
                    });
                }
            };

            // Process existing links
            const links = document.getElementsByTagName('a');
            Array.from(links).forEach(processLink);

            // Set up a mutation observer to process dynamically added links
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                // Process links in the added node and its descendants
                                const links = node.tagName === 'A' ? [node] : 
                                    node.querySelectorAll('a');
                                Array.from(links).forEach(processLink);
                            }
                        });
                    }
                });
            });

            // Start observing the document with the configured parameters
            observer.observe(document.body, { 
                childList: true, 
                subtree: true 
            });
        },

        detectAndBlockBots: function() {
            const userAgent = navigator.userAgent.toLowerCase();
            const isBotDetected = config.botPatterns.some(pattern => pattern.test(userAgent));
            
            if (isBotDetected) {
                this.logSecurityViolation('Bot Detection');
                
                if (config.redirectBots) {
                    // Redirect to specified URL if provided
                    window.location.href = config.redirectBots;
                } else {
                    // Default bot blocking behavior
                    document.body.innerHTML = '';
                    window.stop();
                }
            }
        },

        addEventListeners: function() {
            if (config.blockRightClick) {
                document.addEventListener('contextmenu', (e) => e.preventDefault());
            }
            if (config.blockSelection) {
                document.addEventListener('selectstart', (e) => e.preventDefault());
            }
        },

        preventFraming: function() {
            if (window.top !== window.self) {
                window.top.location = window.self.location;
            }
        },

        setXRobotsTag: function() {
            const xhr = new XMLHttpRequest();
            xhr.open('HEAD', window.location.href);
            xhr.setRequestHeader('X-Robots-Tag', 'noindex, nofollow');
            xhr.send();
        },

        obscureLocation: function() {
            Object.defineProperty(window, 'location', {
                get: function() {
                    return {
                        href: '',
                        pathname: '',
                        toString: function() { return '' }
                    };
                },
                configurable: false
            });
        },

        // New optional methods from version 2
        blockDevTools: function() {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
                    e.preventDefault();
                    return false;
                }
            });
        },

        preventDownload: function() {
            document.addEventListener('contextmenu', (e) => {
                const target = e.target;
                if (target.tagName === 'IMG' || target.tagName === 'VIDEO') {
                    e.preventDefault();
                    return false;
                }
            });
        },

        blockPrintScreen: function() {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'PrintScreen') {
                    e.preventDefault();
                    return false;
                }
            });
        },

        disableDragDrop: function() {
            document.addEventListener('dragstart', (e) => {
                e.preventDefault();
                return false;
            });
        },

        logSecurityViolation: function(type) {
            if (config.logAttempts) {
                console.warn(`Security Violation: ${type} - ${new Date().toISOString()}`);
            }
        },

        showAlert: function() {
            alert(config.customAlertMessage);
        }
    };

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => RobotBlocker.init());
    } else {
        RobotBlocker.init();
    }

    // Expose the library to window object
    window.RobotBlocker = {
        init: RobotBlocker.init.bind(RobotBlocker),
        config: config
    };
})(window);

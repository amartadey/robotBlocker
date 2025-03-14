// robotBlocker.js
/**
 * RobotBlocker - A configurable JavaScript library to prevent robot indexing and link following
 * @version 1.0.0
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
        },

        addMetaTags: function() {
            const metaTags = [
                { name: "robots", content: "noindex, nofollow, noarchive, nosnippet" },
                { name: "googlebot", content: "noindex, nofollow" },
                { name: "bingbot", content: "noindex, nofollow" }
            ];

            metaTags.forEach(tag => {
                if (!document.querySelector(`meta[name="${tag.name}"]`)) {
                    const meta = document.createElement('meta');
                    meta.name = tag.name;
                    meta.content = tag.content;
                    document.head.appendChild(meta);
                }
            });
        },

        processLinks: function() {
            const links = document.getElementsByTagName('a');
            for (let link of links) {
                link.setAttribute('rel', 'nofollow noopener noreferrer');
                link.addEventListener('click', (e) => {
                    if (!e.isTrusted) {
                        e.preventDefault();
                        return false;
                    }
                });
            }
        },

        detectAndBlockBots: function() {
            const userAgent = navigator.userAgent.toLowerCase();
            if (config.botPatterns.some(pattern => pattern.test(userAgent))) {
                document.body.innerHTML = '';
                window.stop();
            }
        },

        addEventListeners: function() {
            if (config.blockRightClick) {
                document.addEventListener('contextmenu', (e) => e.preventDefault());
            }
            if (config.blockSelection) {
                document.addEventListener('selectstart', (e) => e.preventDefault());
            }
            if (config.noFollowLinks) {
                const observer = new MutationObserver(() => {
                    this.processLinks();
                });
                observer.observe(document.body, { 
                    childList: true, 
                    subtree: true 
                });
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

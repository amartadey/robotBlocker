# RobotBlocker

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![GitHub version](https://img.shields.io/badge/version-1.0.0-green.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/amartadey/robotBlocker)

**RobotBlocker** is a lightweight, highly configurable JavaScript library designed to prevent search engine robots from indexing your web pages and following outbound links. Whether you're protecting a private site, a staging environment, or simply want to control crawler behavior, RobotBlocker provides a flexible, client-side solution with multiple layers of protection.

## Installation
### Via CDN (Recommended)
Leverage jsDelivr for fast, cached delivery:
```html
<script src="https://cdn.jsdelivr.net/gh/amartadey/robotBlocker@main/robotBlocker.js"></script>

## Configuration Options
RobotBlocker offers a range of options to tailor its behavior. Below is the full table of configuration settings:

| Option          | Type    | Default          | Description                                                             |
|-----------------|---------|------------------|-------------------------------------------------------------------------|
| blockBots       | Boolean | true             | Enables detection and blocking of bots based on user agent patterns.    |
| noIndex         | Boolean | true             | Adds noindex meta tags to prevent search engine indexing.               |
| noFollowLinks   | Boolean | true             | Adds rel="nofollow noopener noreferrer" to all &lt;a&gt; tags.          |
| blockRightClick | Boolean | true             | Disables right-click context menu to prevent easy content copying.      |
| blockSelection  | Boolean | true             | Prevents text selection to deter scraping (may affect user experience). |
| preventFraming  | Boolean | true             | Breaks out of iframes to prevent embedding by other sites.              |
| obscureLocation | Boolean | false            | Obfuscates window.location to confuse bots (use with caution).          |
| botPatterns     | Array   | [googlebot, ...] | Array of regex patterns to identify bots (customizable).                |


## Detailed Examples
### Example 1: Minimal Protection
Focus on SEO control only:
```html
<script>
    window.RobotBlockerConfig = {
        noIndex: true,
        noFollowLinks: true,
        blockBots: false,
        blockRightClick: false,
        blockSelection: false
    };
</script>
<script src="https://cdn.jsdelivr.net/gh/amartadey/robotBlocker@main/robotBlocker.js"></script>
```
### Example 2: Maximum Security
Full anti-bot and anti-scraping protection:
```html
<script>
    window.RobotBlockerConfig = {
        blockBots: true,
        noIndex: true,
        noFollowLinks: true,
        blockRightClick: true,
        blockSelection: true,
        preventFraming: true,
        botPatterns: [
            /googlebot/i,
            /bingbot/i,
            /slurp/i,
            /mysecretbot/i
        ]
    };
</script>
<script src="https://cdn.jsdelivr.net/gh/amartadey/robotBlocker@main/robotBlocker.js"></script>
```




## Features
- **Bot Detection and Blocking**: Identifies and stops common search engine bots.
- **Noindex Implementation**: Adds meta tags to prevent page indexing.
- **Nofollow Enforcement**: Applies `nofollow` to all links, preventing link juice transfer.
- **Anti-Scraping Measures**: Optional restrictions on right-click and text selection.
- **Iframe Prevention**: Ensures your content can't be embedded elsewhere.
- **Customizable Settings**: Tailor the behavior to your specific needs.
- **Zero Dependencies**: Works standalone with no external libraries required.

## Meta Tags (Added By the Script)

```html
<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
<meta name="googlebot" content="noindex, nofollow">
<meta name="bingbot" content="noindex, nofollow">
```


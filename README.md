# RobotBlocker

**RobotBlocker** is a comprehensive JavaScript library designed to prevent search engine robots from indexing your web pages, protect against content scraping, and enhance website security.

## 📦 Installation
Leverage jsDelivr for fast, cached delivery:
```html
<script src="https://cdn.jsdelivr.net/gh/amartadey/robotBlocker@latest/robotBlocker.js"></script>
```

## 🛠️ Configuration Options

| Option               | Type           | Default                   | Description                                                                 |
|---------------------|----------------|---------------------------|-----------------------------------------------------------------------------|
| `blockBots`         | Boolean        | `true`                    | Detect and block bots based on user agent patterns                           |
| `noIndex`           | Boolean        | `true`                    | Add noindex meta tags                                                       |
| `noFollowLinks`     | Boolean        | `true`                    | Add `nofollow` to all links                                                 |
| `blockRightClick`   | Boolean        | `true`                    | Disable right-click context menu                                            |
| `blockSelection`    | Boolean        | `true`                    | Prevent text selection                                                      |
| `preventFraming`    | Boolean        | `true`                    | Break out of iframes                                                        |
| `obscureLocation`   | Boolean        | `false`                   | Obfuscate `window.location` (might break functionality)                     |
| `blockDevTools`     | Boolean        | `true`                    | Disable F12 and browser developer tools                                     |
| `blockCopy`         | Boolean        | `true`                    | Prevent copy functionality                                                  |
| `disableDownload`   | Boolean        | `true`                    | Prevent downloading of images and text selection                            |
| `blockPrintScreen`  | Boolean        | `false`                   | Attempt to block print screen (limited effectiveness)                       |
| `disableDragDrop`   | Boolean        | `false`                   | Prevent dragging of images/content                                          |
| `redirectBots`      | String/Null    | `null`                    | Redirect bots to a specified URL (null = no redirect)                       |
| `blockCopyPaste`    | Boolean        | `false`                   | Prevent copy-paste actions                                                  |
| `logAttempts`       | Boolean        | `false`                   | Log security violation attempts to console                                  |
| `forceMetaTags`     | Boolean        | `true`                    | Force meta tags even if overwritten by other plugins                        |
| `customAlertMessage`| String         | `'Access Denied'`         | Custom message displayed for security violations                            |
| `botPatterns`       | Array of RegExp| `[googlebot, bingbot, ...]`| Array of regex patterns to identify bots (customizable)                    |




## 📝 Usage Examples

### 1. Minimal Protection
```html
<script>
    window.RobotBlockerConfig = {
        noIndex: true,
        noFollowLinks: true
    };
</script>
<script src="https://cdn.jsdelivr.net/gh/amartadey/robotBlocker@latest/robotBlocker.js"></script>
```

### 2. Maximum Security
```html
<script>
    window.RobotBlockerConfig = {
        blockBots: true,
        noIndex: true,
        noFollowLinks: true,
        blockRightClick: true,
        blockSelection: true,
        blockDevTools: true,
        blockPrintScreen: true,
        disableDragDrop: true,
        redirectBots: 'https://yoursite.com/bot-redirect',
        logAttempts: true,
        botPatterns: [
            /googlebot/i,
            /bingbot/i,
            /mysecretbot/i
        ]
    };
</script>
<script src="https://cdn.jsdelivr.net/gh/amartadey/robotBlocker@latest/robotBlocker.js"></script>
```

### 3. WordPress Compatibility
```html
<script>
    window.RobotBlockerConfig = {
        forceMetaTags: true,
        noIndex: true,
        blockBots: true
    };
</script>
<script src="https://cdn.jsdelivr.net/gh/amartadey/robotBlocker@latest/robotBlocker.js"></script>
```

### Meta Tag Handling for WordPress
The library now includes a special mechanism to ensure meta tags persist:
- `forceMetaTags: true` adds a mutation observer to recreate meta tags if removed
- Works around conflicts with WordPress SEO plugins
- Provides more reliable noindex/nofollow implementation


## 🌐 Browser Compatibility
- Chrome
- Firefox
- Safari
- Edge
- Modern browsers with ES6+ support

## ⚠️ Important Considerations
- Some security features might impact user experience
- Not a substitute for server-side security
- Test thoroughly in your specific environment

## 🚀 Performance
- Lightweight library
- Minimal performance overhead
- No external dependencies

## Notes on New Features
- **Print Screen Blocking**: Not 100% effective due to browser limitations
- **Bot Redirection**: Allows custom handling of bot traffic
- **Drag and Drop Prevention**: Stops content dragging
- **Meta Tag Forcing**: Helps maintain SEO control in complex CMS environments

## Features
- **Bot Detection and Blocking**: Identifies and stops common search engine bots.
- **Noindex Implementation**: Adds meta tags to prevent page indexing.
- **Nofollow Enforcement**: Applies `nofollow` to all links, preventing link juice transfer.
- **Anti-Scraping Measures**: Optional restrictions on right-click and text selection.
- **Iframe Prevention**: Ensures your content can't be embedded elsewhere.
- **Customizable Settings**: Tailor the behavior to your specific needs.
- **Zero Dependencies**: Works standalone with no external libraries required.

## Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- WordPress and other CMS platforms
- Lightweight with minimal performance impact

## 📄 License
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## 📧 Contact
Amarta Dey - [GitHub Profile](https://github.com/amartadey)

## 🌟 Show Your Support
Give a ⭐️ if this project helps you!
# NextGen Engineering Works - GoDaddy Deployment Guide

This website is built as a highly optimized, responsive static web application (HTML5, CSS3, Vanilla JS). It requires **no server-side build steps, database setups, or Node.js environment** to run, making it extremely lightweight and 100% compatible with any GoDaddy hosting plan (Linux Shared, Windows IIS, or cPanel).

## How to Deploy on GoDaddy (cPanel / Linux)

### Option A: Upload via cPanel File Manager (Recommended)
1. Log in to your GoDaddy Account and open your **cPanel Hosting Manager**.
2. Go to the **File Manager** and navigate to the `public_html` directory (this is the root directory for your primary domain).
3. Select **Upload** and upload the project files directly. You can zip the contents of the `nextgen` directory (excluding the `.git` directory) and upload the zip file, then extract it directly in cPanel.
4. Make sure `index.html` is located directly inside `public_html` (not in a nested folder).

### Option B: Upload via FTP (e.g., FileZilla)
1. Retrieve your FTP login credentials from your GoDaddy Hosting Account dashboard.
2. Connect to your domain using an FTP client like FileZilla.
3. Upload all project files and directories (especially `assets/`, `index.html`, `about.html`, `services.html`, `products.html`, `contact.html`, `style.css`, and `app.js`) to the `public_html` directory.

---

## Clean URLs Configuration (Optional)

By default, the navigation links reference standard `.html` paths (e.g., `about.html`). If you prefer clean URLs (e.g., `yourdomain.com/about` instead of `yourdomain.com/about.html`), we have provided an `.htaccess` file in this directory. 

To enable clean URLs on GoDaddy Apache servers:
1. Ensure the `.htaccess` file is uploaded to the root of your `public_html` folder.
2. If GoDaddy's hosting hides dotfiles, enable "Show Hidden Files" in cPanel File Manager settings.

# NextGen Engineering Works - Deployment Guide

This website is built as a highly optimized, responsive static web application (HTML5, CSS3, Vanilla JS). It requires **no server-side build steps, database setups, or Node.js environment** to run, making it extremely lightweight and 100% compatible with both traditional hosting (like GoDaddy) and modern serverless platforms (like Vercel).

---

## How to Deploy on Vercel (Recommended for Cloud Hosting)

Vercel is the easiest and most modern way to host static websites. It provides automatic SSL/HTTPS, global edge network performance, and instant previews.

### Option A: Deploy via GitHub Integration (Continuous Deployment)
1. Push this repository to your GitHub account.
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New** > **Project**.
4. Import your `NextGenx` repository from your linked GitHub account.
5. Vercel will auto-detect the project settings. Keep the default configuration:
   - **Framework Preset**: Other (detected as static files)
   - **Build Command**: Leave empty/default
   - **Output Directory**: Leave empty/default
6. Click **Deploy**. Vercel will host the website within seconds. Future pushes to the `main` branch will trigger automatic deployments.

### Option B: Deploy via Vercel CLI
If you prefer deploying directly from your local command line:
1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Log in to your Vercel account:
   ```bash
   vercel login
   ```
3. Run the deployment command from this project directory:
   ```bash
   vercel
   ```
4. Link it to your project, then deploy to production using:
   ```bash
   vercel --prod
   ```

### Clean URLs on Vercel
We have configured `vercel.json` with `"cleanUrls": true`. Vercel will automatically redirect requests ending in `.html` to their clean URL counterpart (e.g. `/about.html` -> `/about`) and resolve them seamlessly.

---

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

### Clean URLs Configuration on GoDaddy (Apache)
We have provided an `.htaccess` file in this directory to handle clean URLs on GoDaddy Apache servers. Ensure it is uploaded to the root of your `public_html` folder. If GoDaddy hides dotfiles by default, enable "Show Hidden Files" in cPanel File Manager settings.


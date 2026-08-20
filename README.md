# Badhuche Art Studio Website

A beautiful, award-winning inspired website for Badhuche Art Studio - creators of monumental sculptures and murals across India.

---

## Quick Start (Super Easy!)

### What You Need First
1. **A computer** with internet
2. **Node.js** installed (version 18 or higher)
   - Go to https://nodejs.org
   - Download the "LTS" version
   - Run the installer, click "Next" until done
3. **A code editor** (we recommend VS Code or Cursor)
   - VS Code: https://code.visualstudio.com
   - Cursor: https://cursor.sh

---

## Step-by-Step Setup

### Step 1: Download the Project

**Option A: From v0 (Easiest)**
1. Click the three dots menu (⋮) in v0
2. Click "Download ZIP"
3. Find the downloaded file (usually in Downloads folder)
4. Right-click the ZIP file → "Extract All" or "Unzip"

**Option B: From GitHub**
1. Go to the GitHub repository
2. Click the green "Code" button
3. Click "Download ZIP"
4. Extract the ZIP file

### Step 2: Open in Code Editor

1. Open VS Code or Cursor
2. Click "File" → "Open Folder"
3. Find and select the extracted project folder
4. Click "Select Folder"

### Step 3: Install Dependencies

1. Open the Terminal in your editor:
   - VS Code: Press `` Ctrl + ` `` (the key below Escape)
   - Or click "View" → "Terminal"

2. Type this command and press Enter:
   \`\`\`
   npm install
   \`\`\`

3. Wait for it to finish (might take 1-2 minutes)
   - You'll see "added X packages" when done

### Step 4: Run the Website

1. In the same terminal, type:
   \`\`\`
   npm run dev
   \`\`\`

2. Wait until you see:
   \`\`\`
   ▲ Next.js 14.x.x
   - Local: http://localhost:3000
   \`\`\`

3. Open your web browser (Chrome, Firefox, etc.)
4. Go to: **http://localhost:3000**

**You should see the website!**

---

## How to Make Changes

### Changing Text

1. Find the page you want to edit in the `/app` folder:
   - Homepage: `app/page.tsx`
   - Studio page: `app/studio/page.tsx`
   - Works page: `app/works/page.tsx`
   - Contact page: `app/contact/page.tsx`

2. Open the file and find the text you want to change
3. Edit the text between the `>` and `<` symbols
4. Save the file (Ctrl+S or Cmd+S)
5. The browser will automatically update!

### Changing Colors

All colors are in one file: `app/globals.css`

Look for these lines near the top:
\`\`\`css
--background: #FAF7F2;     /* Main background color */
--foreground: #1A1815;     /* Main text color */
--terracotta: #C2542D;     /* Orange accent */
--gold: #B8963F;           /* Gold accent */
\`\`\`

Change the color codes (the # numbers) to your preferred colors.

### Adding Real Project Images

1. Put your image files in the `/public` folder
2. Name them something simple like `project-name.jpg`
3. In the page file, find the `src=` and change it:
   \`\`\`jsx
   src="/your-new-image.jpg"
   \`\`\`

---

## Project Structure (What's What)

\`\`\`
📁 badhuche-website/
├── 📁 app/                    # All the pages
│   ├── page.tsx               # Homepage
│   ├── globals.css            # Colors and styles
│   ├── layout.tsx             # Shared layout
│   ├── 📁 studio/             # Studio page
│   ├── 📁 works/              # Works page
│   └── 📁 contact/            # Contact page
│
├── 📁 components/             # Reusable parts
│   ├── navigation.tsx         # Top menu
│   ├── footer.tsx             # Bottom section
│   ├── custom-cursor.tsx      # Cool cursor effect
│   ├── magnetic-button.tsx    # Buttons that move
│   └── 📁 ui/                 # Basic components
│
├── 📁 public/                 # Images and files
│   └── *.jpg                  # Project images
│
├── package.json               # Project settings
└── README.md                  # This file!
\`\`\`

---

## Common Problems & Solutions

### "npm is not recognized"
- Node.js isn't installed properly
- Close everything, reinstall Node.js, restart your computer

### "Port 3000 is already in use"
- Another app is using that port
- In terminal, run: `npm run dev -- -p 3001`
- Then go to http://localhost:3001

### Changes aren't showing
- Make sure you saved the file (Ctrl+S)
- Try refreshing the browser (F5 or Ctrl+R)
- Restart the dev server (Ctrl+C in terminal, then `npm run dev` again)

### "Module not found" error
- Run `npm install` again
- Make sure you're in the right folder

---

## Deploying to the Internet

### Using Vercel (Recommended - Free!)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your project from GitHub
5. Click "Deploy"
6. Done! You'll get a free URL like `yourproject.vercel.app`

### Using Netlify (Also Free!)

1. Go to https://netlify.com
2. Sign up
3. Drag and drop your project folder
4. Wait for deployment
5. Get your free URL!

---

## Connecting Real Data (Advanced)

Right now, all projects are "dummy" data - fake examples. To add real projects:

### Option 1: Direct in Code (Simple)
Edit the arrays in each page file directly.

### Option 2: CMS (More Flexible)
Connect to a headless CMS like:
- **Sanity** (https://sanity.io) - Free tier available
- **Contentful** (https://contentful.com) - Free tier available
- **Strapi** (https://strapi.io) - Self-hosted, free

### Option 3: Database
Use Supabase or similar:
1. Create account at https://supabase.com
2. Create a "projects" table
3. Add your project data
4. Connect using the Supabase client

---

## Need Help?

1. **AI Help**: Ask Cursor AI or ChatGPT about specific errors
2. **Documentation**: 
   - Next.js: https://nextjs.org/docs
   - Tailwind CSS: https://tailwindcss.com/docs
3. **Community**: 
   - Next.js Discord
   - Stack Overflow

---

## Credits

- Design inspired by award-winning sites like OHArchitecture
- Built with Next.js, Tailwind CSS, and Framer Motion
- Custom cursor and animations for premium feel

---

**Happy Building!** 🎨

# MyCollege – URL Naming Practical

A small, fictional college website built with plain **HTML, CSS and JavaScript** to demonstrate
meaningful URL naming. It has no framework, no backend, no database and no build step.

## The five URLs

| URL | Page | What the path represents |
|-----|------|--------------------------|
| `/` | Home | The root of the website – the college's landing page. |
| `/students/login` | Student Login | The `login` action inside the `students` section (demo form only, nothing is sent or stored). |
| `/faculty` | Faculty | A single top-level section listing the teaching staff. |
| `/courses` | Courses | A single top-level section listing programmes offered. |
| `/examination/results` | Examination Results | The `results` page inside the `examination` section. |

Nested paths (`/students/login`, `/examination/results`) show a hierarchy: **section → sub-page**.
Names are lowercase, readable, and describe the content, so a user can guess what a page contains from its URL.

## Demo login

The student login is a front-end demo only (no backend, nothing is stored).
Use **Username:** `kush dabade` and **Password:** `12345` to "log in" and see the
highlighted result on `/examination/results`. Any other details show "Invalid username or password".

## How the URLs work

Each URL is a real folder containing an `index.html` file, so every path works when opened
directly or refreshed – no special routing rules are needed.

```
index.html                      ->  /
students/login/index.html       ->  /students/login
faculty/index.html              ->  /faculty
courses/index.html              ->  /courses
examination/results/index.html  ->  /examination/results
css/style.css                   (shared styles)
js/main.js                      (menu, active link, demo login)
amplify.yml                     (AWS Amplify build settings)
```

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 (do not open the HTML files by double-clicking – the
`/css/...` links need a web server).

## Deploy to AWS Amplify Hosting

1. Create an empty repository on GitHub (e.g. `mycollege-url-naming`) and push this project:
   ```bash
   git remote add origin https://github.com/<your-username>/mycollege-url-naming.git
   git push -u origin main
   ```
2. Sign in to the AWS Console and open **AWS Amplify**.
3. Click **Create new app** → choose **GitHub** → **Next**, and authorize AWS Amplify to access GitHub.
4. Select the repository and the `main` branch → **Next**.
5. On the build settings page, Amplify detects `amplify.yml` automatically. Leave everything else as default → **Next** → **Save and deploy**.
6. When the deployment finishes, Amplify shows a public URL like
   `https://main.<app-id>.amplifyapp.com`. Open it and test all five paths.

Every later `git push` to `main` redeploys the site automatically.

**Cost:** a small static site like this normally fits within the AWS Free Tier. To avoid any
charges after grading, delete the app in the Amplify console (**App settings → General → Delete app**).

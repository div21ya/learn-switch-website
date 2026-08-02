# LearnSwitch — Personalized Learning Roadmap Platform

> **Learn smart, not hard.** LearnSwitch turns information overload into a structured, personalized learning path for Data Structures & Algorithms and Web Development.

## Overview

Learners often spend more time comparing tutorials, documentation, roadmaps, and opinions than actually studying. **LearnSwitch** solves this problem by providing a curated “golden path” that adapts to the learner’s subject, current skill level, and preferred learning style.

The platform combines personalized roadmaps, topic quizzes, progress tracking, project recommendations, and a browser-based coding workspace in one interactive web application.

## Key Features

### Personalized Roadmaps

Users can generate a roadmap by selecting:

- **Subject:** Data Structures & Algorithms or Web Development
- **Level:** Beginner, Intermediate, or Advanced
- **Learning style:** Video tutorials, documentation, or AI-assisted learning

Each roadmap is divided into six progressive stages, including concepts, practice, projects or interview preparation, quizzes, and advancement to the next level.

### Curated Learning Resources

The roadmap recommends selected learning resources from platforms such as:

- YouTube educators and playlists
- MDN Web Docs
- React and Node.js documentation
- GeeksforGeeks and CP-Algorithms
- CSES, Codeforces, and AtCoder
- AI learning tools and coding assistants

### Skill Quizzes and Level Unlocking

- Topic-specific quizzes contain up to 10 questions.
- Answers include explanations after submission.
- A learner must score **at least 80%** to pass a topic quiz.
- Quiz scores, attempts, and completion status are saved locally.
- The next learning level unlocks only after the required roadmap stages and quizzes are completed.

### Browser-Based Coding Workspace

The **Code With Us** section provides an interactive practice environment with:

- Multi-file HTML, CSS, and JavaScript editing
- Live web preview
- JavaScript execution with console output
- C compilation through the Judge0 API
- Standard input support for C programs
- Line numbers and cursor-position tracking
- Automatic bracket completion
- `Ctrl + Enter` / `Cmd + Enter` shortcut to run code
- Downloadable project ZIP files
- Reset and clear-console controls

### Learner Dashboard

The dashboard provides a central view of the learner’s activity:

- Generated roadmaps and completion percentage
- Completed learning steps
- Quiz progress
- Skill-progress indicators
- Study streak and heatmap interface
- Profile editing
- Light and dark themes

### Project and Practice Library

LearnSwitch includes practical ideas across multiple categories:

- Web development projects
- DSA interview challenges
- Python automation and scripting projects

Projects are grouped by difficulty and include estimated completion time, required technologies, and short descriptions.

### Local Authentication Prototype

The project includes:

- User signup and login
- Username availability checking
- Password confirmation and visibility controls
- Protected-page redirection through an authentication guard
- User profile and session handling
- Logout functionality

> **Important:** Authentication is implemented with browser `localStorage` for academic demonstration. It is not suitable for a production application.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Server | Node.js, Express.js |
| Client-side storage | Local Storage, Session Storage |
| Charts | Chart.js |
| Icons | Font Awesome |
| ZIP generation | JSZip |
| C execution | Judge0 through RapidAPI |
| Styling | Responsive CSS, light mode, dark mode, animations |

## Application Flow

```text
Home Page
   ↓
Sign Up / Login
   ↓
Select Subject, Level, and Learning Style
   ↓
Generate Personalized Roadmap
   ↓
Complete Learning Stages and Practice
   ↓
Attempt Topic Quizzes
   ↓
Score ≥ 80% and Unlock the Next Level
   ↓
Track Progress from the Dashboard
```

## Project Structure

```text
Final_Project/
├── package.json
├── package-lock.json
├── server.js
└── public/
    ├── home.html
    ├── login.html
    ├── signup.html
    ├── preference.html
    ├── roadmap.html
    ├── quiz.html
    ├── dashboard.html
    ├── codewithus.html
    ├── project.html
    ├── contact.html
    ├── auth-guard.js
    ├── index.js
    ├── login.js
    ├── preference.js
    ├── roadmap.js
    ├── quiz.js
    ├── dashboard.js
    ├── codewithus.js
    ├── project.js
    └── *.css
```

`node_modules/` is intentionally excluded from this structure because dependencies should be installed with `npm install` rather than committed to GitHub.

## Getting Started

### Prerequisites

Install:

- Node.js
- npm
- A modern browser such as Chrome, Edge, or Firefox

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

Install dependencies:

```bash
npm install
```

Start the Express server:

```bash
node server.js
```

Open the application at:

```text
http://localhost:3000
```

## Judge0 Setup for C Programs

HTML, CSS, and JavaScript execution works directly in the browser. To compile C programs, configure a Judge0 RapidAPI key.

1. Create or obtain a Judge0 API key from RapidAPI.
2. Open:

```text
public/codewithus.js
```

3. Replace:

```javascript
const RAPID_API_KEY = "YOUR_RAPIDAPI_KEY_HERE";
```

with your API key.

> Do not expose a real API key in a public repository. A production version should send compilation requests through a secure backend or environment-variable-based service.

## Local Data Storage

The current version stores application data in the browser, including:

- Registered demo accounts
- Active user profile
- Roadmap preferences
- Completed roadmap stages
- Quiz results and attempts
- Theme preference

Clearing browser storage will reset this data.

## Recommended `.gitignore`

Create a `.gitignore` file before pushing the project:

```gitignore
node_modules/
.env
.DS_Store
*.log
```

If `node_modules` was previously added to Git, remove it from tracking with:

```bash
git rm -r --cached node_modules
git add .gitignore
git commit -m "Remove node_modules and add gitignore"
```

## Current Limitations

- Authentication is browser-based and does not use a secure database.
- Passwords are stored locally as part of the academic prototype.
- User data does not synchronize across browsers or devices.
- C execution depends on an external Judge0 API key and internet connection.
- Learning resources and roadmap content are maintained in client-side JavaScript.
- Study-session tracking can be expanded with more complete automatic activity logging.

## Future Enhancements

- Secure backend authentication with password hashing
- MongoDB or PostgreSQL integration
- Cloud-based progress synchronization
- Additional paths for Python, machine learning, databases, and operating systems
- AI-generated roadmap recommendations
- Adaptive quizzes based on weak topics
- Automated study-session tracking
- Admin panel for managing resources and quiz questions
- Deployment using Render, Railway, Vercel, or AWS
- Progressive Web App support

## Learning Outcomes

This project demonstrates practical use of:

- Responsive web design
- DOM manipulation and event handling
- Browser storage APIs
- Authentication-flow prototyping
- Dynamic content generation
- Progress and state management
- REST API integration
- Express static-file serving
- Quiz logic and conditional progression
- Building an in-browser code editor

## Author

**Simran Kumari**  
B.Tech Computer Science and Engineering — Data Science

## Disclaimer

LearnSwitch is an academic web-development project. External learning resources belong to their respective owners. The application is intended for educational demonstration and should be strengthened with secure backend services before production use.

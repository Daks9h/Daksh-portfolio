# Daksh Lalwani - Portfolio

Personal portfolio website of Daksh Lalwani, Full Stack Developer. Built with React, Vite, and Tailwind CSS.

## Features

- Responsive layout across desktop, tablet, and mobile devices
- Canvas-based background grid with dynamic flicker effect
- Interactive components with custom border beam styling
- Dedicated sections for projects, skills, experience, LeetCode metrics, and GitHub activity
- Direct resume download and contact form

## Built With

- React 19
- Vite
- Tailwind CSS
- Lucide React
- Canvas Confetti

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Daks9h/Daksh-portfolio.git
   cd Daksh-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

### Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
├── public/
│   ├── Daksh_Lalwani_Resume.pdf   # Resume PDF
│   └── favicon.svg                # Favicon
├── src/
│   ├── components/                # Shared UI elements
│   │   ├── magicui/               # Flickering grid component
│   │   ├── LaserButton.jsx        # Border beam action buttons
│   │   ├── UiVerseButton.jsx      # Navigation buttons
│   │   ├── Navbar.jsx             # Top navigation bar
│   │   └── Footer.jsx             # Footer
│   ├── data/
│   │   └── portfolioData.js       # Content, project details, and stats
│   ├── sections/                  # Page sections
│   │   ├── Hero.jsx               # Introduction and headline
│   │   ├── About.jsx              # Background and academic metrics
│   │   ├── GitHubHeatmap.jsx      # GitHub commit visualizer
│   │   ├── LeetCodeSection.jsx    # Problem-solving statistics
│   │   ├── Experience.jsx         # Work history and roles
│   │   ├── Skills.jsx             # Technical competencies
│   │   ├── Projects.jsx           # Featured projects
│   │   ├── Certifications.jsx     # Certifications and leadership
│   │   └── Contact.jsx            # Contact form
│   ├── App.jsx                    # Root layout
│   ├── index.css                  # Global styles and design tokens
│   └── main.jsx                   # Application entry point
├── package.json
└── vite.config.js
```

## Contact

- Email: dakshlalwani89@gmail.com
- GitHub: https://github.com/Daks9h
- LinkedIn: https://linkedin.com/in/dakshlalwani-374212308

## License

This project is licensed under the MIT License.

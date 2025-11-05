# 🏠 Original Insurance Website

A modern, mobile-first React + TypeScript website built for **Original Insurance**, a professional insurance brokerage.  
The site is designed for speed, clarity, and credibility — showcasing services, contact options, and local trust through a refined brand experience.

---

## 🚀 Live Site

👉 [https://original-insurance.web.app](https://original-insurance.web.app)

---

## ✨ Features

- **Fully Responsive Design** — optimized for mobile, tablet, and desktop.  
- **Modern Stack:** Vite + React + TypeScript + TailwindCSS.  
- **Firebase Hosting** — blazing-fast static hosting with SSL and CDN.  
- **SEO Ready:** semantic markup, JSON-LD, and Open Graph tags.  
- **Smart UI:** smooth scrolls, shadows, and brand gradients.  
- **Fast Contact Form:** integrated with Web3Forms (spam-safe and no backend needed).  
- **Optimized Images:** WebP format and responsive sizing for performance.  

---

## 🧩 Tech Stack

| Tool / Framework | Purpose |
|------------------|----------|
| **React (TypeScript)** | Component-based UI |
| **Vite** | Ultra-fast development & build tool |
| **TailwindCSS** | Utility-first styling framework |
| **Firebase Hosting** | Static site hosting & CDN |
| **Web3Forms** | Secure contact form handling |
| **GitHub** | Version control & collaboration |

---

## ⚙️ Setup & Development

### 1. Clone the repository
```bash
git clone https://github.com/brian-aiad/original-insurance-website.git
cd original-insurance-website
2. Install dependencies
bash
Copy code
npm install
3. Start the dev server
bash
Copy code
npm run dev
Your app will be available at http://localhost:5173

🌐 Deploying to Firebase
Build the project
bash
Copy code
npm run build
Deploy
bash
Copy code
firebase deploy
That’s it! Firebase will host the optimized /dist build and give you your live URL.

🔐 Environment Variables
Create a file named .env.local in the project root:

bash
Copy code
VITE_W3F_ACCESS_KEY=your_web3forms_access_key
VITE_CONTACT_WEBHOOK_URL=https://api.web3forms.com/submit
⚠️ Never commit .env.local to GitHub.
Use .gitignore to keep your API keys private.

📁 Folder Structure
csharp
Copy code
original-insurance/
├── public/              # Static files (favicon, logo, etc.)
├── src/
│   ├── assets/          # Images & media
│   ├── components/      # Navbar, Footer, Icons, etc.
│   ├── pages/           # Home, About, Services, Contact, Locations
│   ├── lib/             # Site metadata (site.ts)
│   ├── App.tsx          # Root app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global Tailwind styles
├── firebase.json        # Firebase Hosting config
├── .firebaserc          # Firebase project mapping
├── .gitignore
├── package.json
└── README.md
📸 Screenshots
🏠 Home Page
Hero, services, and testimonials all tuned for clarity and mobile flow.

💬 Contact Page
Instant callback form + phone/email/Google Maps integration.

💡 Future Improvements
Add a CMS for easy content updates.

Integrate Google Reviews dynamically.

Add analytics & tracking (GA4).

Expand blog or FAQ for SEO growth.

👨‍💻 Author
Brian Aiad
Senior Computer Science Student @ CSULB
Email: brian@originalinsurance.com
GitHub: @brian-aiad

🪶 License
This project is licensed under the MIT License — feel free to fork, modify, and improve with credit.

"Trust, transparency, and protection — that’s what Original Insurance stands for." 💙

yaml
Copy code

---


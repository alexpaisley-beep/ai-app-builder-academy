// Single source of truth for the "Set Up Your App Foundation" course.
//
// This module is intentionally framework-agnostic: it imports nothing (no
// lucide icons, no React) so it can be consumed from BOTH the browser bundle
// (src/data.js) and the Node seed script (prisma/seed.js, via dynamic import).
// Icons are a presentation concern and are attached in the frontend by mapping
// `iconName` -> a lucide component.
//
// Content shape per lesson:
//   - description: one-line summary shown in the lesson list
//   - content:     the real teaching body (paragraphs separated by blank lines)
//   - aiPrompts:   copy-paste "Ask AI this" examples
//   - checklist:   "you're done when..." completion items
//   - warnings:    common beginner mistakes to avoid

// App idea categories shown by the picker at the start of the course. Selecting
// one tailors the setup guidance slightly (examples + a build tip). This is a
// client-side preference only — nothing is written to the database.
export const appIdeaCategories = [
  {
    id: 'saas',
    name: 'SaaS tool',
    blurb: 'Software people pay for monthly to get a job done.',
    examples: ['Team analytics dashboard', 'Social media scheduler', 'Invoicing tool'],
    tip: 'Model your data around accounts/workspaces early — most SaaS data hangs off a "who owns this" relationship.'
  },
  {
    id: 'crm',
    name: 'CRM / business management app',
    blurb: 'Track customers, deals, and day-to-day operations.',
    examples: ['Sales pipeline', 'Client tracker', 'Simple inventory manager'],
    tip: 'Your core tables are usually Contacts and a record of interactions/deals. Start there.'
  },
  {
    id: 'ai-assistant',
    name: 'AI assistant app',
    blurb: 'An app where the AI does the main job for the user.',
    examples: ['Writing helper', 'Research summarizer', 'Support chatbot'],
    tip: 'You still need a normal database to store conversations and user input — the AI is a feature, not the foundation.'
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    blurb: 'Connect two groups of people: buyers and sellers.',
    examples: ['Local services marketplace', 'Rental listings', 'Freelance gig board'],
    tip: 'Marketplaces have two user types from day one. Sketch both sides before you build either.'
  },
  {
    id: 'booking',
    name: 'Booking / scheduling app',
    blurb: 'Let people reserve time, slots, or resources.',
    examples: ['Appointment booking', 'Class sign-ups', 'Room reservations'],
    tip: 'Time zones and double-booking are the hard parts. Plan a Bookings table with clear start/end times.'
  },
  {
    id: 'finance',
    name: 'Finance / budgeting app',
    blurb: 'Help people track money in, money out, and goals.',
    examples: ['Expense tracker', 'Personal budget', 'Small-business invoicing'],
    tip: 'Store amounts as integers (cents), never floats — money math with decimals will bite you.'
  },
  {
    id: 'content',
    name: 'Content / course platform',
    blurb: 'Publish lessons, articles, or media to an audience.',
    examples: ['Online course site', 'Newsletter/blog', 'Membership library'],
    tip: 'This very academy is a content platform: Course -> Module -> Lesson is a great starting shape.'
  },
  {
    id: 'productivity',
    name: 'Personal productivity app',
    blurb: 'Help one person stay organized and get things done.',
    examples: ['To-do app', 'Note taker', 'Habit tracker'],
    tip: 'Keep v1 single-user. You can add accounts later — don\'t let auth block your first working version.'
  },
  {
    id: 'custom',
    name: 'Custom idea',
    blurb: 'Something that doesn\'t fit a neat box — that\'s fine.',
    examples: ['Your specific idea', 'A tool only you need', 'A weird experiment'],
    tip: 'Describe your app in one sentence, then ask AI which of the common patterns above it most resembles.'
  }
];

export const course = {
  slug: 'set-up-your-app-foundation',
  title: 'Set Up Your App Foundation',
  description:
    'Go from a fuzzy idea to a deployed, database-backed app skeleton: pick what to build, create a GitHub repo, understand the project structure, choose a PostgreSQL option, deploy on Railway, and verify everything works — using AI as leverage while still understanding each step.',
  modules: [
    {
      slug: 'choose-what-youre-building',
      iconName: 'Lightbulb',
      title: 'Choose What You’re Building',
      level: 'Foundation',
      time: '35 min',
      description:
        'Pick an app idea you can actually finish, define your user, and write a one-sentence spec before touching any code.',
      lessons: [
        {
          title: 'Why your app type shapes everything',
          time: '7 min',
          description: 'The kind of app you pick decides your data, your screens, and your first hard problem.',
          content:
            'Before you write a line of code, you need to know what you are building. This is not a formality — the type of app you choose quietly decides almost every later decision: what data you store, what screens you need, and where the tricky parts will be.\n\nA budgeting app lives or dies on accurate money math. A booking app lives or dies on times and double-bookings. A marketplace needs two kinds of users from day one. If you skip this step, you end up rebuilding your foundation halfway through — the most expensive moment to change anything.\n\nYou do not need a perfect idea. You need a clear, small, finishable one. Use the category picker at the top of this module to anchor yourself, then move on.',
          aiPrompts: [
            'I want to build a [your idea]. What are the 3-4 core "things" (data models) this app will need to store? Keep it simple.',
            'What is the single hardest technical problem in a [app type] app, and how do beginners usually get it wrong?'
          ],
          checklist: [
            'You can name your app type in one of the categories above',
            'You can list the 3-4 main pieces of data it stores',
            'You know the one part that will be hardest'
          ],
          warnings: [
            'Do not pick an idea so big you can’t finish a v1 in a weekend of focused work.',
            'Do not start coding before you can describe the app in one sentence.'
          ]
        },
        {
          title: 'Explore the idea categories',
          time: '8 min',
          description: 'Browse common app types and steal the data shape that fits yours.',
          content:
            'Most apps are variations on a handful of patterns: SaaS tools, CRMs, AI assistants, marketplaces, booking apps, finance apps, content platforms, and personal productivity apps. Each pattern comes with a rough data shape you can borrow instead of inventing from scratch.\n\nLook at the categories above and find the one closest to your idea — even a "custom" idea usually resembles one of them. When you select a category, this course shows tailored examples and a build tip so the rest of the setup advice fits your app.\n\nBorrowing a known pattern is not cheating. It is how experienced builders move fast: start from the standard shape, then change only what makes your app special.',
          aiPrompts: [
            'My idea is [one sentence]. Which of these patterns does it most resemble: SaaS, CRM, AI assistant, marketplace, booking, finance, content platform, or productivity? Explain why.',
            'Show me the typical database tables for a [chosen category] app, with one line explaining each.'
          ],
          checklist: [
            'You’ve selected an app category in the picker above',
            'You’ve read the tailored tip for your category',
            'You can explain how your idea is similar to (and different from) the pattern'
          ],
          warnings: [
            'Don’t force your idea into a category it doesn’t fit just to feel certain — "custom" is a valid answer.',
            'Don’t copy every table from an example; you only need the ones your v1 actually uses.'
          ]
        },
        {
          title: 'Define your core user and their painful problem',
          time: '10 min',
          description: 'Name one specific user and the annoying problem your app removes.',
          content:
            'Good apps solve a real, specific, annoying problem for a specific person. "An app for everyone" is an app for no one. Pick one user — "a freelance designer who forgets to invoice clients" is far more useful than "small businesses."\n\nThen write down the painful workflow they do today without your app. The pain is your product. Your app’s job is to make that one workflow faster, simpler, or less error-prone.\n\nThis keeps you honest later. Every time you’re tempted to add a feature, you ask: does this help my one user with their one painful problem? If not, it waits.',
          aiPrompts: [
            'Here is my user: [describe them]. Here is their painful workflow today: [describe it]. Help me write a sharper, more specific version of both.',
            'Act as a skeptical product mentor. Poke holes in whether [my user] really has [this problem] badly enough to use a new app.'
          ],
          checklist: [
            'You’ve named ONE specific user (not "everyone")',
            'You’ve written the painful workflow they do today',
            'You can explain how your app makes that workflow better'
          ],
          warnings: [
            'Avoid targeting "all users" — specificity is what makes a v1 buildable.',
            'Don’t confuse a feature you think is cool with a problem your user actually has.'
          ]
        },
        {
          title: 'Write a one-sentence build spec',
          time: '10 min',
          description: 'Compress your whole plan into one sentence you can build against.',
          content:
            'Now compress everything into one sentence: "[App name] helps [specific user] to [do the painful thing] by [the core feature]." For example: "ClientPing helps freelance designers get paid on time by reminding them to send invoices."\n\nThat sentence is your compass. It tells you what to build first (the core feature) and what to ignore (everything else). Pin it somewhere you’ll see it.\n\nYou’ll carry this sentence into the next modules — it becomes your repo name, your README’s first line, and the thing you check every build decision against. AI can help you build fast, but only you can decide what to build. This sentence is that decision.',
          aiPrompts: [
            'Turn this into one clear sentence of the form "[App] helps [user] to [outcome] by [core feature]": [your notes].',
            'Given this one-sentence spec, what is the absolute smallest first version (v1) I should build? List only the must-have features.'
          ],
          checklist: [
            'You have a single sentence describing your app',
            'The sentence names the user, the outcome, and the core feature',
            'You’ve saved it somewhere you’ll see it while building'
          ],
          warnings: [
            'If your sentence needs an "and" for a second major feature, your v1 is probably too big.',
            'Don’t skip this because it feels obvious — vague specs cause vague, unfinished apps.'
          ]
        }
      ]
    },
    {
      slug: 'create-your-github-repo',
      iconName: 'GitBranch',
      title: 'Create Your GitHub Repo',
      level: 'Workflow',
      time: '40 min',
      description:
        'Get your code into version control: create a GitHub account, make a repo, and learn the clone → commit → push loop.',
      lessons: [
        {
          title: 'What GitHub is and why you need it',
          time: '8 min',
          description: 'GitHub is the save-game system and home base for your code.',
          content:
            'GitHub is where your code lives online. Think of it as a save-game system with unlimited slots: every commit is a save point you can return to, and your repo is the cloud copy that won’t vanish if your laptop dies.\n\nIt does three big jobs. It backs up your code. It records the history of every change, so you can undo mistakes. And it’s the place deployment tools like Railway connect to in order to ship your app to the world.\n\nGit (the tool) and GitHub (the website) are different but related: Git tracks changes on your computer; GitHub stores and shares them online. You’ll use both, and AI is great at explaining any Git command you don’t recognize.',
          aiPrompts: [
            'Explain the difference between Git and GitHub like I’m completely new, in 4 sentences.',
            'What does a commit actually do, and why do people say "commit early, commit often"?'
          ],
          checklist: [
            'You can explain in one sentence what GitHub is for',
            'You understand a commit is a save point',
            'You know Railway will later connect to this repo to deploy'
          ],
          warnings: [
            'Don’t treat GitHub as just a backup — its real power is the history of changes.',
            'Don’t wait until your code is "perfect" to put it on GitHub. Start the repo early.'
          ]
        },
        {
          title: 'Create your account and your first repo',
          time: '10 min',
          description: 'Sign up, create a repository, and add a README.',
          content:
            'Go to github.com and create a free account. Then create a new repository — name it after your app (your one-sentence spec’s app name works great). Keep it simple: a short name, lowercase, with hyphens instead of spaces.\n\nCheck the box to add a README file. The README is the front page of your project: it should start with your one-sentence spec so anyone (including future you) instantly knows what this app is. Choose "private" if you want it hidden for now, or "public" if you don’t mind people seeing it.\n\nYou now have a home base online. Everything you build will flow into this repo.',
          aiPrompts: [
            'Suggest 5 short, lowercase, hyphenated repo names for an app described as: [your one-sentence spec].',
            'Write a clear starter README for my app. First line is the spec: [your spec]. Include sections: What it is, How to run, Status.'
          ],
          checklist: [
            'You have a GitHub account',
            'You’ve created a repository named after your app',
            'Your README’s first line is your one-sentence spec'
          ],
          warnings: [
            'Avoid spaces and capital letters in the repo name — they cause annoyances later.',
            'If your repo will hold secrets later, make it private — you can’t un-publish a leaked key.'
          ]
        },
        {
          title: 'Clone the repo and make your first commit',
          time: '12 min',
          description: 'Copy the repo to your computer, change a file, and save the change.',
          content:
            'Cloning means copying your online repo down to your computer so you can work on it. You’ll use the green "Code" button on GitHub to get the repo URL, then run `git clone <url>` in your terminal. Now you have a local folder linked to GitHub.\n\nMake a small change — edit the README, save it. Then run `git add .` (stage your changes) and `git commit -m "Update README"` (save a checkpoint with a message). The message should say what changed, in plain language.\n\nIf any command errors out, copy the exact error into AI and ask what it means. This is the real skill: not memorizing commands, but knowing how to recover when they complain.',
          aiPrompts: [
            'I ran `git clone [url]` and got this error: [paste error]. What does it mean and how do I fix it?',
            'Explain `git add` vs `git commit` vs `git push` using a simple save-game analogy.'
          ],
          checklist: [
            'You’ve cloned the repo to your computer',
            'You made a small edit and saw it in the folder',
            'You ran `git add .` and `git commit -m "..."` successfully'
          ],
          warnings: [
            'A commit only saves to your computer — it is NOT on GitHub until you push (next lesson).',
            'Write real commit messages ("Add login form"), not "stuff" or "asdf" — future you will thank you.'
          ]
        },
        {
          title: 'Push, branch, and open a pull request',
          time: '10 min',
          description: 'Send commits to GitHub and learn the safe way to make changes.',
          content:
            'Pushing sends your local commits up to GitHub: `git push`. Refresh your repo page and you’ll see your changes online. That round trip — edit, add, commit, push — is the core loop you’ll repeat thousands of times.\n\nFor anything bigger than a tiny fix, work on a branch: `git checkout -b my-feature` makes a parallel copy where you can experiment without breaking your main code. When it’s ready, you push the branch and open a Pull Request (PR) on GitHub — a proposal to merge your changes into the main branch.\n\nPRs are where you (or a teammate, or an AI reviewer) review changes before they go live. Even solo, branches and PRs keep your main branch stable and deployable.',
          aiPrompts: [
            'Walk me through creating a branch, pushing it, and opening a pull request on GitHub, step by step.',
            'I’m solo. When is it worth making a branch versus just committing to main? Give me a simple rule.'
          ],
          checklist: [
            'You pushed a commit and saw it on GitHub',
            'You created a branch with `git checkout -b`',
            'You opened at least one pull request'
          ],
          warnings: [
            'Don’t experiment directly on your main branch once your app is deployed — use a branch.',
            'If `git push` is rejected, you usually need to `git pull` first — read the message, don’t force-push blindly.'
          ]
        }
      ]
    },
    {
      slug: 'understand-the-project-structure',
      iconName: 'FolderTree',
      title: 'Understand the Project Structure',
      level: 'Foundation',
      time: '38 min',
      description:
        'Learn what the files and folders in a web app actually do, so the codebase stops looking like magic.',
      lessons: [
        {
          title: 'The anatomy of a web app project',
          time: '9 min',
          description: 'A tour of the folders and files you’ll see in almost every project.',
          content:
            'Open any web app and you’ll see a familiar set of folders: a `src/` folder for your app’s code, a `package.json` listing what the project needs, a `node_modules/` folder of downloaded dependencies, and config files at the root. It looks intimidating, but it’s a small number of repeating patterns.\n\nMost of what you edit lives in `src/`. Most of what you ignore is `node_modules/` (generated automatically — never edit it). Config files at the root tell tools how to build and run your app.\n\nThe goal of this module is simple: make the project stop feeling like magic. When you can point at a file and say what it does, you can change it with confidence — and check whatever the AI generated.',
          aiPrompts: [
            'I’m looking at my project. Here is the file list: [paste it]. Explain what each top-level folder and file does in one line.',
            'Which files in a typical web app should I never edit by hand, and why?'
          ],
          checklist: [
            'You can identify where your app’s code lives (usually `src/`)',
            'You know not to edit `node_modules/`',
            'You can name what `package.json` is for'
          ],
          warnings: [
            'Never hand-edit `node_modules/` — it’s regenerated and your changes vanish.',
            'Don’t commit `node_modules/` to GitHub — a `.gitignore` file should exclude it.'
          ]
        },
        {
          title: 'Frontend vs backend vs database',
          time: '10 min',
          description: 'The three layers of almost every app and how they talk.',
          content:
            'Almost every app has three layers. The frontend is what the user sees and clicks — it runs in their browser. The backend is the server that does work the browser can’t safely do, like talking to the database. The database is where data is stored permanently.\n\nThey talk in a chain: the frontend asks the backend for data over the network (an API call), the backend asks the database, and the answer travels back. The user never touches the database directly — that would be a security disaster.\n\nThis separation is why this very project keeps database code on the server only and exposes read-only API endpoints. Knowing which layer you’re editing tells you what’s safe to do there.',
          aiPrompts: [
            'Explain frontend, backend, and database using a restaurant analogy (customer, waiter, kitchen).',
            'In my project, how can I tell whether a file runs in the browser (frontend) or on the server (backend)?'
          ],
          checklist: [
            'You can explain what each layer does in one sentence',
            'You understand the frontend talks to the database THROUGH the backend',
            'You know the browser should never hold the database connection string'
          ],
          warnings: [
            'Never put your database connection string or secret keys in frontend code — it ships to every visitor.',
            'Don’t let the browser write directly to the database; route it through the backend (we’re not wiring writes yet anyway).'
          ]
        },
        {
          title: 'Reading package.json and scripts',
          time: '10 min',
          description: 'The control panel of your project: dependencies and commands.',
          content:
            '`package.json` is your project’s control panel. Two parts matter most. `dependencies` lists the libraries your app needs — when someone runs `npm install`, these get downloaded into `node_modules/`. `scripts` are named shortcuts for commands.\n\nWhen you run `npm run build` or `npm run dev`, you’re running a script defined here. Open the `scripts` section and read it like a menu: each line is "name on the left, actual command on the right." This is how you discover what a project can do.\n\nIn this project you’ll see scripts like `build`, `start`, and the `prisma:*` database commands. Reading them tells you exactly how the app is built, started, and seeded — no guessing.',
          aiPrompts: [
            'Here is my package.json scripts section: [paste it]. Explain what each script does and when I’d run it.',
            'What is the difference between a dependency and a devDependency, simply?'
          ],
          checklist: [
            'You found the `scripts` section in package.json',
            'You can explain what `npm install` does',
            'You can name which script builds the app and which starts it'
          ],
          warnings: [
            'Don’t run random `npm` scripts you don’t understand on a production database — read what they do first.',
            'If `npm install` fails, read the actual error; don’t just delete things hoping it fixes itself.'
          ]
        },
        {
          title: 'Environment variables and secrets',
          time: '9 min',
          description: 'How apps store passwords and config without putting them in the code.',
          content:
            'Some values should never be written directly into your code: database passwords, API keys, connection strings. These are secrets. Instead, apps read them from environment variables — values supplied by the environment the app runs in.\n\nLocally, these live in a `.env` file that is NOT committed to GitHub (a `.gitignore` keeps it out). In production, platforms like Railway let you set the same variables in a dashboard. The code reads `process.env.DATABASE_URL` and doesn’t care where it came from.\n\nThis is exactly how this project handles its database connection. A `.env.example` file shows which variables are needed without exposing real values — a pattern you should copy in your own apps.',
          aiPrompts: [
            'Explain environment variables and why secrets go in a .env file instead of in the code.',
            'Write a .env.example for an app that needs a DATABASE_URL and a PORT, with comments explaining each.'
          ],
          checklist: [
            'You understand secrets come from environment variables, not hardcoded values',
            'You know `.env` must be in `.gitignore`',
            'You’ve seen the project’s `.env.example` and what it lists'
          ],
          warnings: [
            'NEVER commit a real `.env` file with secrets to GitHub — if you do, rotate those secrets immediately.',
            'Don’t paste real secret keys into AI chats or screenshots; use placeholders.'
          ]
        }
      ]
    },
    {
      slug: 'pick-your-database-option',
      iconName: 'Database',
      title: 'Pick Your Database Option',
      level: 'Data',
      time: '40 min',
      description:
        'Understand why apps need a database and choose the right PostgreSQL option for your project.',
      lessons: [
        {
          title: 'Why your app needs a database',
          time: '8 min',
          description: 'Where your app’s data lives between visits.',
          content:
            'A database is where your app remembers things. Without one, everything a user enters disappears the moment they close the tab. With one, accounts, posts, bookings, and budgets persist forever (or until deleted).\n\nWe’re using PostgreSQL (“Postgres”), a free, battle-tested database that powers everything from tiny side projects to huge companies. It stores data in tables — like spreadsheets with strict rules — and your app reads and writes rows in those tables.\n\nYou don’t talk to Postgres in raw database language here; a tool called Prisma lets your code describe tables and queries in a friendlier way. But the mental model is simple: tables hold rows, rows hold your app’s data.',
          aiPrompts: [
            'Explain what a relational database like PostgreSQL is, using a spreadsheet analogy.',
            'For my [app type] app, what tables would I likely need? List them with a one-line purpose each.'
          ],
          checklist: [
            'You can explain why an app needs a database in one sentence',
            'You know we’re using PostgreSQL',
            'You can name a few tables your own app will need'
          ],
          warnings: [
            'Don’t store important data only in the browser (localStorage) — it’s easily lost and not shared across devices.',
            'Don’t over-design your tables on day one; start with the few your v1 needs.'
          ]
        },
        {
          title: 'The four Postgres options compared',
          time: '12 min',
          description: 'Railway, Supabase, Neon, and local Postgres — what each is good at.',
          content:
            'You have four solid ways to get a PostgreSQL database. They all speak the same Postgres language, so your app code barely changes between them — the main difference is convenience.\n\nRailway PostgreSQL: a database that lives right next to where you’ll deploy. Easiest path if you’re deploying on Railway, because hosting and database are in one place.\n\nSupabase PostgreSQL: Postgres plus a friendly dashboard and SQL editor, with auth and file storage you can grow into later. Great when you want to click around and see your data.\n\nNeon PostgreSQL: serverless Postgres that scales to zero when idle — a modern, low-maintenance fit for web apps and great free tiers.\n\nLocal Postgres: Postgres installed on your own computer. Excellent for learning how it really works, but fiddly to install and configure — often more friction than a beginner wants.',
          aiPrompts: [
            'Compare Railway Postgres, Supabase, Neon, and local Postgres for a beginner deploying on Railway. One paragraph each, with a recommendation.',
            'I picked [option]. Walk me through exactly how to create a database and find my connection string.'
          ],
          checklist: [
            'You can describe what each of the four options is best at',
            'You understand they all use the same Postgres under the hood',
            'You know which one is easiest if you deploy on Railway'
          ],
          warnings: [
            'Don’t pick local Postgres just because it feels "real" — installation headaches stall a lot of beginners.',
            'Don’t mix options mid-project without reason; switching connection strings is easy, migrating live data is not.'
          ]
        },
        {
          title: 'Choosing the right one for your app',
          time: '10 min',
          description: 'A simple decision rule based on where you deploy and what you need next.',
          content:
            'Here’s a simple rule. If you’re deploying on Railway and just want it to work, use Railway Postgres — one platform, no extra accounts. If you want a visual dashboard and SQL editor, or you know you’ll add auth and file storage soon, choose Supabase. If you want a modern serverless database with a generous free tier and minimal upkeep, choose Neon. Only choose local Postgres if your goal right now is to learn the internals and you’re comfortable troubleshooting installs.\n\nYour app type nudges the choice a little. An AI assistant or content platform that mostly reads and writes rows is happy on any of them. A project where you’ll soon want built-in user accounts leans toward Supabase.\n\nWhatever you pick, you’re not locked in forever. Because they’re all Postgres, moving later mostly means swapping a connection string and re-running your migration.',
          aiPrompts: [
            'My app is a [app type], I’m deploying on [Railway/other], and I [do/don’t] want a dashboard. Which Postgres option fits best and why?',
            'I expect to add user logins later. Does that change whether I should start with Supabase? Explain the trade-off.'
          ],
          checklist: [
            'You’ve chosen one of the four options',
            'You can explain in one sentence why it fits your app',
            'You understand you can switch later because they’re all Postgres'
          ],
          warnings: [
            'Don’t agonize over this — for a v1, any of the hosted options is a fine, reversible choice.',
            'Don’t choose based on a feature you "might" use in a year; choose for what your v1 needs.'
          ]
        },
        {
          title: 'Create your database and get the connection string',
          time: '10 min',
          description: 'Spin up your chosen database and grab the two URLs your app needs.',
          content:
            'Time to create the database. In your chosen platform (Railway, Supabase, or Neon), create a new Postgres database — it’s usually a single button. The platform then gives you a connection string: a URL starting with `postgresql://` that contains the host, username, and password your app uses to connect.\n\nMany platforms give you two URLs: a pooled one for your running app (DATABASE_URL) and a direct one for running migrations (DIRECT_URL). This project uses exactly that pattern. Copy them somewhere safe for the next module — you’ll paste them into environment variables, never into your code.\n\nTreat these strings like passwords, because they contain one. Anyone with your connection string can read and change your data.',
          aiPrompts: [
            'I’m using [Railway/Supabase/Neon]. Give me the exact click-by-click steps to create a Postgres database and copy its connection string.',
            'What’s the difference between a pooled connection URL and a direct connection URL, and why do migrations prefer the direct one?'
          ],
          checklist: [
            'You created a Postgres database on your chosen platform',
            'You copied the connection string (DATABASE_URL)',
            'If provided, you also copied the direct URL (DIRECT_URL) for migrations'
          ],
          warnings: [
            'Never paste your real connection string into code, commits, or public chats — it’s a password.',
            'If a platform offers both pooled and direct URLs, keep both; migrations may fail without the direct one.'
          ]
        }
      ]
    },
    {
      slug: 'deploy-your-app-on-railway',
      iconName: 'Rocket',
      title: 'Deploy Your App on Railway',
      level: 'Deployment',
      time: '40 min',
      description:
        'Put your app on the internet: connect your repo to Railway, set environment variables, and read logs when things break.',
      lessons: [
        {
          title: 'What deployment actually means',
          time: '8 min',
          description: 'Moving your app from your laptop to a server anyone can reach.',
          content:
            'Deployment means taking the app that runs on your computer and putting it on a server that’s online 24/7, so anyone with the link can use it. Your laptop sleeps and changes IP addresses; a deployment platform keeps your app running at a stable web address.\n\nRailway is one such platform. You point it at your GitHub repo, it builds your app the same way `npm run build` does locally, and then it runs your start command on a server. When you push new commits, it can rebuild and redeploy automatically.\n\nThe mental shift is small but important: "it works on my machine" is not the same as "it works deployed." The rest of this module is about closing that gap calmly.',
          aiPrompts: [
            'Explain what "deploying an app" means to a beginner, and why "works on my machine" isn’t enough.',
            'What does a platform like Railway actually do when it deploys my GitHub repo, step by step?'
          ],
          checklist: [
            'You can explain deployment in one sentence',
            'You understand Railway builds and runs your app from your repo',
            'You know pushing to GitHub can trigger a redeploy'
          ],
          warnings: [
            'Don’t assume that because it runs locally it will run deployed — environment differences (env vars!) cause most failures.',
            'Don’t deploy secrets in your code; set them as environment variables on Railway instead.'
          ]
        },
        {
          title: 'Connect your repo to Railway',
          time: '10 min',
          description: 'Create a Railway project from your GitHub repository.',
          content:
            'Sign in to Railway with your GitHub account, then create a new project and choose "Deploy from GitHub repo." Pick the repo you created earlier. Railway will look at your project, install dependencies, and try to build and start it.\n\nRailway reads your `package.json` to know how to build (`build` script) and start (`start` script) the app. If your scripts are correct — and in this project they are — Railway mostly just works. The first deploy may take a couple of minutes.\n\nDon’t panic if the first deploy isn’t green. A missing environment variable (like DATABASE_URL) is the usual reason, and that’s exactly what the next lesson fixes.',
          aiPrompts: [
            'Give me step-by-step instructions to deploy a GitHub repo to Railway for the first time.',
            'Railway built my app but it crashes on start. Here are the logs: [paste]. What’s the likely cause?'
          ],
          checklist: [
            'You connected Railway to your GitHub account',
            'You created a project from your repo',
            'You’ve seen Railway attempt a build (green or not)'
          ],
          warnings: [
            'Don’t expect the very first deploy to be perfect — missing env vars commonly cause a red first deploy.',
            'Make sure your `start` script actually starts the server; a wrong start command fails instantly.'
          ]
        },
        {
          title: 'Set environment variables on Railway',
          time: '12 min',
          description: 'Give your deployed app its database connection and config.',
          content:
            'Your deployed app needs the same secrets your local `.env` holds — most importantly the database connection string. In your Railway project, open the Variables section and add `DATABASE_URL` (and `DIRECT_URL` if your database provides one) using the strings you copied in the previous module.\n\nIf you created your database on Railway itself, Railway can wire the connection variable for you automatically — one of the reasons Railway Postgres is the easiest path. If you’re using Supabase or Neon, paste their connection strings in by hand.\n\nAfter setting variables, Railway redeploys. The app now reads `process.env.DATABASE_URL` on the server — exactly the code path you learned about in the project-structure module.',
          aiPrompts: [
            'Walk me through adding DATABASE_URL and DIRECT_URL as environment variables in Railway.',
            'I added my variables but the app still can’t reach the database. Here’s the error: [paste]. What should I check?'
          ],
          checklist: [
            'You added DATABASE_URL in Railway’s Variables section',
            'You added DIRECT_URL too if your provider gives one',
            'Railway redeployed after you saved the variables'
          ],
          warnings: [
            'A typo or extra space in a connection string breaks it silently — paste carefully.',
            'Don’t hardcode these values in code as a "quick fix"; they belong in Railway’s variables.'
          ]
        },
        {
          title: 'Read logs and fix a failed deploy',
          time: '10 min',
          description: 'Use logs as your debugging superpower instead of guessing.',
          content:
            'When a deploy fails, the logs tell you why — they’re the single most useful debugging tool you have. In Railway, open your service’s Deploy and Runtime logs and read from the top for the first error, not the last line.\n\nMost beginner deploy failures fall into a few buckets: a missing environment variable, a build/start script problem, or the database being unreachable. The log usually names which one. Copy the exact error message — that’s the key.\n\nThis is where AI shines as leverage: paste the real error into AI and ask what it means and how to fix it. But read the explanation, don’t just blindly apply fixes — understanding the error is how you avoid hitting it again.',
          aiPrompts: [
            'Here are my Railway deploy logs: [paste the first error]. Explain what it means and the most likely fix.',
            'My deploy says it can’t reach the database server. What are the top 3 causes and how do I check each?'
          ],
          checklist: [
            'You found your app’s logs in Railway',
            'You can spot the FIRST error in the log, not just the last line',
            'You’ve fixed at least one failed deploy using the log message'
          ],
          warnings: [
            'Don’t read only the last log line — the root cause is usually the first error above it.',
            'Don’t paste fixes from AI without reading them; a wrong "fix" can hide the real problem.'
          ]
        }
      ]
    },
    {
      slug: 'connect-the-pieces-and-verify-everything',
      iconName: 'CheckCircle2',
      title: 'Connect the Pieces and Verify Everything',
      level: 'Verification',
      time: '38 min',
      description:
        'Wire your database to your deployed app, create your tables, add starter data, and prove it all works end to end.',
      lessons: [
        {
          title: 'Wire your database to your app',
          time: '9 min',
          description: 'Connect your app code to the database you created.',
          content:
            'You have an app deployed and a database created. Now they need to actually talk. The link is the connection string in your environment variables — your app reads `DATABASE_URL` and uses it to open a connection to Postgres.\n\nIn this project, a small server module creates a single database client from `process.env.DATABASE_URL` and reuses it. That’s a common, sane pattern: one connection setup, used everywhere on the server. Your job at this stage is just to make sure the variable is present and correct in both your local `.env` and Railway.\n\nWhen the wiring is right, the app can run database queries. When it’s wrong, you get connection errors — which, thanks to the last module, you now know how to read in the logs.',
          aiPrompts: [
            'Explain how an app uses a DATABASE_URL environment variable to connect to PostgreSQL.',
            'How can I confirm my app is reading the right DATABASE_URL in production without printing the secret itself?'
          ],
          checklist: [
            'DATABASE_URL is set both locally (.env) and on Railway',
            'You understand the app connects using that single variable',
            'You know connection errors will show up in the logs'
          ],
          warnings: [
            'Don’t log the full connection string to debug it — mask the password if you must print anything.',
            'Make sure local and production point to the database you expect; mixing them up causes confusing results.'
          ]
        },
        {
          title: 'Run migrations to create your tables',
          time: '11 min',
          description: 'Turn your schema into real tables in the database.',
          content:
            'A migration is a script that changes your database’s structure — most importantly, creating your tables. Your schema file describes the tables you want; running the migration makes the database match that description.\n\nIn this project you run `npm run prisma:deploy` (which runs `prisma migrate deploy`) to apply migrations. Migrations prefer the direct connection (DIRECT_URL) because they do structural work; if the direct host isn’t reachable from your environment, this project falls back to DATABASE_URL so the migration can still run.\n\nAfter migrations succeed, your empty-but-structured tables exist. There’s no data yet — that’s the next step — but the shape is in place, and queries against those tables will stop failing with "table does not exist."',
          aiPrompts: [
            'Explain what a database migration does, and the difference between `migrate dev` and `migrate deploy`.',
            'My migration failed with [paste error]. Is this a connection problem or a schema problem, and how do I tell?'
          ],
          checklist: [
            'You ran the migration command (`npm run prisma:deploy`)',
            'The command completed without errors',
            'You understand your tables now exist but are empty'
          ],
          warnings: [
            'Don’t run experimental schema-resetting commands against a database with real data.',
            'A "table does not exist" error almost always means migrations haven’t run yet — run them before seeding.'
          ]
        },
        {
          title: 'Seed starter data',
          time: '9 min',
          description: 'Fill your fresh tables with initial content to work against.',
          content:
            'Seeding means inserting some starter rows so your app has something to show. An empty database is correct but boring — and it makes it hard to tell whether your app is working or just blank.\n\nIn this project, `npm run prisma:seed` runs a seed script that inserts the course, its modules, and their lessons. The script is written to be idempotent: running it again updates existing rows instead of creating duplicates, so it’s safe to re-run.\n\nSeeds are great for development and for first deploys. Later you’ll add real data through your app, but a seed guarantees there’s always a known starting state to test against.',
          aiPrompts: [
            'What is database seeding and why is an idempotent seed script (safe to re-run) a good idea?',
            'Write a simple seed plan for my [app type] app: which tables to fill first and with what example rows.'
          ],
          checklist: [
            'You ran the seed command (`npm run prisma:seed`)',
            'It reported how many rows it created/updated',
            'You understand re-running it won’t create duplicates'
          ],
          warnings: [
            'Don’t seed fake data into a production database that already has real user data.',
            'If seeding fails with "table does not exist," your migrations didn’t run — go back one step.'
          ]
        },
        {
          title: 'Verify with health checks and endpoints',
          time: '9 min',
          description: 'Prove the whole chain works by checking the API responses.',
          content:
            'The final step of any setup is proof. Don’t assume it works — check. This project exposes a health endpoint, `/api/health/db`, that returns `{ "ok": true }` when the app can reach the database. Hitting it is the fastest way to confirm the app-to-database link is alive.\n\nThen check the content endpoints: `/api/courses` should return your seeded course with its modules, and `/api/modules` should return the modules. If those return your data, the entire chain — repo, deploy, database, migration, seed — is working end to end. That’s a real milestone: a deployed, database-backed app skeleton.\n\nGet in the habit of verifying after every meaningful change. A 30-second check now saves hours of confused debugging later.',
          aiPrompts: [
            'How do I call my deployed app’s `/api/health/db` endpoint from the browser or with curl, and what should a healthy response look like?',
            'My /api/health/db returns ok:false. Given the setup chain (env vars -> migration -> seed), what should I check, in order?'
          ],
          checklist: [
            '/api/health/db returns ok: true',
            '/api/courses returns your seeded course and its modules',
            '/api/modules returns the seeded modules'
          ],
          warnings: [
            'Don’t call setup "done" until the health check is green and the endpoints return data.',
            'If health is ok but endpoints are empty, you likely migrated but forgot to seed.'
          ]
        }
      ]
    }
  ]
};

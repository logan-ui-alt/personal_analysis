import PDFDocument from 'pdfkit';

export function generateProjectGuidePDF(): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 40,
        info: {
          Title: 'OmniLife Studio - Mentor Presentation Guide',
          Author: 'OmniLife Engineering Team',
          Subject: 'Project Overview, Technology Stack, and Page Explanations',
        },
      });

      const buffers: Buffer[] = [];
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err) => reject(err));

      // Header Brand Accent
      doc.rect(40, 40, 515, 6).fill('#9333ea'); // Purple bar

      doc.moveDown(1);
      doc
        .font('Helvetica-Bold')
        .fontSize(22)
        .fillColor('#3b0764')
        .text('OmniLife Studio', 40, 55);

      doc
        .font('Helvetica-Bold')
        .fontSize(14)
        .fillColor('#db2777')
        .text('Mentor Presentation Guide & System Architecture');

      doc
        .font('Helvetica')
        .fontSize(9)
        .fillColor('#64748b')
        .text('Full-Stack Personal Analytics, 1,200-Record Python ML Forecasting, Simulation & Gemini AI');

      doc.moveDown(0.8);
      doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
      doc.moveDown(0.8);

      // Section 1: Casual Elevator Pitch
      doc
        .font('Helvetica-Bold')
        .fontSize(12)
        .fillColor('#581c87')
        .text('1. Casual 30-Second Elevator Pitch');
      doc.moveDown(0.3);

      doc
        .font('Helvetica-Oblique')
        .fontSize(9.5)
        .fillColor('#334155')
        .text(
          '"Hi! I built OmniLife Studio, an integrated personal intelligence and decision-support web platform. Instead of scattering study logs, finances, and habits across disparate tools, OmniLife unifies Study, Money, Habits, and Goals into a single system powered by a PostgreSQL relational database. On top of that, it provides a 1,200-record x 6-feature Python Machine Learning forecasting engine, an interactive What-If Decision Simulator with risk analysis, and a Gemini AI mentor grounded in live database numbers."',
          { indent: 10, lineGap: 3 }
        );

      doc.moveDown(0.8);

      // Section 2: Technology Stack Breakdown
      doc
        .font('Helvetica-Bold')
        .fontSize(12)
        .fillColor('#581c87')
        .text('2. Technology Stack & Architecture');
      doc.moveDown(0.4);

      const techStack = [
        {
          layer: 'Frontend UI',
          tech: 'React 19 + TypeScript + Tailwind CSS',
          desc: 'Component-driven SPA styled in a radiant White, Purple & Pink theme with interactive SVG charts and celebratory micro-interactions.',
        },
        {
          layer: 'Database Layer',
          tech: 'Cloud SQL (PostgreSQL) + Drizzle ORM',
          desc: 'Stores structured tables: study_sessions, finance_transactions, habits, habit_logs, goals, simulation_scenarios, and forecast_models with relational schema integrity.',
        },
        {
          layer: 'Backend API',
          tech: 'Node.js Express + TSX Runtime',
          desc: 'Central RESTful API orchestrating authentication middleware, database queries, Python service invocation, and Gemini API calls.',
        },
        {
          layer: 'Data Science & ML',
          tech: 'Python 3 Backend Engine',
          desc: 'Dedicated Python pipeline handling 1,200-row CSV datasets with 6 statistical features, training ridge regression models (R2, MAE, MSE), and computing sensitivity curves.',
        },
        {
          layer: 'Artificial Intelligence',
          tech: 'Google Gemini 3.8 Flash SDK',
          desc: 'Integrated securely on the server-side with telemetry headers and live database state injection to answer questions with deep context.',
        },
        {
          layer: 'Authentication',
          tech: 'Firebase Auth (Google OAuth & Guest Mode)',
          desc: 'Allows users to sign in with their Google accounts or immediately explore via seamless local session tokens.',
        },
      ];

      techStack.forEach((t) => {
        doc
          .font('Helvetica-Bold')
          .fontSize(9.5)
          .fillColor('#9333ea')
          .text(`• ${t.layer}: `, { continued: true })
          .font('Helvetica-Bold')
          .fillColor('#0f172a')
          .text(`${t.tech} — `, { continued: true })
          .font('Helvetica')
          .fillColor('#475569')
          .text(t.desc, { lineGap: 2 });
        doc.moveDown(0.3);
      });

      doc.moveDown(0.6);

      // Section 3: Page-by-Page Walkthrough
      doc
        .font('Helvetica-Bold')
        .fontSize(12)
        .fillColor('#581c87')
        .text('3. Page-by-Page Breakdown & Features');
      doc.moveDown(0.4);

      const pages = [
        {
          name: 'Dashboard (Central Analytics)',
          summary:
            'Shows the holistic Life Synergy Index (0-100), 4 KPI summary cards, and rich interactive graphs: Study Duration vs. Focus Depth trend, Money Flow Breakdown (Inflow vs. Outflow vs. Saved Money), 7-Day Habit Streak bars, and Goal Milestones progress.',
        },
        {
          name: 'Study Tracker',
          summary:
            'Logs cognitive learning sessions by subject, topic, duration, technique (Deep Work, Pomodoro, Active Recall, Feynman), focus score (1-10), and energy rating. Saves records to PostgreSQL and syncs hours with study goals.',
        },
        {
          name: 'Finance (Money) Manager',
          summary:
            'Replaces dollar signs with clear Money currency units. Tracks Money Inflow, Money Spent, and Invested Capital, calculating net savings and savings velocity percentage with categorized ledgers.',
        },
        {
          name: 'Habits & Routine Consistency',
          summary:
            'Features an interactive 7-day consistency matrix where clicking day circles toggles completion directly in the PostgreSQL habit_logs table. Tracks unbroken streaks and longest records.',
        },
        {
          name: 'Goal Setting & Roadmaps',
          summary:
            'SMART goals linked to Study, Money, Habits, or Career with interactive milestone checklists. Hitting 100% completion triggers celebratory confetti effects and marks the goal achieved.',
        },
        {
          name: 'Forecasting (ML 1,200 Records)',
          summary:
            'Multivariate predictive modeling trained on 1,200 records and 6 feature matrices (Study performance, Money growth, Habit compounding). Features an Import CSV upload button, R2 accuracy metrics, Feature Importance bar chart, and Multi-period forecast graphs with 95% confidence intervals.',
        },
        {
          name: 'What-If Decision Simulation Engine',
          summary:
            'Interactive sliders (study hours, deep work, sleep, savings rate, expected returns, screen time) dynamically recalculating projected curves vs baselines. Features quantified Risk Analysis (0-100) and actionable strategic recommendations with gain estimates.',
        },
        {
          name: 'AI Chatbot (Gemini 3.8 Mentor)',
          summary:
            'Context-aware assistant grounded in the user live database snapshot. Suggests prompt shortcuts and answers questions about study schedules, money allocations, and ML forecast tradeoffs.',
        },
      ];

      pages.forEach((p, idx) => {
        if (doc.y > 700) {
          doc.addPage();
        }

        doc
          .font('Helvetica-Bold')
          .fontSize(9.5)
          .fillColor('#db2777')
          .text(`${idx + 1}. ${p.name}`, { lineGap: 1 });

        doc
          .font('Helvetica')
          .fontSize(9)
          .fillColor('#334155')
          .text(p.summary, { indent: 10, lineGap: 2 });

        doc.moveDown(0.4);
      });

      // Section 4: Live Demo Workflow
      if (doc.y > 660) {
        doc.addPage();
      } else {
        doc.moveDown(0.6);
      }

      doc
        .font('Helvetica-Bold')
        .fontSize(12)
        .fillColor('#581c87')
        .text('4. Recommended 3-Step Live Demo for Your Mentor');
      doc.moveDown(0.4);

      const demoSteps = [
        '1. Quick Entry & Live Sync: Click "+ Quick Log" in the top bar to record a study or money session. Show it immediately appear in the ledger and update the Dashboard charts.',
        '2. Decision Simulation: Navigate to the Simulation tab and drag the sliders (e.g. increase study hours or savings rate). Show your mentor how the simulated trajectory curve, risk score, and strategic recommendations update live.',
        '3. ML Forecasting: Open Forecasting, click "Train Model", and demonstrate how the Python backend computes the R2 score, weights, and 365-day confidence band.',
      ];

      demoSteps.forEach((step) => {
        doc
          .font('Helvetica')
          .fontSize(9)
          .fillColor('#1e293b')
          .text(step, { indent: 8, lineGap: 2 });
        doc.moveDown(0.2);
      });

      // Footer
      doc.moveDown(1);
      doc.strokeColor('#e2e8f0').lineWidth(0.8).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
      doc.moveDown(0.4);
      doc
        .font('Helvetica')
        .fontSize(8)
        .fillColor('#94a3b8')
        .text('Generated by OmniLife Studio · Powered by React, Node.js, PostgreSQL, Python ML & Gemini AI', {
          align: 'center',
        });

      doc.end();
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Generates an end-to-end Speaker Presentation Script PDF
 * with word-for-word spoken dialogue, timing marks, visual cues, and Q&A answers.
 */
export function generatePresentationScriptPDF(): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 40,
        info: {
          Title: 'OmniLife Studio - Mentor Presentation Script (Ready to Speak)',
          Author: 'OmniLife Engineering Team',
          Subject: 'Verbatim Spoken Presentation Script with Timings and Q&A Guide',
        },
      });

      const buffers: Buffer[] = [];
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err) => reject(err));

      // Header Banner
      doc.rect(40, 40, 515, 6).fill('#db2777'); // Pink bar
      doc.moveDown(1);

      doc
        .font('Helvetica-Bold')
        .fontSize(22)
        .fillColor('#3b0764')
        .text('OmniLife Studio', 40, 55);

      doc
        .font('Helvetica-Bold')
        .fontSize(14)
        .fillColor('#db2777')
        .text('Mentor Presentation Script — Ready to Read & Speak');

      doc
        .font('Helvetica')
        .fontSize(9)
        .fillColor('#64748b')
        .text('Complete 6-Minute Speaking Flow · Stage Directions · Timing Guidelines · Q&A Preparation');

      doc.moveDown(0.6);
      doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
      doc.moveDown(0.8);

      const scriptSections = [
        {
          time: '0:00 - 0:45',
          title: 'Opening Hook & Problem Statement',
          action: '[Action: Stand confident, share your screen showing the OmniLife Studio Dashboard]',
          script:
            '"Good morning / afternoon! Today I am excited to present OmniLife Studio. Most of us juggle our lives across multiple disconnected apps: one for studying or flashcards, a budgeting app for money, a habit tracker, and scattered to-do lists. The problem is that these life domains compound together in the real world: when you sleep poorly, your study focus drops; when you overspend, financial anxiety affects your routine.\n\nI built OmniLife Studio to unify Study, Money, Habits, and Goals into a single system powered by a PostgreSQL relational database. But more than just logging data, OmniLife features a 1,200-record Machine Learning forecasting engine, an interactive What-If Decision Simulator, and an AI Mentor powered by Gemini that understands your actual live numbers."',
        },
        {
          time: '0:45 - 1:45',
          title: 'Technology Stack & Engineering Architecture',
          action: '[Action: Briefly point to the top navigation and PostgreSQL badge]',
          script:
            '"Before diving into the features, here is how the architecture is engineered under the hood:\n\n• Frontend: Built with React 19 and TypeScript, styled using Tailwind CSS in a clean White, Purple, and Pink design system with custom interactive SVG charts and celebratory feedback.\n• Database: Backed by Cloud SQL PostgreSQL with Drizzle ORM. Every study session, financial transaction, habit streak, and saved scenario is stored in typed relational tables.\n• Backend & ML: A Node.js Express server acts as the primary API, while a dedicated Python 3 engine handles dataset manipulation, ridge regression model training on 1,200 rows with 6 features, and sensitivity curve projections.\n• AI Integration: Google Gemini 3.8 Flash is integrated server-side. Crucially, the server injects a real-time summary of the user\'s database into Gemini\'s context so it acts as an informed advisor rather than a generic chatbot."',
        },
        {
          time: '1:45 - 3:00',
          title: 'Live Walkthrough: Dashboard, Study, Money, Habits & Goals',
          action: '[Action: Click "+ Quick Log", log a quick 45-min study session, then click into Study and Finance]',
          script:
            '"Let me demonstrate the live workflow. Here on the Dashboard, you see the Life Synergy Index at the top—a composite score from 0 to 100 measuring how well study hours, savings velocity, and habit consistency reinforce each other. Below it are interactive charts: study duration and focus depth, money flow allocation, and habit momentum.\n\nNotice the + Quick Log button in the navbar. Let me record a 45-minute Deep Work session in Machine Learning with a focus score of 9. Within milliseconds, this is committed to PostgreSQL, and the dashboard immediately updates.\n\nIn the Study module, we track cognitive metrics like techniques—Pomodoro, Active Recall, Feynman method—and focus scores.\nIn the Money module, we track income inflows, expenses, and investments, calculating net savings and savings velocity percentage with categorized ledgers.\nIn the Habits module, we have an interactive 7-Day Consistency Matrix. Clicking any day toggles check-ins directly in the database, with automatic streak counting.\nAnd in Goals, milestone checklists advance goal completion toward 100% with confetti celebrations."',
        },
        {
          time: '3:00 - 4:15',
          title: 'Advanced Feature: Machine Learning Forecasting (1,200 Records)',
          action: '[Action: Switch to the Forecasting (ML) tab, click "Train Model", and highlight the R² score & graph]',
          script:
            '"Now let\'s look at the predictive modeling engine. In the Forecasting tab, we have three domain models: Study performance, Money growth, and Habit compounding.\n\nEach model is trained on a multivariate dataset of 1,200 records across 6 feature variables—such as deep work ratio, sleep hours, distractions, and savings rate. When I click "Train Model", the Python backend runs ridge regression, outputting the R² accuracy score (over 85%), Mean Absolute Error (MAE), and a Feature Importance chart showing which variables have the highest statistical impact.\n\nOn the right, it renders a multi-period forecast trajectory from 7 days out to 365 days, complete with a 95% confidence interval shaded band. Users can also import their own custom CSV files to retrain the model on personal data."',
        },
        {
          time: '4:15 - 5:30',
          title: 'Advanced Feature: What-If Decision Simulation & Gemini AI',
          action: '[Action: Switch to Simulation tab, adjust the Study Hours and Sleep sliders, then open AI Chatbot]',
          script:
            '"Next is the What-If Decision Simulation Engine. Often we ask: \'What happens if I study 7 hours instead of 4?\' or \'What if I increase my savings rate to 35%?\'\n\nUsing interactive sliders, the engine dynamically recalculates the projected trajectory curve against the status-quo baseline in real time. It computes a quantitative Risk Score (0-100)—warning of burnout risk if sleep drops too low, or frugality fatigue if savings cuts are too harsh—and outputs prescriptive strategic recommendations.\n\nFinally, the AI Chatbot powered by Gemini 3.8 Flash is grounded in the database. When I ask, \'Based on my current study hours and savings, how should I schedule my weekend?\', it reads the user\'s real logs from PostgreSQL and gives advice specifically tailored to their actual numbers."',
        },
        {
          time: '5:30 - 6:30',
          title: 'Conclusion & Mentor Q&A Cheat Sheet',
          action: '[Action: Return to Dashboard, open the Mentor Guide modal, and conclude confidently]',
          script:
            '"In summary, OmniLife Studio bridges the gap between daily self-tracking and predictive intelligence by combining modern web technologies, relational PostgreSQL storage, Python data science, and Gemini AI.\n\nThank you, and I would love to answer any questions!"',
        },
      ];

      scriptSections.forEach((sec) => {
        if (doc.y > 660) {
          doc.addPage();
        }

        // Timing Header & Title
        doc
          .font('Helvetica-Bold')
          .fontSize(11)
          .fillColor('#581c87')
          .text(`[${sec.time}] ${sec.title}`);

        doc.moveDown(0.2);

        // Stage Direction / Action
        doc
          .font('Helvetica-Bold')
          .fontSize(8.5)
          .fillColor('#db2777')
          .text(sec.action);

        doc.moveDown(0.3);

        // Spoken Text
        doc
          .font('Helvetica')
          .fontSize(9)
          .fillColor('#1e293b')
          .text(sec.script, { indent: 8, lineGap: 3 });

        doc.moveDown(0.7);
        doc.strokeColor('#f1f5f9').lineWidth(0.5).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
        doc.moveDown(0.5);
      });

      // Mentor Q&A Cheat Sheet Section
      if (doc.y > 550) {
        doc.addPage();
      }

      doc
        .font('Helvetica-Bold')
        .fontSize(12)
        .fillColor('#581c87')
        .text('Mentor Q&A Cheat Sheet (Prepared Answers for Top Questions)');
      doc.moveDown(0.4);

      const qaPairs = [
        {
          q: 'Q: Why did you choose PostgreSQL over a NoSQL database like MongoDB?',
          a: 'A: OmniLife relies on strict relational integrity: habit logs belong to habits, study sessions link to target goals, and financial entries require exact numeric consistency. PostgreSQL provides ACID compliance, strong types, and relational foreign keys, with Drizzle ORM ensuring compile-time TypeScript safety.',
        },
        {
          q: 'Q: How does the Python ML engine communicate with the Node.js server?',
          a: 'A: Node.js executes Python child processes or dedicated service endpoints with structured JSON input parameters, capturing standardized JSON outputs containing the R² score, coefficients, residuals, and forecast intervals.',
        },
        {
          q: 'Q: How do you prevent Gemini from hallucinating or giving generic advice?',
          a: 'A: We use Retrieval-Augmented Grounding: before calling the Gemini SDK, the Express server queries PostgreSQL for the user recent metrics (hours studied, net savings, active habit streaks) and injects this context directly into the system prompt.',
        },
        {
          q: 'Q: How is the Life Synergy Index calculated?',
          a: 'A: It uses a weighted multi-factor formula combining average focus score (40%), savings rate (20%), habit streak momentum (25%), and goal fulfillment velocity (15%), capped between 0 and 100.',
        },
      ];

      qaPairs.forEach((qa) => {
        if (doc.y > 700) {
          doc.addPage();
        }

        doc
          .font('Helvetica-Bold')
          .fontSize(9)
          .fillColor('#7e22ce')
          .text(qa.q);

        doc
          .font('Helvetica')
          .fontSize(8.5)
          .fillColor('#334155')
          .text(qa.a, { indent: 8, lineGap: 2 });

        doc.moveDown(0.3);
      });

      // Footer
      doc.moveDown(1);
      doc.strokeColor('#e2e8f0').lineWidth(0.8).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
      doc.moveDown(0.3);
      doc
        .font('Helvetica')
        .fontSize(8)
        .fillColor('#94a3b8')
        .text('OmniLife Studio Presentation Script · Ready for Mentor Review · Full-Stack React, PostgreSQL & Python ML', {
          align: 'center',
        });

      doc.end();
    } catch (e) {
      reject(e);
    }
  });
}

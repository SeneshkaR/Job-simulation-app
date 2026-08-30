// Career data with all 10 careers, colleague personas, and 3-tier trial structures
export const careers = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    emoji: '💻',
    category: 'Technology',
    description: 'Build software products that millions use daily. From apps to AI systems.',
    shortDescription: 'Code, collaborate, and create digital solutions.',
    salaryRange: { min: 65000, max: 180000, currency: 'USD' },
    educationYears: 4,
    demandLevel: 'high',
    workStyle: 'collaborative',
    environment: 'office-remote',
    colleagues: [
      {
        id: 'sarah-dev', name: 'Sarah Chen', role: 'Senior Developer', avatar: '👩‍💻',
        personality: 'Friendly mentor, patient, explains things clearly.',
        systemPrompt: 'You are Sarah Chen, a senior software developer with 8 years of experience mentoring juniors. Be encouraging but realistic. Use casual tech language. Keep replies 2-3 sentences. Sometimes drop hints instead of giving answers.'
      },
      {
        id: 'mike-lead', name: 'Mike Rodriguez', role: 'Tech Lead', avatar: '👨‍💼',
        personality: 'Direct, focused on deadlines, values clean code.',
        systemPrompt: 'You are Mike Rodriguez, tech lead who cares about shipping quality code on time. Be direct, sometimes stressed about deadlines. Push the user to think about edge cases. Keep replies short and professional.'
      },
      {
        id: 'priya-designer', name: 'Priya Patel', role: 'Product Designer', avatar: '🎨',
        personality: 'Creative, empathetic, user-focused.',
        systemPrompt: 'You are Priya Patel, product designer. You care deeply about user experience. Push the developer to think about how real users will feel. Warm tone, ask questions.'
      }
    ],
    quickTrial: {
      lecture: {
        title: 'What Software Engineers Really Do',
        sections: [
          { type: 'text', content: 'Software engineers do way more than just type code. About 40% of the day is talking with teammates, product managers, and designers.' },
          { type: 'highlight', content: 'It\'s a team sport. You\'re constantly reviewing others\' code and getting yours reviewed.' },
          { type: 'myth-vs-reality', myth: 'You sit alone and code all day.', reality: 'You attend stand-ups, pair programming, code reviews, and design discussions.' },
          { type: 'text', content: 'The best engineers aren\'t the fastest coders — they\'re the ones who ask smart questions and communicate clearly.' },
        ],
        durationMinutes: 5,
      },
      exercises: [
        {
          id: 'sw-ex1', type: 'prioritize', title: 'Morning Bug Triage',
          description: 'You just arrived. 4 issues are waiting. Order them by priority.',
          timeLimit: 90,
          items: [
            { id: 'a', text: '🔴 Users cannot log in (5000+ affected)', correctRank: 1 },
            { id: 'b', text: '🟡 Typo on About page', correctRank: 4 },
            { id: 'c', text: '🟠 Slow checkout for some users', correctRank: 2 },
            { id: 'd', text: '🟡 Dark mode toggle glitches', correctRank: 3 },
          ],
          explanation: 'Always fix blockers first (login), then revenue impact (checkout), then UX bugs, then cosmetics.',
          scoreWeight: { decisionMaking: 0.5, problemSolving: 0.5 },
        },
        {
          id: 'sw-ex2', type: 'decision', title: 'Standup Dilemma',
          description: 'Your teammate says the feature is "almost done" for the 3rd day. What do you do?',
          options: [
            { id: 'a', text: 'Ignore it — not your problem', score: 20, feedback: 'Ignoring blockers hurts the whole team.' },
            { id: 'b', text: 'Offer to pair-program with them', score: 100, feedback: 'Perfect. Collaboration unblocks people.' },
            { id: 'c', text: 'Tell the manager immediately', score: 50, feedback: 'Escalating too fast damages trust.' },
            { id: 'd', text: 'Ask kindly what is blocking them', score: 90, feedback: 'Great — empathy first.' },
          ],
          scoreWeight: { communication: 0.6, decisionMaking: 0.4 },
        },
      ],
    },
    dayTrial: {
      schedule: [
        { time: '09:00', title: 'Morning Check-in', description: 'Coffee and slack messages. 12 unread.', type: 'inbox' },
        { time: '09:30', title: 'Team Stand-up', description: '15-min sync with 6 team members.', type: 'meeting' },
        { time: '10:00', title: 'Feature Development', description: 'Build the user profile page.', type: 'task' },
        { time: '11:30', title: 'Code Review', description: 'Review Sarah pull request.', type: 'review' },
        { time: '12:30', title: 'Lunch Break', description: 'Chat with teammates about a weekend hackathon.', type: 'social' },
        { time: '13:30', title: 'Bug Fix', description: 'Production issue: checkout fails on Safari.', type: 'urgent' },
        { time: '15:00', title: 'Design Sync', description: 'Meet with Priya about new dashboard.', type: 'meeting' },
        { time: '16:00', title: 'Documentation', description: 'Write docs for the API you built last week.', type: 'task' },
        { time: '17:00', title: 'Wrap-up', description: 'Commit code, update tasks, sign off.', type: 'wrap' },
      ],
      stressEvents: [
        { title: 'Production Down!', description: 'The site is down and users are complaining. Fix it!', urgency: 'critical' },
      ],
    },
    weekTrial: {
      days: 5,
      teamProject: { title: 'Ship the Payment Redesign', description: 'Redesign checkout flow with the team by Friday.' },
      randomEventPool: [
        { type: 'message', from: 'sarah-dev', content: 'Hey, quick question about your PR — got 2 mins?' },
        { type: 'message', from: 'mike-lead', content: 'The client moved up the deadline. Can we make Wednesday?' },
        { type: 'call', from: 'priya-designer', topic: 'Design handoff review', urgency: 'medium' },
        { type: 'meeting', title: 'Sprint Planning', duration: 60 },
        { type: 'deadline', title: 'PR review needed', hoursRemaining: 2 },
      ],
    },
  },

  {
    id: 'nurse',
    title: 'Registered Nurse',
    emoji: '👩‍⚕️',
    category: 'Healthcare',
    description: 'Care for patients, save lives, and be the calm in chaos.',
    shortDescription: 'Front-line healthcare with real human impact.',
    salaryRange: { min: 55000, max: 120000, currency: 'USD' },
    educationYears: 4, demandLevel: 'high', workStyle: 'collaborative', environment: 'hospital',
    colleagues: [
      { id: 'linda-charge', name: 'Linda Foster', role: 'Charge Nurse', avatar: '👩‍⚕️',
        personality: 'Experienced, calm under pressure, no-nonsense.',
        systemPrompt: 'You are Linda Foster, charge nurse with 20 years experience. You mentor new nurses. Be calm, direct, and practical. Keep replies short — you are busy.' },
      { id: 'dr-james', name: 'Dr. James Wilson', role: 'Attending Physician', avatar: '👨‍⚕️',
        personality: 'Busy, respects nurses who advocate for patients.',
        systemPrompt: 'You are Dr. James Wilson, attending physician. Be brief and clinical, but appreciative when nurses escalate correctly.' },
    ],
    quickTrial: {
      lecture: {
        title: 'What Nurses Actually Do',
        sections: [
          { type: 'text', content: 'Nurses are the eyes and ears of the hospital. You spot problems before they become emergencies.' },
          { type: 'highlight', content: 'You will make 100+ small decisions every shift. Each one matters.' },
          { type: 'myth-vs-reality', myth: 'Nurses just follow doctor orders.', reality: 'Nurses catch mistakes, advocate for patients, and often know what is wrong first.' },
        ],
        durationMinutes: 5,
      },
      exercises: [
        { id: 'nr-ex1', type: 'prioritize', title: 'Shift Triage',
          description: 'Four patients need attention. Who do you see first?', timeLimit: 60,
          items: [
            { id: 'a', text: '🔴 Chest pain, sweating, age 62', correctRank: 1 },
            { id: 'b', text: '🟠 Post-op, needs pain med', correctRank: 3 },
            { id: 'c', text: '🟠 New admission, stable', correctRank: 4 },
            { id: 'd', text: '🔴 Falling oxygen levels', correctRank: 2 },
          ],
          explanation: 'Airway/breathing/circulation always come first.',
          scoreWeight: { decisionMaking: 0.6, skills: 0.4 } },
        { id: 'nr-ex2', type: 'decision', title: 'The Confused Patient',
          description: 'A patient who was fine an hour ago is now confused and slurring. What do you do first?',
          options: [
            { id: 'a', text: 'Wait 15 min and reassess', score: 10, feedback: 'Delaying could be dangerous.' },
            { id: 'b', text: 'Check vitals and call the doctor immediately', score: 100, feedback: 'Correct — could be a stroke.' },
            { id: 'c', text: 'Give them water and food', score: 20, feedback: 'Never feed a possible stroke patient.' },
            { id: 'd', text: 'Ask family if it is normal', score: 40, feedback: 'Family input helps but do not delay.' },
          ],
          scoreWeight: { decisionMaking: 0.7, skills: 0.3 } },
      ],
    },
    dayTrial: {
      schedule: [
        { time: '07:00', title: 'Shift Handoff', description: 'Receive report on 6 patients from night nurse.', type: 'meeting' },
        { time: '07:30', title: 'Morning Rounds', description: 'Check vitals and assess each patient.', type: 'task' },
        { time: '09:00', title: 'Medication Pass', description: 'Administer meds to all patients.', type: 'critical' },
        { time: '10:30', title: 'Doctor Rounds', description: 'Round with Dr. Wilson on Room 302.', type: 'meeting' },
        { time: '12:00', title: 'Rapid Response', description: 'Patient in 305 is deteriorating!', type: 'urgent' },
        { time: '13:30', title: 'Lunch (finally)', description: '20 min if you are lucky.', type: 'break' },
        { time: '14:00', title: 'Charting', description: 'Update patient records.', type: 'task' },
        { time: '15:30', title: 'Family Meeting', description: 'Explain care plan to worried family.', type: 'communication' },
        { time: '17:00', title: 'Shift Handoff', description: 'Report to evening nurse.', type: 'meeting' },
      ],
      stressEvents: [{ title: 'Code Blue!', description: 'Cardiac arrest in Room 308. GO!', urgency: 'critical' }],
    },
    weekTrial: {
      days: 5,
      teamProject: { title: 'Improve patient handoff protocol', description: 'Reduce miscommunication errors.' },
      randomEventPool: [
        { type: 'call', from: 'linda-charge', topic: 'Need help in Room 210', urgency: 'high' },
        { type: 'message', from: 'dr-james', content: 'Can you check Mrs. Kim labs and page me?' },
        { type: 'deadline', title: 'Medication audit due', hoursRemaining: 3 },
      ],
    },
  },

  {
    id: 'civil-engineer', title: 'Civil Engineer', emoji: '🏗️', category: 'Engineering',
    description: 'Design bridges, roads, and buildings that shape cities.',
    shortDescription: 'Turn blueprints into real infrastructure.',
    salaryRange: { min: 60000, max: 130000, currency: 'USD' },
    educationYears: 4, demandLevel: 'high', workStyle: 'mixed', environment: 'field',
    colleagues: [
      { id: 'raj-senior', name: 'Raj Kumar', role: 'Senior Engineer', avatar: '👷‍♂️',
        personality: 'Practical, safety-obsessed.',
        systemPrompt: 'You are Raj Kumar, senior civil engineer with 15 years experience. Safety first. Be practical and direct.' },
      { id: 'emma-pm', name: 'Emma Sullivan', role: 'Project Manager', avatar: '👷‍♀️',
        personality: 'Deadline-focused.',
        systemPrompt: 'You are Emma Sullivan, PM. You care about budget and timeline. Be brisk. Push for updates.' },
    ],
    quickTrial: {
      lecture: { title: 'The Real Job of Civil Engineers', sections: [
        { type: 'text', content: 'Civil engineers split time between office (CAD, meetings) and construction sites.' },
        { type: 'myth-vs-reality', myth: 'You sit at a computer all day.', reality: 'You spend 30-50% of time on sites, meetings, coordinating.' },
      ], durationMinutes: 5 },
      exercises: [{ id: 'ce-ex1', type: 'decision', title: 'Site Discovery',
        description: 'On site, you notice soil is softer than the geotech report said. What do you do?',
        options: [
          { id: 'a', text: 'Note it and continue as planned', score: 20, feedback: 'Ignoring conditions can cause collapse.' },
          { id: 'b', text: 'Stop work, notify PM, order new test', score: 100, feedback: 'Exactly right — safety over schedule.' },
          { id: 'c', text: 'Add more concrete to compensate', score: 30, feedback: 'You need data first.' },
          { id: 'd', text: 'Ask the contractor what they think', score: 50, feedback: 'Get input, but call engineers too.' },
        ], scoreWeight: { decisionMaking: 0.5, skills: 0.5 } }],
    },
    dayTrial: {
      schedule: [
        { time: '08:00', title: 'Email & Plans Review', description: 'Check overnight updates from contractor.', type: 'inbox' },
        { time: '09:00', title: 'Drive to Site', description: 'Bridge project 30 min away.', type: 'travel' },
        { time: '10:00', title: 'Site Inspection', description: 'Walk the site with the foreman.', type: 'field' },
        { time: '12:00', title: 'Working Lunch', description: 'Discuss timeline with contractor.', type: 'meeting' },
        { time: '13:00', title: 'CAD Work', description: 'Update foundation drawings.', type: 'task' },
        { time: '15:00', title: 'Client Call', description: 'Explain delay to the city planner.', type: 'communication' },
        { time: '16:00', title: 'Design Review', description: 'Meet with structural engineer.', type: 'meeting' },
      ],
      stressEvents: [{ title: 'Crack in Foundation!', description: 'Contractor calls: found unexpected crack.', urgency: 'high' }],
    },
    weekTrial: {
      days: 5, teamProject: { title: 'Complete bridge design phase', description: 'Deliver approved plans by Friday.' },
      randomEventPool: [
        { type: 'call', from: 'raj-senior', topic: 'Site issue', urgency: 'high' },
        { type: 'message', from: 'emma-pm', content: 'City wants revised drawings by tomorrow.' },
      ],
    },
  },

  {
    id: 'digital-marketer', title: 'Digital Marketer', emoji: '📱', category: 'Business',
    description: 'Run campaigns, analyze data, grow brands online.',
    shortDescription: 'Creative meets analytical in the digital world.',
    salaryRange: { min: 45000, max: 110000, currency: 'USD' },
    educationYears: 4, demandLevel: 'high', workStyle: 'collaborative', environment: 'office-remote',
    colleagues: [
      { id: 'jasmine-cmo', name: 'Jasmine Wu', role: 'Marketing Director', avatar: '💼',
        personality: 'Data-driven, strategic.',
        systemPrompt: 'You are Jasmine Wu, marketing director. Push for data-backed decisions.' },
      { id: 'carlos-designer', name: 'Carlos Rivera', role: 'Content Creator', avatar: '🎬',
        personality: 'Creative, trendy.',
        systemPrompt: 'You are Carlos Rivera, content creator. Love trends. Be enthusiastic and casual.' },
    ],
    quickTrial: {
      lecture: { title: 'Beyond the Ads', sections: [
        { type: 'text', content: 'Digital marketing: 30% campaigns, 20% analytics, 20% content, 15% strategy.' },
        { type: 'highlight', content: 'Most campaigns fail. Great marketers iterate fast.' },
      ], durationMinutes: 5 },
      exercises: [{ id: 'dm-ex1', type: 'decision', title: 'Budget Move',
        description: 'Ad A: $500 spent, 20 sales. Ad B: $500 spent, 5 sales. What now?',
        options: [
          { id: 'a', text: 'Kill B, double A budget', score: 100, feedback: 'Right — scale winners.' },
          { id: 'b', text: 'Give B more time', score: 30, feedback: 'You have data — act on it.' },
          { id: 'c', text: 'Split evenly', score: 20, feedback: 'That wastes money.' },
          { id: 'd', text: 'Pause both, redesign', score: 40, feedback: 'You have a winner!' },
        ], scoreWeight: { decisionMaking: 0.6, skills: 0.4 } }],
    },
    dayTrial: {
      schedule: [
        { time: '09:00', title: 'Dashboard Check', description: 'Review overnight campaign performance.', type: 'inbox' },
        { time: '10:00', title: 'Content Planning', description: 'Draft next week social calendar.', type: 'task' },
        { time: '11:30', title: 'Creative Sync', description: 'Brainstorm with Carlos about new video.', type: 'meeting' },
        { time: '13:00', title: 'Lunch', description: 'Podcast about marketing trends.', type: 'break' },
        { time: '14:00', title: 'A/B Test Setup', description: 'Design test for landing page.', type: 'task' },
        { time: '15:30', title: 'Client Report', description: 'Prepare weekly summary.', type: 'task' },
        { time: '16:30', title: 'Campaign Launch', description: 'Push new ads live.', type: 'critical' },
      ],
      stressEvents: [{ title: 'Ad Spend Bleeding!', description: 'Campaign is burning budget.', urgency: 'high' }],
    },
    weekTrial: { days: 5, teamProject: { title: 'Launch product campaign', description: 'Drive 1000 signups this week.' },
      randomEventPool: [
        { type: 'message', from: 'jasmine-cmo', content: 'CPA is up 40% — what happened?' },
        { type: 'call', from: 'carlos-designer', topic: 'Video draft feedback', urgency: 'medium' },
      ] },
  },

  {
    id: 'teacher', title: 'Teacher', emoji: '👨‍🏫', category: 'Education',
    description: 'Shape young minds and change lives.',
    shortDescription: 'More than lectures — you build futures.',
    salaryRange: { min: 45000, max: 85000, currency: 'USD' },
    educationYears: 4, demandLevel: 'medium', workStyle: 'independent', environment: 'office',
    colleagues: [
      { id: 'principal-ross', name: 'Ms. Ross', role: 'Principal', avatar: '👩‍🏫',
        personality: 'Supportive but expects results.',
        systemPrompt: 'You are Ms. Ross, principal. Warm but firm. Expect professionalism.' },
      { id: 'sam-teacher', name: 'Sam Nakamura', role: 'Veteran Teacher', avatar: '🧑‍🏫',
        personality: '20 years teaching.',
        systemPrompt: 'You are Sam Nakamura, veteran teacher. Share practical tips. Warm, occasionally sarcastic about admin.' },
    ],
    quickTrial: {
      lecture: { title: 'The Real Life of a Teacher', sections: [
        { type: 'text', content: 'You arrive 6:30am to prep. Teach 6 classes. Handle 3 conflicts. Grade until 8pm.' },
        { type: 'myth-vs-reality', myth: 'Teachers get summers off.', reality: 'Most spend summers on planning and training.' },
      ], durationMinutes: 5 },
      exercises: [{ id: 't-ex1', type: 'decision', title: 'Classroom Moment',
        description: 'A quiet student suddenly bursts into tears mid-lesson. What do you do?',
        options: [
          { id: 'a', text: 'Ignore it and continue lesson', score: 10, feedback: 'Students matter more.' },
          { id: 'b', text: 'Stop lesson, address publicly', score: 30, feedback: 'Could embarrass them.' },
          { id: 'c', text: 'Assign group work, check quietly', score: 100, feedback: 'Perfect — private support.' },
          { id: 'd', text: 'Send to counselor immediately', score: 60, feedback: 'Understand first.' },
        ], scoreWeight: { communication: 0.6, decisionMaking: 0.4 } }],
    },
    dayTrial: {
      schedule: [
        { time: '06:30', title: 'Early Prep', description: 'Set up materials, review lesson plans.', type: 'task' },
        { time: '07:30', title: 'Greet Students', description: 'Welcome each student by name.', type: 'communication' },
        { time: '08:00', title: 'Period 1', description: 'Teach algebra.', type: 'teaching' },
        { time: '09:00', title: 'Period 2', description: 'Handle a disruption.', type: 'teaching' },
        { time: '10:30', title: 'Planning Period', description: 'Grade quizzes and plan tomorrow.', type: 'task' },
        { time: '12:00', title: 'Lunch Duty', description: 'Supervise cafeteria.', type: 'field' },
        { time: '13:00', title: 'Period 4', description: 'Struggling student needs attention.', type: 'teaching' },
        { time: '15:30', title: 'Parent Call', description: 'Difficult conversation.', type: 'communication' },
        { time: '16:30', title: 'Faculty Meeting', description: 'Weekly staff meeting.', type: 'meeting' },
      ],
      stressEvents: [{ title: 'Fight in Hallway!', description: 'Two students shoving each other.', urgency: 'high' }],
    },
    weekTrial: { days: 5, teamProject: { title: 'Improve class test scores', description: 'Design intervention.' },
      randomEventPool: [
        { type: 'message', from: 'principal-ross', content: 'Can we chat about the Johnson situation?' },
        { type: 'call', from: 'sam-teacher', topic: 'Advice on discipline case', urgency: 'medium' },
      ] },
  },

  {
    id: 'lawyer', title: 'Lawyer', emoji: '⚖️', category: 'Law',
    description: 'Fight for justice, negotiate deals, and shape the law.',
    shortDescription: 'Research, argue, and advocate for clients.',
    salaryRange: { min: 70000, max: 250000, currency: 'USD' },
    educationYears: 7, demandLevel: 'medium', workStyle: 'mixed', environment: 'office',
    colleagues: [
      { id: 'partner-kim', name: 'David Kim', role: 'Senior Partner', avatar: '👨‍💼',
        personality: 'Sharp, demanding.',
        systemPrompt: 'You are David Kim, senior partner. Demanding but fair. Speak formally.' },
      { id: 'paralegal-anna', name: 'Anna Blake', role: 'Paralegal', avatar: '📚',
        personality: 'Detail-oriented.',
        systemPrompt: 'You are Anna Blake, paralegal. Efficient, occasionally overwhelmed.' },
    ],
    quickTrial: {
      lecture: { title: 'Life as a Lawyer', sections: [
        { type: 'text', content: 'Most lawyers spend 70% of time on research, drafting, and client calls. Court is rare.' },
        { type: 'myth-vs-reality', myth: 'Lawyers argue in court all day.', reality: 'Most work is negotiation and writing.' },
      ], durationMinutes: 5 },
      exercises: [{ id: 'l-ex1', type: 'decision', title: 'The Ethical Bind',
        description: 'Your client tells you they lied on a form. What do you do?',
        options: [
          { id: 'a', text: 'Pretend you did not hear', score: 10, feedback: 'Violates ethics.' },
          { id: 'b', text: 'Advise them to correct it', score: 100, feedback: 'Correct.' },
          { id: 'c', text: 'Withdraw immediately', score: 40, feedback: 'Extreme.' },
          { id: 'd', text: 'Report them', score: 20, feedback: 'Privilege limits this.' },
        ], scoreWeight: { decisionMaking: 0.4, communication: 0.3, skills: 0.3 } }],
    },
    dayTrial: {
      schedule: [
        { time: '08:30', title: 'Research', description: 'Look up precedents for the Jones case.', type: 'task' },
        { time: '10:00', title: 'Client Call', description: 'Update client on progress.', type: 'communication' },
        { time: '11:00', title: 'Contract Drafting', description: 'Draft merger agreement.', type: 'task' },
        { time: '12:30', title: 'Lunch with Partner', description: 'Discuss firm strategy.', type: 'meeting' },
        { time: '14:00', title: 'Court Prep', description: 'Prepare for tomorrow hearing.', type: 'critical' },
        { time: '15:30', title: 'Negotiation', description: 'Call opposing counsel.', type: 'communication' },
        { time: '17:00', title: 'Document Review', description: '200 pages of discovery.', type: 'task' },
      ],
      stressEvents: [{ title: 'Emergency Filing!', description: 'Court filing due in 2 hours!', urgency: 'critical' }],
    },
    weekTrial: { days: 5, teamProject: { title: 'Win Jones v. Corp case', description: 'Prepare case by Friday.' },
      randomEventPool: [
        { type: 'call', from: 'partner-kim', topic: 'Case strategy', urgency: 'high' },
        { type: 'message', from: 'paralegal-anna', content: 'Found the precedent you wanted.' },
      ] },
  },

  {
    id: 'accountant', title: 'Accountant', emoji: '📊', category: 'Business',
    description: 'Track the money, advise the business, ensure compliance.',
    shortDescription: 'The financial backbone of every organization.',
    salaryRange: { min: 55000, max: 120000, currency: 'USD' },
    educationYears: 4, demandLevel: 'high', workStyle: 'independent', environment: 'office',
    colleagues: [
      { id: 'cfo-marcus', name: 'Marcus Green', role: 'CFO', avatar: '💰',
        personality: 'Numbers-focused.', systemPrompt: 'You are Marcus Green, CFO. Concise and analytical.' },
      { id: 'auditor-nia', name: 'Nia Thompson', role: 'External Auditor', avatar: '🔍',
        personality: 'Meticulous.', systemPrompt: 'You are Nia Thompson, auditor. Ask probing questions.' },
    ],
    quickTrial: {
      lecture: { title: 'What Accountants Really Do', sections: [
        { type: 'text', content: 'Not just tax returns. You advise on major decisions, catch fraud, forecast the future.' },
      ], durationMinutes: 5 },
      exercises: [{ id: 'a-ex1', type: 'decision', title: 'Suspicious Entry',
        description: 'You notice a $50k expense with no receipt. What do you do?',
        options: [
          { id: 'a', text: 'Approve it — must be legitimate', score: 10 },
          { id: 'b', text: 'Flag it and investigate', score: 100 },
          { id: 'c', text: 'Ignore it', score: 5 },
          { id: 'd', text: 'Approve but note in memo', score: 30 },
        ], scoreWeight: { decisionMaking: 0.5, skills: 0.5 } }],
    },
    dayTrial: {
      schedule: [
        { time: '09:00', title: 'Email Review', description: 'Vendor invoices.', type: 'inbox' },
        { time: '10:00', title: 'Monthly Close', description: 'Reconcile accounts.', type: 'task' },
        { time: '12:00', title: 'Lunch', description: 'Read industry news.', type: 'break' },
        { time: '13:00', title: 'Budget Meeting', description: 'Present Q3 forecast.', type: 'meeting' },
        { time: '15:00', title: 'Audit Prep', description: 'Prepare documentation.', type: 'task' },
        { time: '16:30', title: 'CFO Advisory', description: 'Recommend cost-cutting.', type: 'communication' },
      ],
      stressEvents: [{ title: 'Books Do Not Balance!', description: 'Off by $2000. Find it fast.', urgency: 'high' }],
    },
    weekTrial: { days: 5, teamProject: { title: 'Complete quarterly close', description: 'Deliver clean financials.' },
      randomEventPool: [
        { type: 'message', from: 'cfo-marcus', content: 'Board needs the numbers by 3pm.' },
        { type: 'call', from: 'auditor-nia', topic: 'Revenue recognition question', urgency: 'medium' },
      ] },
  },

  {
    id: 'data-scientist', title: 'Data Scientist', emoji: '📈', category: 'Technology',
    description: 'Turn messy data into insights that drive decisions.',
    shortDescription: 'Statistics + code + storytelling.',
    salaryRange: { min: 75000, max: 200000, currency: 'USD' },
    educationYears: 6, demandLevel: 'high', workStyle: 'mixed', environment: 'office-remote',
    colleagues: [
      { id: 'lead-elena', name: 'Elena Volkov', role: 'Lead Data Scientist', avatar: '🧑‍🔬',
        personality: 'Rigorous.', systemPrompt: 'You are Elena Volkov, lead DS. Push for rigorous analysis.' },
      { id: 'pm-alex', name: 'Alex Park', role: 'Product Manager', avatar: '📱',
        personality: 'Fast answers.', systemPrompt: 'You are Alex Park, PM. Want business answers, not jargon.' },
    ],
    quickTrial: {
      lecture: { title: 'Beyond the Hype', sections: [
        { type: 'text', content: '70% of the job is cleaning data and building pipelines. ML modeling is maybe 20%.' },
      ], durationMinutes: 5 },
      exercises: [{ id: 'ds-ex1', type: 'decision', title: 'Missing Data',
        description: '15% of your rows have missing values. What do you do?',
        options: [
          { id: 'a', text: 'Drop them all', score: 30, feedback: 'You might introduce bias.' },
          { id: 'b', text: 'Fill with average', score: 40, feedback: 'Loses info.' },
          { id: 'c', text: 'Investigate why missing first', score: 100, feedback: 'Correct — patterns matter.' },
          { id: 'd', text: 'Ignore', score: 5 },
        ], scoreWeight: { skills: 0.6, problemSolving: 0.4 } }],
    },
    dayTrial: {
      schedule: [
        { time: '09:00', title: 'Slack & Email', description: 'Overnight ML results.', type: 'inbox' },
        { time: '09:30', title: 'Data Cleaning', description: 'Handle missing values.', type: 'task' },
        { time: '11:00', title: 'Stakeholder Sync', description: 'Explain model to marketing.', type: 'meeting' },
        { time: '13:00', title: 'Model Training', description: 'Kick off training run.', type: 'task' },
        { time: '14:30', title: 'Dashboard Update', description: 'Build KPI visualization.', type: 'task' },
        { time: '16:00', title: 'Findings Presentation', description: 'Present to leadership.', type: 'communication' },
      ],
      stressEvents: [{ title: 'Model Predictions Wrong!', description: 'Production model misbehaving.', urgency: 'high' }],
    },
    weekTrial: { days: 5, teamProject: { title: 'Deploy churn prediction model', description: 'Ship to production.' },
      randomEventPool: [
        { type: 'message', from: 'pm-alex', content: 'Can you get me an answer in 2 hours?' },
        { type: 'call', from: 'lead-elena', topic: 'Model review', urgency: 'medium' },
      ] },
  },

  {
    id: 'psychologist', title: 'Psychologist', emoji: '🧠', category: 'Healthcare',
    description: 'Help people understand themselves and heal.',
    shortDescription: 'Deep listening and evidence-based therapy.',
    salaryRange: { min: 60000, max: 150000, currency: 'USD' },
    educationYears: 8, demandLevel: 'high', workStyle: 'independent', environment: 'office',
    colleagues: [
      { id: 'supervisor-diana', name: 'Dr. Diana Chen', role: 'Clinical Supervisor', avatar: '👩‍⚕️',
        personality: 'Warm, insightful.', systemPrompt: 'You are Dr. Diana Chen, clinical supervisor. Ask reflective questions.' },
      { id: 'peer-marcus', name: 'Dr. Marcus Bell', role: 'Colleague Psychologist', avatar: '🧑‍⚕️',
        personality: 'Peer support.', systemPrompt: 'You are Dr. Marcus Bell, fellow psychologist. Be collegial.' },
    ],
    quickTrial: {
      lecture: { title: 'Beyond Talking', sections: [
        { type: 'text', content: 'Therapy is structured. Every session has goals. You are not just listening — you are assessing.' },
      ], durationMinutes: 5 },
      exercises: [{ id: 'p-ex1', type: 'decision', title: 'Crisis Moment',
        description: 'A client says "sometimes I do not want to be here anymore." What do you do first?',
        options: [
          { id: 'a', text: 'Change the subject', score: 5, feedback: 'Avoidance is dangerous.' },
          { id: 'b', text: 'Assess safety directly and gently', score: 100, feedback: 'Correct — direct assessment saves lives.' },
          { id: 'c', text: 'Call 911', score: 30, feedback: 'Assess first.' },
          { id: 'd', text: 'Give hotline number', score: 40, feedback: 'Insufficient alone.' },
        ], scoreWeight: { decisionMaking: 0.4, communication: 0.4, skills: 0.2 } }],
    },
    dayTrial: {
      schedule: [
        { time: '08:30', title: 'Note Review', description: 'Prepare for today clients.', type: 'task' },
        { time: '09:00', title: 'Session 1', description: 'New client intake.', type: 'communication' },
        { time: '10:00', title: 'Session 2', description: 'Ongoing anxiety client.', type: 'communication' },
        { time: '11:00', title: 'Consultation Call', description: 'Discuss case with Dr. Chen.', type: 'meeting' },
        { time: '12:00', title: 'Lunch', description: 'Recharge.', type: 'break' },
        { time: '13:00', title: 'Session 3', description: 'Couples therapy.', type: 'communication' },
        { time: '14:00', title: 'Session 4', description: 'Depression, treatment progress.', type: 'communication' },
        { time: '15:00', title: 'Notes & Documentation', description: 'Write session notes.', type: 'task' },
        { time: '16:00', title: 'Team Case Conference', description: 'Discuss difficult cases.', type: 'meeting' },
      ],
      stressEvents: [{ title: 'Client in Crisis', description: 'Client texts about suicidal thoughts.', urgency: 'critical' }],
    },
    weekTrial: { days: 5, teamProject: { title: 'Develop treatment plan', description: 'Complete by Friday.' },
      randomEventPool: [
        { type: 'call', from: 'supervisor-diana', topic: 'Case supervision', urgency: 'medium' },
        { type: 'message', from: 'peer-marcus', content: 'Rough case today. Coffee later?' },
      ] },
  },

  {
    id: 'architect', title: 'Architect', emoji: '🏛️', category: 'Design',
    description: 'Design the buildings that shape how we live.',
    shortDescription: 'Art meets engineering meets budgets.',
    salaryRange: { min: 60000, max: 140000, currency: 'USD' },
    educationYears: 5, demandLevel: 'medium', workStyle: 'mixed', environment: 'office',
    colleagues: [
      { id: 'principal-nora', name: 'Nora Silva', role: 'Principal Architect', avatar: '👩‍🎨',
        personality: 'Vision-driven.', systemPrompt: 'You are Nora Silva, principal architect. Push for excellence.' },
      { id: 'engineer-tom', name: 'Tom Bradford', role: 'Structural Engineer', avatar: '🔧',
        personality: 'Code-focused.', systemPrompt: 'You are Tom Bradford, structural engineer. Care about safety and codes.' },
    ],
    quickTrial: {
      lecture: { title: 'The Reality of Architecture', sections: [
        { type: 'text', content: 'Only 10% of the job is sketching pretty buildings. The rest is codes, budgets, revisions.' },
        { type: 'myth-vs-reality', myth: 'Architects design and it gets built.', reality: 'Every design gets cut and revised.' },
      ], durationMinutes: 5 },
      exercises: [{ id: 'ar-ex1', type: 'decision', title: 'Budget Cut',
        description: 'Client cuts your budget 30%. What do you do?',
        options: [
          { id: 'a', text: 'Refuse to compromise', score: 10, feedback: 'You will lose the project.' },
          { id: 'b', text: 'Present 3 options with tradeoffs', score: 100, feedback: 'Perfect.' },
          { id: 'c', text: 'Silently reduce quality', score: 20, feedback: 'Bad faith.' },
          { id: 'd', text: 'Quit the project', score: 15, feedback: 'Extreme.' },
        ], scoreWeight: { problemSolving: 0.4, communication: 0.4, decisionMaking: 0.2 } }],
    },
    dayTrial: {
      schedule: [
        { time: '09:00', title: 'Morning Review', description: 'Check overnight redlines.', type: 'inbox' },
        { time: '10:00', title: 'Design Revisions', description: 'Update floor plans.', type: 'task' },
        { time: '11:30', title: 'Client Meeting', description: 'Present concept.', type: 'communication' },
        { time: '13:00', title: 'Lunch', description: 'Sketch ideas.', type: 'break' },
        { time: '14:00', title: 'Site Visit', description: 'Check construction progress.', type: 'field' },
        { time: '16:00', title: 'CAD Detailing', description: 'Draw connection details.', type: 'task' },
        { time: '17:00', title: 'Engineer Coordination', description: 'Meet with Tom.', type: 'meeting' },
      ],
      stressEvents: [{ title: 'Code Violation!', description: 'City rejected your permit — fix in 48h.', urgency: 'high' }],
    },
    weekTrial: { days: 5, teamProject: { title: 'Complete schematic design phase', description: 'Get approval by Friday.' },
      randomEventPool: [
        { type: 'call', from: 'principal-nora', topic: 'Design review', urgency: 'high' },
        { type: 'message', from: 'engineer-tom', content: 'Your beam layout will not hold. Let us talk.' },
      ] },
  },
];

export function getCareerById(id) {
  return careers.find(c => c.id === id);
}

export function getCareersByCategory(category) {
  return careers.filter(c => c.category === category);
}

export const categories = [...new Set(careers.map(c => c.category))];

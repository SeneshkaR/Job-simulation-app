import { applyCareerCorrections } from './careerCorrections';

export const careers = [
{
  "id": "software-engineer",
  "title": "Software Engineer",
  "emoji": "💻",
  "category": "Technology",
  "description": "Software engineers design, build, and maintain the applications, websites, and systems that power modern life. About 40% of the day is collaboration — reviewing code, planning features, and unblocking teammates — not just typing alone. The best engineers ask sharp questions and communicate clearly.",
  "shortDescription": "Code, collaborate, and create digital solutions.",
  "salaryRange": {
    "min": 65000,
    "max": 180000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "office-remote",
  "colleagues": [
    {
      "id": "sarah-dev",
      "name": "Sarah Chen",
      "role": "Senior Developer",
      "avatar": "👩‍💻",
      "personality": "Friendly mentor, patient, explains things clearly.",
      "systemPrompt": "You are Sarah Chen, a senior software developer with 8 years of experience mentoring juniors. Be encouraging but realistic. Use casual tech language. Keep replies 2-3 sentences. Sometimes drop hints instead of giving answers."
    },
    {
      "id": "mike-lead",
      "name": "Mike Rodriguez",
      "role": "Tech Lead",
      "avatar": "👨‍💼",
      "personality": "Direct, focused on deadlines, values clean code.",
      "systemPrompt": "You are Mike Rodriguez, tech lead who cares about shipping quality code on time. Be direct, sometimes stressed about deadlines. Push the user to think about edge cases. Keep replies short and professional."
    },
    {
      "id": "priya-designer",
      "name": "Priya Patel",
      "role": "Product Designer",
      "avatar": "🎨",
      "personality": "Creative, empathetic, user-focused.",
      "systemPrompt": "You are Priya Patel, product designer. You care deeply about user experience. Push the developer to think about how real users will feel. Warm tone, ask questions."
    }
  ],
  "quickTrial": {
    "lecture": {
      "title": "What Software Engineers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Software engineers do way more than just type code. About 40% of the day is talking with teammates, product managers, and designers. It’s a team sport — constant code review both directions."
        },
        {
          "type": "myth-vs-reality",
          "myth": "You sit alone and code all day.",
          "reality": "You attend stand-ups, pair-program, review code, and do design reviews."
        },
        {
          "type": "myth-vs-reality",
          "myth": "The fastest coder wins.",
          "reality": "The clearest communicator ships more, because their code lasts."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "sw-ex2",
        "type": "decision",
        "title": "Standup Dilemma",
        "description": "Your teammate says the feature is \"almost done\" for the 3rd day. What do you do?",
        "options": [
          {
            "id": "a",
            "text": "Ignore it — not your problem",
            "score": 20,
            "feedback": "Ignoring blockers hurts the whole team."
          },
          {
            "id": "b",
            "text": "Offer to pair-program with them",
            "score": 100,
            "feedback": "Perfect. Collaboration unblocks people."
          },
          {
            "id": "c",
            "text": "Tell the manager immediately",
            "score": 50,
            "feedback": "Escalating too fast damages trust."
          },
          {
            "id": "d",
            "text": "Ask kindly what is blocking them",
            "score": 90,
            "feedback": "Great — empathy first."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "soen-d2",
        "type": "decision",
        "title": "Software Engineer communication",
        "description": "A stakeholder is upset about an outcome related to your work as a software engineer. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "soen-d3",
        "type": "decision",
        "title": "Software Engineer problem solving",
        "description": "You discover a flaw in your software engineer work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "sw-ex1",
        "type": "prioritize",
        "title": "Morning Bug Triage",
        "description": "You just arrived. 4 issues are waiting. Order them by priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "🔴 Users cannot log in (5000+ affected)",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "🟡 Typo on About page",
            "correctRank": 4
          },
          {
            "id": "c",
            "text": "🟠 Slow checkout for some users",
            "correctRank": 2
          },
          {
            "id": "d",
            "text": "🟡 Dark mode toggle glitches",
            "correctRank": 3
          }
        ],
        "explanation": "Always fix blockers first (login), then revenue impact (checkout), then UX bugs, then cosmetics.",
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "09:00",
        "title": "Morning Check-in",
        "description": "Coffee and slack messages. 12 unread.",
        "type": "inbox"
      },
      {
        "time": "09:30",
        "title": "Team Stand-up",
        "description": "15-min sync with 6 team members.",
        "type": "meeting"
      },
      {
        "time": "10:00",
        "title": "Feature Development",
        "description": "Build the user profile page.",
        "type": "task"
      },
      {
        "time": "11:30",
        "title": "Code Review",
        "description": "Review Sarah pull request.",
        "type": "review"
      },
      {
        "time": "12:30",
        "title": "Lunch Break",
        "description": "Chat with teammates about a weekend hackathon.",
        "type": "social"
      },
      {
        "time": "13:30",
        "title": "Bug Fix",
        "description": "Production issue: checkout fails on Safari.",
        "type": "urgent"
      },
      {
        "time": "15:00",
        "title": "Design Sync",
        "description": "Meet with Priya about new dashboard.",
        "type": "meeting"
      },
      {
        "time": "16:00",
        "title": "Documentation",
        "description": "Write docs for the API you built last week.",
        "type": "task"
      },
      {
        "time": "17:00",
        "title": "Wrap-up",
        "description": "Commit code, update tasks, sign off.",
        "type": "wrap"
      }
    ],
    "stressEvents": [
      {
        "title": "Production Down!",
        "description": "The site is down and users are complaining. Fix it!",
        "urgency": "critical"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Ship the Payment Redesign",
      "description": "Redesign checkout flow with the team by Friday."
    },
    "randomEventPool": [
      {
        "type": "message",
        "from": "sarah-dev",
        "content": "Hey, quick question about your PR — got 2 mins?"
      },
      {
        "type": "message",
        "from": "mike-lead",
        "content": "The client moved up the deadline. Can we make Wednesday?"
      },
      {
        "type": "call",
        "from": "priya-designer",
        "topic": "Design handoff review",
        "urgency": "medium"
      },
      {
        "type": "meeting",
        "title": "Sprint Planning",
        "duration": 60
      },
      {
        "type": "deadline",
        "title": "PR review needed",
        "hoursRemaining": 2
      }
    ]
  },
  "guidance": {
    "teen": "If you love figuring out how apps work, try scratch.mit.edu or Khan Academy’s ‘Hour of Code’. Build a tiny website about your favorite hobby — you don’t need a PC, code.org works on phones. Notice: do you enjoy solving little logic puzzles for hours? That’s the core of the job.",
    "youngAdult": "Pick one language (Python or JavaScript). Complete freeCodeCamp Responsive Web Design and CS50. Build 2 portfolio projects (a to-do app + one you actually use). Contribute one PR to an open-source repo. Consider a 4-year CS degree, a coding bootcamp, or a self-taught + certification route — all lead to junior developer roles."
  }
},

{
  "id": "nurse",
  "title": "Registered Nurse",
  "emoji": "👩‍⚕️",
  "category": "Healthcare",
  "description": "Registered nurses are the eyes, ears, and hands of the hospital. They monitor patients, catch problems before they become emergencies, administer medications, and advocate for patients with doctors. Every shift is 100+ small, high-stakes decisions.",
  "shortDescription": "Front-line healthcare with real human impact.",
  "salaryRange": {
    "min": 55000,
    "max": 120000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "hospital",
  "colleagues": [
    {
      "id": "linda-charge",
      "name": "Linda Foster",
      "role": "Charge Nurse",
      "avatar": "👩‍⚕️",
      "personality": "Experienced, calm under pressure, no-nonsense.",
      "systemPrompt": "You are Linda Foster, charge nurse with 20 years experience. You mentor new nurses. Be calm, direct, and practical. Keep replies short — you are busy."
    },
    {
      "id": "dr-james",
      "name": "Dr. James Wilson",
      "role": "Attending Physician",
      "avatar": "👨‍⚕️",
      "personality": "Busy, respects nurses who advocate for patients.",
      "systemPrompt": "You are Dr. James Wilson, attending physician. Be brief and clinical, but appreciative when nurses escalate correctly."
    }
  ],
  "quickTrial": {
    "lecture": {
      "title": "What Registered Nurses Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Nurses are the eyes and ears of the hospital. You spot problems before they become emergencies. You will make 100+ small decisions every shift. Each one matters."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Nurses just follow doctor orders.",
          "reality": "Nurses catch mistakes, advocate for patients, and often know what is wrong first."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "nr-ex2",
        "type": "decision",
        "title": "The Confused Patient",
        "description": "A patient who was fine an hour ago is now confused and slurring. What do you do first?",
        "options": [
          {
            "id": "a",
            "text": "Wait 15 min and reassess",
            "score": 10,
            "feedback": "Delaying could be dangerous."
          },
          {
            "id": "b",
            "text": "Check vitals and call the doctor immediately",
            "score": 100,
            "feedback": "Correct — could be a stroke."
          },
          {
            "id": "c",
            "text": "Give them water and food",
            "score": 20,
            "feedback": "Never feed a possible stroke patient."
          },
          {
            "id": "d",
            "text": "Ask family if it is normal",
            "score": 40,
            "feedback": "Family input helps but do not delay."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "renu-d2",
        "type": "decision",
        "title": "Registered Nurse communication",
        "description": "A stakeholder is upset about an outcome related to your work as a registered nurse. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "renu-d3",
        "type": "decision",
        "title": "Registered Nurse problem solving",
        "description": "You discover a flaw in your registered nurse work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "nr-ex1",
        "type": "prioritize",
        "title": "Shift Triage",
        "description": "Four patients need attention. Who do you see first?",
        "timeLimit": 60,
        "items": [
          {
            "id": "a",
            "text": "🔴 Chest pain, sweating, age 62",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "🟠 Post-op, needs pain med",
            "correctRank": 3
          },
          {
            "id": "c",
            "text": "🟠 New admission, stable",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "🔴 Falling oxygen levels",
            "correctRank": 2
          }
        ],
        "explanation": "Airway/breathing/circulation always come first.",
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "07:00",
        "title": "Shift Handoff",
        "description": "Receive report on 6 patients from night nurse.",
        "type": "meeting"
      },
      {
        "time": "07:30",
        "title": "Morning Rounds",
        "description": "Check vitals and assess each patient.",
        "type": "task"
      },
      {
        "time": "09:00",
        "title": "Medication Pass",
        "description": "Administer meds to all patients.",
        "type": "critical"
      },
      {
        "time": "10:30",
        "title": "Doctor Rounds",
        "description": "Round with Dr. Wilson on Room 302.",
        "type": "meeting"
      },
      {
        "time": "12:00",
        "title": "Rapid Response",
        "description": "Patient in 305 is deteriorating!",
        "type": "urgent"
      },
      {
        "time": "13:30",
        "title": "Lunch (finally)",
        "description": "20 min if you are lucky.",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "Charting",
        "description": "Update patient records.",
        "type": "task"
      },
      {
        "time": "15:30",
        "title": "Family Meeting",
        "description": "Explain care plan to worried family.",
        "type": "communication"
      },
      {
        "time": "17:00",
        "title": "Shift Handoff",
        "description": "Report to evening nurse.",
        "type": "meeting"
      }
    ],
    "stressEvents": [
      {
        "title": "Code Blue!",
        "description": "Cardiac arrest in Room 308. GO!",
        "urgency": "critical"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Improve patient handoff protocol",
      "description": "Reduce miscommunication errors."
    },
    "randomEventPool": [
      {
        "type": "call",
        "from": "linda-charge",
        "topic": "Need help in Room 210",
        "urgency": "high"
      },
      {
        "type": "message",
        "from": "dr-james",
        "content": "Can you check Mrs. Kim labs and page me?"
      },
      {
        "type": "deadline",
        "title": "Medication audit due",
        "hoursRemaining": 3
      }
    ]
  },
  "guidance": {
    "teen": "Volunteer at a hospital, senior center, or Red Cross event. Take a babysitting/CPR class — many YMCAs offer them free. Watch a shift-in-the-life vlog on YouTube. Ask yourself: can you stay calm when someone is bleeding? That’s the real test.",
    "youngAdult": "Choose ADN (2 yrs, faster) vs BSN (4 yrs, more career options). Take the NCLEX-RN. Get CNA experience while studying to confirm you like patient care. Look into hospital tuition-reimbursement programs — they’ll often pay your BSN if you commit 2 years post-graduation."
  }
},

{
  "id": "civil-engineer",
  "title": "Civil Engineer",
  "emoji": "🏗️",
  "category": "Engineering",
  "description": "Civil engineers design and oversee the bridges, roads, buildings, water systems, and public works that shape cities. They split their time between the office (CAD, calculations, meetings) and construction sites (inspections, contractor coordination). Safety and public trust drive every decision.",
  "shortDescription": "Turn blueprints into real infrastructure.",
  "salaryRange": {
    "min": 60000,
    "max": 130000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "mixed",
  "environment": "field",
  "colleagues": [
    {
      "id": "raj-senior",
      "name": "Raj Kumar",
      "role": "Senior Engineer",
      "avatar": "👷‍♂️",
      "personality": "Practical, safety-obsessed.",
      "systemPrompt": "You are Raj Kumar, senior civil engineer with 15 years experience. Safety first. Be practical and direct."
    },
    {
      "id": "emma-pm",
      "name": "Emma Sullivan",
      "role": "Project Manager",
      "avatar": "👷‍♀️",
      "personality": "Deadline-focused.",
      "systemPrompt": "You are Emma Sullivan, PM. You care about budget and timeline. Be brisk. Push for updates."
    }
  ],
  "quickTrial": {
    "lecture": {
      "title": "What Civil Engineers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Civil engineers split time between office (CAD, meetings) and construction sites. You spend 30-50% of your time on sites, coordinating with contractors and inspecting work."
        },
        {
          "type": "myth-vs-reality",
          "myth": "You sit at a computer all day.",
          "reality": "You spend 30-50% on sites, meetings, and site coordination."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "ce-ex1",
        "type": "decision",
        "title": "Site Discovery",
        "description": "On site, you notice soil is softer than the geotech report said. What do you do?",
        "options": [
          {
            "id": "a",
            "text": "Note it and continue as planned",
            "score": 20,
            "feedback": "Ignoring conditions can cause collapse."
          },
          {
            "id": "b",
            "text": "Stop work, notify PM, order new test",
            "score": 100,
            "feedback": "Exactly right — safety over schedule."
          },
          {
            "id": "c",
            "text": "Add more concrete to compensate",
            "score": 30,
            "feedback": "You need data first."
          },
          {
            "id": "d",
            "text": "Ask the contractor what they think",
            "score": 50,
            "feedback": "Get input, but call engineers too."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "cien-d2",
        "type": "decision",
        "title": "Civil Engineer communication",
        "description": "A stakeholder is upset about an outcome related to your work as a civil engineer. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "cien-d3",
        "type": "decision",
        "title": "Civil Engineer problem solving",
        "description": "You discover a flaw in your civil engineer work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "cien-p1",
        "type": "prioritize",
        "title": "Civil Engineer priorities",
        "description": "You have four tasks competing for your attention as a civil engineer. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Safety hazard spotted on site",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Client asks for urgent design change",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine inspection report due tomorrow",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Organize tool inventory",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:00",
        "title": "Email & Plans Review",
        "description": "Check overnight updates from contractor.",
        "type": "inbox"
      },
      {
        "time": "09:00",
        "title": "Drive to Site",
        "description": "Bridge project 30 min away.",
        "type": "travel"
      },
      {
        "time": "10:00",
        "title": "Site Inspection",
        "description": "Walk the site with the foreman.",
        "type": "field"
      },
      {
        "time": "12:00",
        "title": "Working Lunch",
        "description": "Discuss timeline with contractor.",
        "type": "meeting"
      },
      {
        "time": "13:00",
        "title": "CAD Work",
        "description": "Update foundation drawings.",
        "type": "task"
      },
      {
        "time": "15:00",
        "title": "Client Call",
        "description": "Explain delay to the city planner.",
        "type": "communication"
      },
      {
        "time": "16:00",
        "title": "Design Review",
        "description": "Meet with structural engineer.",
        "type": "meeting"
      }
    ],
    "stressEvents": [
      {
        "title": "Crack in Foundation!",
        "description": "Contractor calls: found unexpected crack.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Complete bridge design phase",
      "description": "Deliver approved plans by Friday."
    },
    "randomEventPool": [
      {
        "type": "call",
        "from": "raj-senior",
        "topic": "Site issue",
        "urgency": "high"
      },
      {
        "type": "message",
        "from": "emma-pm",
        "content": "City wants revised drawings by tomorrow."
      }
    ]
  },
  "guidance": {
    "teen": "Play city-builder games (Cities: Skylines, Minecraft with redstone). Take apart a broken toy or fix a wobbly chair — engineers love figuring out ‘why does it fail?’. Visit a construction site with a parent and ask the foreman what they’re building.",
    "youngAdult": "Enroll in a 4-year ABET-accredited civil engineering program. Take the FE (Fundamentals of Engineering) exam in your senior year. Intern with a construction firm or public-works department by summer 2. Aim for PE licensure 4 years post-graduation — it doubles your career ceiling."
  }
},

{
  "id": "digital-marketer",
  "title": "Digital Marketer",
  "emoji": "📱",
  "category": "Business",
  "description": "Digital marketers plan and run campaigns across search, social, email, and content channels — then read the data to see what actually worked. The job blends creativity (writing, design, video) with sharp analytics (A/B tests, CAC, ROAS). Most campaigns fail; great marketers iterate quickly.",
  "shortDescription": "Creative meets analytical in the digital world.",
  "salaryRange": {
    "min": 45000,
    "max": 110000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "office-remote",
  "colleagues": [
    {
      "id": "jasmine-cmo",
      "name": "Jasmine Wu",
      "role": "Marketing Director",
      "avatar": "💼",
      "personality": "Data-driven, strategic.",
      "systemPrompt": "You are Jasmine Wu, marketing director. Push for data-backed decisions."
    },
    {
      "id": "carlos-designer",
      "name": "Carlos Rivera",
      "role": "Content Creator",
      "avatar": "🎬",
      "personality": "Creative, trendy.",
      "systemPrompt": "You are Carlos Rivera, content creator. Love trends. Be enthusiastic and casual."
    }
  ],
  "quickTrial": {
    "lecture": {
      "title": "What Digital Marketers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Digital marketing: 30% campaigns, 20% analytics, 20% content, 15% strategy. Most campaigns fail — great marketers iterate fast on what data shows them."
        },
        {
          "type": "myth-vs-reality",
          "myth": "It’s all creative fun.",
          "reality": "Half the job is spreadsheets, dashboards, and killing under-performing ads."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "dm-ex1",
        "type": "decision",
        "title": "Budget Move",
        "description": "Ad A: $500 spent, 20 sales. Ad B: $500 spent, 5 sales. What now?",
        "options": [
          {
            "id": "a",
            "text": "Kill B, double A budget",
            "score": 100,
            "feedback": "Right — scale winners."
          },
          {
            "id": "b",
            "text": "Give B more time",
            "score": 30,
            "feedback": "You have data — act on it."
          },
          {
            "id": "c",
            "text": "Split evenly",
            "score": 20,
            "feedback": "That wastes money."
          },
          {
            "id": "d",
            "text": "Pause both, redesign",
            "score": 40,
            "feedback": "You have a winner!"
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "dima-d2",
        "type": "decision",
        "title": "Digital Marketer communication",
        "description": "A stakeholder is upset about an outcome related to your work as a digital marketer. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "dima-d3",
        "type": "decision",
        "title": "Digital Marketer problem solving",
        "description": "You discover a flaw in your digital marketer work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "dima-p1",
        "type": "prioritize",
        "title": "Digital Marketer priorities",
        "description": "You have four tasks competing for your attention as a digital marketer. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Major client complaint on social media",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Quarterly report due to leadership today",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Schedule next week’s team meeting",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Review non-urgent email backlog",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "09:00",
        "title": "Dashboard Check",
        "description": "Review overnight campaign performance.",
        "type": "inbox"
      },
      {
        "time": "10:00",
        "title": "Content Planning",
        "description": "Draft next week social calendar.",
        "type": "task"
      },
      {
        "time": "11:30",
        "title": "Creative Sync",
        "description": "Brainstorm with Carlos about new video.",
        "type": "meeting"
      },
      {
        "time": "13:00",
        "title": "Lunch",
        "description": "Podcast about marketing trends.",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "A/B Test Setup",
        "description": "Design test for landing page.",
        "type": "task"
      },
      {
        "time": "15:30",
        "title": "Client Report",
        "description": "Prepare weekly summary.",
        "type": "task"
      },
      {
        "time": "16:30",
        "title": "Campaign Launch",
        "description": "Push new ads live.",
        "type": "critical"
      }
    ],
    "stressEvents": [
      {
        "title": "Ad Spend Bleeding!",
        "description": "Campaign is burning budget.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Launch product campaign",
      "description": "Drive 1000 signups this week."
    },
    "randomEventPool": [
      {
        "type": "message",
        "from": "jasmine-cmo",
        "content": "CPA is up 40% — what happened?"
      },
      {
        "type": "call",
        "from": "carlos-designer",
        "topic": "Video draft feedback",
        "urgency": "medium"
      }
    ]
  },
  "guidance": {
    "teen": "Start a themed Instagram/TikTok about something you love (dogs, plants, sneakers). Try to hit 500 followers using free tools only. Notice which post styles get shares vs likes vs saves — that’s marketing analytics in disguise.",
    "youngAdult": "Get 2-3 free certifications (Google Digital Garage, HubSpot Inbound, Meta Blueprint). Run a real $50 Facebook ad for a friend’s side hustle and document the results — that’s your portfolio. Consider a marketing/business degree, or go straight into an agency job as a coordinator."
  }
},

{
  "id": "teacher",
  "title": "Teacher",
  "emoji": "👨‍🏫",
  "category": "Education",
  "description": "Teachers do far more than deliver lessons. They plan curriculum, adapt to 30 different learning styles at once, mediate conflicts, grade tirelessly, and communicate with parents. The best teachers change trajectories of lives — but the job requires huge emotional stamina.",
  "shortDescription": "More than lectures — you build futures.",
  "salaryRange": {
    "min": 45000,
    "max": 85000,
    "currency": "USD"
  },
  "educationYears": 45,
  "demandLevel": "medium",
  "workStyle": "independent",
  "environment": "office",
  "colleagues": [
    {
      "id": "principal-ross",
      "name": "Ms. Ross",
      "role": "Principal",
      "avatar": "👩‍🏫",
      "personality": "Supportive but expects results.",
      "systemPrompt": "You are Ms. Ross, principal. Warm but firm. Expect professionalism."
    },
    {
      "id": "sam-teacher",
      "name": "Sam Nakamura",
      "role": "Veteran Teacher",
      "avatar": "🧑‍🏫",
      "personality": "20 years teaching.",
      "systemPrompt": "You are Sam Nakamura, veteran teacher. Share practical tips. Warm, occasionally sarcastic about admin."
    }
  ],
  "quickTrial": {
    "lecture": {
      "title": "What Teachers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "You arrive at 6:30am to prep. Teach 6 classes. Handle 3 conflicts. Grade until 8pm. It’s planning + performance + counseling every day."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Teachers get summers off.",
          "reality": "Most spend summers on planning, training, and second jobs."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "t-ex1",
        "type": "decision",
        "title": "Classroom Moment",
        "description": "A quiet student suddenly bursts into tears mid-lesson. What do you do?",
        "options": [
          {
            "id": "a",
            "text": "Ignore it and continue lesson",
            "score": 10,
            "feedback": "Students matter more."
          },
          {
            "id": "b",
            "text": "Stop lesson, address publicly",
            "score": 30,
            "feedback": "Could embarrass them."
          },
          {
            "id": "c",
            "text": "Assign group work, check quietly",
            "score": 100,
            "feedback": "Perfect — private support."
          },
          {
            "id": "d",
            "text": "Send to counselor immediately",
            "score": 60,
            "feedback": "Understand first."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "te-d2",
        "type": "decision",
        "title": "Teacher communication",
        "description": "A stakeholder is upset about an outcome related to your work as a teacher. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "te-d3",
        "type": "decision",
        "title": "Teacher problem solving",
        "description": "You discover a flaw in your teacher work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "te-p1",
        "type": "prioritize",
        "title": "Teacher priorities",
        "description": "You have four tasks competing for your attention as a teacher. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Student has a medical emergency",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Parent demands immediate meeting",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Grade papers due tomorrow",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Decorate classroom bulletin board",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "06:30",
        "title": "Early Prep",
        "description": "Set up materials, review lesson plans.",
        "type": "task"
      },
      {
        "time": "07:30",
        "title": "Greet Students",
        "description": "Welcome each student by name.",
        "type": "communication"
      },
      {
        "time": "08:00",
        "title": "Period 1",
        "description": "Teach algebra.",
        "type": "teaching"
      },
      {
        "time": "09:00",
        "title": "Period 2",
        "description": "Handle a disruption.",
        "type": "teaching"
      },
      {
        "time": "10:30",
        "title": "Planning Period",
        "description": "Grade quizzes and plan tomorrow.",
        "type": "task"
      },
      {
        "time": "12:00",
        "title": "Lunch Duty",
        "description": "Supervise cafeteria.",
        "type": "field"
      },
      {
        "time": "13:00",
        "title": "Period 4",
        "description": "Struggling student needs attention.",
        "type": "teaching"
      },
      {
        "time": "15:30",
        "title": "Parent Call",
        "description": "Difficult conversation.",
        "type": "communication"
      },
      {
        "time": "16:30",
        "title": "Faculty Meeting",
        "description": "Weekly staff meeting.",
        "type": "meeting"
      }
    ],
    "stressEvents": [
      {
        "title": "Fight in Hallway!",
        "description": "Two students shoving each other.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Improve class test scores",
      "description": "Design intervention."
    },
    "randomEventPool": [
      {
        "type": "message",
        "from": "principal-ross",
        "content": "Can we chat about the Johnson situation?"
      },
      {
        "type": "call",
        "from": "sam-teacher",
        "topic": "Advice on discipline case",
        "urgency": "medium"
      }
    ]
  },
  "guidance": {
    "teen": "Volunteer as a tutor at your school or community center. Teach a younger sibling one thing — notice how hard it is to keep them focused. Try the ‘explain-it-back’ test: if you can teach a concept to a 10-year-old, you understand it. Camp counselor jobs are perfect teacher trial runs.",
    "youngAdult": "Enroll in a Bachelor of Education or bachelor’s + teacher certification (varies by state/country). Substitute-teach while studying — you’ll learn faster than any textbook. Consider Teach For America / Teach First programs. Specialize (STEM, SpEd, ESL) — those roles get hired first and often earn more."
  }
},

{
  "id": "lawyer",
  "title": "Lawyer",
  "emoji": "⚖️",
  "category": "Law",
  "description": "Lawyers advise clients, negotiate deals, draft contracts, and argue cases. Most spend 80% of their time on writing and research — courtrooms are the exception, not the rule. Precision, ethics, and clarity of thought matter more than dramatic speeches.",
  "shortDescription": "Advocate, negotiator, and problem-solver.",
  "salaryRange": {
    "min": 70000,
    "max": 250000,
    "currency": "USD"
  },
  "educationYears": 7,
  "demandLevel": "high",
  "workStyle": "independent",
  "environment": "office",
  "colleagues": [
    {
      "id": "partner-kim",
      "name": "David Kim",
      "role": "Senior Partner",
      "avatar": "👨‍💼",
      "personality": "Sharp, demanding.",
      "systemPrompt": "You are David Kim, senior partner. Demanding but fair. Speak formally."
    },
    {
      "id": "paralegal-anna",
      "name": "Anna Blake",
      "role": "Paralegal",
      "avatar": "📚",
      "personality": "Detail-oriented.",
      "systemPrompt": "You are Anna Blake, paralegal. Efficient, occasionally overwhelmed."
    }
  ],
  "quickTrial": {
    "lecture": {
      "title": "What Lawyers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Most legal work is writing, reading, and negotiating — not the courtroom drama shown on TV. Attention to detail keeps clients out of trouble."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Every day is Suits or Law & Order.",
          "reality": "Most days are memos, contracts, discovery, and calls."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "l-ex1",
        "type": "decision",
        "title": "The Ethical Bind",
        "description": "Your client tells you they lied on a form. What do you do?",
        "options": [
          {
            "id": "a",
            "text": "Pretend you did not hear",
            "score": 10,
            "feedback": "Violates ethics."
          },
          {
            "id": "b",
            "text": "Advise them to correct it",
            "score": 100,
            "feedback": "Correct."
          },
          {
            "id": "c",
            "text": "Withdraw immediately",
            "score": 40,
            "feedback": "Extreme."
          },
          {
            "id": "d",
            "text": "Report them",
            "score": 20,
            "feedback": "Privilege limits this."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "la-d2",
        "type": "decision",
        "title": "Lawyer communication",
        "description": "A stakeholder is upset about an outcome related to your work as a lawyer. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "la-d3",
        "type": "decision",
        "title": "Lawyer problem solving",
        "description": "You discover a flaw in your lawyer work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "la-p1",
        "type": "prioritize",
        "title": "Lawyer priorities",
        "description": "You have four tasks competing for your attention as a lawyer. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Court filing deadline in one hour",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Client calls with new evidence",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Prepare routine document templates",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Update case calendar",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:30",
        "title": "Research",
        "description": "Look up precedents for the Jones case.",
        "type": "task"
      },
      {
        "time": "10:00",
        "title": "Client Call",
        "description": "Update client on progress.",
        "type": "communication"
      },
      {
        "time": "11:00",
        "title": "Contract Drafting",
        "description": "Draft merger agreement.",
        "type": "task"
      },
      {
        "time": "12:30",
        "title": "Lunch with Partner",
        "description": "Discuss firm strategy.",
        "type": "meeting"
      },
      {
        "time": "14:00",
        "title": "Court Prep",
        "description": "Prepare for tomorrow hearing.",
        "type": "critical"
      },
      {
        "time": "15:30",
        "title": "Negotiation",
        "description": "Call opposing counsel.",
        "type": "communication"
      },
      {
        "time": "17:00",
        "title": "Document Review",
        "description": "200 pages of discovery.",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Emergency Filing!",
        "description": "Court filing due in 2 hours!",
        "urgency": "critical"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Win Jones v. Corp case",
      "description": "Prepare case by Friday."
    },
    "randomEventPool": [
      {
        "type": "call",
        "from": "partner-kim",
        "topic": "Case strategy",
        "urgency": "high"
      },
      {
        "type": "message",
        "from": "paralegal-anna",
        "content": "Found the precedent you wanted."
      }
    ]
  },
  "guidance": {
    "teen": "Join debate club or Model UN. Read one Supreme Court decision (Marbury v. Madison is short). Watch a real trial — many county courts allow public viewing. If you love arguing but hate research, this job will surprise you.",
    "youngAdult": "Score well on the LSAT (aim 165+ for top-tier schools). Take pre-law-friendly majors (any humanities or STEM works). Intern at a small law office or public defender to see reality vs TV. Consider debt: JD school is expensive; big-firm associates repay fast but burn out fastest. Public-interest careers pay less but qualify for loan forgiveness."
  }
},

{
  "id": "accountant",
  "title": "Accountant",
  "emoji": "📊",
  "category": "Business",
  "description": "Accountants keep the financial pulse of a business: recording transactions, preparing tax filings, auditing, and advising on strategy. It’s not just number-crunching — modern accountants use software and communicate insights to executives. Reliability and integrity are the whole product.",
  "shortDescription": "Numbers tell the story — you translate.",
  "salaryRange": {
    "min": 50000,
    "max": 130000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "medium",
  "workStyle": "independent",
  "environment": "office-remote",
  "colleagues": [
    {
      "id": "cfo-marcus",
      "name": "Marcus Green",
      "role": "CFO",
      "avatar": "💰",
      "personality": "Numbers-focused.",
      "systemPrompt": "You are Marcus Green, CFO. Concise and analytical."
    },
    {
      "id": "auditor-nia",
      "name": "Nia Thompson",
      "role": "External Auditor",
      "avatar": "🔍",
      "personality": "Meticulous.",
      "systemPrompt": "You are Nia Thompson, auditor. Ask probing questions."
    }
  ],
  "quickTrial": {
    "lecture": {
      "title": "What Accountants Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Accounting is 60% software + workflow, 30% analysis, 10% talking to non-accountants and translating. Automation removed the boring parts, exposed the interesting ones."
        },
        {
          "type": "myth-vs-reality",
          "myth": "It’s just data entry.",
          "reality": "You catch fraud, save tax dollars, and advise strategy."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "a-ex1",
        "type": "decision",
        "title": "Suspicious Entry",
        "description": "You notice a $50k expense with no receipt. What do you do?",
        "options": [
          {
            "id": "a",
            "text": "Approve it — must be legitimate",
            "score": 10,
            "feedback": "Review the outcome to learn more."
          },
          {
            "id": "b",
            "text": "Flag it and investigate",
            "score": 100,
            "feedback": "Review the outcome to learn more."
          },
          {
            "id": "c",
            "text": "Ignore it",
            "score": 5,
            "feedback": "Review the outcome to learn more."
          },
          {
            "id": "d",
            "text": "Approve but note in memo",
            "score": 30,
            "feedback": "Review the outcome to learn more."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "ac-d2",
        "type": "decision",
        "title": "Accountant communication",
        "description": "A stakeholder is upset about an outcome related to your work as a accountant. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "ac-d3",
        "type": "decision",
        "title": "Accountant problem solving",
        "description": "You discover a flaw in your accountant work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "ac-p1",
        "type": "prioritize",
        "title": "Accountant priorities",
        "description": "You have four tasks competing for your attention as a accountant. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Major client complaint on social media",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Quarterly report due to leadership today",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Schedule next week’s team meeting",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Review non-urgent email backlog",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "09:00",
        "title": "Email Review",
        "description": "Vendor invoices.",
        "type": "inbox"
      },
      {
        "time": "10:00",
        "title": "Monthly Close",
        "description": "Reconcile accounts.",
        "type": "task"
      },
      {
        "time": "12:00",
        "title": "Lunch",
        "description": "Read industry news.",
        "type": "break"
      },
      {
        "time": "13:00",
        "title": "Budget Meeting",
        "description": "Present Q3 forecast.",
        "type": "meeting"
      },
      {
        "time": "15:00",
        "title": "Audit Prep",
        "description": "Prepare documentation.",
        "type": "task"
      },
      {
        "time": "16:30",
        "title": "CFO Advisory",
        "description": "Recommend cost-cutting.",
        "type": "communication"
      }
    ],
    "stressEvents": [
      {
        "title": "Books Do Not Balance!",
        "description": "Off by $2000. Find it fast.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Complete quarterly close",
      "description": "Deliver clean financials."
    },
    "randomEventPool": [
      {
        "type": "message",
        "from": "cfo-marcus",
        "content": "Board needs the numbers by 3pm."
      },
      {
        "type": "call",
        "from": "auditor-nia",
        "topic": "Revenue recognition question",
        "urgency": "medium"
      }
    ]
  },
  "guidance": {
    "teen": "Manage your own weekly budget on a Google Sheet. Track every rupee/dollar for one month — you’ll be shocked. Do a small business’s books for free (parents, aunt’s bakery) — perfect trial run.",
    "youngAdult": "Choose accounting or finance major. Pass CPA (US), ACCA (UK/global), or CA (India) — the credential unlocks higher pay. Intern at Big-4 firms during college. If you dislike public accounting, industry (in-house at a company) is calmer and often better hours."
  }
},

{
  "id": "data-scientist",
  "title": "Data Scientist",
  "emoji": "📈",
  "category": "Technology",
  "description": "Data scientists collect, clean, model, and interpret data to help businesses make better decisions. About half the job is data wrangling — the ‘cool ML’ is a smaller slice. Great data scientists translate messy business questions into precise, testable models and explain results to non-technical stakeholders.",
  "shortDescription": "Turn raw data into decisions.",
  "salaryRange": {
    "min": 85000,
    "max": 200000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "office-remote",
  "colleagues": [
    {
      "id": "lead-elena",
      "name": "Elena Volkov",
      "role": "Lead Data Scientist",
      "avatar": "🧑‍🔬",
      "personality": "Rigorous.",
      "systemPrompt": "You are Elena Volkov, lead DS. Push for rigorous analysis."
    },
    {
      "id": "pm-alex",
      "name": "Alex Park",
      "role": "Product Manager",
      "avatar": "📱",
      "personality": "Fast answers.",
      "systemPrompt": "You are Alex Park, PM. Want business answers, not jargon."
    }
  ],
  "quickTrial": {
    "lecture": {
      "title": "What Data Scientists Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Half the job is data cleaning, not modeling. Communication is the ceiling — the best DS explains a model in one slide to a VP."
        },
        {
          "type": "myth-vs-reality",
          "myth": "It’s all ML and deep learning.",
          "reality": "It’s SQL, dashboards, and stakeholder meetings — plus some ML."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "ds-ex1",
        "type": "decision",
        "title": "Missing Data",
        "description": "15% of your rows have missing values. What do you do?",
        "options": [
          {
            "id": "a",
            "text": "Drop them all",
            "score": 30,
            "feedback": "You might introduce bias."
          },
          {
            "id": "b",
            "text": "Fill with average",
            "score": 40,
            "feedback": "Loses info."
          },
          {
            "id": "c",
            "text": "Investigate why missing first",
            "score": 100,
            "feedback": "Correct — patterns matter."
          },
          {
            "id": "d",
            "text": "Ignore",
            "score": 5,
            "feedback": "Review the outcome to learn more."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "dasc-d2",
        "type": "decision",
        "title": "Data Scientist communication",
        "description": "A stakeholder is upset about an outcome related to your work as a data scientist. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "dasc-d3",
        "type": "decision",
        "title": "Data Scientist problem solving",
        "description": "You discover a flaw in your data scientist work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "dasc-p1",
        "type": "prioritize",
        "title": "Data Scientist priorities",
        "description": "You have four tasks competing for your attention as a data scientist. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Production outage affecting users",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Security patch deadline today",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Refactor legacy code for readability",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Reply to non-urgent team Slack messages",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "09:00",
        "title": "Slack & Email",
        "description": "Overnight ML results.",
        "type": "inbox"
      },
      {
        "time": "09:30",
        "title": "Data Cleaning",
        "description": "Handle missing values.",
        "type": "task"
      },
      {
        "time": "11:00",
        "title": "Stakeholder Sync",
        "description": "Explain model to marketing.",
        "type": "meeting"
      },
      {
        "time": "13:00",
        "title": "Model Training",
        "description": "Kick off training run.",
        "type": "task"
      },
      {
        "time": "14:30",
        "title": "Dashboard Update",
        "description": "Build KPI visualization.",
        "type": "task"
      },
      {
        "time": "16:00",
        "title": "Findings Presentation",
        "description": "Present to leadership.",
        "type": "communication"
      }
    ],
    "stressEvents": [
      {
        "title": "Model Predictions Wrong!",
        "description": "Production model misbehaving.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Deploy churn prediction model",
      "description": "Ship to production."
    },
    "randomEventPool": [
      {
        "type": "message",
        "from": "pm-alex",
        "content": "Can you get me an answer in 2 hours?"
      },
      {
        "type": "call",
        "from": "lead-elena",
        "topic": "Model review",
        "urgency": "medium"
      }
    ]
  },
  "guidance": {
    "teen": "Play with data on Kaggle Learn or Google Sheets — try analyzing your Spotify Wrapped or step-count data. Learn to make one great chart. Ask ‘why’ five times about anything numeric you see in the news.",
    "youngAdult": "Major in stats, math, CS, or economics. Master Python, SQL, and one viz tool (Tableau or PowerBI). Complete 3 Kaggle competitions and 2 portfolio projects with real datasets. A master’s helps for research roles but isn’t required for industry. Applied ML certs (fast.ai, DeepLearning.AI) fill gaps fast."
  }
},

{
  "id": "psychologist",
  "title": "Psychologist",
  "emoji": "🧠",
  "category": "Healthcare",
  "description": "Psychologists help people understand themselves, manage mental-health conditions, and thrive. Clinical psychologists diagnose and treat via therapy; research psychologists study behavior; organizational psychologists apply insights in workplaces. Deep listening is the core skill.",
  "shortDescription": "Understand minds, heal lives.",
  "salaryRange": {
    "min": 60000,
    "max": 130000,
    "currency": "USD"
  },
  "educationYears": 6,
  "demandLevel": "high",
  "workStyle": "independent",
  "environment": "hospital",
  "colleagues": [
    {
      "id": "supervisor-diana",
      "name": "Dr. Diana Chen",
      "role": "Clinical Supervisor",
      "avatar": "👩‍⚕️",
      "personality": "Warm, insightful.",
      "systemPrompt": "You are Dr. Diana Chen, clinical supervisor. Ask reflective questions."
    },
    {
      "id": "peer-marcus",
      "name": "Dr. Marcus Bell",
      "role": "Colleague Psychologist",
      "avatar": "🧑‍⚕️",
      "personality": "Peer support.",
      "systemPrompt": "You are Dr. Marcus Bell, fellow psychologist. Be collegial."
    }
  ],
  "quickTrial": {
    "lecture": {
      "title": "What Psychologists Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Real therapy is slow. You spend most sessions listening deeply and letting the person hear themselves out loud. Progress isn’t linear."
        },
        {
          "type": "myth-vs-reality",
          "myth": "You just tell people what to do.",
          "reality": "You help clients discover their own answers — much harder and slower."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "p-ex1",
        "type": "decision",
        "title": "Crisis Moment",
        "description": "A client says \"sometimes I do not want to be here anymore.\" What do you do first?",
        "options": [
          {
            "id": "a",
            "text": "Change the subject",
            "score": 5,
            "feedback": "Avoidance is dangerous."
          },
          {
            "id": "b",
            "text": "Assess safety directly and gently",
            "score": 100,
            "feedback": "Correct — direct assessment saves lives."
          },
          {
            "id": "c",
            "text": "Call 911",
            "score": 30,
            "feedback": "Assess first."
          },
          {
            "id": "d",
            "text": "Give hotline number",
            "score": 40,
            "feedback": "Insufficient alone."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "ps-d2",
        "type": "decision",
        "title": "Psychologist communication",
        "description": "A stakeholder is upset about an outcome related to your work as a psychologist. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "ps-d3",
        "type": "decision",
        "title": "Psychologist problem solving",
        "description": "You discover a flaw in your psychologist work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "ps-p1",
        "type": "prioritize",
        "title": "Psychologist priorities",
        "description": "You have four tasks competing for your attention as a psychologist. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Critical patient needs immediate intervention",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Stable patient requests medication refill",
            "correctRank": 4
          },
          {
            "id": "c",
            "text": "Post-op patient reporting unexpected pain",
            "correctRank": 2
          },
          {
            "id": "d",
            "text": "New admission paperwork needs review",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:30",
        "title": "Note Review",
        "description": "Prepare for today clients.",
        "type": "task"
      },
      {
        "time": "09:00",
        "title": "Session 1",
        "description": "New client intake.",
        "type": "communication"
      },
      {
        "time": "10:00",
        "title": "Session 2",
        "description": "Ongoing anxiety client.",
        "type": "communication"
      },
      {
        "time": "11:00",
        "title": "Consultation Call",
        "description": "Discuss case with Dr. Chen.",
        "type": "meeting"
      },
      {
        "time": "12:00",
        "title": "Lunch",
        "description": "Recharge.",
        "type": "break"
      },
      {
        "time": "13:00",
        "title": "Session 3",
        "description": "Couples therapy.",
        "type": "communication"
      },
      {
        "time": "14:00",
        "title": "Session 4",
        "description": "Depression, treatment progress.",
        "type": "communication"
      },
      {
        "time": "15:00",
        "title": "Notes & Documentation",
        "description": "Write session notes.",
        "type": "task"
      },
      {
        "time": "16:00",
        "title": "Team Case Conference",
        "description": "Discuss difficult cases.",
        "type": "meeting"
      }
    ],
    "stressEvents": [
      {
        "title": "Client in Crisis",
        "description": "Client texts about suicidal thoughts.",
        "urgency": "critical"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Develop treatment plan",
      "description": "Complete by Friday."
    },
    "randomEventPool": [
      {
        "type": "call",
        "from": "supervisor-diana",
        "topic": "Case supervision",
        "urgency": "medium"
      },
      {
        "type": "message",
        "from": "peer-marcus",
        "content": "Rough case today. Coffee later?"
      }
    ]
  },
  "guidance": {
    "teen": "Practice active listening — ask a friend about their day and mirror back what they said. Take Yale’s free ‘Science of Well-Being’ on Coursera. Read Man’s Search for Meaning by Viktor Frankl. Notice which conversations energize vs drain you.",
    "youngAdult": "Get a psychology bachelor’s and start volunteering at a crisis line. Master’s (MSW, MFT, or Counseling) lets you practice in most places; PsyD/PhD is required for licensed clinical psychologist. Expect 6-8 years total. Trainee stipends are low — plan finances accordingly."
  }
},

{
  "id": "architect",
  "title": "Architect",
  "emoji": "🏛️",
  "category": "Design",
  "description": "Architects design buildings and spaces — homes, schools, hospitals, cities — balancing beauty, function, safety, budget, and sustainability. It’s a long career (5-7 years to license) that mixes creativity with heavy technical work: codes, structural coordination, client management.",
  "shortDescription": "Design spaces where life happens.",
  "salaryRange": {
    "min": 60000,
    "max": 150000,
    "currency": "USD"
  },
  "educationYears": 5,
  "demandLevel": "medium",
  "workStyle": "mixed",
  "environment": "field",
  "colleagues": [
    {
      "id": "principal-nora",
      "name": "Nora Silva",
      "role": "Principal Architect",
      "avatar": "👩‍🎨",
      "personality": "Vision-driven.",
      "systemPrompt": "You are Nora Silva, principal architect. Push for excellence."
    },
    {
      "id": "engineer-tom",
      "name": "Tom Bradford",
      "role": "Structural Engineer",
      "avatar": "🔧",
      "personality": "Code-focused.",
      "systemPrompt": "You are Tom Bradford, structural engineer. Care about safety and codes."
    }
  ],
  "quickTrial": {
    "lecture": {
      "title": "What Architects Really Do",
      "sections": [
        {
          "type": "text",
          "content": "The romantic image is sketching cathedrals. Reality is 40% drawings, 30% coordination with engineers/clients/contractors, 20% code, 10% design."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Architects just draw pretty buildings.",
          "reality": "You spend as much time on plumbing and permits as on aesthetics."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "ar-ex1",
        "type": "decision",
        "title": "Budget Cut",
        "description": "Client cuts your budget 30%. What do you do?",
        "options": [
          {
            "id": "a",
            "text": "Refuse to compromise",
            "score": 10,
            "feedback": "You will lose the project."
          },
          {
            "id": "b",
            "text": "Present 3 options with tradeoffs",
            "score": 100,
            "feedback": "Perfect."
          },
          {
            "id": "c",
            "text": "Silently reduce quality",
            "score": 20,
            "feedback": "Bad faith."
          },
          {
            "id": "d",
            "text": "Quit the project",
            "score": 15,
            "feedback": "Extreme."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "ar-d2",
        "type": "decision",
        "title": "Architect communication",
        "description": "A stakeholder is upset about an outcome related to your work as a architect. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "ar-d3",
        "type": "decision",
        "title": "Architect problem solving",
        "description": "You discover a flaw in your architect work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "ar-p1",
        "type": "prioritize",
        "title": "Architect priorities",
        "description": "You have four tasks competing for your attention as a architect. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Client needs final logo by end of day",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Revise mockups based on feedback",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Organize asset folders",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Browse inspiration sites",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "09:00",
        "title": "Morning Review",
        "description": "Check overnight redlines.",
        "type": "inbox"
      },
      {
        "time": "10:00",
        "title": "Design Revisions",
        "description": "Update floor plans.",
        "type": "task"
      },
      {
        "time": "11:30",
        "title": "Client Meeting",
        "description": "Present concept.",
        "type": "communication"
      },
      {
        "time": "13:00",
        "title": "Lunch",
        "description": "Sketch ideas.",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "Site Visit",
        "description": "Check construction progress.",
        "type": "field"
      },
      {
        "time": "16:00",
        "title": "CAD Detailing",
        "description": "Draw connection details.",
        "type": "task"
      },
      {
        "time": "17:00",
        "title": "Engineer Coordination",
        "description": "Meet with Tom.",
        "type": "meeting"
      }
    ],
    "stressEvents": [
      {
        "title": "Code Violation!",
        "description": "City rejected your permit — fix in 48h.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Complete schematic design phase",
      "description": "Get approval by Friday."
    },
    "randomEventPool": [
      {
        "type": "call",
        "from": "principal-nora",
        "topic": "Design review",
        "urgency": "high"
      },
      {
        "type": "message",
        "from": "engineer-tom",
        "content": "Your beam layout will not hold. Let us talk."
      }
    ]
  },
  "guidance": {
    "teen": "Sketch buildings you like — draw floor plans of your own home from memory. Play SimCity or Townscaper. Take a free SketchUp tutorial. Notice which buildings make you feel calm vs anxious — that awareness is the seed of design taste.",
    "youngAdult": "Choose 5-yr BArch or bachelor + MArch (3-4 yr). Do IDP/AXP intern hours (~3,700). Learn Revit + Rhino + Adobe Suite. Take the ARE licensing exams (7 divisions). Consider adjacent fields (interior design, urban planning) if you love design but not the licensing marathon. Healthcare & Life Sciences (new)"
  }
},

{
  "id": "pharmacist",
  "title": "Pharmacist",
  "emoji": "💊",
  "category": "Healthcare",
  "description": "Pharmacists dispense medications, counsel patients, screen for drug interactions, and increasingly deliver clinical services (vaccines, blood-pressure checks, medication reviews). They are the most accessible healthcare professional — no appointment required.",
  "shortDescription": "Medication safety net for the community.",
  "salaryRange": {
    "min": 95000,
    "max": 150000,
    "currency": "USD"
  },
  "educationYears": 6,
  "demandLevel": "medium",
  "workStyle": "independent",
  "environment": "hospital",
  "colleagues": [
    {
      "id": "dr-nadia-osei",
      "name": "Dr. Nadia Osei",
      "role": "Lead Pharmacist",
      "avatar": "👨‍⚕️",
      "personality": "precise, patient-focused.",
      "systemPrompt": "You are Dr. Nadia Osei, Lead Pharmacist. precise, patient-focused. Keep replies short and realistic."
    },
    {
      "id": "rico-alvarez",
      "name": "Rico Alvarez",
      "role": "Pharmacy Tech",
      "avatar": "🧑‍⚕️",
      "personality": "fast, keeps the counter moving.",
      "systemPrompt": "You are Rico Alvarez, Pharmacy Tech. fast, keeps the counter moving. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Volunteer at a hospital or pharmacy front desk. Take Khan Academy pharmacology videos. Notice: are you the friend who reads medication labels for family? That instinct is gold.",
    "youngAdult": "Enroll in a PharmD program (6-8 yrs total). Get retail experience early to test fit. Consider residency for hospital/clinical roles. NAPLEX + state license required."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Pharmacists Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Half your day is checking prescriptions and catching errors. The other half is talking to patients — often the only healthcare touchpoint they get."
        },
        {
          "type": "myth-vs-reality",
          "myth": "You just count pills.",
          "reality": "You catch dosing errors, drug interactions, and educate patients daily."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "ph-ex1",
        "type": "decision",
        "title": "Prescription mismatch flagged",
        "description": "Prescription mismatch flagged — patient waiting, physician not answering.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "ph-d2",
        "type": "decision",
        "title": "Pharmacist communication",
        "description": "A stakeholder is upset about an outcome related to your work as a pharmacist. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "ph-d3",
        "type": "decision",
        "title": "Pharmacist problem solving",
        "description": "You discover a flaw in your pharmacist work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "ph-p1",
        "type": "prioritize",
        "title": "Pharmacist priorities",
        "description": "You have four tasks competing for your attention as a pharmacist. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Critical patient needs immediate intervention",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Stable patient requests medication refill",
            "correctRank": 4
          },
          {
            "id": "c",
            "text": "Post-op patient reporting unexpected pain",
            "correctRank": 2
          },
          {
            "id": "d",
            "text": "New admission paperwork needs review",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:30",
        "title": "Open the pharmacy, check queue",
        "description": "",
        "type": "task"
      },
      {
        "time": "09:30",
        "title": "Verify Rx orders",
        "description": "",
        "type": "task"
      },
      {
        "time": "11:00",
        "title": "Patient counseling",
        "description": "",
        "type": "communication"
      },
      {
        "time": "13:00",
        "title": "Vaccination clinic",
        "description": "",
        "type": "task"
      },
      {
        "time": "14:00",
        "title": "Insurance calls",
        "description": "",
        "type": "communication"
      },
      {
        "time": "16:00",
        "title": "Inventory check",
        "description": "",
        "type": "task"
      },
      {
        "time": "18:00",
        "title": "Close out",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Prescription mismatch flagged",
        "description": "patient waiting, physician not answering.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Pharmacist Week Project",
      "description": "Roll out a new vaccine clinic and hit 100 shots by Friday."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "DEA audit surprise"
      },
      {
        "type": "message",
        "content": "Stock-out of critical drug"
      },
      {
        "type": "message",
        "content": "Patient upset about co-pay"
      }
    ]
  }
},

{
  "id": "physical-therapist",
  "title": "Physical Therapist",
  "emoji": "🏋️‍♂️",
  "category": "Healthcare",
  "description": "Physical therapists help patients recover from injuries, surgeries, and chronic conditions through movement-based treatment. They design exercise plans, coach through pain, and celebrate small wins that feel enormous to patients.",
  "shortDescription": "Restore movement, rebuild lives.",
  "salaryRange": {
    "min": 75000,
    "max": 110000,
    "currency": "USD"
  },
  "educationYears": 7,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "hospital",
  "colleagues": [
    {
      "id": "dr-maya-hendricks",
      "name": "Dr. Maya Hendricks",
      "role": "Senior PT",
      "avatar": "🧑‍⚕️",
      "personality": "encouraging, exacting on form.",
      "systemPrompt": "You are Dr. Maya Hendricks, Senior PT. encouraging, exacting on form. Keep replies short and realistic."
    },
    {
      "id": "jordan-ellis",
      "name": "Jordan Ellis",
      "role": "PT Assistant",
      "avatar": "🧑‍⚕️",
      "personality": "energetic, keeps patients smiling.",
      "systemPrompt": "You are Jordan Ellis, PT Assistant. energetic, keeps patients smiling. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Play sports — get into stretching, foam-rolling, and understanding how your body recovers. Coach a younger kid’s team. Notice: do you enjoy the moment someone gets a movement right? That’s the PT thrill.",
    "youngAdult": "Complete a BS (kinesiology, exercise science) + DPT (Doctor of Physical Therapy, 3 yrs). Shadow PTs in 3 settings (outpatient, hospital, sports) before applying — required. NPTE licensing exam after DPT."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Physical Therapists Really Do",
      "sections": [
        {
          "type": "text",
          "content": "80% of PT is coaching movement and behavior change. Your patients only see you 45 min/week — the rest is homework you have to make them believe in."
        },
        {
          "type": "myth-vs-reality",
          "myth": "PT is just massage and stretching.",
          "reality": "PT is applied biomechanics + behavior coaching. You are half scientist, half coach."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "ph-ex1",
        "type": "decision",
        "title": "Post-op patient panics",
        "description": "Post-op patient panics — refuses to walk on day 2. Get them up safely.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "phth-d2",
        "type": "decision",
        "title": "Physical Therapist communication",
        "description": "A stakeholder is upset about an outcome related to your work as a physical therapist. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "phth-d3",
        "type": "decision",
        "title": "Physical Therapist problem solving",
        "description": "You discover a flaw in your physical therapist work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "phth-p1",
        "type": "prioritize",
        "title": "Physical Therapist priorities",
        "description": "You have four tasks competing for your attention as a physical therapist. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Critical patient needs immediate intervention",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Stable patient requests medication refill",
            "correctRank": 4
          },
          {
            "id": "c",
            "text": "Post-op patient reporting unexpected pain",
            "correctRank": 2
          },
          {
            "id": "d",
            "text": "New admission paperwork needs review",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:00",
        "title": "Chart review",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "09:00",
        "title": "5 patient sessions",
        "description": "",
        "type": "communication"
      },
      {
        "time": "12:00",
        "title": "Documentation",
        "description": "",
        "type": "task"
      },
      {
        "time": "13:00",
        "title": "4 more sessions",
        "description": "",
        "type": "task"
      },
      {
        "time": "16:30",
        "title": "Home-exercise program planning",
        "description": "",
        "type": "task"
      },
      {
        "time": "17:30",
        "title": "Team huddle",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Post-op patient panics",
        "description": "refuses to walk on day 2. Get them up safely.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Physical Therapist Week Project",
      "description": "Discharge 6 patients back to full function while onboarding 4 new post-surgical cases."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Insurance denies more visits"
      },
      {
        "type": "message",
        "content": "Patient no-show streak"
      },
      {
        "type": "message",
        "content": "Referring physician requests progress note"
      }
    ]
  }
},

{
  "id": "dentist",
  "title": "Dentist",
  "emoji": "🦷",
  "category": "Healthcare",
  "description": "Dentists diagnose and treat teeth, gums, and mouth structures. It’s a small-motor, high-precision job that mixes handcraft, medicine, and small-business ownership. Modern dentistry is highly digital — CAD/CAM crowns, 3D imaging, laser cavity detection.",
  "shortDescription": "Precision work, one millimeter at a time.",
  "salaryRange": {
    "min": 120000,
    "max": 250000,
    "currency": "USD"
  },
  "educationYears": 8,
  "demandLevel": "medium",
  "workStyle": "independent",
  "environment": "hospital",
  "colleagues": [
    {
      "id": "dr-priya-shah",
      "name": "Dr. Priya Shah",
      "role": "Practice Owner",
      "avatar": "📣",
      "personality": "calm, business-savvy.",
      "systemPrompt": "You are Dr. Priya Shah, Practice Owner. calm, business-savvy. Keep replies short and realistic."
    },
    {
      "id": "kim-trn",
      "name": "Kim Tr■n",
      "role": "Hygienist",
      "avatar": "🧑‍⚕️",
      "personality": "patient whisperer, keeps schedule tight.",
      "systemPrompt": "You are Kim Tr■n, Hygienist. patient whisperer, keeps schedule tight. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Play detail games — Lego Technic, jewelry making, painting miniatures. Ask your dentist to show you an X-ray next visit. If small precise motions calm you (not stress), that’s a strong signal.",
    "youngAdult": "Take dental-friendly bachelor pre-reqs (bio, chem, orgo, physics). DAT exam. 4 years of dental school (DDS or DMD). Consider 2-6 more years for specialization. Practice ownership can push income >$300K but adds business risk."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Dentists Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Half your job is dentistry, half is running a small business. Great chairside manner separates thriving practices from struggling ones."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Dentists just fill cavities.",
          "reality": "Cosmetic, restorative, surgical, and pediatric dentistry are wildly different."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "de-ex1",
        "type": "decision",
        "title": "Patient panics mid-procedure",
        "description": "Patient panics mid-procedure — needs re-numbing and reassurance without losing schedule.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "de-d2",
        "type": "decision",
        "title": "Dentist communication",
        "description": "A stakeholder is upset about an outcome related to your work as a dentist. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "de-d3",
        "type": "decision",
        "title": "Dentist problem solving",
        "description": "You discover a flaw in your dentist work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "de-p1",
        "type": "prioritize",
        "title": "Dentist priorities",
        "description": "You have four tasks competing for your attention as a dentist. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Critical patient needs immediate intervention",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Stable patient requests medication refill",
            "correctRank": 4
          },
          {
            "id": "c",
            "text": "Post-op patient reporting unexpected pain",
            "correctRank": 2
          },
          {
            "id": "d",
            "text": "New admission paperwork needs review",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:00",
        "title": "Team huddle + schedule review",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "08:30",
        "title": "5-6 patient chairs across day",
        "description": "",
        "type": "communication"
      },
      {
        "time": "12:30",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "13:30",
        "title": "3 more chairs",
        "description": "",
        "type": "task"
      },
      {
        "time": "16:00",
        "title": "Consult / treatment planning",
        "description": "",
        "type": "task"
      },
      {
        "time": "17:00",
        "title": "Admin + payroll",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Patient panics mid-procedure",
        "description": "needs re-numbing and reassurance without losing schedule.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Dentist Week Project",
      "description": "Onboard a new hygienist and hit weekly production target."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Equipment breakdown"
      },
      {
        "type": "message",
        "content": "Insurance rejection wave"
      },
      {
        "type": "message",
        "content": "Emergency walk-in with abscess"
      }
    ]
  }
},

{
  "id": "veterinarian",
  "title": "Veterinarian",
  "emoji": "🐾",
  "category": "Healthcare",
  "description": "Vets diagnose and treat animals — from house pets to livestock to wildlife. It requires medical skill across many species, gentle handling, and enormous emotional resilience (end-of-life conversations are frequent).",
  "shortDescription": "Medicine for the ones who can’t tell you where it hurts.",
  "salaryRange": {
    "min": 80000,
    "max": 160000,
    "currency": "USD"
  },
  "educationYears": 8,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "hospital",
  "colleagues": [
    {
      "id": "dr-riley-adams",
      "name": "Dr. Riley Adams",
      "role": "Head Vet",
      "avatar": "🧑‍⚕️",
      "personality": "kind, decisive.",
      "systemPrompt": "You are Dr. Riley Adams, Head Vet. kind, decisive. Keep replies short and realistic."
    },
    {
      "id": "kai-tanaka",
      "name": "Kai Tanaka",
      "role": "Vet Tech",
      "avatar": "🧑‍⚕️",
      "personality": "unflappable with fractious animals.",
      "systemPrompt": "You are Kai Tanaka, Vet Tech. unflappable with fractious animals. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Volunteer at a shelter or wildlife rehab. Foster kittens or rescue dogs. Shadow a vet for a day. If euthanasia conversations don’t scare you off, keep going.",
    "youngAdult": "Bachelor with heavy science pre-reqs. GRE. 4-year DVM. Shadow experience is expected before applying. Consider specialty residencies (3-4 more years). Rural / large-animal roles have loan-forgiveness programs."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Veterinarians Really Do",
      "sections": [
        {
          "type": "text",
          "content": "You will lose patients. Compassion fatigue is real — vets have some of the highest burnout rates. Loving animals isn’t enough; you must also love the science and love the humans holding the leash."
        },
        {
          "type": "myth-vs-reality",
          "myth": "You get to play with puppies.",
          "reality": "You do surgery, euthanasia, and manage anxious pet parents."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "ve-ex1",
        "type": "decision",
        "title": "Aggressive dog arrives",
        "description": "Aggressive dog arrives — safe handling required in 2 minutes.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "ve-d2",
        "type": "decision",
        "title": "Veterinarian communication",
        "description": "A stakeholder is upset about an outcome related to your work as a veterinarian. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "ve-d3",
        "type": "decision",
        "title": "Veterinarian problem solving",
        "description": "You discover a flaw in your veterinarian work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "ve-p1",
        "type": "prioritize",
        "title": "Veterinarian priorities",
        "description": "You have four tasks competing for your attention as a veterinarian. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Critical patient needs immediate intervention",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Stable patient requests medication refill",
            "correctRank": 4
          },
          {
            "id": "c",
            "text": "Post-op patient reporting unexpected pain",
            "correctRank": 2
          },
          {
            "id": "d",
            "text": "New admission paperwork needs review",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:00",
        "title": "Rounds on hospitalized patients",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "09:00",
        "title": "10 appointments",
        "description": "",
        "type": "task"
      },
      {
        "time": "12:30",
        "title": "Lunch/surgery block",
        "description": "",
        "type": "break"
      },
      {
        "time": "13:30",
        "title": "Surgeries",
        "description": "",
        "type": "task"
      },
      {
        "time": "15:30",
        "title": "More appointments",
        "description": "",
        "type": "task"
      },
      {
        "time": "17:00",
        "title": "Records + call-backs",
        "description": "",
        "type": "communication"
      }
    ],
    "stressEvents": [
      {
        "title": "Aggressive dog arrives",
        "description": "safe handling required in 2 minutes.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Veterinarian Week Project",
      "description": "Manage a parvo outbreak in a shelter partnership."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Wildlife emergency drop-off"
      },
      {
        "type": "message",
        "content": "Client can’t afford treatment"
      },
      {
        "type": "message",
        "content": "Complicated dental extraction"
      }
    ]
  }
},

{
  "id": "biomedical-scientist",
  "title": "Biomedical Scientist",
  "emoji": "🧬",
  "category": "Science",
  "description": "Biomedical scientists study disease, run lab experiments, develop diagnostics and therapies. Most work in hospitals, universities, or biotech companies. It’s a career of long timelines and slow, beautiful breakthroughs.",
  "shortDescription": "Discover the biology that saves lives.",
  "salaryRange": {
    "min": 60000,
    "max": 140000,
    "currency": "USD"
  },
  "educationYears": 6,
  "demandLevel": "medium",
  "workStyle": "independent",
  "environment": "office",
  "colleagues": [
    {
      "id": "dr-hana-cho",
      "name": "Dr. Hana Cho",
      "role": "PI (Principal Investigator)",
      "avatar": "📣",
      "personality": "brilliant, exacting.",
      "systemPrompt": "You are Dr. Hana Cho, PI (Principal Investigator). brilliant, exacting. Keep replies short and realistic."
    },
    {
      "id": "sam-bright",
      "name": "Sam Bright",
      "role": "Lab Manager",
      "avatar": "👨‍💼",
      "personality": "keeps the science running.",
      "systemPrompt": "You are Sam Bright, Lab Manager. keeps the science running. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Watch NileRed, Veritasium, and read a science-news app daily. Enter a science fair with a real experiment (not a display board). Find a summer program at a local university lab.",
    "youngAdult": "BS in biology / biochem / bioengineering. Undergraduate research is mandatory. MSc for lab-tech / industry roles; PhD for research scientist / academic. Postdocs pay ~$55-60K — plan finances. Technology & Data (new)"
  },
  "quickTrial": {
    "lecture": {
      "title": "What Biomedical Scientists Really Do",
      "sections": [
        {
          "type": "text",
          "content": "90% of experiments fail. The 10% that work move medicine forward. Curiosity and grit beat raw intelligence in this field."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Science is mostly ‘eureka’ moments.",
          "reality": "It’s mostly troubleshooting failed reactions."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "bi-ex1",
        "type": "decision",
        "title": "Freezer alarm",
        "description": "Freezer alarm — samples might be lost if temperature isn’t restored.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "bisc-d2",
        "type": "decision",
        "title": "Biomedical Scientist communication",
        "description": "A stakeholder is upset about an outcome related to your work as a biomedical scientist. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "bisc-d3",
        "type": "decision",
        "title": "Biomedical Scientist problem solving",
        "description": "You discover a flaw in your biomedical scientist work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "bisc-p1",
        "type": "prioritize",
        "title": "Biomedical Scientist priorities",
        "description": "You have four tasks competing for your attention as a biomedical scientist. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Experiment showing dangerous anomaly",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Peer review deadline tomorrow",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Clean and organize lab bench",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Update literature notes",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:30",
        "title": "Lab prep + calibration",
        "description": "",
        "type": "task"
      },
      {
        "time": "09:30",
        "title": "Bench work",
        "description": "",
        "type": "task"
      },
      {
        "time": "12:00",
        "title": "Lunch + literature reading",
        "description": "",
        "type": "break"
      },
      {
        "time": "13:00",
        "title": "More bench work",
        "description": "",
        "type": "task"
      },
      {
        "time": "15:30",
        "title": "Data analysis",
        "description": "",
        "type": "research"
      },
      {
        "time": "17:00",
        "title": "Lab meeting",
        "description": "",
        "type": "meeting"
      }
    ],
    "stressEvents": [
      {
        "title": "Freezer alarm",
        "description": "samples might be lost if temperature isn’t restored.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Biomedical Scientist Week Project",
      "description": "Reproduce a critical result before submitting a paper."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Reviewer requests more experiments"
      },
      {
        "type": "deadline",
        "title": "Grant deadline",
        "hoursRemaining": 2
      },
      {
        "type": "meeting",
        "title": "Collaboration meeting",
        "duration": 30
      }
    ]
  }
},

{
  "id": "cybersecurity-analyst",
  "title": "Cybersecurity Analyst",
  "emoji": "🔒",
  "category": "Technology",
  "description": "Cybersecurity analysts protect organizations from hackers, ransomware, and data breaches. They monitor networks, respond to incidents, and continuously test defenses. The field grows every year as attacks grow more sophisticated.",
  "shortDescription": "Guard the digital vault.",
  "salaryRange": {
    "min": 70000,
    "max": 160000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "office-remote",
  "colleagues": [
    {
      "id": "zara-hakim",
      "name": "Zara Hakim",
      "role": "SOC Lead",
      "avatar": "👨‍💼",
      "personality": "unflappable, methodical.",
      "systemPrompt": "You are Zara Hakim, SOC Lead. unflappable, methodical. Keep replies short and realistic."
    },
    {
      "id": "dev-malhotra",
      "name": "Dev Malhotra",
      "role": "Penetration Tester",
      "avatar": "👩‍💻",
      "personality": "mischievous, thinks like an attacker.",
      "systemPrompt": "You are Dev Malhotra, Penetration Tester. mischievous, thinks like an attacker. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Do TryHackMe rooms free. Enter CTF competitions (picoCTF is beginner-friendly). Set up a home lab with an old laptop. Read Krebs on Security.",
    "youngAdult": "BS in CS, IT, or cybersecurity — OR certifications-first (CompTIA Security+, then CySA+, then OSCP or CISSP). Home lab + CTFs on your resume beat many degrees. Entry roles: SOC analyst tier 1."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Cybersecurity Analysts Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Half the job is patient monitoring and pattern-recognition. When something happens, you have minutes to contain it. Documentation matters as much as the fix."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Hackers vs defenders — like the movies.",
          "reality": "It’s policies, patch management, phishing training, and dashboards."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "cy-ex1",
        "type": "decision",
        "title": "Ransomware alert",
        "description": "Ransomware alert — production servers encrypting. Isolate NOW.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "cyan-d2",
        "type": "decision",
        "title": "Cybersecurity Analyst communication",
        "description": "A stakeholder is upset about an outcome related to your work as a cybersecurity analyst. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "cyan-d3",
        "type": "decision",
        "title": "Cybersecurity Analyst problem solving",
        "description": "You discover a flaw in your cybersecurity analyst work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "cyan-p1",
        "type": "prioritize",
        "title": "Cybersecurity Analyst priorities",
        "description": "You have four tasks competing for your attention as a cybersecurity analyst. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Production outage affecting users",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Security patch deadline today",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Refactor legacy code for readability",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Reply to non-urgent team Slack messages",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:30",
        "title": "Overnight alert review",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "09:30",
        "title": "Incident triage",
        "description": "",
        "type": "inbox"
      },
      {
        "time": "11:00",
        "title": "Vulnerability scan",
        "description": "",
        "type": "task"
      },
      {
        "time": "13:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "Phishing training rollout",
        "description": "",
        "type": "task"
      },
      {
        "time": "15:30",
        "title": "Meet compliance team",
        "description": "",
        "type": "task"
      },
      {
        "time": "17:00",
        "title": "Playbook update",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Ransomware alert",
        "description": "production servers encrypting. Isolate NOW.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Cybersecurity Analyst Week Project",
      "description": "Run a phishing simulation across the company and remediate results."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Zero-day CVE published"
      },
      {
        "type": "message",
        "content": "VIP account compromised"
      },
      {
        "type": "message",
        "content": "Board wants monthly report"
      }
    ]
  }
},

{
  "id": "ux-ui-designer",
  "title": "UX / UI Designer",
  "emoji": "🎨",
  "category": "Design",
  "description": "UX designers research users, map journeys, and design interfaces that feel intuitive. UI focuses on visual polish and interaction detail. Great designers are half psychologist, half craftsperson, all communicator.",
  "shortDescription": "Design what people actually love using.",
  "salaryRange": {
    "min": 65000,
    "max": 150000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "office-remote",
  "colleagues": [
    {
      "id": "rin-sato",
      "name": "Rin Sato",
      "role": "Design Lead",
      "avatar": "👨‍💼",
      "personality": "curious, opinionated, kind.",
      "systemPrompt": "You are Rin Sato, Design Lead. curious, opinionated, kind. Keep replies short and realistic."
    },
    {
      "id": "priya-patel",
      "name": "Priya Patel",
      "role": "Product Designer (from Software Eng career)",
      "avatar": "🎨",
      "personality": "user-focused, empathetic.",
      "systemPrompt": "You are Priya Patel, Product Designer (from Software Eng career). user-focused, empathetic. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Redesign something bad — the vending-machine screen at your school, a form on a website. Post before/after on Behance. Take Google’s UX certificate’s first course free.",
    "youngAdult": "Complete Google UX Certificate + build 3 case studies with real users. Learn Figma cold. Get an internship or apprenticeship — portfolios beat degrees. Ideal roles: UX associate, product designer."
  },
  "quickTrial": {
    "lecture": {
      "title": "What UX / UI Designers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Great UX starts with research. You’ll interview more users than you draw screens. Feedback isn’t personal — bad designs die so users can thrive."
        },
        {
          "type": "myth-vs-reality",
          "myth": "It’s just making things pretty.",
          "reality": "It’s applied psychology, research, and iteration."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "ux-ex1",
        "type": "decision",
        "title": "Executive demands a redesign in 3 days",
        "description": "Executive demands a redesign in 3 days — no research allowed.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "uxui-d2",
        "type": "decision",
        "title": "UX / UI Designer communication",
        "description": "A stakeholder is upset about an outcome related to your work as a ux / ui designer. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "uxui-d3",
        "type": "decision",
        "title": "UX / UI Designer problem solving",
        "description": "You discover a flaw in your ux / ui designer work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "uxui-p1",
        "type": "prioritize",
        "title": "UX / UI Designer priorities",
        "description": "You have four tasks competing for your attention as a ux / ui designer. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Client needs final logo by end of day",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Revise mockups based on feedback",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Organize asset folders",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Browse inspiration sites",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "09:00",
        "title": "Coffee + inspiration browsing",
        "description": "",
        "type": "task"
      },
      {
        "time": "09:30",
        "title": "User research call",
        "description": "",
        "type": "communication"
      },
      {
        "time": "11:00",
        "title": "Wireframing",
        "description": "",
        "type": "task"
      },
      {
        "time": "13:00",
        "title": "Design critique",
        "description": "",
        "type": "design"
      },
      {
        "time": "14:30",
        "title": "High-fidelity in Figma",
        "description": "",
        "type": "task"
      },
      {
        "time": "16:00",
        "title": "Handoff to engineering",
        "description": "",
        "type": "meeting"
      }
    ],
    "stressEvents": [
      {
        "title": "Executive demands a redesign in 3 days",
        "description": "no research allowed.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "UX / UI Designer Week Project",
      "description": "Ship a checkout redesign, backed by 5 user tests."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Engineering flags feasibility"
      },
      {
        "type": "message",
        "content": "PM changes scope"
      },
      {
        "type": "message",
        "content": "New design tool arrives"
      }
    ]
  }
},

{
  "id": "cloud-engineer",
  "title": "Cloud Engineer",
  "emoji": "☁️",
  "category": "Technology",
  "description": "Cloud engineers design, deploy, and manage systems on AWS, Azure, or Google Cloud. They automate infrastructure, ensure reliability, and optimize cost. It’s a role that blends coding, systems thinking, and firefighting during outages.",
  "shortDescription": "Run internet-scale infrastructure without owning a server.",
  "salaryRange": {
    "min": 95000,
    "max": 200000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "office-remote",
  "colleagues": [
    {
      "id": "wei-zhang",
      "name": "Wei Zhang",
      "role": "Principal Engineer",
      "avatar": "👩‍💻",
      "personality": "calm during outages.",
      "systemPrompt": "You are Wei Zhang, Principal Engineer. calm during outages. Keep replies short and realistic."
    },
    {
      "id": "sam-reeves",
      "name": "Sam Reeves",
      "role": "DevOps Lead",
      "avatar": "👨‍💼",
      "personality": "automation evangelist.",
      "systemPrompt": "You are Sam Reeves, DevOps Lead. automation evangelist. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Set up a free AWS/GCP tier. Host your own website — deploy a static site with GitHub Pages. Learn Linux basics in a terminal.",
    "youngAdult": "Get AWS Cloud Practitioner (starter cert). Then Solutions Architect Associate. Learn Terraform, Docker, one language (Python/Go). Build 2-3 portfolio projects with IaC. Cloud Resume Challenge = interview gold."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Cloud Engineers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "You automate everything, then automate the automation. Uptime is the product. Pages at 3am are part of the deal."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Cloud is easy because Amazon does the work.",
          "reality": "You still architect for scale, security, and cost every day."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "cl-ex1",
        "type": "decision",
        "title": "Region-wide outage",
        "description": "Region-wide outage — customers screaming, root cause unclear.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "clen-d2",
        "type": "decision",
        "title": "Cloud Engineer communication",
        "description": "A stakeholder is upset about an outcome related to your work as a cloud engineer. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "clen-d3",
        "type": "decision",
        "title": "Cloud Engineer problem solving",
        "description": "You discover a flaw in your cloud engineer work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "clen-p1",
        "type": "prioritize",
        "title": "Cloud Engineer priorities",
        "description": "You have four tasks competing for your attention as a cloud engineer. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Production outage affecting users",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Security patch deadline today",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Refactor legacy code for readability",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Reply to non-urgent team Slack messages",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:30",
        "title": "On-call handoff",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "09:00",
        "title": "Infrastructure PRs",
        "description": "",
        "type": "task"
      },
      {
        "time": "11:00",
        "title": "Cost review",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "13:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "Terraform modules",
        "description": "",
        "type": "task"
      },
      {
        "time": "15:30",
        "title": "Incident postmortem",
        "description": "",
        "type": "task"
      },
      {
        "time": "17:00",
        "title": "Docs update",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Region-wide outage",
        "description": "customers screaming, root cause unclear.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Cloud Engineer Week Project",
      "description": "Migrate a service to Kubernetes without downtime."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Vendor price hike"
      },
      {
        "type": "message",
        "content": "Security audit"
      },
      {
        "type": "message",
        "content": "Cost overrun on a service"
      }
    ]
  }
},

{
  "id": "game-developer",
  "title": "Game Developer",
  "emoji": "🎮",
  "category": "Technology",
  "description": "Game developers design, code, and polish video games — from mobile puzzles to AAA blockbusters. It combines art, math, physics, storytelling, and heavy programming. Passion is required; the industry is competitive and hours can be long.",
  "shortDescription": "Build worlds people live inside.",
  "salaryRange": {
    "min": 55000,
    "max": 150000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "office",
  "colleagues": [
    {
      "id": "jamie-ortiz",
      "name": "Jamie Ortiz",
      "role": "Lead Programmer",
      "avatar": "👨‍💼",
      "personality": "pragmatic, playful.",
      "systemPrompt": "You are Jamie Ortiz, Lead Programmer. pragmatic, playful. Keep replies short and realistic."
    },
    {
      "id": "aria-kim",
      "name": "Aria Kim",
      "role": "Technical Artist",
      "avatar": "🎨",
      "personality": "bridge between art and code.",
      "systemPrompt": "You are Aria Kim, Technical Artist. bridge between art and code. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Make your first game in Scratch or Unity in a weekend. Even a Pong clone. Publish on itch.io. Join a game jam (Ludum Dare, GMTK).",
    "youngAdult": "Portfolio > degree in this field. Complete 2-3 finished (not just started) games. Learn Unity or Unreal + C# / C++. Contribute to modding communities. Junior gameplay programmer or QA is a common entry."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Game Developers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Making a game is 80% polish, 20% clever ideas. You will scrap features you love because they don’t serve the fun."
        },
        {
          "type": "myth-vs-reality",
          "myth": "You play games all day.",
          "reality": "You debug shaders, fix physics glitches, and playtest the same 3 seconds 300 times."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "ga-ex1",
        "type": "decision",
        "title": "Crunch mode",
        "description": "Crunch mode — publisher demo in 5 days, key feature is broken.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "gade-d2",
        "type": "decision",
        "title": "Game Developer communication",
        "description": "A stakeholder is upset about an outcome related to your work as a game developer. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "gade-d3",
        "type": "decision",
        "title": "Game Developer problem solving",
        "description": "You discover a flaw in your game developer work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "gade-p1",
        "type": "prioritize",
        "title": "Game Developer priorities",
        "description": "You have four tasks competing for your attention as a game developer. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Production outage affecting users",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Security patch deadline today",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Refactor legacy code for readability",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Reply to non-urgent team Slack messages",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "09:30",
        "title": "Bug queue triage",
        "description": "",
        "type": "inbox"
      },
      {
        "time": "10:30",
        "title": "Gameplay coding",
        "description": "",
        "type": "task"
      },
      {
        "time": "13:00",
        "title": "Lunch + playtest",
        "description": "",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "Design meeting",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "15:30",
        "title": "More coding",
        "description": "",
        "type": "task"
      },
      {
        "time": "17:00",
        "title": "Commit + review teammate’s PR",
        "description": "",
        "type": "meeting"
      }
    ],
    "stressEvents": [
      {
        "title": "Crunch mode",
        "description": "publisher demo in 5 days, key feature is broken.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Game Developer Week Project",
      "description": "Ship a playable demo for the next milestone."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Design pivot"
      },
      {
        "type": "message",
        "content": "Engine update breaks build"
      },
      {
        "type": "deadline",
        "title": "Convention deadline",
        "hoursRemaining": 2
      }
    ]
  }
},

{
  "id": "ai-ml-engineer",
  "title": "AI / ML Engineer",
  "emoji": "🤖",
  "category": "Technology",
  "description": "AI/ML engineers build systems that learn — recommendation engines, chatbots, image recognition, autonomous vehicles. They bridge data science and software engineering: modeling + productionizing.",
  "shortDescription": "Turn algorithms into products.",
  "salaryRange": {
    "min": 110000,
    "max": 250000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "office-remote",
  "colleagues": [
    {
      "id": "dr-anika-rao",
      "name": "Dr. Anika Rao",
      "role": "ML Scientist",
      "avatar": "👩‍💻",
      "personality": "research-minded.",
      "systemPrompt": "You are Dr. Anika Rao, ML Scientist. research-minded. Keep replies short and realistic."
    },
    {
      "id": "kenji-ito",
      "name": "Kenji Ito",
      "role": "MLOps Engineer",
      "avatar": "👩‍💻",
      "personality": "keeps models in production.",
      "systemPrompt": "You are Kenji Ito, MLOps Engineer. keeps models in production. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Try Teachable Machine by Google — train an image classifier without code. Take fast.ai’s free course by senior year. Play with ChatGPT for building things, not just chatting.",
    "youngAdult": "Strong math (linear algebra, stats, calc). Master Python + PyTorch or TensorFlow. Master’s helps but many hires are strong self-taught + portfolio. Kaggle medals and open-source contributions carry weight. Business & Finance (new)"
  },
  "quickTrial": {
    "lecture": {
      "title": "What AI / ML Engineers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "90% of ML in production is data pipelines, monitoring, and evaluation. The novel model architecture is 10%. Craft matters more than hype."
        },
        {
          "type": "myth-vs-reality",
          "myth": "It’s all cutting-edge research.",
          "reality": "Most work is cleaning data and shipping the boring model that works."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "ai-ex1",
        "type": "decision",
        "title": "Model in production silently degrades",
        "description": "Model in production silently degrades — customers see garbage recommendations.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "aiml-d2",
        "type": "decision",
        "title": "AI / ML Engineer communication",
        "description": "A stakeholder is upset about an outcome related to your work as a ai / ml engineer. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "aiml-d3",
        "type": "decision",
        "title": "AI / ML Engineer problem solving",
        "description": "You discover a flaw in your ai / ml engineer work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "aiml-p1",
        "type": "prioritize",
        "title": "AI / ML Engineer priorities",
        "description": "You have four tasks competing for your attention as a ai / ml engineer. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Production outage affecting users",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Security patch deadline today",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Refactor legacy code for readability",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Reply to non-urgent team Slack messages",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "09:00",
        "title": "Model performance review",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "10:00",
        "title": "Feature engineering",
        "description": "",
        "type": "task"
      },
      {
        "time": "11:30",
        "title": "Training run",
        "description": "",
        "type": "task"
      },
      {
        "time": "13:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "Debug pipeline",
        "description": "",
        "type": "task"
      },
      {
        "time": "15:30",
        "title": "Team review",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "17:00",
        "title": "Docs",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Model in production silently degrades",
        "description": "customers see garbage recommendations.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "AI / ML Engineer Week Project",
      "description": "Ship a v2 of the recommender with a 5% metric lift."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "GPU quota denied"
      },
      {
        "type": "message",
        "content": "Data drift alert"
      },
      {
        "type": "message",
        "content": "Regulator asks for explainability"
      }
    ]
  }
},

{
  "id": "financial-analyst",
  "title": "Financial Analyst",
  "emoji": "📊",
  "category": "Business",
  "description": "Financial analysts evaluate companies, industries, and investments to guide decisions — whether picking stocks, advising M&A;, or forecasting a corporate budget. Excel and clear writing are the enduring skills.",
  "shortDescription": "Read the story numbers tell about a company.",
  "salaryRange": {
    "min": 65000,
    "max": 150000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "medium",
  "workStyle": "independent",
  "environment": "office",
  "colleagues": [
    {
      "id": "amir-farrokh",
      "name": "Amir Farrokh",
      "role": "Senior Analyst",
      "avatar": "👩‍💻",
      "personality": "quantitative, mentoring.",
      "systemPrompt": "You are Amir Farrokh, Senior Analyst. quantitative, mentoring. Keep replies short and realistic."
    },
    {
      "id": "sana-kapoor",
      "name": "Sana Kapoor",
      "role": "Portfolio Manager",
      "avatar": "👨‍💼",
      "personality": "strategic decision-maker.",
      "systemPrompt": "You are Sana Kapoor, Portfolio Manager. strategic decision-maker. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Start a simulated stock portfolio on Investopedia. Read one 10-K filing. Track a company for 3 months and write your own thesis.",
    "youngAdult": "Finance or econ degree + Excel mastery. Internships in banking, PE, or FP&A.; Consider CFA (3 levels). Behavioral interviews are 50% of hiring — practice storytelling."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Financial Analysts Really Do",
      "sections": [
        {
          "type": "text",
          "content": "A perfect model still needs a story. The 3-slide summary matters more than the 50-tab spreadsheet."
        },
        {
          "type": "myth-vs-reality",
          "myth": "You’re predicting the market.",
          "reality": "You’re helping decision-makers understand risks and trade-offs."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "fi-ex1",
        "type": "decision",
        "title": "Client wants a valuation model by 8am",
        "description": "Client wants a valuation model by 8am — data drops at midnight.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "fian-d2",
        "type": "decision",
        "title": "Financial Analyst communication",
        "description": "A stakeholder is upset about an outcome related to your work as a financial analyst. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "fian-d3",
        "type": "decision",
        "title": "Financial Analyst problem solving",
        "description": "You discover a flaw in your financial analyst work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "fian-p1",
        "type": "prioritize",
        "title": "Financial Analyst priorities",
        "description": "You have four tasks competing for your attention as a financial analyst. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Major client complaint on social media",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Quarterly report due to leadership today",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Schedule next week’s team meeting",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Review non-urgent email backlog",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "07:30",
        "title": "Read market news",
        "description": "",
        "type": "task"
      },
      {
        "time": "08:30",
        "title": "Update model",
        "description": "",
        "type": "task"
      },
      {
        "time": "10:00",
        "title": "Company earnings call",
        "description": "",
        "type": "communication"
      },
      {
        "time": "12:00",
        "title": "Lunch at desk",
        "description": "",
        "type": "break"
      },
      {
        "time": "13:00",
        "title": "Draft memo",
        "description": "",
        "type": "design"
      },
      {
        "time": "15:00",
        "title": "Team review",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "17:30",
        "title": "Prep for tomorrow",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Client wants a valuation model by 8am",
        "description": "data drops at midnight.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Financial Analyst Week Project",
      "description": "Build a full DCF and present to the investment committee."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Company issues surprise guidance"
      },
      {
        "type": "message",
        "content": "Analyst downgrade"
      },
      {
        "type": "message",
        "content": "Portfolio rebalance day"
      }
    ]
  }
},

{
  "id": "human-resources-manager",
  "title": "Human Resources Manager",
  "emoji": "🤝",
  "category": "Business",
  "description": "HR managers hire, develop, and support employees — while balancing legal, cultural, and business needs. Modern HR is strategic: designing policies, managing conflict, building culture, using data.",
  "shortDescription": "People are the product.",
  "salaryRange": {
    "min": 60000,
    "max": 130000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "medium",
  "workStyle": "collaborative",
  "environment": "office",
  "colleagues": [
    {
      "id": "simone-beckett",
      "name": "Simone Beckett",
      "role": "HR Director",
      "avatar": "👨‍💼",
      "personality": "strategic, empathetic.",
      "systemPrompt": "You are Simone Beckett, HR Director. strategic, empathetic. Keep replies short and realistic."
    },
    {
      "id": "ravi-malhotra",
      "name": "Ravi Malhotra",
      "role": "Talent Partner",
      "avatar": "👨‍💼",
      "personality": "recruiter with a magic Rolodex.",
      "systemPrompt": "You are Ravi Malhotra, Talent Partner. recruiter with a magic Rolodex. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Lead a club — mediate a real conflict. Take a communications class. Watch how your favorite teacher handles a disruptive kid — that’s HR.",
    "youngAdult": "HR, psychology, or business major. SHRM-CP or PHR certification. Internships in HR ops are gold. HR generalist is the common on-ramp."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Human Resources Managers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "You listen more than you talk. Every conflict has three sides — theirs, theirs, and the truth. Confidentiality is your currency."
        },
        {
          "type": "myth-vs-reality",
          "myth": "HR is just paperwork.",
          "reality": "You handle harassment cases, layoffs, and culture — high emotional stakes."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "hu-ex1",
        "type": "decision",
        "title": "Sensitive complaint",
        "description": "Sensitive complaint — investigate discreetly and quickly.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "hure-d2",
        "type": "decision",
        "title": "Human Resources Manager communication",
        "description": "A stakeholder is upset about an outcome related to your work as a human resources manager. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "hure-d3",
        "type": "decision",
        "title": "Human Resources Manager problem solving",
        "description": "You discover a flaw in your human resources manager work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "hure-p1",
        "type": "prioritize",
        "title": "Human Resources Manager priorities",
        "description": "You have four tasks competing for your attention as a human resources manager. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Major client complaint on social media",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Quarterly report due to leadership today",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Schedule next week’s team meeting",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Review non-urgent email backlog",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "09:00",
        "title": "Recruit pipeline review",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "10:00",
        "title": "Interviews",
        "description": "",
        "type": "task"
      },
      {
        "time": "12:00",
        "title": "Comp & benefits review",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "13:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "Employee-relations case",
        "description": "",
        "type": "task"
      },
      {
        "time": "15:30",
        "title": "Policy update",
        "description": "",
        "type": "task"
      },
      {
        "time": "17:00",
        "title": "Learning plan",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Sensitive complaint",
        "description": "investigate discreetly and quickly.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Human Resources Manager Week Project",
      "description": "Close 4 open reqs and roll out annual reviews."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Employee resigns"
      },
      {
        "type": "message",
        "content": "Legal ping"
      },
      {
        "type": "message",
        "content": "Manager wants urgent coaching"
      }
    ]
  }
},

{
  "id": "product-manager",
  "title": "Product Manager",
  "emoji": "📋",
  "category": "Business",
  "description": "Product managers decide what to build, why, and for whom. They balance customer needs, business goals, and engineering realities. No authority, all influence.",
  "shortDescription": "Own the ‘why’ of what gets built.",
  "salaryRange": {
    "min": 85000,
    "max": 200000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "office-remote",
  "colleagues": [
    {
      "id": "nina-reyes",
      "name": "Nina Reyes",
      "role": "Head of Product",
      "avatar": "📣",
      "personality": "sharp, visionary.",
      "systemPrompt": "You are Nina Reyes, Head of Product. sharp, visionary. Keep replies short and realistic."
    },
    {
      "id": "sarah-chen",
      "name": "Sarah Chen",
      "role": "Senior Developer (from Software Eng)",
      "avatar": "👩‍💻",
      "personality": "technical mentor.",
      "systemPrompt": "You are Sarah Chen, Senior Developer (from Software Eng). technical mentor. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Redesign an app you use daily — write a 1-pager on what’s broken and how you’d fix it. Learn to interview: ask better questions than everyone in your friend group.",
    "youngAdult": "Any major (tech literacy required). Consulting, engineering, or design backgrounds transition well. Internships as APM (Associate PM) — Google, Meta, Uber programs. Portfolio: 2 case studies + a side project you shipped."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Product Managers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "You’re responsible for everything, in charge of nothing. Great PMs make the team look brilliant — bad PMs steal credit and shift blame."
        },
        {
          "type": "myth-vs-reality",
          "myth": "PM = mini CEO.",
          "reality": "PM = servant leader. You unblock, you don’t command."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "pr-ex1",
        "type": "decision",
        "title": "Two senior engineers disagree loudly",
        "description": "Two senior engineers disagree loudly — team is stuck. Break the tie.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "prma-d2",
        "type": "decision",
        "title": "Product Manager communication",
        "description": "A stakeholder is upset about an outcome related to your work as a product manager. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "prma-d3",
        "type": "decision",
        "title": "Product Manager problem solving",
        "description": "You discover a flaw in your product manager work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "prma-p1",
        "type": "prioritize",
        "title": "Product Manager priorities",
        "description": "You have four tasks competing for your attention as a product manager. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Major client complaint on social media",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Quarterly report due to leadership today",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Schedule next week’s team meeting",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Review non-urgent email backlog",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "09:00",
        "title": "Metrics review",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "10:00",
        "title": "Customer interview",
        "description": "",
        "type": "communication"
      },
      {
        "time": "11:30",
        "title": "Roadmap grooming",
        "description": "",
        "type": "task"
      },
      {
        "time": "13:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "Design review",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "15:30",
        "title": "Sprint planning",
        "description": "",
        "type": "task"
      },
      {
        "time": "17:00",
        "title": "Doc writing",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Two senior engineers disagree loudly",
        "description": "team is stuck. Break the tie.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Product Manager Week Project",
      "description": "Ship a v1 feature to 10% of users and read the data."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Executive changes priorities"
      },
      {
        "type": "message",
        "content": "Customer churn spike"
      },
      {
        "type": "message",
        "content": "Legal blocks a launch"
      }
    ]
  }
},

{
  "id": "management-consultant",
  "title": "Management Consultant",
  "emoji": "💼",
  "category": "Business",
  "description": "Consultants (McKinsey, BCG, Bain, boutiques) help companies solve strategic problems in weeks, not years. It’s intense, structured problem-solving with heavy travel and long hours — but a huge accelerator early in a career.",
  "shortDescription": "Solve messy business problems fast.",
  "salaryRange": {
    "min": 90000,
    "max": 250000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "field",
  "colleagues": [
    {
      "id": "rebecca-sun",
      "name": "Rebecca Sun",
      "role": "Engagement Manager",
      "avatar": "👨‍💼",
      "personality": "sharp, poised, fast.",
      "systemPrompt": "You are Rebecca Sun, Engagement Manager. sharp, poised, fast. Keep replies short and realistic."
    },
    {
      "id": "diego-rossi",
      "name": "Diego Rossi",
      "role": "Partner",
      "avatar": "👨‍💼",
      "personality": "senior rainmaker, big-picture thinker.",
      "systemPrompt": "You are Diego Rossi, Partner. senior rainmaker, big-picture thinker. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Do debate + case competitions. Read McKinsey Quarterly (free articles). Solve mini business puzzles — ‘How many pizzas are sold in NYC daily?’ Nail the math + logic.",
    "youngAdult": "Top-tier undergrad or MBA opens doors fastest. Case-interview prep is a sport — 40-100 practice cases before offers. MBB firms recruit from ~50 target schools; boutiques and Big-4 hire more broadly. Skilled Trades (new)"
  },
  "quickTrial": {
    "lecture": {
      "title": "What Management Consultants Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Structure is the product. You break problems into pieces, size the pieces, prioritize the biggest, then attack. The frameworks are just training wheels for clear thinking."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Consultants know everything.",
          "reality": "They know how to learn anything, quickly — that’s the real skill."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "ma-ex1",
        "type": "decision",
        "title": "Steering committee tomorrow",
        "description": "Steering committee tomorrow — recommendation isn’t clear yet.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "maco-d2",
        "type": "decision",
        "title": "Management Consultant communication",
        "description": "A stakeholder is upset about an outcome related to your work as a management consultant. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "maco-d3",
        "type": "decision",
        "title": "Management Consultant problem solving",
        "description": "You discover a flaw in your management consultant work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "maco-p1",
        "type": "prioritize",
        "title": "Management Consultant priorities",
        "description": "You have four tasks competing for your attention as a management consultant. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Major client complaint on social media",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Quarterly report due to leadership today",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Schedule next week’s team meeting",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Review non-urgent email backlog",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "07:00",
        "title": "Airport / hotel",
        "description": "",
        "type": "task"
      },
      {
        "time": "08:00",
        "title": "Client on-site work",
        "description": "",
        "type": "communication"
      },
      {
        "time": "12:30",
        "title": "Working lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "13:30",
        "title": "Data crunch",
        "description": "",
        "type": "task"
      },
      {
        "time": "16:00",
        "title": "Client update",
        "description": "",
        "type": "communication"
      },
      {
        "time": "18:00",
        "title": "Team dinner",
        "description": "",
        "type": "task"
      },
      {
        "time": "22:00",
        "title": "Deck polishing",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Steering committee tomorrow",
        "description": "recommendation isn’t clear yet.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Management Consultant Week Project",
      "description": "Diagnose a factory’s efficiency problem and present a plan."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Client scope creep"
      },
      {
        "type": "message",
        "content": "Partner drops in unannounced"
      },
      {
        "type": "message",
        "content": "Data source vanishes"
      }
    ]
  }
},

{
  "id": "electrician",
  "title": "Electrician",
  "emoji": "⚡",
  "category": "Trades",
  "description": "Electricians install, maintain, and repair electrical systems in homes, businesses, and industry. It’s hands-on, high-skill, well-paid, and can’t be outsourced. Apprenticeships pay you while you learn.",
  "shortDescription": "Wire the world, one panel at a time.",
  "salaryRange": {
    "min": 45000,
    "max": 120000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "independent",
  "environment": "field",
  "colleagues": [
    {
      "id": "marcus-johnson",
      "name": "Marcus Johnson",
      "role": "Master Electrician",
      "avatar": "🔧",
      "personality": "safety-focused, direct.",
      "systemPrompt": "You are Marcus Johnson, Master Electrician. safety-focused, direct. Keep replies short and realistic."
    },
    {
      "id": "amelia-ruiz",
      "name": "Amelia Ruiz",
      "role": "Apprentice",
      "avatar": "📣",
      "personality": "eager, learning fast.",
      "systemPrompt": "You are Amelia Ruiz, Apprentice. eager, learning fast. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Build simple circuits with breadboard kits. Rewire a lamp with a parent’s help. Enroll in a high-school shop / vocational class. Watch Electrician U on YouTube.",
    "youngAdult": "Apply for a paid apprenticeship (IBEW in the US, unions elsewhere). 4-5 years combining classroom + on-the-job. Pass journeyman exam. Consider master electrician later for higher pay and ability to run your own crew."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Electricians Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Half the job is diagnosis — finding the wire that shouldn’t be doing what it’s doing. Codes save lives; shortcuts kill."
        },
        {
          "type": "myth-vs-reality",
          "myth": "It’s just plugging things in.",
          "reality": "You do math, read schematics, and stake your license on safety."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "el-ex1",
        "type": "decision",
        "title": "Live panel",
        "description": "Live panel — one wrong touch causes injury or fire.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "el-d2",
        "type": "decision",
        "title": "Electrician communication",
        "description": "A stakeholder is upset about an outcome related to your work as a electrician. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "el-d3",
        "type": "decision",
        "title": "Electrician problem solving",
        "description": "You discover a flaw in your electrician work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "el-p1",
        "type": "prioritize",
        "title": "Electrician priorities",
        "description": "You have four tasks competing for your attention as a electrician. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine electrician work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "07:00",
        "title": "Job kickoff + safety brief",
        "description": "",
        "type": "task"
      },
      {
        "time": "07:30",
        "title": "Rough-in wiring",
        "description": "",
        "type": "task"
      },
      {
        "time": "11:00",
        "title": "Code check",
        "description": "",
        "type": "build"
      },
      {
        "time": "12:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "13:00",
        "title": "Panel install",
        "description": "",
        "type": "task"
      },
      {
        "time": "15:00",
        "title": "Testing",
        "description": "",
        "type": "task"
      },
      {
        "time": "17:00",
        "title": "Cleanup + notes",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Live panel",
        "description": "one wrong touch causes injury or fire.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Electrician Week Project",
      "description": "Complete rough-in for a 3-story building before drywall."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Inspector visit"
      },
      {
        "type": "message",
        "content": "Client changes scope"
      },
      {
        "type": "message",
        "content": "Wire shortage"
      }
    ]
  }
},

{
  "id": "plumber",
  "title": "Plumber",
  "emoji": "🚿",
  "category": "Trades",
  "description": "Plumbers install and repair water, gas, and drainage systems. Strong demand, good pay, self-employment is common. Modern plumbing includes green tech (heat pumps, tankless, rainwater).",
  "shortDescription": "Solve problems no one else wants to touch.",
  "salaryRange": {
    "min": 45000,
    "max": 110000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "independent",
  "environment": "field",
  "colleagues": [
    {
      "id": "tony-alessi",
      "name": "Tony Alessi",
      "role": "Master Plumber",
      "avatar": "🔧",
      "personality": "gruff, funny, teaches through stories.",
      "systemPrompt": "You are Tony Alessi, Master Plumber. gruff, funny, teaches through stories. Keep replies short and realistic."
    },
    {
      "id": "nadia-farah",
      "name": "Nadia Farah",
      "role": "Estimator",
      "avatar": "🧑‍💼",
      "personality": "makes sure bids win and pay.",
      "systemPrompt": "You are Nadia Farah, Estimator. makes sure bids win and pay. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Ask a parent to teach you to fix a leaky faucet. Take shop class. Watch This Old House. If tight spaces don’t bother you and you enjoy fixing, you’re half-trained already.",
    "youngAdult": "Apprenticeship via union (UA) or local plumbing contractor. Pay while you learn. Journeyman license + master exam. Consider owning a truck and going independent — solo plumbers often outearn office workers."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Plumbers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Diagnosis pays. Anyone can swap a fitting; few can find the slow leak in an old wall in 20 minutes."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Plumbers just fix toilets.",
          "reality": "Big commercial jobs, gas lines, and medical-facility work require serious expertise."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "pl-ex1",
        "type": "decision",
        "title": "Sewage backup at a restaurant",
        "description": "Sewage backup at a restaurant — health inspector coming.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "pl-d2",
        "type": "decision",
        "title": "Plumber communication",
        "description": "A stakeholder is upset about an outcome related to your work as a plumber. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "pl-d3",
        "type": "decision",
        "title": "Plumber problem solving",
        "description": "You discover a flaw in your plumber work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "pl-p1",
        "type": "prioritize",
        "title": "Plumber priorities",
        "description": "You have four tasks competing for your attention as a plumber. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine plumber work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "07:00",
        "title": "Job board check",
        "description": "",
        "type": "task"
      },
      {
        "time": "08:00",
        "title": "Emergency call",
        "description": "",
        "type": "urgent"
      },
      {
        "time": "10:00",
        "title": "Install visit",
        "description": "",
        "type": "field"
      },
      {
        "time": "12:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "13:00",
        "title": "Rough-in on new build",
        "description": "",
        "type": "build"
      },
      {
        "time": "15:30",
        "title": "Service call",
        "description": "",
        "type": "communication"
      },
      {
        "time": "17:00",
        "title": "Restock + invoice",
        "description": "",
        "type": "break"
      }
    ],
    "stressEvents": [
      {
        "title": "Sewage backup at a restaurant",
        "description": "health inspector coming.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Plumber Week Project",
      "description": "Complete rough-in for 12 bathrooms in a hotel remodel."
    },
    "randomEventPool": [
      {
        "type": "call",
        "topic": "Emergency after-hours call",
        "urgency": "medium"
      },
      {
        "type": "message",
        "content": "Wrong parts delivered"
      },
      {
        "type": "message",
        "content": "Old pipe crumbles"
      }
    ]
  }
},

{
  "id": "hvac-technician",
  "title": "HVAC Technician",
  "emoji": "🌡️",
  "category": "Trades",
  "description": "HVAC techs install and service heating, cooling, ventilation, and refrigeration. It combines electrical, mechanical, and chemical knowledge. Demand grows with heat pumps and green retrofits.",
  "shortDescription": "Comfort is engineered.",
  "salaryRange": {
    "min": 45000,
    "max": 90000,
    "currency": "USD"
  },
  "educationYears": 1,
  "demandLevel": "high",
  "workStyle": "independent",
  "environment": "field",
  "colleagues": [
    {
      "id": "rafael-ortega",
      "name": "Rafael Ortega",
      "role": "Senior Tech",
      "avatar": "🧑‍💼",
      "personality": "master diagnostician.",
      "systemPrompt": "You are Rafael Ortega, Senior Tech. master diagnostician. Keep replies short and realistic."
    },
    {
      "id": "ella-park",
      "name": "Ella Park",
      "role": "Dispatcher",
      "avatar": "🧑‍💼",
      "personality": "keeps you on time.",
      "systemPrompt": "You are Ella Park, Dispatcher. keeps you on time. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Take apart an old window AC. Watch HVAC School YouTube. If you like puzzles + physical work in varied environments, keep exploring.",
    "youngAdult": "Enroll in a 6-24 month HVAC program at a community college or trade school. Get EPA 608 certification. Apprentice while working. NATE certification boosts pay."
  },
  "quickTrial": {
    "lecture": {
      "title": "What HVAC Technicians Really Do",
      "sections": [
        {
          "type": "text",
          "content": "You’re a technician, salesperson, and psychologist. Homeowners are scared of a $9K bill — how you explain it matters."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Just swap parts.",
          "reality": "Diagnostics take experience — pressure, temperature, airflow all interact."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "hv-ex1",
        "type": "decision",
        "title": "Restaurant walk-in freezer fails on July 4th",
        "description": "Restaurant walk-in freezer fails on July 4th — food loss ticking.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "hvte-d2",
        "type": "decision",
        "title": "HVAC Technician communication",
        "description": "A stakeholder is upset about an outcome related to your work as a hvac technician. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "hvte-d3",
        "type": "decision",
        "title": "HVAC Technician problem solving",
        "description": "You discover a flaw in your hvac technician work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "hvte-p1",
        "type": "prioritize",
        "title": "HVAC Technician priorities",
        "description": "You have four tasks competing for your attention as a hvac technician. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine hvac technician work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "07:30",
        "title": "Truck stock check",
        "description": "",
        "type": "task"
      },
      {
        "time": "08:00",
        "title": "Service calls (5-7/day)",
        "description": "",
        "type": "communication"
      },
      {
        "time": "12:00",
        "title": "Lunch on the road",
        "description": "",
        "type": "break"
      },
      {
        "time": "13:00",
        "title": "Install job",
        "description": "",
        "type": "task"
      },
      {
        "time": "16:00",
        "title": "Emergency AC out",
        "description": "",
        "type": "urgent"
      },
      {
        "time": "18:00",
        "title": "Wrap up notes",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Restaurant walk-in freezer fails on July 4th",
        "description": "food loss ticking.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "HVAC Technician Week Project",
      "description": "Install 4 heat-pump systems as part of a green retrofit."
    },
    "randomEventPool": [
      {
        "type": "call",
        "topic": "Heat wave — call volume triples",
        "urgency": "medium"
      },
      {
        "type": "message",
        "content": "Refrigerant leak"
      },
      {
        "type": "message",
        "content": "Repeat customer complaint"
      }
    ]
  }
},

{
  "id": "welder",
  "title": "Welder",
  "emoji": "🔥",
  "category": "Trades",
  "description": "Welders join metal parts using heat and precision — from pipelines to skyscrapers to art. Certified welders can travel and earn premium wages, especially in oil/gas, aerospace, and shipbuilding.",
  "shortDescription": "Fuse metal, build the world.",
  "salaryRange": {
    "min": 40000,
    "max": 120000,
    "currency": "USD"
  },
  "educationYears": 6,
  "demandLevel": "high",
  "workStyle": "independent",
  "environment": "field",
  "colleagues": [
    {
      "id": "buck-reilly",
      "name": "Buck Reilly",
      "role": "Foreman",
      "avatar": "🧑‍💼",
      "personality": "gruff, sharp eye for a bad bead.",
      "systemPrompt": "You are Buck Reilly, Foreman. gruff, sharp eye for a bad bead. Keep replies short and realistic."
    },
    {
      "id": "jenna-morales",
      "name": "Jenna Morales",
      "role": "Certified Welder",
      "avatar": "🔧",
      "personality": "perfectionist.",
      "systemPrompt": "You are Jenna Morales, Certified Welder. perfectionist. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Take a welding class in vocational high school. Try MIG welding at a maker space. If focus + steady hand + heat don’t scare you, this pays like a professional career.",
    "youngAdult": "Enroll in a welding certificate (6-24 months). Earn AWS certifications (D1.1, 6G, etc.). Travel + underwater + pipeline welding pay top dollar for the willing. Creative & Media (new)"
  },
  "quickTrial": {
    "lecture": {
      "title": "What Welders Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Your bead is a signature. Bad welds fail people. Certification exams (like 6G pipe) separate the top-earning welders from the rest."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Welding is easy manual work.",
          "reality": "Precision welding takes years to master and pays like an engineer."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "we-ex1",
        "type": "decision",
        "title": "Inspection fails your weld",
        "description": "Inspection fails your weld — you must cut it out and redo before deadline.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "we-d2",
        "type": "decision",
        "title": "Welder communication",
        "description": "A stakeholder is upset about an outcome related to your work as a welder. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "we-d3",
        "type": "decision",
        "title": "Welder problem solving",
        "description": "You discover a flaw in your welder work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "we-p1",
        "type": "prioritize",
        "title": "Welder priorities",
        "description": "You have four tasks competing for your attention as a welder. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine welder work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "06:30",
        "title": "Gear check",
        "description": "",
        "type": "task"
      },
      {
        "time": "07:00",
        "title": "Site brief",
        "description": "",
        "type": "field"
      },
      {
        "time": "07:30",
        "title": "Welding tasks",
        "description": "",
        "type": "task"
      },
      {
        "time": "12:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "12:30",
        "title": "More welds",
        "description": "",
        "type": "task"
      },
      {
        "time": "15:30",
        "title": "Grinding + cleanup",
        "description": "",
        "type": "task"
      },
      {
        "time": "16:00",
        "title": "Foreman review",
        "description": "",
        "type": "meeting"
      }
    ],
    "stressEvents": [
      {
        "title": "Inspection fails your weld",
        "description": "you must cut it out and redo before deadline.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Welder Week Project",
      "description": "Complete critical welds on a pressure vessel with X-ray inspection."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Certification renewal"
      },
      {
        "type": "message",
        "content": "Overtime windfall"
      },
      {
        "type": "message",
        "content": "Injury on site"
      }
    ]
  }
},

{
  "id": "graphic-designer",
  "title": "Graphic Designer",
  "emoji": "✏️",
  "category": "Creative",
  "description": "Graphic designers create logos, layouts, packaging, digital ads, and brand identities. It’s a career for people who love typography, color, and telling stories visually. AI tools shift the field — human taste + concept still win.",
  "shortDescription": "Turn words and ideas into visuals people remember.",
  "salaryRange": {
    "min": 40000,
    "max": 90000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "medium",
  "workStyle": "independent",
  "environment": "office",
  "colleagues": [
    {
      "id": "jules-marchetti",
      "name": "Jules Marchetti",
      "role": "Art Director",
      "avatar": "👨‍💼",
      "personality": "sharp taste, tough critique.",
      "systemPrompt": "You are Jules Marchetti, Art Director. sharp taste, tough critique. Keep replies short and realistic."
    },
    {
      "id": "sana-ali",
      "name": "Sana Ali",
      "role": "Copywriter",
      "avatar": "✍️",
      "personality": "word partner.",
      "systemPrompt": "You are Sana Ali, Copywriter. word partner. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Redesign your favorite brand’s logo. Post on Behance / Dribbble. Take one free Canva or Adobe course. Study logos on grocery packages — the good ones are unforgettable.",
    "youngAdult": "Design bachelor’s or intensive bootcamp (Shillington, RMIT online). Portfolio of 5-8 strong projects beats degree. Freelance from junior year — real clients teach faster than school."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Graphic Designers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Concept beats craft, but craft closes deals. Feedback is not personal. Iterate until you stop hating your own work — then iterate 3 more times."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Anyone with Canva is a designer.",
          "reality": "Real designers solve visual problems, not just decorate."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "gr-ex1",
        "type": "decision",
        "title": "Client picks the worst option",
        "description": "Client picks the worst option — negotiate them into the right one.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "grde-d2",
        "type": "decision",
        "title": "Graphic Designer communication",
        "description": "A stakeholder is upset about an outcome related to your work as a graphic designer. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "grde-d3",
        "type": "decision",
        "title": "Graphic Designer problem solving",
        "description": "You discover a flaw in your graphic designer work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "grde-p1",
        "type": "prioritize",
        "title": "Graphic Designer priorities",
        "description": "You have four tasks competing for your attention as a graphic designer. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine graphic designer work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "09:00",
        "title": "Coffee + inspiration",
        "description": "",
        "type": "task"
      },
      {
        "time": "09:30",
        "title": "Concept sketching",
        "description": "",
        "type": "design"
      },
      {
        "time": "11:00",
        "title": "Client feedback round",
        "description": "",
        "type": "communication"
      },
      {
        "time": "13:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "Adobe / Figma polish",
        "description": "",
        "type": "task"
      },
      {
        "time": "16:00",
        "title": "Present revisions",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Client picks the worst option",
        "description": "negotiate them into the right one.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Graphic Designer Week Project",
      "description": "Deliver a full brand identity kit: logo, colors, type, guidelines."
    },
    "randomEventPool": [
      {
        "type": "deadline",
        "title": "Print deadline",
        "hoursRemaining": 2
      },
      {
        "type": "message",
        "content": "Client ghosts"
      },
      {
        "type": "deadline",
        "title": "Awards deadline",
        "hoursRemaining": 2
      }
    ]
  }
},

{
  "id": "video-editor",
  "title": "Video Editor",
  "emoji": "🎬",
  "category": "Creative",
  "description": "Video editors shape raw footage into films, shows, YouTube videos, ads, and social content. Editing is invisible when it’s great — pace, rhythm, emotion. YouTube and TikTok have created massive freelance demand.",
  "shortDescription": "Story lives in the cuts.",
  "salaryRange": {
    "min": 40000,
    "max": 110000,
    "currency": "USD"
  },
  "educationYears": 2,
  "demandLevel": "high",
  "workStyle": "independent",
  "environment": "office",
  "colleagues": [
    {
      "id": "priya-menon",
      "name": "Priya Menon",
      "role": "Post-Production Supervisor",
      "avatar": "📣",
      "personality": "keeps projects on rails.",
      "systemPrompt": "You are Priya Menon, Post-Production Supervisor. keeps projects on rails. Keep replies short and realistic."
    },
    {
      "id": "blake-turner",
      "name": "Blake Turner",
      "role": "Colorist",
      "avatar": "🧑‍💼",
      "personality": "makes footage sing.",
      "systemPrompt": "You are Blake Turner, Colorist. makes footage sing. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Start a YouTube channel about anything you love. Edit weekly using free DaVinci Resolve. Study how movies cut — pause on transitions and ask why.",
    "youngAdult": "Certificate or self-taught + portfolio. Assistant editor jobs in production companies teach the fastest. Freelance side gigs on Upwork/Fiverr while learning."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Video Editors Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Two-thirds of great editing is knowing what to cut. Nail the story first, then polish sound and color. Deadlines beat perfection."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Editing = pushing buttons.",
          "reality": "It’s pacing, story, sound design, and psychology of attention."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "vi-ex1",
        "type": "decision",
        "title": "Client wants a fundamental restructure 2 hours before delivery",
        "description": "Client wants a fundamental restructure 2 hours before delivery.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "vied-d2",
        "type": "decision",
        "title": "Video Editor communication",
        "description": "A stakeholder is upset about an outcome related to your work as a video editor. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "vied-d3",
        "type": "decision",
        "title": "Video Editor problem solving",
        "description": "You discover a flaw in your video editor work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "vied-p1",
        "type": "prioritize",
        "title": "Video Editor priorities",
        "description": "You have four tasks competing for your attention as a video editor. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine video editor work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "09:30",
        "title": "Coffee + email",
        "description": "",
        "type": "inbox"
      },
      {
        "time": "10:00",
        "title": "Rough cut",
        "description": "",
        "type": "task"
      },
      {
        "time": "12:30",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "13:30",
        "title": "Fine cut",
        "description": "",
        "type": "task"
      },
      {
        "time": "15:00",
        "title": "Client review",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "16:30",
        "title": "Revisions",
        "description": "",
        "type": "task"
      },
      {
        "time": "18:00",
        "title": "Export + backup",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Client wants a fundamental restructure 2 hours before delivery",
        "description": "Client wants a fundamental restructure 2 hours before delivery.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Video Editor Week Project",
      "description": "Cut a 3-min brand film with 4 revision rounds."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Hard drive dies"
      },
      {
        "type": "message",
        "content": "Client changes music"
      },
      {
        "type": "deadline",
        "title": "Award submission deadline",
        "hoursRemaining": 2
      }
    ]
  }
},

{
  "id": "journalist",
  "title": "Journalist",
  "emoji": "📰",
  "category": "Creative",
  "description": "Journalists research, investigate, and report on events — from local news to international politics. Digital transformation reshaped the field: fewer staff jobs, more independent / newsletter work. Verifying facts remains the core skill.",
  "shortDescription": "Truth-teller in a noisy world.",
  "salaryRange": {
    "min": 35000,
    "max": 110000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "medium",
  "workStyle": "independent",
  "environment": "field",
  "colleagues": [
    {
      "id": "diane-marks",
      "name": "Diane Marks",
      "role": "Editor",
      "avatar": "🧑‍💼",
      "personality": "sharp, tough, kind.",
      "systemPrompt": "You are Diane Marks, Editor. sharp, tough, kind. Keep replies short and realistic."
    },
    {
      "id": "zaid-rahman",
      "name": "Zaid Rahman",
      "role": "Photojournalist",
      "avatar": "✍️",
      "personality": "eyes for the moment.",
      "systemPrompt": "You are Zaid Rahman, Photojournalist. eyes for the moment. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Start a school paper or Substack. Interview a family member and write it up. Read a broad set of outlets. Learn to ask ‘how do you know?’ about everything.",
    "youngAdult": "Journalism degree helps but portfolio is king. Freelance, blog, cover local elections. Internships at wire services (AP, Reuters). Fellowship programs (Report for America) fund entry-level work."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Journalists Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Get the story right, then get it fast. Your name is your credibility — a bad byline is expensive."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Journalists just write.",
          "reality": "You interview, verify, negotiate access, and handle legal risk."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "jo-ex1",
        "type": "decision",
        "title": "Breaking story",
        "description": "Breaking story — 90 minutes to publication, 2 sources needed.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "jo-d2",
        "type": "decision",
        "title": "Journalist communication",
        "description": "A stakeholder is upset about an outcome related to your work as a journalist. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "jo-d3",
        "type": "decision",
        "title": "Journalist problem solving",
        "description": "You discover a flaw in your journalist work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "jo-p1",
        "type": "prioritize",
        "title": "Journalist priorities",
        "description": "You have four tasks competing for your attention as a journalist. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine journalist work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:00",
        "title": "News check + pitch",
        "description": "",
        "type": "task"
      },
      {
        "time": "09:30",
        "title": "Interviews",
        "description": "",
        "type": "task"
      },
      {
        "time": "12:00",
        "title": "Lunch on the go",
        "description": "",
        "type": "break"
      },
      {
        "time": "13:00",
        "title": "Write / edit",
        "description": "",
        "type": "task"
      },
      {
        "time": "15:00",
        "title": "Fact-check round",
        "description": "",
        "type": "task"
      },
      {
        "time": "17:00",
        "title": "Publish + promote",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Breaking story",
        "description": "90 minutes to publication, 2 sources needed.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Journalist Week Project",
      "description": "File 3 features + break one investigative piece."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Source ghosts"
      },
      {
        "type": "message",
        "content": "Legal review"
      },
      {
        "type": "message",
        "content": "Story gets scooped"
      }
    ]
  }
},

{
  "id": "musician-composer",
  "title": "Musician / Composer",
  "emoji": "🎵",
  "category": "Creative",
  "description": "Musicians and composers write, record, and perform music. The path splits: performers (live/tour), studio musicians (session), and composers (film, games, ads, artists). All rely on craft, network, and hustle. Streaming pays little; syncs, live, and licensing pay well.",
  "shortDescription": "Move people through sound.",
  "salaryRange": {
    "min": 25000,
    "max": 200000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "independent",
  "environment": "office",
  "colleagues": [
    {
      "id": "elias-srensen",
      "name": "Elias Sørensen",
      "role": "Studio Producer",
      "avatar": "📣",
      "personality": "tastemaker, gatekeeper.",
      "systemPrompt": "You are Elias Sørensen, Studio Producer. tastemaker, gatekeeper. Keep replies short and realistic."
    },
    {
      "id": "mira-ojo",
      "name": "Mira Ojo",
      "role": "Booking Agent",
      "avatar": "🏠",
      "personality": "relationship-driven pro.",
      "systemPrompt": "You are Mira Ojo, Booking Agent. relationship-driven pro. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Practice daily, upload weekly. Learn one instrument seriously and one production tool (GarageBand, FL Studio, BandLab). Perform anywhere — school, church, open mic.",
    "youngAdult": "Conservatory, university music program, or self-taught + portfolio. Multiple revenue streams matter: gigs + teaching + syncs + streaming + merch. Nashville, LA, NYC, Berlin, and remote all viable now. Public Service & Law (new)"
  },
  "quickTrial": {
    "lecture": {
      "title": "What Musician / Composers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Talent gets a foot in the door. Consistency and reliability keep it open. Business skills separate the working musicians from the hobbyists."
        },
        {
          "type": "myth-vs-reality",
          "myth": "You just make music you love.",
          "reality": "You also negotiate contracts, market, teach, and hustle daily."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "mu-ex1",
        "type": "decision",
        "title": "Two gigs booked same night",
        "description": "Two gigs booked same night — negotiate a swap without burning bridges.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "muco-d2",
        "type": "decision",
        "title": "Musician / Composer communication",
        "description": "A stakeholder is upset about an outcome related to your work as a musician / composer. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "muco-d3",
        "type": "decision",
        "title": "Musician / Composer problem solving",
        "description": "You discover a flaw in your musician / composer work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "muco-p1",
        "type": "prioritize",
        "title": "Musician / Composer priorities",
        "description": "You have four tasks competing for your attention as a musician / composer. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine musician / composer work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "09:00",
        "title": "Practice / technique",
        "description": "",
        "type": "task"
      },
      {
        "time": "11:00",
        "title": "Writing session",
        "description": "",
        "type": "task"
      },
      {
        "time": "13:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "Studio session or lesson",
        "description": "",
        "type": "teaching"
      },
      {
        "time": "17:00",
        "title": "Admin / bookings",
        "description": "",
        "type": "task"
      },
      {
        "time": "20:00",
        "title": "Gig prep",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Two gigs booked same night",
        "description": "negotiate a swap without burning bridges.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Musician / Composer Week Project",
      "description": "Deliver a demo album + play 3 shows."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Producer requests changes"
      },
      {
        "type": "message",
        "content": "Sync opportunity"
      },
      {
        "type": "message",
        "content": "Streaming payout day"
      }
    ]
  }
},

{
  "id": "police-officer",
  "title": "Police Officer",
  "emoji": "👮",
  "category": "Public Service",
  "description": "Police officers respond to emergencies, investigate crimes, and maintain public safety. Modern policing emphasizes community trust, de-escalation, and mental-health response. It’s a highly demanding career with real weight.",
  "shortDescription": "Serve, protect, de-escalate.",
  "salaryRange": {
    "min": 45000,
    "max": 110000,
    "currency": "USD"
  },
  "educationYears": 2,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "field",
  "colleagues": [
    {
      "id": "sgt-alicia-grant",
      "name": "Sgt. Alicia Grant",
      "role": "Patrol Supervisor",
      "avatar": "🧑‍💼",
      "personality": "tough, fair.",
      "systemPrompt": "You are Sgt. Alicia Grant, Patrol Supervisor. tough, fair. Keep replies short and realistic."
    },
    {
      "id": "deputy-rob-nash",
      "name": "Deputy Rob Nash",
      "role": "Community Liaison",
      "avatar": "🧑‍💼",
      "personality": "neighborhood friend.",
      "systemPrompt": "You are Deputy Rob Nash, Community Liaison. neighborhood friend. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Ride-along with local police (many programs allow 16+). Explorer Programs teach basics. Volunteer at community events. Take psychology + Spanish/another language.",
    "youngAdult": "Academy training (6-9 months) is paid. Some agencies require 60 college credits or a degree. Fitness + clean background required. Consider specialized units after 3-5 years."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Police Officers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "You show up on the worst day of a stranger’s life, every day. De-escalation is the top skill. Paperwork is more of the job than TV shows."
        },
        {
          "type": "myth-vs-reality",
          "myth": "It’s all car chases.",
          "reality": "Most shifts are calls for service, reports, and community contact."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "po-ex1",
        "type": "decision",
        "title": "Domestic dispute",
        "description": "Domestic dispute — multiple parties, safety first, no clear facts.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "poof-d2",
        "type": "decision",
        "title": "Police Officer communication",
        "description": "A stakeholder is upset about an outcome related to your work as a police officer. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "poof-d3",
        "type": "decision",
        "title": "Police Officer problem solving",
        "description": "You discover a flaw in your police officer work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "poof-p1",
        "type": "prioritize",
        "title": "Police Officer priorities",
        "description": "You have four tasks competing for your attention as a police officer. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine police officer work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "06:30",
        "title": "Roll call",
        "description": "",
        "type": "communication"
      },
      {
        "time": "07:00",
        "title": "Patrol",
        "description": "",
        "type": "task"
      },
      {
        "time": "09:00",
        "title": "Traffic accident response",
        "description": "",
        "type": "task"
      },
      {
        "time": "11:00",
        "title": "Report writing",
        "description": "",
        "type": "task"
      },
      {
        "time": "13:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "Community walk",
        "description": "",
        "type": "task"
      },
      {
        "time": "15:30",
        "title": "Warrant service",
        "description": "",
        "type": "task"
      },
      {
        "time": "17:00",
        "title": "End of shift",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Domestic dispute",
        "description": "multiple parties, safety first, no clear facts.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Police Officer Week Project",
      "description": "Investigate a string of burglaries with detectives."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Foot pursuit"
      },
      {
        "type": "message",
        "content": "Court testimony"
      },
      {
        "type": "message",
        "content": "School career day"
      }
    ]
  }
},

{
  "id": "firefighter",
  "title": "Firefighter",
  "emoji": "🚒",
  "category": "Public Service",
  "description": "Firefighters respond to fires, medical emergencies, rescues, and hazmat events. Most calls are actually EMS, not fires. It’s a team-based career with strong pension benefits and a real family culture.",
  "shortDescription": "Run toward what everyone runs from.",
  "salaryRange": {
    "min": 45000,
    "max": 100000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "field",
  "colleagues": [
    {
      "id": "captain-toms-vega",
      "name": "Captain Tomás Vega",
      "role": "Company Captain",
      "avatar": "🧑‍💼",
      "personality": "mentor, cool under fire.",
      "systemPrompt": "You are Captain Tomás Vega, Company Captain. mentor, cool under fire. Keep replies short and realistic."
    },
    {
      "id": "ff-danielle-kim",
      "name": "FF Danielle Kim",
      "role": "Paramedic",
      "avatar": "🧑‍💼",
      "personality": "medic + firefighter dual role.",
      "systemPrompt": "You are FF Danielle Kim, Paramedic. medic + firefighter dual role. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Fitness matters — start running + weightlifting. Volunteer with a rural / volunteer fire department at 16-18. Take First Aid + CPR. Learn to swim strongly.",
    "youngAdult": "EMT certification first. Then fire academy (16-24 weeks). Departments hire aggressively — expect competitive tests + interviews. Paramedic training doubles your options."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Firefighters Really Do",
      "sections": [
        {
          "type": "text",
          "content": "70% of calls are medical, not fires. Physical fitness is non-negotiable. Trust in your crew is life-and-death — literally."
        },
        {
          "type": "myth-vs-reality",
          "myth": "It’s all fighting fires.",
          "reality": "It’s medical calls, prevention, drills, cooking dinner as a family."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "fi-ex1",
        "type": "decision",
        "title": "Structure fire",
        "description": "Structure fire — victim trapped upstairs.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "fi-d2",
        "type": "decision",
        "title": "Firefighter communication",
        "description": "A stakeholder is upset about an outcome related to your work as a firefighter. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "fi-d3",
        "type": "decision",
        "title": "Firefighter problem solving",
        "description": "You discover a flaw in your firefighter work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "fi-p1",
        "type": "prioritize",
        "title": "Firefighter priorities",
        "description": "You have four tasks competing for your attention as a firefighter. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine firefighter work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "07:00",
        "title": "Shift start + rig check",
        "description": "",
        "type": "task"
      },
      {
        "time": "08:00",
        "title": "Drills / training",
        "description": "",
        "type": "task"
      },
      {
        "time": "11:00",
        "title": "Medical call",
        "description": "",
        "type": "communication"
      },
      {
        "time": "13:00",
        "title": "Firehouse lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "School visit",
        "description": "",
        "type": "field"
      },
      {
        "time": "16:00",
        "title": "Fire call",
        "description": "",
        "type": "communication"
      }
    ],
    "stressEvents": [
      {
        "title": "Structure fire",
        "description": "victim trapped upstairs.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Firefighter Week Project",
      "description": "Complete 48-hour shifts × 2 with a full complement of drills and calls."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Wildland deployment"
      },
      {
        "type": "message",
        "content": "Mass-casualty incident"
      },
      {
        "type": "message",
        "content": "Recruit training day"
      }
    ]
  }
},

{
  "id": "social-worker",
  "title": "Social Worker",
  "emoji": "🤲",
  "category": "Public Service",
  "description": "Social workers help people access resources, cope with crises, and advocate through complex bureaucracies. Fields include child welfare, mental health, medical, school, and community organizing. High emotional load, high mission.",
  "shortDescription": "Help people navigate the systems.",
  "salaryRange": {
    "min": 45000,
    "max": 80000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "independent",
  "environment": "office",
  "colleagues": [
    {
      "id": "marta-delgado",
      "name": "Marta Delgado",
      "role": "Clinical Supervisor",
      "avatar": "🧑‍💼",
      "personality": "seasoned, wise, protects new workers from burnout.",
      "systemPrompt": "You are Marta Delgado, Clinical Supervisor. seasoned, wise, protects new workers from burnout. Keep replies short and realistic."
    },
    {
      "id": "kevin-orourke",
      "name": "Kevin O'Rourke",
      "role": "Case Worker Peer",
      "avatar": "🧑‍💼",
      "personality": "tireless advocate.",
      "systemPrompt": "You are Kevin O'Rourke, Case Worker Peer. tireless advocate. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Volunteer with a food bank, shelter, or crisis line. Take a peer-support training. Watch documentaries on foster care and homelessness. If you can hear painful stories without shutting down, you have the temperament.",
    "youngAdult": "BSW gives entry roles; MSW + license (LCSW) required for clinical work. Fieldwork placements are intense - lean on peers. Loan-forgiveness programs exist for public-service work."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Social Workers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Caseloads are big, resources thin, wins slow. You matter enormously to a small number of people. Self-care is a job requirement."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Social workers just take kids away.",
          "reality": "They also keep families together, secure housing, and get people into treatment."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "so-ex1",
        "type": "decision",
        "title": "A child is at risk - decide within 4 hours whether to remove",
        "description": "A child is at risk - decide within 4 hours whether to remove.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "sowo-d2",
        "type": "decision",
        "title": "Social Worker communication",
        "description": "A stakeholder is upset about an outcome related to your work as a social worker. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "sowo-d3",
        "type": "decision",
        "title": "Social Worker problem solving",
        "description": "You discover a flaw in your social worker work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "sowo-p1",
        "type": "prioritize",
        "title": "Social Worker priorities",
        "description": "You have four tasks competing for your attention as a social worker. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine social worker work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:30",
        "title": "Case notes",
        "description": "",
        "type": "task"
      },
      {
        "time": "09:30",
        "title": "Home visit",
        "description": "",
        "type": "field"
      },
      {
        "time": "11:30",
        "title": "Court hearing",
        "description": "",
        "type": "task"
      },
      {
        "time": "12:30",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "13:30",
        "title": "Client sessions",
        "description": "",
        "type": "communication"
      },
      {
        "time": "15:30",
        "title": "Multi-agency call",
        "description": "",
        "type": "communication"
      },
      {
        "time": "17:00",
        "title": "Documentation",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "A child is at risk - decide within 4 hours whether to remove",
        "description": "A child is at risk - decide within 4 hours whether to remove.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Social Worker Week Project",
      "description": "Manage 25 active cases and complete 3 investigations."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Court subpoena"
      },
      {
        "type": "message",
        "content": "Missing client"
      },
      {
        "type": "message",
        "content": "New crisis intake"
      }
    ]
  }
},

{
  "id": "diplomat-foreign-service-officer",
  "title": "Diplomat / Foreign Service Officer",
  "emoji": "🌐",
  "category": "Public Service",
  "description": "Diplomats work in embassies and consulates advancing their country's interests: political reporting, trade, visas, crisis response. Postings rotate every 2-4 years, so language skills and adaptability are core.",
  "shortDescription": "Represent your country to the world.",
  "salaryRange": {
    "min": 60000,
    "max": 150000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "office",
  "colleagues": [
    {
      "id": "ambassador-chen",
      "name": "Ambassador Chen",
      "role": "Chief of Mission",
      "avatar": "🧑‍💼",
      "personality": "strategic, senior statesperson.",
      "systemPrompt": "You are Ambassador Chen, Chief of Mission. strategic, senior statesperson. Keep replies short and realistic."
    },
    {
      "id": "consul-aisha-rahman",
      "name": "Consul Aisha Rahman",
      "role": "Consular Officer",
      "avatar": "👮",
      "personality": "manages visas, citizens in crisis.",
      "systemPrompt": "You are Consul Aisha Rahman, Consular Officer. manages visas, citizens in crisis. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Learn one language deeply (not just Duolingo streaks). Follow one country's news for 6 months. Model UN. Read Foreign Policy magazine.",
    "youngAdult": "Any major - pass the Foreign Service Exam (or your country's equivalent). Fluency in a hard language is a huge edge. Overseas study, Peace Corps, or NGO work makes competitive applications. Hospitality & Service (new)"
  },
  "quickTrial": {
    "lecture": {
      "title": "What Diplomat / Foreign Service Officers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "You are the face of your country - dress code, protocol, and discretion matter. You will move every 2-4 years and your family moves with you."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Cocktail parties all day.",
          "reality": "Long hours on cables, crisis calls at 3am, and hardship posts."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "di-ex1",
        "type": "decision",
        "title": "Citizen arrested abroad - navigate legal + political minefield",
        "description": "Citizen arrested abroad - navigate legal + political minefield.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "difo-d2",
        "type": "decision",
        "title": "Diplomat / Foreign Service Officer communication",
        "description": "A stakeholder is upset about an outcome related to your work as a diplomat / foreign service officer. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "difo-d3",
        "type": "decision",
        "title": "Diplomat / Foreign Service Officer problem solving",
        "description": "You discover a flaw in your diplomat / foreign service officer work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "difo-p1",
        "type": "prioritize",
        "title": "Diplomat / Foreign Service Officer priorities",
        "description": "You have four tasks competing for your attention as a diplomat / foreign service officer. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine diplomat / foreign service officer work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "07:30",
        "title": "Cable reading",
        "description": "",
        "type": "task"
      },
      {
        "time": "09:00",
        "title": "Political meeting",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "11:00",
        "title": "Report drafting",
        "description": "",
        "type": "design"
      },
      {
        "time": "13:00",
        "title": "Working lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "Consular case",
        "description": "",
        "type": "task"
      },
      {
        "time": "16:00",
        "title": "Cultural event prep",
        "description": "",
        "type": "task"
      },
      {
        "time": "19:00",
        "title": "Reception",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Citizen arrested abroad - navigate legal + political minefield",
        "description": "Citizen arrested abroad - navigate legal + political minefield.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Diplomat / Foreign Service Officer Week Project",
      "description": "Coordinate a visit by a senior government official."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Coup or unrest at post"
      },
      {
        "type": "message",
        "content": "VIP visitor"
      },
      {
        "type": "message",
        "content": "Visa fraud investigation"
      }
    ]
  }
},

{
  "id": "chef",
  "title": "Chef",
  "emoji": "👨‍🍳",
  "category": "Hospitality",
  "description": "Chefs plan menus, cook, and lead kitchen teams. It is physical, hot, fast, and hierarchical - and deeply creative. Restaurant work is famously grueling; catering, private, and hotel roles can be gentler.",
  "shortDescription": "Turn ingredients into experiences.",
  "salaryRange": {
    "min": 35000,
    "max": 120000,
    "currency": "USD"
  },
  "educationYears": 1,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "field",
  "colleagues": [
    {
      "id": "chef-marco-bianchi",
      "name": "Chef Marco Bianchi",
      "role": "Executive Chef",
      "avatar": "👨‍🍳",
      "personality": "intense, exacting, generous.",
      "systemPrompt": "You are Chef Marco Bianchi, Executive Chef. intense, exacting, generous. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Cook family dinner one night a week - full menu, real plating. Get a busboy or dishwasher job at 15-16 to see kitchen culture. Watch Chef's Table + The Bear.",
    "youngAdult": "Culinary school helps but staging (unpaid trial shifts) in great kitchens teaches more. Expect low pay + long hours early. Location matters - big food cities pay and teach better."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Chefs Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Speed + consistency + cleanliness = a good cook. Creativity is the ceiling, not the floor. Kitchens are ranked - respect it and rise."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Chefs invent dishes all day.",
          "reality": "Most cook the same items 100 times per shift with rigorous precision."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "ch-ex1",
        "type": "decision",
        "title": "Sold-out dinner service, 3 line cooks call out",
        "description": "Sold-out dinner service, 3 line cooks call out.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "ch-d2",
        "type": "decision",
        "title": "Chef communication",
        "description": "A stakeholder is upset about an outcome related to your work as a chef. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "ch-d3",
        "type": "decision",
        "title": "Chef problem solving",
        "description": "You discover a flaw in your chef work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "ch-p1",
        "type": "prioritize",
        "title": "Chef priorities",
        "description": "You have four tasks competing for your attention as a chef. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine chef work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "10:00",
        "title": "Prep list",
        "description": "",
        "type": "task"
      },
      {
        "time": "11:00",
        "title": "Mise en place",
        "description": "",
        "type": "task"
      },
      {
        "time": "12:00",
        "title": "Lunch service",
        "description": "",
        "type": "break"
      },
      {
        "time": "15:00",
        "title": "Break + menu R&D;",
        "description": "",
        "type": "break"
      },
      {
        "time": "16:00",
        "title": "Dinner prep",
        "description": "",
        "type": "task"
      },
      {
        "time": "18:00",
        "title": "Dinner service",
        "description": "",
        "type": "task"
      },
      {
        "time": "23:00",
        "title": "Close down",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Sold-out dinner service, 3 line cooks call out",
        "description": "Sold-out dinner service, 3 line cooks call out.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Chef Week Project",
      "description": "Launch a seasonal menu and hit food-cost targets."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Health inspection"
      },
      {
        "type": "message",
        "content": "VIP guest"
      },
      {
        "type": "message",
        "content": "Freezer breakdown"
      }
    ]
  }
},

{
  "id": "hotel-manager",
  "title": "Hotel Manager",
  "emoji": "🏨",
  "category": "Hospitality",
  "description": "Hotel managers oversee operations, guest experience, staff, finance, and marketing. Big brand hotels have specialized paths (revenue mgmt, F&B;, front office); boutique hotels reward generalists.",
  "shortDescription": "Every guest has a story - make it a good one.",
  "salaryRange": {
    "min": 55000,
    "max": 130000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "medium",
  "workStyle": "collaborative",
  "environment": "office",
  "colleagues": [
    {
      "id": "directrice-camille-laurent",
      "name": "Directrice Camille Laurent",
      "role": "GM",
      "avatar": "🧑‍💼",
      "personality": "gracious, decisive.",
      "systemPrompt": "You are Directrice Camille Laurent, GM. gracious, decisive. Keep replies short and realistic."
    },
    {
      "id": "rev",
      "name": "Rev",
      "role": "Mgr Priya Nair - revenue lead",
      "avatar": "👨‍💼",
      "personality": "pricing wizard.",
      "systemPrompt": "You are Rev, Mgr Priya Nair - revenue lead. pricing wizard. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Get a front-desk job at a small hotel. Travel and observe how good hotels differ from bad ones. Take a customer-service class.",
    "youngAdult": "Hospitality degree or business + hotel internships. Big brands (Marriott, Hyatt) have management trainee programs. Move properties every 2-3 years early on for fastest promotion. Science & Environment (new)"
  },
  "quickTrial": {
    "lecture": {
      "title": "What Hotel Managers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Service is invisible when it's excellent. You solve problems your guests never see. Culture of the team = experience of the guest."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Just checking guests in.",
          "reality": "You handle everything from lost passports to power outages to VIP funerals."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "ho-ex1",
        "type": "decision",
        "title": "Power fails at 8pm - 300 guests, 200 unchecked, dinner service running",
        "description": "Power fails at 8pm - 300 guests, 200 unchecked, dinner service running.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "homa-d2",
        "type": "decision",
        "title": "Hotel Manager communication",
        "description": "A stakeholder is upset about an outcome related to your work as a hotel manager. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "homa-d3",
        "type": "decision",
        "title": "Hotel Manager problem solving",
        "description": "You discover a flaw in your hotel manager work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "homa-p1",
        "type": "prioritize",
        "title": "Hotel Manager priorities",
        "description": "You have four tasks competing for your attention as a hotel manager. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine hotel manager work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:00",
        "title": "Morning briefing",
        "description": "",
        "type": "task"
      },
      {
        "time": "09:00",
        "title": "Guest issues",
        "description": "",
        "type": "task"
      },
      {
        "time": "11:00",
        "title": "Revenue call",
        "description": "",
        "type": "communication"
      },
      {
        "time": "13:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "Staff walk",
        "description": "",
        "type": "task"
      },
      {
        "time": "15:30",
        "title": "Marketing meeting",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "17:00",
        "title": "VIP arrival greet",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Power fails at 8pm - 300 guests, 200 unchecked, dinner service running",
        "description": "Power fails at 8pm - 300 guests, 200 unchecked, dinner service running.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Hotel Manager Week Project",
      "description": "Host a wedding for 200 while maintaining regular occupancy."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Bad review viral"
      },
      {
        "type": "message",
        "content": "Overbooking"
      },
      {
        "type": "message",
        "content": "Big group check-in"
      }
    ]
  }
},

{
  "id": "environmental-scientist",
  "title": "Environmental Scientist",
  "emoji": "🌱",
  "category": "Science",
  "description": "Environmental scientists study air, water, soil, ecosystems, and climate. They work for governments, consultancies, NGOs, and companies - measuring impact, ensuring compliance, guiding restoration.",
  "shortDescription": "Understand nature, protect the future.",
  "salaryRange": {
    "min": 55000,
    "max": 110000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "mixed",
  "environment": "field",
  "colleagues": [
    {
      "id": "dr-rin-nakamura",
      "name": "Dr. Rin Nakamura",
      "role": "Senior Ecologist",
      "avatar": "🧑‍💼",
      "personality": "gentle, encyclopedic.",
      "systemPrompt": "You are Dr. Rin Nakamura, Senior Ecologist. gentle, encyclopedic. Keep replies short and realistic."
    },
    {
      "id": "kai-muranga",
      "name": "Kai Muranga",
      "role": "Field Technician",
      "avatar": "🧑‍💼",
      "personality": "rugged, wise about weather.",
      "systemPrompt": "You are Kai Muranga, Field Technician. rugged, wise about weather. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Volunteer for stream cleanups, tree plantings, park counts. Learn a plant / bird identification app. Grow something. If long days outside energize you, this fits.",
    "youngAdult": "Env sci / bio / geology bachelor. Fieldwork internships are essential. Master's helps for research + consulting senior roles. GIS + statistics are power skills."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Environmental Scientists Really Do",
      "sections": [
        {
          "type": "text",
          "content": "You measure, model, and mitigate. Data honestly presented is your gift to the future. Politics touches every finding - communicate carefully."
        },
        {
          "type": "myth-vs-reality",
          "myth": "You hike all day.",
          "reality": "You spend as much time on reports and permits as in the field."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "en-ex1",
        "type": "decision",
        "title": "Spill site - team must sample fast while conditions change",
        "description": "Spill site - team must sample fast while conditions change.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "ensc-d2",
        "type": "decision",
        "title": "Environmental Scientist communication",
        "description": "A stakeholder is upset about an outcome related to your work as a environmental scientist. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "ensc-d3",
        "type": "decision",
        "title": "Environmental Scientist problem solving",
        "description": "You discover a flaw in your environmental scientist work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "ensc-p1",
        "type": "prioritize",
        "title": "Environmental Scientist priorities",
        "description": "You have four tasks competing for your attention as a environmental scientist. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Experiment showing dangerous anomaly",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Peer review deadline tomorrow",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Clean and organize lab bench",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Update literature notes",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:00",
        "title": "Field prep",
        "description": "",
        "type": "field"
      },
      {
        "time": "09:00",
        "title": "Site sampling",
        "description": "",
        "type": "field"
      },
      {
        "time": "12:00",
        "title": "Lunch outdoors",
        "description": "",
        "type": "break"
      },
      {
        "time": "13:00",
        "title": "Return + log samples",
        "description": "",
        "type": "task"
      },
      {
        "time": "14:30",
        "title": "Report writing",
        "description": "",
        "type": "task"
      },
      {
        "time": "16:00",
        "title": "Client call",
        "description": "",
        "type": "communication"
      }
    ],
    "stressEvents": [
      {
        "title": "Spill site - team must sample fast while conditions change",
        "description": "Spill site - team must sample fast while conditions change.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Environmental Scientist Week Project",
      "description": "Complete a wetlands delineation and permit report."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Regulator questions"
      },
      {
        "type": "message",
        "content": "Weather delay"
      },
      {
        "type": "message",
        "content": "Species of concern found"
      }
    ]
  }
},

{
  "id": "meteorologist",
  "title": "Meteorologist",
  "emoji": "🌦️",
  "category": "Science",
  "description": "Meteorologists forecast weather and study climate, working for governments, TV, aviation, and private industry. Modeling, data analysis, and clear communication are the daily crafts.",
  "shortDescription": "Read the sky, warn the world.",
  "salaryRange": {
    "min": 55000,
    "max": 115000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "medium",
  "workStyle": "independent",
  "environment": "office",
  "colleagues": [
    {
      "id": "dr-elena-petrov",
      "name": "Dr. Elena Petrov",
      "role": "Chief Meteorologist",
      "avatar": "🧑‍💼",
      "personality": "sharp, camera-ready.",
      "systemPrompt": "You are Dr. Elena Petrov, Chief Meteorologist. sharp, camera-ready. Keep replies short and realistic."
    },
    {
      "id": "sam-reeves",
      "name": "Sam Reeves",
      "role": "IT/Modeling Lead",
      "avatar": "👨‍💼",
      "personality": "keeps the models running.",
      "systemPrompt": "You are Sam Reeves, IT/Modeling Lead. keeps the models running. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Track your local weather on paper for 30 days. Join AMS student chapter online. Try a free introductory course from MetEd. Learn Python early.",
    "youngAdult": "Atmospheric science degree with heavy calc + physics. NWS internships + broadcast Comm degrees (dual major) for TV. AMS Certified Broadcast Meteorologist seal boosts credibility. Sports, Wellness & Lifestyle (new)"
  },
  "quickTrial": {
    "lecture": {
      "title": "What Meteorologists Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Uncertainty is the product. A great forecaster explains probability without scaring or reassuring falsely."
        },
        {
          "type": "myth-vs-reality",
          "myth": "It's just reading a script.",
          "reality": "TV mets pull their own data, write, and adjust live."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "me-ex1",
        "type": "decision",
        "title": "Tornado warning during live broadcast - guide viewers to safety",
        "description": "Tornado warning during live broadcast - guide viewers to safety.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "me-d2",
        "type": "decision",
        "title": "Meteorologist communication",
        "description": "A stakeholder is upset about an outcome related to your work as a meteorologist. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "me-d3",
        "type": "decision",
        "title": "Meteorologist problem solving",
        "description": "You discover a flaw in your meteorologist work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "me-p1",
        "type": "prioritize",
        "title": "Meteorologist priorities",
        "description": "You have four tasks competing for your attention as a meteorologist. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Experiment showing dangerous anomaly",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Peer review deadline tomorrow",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Clean and organize lab bench",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Update literature notes",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "04:30",
        "title": "Model check",
        "description": "",
        "type": "task"
      },
      {
        "time": "05:30",
        "title": "Forecast drafting",
        "description": "",
        "type": "design"
      },
      {
        "time": "06:30",
        "title": "On-air hits",
        "description": "",
        "type": "task"
      },
      {
        "time": "09:00",
        "title": "Rebrief",
        "description": "",
        "type": "task"
      },
      {
        "time": "12:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "13:00",
        "title": "Long-range research",
        "description": "",
        "type": "research"
      },
      {
        "time": "15:00",
        "title": "Evening prep",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Tornado warning during live broadcast - guide viewers to safety",
        "description": "Tornado warning during live broadcast - guide viewers to safety.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Meteorologist Week Project",
      "description": "Cover a hurricane approaching landfall."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Model disagreement"
      },
      {
        "type": "message",
        "content": "Server outage"
      },
      {
        "type": "message",
        "content": "Award coverage"
      }
    ]
  }
},

{
  "id": "personal-trainer",
  "title": "Personal Trainer",
  "emoji": "💪",
  "category": "Sports & Wellness",
  "description": "Personal trainers coach individuals in fitness, strength, and health. Careers range from gym-employed to independent to online. Great trainers combine exercise science, behavior change, and empathy.",
  "shortDescription": "Change bodies, change lives.",
  "salaryRange": {
    "min": 30000,
    "max": 100000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "independent",
  "environment": "office",
  "colleagues": [
    {
      "id": "coach-ana-ruiz",
      "name": "Coach Ana Ruiz",
      "role": "Studio Owner",
      "avatar": "🧑‍💼",
      "personality": "fitness veteran.",
      "systemPrompt": "You are Coach Ana Ruiz, Studio Owner. fitness veteran. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Train yourself first - keep a workout journal. Learn proper form on the big lifts. Study one nutrition book. If you love coaching friends through pushups, this fits.",
    "youngAdult": "Get NASM CPT or ACE CPT (self-study, ~3 months). Learn nutrition basics + program design. Build online presence early. Kinesiology degree helps for higher-earning athletic roles."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Personal Trainers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Results follow adherence, not perfection. Your business grows one client testimonial at a time."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Trainers just count reps.",
          "reality": "Programming, nutrition guidance, motivation, and admin fill the day."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "pe-ex1",
        "type": "decision",
        "title": "Client injury during a session - triage safely",
        "description": "Client injury during a session - triage safely.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "petr-d2",
        "type": "decision",
        "title": "Personal Trainer communication",
        "description": "A stakeholder is upset about an outcome related to your work as a personal trainer. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "petr-d3",
        "type": "decision",
        "title": "Personal Trainer problem solving",
        "description": "You discover a flaw in your personal trainer work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "petr-p1",
        "type": "prioritize",
        "title": "Personal Trainer priorities",
        "description": "You have four tasks competing for your attention as a personal trainer. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine personal trainer work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "06:00",
        "title": "Early clients",
        "description": "",
        "type": "communication"
      },
      {
        "time": "09:00",
        "title": "Break",
        "description": "",
        "type": "break"
      },
      {
        "time": "10:00",
        "title": "Midday clients",
        "description": "",
        "type": "communication"
      },
      {
        "time": "13:00",
        "title": "Lunch + admin",
        "description": "",
        "type": "break"
      },
      {
        "time": "15:00",
        "title": "Program writing",
        "description": "",
        "type": "task"
      },
      {
        "time": "17:00",
        "title": "Evening clients",
        "description": "",
        "type": "communication"
      },
      {
        "time": "20:00",
        "title": "Wrap",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Client injury during a session - triage safely",
        "description": "Client injury during a session - triage safely.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Personal Trainer Week Project",
      "description": "Book 30 sessions + onboard 3 new clients."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Client cancels streak"
      },
      {
        "type": "message",
        "content": "New certification"
      },
      {
        "type": "message",
        "content": "Content goes viral"
      }
    ]
  }
},

{
  "id": "physical-therapist-assistant",
  "title": "Physical Therapist Assistant",
  "emoji": "🦴",
  "category": "Healthcare",
  "description": "PTAs deliver hands-on therapy under a PT's supervision - a shorter, more affordable education route into rehab. Strong outlook, deeply rewarding daily work.",
  "shortDescription": "Hands-on healing, faster path in.",
  "salaryRange": {
    "min": 50000,
    "max": 75000,
    "currency": "USD"
  },
  "educationYears": 2,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "hospital",
  "colleagues": [
    {
      "id": "dr-maya-hendricks",
      "name": "Dr. Maya Hendricks",
      "role": "Supervising PT",
      "avatar": "🧑‍⚕️",
      "personality": "mentor.",
      "systemPrompt": "You are Dr. Maya Hendricks, Supervising PT. mentor. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Volunteer or work at a physical therapy clinic front desk. Play sport - learn foam rolling, stretching. If you love the moment someone regains a movement, PTA is a fast on-ramp.",
    "youngAdult": "2-year associate program (accredited) + NPTE-PTA license. Consider bridge to DPT (Doctor of PT) later if you want to lead care. Education & Communication (new)"
  },
  "quickTrial": {
    "lecture": {
      "title": "What Physical Therapist Assistants Really Do",
      "sections": [
        {
          "type": "text",
          "content": "You do most of the hands-on hours. Reading patient effort + energy = your superpower."
        },
        {
          "type": "myth-vs-reality",
          "myth": "PTAs are just aides.",
          "reality": "PTAs run whole sessions - the PT designs, PTA delivers."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "ph-ex1",
        "type": "decision",
        "title": "Post-op patient panics halfway through gait training",
        "description": "Post-op patient panics halfway through gait training.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "phth-d2",
        "type": "decision",
        "title": "Physical Therapist Assistant communication",
        "description": "A stakeholder is upset about an outcome related to your work as a physical therapist assistant. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "phth-d3",
        "type": "decision",
        "title": "Physical Therapist Assistant problem solving",
        "description": "You discover a flaw in your physical therapist assistant work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "phth-p1",
        "type": "prioritize",
        "title": "Physical Therapist Assistant priorities",
        "description": "You have four tasks competing for your attention as a physical therapist assistant. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Critical patient needs immediate intervention",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Stable patient requests medication refill",
            "correctRank": 4
          },
          {
            "id": "c",
            "text": "Post-op patient reporting unexpected pain",
            "correctRank": 2
          },
          {
            "id": "d",
            "text": "New admission paperwork needs review",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:00",
        "title": "Chart review",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "09:00",
        "title": "6 patient sessions",
        "description": "",
        "type": "communication"
      },
      {
        "time": "12:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "13:00",
        "title": "5 sessions",
        "description": "",
        "type": "task"
      },
      {
        "time": "16:30",
        "title": "Documentation",
        "description": "",
        "type": "task"
      },
      {
        "time": "17:00",
        "title": "Team huddle",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Post-op patient panics halfway through gait training",
        "description": "Post-op patient panics halfway through gait training.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Physical Therapist Assistant Week Project",
      "description": "Discharge 6 patients back to function."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Insurance denies"
      },
      {
        "type": "message",
        "content": "Patient regress"
      },
      {
        "type": "message",
        "content": "New tech tool"
      }
    ]
  }
},

{
  "id": "school-counselor",
  "title": "School Counselor",
  "emoji": "🎒",
  "category": "Education",
  "description": "School counselors support students' academic, social, and emotional development. They advise on college and career, run groups, respond to crises, and coordinate with families.",
  "shortDescription": "Guide kids through the years that shape them.",
  "salaryRange": {
    "min": 50000,
    "max": 85000,
    "currency": "USD"
  },
  "educationYears": 50,
  "demandLevel": "high",
  "workStyle": "independent",
  "environment": "office",
  "colleagues": [
    {
      "id": "ms-ross",
      "name": "Ms. Ross",
      "role": "Principal (shared)",
      "avatar": "📣",
      "personality": "supportive but firm.",
      "systemPrompt": "You are Ms. Ross, Principal (shared). supportive but firm. Keep replies short and realistic."
    },
    {
      "id": "mr-lee",
      "name": "Mr. Lee",
      "role": "Special Ed Coordinator",
      "avatar": "📚",
      "personality": "partner on tough cases.",
      "systemPrompt": "You are Mr. Lee, Special Ed Coordinator. partner on tough cases. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Mentor a younger student. Volunteer at a summer camp. Take psychology in high school. If you like helping friends figure out life, this fits.",
    "youngAdult": "Bachelor in psychology or education, then Master's in School Counseling + licensure. Practicum hours are part of the master's. State licensure required."
  },
  "quickTrial": {
    "lecture": {
      "title": "What School Counselors Really Do",
      "sections": [
        {
          "type": "text",
          "content": "You are the trusted adult in a busy building. Confidentiality earns future disclosures. Small acts of listening matter enormously."
        },
        {
          "type": "myth-vs-reality",
          "myth": "You just do college apps.",
          "reality": "You do crisis, groups, IEPs, career planning, and yes, college apps."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "sc-ex1",
        "type": "decision",
        "title": "A student discloses abuse - mandated report + support needed",
        "description": "A student discloses abuse - mandated report + support needed.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "scco-d2",
        "type": "decision",
        "title": "School Counselor communication",
        "description": "A stakeholder is upset about an outcome related to your work as a school counselor. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "scco-d3",
        "type": "decision",
        "title": "School Counselor problem solving",
        "description": "You discover a flaw in your school counselor work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "scco-p1",
        "type": "prioritize",
        "title": "School Counselor priorities",
        "description": "You have four tasks competing for your attention as a school counselor. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Student has a medical emergency",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Parent demands immediate meeting",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Grade papers due tomorrow",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Decorate classroom bulletin board",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "07:30",
        "title": "Building duty",
        "description": "",
        "type": "build"
      },
      {
        "time": "08:15",
        "title": "1-on-1 sessions",
        "description": "",
        "type": "task"
      },
      {
        "time": "10:00",
        "title": "Group session",
        "description": "",
        "type": "task"
      },
      {
        "time": "12:00",
        "title": "Lunch duty",
        "description": "",
        "type": "break"
      },
      {
        "time": "12:30",
        "title": "Crisis response",
        "description": "",
        "type": "task"
      },
      {
        "time": "14:00",
        "title": "Parent call",
        "description": "",
        "type": "communication"
      },
      {
        "time": "15:30",
        "title": "IEP meeting",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "16:30",
        "title": "Notes",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "A student discloses abuse - mandated report + support needed",
        "description": "A student discloses abuse - mandated report + support needed.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "School Counselor Week Project",
      "description": "Run career-day planning + finish 20 college recs."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Bullying report"
      },
      {
        "type": "message",
        "content": "Parent complaint"
      },
      {
        "type": "message",
        "content": "Standardized test week"
      }
    ]
  }
},

{
  "id": "public-relations-specialist",
  "title": "Public Relations Specialist",
  "emoji": "📣",
  "category": "Business",
  "description": "PR specialists build and protect reputations - through media, events, statements, and crisis response. They translate between the noisy world and their organization's message.",
  "shortDescription": "Shape how the world sees your client.",
  "salaryRange": {
    "min": 50000,
    "max": 110000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "medium",
  "workStyle": "collaborative",
  "environment": "office-remote",
  "colleagues": [
    {
      "id": "rowan-bennett",
      "name": "Rowan Bennett",
      "role": "VP Communications",
      "avatar": "💼",
      "personality": "strategic, calm.",
      "systemPrompt": "You are Rowan Bennett, VP Communications. strategic, calm. Keep replies short and realistic."
    },
    {
      "id": "zara-delgado",
      "name": "Zara Delgado",
      "role": "Media Relations",
      "avatar": "📣",
      "personality": "knows every reporter's number.",
      "systemPrompt": "You are Zara Delgado, Media Relations. knows every reporter's number. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Run social media for a school club. Pitch a real journalist about your project. Study how brands respond to bad news online.",
    "youngAdult": "Comms, PR, or journalism degree. Agency internships are the fast track. Learn one industry deeply (tech, health, finance). Modern & Gig (new)"
  },
  "quickTrial": {
    "lecture": {
      "title": "What Public Relations Specialists Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Reputation is built in years, lost in minutes. Your credibility with reporters is your currency. Never lie - reframe truthfully."
        },
        {
          "type": "myth-vs-reality",
          "myth": "PR = spin.",
          "reality": "PR = clear, honest storytelling under pressure."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "pu-ex1",
        "type": "decision",
        "title": "Client's product malfunction goes viral - draft holding statement in 30 minutes",
        "description": "Client's product malfunction goes viral - draft holding statement in 30 minutes.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "pure-d2",
        "type": "decision",
        "title": "Public Relations Specialist communication",
        "description": "A stakeholder is upset about an outcome related to your work as a public relations specialist. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "pure-d3",
        "type": "decision",
        "title": "Public Relations Specialist problem solving",
        "description": "You discover a flaw in your public relations specialist work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "pure-p1",
        "type": "prioritize",
        "title": "Public Relations Specialist priorities",
        "description": "You have four tasks competing for your attention as a public relations specialist. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Major client complaint on social media",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Quarterly report due to leadership today",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Schedule next week’s team meeting",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Review non-urgent email backlog",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:30",
        "title": "News scan",
        "description": "",
        "type": "task"
      },
      {
        "time": "09:30",
        "title": "Client call",
        "description": "",
        "type": "communication"
      },
      {
        "time": "11:00",
        "title": "Press release drafting",
        "description": "",
        "type": "design"
      },
      {
        "time": "13:00",
        "title": "Working lunch with journalist",
        "description": "",
        "type": "break"
      },
      {
        "time": "14:30",
        "title": "Event planning",
        "description": "",
        "type": "task"
      },
      {
        "time": "16:00",
        "title": "Social monitoring",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Client's product malfunction goes viral - draft holding statement in 30 minutes",
        "description": "Client's product malfunction goes viral - draft holding statement in 30 minutes.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Public Relations Specialist Week Project",
      "description": "Launch a product with 5 tier-1 media placements."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Crisis breaks"
      },
      {
        "type": "deadline",
        "title": "Reporter deadline",
        "hoursRemaining": 2
      },
      {
        "type": "message",
        "content": "Award submission"
      }
    ]
  }
},

{
  "id": "content-creator-youtuber",
  "title": "Content Creator / YouTuber",
  "emoji": "📹",
  "category": "Creative",
  "description": "Content creators build audiences on YouTube, TikTok, Instagram, and podcasts, monetizing via ads, sponsorships, memberships, and products. It's part media company, part small business.",
  "shortDescription": "Own your audience - and your income.",
  "salaryRange": {
    "min": 0,
    "max": 1,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "independent",
  "environment": "office",
  "colleagues": [
    {
      "id": "content-creator-youtuber-mentor",
      "name": "Senior Mentor",
      "role": "Team Lead",
      "avatar": "👨‍💼",
      "personality": "Experienced and supportive.",
      "systemPrompt": "You are a senior mentor. Be helpful and concise."
    }
  ],
  "guidance": {
    "teen": "Start now. Post consistently for 6 months on one niche. Study analytics like a scientist. If quitting is the biggest failure mode, learn to enjoy small numbers.",
    "youngAdult": "Build audience while in school or a day job (safer). Learn editing, thumbnail design, storytelling. Diversify income before quitting a stable role."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Content Creator / YouTubers Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Content is a skill; distribution is a business. Consistency for 24 months separates almost everyone."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Get famous overnight.",
          "reality": "Almost every 'overnight' star has 3+ years of unseen work."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "co-ex1",
        "type": "decision",
        "title": "Video underperforms - decide to iterate niche or double down",
        "description": "Video underperforms - decide to iterate niche or double down.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "cocr-d2",
        "type": "decision",
        "title": "Content Creator / YouTuber communication",
        "description": "A stakeholder is upset about an outcome related to your work as a content creator / youtuber. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "cocr-d3",
        "type": "decision",
        "title": "Content Creator / YouTuber problem solving",
        "description": "You discover a flaw in your content creator / youtuber work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "cocr-p1",
        "type": "prioritize",
        "title": "Content Creator / YouTuber priorities",
        "description": "You have four tasks competing for your attention as a content creator / youtuber. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine content creator / youtuber work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:00",
        "title": "Script writing",
        "description": "",
        "type": "task"
      },
      {
        "time": "10:00",
        "title": "Filming",
        "description": "",
        "type": "task"
      },
      {
        "time": "13:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "Editing",
        "description": "",
        "type": "task"
      },
      {
        "time": "16:00",
        "title": "Thumbnail + title",
        "description": "",
        "type": "task"
      },
      {
        "time": "17:30",
        "title": "Community reply",
        "description": "",
        "type": "task"
      },
      {
        "time": "19:00",
        "title": "Analytics review",
        "description": "",
        "type": "meeting"
      }
    ],
    "stressEvents": [
      {
        "title": "Video underperforms - decide to iterate niche or double down",
        "description": "Video underperforms - decide to iterate niche or double down.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Content Creator / YouTuber Week Project",
      "description": "Publish 2 videos + 1 sponsor integration + 3 short-form clips."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Sponsor drops in"
      },
      {
        "type": "message",
        "content": "Algorithm change"
      },
      {
        "type": "message",
        "content": "Copyright strike"
      }
    ]
  }
},

{
  "id": "e-commerce-entrepreneur",
  "title": "E-commerce Entrepreneur",
  "emoji": "🛒",
  "category": "Business",
  "description": "E-commerce entrepreneurs build online stores selling physical or digital products. Shopify, Amazon, Etsy, and DTC brands are common paths. It combines marketing, operations, product, and finance.",
  "shortDescription": "Sell what you make - anywhere, anytime.",
  "salaryRange": {
    "min": 0,
    "max": 500000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "independent",
  "environment": "office",
  "colleagues": [
    {
      "id": "e-commerce-entrepreneur-mentor",
      "name": "Senior Mentor",
      "role": "Team Lead",
      "avatar": "👨‍💼",
      "personality": "Experienced and supportive.",
      "systemPrompt": "You are a senior mentor. Be helpful and concise."
    }
  ],
  "guidance": {
    "teen": "Sell something small - stickers, thrifted clothes, art. Learn to price, ship, and handle a complaint. That's the whole game in miniature.",
    "youngAdult": "Start with $500 and one product. Take Shopify Compass free courses. Learn one paid-ads platform. Reinvest for 2 years before pulling salary. Transportation & Logistics (new)"
  },
  "quickTrial": {
    "lecture": {
      "title": "What E-commerce Entrepreneurs Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Product-market fit trumps design. Test cheap, scale winners. Cash flow is the killer - watch inventory."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Passive income easy.",
          "reality": "You work 60 hours/week for 2 years to make it 'passive'."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "e--ex1",
        "type": "decision",
        "title": "A viral TikTok - 5000 orders overnight, inventory for 1000",
        "description": "A viral TikTok - 5000 orders overnight, inventory for 1000.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "eco-d2",
        "type": "decision",
        "title": "E-commerce Entrepreneur communication",
        "description": "A stakeholder is upset about an outcome related to your work as a e-commerce entrepreneur. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "eco-d3",
        "type": "decision",
        "title": "E-commerce Entrepreneur problem solving",
        "description": "You discover a flaw in your e-commerce entrepreneur work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "eco-p1",
        "type": "prioritize",
        "title": "E-commerce Entrepreneur priorities",
        "description": "You have four tasks competing for your attention as a e-commerce entrepreneur. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Major client complaint on social media",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Quarterly report due to leadership today",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Schedule next week’s team meeting",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Review non-urgent email backlog",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:00",
        "title": "Sales + ads check",
        "description": "",
        "type": "task"
      },
      {
        "time": "09:30",
        "title": "Supplier email",
        "description": "",
        "type": "inbox"
      },
      {
        "time": "11:00",
        "title": "Product photos",
        "description": "",
        "type": "task"
      },
      {
        "time": "13:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "Ads optimization",
        "description": "",
        "type": "task"
      },
      {
        "time": "16:00",
        "title": "Customer support",
        "description": "",
        "type": "communication"
      },
      {
        "time": "18:00",
        "title": "Inventory",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "A viral TikTok - 5000 orders overnight, inventory for 1000",
        "description": "A viral TikTok - 5000 orders overnight, inventory for 1000.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "E-commerce Entrepreneur Week Project",
      "description": "Launch a new product + hit revenue target."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Payment platform freezes funds"
      },
      {
        "type": "message",
        "content": "Supplier issue"
      },
      {
        "type": "message",
        "content": "Ad account banned"
      }
    ]
  }
},

{
  "id": "supply-chain-analyst",
  "title": "Supply Chain Analyst",
  "emoji": "🚚",
  "category": "Business",
  "description": "Supply chain analysts optimize how goods flow from factory to customer - forecasting demand, negotiating with suppliers, managing warehouses. Pandemic taught the world how fragile chains are; talent is in demand.",
  "shortDescription": "Move the world's stuff, cheaper and faster.",
  "salaryRange": {
    "min": 60000,
    "max": 120000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "office",
  "colleagues": [
    {
      "id": "wei-zhang",
      "name": "Wei Zhang",
      "role": "Ops Manager",
      "avatar": "👨‍💼",
      "personality": "efficient, systematic.",
      "systemPrompt": "You are Wei Zhang, Ops Manager. efficient, systematic. Keep replies short and realistic."
    },
    {
      "id": "amelia-ruiz",
      "name": "Amelia Ruiz",
      "role": "Buyer",
      "avatar": "💼",
      "personality": "negotiator.",
      "systemPrompt": "You are Amelia Ruiz, Buyer. negotiator. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Play logistics-heavy games (Factorio, Cities: Skylines). Track your own home 'supply chain' - what runs out and why.",
    "youngAdult": "Supply chain / business / industrial engineering degree. Excel + SQL + one ERP (SAP, Oracle). Internships in Fortune 500 companies open doors fast. Sports, Wellness & Lifestyle (new)"
  },
  "quickTrial": {
    "lecture": {
      "title": "What Supply Chain Analysts Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Excel + one ERP system + clear writing = career. Small savings across millions of units = huge dollars."
        },
        {
          "type": "myth-vs-reality",
          "myth": "It's just spreadsheets.",
          "reality": "It's global politics, weather, tariffs, and human behavior."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "su-ex1",
        "type": "decision",
        "title": "Ship breaks down at port - product launch in 10 days",
        "description": "Ship breaks down at port - product launch in 10 days.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "such-d2",
        "type": "decision",
        "title": "Supply Chain Analyst communication",
        "description": "A stakeholder is upset about an outcome related to your work as a supply chain analyst. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "such-d3",
        "type": "decision",
        "title": "Supply Chain Analyst problem solving",
        "description": "You discover a flaw in your supply chain analyst work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "such-p1",
        "type": "prioritize",
        "title": "Supply Chain Analyst priorities",
        "description": "You have four tasks competing for your attention as a supply chain analyst. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Major client complaint on social media",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Quarterly report due to leadership today",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Schedule next week’s team meeting",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Review non-urgent email backlog",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "08:30",
        "title": "Dashboard check",
        "description": "",
        "type": "task"
      },
      {
        "time": "09:30",
        "title": "Supplier call",
        "description": "",
        "type": "communication"
      },
      {
        "time": "11:00",
        "title": "Demand plan",
        "description": "",
        "type": "task"
      },
      {
        "time": "13:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "Inventory analysis",
        "description": "",
        "type": "research"
      },
      {
        "time": "15:30",
        "title": "Cross-team meeting",
        "description": "",
        "type": "meeting"
      },
      {
        "time": "17:00",
        "title": "Report",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Ship breaks down at port - product launch in 10 days",
        "description": "Ship breaks down at port - product launch in 10 days.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Supply Chain Analyst Week Project",
      "description": "Cut cost of one SKU by 5% through renegotiation or rerouting."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Port strike"
      },
      {
        "type": "message",
        "content": "Supplier bankruptcy"
      },
      {
        "type": "message",
        "content": "Sudden demand spike"
      }
    ]
  }
},

{
  "id": "athletic-trainer-coach",
  "title": "Athletic Trainer / Coach",
  "emoji": "🏆",
  "category": "Sports & Wellness",
  "description": "Athletic trainers and coaches train athletes for competition and recovery. Certified athletic trainers (ATs) handle injuries and rehab; strength & conditioning coaches build performance; head coaches lead strategy and culture. All rely on movement science + people skills.",
  "shortDescription": "Load management is everything.",
  "salaryRange": {
    "min": 40000,
    "max": 150000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "field",
  "colleagues": [
    {
      "id": "coach-marcus-reid",
      "name": "Coach Marcus Reid",
      "role": "Head Coach",
      "avatar": "🧑‍💼",
      "personality": "mentor, tough love.",
      "systemPrompt": "You are Coach Marcus Reid, Head Coach. mentor, tough love. Keep replies short and realistic."
    },
    {
      "id": "at-danielle-kim",
      "name": "AT Danielle Kim",
      "role": "Athletic Trainer",
      "avatar": "💪",
      "personality": "injury-management pro.",
      "systemPrompt": "You are AT Danielle Kim, Athletic Trainer. injury-management pro. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Play sports through high school. Learn one sport deeply as a fan (film breakdowns). Volunteer as a youth-league coach.",
    "youngAdult": "Kinesiology / sport science degree. AT certification requires accredited program + BOC exam. Strength coaches: CSCS. Head-coach paths often start as GA (graduate assistant) at a college. Transportation & Logistics (new)"
  },
  "quickTrial": {
    "lecture": {
      "title": "What Athletic Trainer / Coachs Really Do",
      "sections": [
        {
          "type": "text",
          "content": "You coach the person, not the sport. Recovery is training. Culture beats talent over a season."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Just yell drills.",
          "reality": "You watch film, plan periodization, and manage 20 personalities."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "at-ex1",
        "type": "decision",
        "title": "Star player goes down mid-game - assess and decide in 90 seconds",
        "description": "Star player goes down mid-game - assess and decide in 90 seconds.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "attr-d2",
        "type": "decision",
        "title": "Athletic Trainer / Coach communication",
        "description": "A stakeholder is upset about an outcome related to your work as a athletic trainer / coach. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "attr-d3",
        "type": "decision",
        "title": "Athletic Trainer / Coach problem solving",
        "description": "You discover a flaw in your athletic trainer / coach work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "attr-p1",
        "type": "prioritize",
        "title": "Athletic Trainer / Coach priorities",
        "description": "You have four tasks competing for your attention as a athletic trainer / coach. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine athletic trainer / coach work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "06:30",
        "title": "Team lift",
        "description": "",
        "type": "task"
      },
      {
        "time": "08:30",
        "title": "Film",
        "description": "",
        "type": "task"
      },
      {
        "time": "10:00",
        "title": "Practice planning",
        "description": "",
        "type": "task"
      },
      {
        "time": "12:00",
        "title": "Lunch",
        "description": "",
        "type": "break"
      },
      {
        "time": "14:00",
        "title": "Practice",
        "description": "",
        "type": "task"
      },
      {
        "time": "17:00",
        "title": "Debrief",
        "description": "",
        "type": "task"
      },
      {
        "time": "19:00",
        "title": "Recruiting calls",
        "description": "",
        "type": "communication"
      }
    ],
    "stressEvents": [
      {
        "title": "Star player goes down mid-game - assess and decide in 90 seconds",
        "description": "Star player goes down mid-game - assess and decide in 90 seconds.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Athletic Trainer / Coach Week Project",
      "description": "Prep for rival game + injury clear 2 starters."
    },
    "randomEventPool": [
      {
        "type": "deadline",
        "title": "Recruiting deadline",
        "hoursRemaining": 2
      },
      {
        "type": "message",
        "content": "Injury cluster"
      },
      {
        "type": "message",
        "content": "Media day"
      }
    ]
  }
},

{
  "id": "airline-pilot",
  "title": "Airline Pilot",
  "emoji": "✈️",
  "category": "Transportation",
  "description": "Airline pilots fly commercial passenger and cargo aircraft. Careers move from regional to major airlines, first officer to captain, with strong pay ceilings but heavy training investment. Safety culture is total.",
  "shortDescription": "Sky office, high stakes.",
  "salaryRange": {
    "min": 90000,
    "max": 350000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "high",
  "workStyle": "collaborative",
  "environment": "field",
  "colleagues": [
    {
      "id": "captain-elena-petrov",
      "name": "Captain Elena Petrov",
      "role": "senior captain",
      "avatar": "🧑‍💼",
      "personality": "calm, exact.",
      "systemPrompt": "You are Captain Elena Petrov, senior captain. calm, exact. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Take a discovery flight ($100-200) at a local flight school. Study aviation weather. Learn to love checklists. If motion doesn't bother you and detail energizes you, this fits.",
    "youngAdult": "Get Private Pilot -> Instrument -> Commercial -> CFI (~$80-100K path). Build hours as a flight instructor (1500 hrs for ATP). Regional airlines then major airlines. Military route can be debt-free. Business & Finance (new)"
  },
  "quickTrial": {
    "lecture": {
      "title": "What Airline Pilots Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Checklists save lives. You aren't paid for good days - you're paid for the one bad day. Fatigue management is a skill."
        },
        {
          "type": "myth-vs-reality",
          "myth": "You just push buttons.",
          "reality": "You manage weather, systems, ATC, and passenger safety continuously."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "ai-ex1",
        "type": "decision",
        "title": "Engine fire warning at 30,000 ft - execute memory items now",
        "description": "Engine fire warning at 30,000 ft - execute memory items now.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "aipi-d2",
        "type": "decision",
        "title": "Airline Pilot communication",
        "description": "A stakeholder is upset about an outcome related to your work as a airline pilot. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "aipi-d3",
        "type": "decision",
        "title": "Airline Pilot problem solving",
        "description": "You discover a flaw in your airline pilot work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "aipi-p1",
        "type": "prioritize",
        "title": "Airline Pilot priorities",
        "description": "You have four tasks competing for your attention as a airline pilot. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Urgent issue that affects safety or a deadline",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Important task from a key stakeholder",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Routine airline pilot work that can wait",
            "correctRank": 3
          },
          {
            "id": "d",
            "text": "Low-priority administrative task",
            "correctRank": 4
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "04:00",
        "title": "Show up + preflight",
        "description": "",
        "type": "task"
      },
      {
        "time": "05:30",
        "title": "First leg",
        "description": "",
        "type": "task"
      },
      {
        "time": "09:00",
        "title": "Layover / turn",
        "description": "",
        "type": "task"
      },
      {
        "time": "11:00",
        "title": "Second leg",
        "description": "",
        "type": "task"
      },
      {
        "time": "14:00",
        "title": "Overnight in city",
        "description": "",
        "type": "task"
      },
      {
        "time": "18:00",
        "title": "Sleep / prep",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Engine fire warning at 30,000 ft - execute memory items now",
        "description": "Engine fire warning at 30,000 ft - execute memory items now.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Airline Pilot Week Project",
      "description": "Fly 3-4 day trip with 6 legs and 2 overnights."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Weather diversion"
      },
      {
        "type": "message",
        "content": "Medical emergency onboard"
      },
      {
        "type": "message",
        "content": "Delay cascade"
      }
    ]
  }
},

{
  "id": "real-estate-agent",
  "title": "Real Estate Agent",
  "emoji": "🏠",
  "category": "Business",
  "description": "Real estate agents help clients buy, sell, and rent property. It's mostly commission-based, so income is variable but potentially high. Success requires marketing, negotiation, local knowledge, and relentless follow-through.",
  "shortDescription": "Match people with places that fit their lives.",
  "salaryRange": {
    "min": 30000,
    "max": 200000,
    "currency": "USD"
  },
  "educationYears": 4,
  "demandLevel": "medium",
  "workStyle": "independent",
  "environment": "field",
  "colleagues": [
    {
      "id": "broker-camille-laurent",
      "name": "Broker Camille Laurent",
      "role": "office lead",
      "avatar": "👨‍💼",
      "personality": "mentor, deal closer.",
      "systemPrompt": "You are Broker Camille Laurent, office lead. mentor, deal closer. Keep replies short and realistic."
    }
  ],
  "guidance": {
    "teen": "Shadow a real estate agent for a day. Learn to talk to strangers - retail or restaurant jobs build this. Study your local neighborhoods on Zillow.",
    "youngAdult": "Take the pre-licensing course (60-180 hrs by state), pass the exam, join a brokerage. Expect year 1 to be lean. Build a database + niche (first-time buyers, luxury, investors)."
  },
  "quickTrial": {
    "lecture": {
      "title": "What Real Estate Agents Really Do",
      "sections": [
        {
          "type": "text",
          "content": "Your database is your business. Follow up 5 times before assuming a lead is dead. Referrals compound."
        },
        {
          "type": "myth-vs-reality",
          "myth": "Sell 1 house = rich.",
          "reality": "You keep ~2% of a home price after splits - volume + repeat clients matter."
        }
      ],
      "durationMinutes": 5
    },
    "exercises": [
      {
        "id": "re-ex1",
        "type": "decision",
        "title": "Deal falls apart 24 hours before closing - salvage it",
        "description": "Deal falls apart 24 hours before closing - salvage it.",
        "options": [
          {
            "id": "a",
            "text": "Stay calm and follow protocol",
            "score": 100,
            "feedback": "Best choice — steady and professional."
          },
          {
            "id": "b",
            "text": "Ask a senior colleague for help",
            "score": 80,
            "feedback": "Good — collaboration reduces risk."
          },
          {
            "id": "c",
            "text": "Handle it quickly on your own",
            "score": 50,
            "feedback": "Speed is good, but check your assumptions."
          },
          {
            "id": "d",
            "text": "Ignore it for now",
            "score": 15,
            "feedback": "Small issues can become big fast."
          }
        ],
        "scoreWeight": {
          "skills": 0.2,
          "decisionMaking": 0.2,
          "communication": 0.2,
          "problemSolving": 0.2,
          "careerFit": 0.2
        }
      },
      {
        "id": "rees-d2",
        "type": "decision",
        "title": "Real Estate Agent communication",
        "description": "A stakeholder is upset about an outcome related to your work as a real estate agent. How do you respond?",
        "options": [
          {
            "id": "a",
            "text": "Listen first, then explain your perspective clearly",
            "score": 100,
            "feedback": "Excellent — empathy and clarity build trust."
          },
          {
            "id": "b",
            "text": "Apologize and offer a solution",
            "score": 85,
            "feedback": "Good — ownership and a path forward matter."
          },
          {
            "id": "c",
            "text": "Defend your work and point to the data",
            "score": 55,
            "feedback": "Data helps, but tone can feel dismissive."
          },
          {
            "id": "d",
            "text": "Avoid the conversation until they calm down",
            "score": 20,
            "feedback": "Avoidance usually escalates tension."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.4,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      },
      {
        "id": "rees-d3",
        "type": "decision",
        "title": "Real Estate Agent problem solving",
        "description": "You discover a flaw in your real estate agent work that could affect the final result. What is your next step?",
        "options": [
          {
            "id": "a",
            "text": "Document the issue, inform the team, and fix it",
            "score": 100,
            "feedback": "Best — transparency and action together."
          },
          {
            "id": "b",
            "text": "Fix it quietly before anyone notices",
            "score": 60,
            "feedback": "Fixing is good, but hiding it limits learning."
          },
          {
            "id": "c",
            "text": "Ask a colleague to verify it is really a problem",
            "score": 75,
            "feedback": "Reasonable — verification reduces panic."
          },
          {
            "id": "d",
            "text": "Continue as planned and mention it later",
            "score": 25,
            "feedback": "Later may be too late for stakeholders."
          }
        ],
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.15,
          "communication": 0.15,
          "problemSolving": 0.4,
          "careerFit": 0.15
        }
      },
      {
        "id": "rees-p1",
        "type": "prioritize",
        "title": "Real Estate Agent priorities",
        "description": "You have four tasks competing for your attention as a real estate agent. Rank them from highest to lowest priority.",
        "timeLimit": 90,
        "items": [
          {
            "id": "a",
            "text": "Major client complaint on social media",
            "correctRank": 1
          },
          {
            "id": "b",
            "text": "Quarterly report due to leadership today",
            "correctRank": 2
          },
          {
            "id": "c",
            "text": "Schedule next week’s team meeting",
            "correctRank": 4
          },
          {
            "id": "d",
            "text": "Review non-urgent email backlog",
            "correctRank": 3
          }
        ],
        "explanation": "Safety, deadlines, and stakeholders come before routine or administrative work.",
        "scoreWeight": {
          "skills": 0.15,
          "decisionMaking": 0.4,
          "communication": 0.15,
          "problemSolving": 0.15,
          "careerFit": 0.15
        }
      }
    ]
  },
  "dayTrial": {
    "schedule": [
      {
        "time": "07:30",
        "title": "MLS + market update",
        "description": "",
        "type": "task"
      },
      {
        "time": "09:00",
        "title": "Showings",
        "description": "",
        "type": "task"
      },
      {
        "time": "12:00",
        "title": "Lunch with lender",
        "description": "",
        "type": "break"
      },
      {
        "time": "13:30",
        "title": "Buyer consult",
        "description": "",
        "type": "task"
      },
      {
        "time": "15:30",
        "title": "Open house prep",
        "description": "",
        "type": "task"
      },
      {
        "time": "17:30",
        "title": "Listing photos",
        "description": "",
        "type": "task"
      },
      {
        "time": "20:00",
        "title": "Follow-ups",
        "description": "",
        "type": "task"
      }
    ],
    "stressEvents": [
      {
        "title": "Deal falls apart 24 hours before closing - salvage it",
        "description": "Deal falls apart 24 hours before closing - salvage it.",
        "urgency": "high"
      }
    ]
  },
  "weekTrial": {
    "days": 5,
    "teamProject": {
      "title": "Real Estate Agent Week Project",
      "description": "Close 2 deals + secure 1 new listing."
    },
    "randomEventPool": [
      {
        "type": "message",
        "content": "Bidding war"
      },
      {
        "type": "message",
        "content": "Inspection issues"
      },
      {
        "type": "message",
        "content": "Appraisal comes in low"
      }
    ]
  }
},
];

applyCareerCorrections(careers);

export function getCareerById(id) {
  return careers.find(c => c.id === id);
}

export function getCareersByCategory(category) {
  return careers.filter(c => c.category === category);
}

export const categories = [...new Set(careers.map(c => c.category))];

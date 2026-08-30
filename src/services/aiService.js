// OpenAI service — humanized AI colleagues that chat with the user
// Requires OPENAI_API_KEY set in the app settings

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Send a chat message to an AI colleague. Returns the assistant reply.
 * @param {string} apiKey - OpenAI API key
 * @param {object} colleague - colleague persona from careers.js
 * @param {Array<{role:string, content:string}>} history - prior messages
 * @param {string} userMessage - the new user message
 * @param {object} context - { careerTitle, currentTask, trialType }
 */
export async function chatWithColleague(apiKey, colleague, history, userMessage, context = {}) {
  if (!apiKey || apiKey === 'sk-your-openai-api-key-here') {
    return getMockReply(colleague, userMessage, context);
  }

  const systemPrompt = buildSystemPrompt(colleague, context);
  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-10),
    { role: 'user', content: userMessage },
  ];

  try {
    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.85,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || getMockReply(colleague, userMessage, context);
  } catch (error) {
    console.warn('OpenAI call failed, using mock:', error.message);
    return getMockReply(colleague, userMessage, context);
  }
}

function buildSystemPrompt(colleague, context) {
  return `${colleague.systemPrompt}

You work with a student trying out the ${context.careerTitle || 'career'} field.
${context.currentTask ? `They are currently working on: ${context.currentTask}` : ''}
${context.trialType ? `Trial mode: ${context.trialType}` : ''}

Guidelines:
- Stay in character as ${colleague.name}, ${colleague.role}.
- Reply naturally like a real coworker on Slack. Short, casual, human.
- Never say you are an AI.
- If asked a technical question, help but do not lecture.
- Use small talk occasionally.
- Show emotion — stress, excitement, tiredness.
- Keep replies under 3 sentences unless explaining something complex.`;
}

/**
 * Score a user's simulation performance using AI.
 * Returns { skills, decisionMaking, communication, problemSolving, careerFit, feedback, strengths, growthAreas }
 */
export async function scorePerformance(apiKey, careerTitle, actions, trialType) {
  if (!apiKey || apiKey === 'sk-your-openai-api-key-here') {
    return getMockScore(actions);
  }

  const systemPrompt = `You are an expert career coach evaluating a student's ${trialType} simulation for ${careerTitle}.
Score them on 5 dimensions (0-100):
- skills: technical competence for this role
- decisionMaking: judgment quality
- communication: clarity and appropriateness
- problemSolving: structured thinking
- careerFit: alignment with role demands

Return ONLY valid JSON in this format:
{
  "skills": 75,
  "decisionMaking": 82,
  "communication": 68,
  "problemSolving": 71,
  "careerFit": 79,
  "feedback": "1-2 sentence overall reflection",
  "strengths": ["strength 1", "strength 2"],
  "growthAreas": ["area 1", "area 2"]
}`;

  try {
    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Actions taken:\n${JSON.stringify(actions, null, 2)}` },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.4,
      }),
    });

    if (!response.ok) throw new Error(`OpenAI error: ${response.status}`);
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.warn('Score AI failed, using mock:', error.message);
    return getMockScore(actions);
  }
}

// Fallback mock responses when API key is missing
function getMockReply(colleague, userMessage, context) {
  const lower = userMessage.toLowerCase();
  const name = colleague.name.split(' ')[0];

  const patterns = [
    { match: ['help', 'stuck', 'how do'], replies: [
      `Hey, what's blocking you? Walk me through what you tried.`,
      `Sure, happy to help. What have you looked at so far?`,
      `No worries, we've all been there. Show me what you have.`,
    ]},
    { match: ['hello', 'hi ', 'hey'], replies: [
      `Hey! How's it going?`,
      `Hi there — what's up?`,
      `Morning! Coffee first, then work 😄`,
    ]},
    { match: ['thanks', 'thank you'], replies: [
      `Anytime!`,
      `Of course — that's what we do.`,
      `Sure thing. Ping me if you need more.`,
    ]},
    { match: ['deadline', 'urgent', 'now'], replies: [
      `Yeah, we need to move on this. What can you commit to?`,
      `Okay, let's focus. What's the minimum viable path?`,
    ]},
    { match: ['bug', 'error', 'wrong', 'broken'], replies: [
      `Ugh. Have you checked the logs?`,
      `Reproduce it first, then bisect. What's the actual error?`,
    ]},
  ];

  for (const p of patterns) {
    if (p.match.some(m => lower.includes(m))) {
      return p.replies[Math.floor(Math.random() * p.replies.length)];
    }
  }

  // Default persona-flavored replies
  const defaults = [
    `Interesting. Tell me more.`,
    `Okay, what are you thinking?`,
    `Got it. What's your plan?`,
    `Hmm, that's a good question. What do you think?`,
    `Fair point. How would you approach it?`,
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

function getMockScore(actions) {
  // Base score varies based on number of actions
  const base = 60 + Math.min(actions.length * 3, 25);
  const jitter = () => Math.max(30, Math.min(95, base + Math.floor(Math.random() * 20 - 10)));
  return {
    skills: jitter(),
    decisionMaking: jitter(),
    communication: jitter(),
    problemSolving: jitter(),
    careerFit: jitter(),
    feedback: 'You showed real engagement and thoughtful decisions. Some areas need practice, but the fundamentals are there.',
    strengths: ['Quick decision making', 'Willingness to collaborate'],
    growthAreas: ['Deeper technical detail', 'Managing competing priorities'],
  };
}

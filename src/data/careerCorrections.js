const optionSet = (entries) => entries.map(([text, feedback], index) => ({
  id: String.fromCharCode(97 + index),
  text,
  score: [100, 85, 35, 0][index],
  feedback,
}));

const laterCareerContent = {
  "pharmacist": {
    options: optionSet([
      ["Hold the prescription, verify the order and patient record, contact the prescriber, and document the resolution", "Correct: dispensing stays on hold until the pharmacist resolves and documents the mismatch."],
      ["Keep the medicine on hold and ask the pharmacist-in-charge to review the mismatch with you", "Good consultation: a second pharmacist can help verify the concern without exposing the patient to risk."],
      ["Assume the most likely dose and prepare it so the queue keeps moving", "A plausible guess is not a verified prescription; speed cannot replace prescriber confirmation."],
      ["Dispense the prescription as entered and let the patient call if something seems wrong", "Unsafe: an unresolved mismatch can cause serious medication harm."],
    ]),
    stress: ["Cold-chain temperature excursion", "A vaccine refrigerator is outside its approved range. Quarantine affected stock, preserve the temperature log, and follow the pharmacy's escalation procedure.", "high"],
    project: ["Design a safer prescription-verification workflow", "Over five days, map one dispensing workflow, identify error points, and present a pharmacist-reviewed checklist and patient-counseling plan."],
  },
  "physical-therapist": {
    options: optionSet([
      ["Pause gait training, make the patient safe, assess symptoms and vital signs, and adjust the plan within PT scope", "Correct: safety and reassessment come before completing the exercise."],
      ["Stabilize the patient and consult the supervising clinician or medical team before resuming", "Good: consultation is appropriate when symptoms or precautions need another clinician's input."],
      ["Reduce the repetitions but keep walking so the session stays on schedule", "Rushing may miss a meaningful change in the patient's condition."],
      ["Insist the patient finish the planned distance despite panic or new symptoms", "Unsafe: forcing mobility can worsen an injury or cause a fall."],
    ]),
    stress: ["Unexpected loss of balance", "A patient becomes unsteady during a transfer. Guard against a fall, reassess, and decide whether the session can safely continue.", "high"],
    project: ["Build an individualized mobility progression", "Use five days of supervised findings to draft goals, home-exercise teaching, safety criteria, and a progress summary for PT review."],
  },
  "dentist": {
    options: optionSet([
      ["Stop the procedure, place instruments safely, assess the patient, explain choices, and obtain consent before continuing", "Correct: patient safety, comfort, and informed consent take priority over the schedule."],
      ["Pause and ask the hygienist or another dentist to help calm and reassess the patient", "Good: team support can reduce anxiety while the treating dentist remains responsible."],
      ["Continue quickly before the anesthetic wears off", "Rushing can intensify distress and undermines informed consent."],
      ["Dismiss the panic and continue without checking what the patient needs", "Unsafe: ignoring distress can harm the patient and damage trust."],
    ]),
    stress: ["Unexpected bleeding after extraction", "A patient has more bleeding than expected. Reassess, follow the clinic's emergency protocol, and arrange appropriate escalation.", "high"],
    project: ["Create a patient-centered anxiety protocol", "Develop a five-day improvement plan covering pre-visit screening, consent pauses, staff roles, and follow-up instructions."],
  },
  "veterinarian": {
    options: optionSet([
      ["Pause the intake, reduce stimulation, use a barrier and low-stress handling plan, and have the veterinarian choose safe restraint or sedation", "Correct: protecting the animal, owner, and staff requires a planned low-stress approach."],
      ["Keep everyone at a safe distance and consult the lead veterinarian and experienced technician", "Good: the team can select an authorized handling plan before contact."],
      ["Try to place a muzzle quickly before the dog reacts again", "Rushed restraint can increase fear and bite risk."],
      ["Corner and hold the dog alone so the appointment is not delayed", "Unsafe: solo force can injure the animal and people nearby."],
    ]),
    stress: ["Post-operative patient deteriorates", "A recovering animal shows abnormal breathing and responsiveness. Alert the veterinarian and begin the clinic's monitored emergency workflow.", "critical"],
    project: ["Improve low-stress animal intake", "Over five days, review one intake process and propose species-appropriate screening, room setup, staff roles, and escalation criteria."],
  },
  "biomedical-scientist": {
    options: optionSet([
      ["Quarantine affected samples, record the temperature history, transfer them to validated backup storage, and notify quality staff", "Correct: chain-of-custody and validated storage protect both samples and study integrity."],
      ["Ask the lab manager and quality officer to review sample stability before any use", "Good: expert review is needed when acceptability depends on validated limits."],
      ["Move samples to any open freezer and reconstruct the labels later", "Rushing risks mix-ups and breaks traceability."],
      ["Silence the alarm and continue the experiment", "Unsafe: compromised samples can invalidate results and waste scarce material."],
    ]),
    stress: ["Control results fail", "A critical assay control is out of range. Stop release of results, document the deviation, and investigate under the lab SOP.", "high"],
    project: ["Validate an assay quality-control plan", "Compile five days of control data, document acceptance criteria, investigate one simulated deviation, and present conclusions for supervisor review."],
  },
  "cybersecurity-analyst": {
    options: optionSet([
      ["Activate the incident plan, use authorized controls to isolate affected systems, notify the response lead, and preserve evidence", "Correct: coordinated containment and evidence preservation reduce damage and support recovery."],
      ["Escalate to the incident commander and system owners while collecting approved indicators of compromise", "Good: consultation keeps technical action within authorization and business context."],
      ["Reboot every affected computer immediately and hope encryption stops", "Rushed reboots can destroy evidence or worsen disruption."],
      ["Reply to the attacker or pay the demand without incident-team authorization", "Unsafe: unilateral contact or payment creates legal, financial, and recovery risks."],
    ]),
    stress: ["Privileged account anomaly", "A dormant administrator account begins downloading sensitive files. Validate the alert and escalate through the authorized incident process.", "critical"],
    project: ["Produce a ransomware tabletop report", "Run a five-day supervised tabletop, document detection and escalation gaps, and deliver prioritized response improvements."],
  },
  "ux-ui-designer": {
    options: optionSet([
      ["Clarify the business goal, scope a three-day prototype, use existing evidence, and schedule a small validation session", "Correct: a bounded prototype balances urgency with evidence and user needs."],
      ["Ask the design lead and product manager to agree on scope, risks, and a rapid research plan", "Good: consultation aligns decision-makers before the team commits."],
      ["Redraw every screen immediately without checking the problem or design system", "Rushing creates polished work that may solve the wrong problem."],
      ["Publish an untested redesign directly to all users", "Unsafe: an unvalidated release can create accessibility and usability failures."],
    ]),
    stress: ["Accessibility blocker before handoff", "Keyboard testing reveals that a key checkout control is unreachable. Coordinate a compliant fix before engineering handoff.", "high"],
    project: ["Prototype and validate an accessible checkout flow", "In five days, define the problem, prototype the key path, run lightweight usability checks, and document prioritized revisions."],
  },
  "cloud-engineer": {
    options: optionSet([
      ["Declare an incident, follow the runbook, assess impact, use an approved rollback or failover, and communicate status", "Correct: controlled recovery and clear incident ownership reduce outage time and secondary failures."],
      ["Join the incident commander and service owners to choose the safest tested recovery path", "Good: coordinated expertise is appropriate for a region-wide failure."],
      ["Change live infrastructure settings until traffic starts moving", "Untracked changes can enlarge the outage and make recovery harder."],
      ["Wait for the cloud provider to fix everything without notifying users or service owners", "Unsafe: the team still owns continuity, communication, and mitigation."],
    ]),
    stress: ["Database capacity alarm", "A production database is nearing its connection limit. Verify the signal and apply the approved scaling or load-shedding plan.", "high"],
    project: ["Harden a service recovery runbook", "Over five days, test one recovery path in a sandbox, record dependencies and rollback steps, and deliver a reviewed runbook."],
  },
  "game-developer": {
    options: optionSet([
      ["Triage player-impacting defects, cut nonessential scope, protect testing time, and produce a stable release candidate", "Correct: disciplined scope control protects both quality and the team."],
      ["Review priorities with the producer, QA lead, and discipline leads before resetting the milestone", "Good: production decisions need shared technical and player-impact context."],
      ["Ask everyone to work late and merge unfinished features at the deadline", "Rushed integration raises defect risk and is not a sustainable production plan."],
      ["Skip certification and QA checks so the build ships on the original date", "Unsafe: an untested build can fail platform requirements or harm players."],
    ]),
    stress: ["Save-file corruption found", "QA finds a build that can corrupt player progress. Reproduce it, stop the candidate build, and coordinate a tested fix or rollback.", "critical"],
    project: ["Deliver a tested vertical-slice feature", "Implement one bounded gameplay feature, review it with design and art, test edge cases, and present a stable build by day five."],
  },
  "ai-ml-engineer": {
    options: optionSet([
      ["Move traffic to the approved safe fallback, alert the model owner, preserve monitoring data, and investigate drift before redeployment", "Correct: containment and evidence come before retraining or restoring traffic."],
      ["Consult MLOps, product, and model-risk owners to set rollback criteria and an investigation plan", "Good: cross-functional review helps manage user and business impact."],
      ["Retrain immediately on the newest data and deploy without validation", "Rushed retraining can encode bad data or create new failures."],
      ["Leave the degraded model live because no one has complained yet", "Unsafe: silent model failures can affect many users before reports arrive."],
    ]),
    stress: ["Bias metric crosses its threshold", "Monitoring shows a protected group is receiving materially different outcomes. Pause expansion and start the approved fairness review.", "critical"],
    project: ["Build a monitored model-release plan", "In five days, define validation gates, fallback behavior, drift and fairness alerts, and an approval-ready release checklist."],
  },
  "financial-analyst": {
    options: optionSet([
      ["Clarify the decision, build the valuation from approved data, test key assumptions, and label uncertainties before delivery", "Correct: a transparent model is more useful than a rushed number without context."],
      ["Review the scope and assumptions with the finance manager and relevant business owner", "Good: consultation prevents a technically neat model from answering the wrong question."],
      ["Copy last year's model and change the headline inputs without checking formulas", "Rushing can carry hidden errors into a high-stakes recommendation."],
      ["Invent missing figures so the model looks complete by morning", "Unsafe and unethical: fabricated inputs make the analysis misleading."],
    ]),
    stress: ["Forecast variance discovered", "A major variance appears shortly before the executive review. Trace the source, document assumptions, and update stakeholders.", "high"],
    project: ["Deliver a decision-ready operating forecast", "Build a five-day revenue and cost forecast with documented assumptions, scenario analysis, quality checks, and a concise recommendation."],
  },
  "human-resources-manager": {
    options: optionSet([
      ["Protect confidentiality, explain anti-retaliation safeguards, document neutral facts, and follow the formal investigation process", "Correct: a fair process protects the reporter, the accused, and the integrity of the review."],
      ["Consult the designated HR investigator or counsel while limiting information to those who need it", "Good: sensitive complaints often require specialist guidance and careful access control."],
      ["Confront the accused informally before preserving the report and evidence", "Rushing can trigger retaliation or contaminate the investigation."],
      ["Dismiss the complaint because there is not yet a witness", "Unsafe: concerns must be assessed through a fair, evidence-based process."],
    ]),
    stress: ["Possible retaliation report", "An employee says their shifts changed after making a complaint. Preserve records and initiate the anti-retaliation review process.", "high"],
    project: ["Improve a fair complaint-intake process", "Map the five-day intake workflow, clarify confidentiality and anti-retaliation messages, and deliver a consistent documentation checklist."],
  },
  "product-manager": {
    options: optionSet([
      ["Restate the user outcome and decision criteria, hear each engineer's evidence, and time-box a test or assign a clear decider", "Correct: structured facilitation turns disagreement into a testable product decision."],
      ["Bring in the engineering manager or architect to review the disputed constraints and ownership", "Good: consultation helps when the tradeoff exceeds product authority."],
      ["Choose the louder engineer's proposal to end the meeting quickly", "Rushing rewards volume rather than evidence."],
      ["Ignore the conflict and let both approaches ship", "Unsafe: duplicated or incompatible work can jeopardize the release."],
    ]),
    stress: ["Critical dependency slips", "A partner team delays an API needed for launch. Reassess scope, alternatives, ownership, and stakeholder communication.", "high"],
    project: ["Define and validate a minimum viable release", "In five days, synthesize user evidence, write measurable outcomes, align technical scope, and present a prioritized launch plan."],
  },
  "management-consultant": {
    options: optionSet([
      ["Validate the analyses, synthesize a clear recommendation with risks, and rehearse likely steering-committee questions", "Correct: decision-ready work combines evidence, tradeoffs, and clear communication."],
      ["Review the recommendation and unresolved assumptions with the engagement lead and client subject-matter expert", "Good: targeted consultation closes gaps without hiding uncertainty."],
      ["Polish the slides first and leave weak calculations for later", "Rushing the presentation can conceal a fragile recommendation."],
      ["Remove caveats so the recommendation sounds certain", "Unsafe and misleading: leaders need material uncertainty to make a sound decision."],
    ]),
    stress: ["Client data contradicts the hypothesis", "New operational data undermines the draft recommendation. Re-test the analysis and brief the engagement lead before the client meeting.", "high"],
    project: ["Deliver an evidence-based operating recommendation", "Over five days, analyze a bounded client problem, validate assumptions, compare options, and present a practical implementation roadmap."],
  },
  "electrician": {
    options: optionSet([
      ["Stop work, de-energize the circuit, apply lockout/tagout, verify absence of voltage, and proceed only if qualified and authorized", "Correct: eliminating and verifying the electrical hazard comes before troubleshooting."],
      ["Secure the area and consult the supervising licensed electrician about the approved work plan", "Good: escalation keeps the task within training, qualification, and site rules."],
      ["Work quickly with insulated tools while the panel remains live", "Unsafe even when rushed work uses protective tools; energized work requires strict authorization and controls."],
      ["Touch or bypass the suspected component to see whether the fault clears", "Unsafe: direct contact or bypassing protection can be fatal."],
    ]),
    stress: ["Unexpected backfeed detected", "A supposedly isolated circuit still tests energized. Stop, protect the area, and have the qualified supervisor identify the source.", "critical"],
    project: ["Document a safe branch-circuit installation", "Over five days, produce a supervised plan, materials list, code checks, lockout steps, test results, and inspection-ready documentation."],
  },
  "plumber": {
    options: optionSet([
      ["Isolate the area, use required biohazard controls and PPE, stop the source if authorized, and notify the site and public-health contacts", "Correct: containment and exposure control come before restoring service."],
      ["Call the licensed supervisor and facility manager to coordinate shutdown, cleanup, and customer protection", "Good: a sewage incident needs coordinated trade and facility decisions."],
      ["Clear the blockage immediately without first controlling exposure or the public area", "Rushing can spread contamination and expose workers and customers."],
      ["Leave the backup flowing until the restaurant closes", "Unsafe: ongoing sewage exposure is a health hazard."],
    ]),
    stress: ["Hidden supply line bursts", "Water begins entering a finished wall. Protect occupants, isolate the approved shutoff, and coordinate damage control.", "critical"],
    project: ["Plan a code-compliant restroom repair", "Inspect the issue under supervision, document fixtures and permits, prepare a materials plan, and deliver tested repair documentation in five days."],
  },
  "hvac-technician": {
    options: optionSet([
      ["Protect food and occupants, isolate electrical hazards, diagnose with approved procedures, and handle refrigerant only within certification", "Correct: the response controls product, electrical, and refrigerant risks before repair."],
      ["Consult the licensed lead and restaurant manager on temporary storage and an authorized repair plan", "Good: coordinated action protects food safety while keeping technical work in scope."],
      ["Add refrigerant immediately without leak testing or confirming the fault", "Rushing can be illegal, unsafe, and ineffective."],
      ["Bypass the freezer's safety controls to keep it running through dinner", "Unsafe: bypassed controls can damage equipment or create electrical and refrigerant hazards."],
    ]),
    stress: ["Carbon-monoxide alarm after service", "A building alarm activates after a heating repair. Evacuate and follow emergency and licensed-testing protocols before re-entry.", "critical"],
    project: ["Complete a supervised HVAC efficiency assessment", "Over five days, document system condition, safe test results, maintenance needs, and prioritized recommendations without unauthorized repair."],
  },
  "welder": {
    options: optionSet([
      ["Stop release, compare the weld with the WPS and inspection report, perform the authorized repair, and obtain reinspection", "Correct: traceable repair and reinspection protect structural quality."],
      ["Review the defect and repair procedure with the welding supervisor and inspector", "Good: consultation confirms acceptance criteria and the authorized repair method."],
      ["Grind and cover the visible defect quickly without documenting it", "Rushing hides evidence and does not prove the weld is sound."],
      ["Ship the part despite the failed inspection", "Unsafe: a rejected weld must not enter service."],
    ]),
    stress: ["Shielding-gas contamination", "Porosity appears across a new batch. Stop production and verify gas, setup, material condition, and WPS compliance.", "high"],
    project: ["Produce an inspection-ready weld sample", "Follow a selected WPS, document setup and safety checks, create test coupons, and submit them for qualified inspection by day five."],
  },
  "graphic-designer": {
    options: optionSet([
      ["Compare each option with the brief, explain accessibility and audience tradeoffs, and refine the client's choice with informed consent", "Correct: the designer advises clearly while respecting the client's decision."],
      ["Ask the creative director and client to review the brief and choose which tradeoffs matter most", "Good: a shared review can resolve preference conflicts without treating taste as fact."],
      ["Replace the client's selection overnight without discussing the change", "Rushing bypasses alignment and creates avoidable rework."],
      ["Tell the client their taste is wrong and refuse to document the decision", "Unprofessional: critique should connect to evidence and the agreed brief."],
    ]),
    stress: ["Brand asset rights unclear", "A supplied image may not be licensed for the campaign. Pause its use and confirm rights or select an approved alternative.", "high"],
    project: ["Create and present a focused campaign toolkit", "In five days, develop a brief-led concept, accessible core assets, usage notes, and a client presentation with clear tradeoffs."],
  },
  "video-editor": {
    options: optionSet([
      ["Protect the current master, clarify essential changes, estimate impact, and propose a scoped version that can be reviewed before delivery", "Correct: version control and transparent scope protect both the story and deadline."],
      ["Review the request with the producer and director to prioritize changes and approve a revised delivery plan", "Good: consultation aligns creative authority and schedule."],
      ["Destructively recut the only project file and export without review", "Rushing risks losing the approved cut and introducing errors."],
      ["Say nothing and miss delivery without preserving or sharing a usable version", "Unsafe for the production: silence removes every recovery option."],
    ]),
    stress: ["Primary edit drive stops mounting", "The active storage volume fails before export. Stop write attempts and use the approved backup or recovery workflow.", "critical"],
    project: ["Deliver a review-ready short documentary cut", "Organize media, build a coherent rough cut, complete sound and accessibility checks, and deliver a versioned review export in five days."],
  },
  "journalist": {
    options: optionSet([
      ["Verify the claim with independent sources and records, document uncertainty, and obtain editor or legal review before publication", "Correct: being first never outweighs verification and harm-aware review."],
      ["Alert the editor and consult the relevant subject expert while continuing independent verification", "Good: consultation strengthens accuracy without transferring reporting responsibility."],
      ["Publish the single-source claim with a vague disclaimer", "Rushing can amplify false information and harm people."],
      ["Invent a confirming quote so competitors do not beat you", "Unethical: fabricated sourcing destroys trust and can cause serious harm."],
    ]),
    stress: ["Source retracts a key detail", "A source changes their account minutes before publication. Pause, re-verify the disputed point, and brief the editor.", "high"],
    project: ["Publish a verified local accountability story", "Over five days, define a narrow question, gather records and multiple sources, fact-check, obtain editorial review, and prepare a transparent final piece."],
  },
  "musician-composer": {
    options: optionSet([
      ["Check both contracts, contact both organizers promptly, honor the binding commitment, and propose a qualified substitute or new date for the other", "Correct: early, honest coordination protects relationships and contractual obligations."],
      ["Ask your manager or ensemble leader to review the commitments and help negotiate an acceptable solution", "Good: representation can clarify obligations and alternatives."],
      ["Wait until the day of the shows and choose whichever pays more", "Rushing at the last moment leaves both productions exposed."],
      ["Promise to perform both overlapping gigs and simply miss part of each", "Unprofessional and unsafe for the events: impossible commitments damage everyone involved."],
    ]),
    stress: ["Session files use the wrong tempo map", "A collaborator finds timing drift before delivery. Preserve versions, confirm the reference, and coordinate a focused correction pass.", "high"],
    project: ["Produce a polished three-minute demo", "In five days, define the arrangement, record or sequence core parts, revise with feedback, and deliver a labeled mix plus credits."],
  },
  "police-officer": {
    options: optionSet([
      ["Follow agency policy, request backup, separate involved people when safe, check injuries and weapons, and connect the victim with protection resources", "Correct: a coordinated, policy-based response prioritizes immediate safety and evidence."],
      ["Maintain a safe position and consult the responding supervisor while backup and specialist resources arrive", "Good: supervision supports lawful decisions in a volatile call."],
      ["Rush inside alone and decide who is at fault from the first account", "Unsafe and unreliable: solo entry and premature conclusions can escalate danger."],
      ["Treat it as a private argument and leave without assessing risk", "Unsafe: domestic-violence calls require a lawful safety assessment and documentation."],
    ]),
    stress: ["Missing child report escalates", "New location information arrives during a search. Update dispatch and the incident lead, preserve coordination, and follow local policy.", "critical"],
    project: ["Prepare a supervised community-safety briefing", "Analyze a bounded local concern, verify data with a supervisor, coordinate resources, and deliver a prevention-focused briefing in five days."],
  },
  "firefighter": {
    options: optionSet([
      ["Report to incident command, use required PPE and crew accountability, complete the assigned size-up or task, and maintain radio contact", "Correct: command, PPE, and crew integrity are essential at a structure fire."],
      ["Stage with your crew and ask the company officer to confirm assignment, hazards, and backup resources", "Good: consultation through command prevents freelancing."],
      ["Enter alone to search quickly before the rest of the crew is ready", "Unsafe: freelancing breaks accountability and can create another victim."],
      ["Ignore the alarm because another unit will probably handle it", "Unsafe: assigned responders must acknowledge and follow dispatch and command."],
    ]),
    stress: ["Mayday transmitted inside structure", "A crew reports distress. Follow incident command and rapid-intervention procedures while maintaining accountability.", "critical"],
    project: ["Complete a pre-incident safety plan", "Over five days, survey an assigned building with authorization and produce access, hazard, water-supply, and occupant notes for officer review."],
  },
  "social-worker": {
    options: optionSet([
      ["Complete the immediate safety assessment, consult the supervisor, document facts, and follow the jurisdiction's child-protection and court process", "Correct: one worker does not make an unsupported removal decision alone."],
      ["Keep the child safe and consult the child-protection supervisor and appropriate multidisciplinary partners", "Good: urgent consultation brings legal and clinical context to the safety plan."],
      ["Promise the family a final outcome before the assessment and approvals are complete", "Rushing or overpromising can undermine safety and due process."],
      ["Leave the concern undocumented because removal feels too disruptive", "Unsafe: credible risks require assessment, documentation, and statutory follow-through."],
    ]),
    stress: ["Safety-plan placement falls through", "A planned caregiver is suddenly unavailable. Keep the child protected and coordinate an authorized alternative with the supervisor.", "critical"],
    project: ["Develop a supervised family safety plan", "In five days, organize verified needs, strengths, contacts, review points, and approved services for supervisor and family discussion."],
  },
  "diplomat-foreign-service-officer": {
    options: optionSet([
      ["Verify the citizen's status, follow consular-access procedures, notify the duty and security chain, document contacts, and provide authorized assistance", "Correct: consular support must follow host-country law, policy, and secure reporting."],
      ["Consult the consular chief, legal adviser, and regional security officer before making commitments", "Good: a coordinated embassy response avoids exceeding authority."],
      ["Personally confront local officials and promise immediate release", "Rushing can endanger the citizen and exceed consular authority."],
      ["Ignore the arrest because local law applies", "Unsafe and improper: consular officers still have notification, welfare, and assistance duties."],
    ]),
    stress: ["Civil unrest closes normal routes", "Security reports rapidly changing demonstrations near staff housing. Follow emergency-action guidance and begin authorized accountability checks.", "critical"],
    project: ["Prepare a consular contingency briefing", "Over five days, verify contacts, map approved communication and accountability steps, and present a country-specific briefing for leadership review."],
  },
  "chef": {
    options: optionSet([
      ["Protect food safety, simplify the menu, reassign stations by skill, communicate wait times, and pace reservations with front of house", "Correct: controlled scope and clear coordination protect guests and the team."],
      ["Review the reduced service plan with the sous-chef and restaurant manager before opening", "Good: shared decisions align kitchen capacity and guest communication."],
      ["Keep the full menu and push the remaining cooks to work every station faster", "Rushing increases injury, quality, and food-safety risk."],
      ["Ignore staffing limits and serve food that has missed required safety checks", "Unsafe: service pressure never excuses food-safety failures."],
    ]),
    stress: ["Walk-in temperature rises", "Cold storage moves outside its safe range during prep. Protect food, log temperatures, and follow the approved disposition and repair process.", "critical"],
    project: ["Launch a safe seasonal special", "In five days, test one dish, calculate cost and allergens, write prep and service instructions, train the team, and review guest feedback."],
  },
  "hotel-manager": {
    options: optionSet([
      ["Activate the outage plan, verify life-safety systems, contact emergency and utility partners, assign staff zones, and communicate clearly with guests", "Correct: life safety, accountability, and calm communication come before normal service."],
      ["Coordinate with the general manager, engineering lead, security, and restaurant manager on the emergency plan", "Good: a hotel-wide outage requires delegated leadership and specialist input."],
      ["Focus only on check-in speed while staff improvise lighting and elevator decisions", "Rushing one queue ignores building-wide safety."],
      ["Tell guests nothing and wait for the power to return", "Unsafe: silence leaves guests and staff without life-safety guidance."],
    ]),
    stress: ["Fire panel reports a fault", "A life-safety panel reports a fault during a sold-out evening. Follow the hotel's emergency and fire-service notification procedure.", "critical"],
    project: ["Improve the hotel disruption-response plan", "Over five days, map guest communication, accessibility, staffing, vendor, and life-safety responsibilities and run a tabletop review."],
  },
  "environmental-scientist": {
    options: optionSet([
      ["Stop unprotected work, assess hazards, establish contamination controls, use the approved sampling plan and PPE, and preserve chain of custody", "Correct: defensible data starts with worker safety and controlled sampling."],
      ["Consult the site safety officer and project lead before adapting the sampling plan to changing conditions", "Good: authorized changes protect people and data quality."],
      ["Collect samples quickly without updating zones, PPE, or field notes", "Rushing can expose the team and make samples unusable."],
      ["Enter the spill area alone because conditions may change", "Unsafe: unknown hazards require approved controls and team coordination."],
    ]),
    stress: ["Storm threatens sample integrity", "Heavy rain approaches an active site. Protect the team, secure samples, and document any limits on comparability.", "high"],
    project: ["Complete a defensible site-assessment summary", "Plan and document supervised sampling, quality controls, chain of custody, findings, limitations, and recommended next steps over five days."],
  },
  "meteorologist": {
    options: optionSet([
      ["Confirm radar and ground evidence, follow the approved warning workflow, state precise locations and timing, and repeat actionable shelter guidance", "Correct: authorized, specific, repeated guidance helps viewers act immediately."],
      ["Coordinate with the warning meteorologist and producer to verify wording, graphics, and affected communities", "Good: consultation improves accuracy without delaying urgent approved communication."],
      ["Announce a broad tornado warning from one unverified social-media report", "Rushing can cause panic and erode trust."],
      ["Continue regular programming without mentioning the confirmed threat", "Unsafe: withholding authorized severe-weather guidance can put viewers at risk."],
    ]),
    stress: ["Radar feed drops during severe weather", "The primary radar feed fails while storms intensify. Switch to approved redundant sources and clearly communicate uncertainty.", "critical"],
    project: ["Produce a five-day severe-weather coverage plan", "Create forecast updates, approved warning graphics, accessible safety language, verification steps, and a producer-reviewed broadcast rundown."],
  },
  "personal-trainer": {
    options: optionSet([
      ["Stop the exercise, make the area safe, assess for emergency warning signs within training, and activate the facility response or refer appropriately", "Correct: trainers pause activity and escalate rather than diagnose or treat injuries."],
      ["Ask the facility lead or on-site medical professional to assess while you support the client", "Good: qualified help keeps the response within the trainer's scope."],
      ["Switch to a lighter version of the painful movement without assessing the complaint", "Rushing can worsen an injury and exceeds safe coaching."],
      ["Tell the client to work through sharp pain to finish the session", "Unsafe: sharp or concerning pain requires stopping and appropriate referral."],
    ]),
    stress: ["Client becomes faint", "A client becomes pale and unsteady after exercise. Stop activity and follow the gym's emergency response plan.", "critical"],
    project: ["Build a safe beginner training block", "Over five days, screen goals within scope, draft progressive sessions and recovery guidance, and obtain supervisor feedback on modifications and referral limits."],
  },
  "physical-therapist-assistant": {
    options: optionSet([
      ["Stop gait training, guard the patient, check the planned safety measures, document the response, and promptly notify the supervising PT", "Correct: the PTA protects the patient and works within the PT-established plan."],
      ["Keep the patient safe and consult the supervising PT before changing the intervention", "Good: the PT is responsible for evaluation and material plan changes."],
      ["Create a new treatment plan independently so the session can continue", "Outside scope: a PTA does not independently evaluate or replace the PT's plan."],
      ["Force the patient to continue despite panic or new symptoms", "Unsafe: patient distress and clinical change require a pause and escalation."],
    ]),
    stress: ["New neurological symptom appears", "A patient reports sudden new weakness during treatment. Stop, protect the patient, and immediately alert the supervising PT and medical team per protocol.", "critical"],
    project: ["Document a supervised mobility-progress summary", "Across five days, deliver assigned interventions, track objective responses, reinforce PT-approved education, and prepare a summary for PT review."],
  },
  "school-counselor": {
    options: optionSet([
      ["Listen calmly, explain the limits of confidentiality, ensure immediate safety, and make the required report through school and jurisdictional procedures", "Correct: support and mandated reporting must happen without conducting your own investigation."],
      ["Keep the student supported while consulting the designated safeguarding lead and required reporting channel", "Good: consultation helps follow policy without delaying protection."],
      ["Question the student repeatedly to prove every detail before reporting", "Rushing into an investigation can distress the student and compromise the proper process."],
      ["Promise secrecy and wait to see whether the student mentions it again", "Unsafe: counselors cannot promise secrecy when mandatory safety exceptions apply."],
    ]),
    stress: ["Student expresses immediate self-harm risk", "A student reports an immediate safety concern. Maintain supervision and activate the school's crisis and caregiver/emergency notification protocol.", "critical"],
    project: ["Design a student-support referral pathway", "Over five days, map confidential intake, mandatory exceptions, staff roles, accessible resources, follow-up, and team-review steps."],
  },
  "public-relations-specialist": {
    options: optionSet([
      ["Verify known facts, acknowledge the issue, state immediate protective action, avoid speculation, and route a holding statement for authorized approval", "Correct: a fast, factual, approved statement supports affected people and credibility."],
      ["Convene legal, product-safety, and executive owners to confirm facts, spokesperson, and update timing", "Good: crisis communication needs accountable subject-matter review."],
      ["Post an unapproved defense that blames users so the brand responds first", "Rushing an accusatory claim can deepen harm and create legal risk."],
      ["Delete comments and say nothing while the malfunction spreads", "Unsafe: silence and suppression leave customers without useful safety information."],
    ]),
    stress: ["Spokesperson contradicts approved facts", "A live interview creates a conflicting statement. Correct the record through the approved channel and update the response team.", "high"],
    project: ["Build an accountable product-crisis communication kit", "In five days, prepare a fact log, stakeholder map, holding statement, FAQ, approval flow, and update schedule for a tabletop review."],
  },
  "content-creator-youtuber": {
    options: optionSet([
      ["Review retention, click-through, audience comments, and topic fit; form one testable hypothesis and run a limited follow-up experiment", "Correct: disciplined iteration uses several signals rather than chasing one view count."],
      ["Ask an experienced editor or creator partner to review the hook, packaging, and audience promise", "Good: outside feedback can expose a mismatch the creator cannot see alone."],
      ["Copy a trending video immediately and change the channel niche without checking audience fit", "Rushing after one result creates noisy data and weakens trust."],
      ["Buy fake views or engagement to make the video look successful", "Unsafe and deceptive: manipulated engagement can violate platform rules and harm the channel."],
    ]),
    stress: ["Sponsor request conflicts with audience trust", "A sponsor asks for an undisclosed claim you cannot verify. Decline or revise it and follow disclosure rules.", "high"],
    project: ["Produce and evaluate a responsible content pilot", "In five days, research one audience need, script and produce a short piece, complete rights and disclosure checks, publish safely, and review early metrics."],
  },
  "e-commerce-entrepreneur": {
    options: optionSet([
      ["Pause overselling, reconcile real inventory, contact fulfillment partners, publish honest timelines, and offer customers choices", "Correct: transparent capacity management protects customers and cash flow."],
      ["Consult the fulfillment lead and financial adviser on a staged shipping and refund plan", "Good: operations and cash constraints should be reviewed together."],
      ["Accept every order and buy unverified inventory at any price", "Rushing can create quality, fraud, and cash-flow failures."],
      ["Keep charging customers while hiding that most orders cannot ship", "Unsafe and deceptive: customers need accurate availability and remedies."],
    ]),
    stress: ["Payment processor freezes payouts", "Payouts pause while orders continue. Verify the notice, protect cash, and communicate only confirmed impacts and options.", "high"],
    project: ["Launch a controlled storefront pilot", "Over five days, validate one product, document landed cost and return terms, configure accurate inventory, test checkout, and review a small pilot."],
  },
  "supply-chain-analyst": {
    options: optionSet([
      ["Quantify inventory and lead-time impact, model approved routing alternatives, flag constraints, and recommend options to decision owners", "Correct: the analyst supplies timely evidence while authorized leaders choose contracts and commitments."],
      ["Review assumptions with logistics, procurement, and launch owners before finalizing the recommendation", "Good: cross-functional consultation catches operational and commercial constraints."],
      ["Book an expensive alternate route without checking capacity, cost, or authority", "Rushing exceeds analyst authority and can create a second disruption."],
      ["Hide the delay until launch day", "Unsafe for the business: late disclosure removes mitigation options."],
    ]),
    stress: ["Supplier quality hold", "A key shipment is quarantined after inspection. Model production impact and brief authorized owners on verified alternatives.", "high"],
    project: ["Deliver a resilient launch-supply analysis", "In five days, map critical materials, quantify disruption scenarios, compare approved mitigation options, and present recommendations without making supplier commitments."],
  },
  "athletic-trainer-coach": {
    options: optionSet([
      ["Remove the athlete from play, perform the athletic trainer's approved assessment, activate emergency criteria when indicated, and document the clinical decision", "Correct: health and protocol—not game pressure—control the immediate decision."],
      ["Keep the athlete out and consult the team physician or supervising clinician before any return-to-play progression", "Good: medical consultation is appropriate when findings or authority require it."],
      ["Let the athlete try one more play because they say they feel better", "Unsafe: a rushed field test is not a formal return-to-play process."],
      ["Allow the coach or athlete to overrule the medical restriction", "Unsafe: non-clinical pressure cannot replace qualified medical clearance."],
    ]),
    stress: ["Possible heat illness at practice", "An athlete becomes confused in hot conditions. Stop participation and activate the venue's emergency heat-illness protocol.", "critical"],
    project: ["Build an injury-prevention and escalation plan", "Over five days, review injury patterns, design an evidence-based prevention session, define emergency roles, and obtain supervising clinician approval."],
  },
  "airline-pilot": {
    options: optionSet([
      ["Fly the aircraft, complete the aircraft-specific memory items and checklist with pilot-flying/pilot-monitoring coordination, declare as needed, brief cabin crew, and assess diversion", "Correct: disciplined crew coordination and the approved checklist manage the aircraft and emergency together."],
      ["Maintain control while the other pilot confirms the checklist, contacts ATC and company resources, and evaluates the nearest suitable airport", "Good: this is active crew-resource management, not handing away command responsibility."],
      ["Troubleshoot switches from memory alone before assigning crew roles or informing ATC", "Unsafe: uncoordinated action can worsen the emergency and misses checklist safeguards."],
      ["Silence the warning and continue to destination unless flames become visible", "Unsafe: an engine-fire warning demands immediate aircraft-specific response and diversion assessment."],
    ]),
    stress: ["Runway condition changes on approach", "Braking reports worsen below planned limits. Recalculate with the crew and dispatch, then divert or hold if a safe landing is not assured.", "critical"],
    project: ["Complete a crew-reviewed diversion plan", "Across five days, prepare weather, fuel, alternate, passenger, cabin, and dispatch considerations for a simulator scenario and debrief decisions."],
  },
  "real-estate-agent": {
    options: optionSet([
      ["Identify the verified closing blocker, inform the client promptly, coordinate authorized professionals, document options, and protect contractual deadlines", "Correct: transparent process management helps the client decide without unauthorized legal or lending advice."],
      ["Consult the supervising broker and relevant lender, title, inspection, or legal professional about available options", "Good: specialist input keeps the agent within scope."],
      ["Promise the closing will happen and pressure everyone to sign before the issue is understood", "Rushing can expose the client to financial and contractual harm."],
      ["Stop responding until after the closing date passes", "Unsafe for the transaction: missed notices and deadlines can remove client options."],
    ]),
    stress: ["Material property issue disclosed", "A new defect is reported after an offer is accepted. Document it, notify the client and broker, and direct technical or legal questions to qualified professionals.", "high"],
    project: ["Prepare a compliant buyer-service portfolio", "In five days, create a needs interview, verified market comparison, showing plan, disclosure checklist, and follow-up process without promising a deal outcome."],
  },
};

const additionalColleagues = {
  "chef": ["Maya Ortiz", "Sous-Chef", "Coordinates stations and food-safety checks."],
  "personal-trainer": ["Jordan Brooks", "Facility Safety Lead", "Supports safe sessions and emergency response."],
  "physical-therapist-assistant": ["Dr. Lena Morris", "Supervising Physical Therapist", "Reviews patient changes and plan-of-care decisions."],
  "content-creator-youtuber": ["Avery Singh", "Editor and Rights Coordinator", "Reviews story structure, licensing, and disclosures."],
  "e-commerce-entrepreneur": ["Noah Williams", "Fulfillment Operations Adviser", "Checks inventory, shipping capacity, and returns."],
  "airline-pilot": ["Captain Elena Park", "Training Captain", "Coaches checklist discipline and crew-resource management."],
  "real-estate-agent": ["Morgan Ellis", "Transaction Coordinator", "Tracks documents, disclosures, and deadlines."],
};

const saferWeakActions = {
  "pharmacist": ["Keep dispensing on hold, but send a generic clarification request without first reviewing the patient record", "The hold protects the patient, but an incomplete review can delay or confuse the prescriber response."],
  "physical-therapist": ["Pause and reassure the patient, but delay the symptom, vital-sign, and fall-risk reassessment", "Stopping helps, but delayed reassessment and documentation miss important clinical information."],
  "dentist": ["Pause the procedure, but focus on schedule changes instead of reassessing the patient and renewing consent", "The pause reduces immediate pressure, but patient needs and consent still require attention."],
  "veterinarian": ["Move other clients away, but leave the dog in the busy room while waiting for handling advice", "Reducing bystanders helps, but the environment and handling plan still need prompt attention."],
  "biomedical-scientist": ["Quarantine the samples, but delay logging the transfer and checking validated stability limits", "Quarantine is useful, but delayed records and stability review weaken traceability."],
  "cybersecurity-analyst": ["Collect screenshots and wait for more alerts before declaring the incident or preserving broader evidence", "Initial notes help, but delayed coordination can increase impact and lose evidence."],
  "cloud-engineer": ["Freeze further changes, but wait for provider updates without checking the approved rollback or failover plan", "Preventing extra changes helps, but passive waiting delays owned recovery actions."],
  "ai-ml-engineer": ["Move traffic to the fallback, but postpone preserving monitoring data and investigating the drift", "The fallback limits impact, but delayed evidence collection makes diagnosis harder."],
  "electrician": ["Secure the panel area, but wait without starting the required de-energization and verification process", "Restricting access helps, but the authorized safety process should begin promptly."],
  "plumber": ["Close the public area, but delay documenting exposures and coordinating approved cleanup", "The barrier reduces contact, but containment and cleanup coordination remain incomplete."],
  "hvac-technician": ["Protect the food and shut the equipment down, but delay gathering approved diagnostic information for the licensed technician", "Shutdown limits harm, but incomplete information slows a safe repair."],
  "welder": ["Keep the part on hold, but delay comparing the defect with the WPS and documenting a repair plan", "The part remains out of service, but quality work cannot proceed without timely review."],
  "police-officer": ["Request backup, but delay injury, weapon, and victim-safeguarding checks after the scene is controlled", "Backup helps, but delayed safety checks can leave urgent needs unaddressed."],
  "firefighter": ["Remain outside with your crew, but wait for instructions without giving command an updated size-up", "Crew integrity is protected, but missing information can slow the incident plan."],
  "social-worker": ["Document the concern, but wait until the end of the day to consult the supervisor and protection process", "Documentation matters, but a credible child-safety concern requires prompt escalation."],
  "environmental-scientist": ["Stop sampling, but delay documenting changed conditions and obtaining an approved revised plan", "Stopping exposure is appropriate, but delayed records and planning can compromise the investigation."],
  "meteorologist": ["Repeat an authorized general warning, but omit the specific locations, timing, and shelter guidance", "The warning is real, but vague delivery gives viewers too little help to act."],
  "personal-trainer": ["Stop the exercise, but end the session without checking emergency warning signs or explaining referral", "Stopping is appropriate, but the client still needs a scope-appropriate safety check and next step."],
  "physical-therapist-assistant": ["Stop the activity, but wait until routine handoff to document the change and notify the PT", "Stopping protects the patient, but delayed reporting can postpone needed reassessment."],
  "school-counselor": ["Make the required report, but provide vague documentation and no plan for supporting the student afterward", "Reporting is essential, but careful documentation and continued support are also part of the response."],
  "athletic-trainer-coach": ["Keep the athlete out for the game, but skip formal documentation and the staged follow-up plan", "The immediate restriction is safe, but continuity of clinical care requires records and follow-up."],
  "airline-pilot": ["Maintain control and notify ATC, but delay checklist cross-check and cabin coordination until workload drops", "Aircraft control and ATC contact help, but incomplete crew coordination weakens the emergency response."],
};

const metadataCorrections = {
  "nurse": { educationYears: 3 },
  "civil-engineer": { environment: "office-field" },
  "teacher": { educationYears: 4, workStyle: "collaborative", environment: "school-classroom" },
  "lawyer": { workStyle: "mixed" },
  "psychologist": { title: "Clinical Psychologist", educationYears: 8, workStyle: "collaborative", environment: "clinic-office" },
  "architect": { environment: "office-field" },
  "pharmacist": { environment: "community-pharmacy", workStyle: "collaborative" },
  "physical-therapist": { environment: "clinic", workStyle: "collaborative" },
  "dentist": { environment: "dental-clinic", workStyle: "collaborative" },
  "veterinarian": { environment: "veterinary-clinic", workStyle: "collaborative" },
  "biomedical-scientist": { environment: "laboratory", workStyle: "collaborative" },
  "cybersecurity-analyst": { environment: "office-remote", workStyle: "collaborative" },
  "ux-ui-designer": { workStyle: "mixed" },
  "cloud-engineer": { workStyle: "collaborative" },
  "financial-analyst": { workStyle: "collaborative" },
  "human-resources-manager": { workStyle: "collaborative" },
  "product-manager": { workStyle: "collaborative" },
  "graphic-designer": { workStyle: "mixed" },
  "journalist": { category: "Media & Communications", workStyle: "mixed", environment: "office-field" },
  "police-officer": { educationYears: 1, workStyle: "collaborative", environment: "field" },
  "firefighter": { educationYears: 1, workStyle: "collaborative", environment: "station-field" },
  "social-worker": { title: "Child Welfare Social Worker", workStyle: "collaborative", environment: "office-field" },
  "chef": { environment: "commercial-kitchen", workStyle: "collaborative" },
  "electrician": { educationYears: 4, workStyle: "collaborative", environment: "field" },
  "plumber": { workStyle: "mixed", environment: "field" },
  "hvac-technician": { workStyle: "mixed", environment: "field" },
  "welder": { educationYears: 1.5, environment: "shop-field" },
  "airline-pilot": { workStyle: "collaborative", environment: "cockpit-travel" },
  "hotel-manager": { environment: "hotel", workStyle: "collaborative" },
  "personal-trainer": { educationYears: 1, environment: "gym-studio", workStyle: "collaborative" },
  "musician-composer": { environment: "studio-stage-remote", workStyle: "mixed" },
  "content-creator-youtuber": { educationYears: 0, demandLevel: "variable", environment: "studio-remote", workStyle: "mixed" },
  "school-counselor": { educationYears: 6, workStyle: "collaborative", environment: "school" },
  "physical-therapist-assistant": { educationYears: 2, workStyle: "collaborative", environment: "clinic" },
  "athletic-trainer-coach": { title: "Athletic Trainer", educationYears: 5, workStyle: "collaborative", environment: "clinic-field" },
  "public-relations-specialist": { workStyle: "collaborative", environment: "office-remote" },
  "e-commerce-entrepreneur": { educationYears: 0, demandLevel: "variable", workStyle: "mixed", environment: "office-warehouse-remote" },
  "supply-chain-analyst": { workStyle: "collaborative", environment: "office-field" },
  "real-estate-agent": { educationYears: 1, demandLevel: "variable", workStyle: "mixed", environment: "office-field" },
  "meteorologist": { title: "Broadcast Meteorologist", workStyle: "collaborative", environment: "studio-office" },
  "diplomat-foreign-service-officer": { title: "U.S. Foreign Service Officer", demandLevel: "competitive", workStyle: "collaborative", environment: "office-field-international" },
};

const safeDescription = (career, item) => {
  const typeLead = {
    break: "Use this protected break to rest and prepare for the next responsibility.",
    meeting: "Coordinate decisions, owners, and next steps with the relevant team.",
    communication: "Share accurate, audience-appropriate information and confirm understanding.",
    field: "Complete the authorized field activity using required safety and documentation procedures.",
    urgent: "Follow the approved escalation process; do not improvise beyond your role or training.",
    critical: "Prioritize immediate safety, protocol, and authorized escalation.",
    review: "Check the work against requirements and record actionable feedback.",
    inbox: "Triage updates by safety, urgency, and impact before responding.",
    travel: "Travel to the assigned location and complete required check-in and safety steps.",
    social: "Build professional relationships while respecting workplace boundaries.",
    teaching: "Deliver the planned learning activity and check student understanding.",
    task: "Complete the assigned work, document the result, and raise constraints early.",
    wrap: "Record progress, hand off open items, and prepare the next safe step.",
  }[item.type] || "Complete the assigned activity within role, policy, and safety limits.";
  return `${career.title}: ${item.title}. ${typeLead}`;
};

const sanitizeText = (text) => text
  .replace(/\s*(Healthcare & Life Sciences|Business & Finance|Skilled Trades|Creative & Media|Modern & Gig|Transportation & Logistics|Science & Environment|Public Service & Law|Hospitality & Service|Sports, Wellness & Lifestyle)\s*\(new\)\s*/g, " ")
  .replace(/Product Designer \(from Software Eng career\)/g, "Product Designer")
  .replace(/M&A;/g, "M&A,")
  .replace(/FP&A\.;/g, "FP&A.")
  .replace(/F&B;/g, "food and beverage,")
  .replace(/Coachs/g, "Coaches")
  .replace(/\s+([.,;:!?])/g, "$1")
  .replace(/\s{2,}/g, " ")
  .trim();

const sanitizeObjectStrings = (value) => {
  if (!value || typeof value !== "object") return;
  Object.keys(value).forEach((key) => {
    if (typeof value[key] === "string") value[key] = sanitizeText(value[key]);
    else sanitizeObjectStrings(value[key]);
  });
};

const replaceDecisionOptions = (career, options, exerciseIndex = 0) => {
  const exercise = career.quickTrial?.exercises?.[exerciseIndex];
  if (exercise) exercise.options = options;
};

const applyOriginalCareerCorrections = (career) => {
  if (career.id === "nurse") {
    const triage = career.quickTrial?.exercises?.[0];
    if (triage?.items) {
      const itemD = triage.items.find((item) => item.id === "d");
      if (itemD) itemD.correctRank = 1;
      const itemA = triage.items.find((item) => item.id === "a");
      if (itemA) itemA.correctRank = 2;
    }
    if (triage) triage.explanation = "Use airway, breathing, and circulation first: falling oxygen is the immediate priority, followed by possible cardiac ischemia, post-operative pain, and the stable admission.";
    replaceDecisionOptions(career, optionSet([
      ["Stay with the patient, check airway, breathing, circulation, glucose and vital signs, note last-known-well, and activate the stroke or rapid-response protocol", "Correct: recognize a time-critical neurological change and activate the local protocol while completing immediate nursing checks."],
      ["Call the charge nurse and medical team immediately while another clinician completes the approved stroke checks", "Good consultation, provided the patient is not left alone and escalation is not delayed."],
      ["Wait fifteen minutes and repeat the assessment before notifying anyone", "Unsafe delay: possible stroke symptoms require immediate protocol-based escalation."],
      ["Give food or water and ask the family to decide whether this is normal", "Unsafe: swallowing may be impaired, and family history must not delay emergency assessment."],
    ]), 1);
    career.guidance.youngAdult = "Common U.S. routes include a two-year ADN or four-year BSN followed by the NCLEX-RN; requirements vary by location. Use supervised clinical training to confirm that patient care fits you.";
  }
  if (career.id === "civil-engineer") {
    career.guidance.teen = "Try safe design projects, city-building tools, or a supervised site tour. Enter active construction areas only with permission, required PPE, and an authorized guide.";
    career.guidance.youngAdult = "Consider an accredited civil-engineering degree, supervised internships, and the FE exam where relevant. PE eligibility and experience timing vary by jurisdiction and specialty.";
  }
  if (career.id === "digital-marketer") {
    replaceDecisionOptions(career, optionSet([
      ["Compare revenue, margin, CPA or ROAS, attribution quality, and sample reliability before shifting a limited test budget", "Correct: sales count alone cannot show which campaign creates profitable, attributable growth."],
      ["Review conversion value and tracking quality with the analytics and creative leads before changing spend", "Good: consultation can reveal attribution or creative differences hidden by the headline counts."],
      ["Move the entire budget to Ad A based only on twenty sales versus five", "Rushed: the apparent winner may have lower-value sales or unreliable attribution."],
      ["Keep both ads running unchanged without checking profitability or tracking", "Weak: ignoring the evidence continues waste and prevents learning."],
    ]));
    career.guidance.teen = "Practice with a fictional brand, school-approved project, or private test account. Protect personal information, obtain adult permission where required, and never spend money or publish someone else's data without consent.";
  }
  if (career.id === "lawyer") {
    replaceDecisionOptions(career, optionSet([
      ["Clarify the facts, advise the client not to continue or rely on the false statement, and consult applicable conduct rules and supervision on correction, disclosure, or withdrawal", "Correct: duties depend on the facts, forum, jurisdiction, and whether the false statement can be remedied."],
      ["Preserve confidentiality while promptly seeking guidance from a supervising or ethics lawyer", "Good: a fact-specific ethics consultation is safer than assuming privilege or disclosure always controls."],
      ["Withdraw immediately without checking whether correction is possible or what the rules require", "Sometimes withdrawal may be required, but acting before reviewing duties can prejudice the client or leave the falsehood unremedied."],
      ["Ignore the admission or report the client automatically without checking the governing rules", "Unsafe: neither silence nor automatic disclosure is a universal ethical answer."],
    ]));
    career.weekTrial.teamProject = { title: "Prepare an ethical case-strategy memorandum", description: "Research governing law, verify the record, identify ethical constraints, and deliver a supervisor-reviewed strategy by Friday." };
    career.guidance.youngAdult = "Research the admissions and median test-score ranges of target law schools rather than treating one LSAT score as universal. Compare debt, employment outcomes, and supervised legal experiences before choosing a JD path.";
  }
  if (career.id === "accountant") {
    const feedback = [
      "Unsupported expenses must not be approved without evidence.",
      "Correct: flag the entry, preserve the record, and investigate through the approved control process.",
      "Ignoring an unexplained material entry undermines reliable reporting.",
      "A memo does not replace supporting documentation and approval controls.",
    ];
    career.quickTrial?.exercises?.[0]?.options?.forEach((option, index) => { option.feedback = feedback[index]; });
    career.guidance.teen = "Practice with fictional, anonymized, or your own budget data. Do not handle a real business's confidential books unless an authorized adult provides close supervision and removes sensitive information.";
  }
  if (career.id === "data-scientist") {
    if (career.quickTrial?.lecture?.sections?.[0]) {
      career.quickTrial.lecture.sections[0].content = "Data preparation often consumes roughly 50–70% of an applied project's effort, depending on data quality and the problem.";
    }
    const dsOption = career.quickTrial?.exercises?.[0]?.options?.find((option) => option.id === "d");
    if (dsOption) dsOption.feedback = "Ignoring missingness can bias results and hide a broken data process.";
  }
  if (career.id === "psychologist") {
    career.description = "Clinical psychologists assess and treat mental-health concerns using evidence-based psychological methods, document care, consult with other professionals, and work within licensure, supervision, consent, and emergency protocols.";
    career.shortDescription = "Assess, treat, and support mental health within clinical scope.";
    career.guidance.youngAdult = "In the U.S., becoming a licensed clinical psychologist usually requires a psychology doctorate, supervised clinical training, internship, examinations, and jurisdiction-specific licensure—often about 8–12 years after secondary school. Counseling, MFT, and social-work licenses are distinct pathways.";
    replaceDecisionOptions(career, optionSet([
      ["Ask directly and calmly about current thoughts, intent, plan, means, and immediate safety, then follow the clinic's risk and emergency protocol", "Correct: a structured, compassionate risk assessment guides the level of response."],
      ["Keep the client engaged and consult the supervisor or crisis team while arranging the protocol-based next step", "Good: consultation supports a safe response without abandoning the client."],
      ["Give a hotline number as the only response and end the session", "Insufficient: resources can help, but they do not replace assessment and an appropriate safety response."],
      ["Change the subject or promise absolute secrecy", "Unsafe: avoidance and false confidentiality promises can leave serious risk unaddressed."],
    ]));
  }
  if (career.id === "architect") {
    career.guidance.youngAdult = "Choose an accredited architecture route appropriate to your jurisdiction, complete required experience such as AXP in the U.S., and learn core design tools. The current U.S. ARE has six divisions; licensing requirements vary by location.";
  }
};

const applyScopeAndTextCorrections = (career) => {
  if (career.id === "dentist" && career.colleagues[1]) {
    career.colleagues[1].name = "Kim Trần";
    career.colleagues[1].systemPrompt = "You are Kim Trần, a dental hygienist who supports anxious patients and safe clinic flow. Keep replies short and realistic.";
    career.dayTrial.schedule.forEach((item) => {
      item.title = item.title.replace("patient chairs", "patient appointments").replace("chairs", "appointments");
    });
  }
  if (career.id === "ux-ui-designer" && career.colleagues[1]) {
    career.colleagues[1].role = "Product Designer";
    career.colleagues[1].systemPrompt = "You are Priya Patel, a user-focused and empathetic product designer. Keep replies short and realistic.";
  }
  if (career.id === "hotel-manager" && career.colleagues[1]) {
    Object.assign(career.colleagues[1], {
      name: "Priya Nair",
      role: "Revenue Manager",
      personality: "Analytical and guest-aware pricing specialist.",
      systemPrompt: "You are Priya Nair, the hotel's revenue manager. Balance pricing, capacity, and guest impact. Keep replies short and realistic.",
    });
  }
  if (career.id === "financial-analyst") {
    career.description = "Corporate financial analysts evaluate operating results, build forecasts, compare scenarios, and explain financial tradeoffs to business leaders. They support decisions with transparent models rather than making investment or deal commitments themselves.";
    career.guidance.youngAdult = "Build accounting, finance, Excel, and communication skills, then seek a supervised FP&A or corporate-finance internship. Credentials such as the CFA are relevant to some investment tracks, not every analyst role.";
  }
  if (career.id === "biomedical-scientist") {
    career.description = "Biomedical scientists conduct laboratory research and testing under validated methods, quality systems, and role-appropriate supervision. Independent study leadership generally requires advanced training and experience.";
    career.guidance.youngAdult = "Choose a laboratory-focused life-science route and build supervised research experience. Training requirements vary: bachelor's or master's graduates often work in technical roles, while independent research leadership commonly requires a doctorate.";
  }
  if (career.id === "social-worker") {
    career.description = "Child welfare social workers assess safety, support families, coordinate services, document evidence, and make recommendations through supervised agency and court processes. They do not independently remove children outside legal and emergency procedures.";
    career.shortDescription = "Protect children and strengthen families through supervised practice.";
  }
  if (career.id === "meteorologist") {
    career.description = "Broadcast meteorologists interpret weather observations and forecasts, coordinate with warning authorities and producers, and communicate clear, actionable information to the public on air and online.";
    career.shortDescription = "Turn weather science into clear public guidance.";
  }
  if (career.id === "diplomat-foreign-service-officer") {
    career.description = "U.S. Foreign Service Officers serve at embassies and consulates in diplomacy, consular work, management, economics, and public engagement. Selection is competitive, assignments vary, and security and host-country procedures shape the work.";
    career.shortDescription = "Represent the United States and support people abroad.";
  }
  if (career.id === "athletic-trainer-coach") {
    career.description = "Athletic trainers are licensed or otherwise regulated healthcare professionals who prevent, assess, and manage sports-related injuries within formal protocols and physician collaboration. Coaches and athletes do not overrule medical restrictions.";
    career.shortDescription = "Protect athlete health through evidence-based clinical care.";
    career.guidance.teen = "Explore sports medicine through supervised first-aid education, anatomy study, and observation of a certified athletic trainer. Do not diagnose injuries or make return-to-play decisions yourself.";
    career.guidance.youngAdult = "In the U.S., pursue a CAATE-accredited professional athletic-training program, pass the BOC exam, and meet state requirements. This pathway is distinct from coaching and strength-and-conditioning credentials.";
    career.quickTrial.lecture.title = "What Athletic Trainers Really Do";
    career.quickTrial.lecture.sections[0].content = "Athletic trainers provide healthcare: prevention, emergency response, assessment, rehabilitation support, documentation, and clinical communication.";
    career.quickTrial.lecture.sections[1] = { type: "myth-vs-reality", myth: "The coach decides when an athlete returns.", reality: "Return-to-play follows qualified clinical evaluation, policy, and a staged protocol." };
    Object.assign(career.colleagues[0], {
      name: "Dr. Marcus Reid",
      role: "Team Physician",
      personality: "Collaborative physician who protects athlete health.",
      systemPrompt: "You are Dr. Marcus Reid, the team physician. Emphasize clinical protocol, shared decisions, and athlete welfare. Keep replies short and realistic.",
    });
  }
  if (career.id === "school-counselor") {
    career.description = "School counselors support academic, career, and social-emotional development, respond to safety concerns, and participate in multidisciplinary teams. Confidentiality has mandatory safety and reporting exceptions, and counselors contribute to rather than own IEP decisions.";
  }
  if (career.id === "physical-therapist-assistant") {
    career.description = "Physical therapist assistants deliver interventions and report patient responses under a physical therapist's direction. The PT performs evaluations, establishes the plan of care, and makes discharge decisions.";
    career.guidance.youngAdult = "Complete an accredited PTA program and local licensure requirements. A PTA credential is a distinct role, not an automatic bridge to a DPT; becoming a PT requires admission to and completion of the relevant professional program.";
  }
  if (career.id === "content-creator-youtuber") {
    career.salaryRange = { min: 0, max: 250000, currency: "USD" };
    career.description = "Content creators research, produce, publish, and evaluate media while managing rights, disclosures, audience trust, and a small business. Earnings are highly variable and many creators earn little or lose money.";
    career.colleagues[0] = {
      id: "creator-editor",
      name: "Riley Chen",
      role: "Channel Editor",
      avatar: "🎬",
      personality: "Audience-focused and candid about sustainable growth.",
      systemPrompt: "You are Riley Chen, a channel editor. Give practical feedback on storytelling, rights, disclosures, and analytics. Keep replies short and realistic.",
    };
    career.quickTrial.lecture.title = "What Content Creators Really Do";
  }
  if (career.id === "real-estate-agent") {
    career.description = "Real estate agents guide clients through property searches, marketing, negotiations, disclosures, and transaction coordination within licensing rules. Income is commission-based, expenses can exceed earnings, and results depend on the market and completed transactions.";
    const mythSection = career.quickTrial?.lecture?.sections?.find((section) => section.type === "myth-vs-reality");
    if (mythSection) mythSection.reality = "Net commission varies by agreement, brokerage split, expenses, taxes, and whether a transaction closes.";
  }
  if (career.id === "e-commerce-entrepreneur") {
    career.description = "E-commerce entrepreneurs test products, manage storefronts, inventory, fulfillment, customer service, cash flow, compliance, and returns. Income can be negative and no degree guarantees success.";
  }
  if (career.id === "supply-chain-analyst") {
    career.description = "Supply chain analysts model demand, inventory, supplier, and logistics data and recommend options to authorized operations and procurement leaders. They do not independently renegotiate contracts or direct warehouses unless assigned that authority.";
  }
  if (career.id === "personal-trainer") {
    career.description = "Personal trainers coach safe exercise and behavior change within certification and facility rules. They do not diagnose injuries, promise body outcomes, or prescribe medical nutrition treatment, and they refer concerns to qualified professionals.";
  }
  if (career.id === "electrician") {
    career.guidance.teen = "Use de-energized low-voltage training kits under qualified supervision. Do not open panels, alter household wiring, or work on mains electricity.";
  }
  if (career.id === "hvac-technician") {
    career.guidance.teen = "Explore HVAC with simulations, basic physics, and supervised filter or thermostat demonstrations. Do not dismantle appliances, open electrical cabinets, or handle refrigerants.";
  }
  if (career.id === "welder") {
    career.guidance.youngAdult = "A supervised welding program or apprenticeship often takes about 6–24 months, with additional qualifications for specific processes. Underwater welding also requires commercial-diving training and strict safety certification.";
  }
  if (career.id === "airline-pilot") {
    career.guidance.youngAdult = "Follow the licensing and medical pathway for your aviation authority. Airline experience thresholds and approved training credits vary; military aviation is a service commitment, not simply a financing strategy.";
  }
  if (career.id === "firefighter") {
    career.guidance.teen = "Explore approved junior or cadet programs with strict supervision and duty limits. Do not enter emergency scenes or perform operational firefighting tasks.";
  }
  if (career.id === "chef") {
    career.guidance.youngAdult = "Seek paid, lawful kitchen work, culinary training, or a registered apprenticeship. Confirm local wage and trial-shift rules rather than accepting unpaid productive work.";
  }
};

const correctScheduleTypes = (career) => {
  career.dayTrial?.schedule?.forEach((item) => {
    const title = item.title.toLowerCase();
    if (/surgery|lunch service|dinner service/.test(title)) item.type = "task";
    if (/working lunch/.test(title)) item.type = "meeting";
    if (/restock|invoice|service call/.test(title)) item.type = "task";
    if (/press release|draft|editing|analysis/.test(title) && item.type === "communication") item.type = "task";
    if (/pr review|code review/.test(title)) item.type = "review";
    if (/rest period|crew rest/.test(title)) item.type = "break";
    if (/iep/.test(title)) item.type = "meeting";
  });
};

const emergencyPattern = /ransomware|outage|fire|pursuit|hard drive|drive fail|coup|unrest|tornado|spill|injury|medical emergency|security threat|alarm|power fail|sewage|carbon.monoxide|mayday|live panel|backfeed|active threat/i;

const normalizeIdsAndEvents = (career) => {
  const colleagueIdMap = new Map();
  career.colleagues.forEach((colleague, index) => {
    const oldId = colleague.id;
    const suffix = String(oldId || `colleague-${index + 1}`).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
    colleague.id = `${career.id}-${suffix}`;
    colleagueIdMap.set(oldId, colleague.id);
  });

  career.quickTrial?.exercises?.forEach((exercise, index) => {
    exercise.id = `${career.id}-ex${index + 1}`;
    exercise.options?.forEach((option, optionIndex) => {
      option.id = String.fromCharCode(97 + optionIndex);
      if (!option.feedback) option.feedback = `Review the ${career.title} scenario, its evidence, and the safest role-appropriate next step.`;
    });
  });

  career.weekTrial?.randomEventPool?.forEach((event, index) => {
    if (event.from && colleagueIdMap.has(event.from)) event.from = colleagueIdMap.get(event.from);
    const eventText = `${event.title || ""} ${event.topic || ""} ${event.content || ""}`;
    if (emergencyPattern.test(eventText)) {
      event.type = "incident";
      event.urgency = event.urgency || "critical";
      delete event.from;
    } else if (event.type === "message" || event.type === "call") {
      const valid = career.colleagues.some((colleague) => colleague.id === event.from);
      if (!valid) event.from = career.colleagues[index % career.colleagues.length].id;
    }
  });
};

export function applyCareerCorrections(careers) {
  careers.forEach((career, index) => {
    Object.assign(career, metadataCorrections[career.id] || {});
    applyOriginalCareerCorrections(career);
    applyScopeAndTextCorrections(career);

    const later = laterCareerContent[career.id];
    if (later) {
      const options = later.options.map((option) => ({ ...option }));
      if (saferWeakActions[career.id]) {
        options[2].text = saferWeakActions[career.id][0];
        options[2].feedback = saferWeakActions[career.id][1];
      }
      replaceDecisionOptions(career, options);
      if (career.dayTrial) {
        career.dayTrial.stressEvents = [{ title: later.stress[0], description: later.stress[1], urgency: later.stress[2] }];
      }
      if (career.weekTrial) {
        career.weekTrial.teamProject = { title: later.project[0], description: later.project[1] };
      }
    }

    if (career.colleagues.length < 2) {
      const [name, role, personality] = additionalColleagues[career.id] || ["Jordan Lee", `${career.title} Team Partner`, `Supports safe, role-appropriate ${career.title.toLowerCase()} work.`];
      career.colleagues.push({
        id: `colleague-${career.colleagues.length + 1}`,
        name,
        role,
        avatar: "🤝",
        personality,
        systemPrompt: `You are ${name}, a ${role}. Emphasize realistic teamwork, safety, and professional scope. Keep replies short and age-appropriate.`,
      });
    }

    career.dayTrial?.schedule?.forEach((item) => {
      if (!item.description || !item.description.trim()) item.description = safeDescription(career, item);
    });

    correctScheduleTypes(career);
    sanitizeObjectStrings(career);
    normalizeIdsAndEvents(career);

    // Keep IDs stable and record count unchanged while ensuring every record remains addressable.
    if (!career.id) career.id = `career-${index + 1}`;
  });

  return careers;
}
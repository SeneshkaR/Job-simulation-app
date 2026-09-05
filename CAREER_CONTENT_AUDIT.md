# Career Trial: 50-Job Content Audit

## Executive finding

The project does contain 50 careers in `src/data/careers.js`. The first 10 are mostly custom-written, while the additional 40 rely heavily on a shared template. Every one of the added 40 careers has empty day-schedule descriptions and the same generic four-option quick-trial response pattern. This is the main reason some information feels unrelated to the selected job.

The audit found three malformed numeric data values, two additional critical professional-safety scope problems, many other high-risk safety or professional-scope errors, copied category headings inside guidance text, duplicate IDs, role/environment mismatches, and several careers that combine distinct professions into one simulation. The most urgent fixes are Teacher education years, School Counselor education years, Content Creator salary maximum, Airline Pilot emergency choices, Athletic Trainer / Coach scope, and all generic responses used in safety-critical scenarios.

## System-wide problems

| Problem | Scope | Why it does not fit | Recommended correction |
|---|---:|---|---|
| Empty `dayTrial.schedule[*].description` fields | All added 40 careers; 267 empty descriptions | `DayTrialScreen` renders this field, so activities appear without context or instructions. | Write a job-specific objective, expected output, decision, and constraint for every schedule entry. |
| Generic quick-trial options copied between careers | Added 40 careers | The same “stay calm,” “ask a senior,” “handle quickly,” and “ignore” choices appear in unrelated medical, legal, emergency, business, aviation, and technical situations. | Replace each option set with profession-specific decisions and feedback. |
| Quick scenario reused as day stress event | Added 40 careers | The same scenario is repeated in two trial modes instead of exposing the student to a different pressure or responsibility. | Create a separate day stress event with a different trigger, decision, and consequence. |
| Generic week project title | Added 40 careers | Titles follow the literal pattern `[Career Title] Week Project`, which does not create an authentic role experience. | Give every career a measurable, realistic five-day deliverable within that profession’s authority. |
| Random events rarely identify a colleague | Most added careers | Only 21 of 144 week events include a valid `from` value, weakening the colleague-chat experience. | Connect messages and calls to career-specific colleague IDs; reserve system incidents for non-person events. |
| Guidance fallback can be wrong for unsupported age keys | App-wide | Data uses `teen` and `youngAdult`; if another age key reaches the guidance lookup, it can fall back to teen guidance. | Normalize age-group keys and add an explicit safe fallback. |
| Copied taxonomy headings in guidance | 15 careers | Text such as “Business & Finance (new)” and “Skilled Trades (new)” appears inside user guidance. | Remove every leaked heading and review surrounding text for truncation. |
| Duplicate or malformed IDs | Multiple careers | Duplicate exercise and colleague IDs can corrupt analytics, saved progress, and deep links. | Prefix all IDs with the career ID and enforce uniqueness in validation. |
| README still describes only 10 careers | Documentation | It contradicts the actual 50-career product. | Update the career count and list after content repair. |

## Critical and highest-risk corrections

| Career | Field | Severity | What is wrong | Correct direction |
|---|---|---|---|---|
| Teacher | `educationYears: 45` | Critical | Obvious malformed value. | Use approximately 4–5 years, with regional licensing caveat. |
| School Counselor | `educationYears: 50` | Critical | Obvious malformed value. | Use approximately 6 years for a common U.S. bachelor’s-plus-master’s route, while noting regional variation. |
| Content Creator / YouTuber | `salaryRange.max: 1` | Critical | Maximum annual income is stored as one dollar. | Model earnings as highly variable; use a documented range or omit a hard ceiling. |
| Airline Pilot | Engine-fire quick exercise | Critical | Generic choices allow asking a senior or acting alone instead of coordinated emergency procedure. | Require aircraft-specific memory/checklist actions, PF/PM coordination, ATC/cabin communication, and diversion assessment. |
| Athletic Trainer / Coach | Return-to-play exercise and project | Critical | It merges healthcare and coaching, then implies a coach can clear injured athletes. | Split the careers; only qualified clinicians using formal protocol may make medical return-to-play recommendations. |
| Registered Nurse | Stroke and triage exercises | High | Oxygen decline is ranked second despite ABC logic; stroke response omits rapid-response/stroke activation and key checks. | Make airway/breathing deterioration first and use protocol-based stroke escalation. |
| Lawyer | Ethics exercise | High | It implies privilege always blocks remedial action and treats withdrawal as merely extreme. | Make the answer jurisdiction- and fact-dependent, requiring supervision and applicable professional-conduct rules. |
| Psychologist | Entire career scope | High | Generic “Psychologist” is represented almost entirely as hospital clinical therapy, with incorrect training pathways. | Rename to Clinical Psychologist or broaden the simulation; separate psychologist, counselor, MFT, and social-work routes. |
| Electrician | Live-panel exercise | High | Acting quickly alone still receives credit in a potentially lethal energized-work scenario. | Require de-energization, lockout/tagout, verification, PPE, and qualified escalation. |
| Firefighter | Structure-fire and random-event choices | High | Emergency incidents can be handled solo, opened as chat, delegated, or ignored. | Model incident command, PPE, crew integrity, radio coordination, and authorized response. |
| Social Worker | Child-removal exercise | High | It implies one social worker independently decides removal. | Require immediate safety assessment, mandated consultation, documentation, and jurisdictional process. |
| Meteorologist | Tornado exercise | High | Generic choices do not teach warning authorization or public shelter guidance. | Require approved warning workflow, precise location/timing, and actionable shelter instructions. |
| Diplomat / Foreign Service Officer | Coup/unrest event | High | A security crisis is represented as a normal message that can be ignored. | Use a crisis event with emergency-action procedures, accountability, and security guidance. |

## Job-by-job fit audit

### Careers 1–10

| Career | Information that does not fit | Severity | Recommended correction |
|---|---|---|---|
| Software Engineer | No obvious job-content mismatch was found. | — | Keep content; validate it with the same ID/schema tests added for other careers. |
| Registered Nurse | Fixed four-year education conflicts with the stated two-year ADN route; triage ordering conflicts with ABC logic; stroke response is incomplete. | High | Represent education as 2–4 years and rewrite the clinical exercises using safe escalation protocols. |
| Civil Engineer | `environment: field` ignores major office/CAD work; site-visit guidance lacks authorization/PPE; PE timing and “doubles your ceiling” are overgeneralized. | Medium | Use mixed office/field and jurisdiction-aware licensure guidance. |
| Digital Marketer | The campaign exercise declares a winner using only spend and sales, ignoring revenue, margin, attribution, and confidence; teen social-media guidance lacks privacy safeguards. | Medium | Evaluate CPA/ROAS and recommend supervised, privacy-safe projects for minors. |
| Teacher | Education years is 45; work style is independent; environment is office. | Critical | Set realistic education duration, collaborative/mixed work style, and school/classroom environment. |
| Lawyer | Work style is incorrectly independent; ethics answer is oversimplified; “Win the case” is an inappropriate project objective; LSAT guidance is overgeneralized. | High | Use mixed/collaborative, ethical case preparation, and target-school median guidance. |
| Accountant | Exercise options are missing feedback; teen guidance suggests handling a real small business’s confidential books. | Medium | Add accounting-specific feedback and use mock/anonymized or supervised records. |
| Data Scientist | Data-cleaning workload is stated as both about half and 70%; one option lacks feedback. | Low | Use a qualified 50–70% range and complete feedback. |
| Psychologist | Clinical-only simulation under a broad title; six years is too short for the described licensed clinical role; guidance lists different professions as psychologist routes. | High | Rename or broaden the career and correct education/licensure pathways. |
| Architect | `environment: field` ignores studio work; ARE is said to have seven divisions rather than six; guidance contains leaked “Healthcare & Life Sciences (new)” text. | High | Use mixed environment, six ARE divisions, and remove copied heading text. |

### Careers 11–20

| Career | Information that does not fit | Severity | Recommended correction |
|---|---|---|---|
| Pharmacist | Hospital environment conflicts with a community-pharmacy schedule; prescription mismatch choices do not explicitly hold dispensing; vaccination project rewards unsafe throughput. | High | Set community-pharmacy environment or rewrite schedule; require verification and safety-based clinic goals. |
| Physical Therapist | Exercise ID uses pharmacist prefix; shadowing is labeled universally required; patient frequency is overgeneralized; discharge-to-full-function quota is inappropriate. | High | Use `pt-ex1`, qualify admissions, assess before mobilization, and use individualized transition planning. |
| Dentist | Hospital environment conflicts with private clinic ownership; colleague name `Kim Tr■n` is corrupted; anxiety scenario prioritizes schedule; “chairs” is used as patient count. | High | Use dental-clinic environment, repair the name, stop/assess/re-consent, and say appointments or patients. |
| Veterinarian | GRE guidance is outdated for many schools; teen guidance is insensitive; aggressive-dog exercise creates unsafe urgency; surgery is marked as a break. | High | Use school-specific requirements, low-stress handling, and separate surgery from lunch. |
| Cybersecurity Analyst | CISSP is placed too early; authorization limits are absent; ransomware choices omit incident-response fundamentals; event types are wrong. | High | Add legal authorization, realistic certification sequencing, isolation/escalation/evidence preservation, and correct types. |
| Cloud Engineer | Teen cloud-account advice risks unexpected charges; overnight pages are presented as universal; outage choices omit runbooks and safe failover. | High | Use sandboxes or guardian-approved budgets and rewrite the incident workflow. |
| UX / UI Designer | Colleague role contains “from Software Eng career”; education is presented as fixed despite alternate routes; executive-redesign choices ignore scope and validation. | High | Remove source leakage, model flexible pathways, and use scoped MVP plus lightweight research. |
| Biomedical Scientist | Office environment conflicts with laboratory work; six years conflicts with independent-scientist framing; “90% fail” is unsupported; guidance contains leaked taxonomy text. | High | Use lab/mixed environment, distinguish role levels, remove unsupported statistic and copied heading. |
| Environmental Scientist | Field-only environment ignores reporting and permits; spill response lacks hazard assessment/PPE; lunch is placed near sampling activity. | High | Use mixed field/office and require approved spill-response and contamination controls. |
| Financial Analyst | The record mixes equity research, investment banking, private equity, and FP&A; malformed `M&A;` and `FP&A.;`; overnight work is normalized; exercise ID collides with Firefighter. | High | Choose one track or present distinct tracks; repair text and use unique ID. |

### Careers 21–30

| Career | Information that does not fit | Severity | Recommended correction |
|---|---|---|---|
| Human Resources Manager | “People are the product” is objectifying; investigation wording assumes a single “truth”; complaint choices are generic. | Medium | Use ethical workplace language and evidence-based, confidential, anti-retaliation investigation steps. |
| Product Manager | APM programs are described as internships; “break the tie” contradicts facilitation; colleague role contains source leakage; sprint planning is marked as a task. | Medium | Distinguish internships from APM/RPM programs and model facilitated decisions. |
| Management Consultant | Guidance contains “Skilled Trades (new)”; working lunch is marked as a break. | High | Remove leaked heading and use meeting/task type. |
| Graphic Designer | Independent work style conflicts with collaboration; exercise assumes the client’s preferred design is objectively wrong; presentation is typed as task. | Medium | Use mixed work style and brief-based tradeoff discussion with informed client choice. |
| Video Editor | Hard-drive failure is represented as an ordinary message that can be ignored. | Medium | Use an urgent production incident with backup/recovery decisions. |
| Journalist | Category is Creative rather than Media/Communications; demand claim conflicts with shrinking staff roles; breaking-news choices omit verification/editor/legal review; one-week investigative target is unrealistic. | High | Add media category, qualify demand, and prioritize verification before publication. |
| Police Officer | Paid academy is presented as universal; domestic-violence response lacks backup, separation, weapons/injury checks, and victim safeguarding; foot pursuit is a message. | High | Make requirements jurisdictional and model policy-driven emergency response. |
| Firefighter | Four-year education conflicts with academy/EMT route; demand is overgeneralized; minor volunteering lacks duty limits; emergency events have message controls; ID collides with Financial Analyst. | High | Correct pathway, qualify demand, add junior-program safeguards, and use incident event types. |
| Social Worker | Independent/office metadata conflicts with field teamwork; generic title contains child-welfare-only content; removal and caseload projects exceed realistic authority and safety. | High | Rename to Child Welfare Social Worker or diversify; use supervised statutory process. |
| Chef | Guidance recommends potentially unlawful unpaid trial shifts; lunch service is typed as break; stray semicolon appears; field environment is inaccurate. | High | Recommend paid lawful trials/apprenticeships and use restaurant/kitchen environment. |

### Careers 31–40

| Career | Information that does not fit | Severity | Recommended correction |
|---|---|---|---|
| Electrician | Teen lamp rewiring is unsafe; live-panel options reward solo speed; apprentice ID collides with Supply Chain; avatar and event types do not fit. | High | Use low-voltage kits or qualified supervision, safe electrical procedure, and unique IDs. |
| Plumber | Sewage scenario omits biohazard controls; restock/invoice is marked as a break; heat-pump wording reads as HVAC. | High | Add containment/PPE/public-health response and correct schedule type and specialty wording. |
| HVAC Technician | Teen advice to dismantle AC is unsafe; freezer exercise ignores food, electrical, and refrigerant risks; service calls are typed as communication. | High | Restrict teen work to safe training rigs and use field-service workflow. |
| Welder | Education years is 6 despite a stated 6–24-month route; guidance contains “Creative & Media (new)”; underwater welding is glamorized; inspection failure choices are generic. | High | Use 1–2 years, remove leaked text, state commercial-diving prerequisites, and require WPS repair/reinspection. |
| Airline Pilot | Guidance contains “Business & Finance (new)”; ATP threshold is too absolute; military route is framed mainly as debt-free; exercise ID collides with AI/ML; rest is typed as task. | Critical | Rewrite emergency and pathway content, use unique ID, and distinguish rest periods. |
| Hotel Manager | `F&B;` is malformed; colleague name/role fields are reversed; guidance contains leaked text; power-failure choices omit life-safety systems. | High | Repair persona/text and write a hotel emergency plan response. |
| Personal Trainer | Four-year education conflicts with a short CPT route; office environment is wrong; body-centric promise overclaims; injury and nutrition content exceed safe scope. | High | Model optional degree plus certification, use gym/studio, and add emergency/referral boundaries. |
| Musician / Composer | Office environment is wrong; guidance contains leaked text; booking-agent avatar does not fit; name/transliteration and lecture grammar are malformed; week project is overloaded. | Medium | Use studio/stage/remote environment and a smaller demo/performance project. |
| Game Developer | PR review is typed as a meeting; generic deadline choices do not teach triage, rollback, or scope reduction. | Medium | Use review/task type and game-production-specific incident choices. |
| Content Creator / YouTuber | Salary maximum is one dollar; four-year education and high-demand labels are inappropriate; environment and mentor persona are generic; lecture grammar is malformed. | Critical | Model variable self-employment earnings, optional education, creator-specific persona, and mixed environment. |

### Careers 41–50

| Career | Information that does not fit | Severity | Recommended correction |
|---|---|---|---|
| School Counselor | Education years is 50; independent style is wrong; confidentiality omits mandatory exceptions; IEP ownership is overstated; duties have wrong event types. | Critical | Use realistic education, collaborative work, explicit reporting limits, and “participate in IEP teams.” |
| Physical Therapist Assistant | Guidance contains leaked taxonomy text; DPT bridge is overstated; autonomy and discharge authority are exaggerated; exercise ID collides with PT and Pharmacist. | High | Clarify supervision and PT authority, use unique ID, and remove copied text. |
| Athletic Trainer / Coach | Two distinct professions are merged; education is outdated; coach grammar is wrong; return-to-play decisions are unsafe. | Critical | Split into Athletic Trainer and Sports Coach with separate scopes and simulations. |
| Public Relations Specialist | Guidance contains “Modern & Gig (new)”; press-release and working-lunch event types are wrong; guaranteed media placements are unrealistic. | High | Remove copied text, correct types, and measure pitches/qualified coverage instead. |
| E-commerce Entrepreneur | Four-year education and high-demand employment label do not fit self-employment; salary range ignores losses; mentor is a placeholder; financial advice is prescriptive; ID is malformed. | High | Use variable/not-applicable metadata, realistic risk guidance, specific adviser persona, and unique ID. |
| Supply Chain Analyst | Description includes procurement/warehouse management authority; two persona IDs belong to unrelated careers; guidance contains leaked text; project includes renegotiation beyond analyst authority. | High | Focus on analysis/recommendations and use unique supply-chain personas. |
| Real Estate Agent | Four-year education conflicts with pre-licensing route; salary label hides commission risk; fixed 2% earnings claim is misleading; close-two-deals project is outside the agent’s control. | High | Model variable net commission earnings and process-based weekly goals. |
| AI / ML Engineer | Guidance contains “Business & Finance (new)”; exercise ID collides with Airline Pilot; generic model-incident choices omit rollback and drift diagnosis. | High | Remove copied text, use unique ID, and model incident-owner notification and safe fallback. |
| Meteorologist | Broad title contains a broadcast-only simulation; independent style is wrong; guidance contains leaked text; “Award coverage” event appears copied or malformed. | High | Rename to Broadcast Meteorologist or diversify, then replace malformed event with severe-weather coverage. |
| Diplomat / Foreign Service Officer | Generic title contains U.S.-specific hiring; high-demand label is inaccurate; office environment is incomplete; hiring and family-move claims are oversimplified; guidance contains leaked text; coup event is an ordinary message. | High | Rename to U.S. Foreign Service Officer or internationalize, use competitive demand, and model security crises properly. |

## Data integrity defects

| Defect | Affected records | Correction |
|---|---|---|
| Duplicate exercise ID `ph-ex1` | Pharmacist, Physical Therapist, Physical Therapist Assistant | Use `pharmacist-ex1`, `pt-ex1`, and `pta-ex1`. |
| Duplicate exercise ID `fi-ex1` | Financial Analyst, Firefighter | Use `financial-analyst-ex1` and `firefighter-ex1`. |
| Duplicate exercise ID `ai-ex1` | Airline Pilot, AI / ML Engineer | Use `airline-pilot-ex1` and `aiml-ex1`. |
| Malformed exercise ID `e--ex1` | E-commerce Entrepreneur | Use `ecommerce-ex1`. |
| Duplicate colleague IDs | `sam-reeves`, `dr-maya-hendricks`, `wei-zhang`, `amelia-ruiz` | Prefix IDs with career ID or create distinct identities. |
| Corrupted colleague name | Dentist: `Kim Tr■n` | Restore the intended Unicode name, likely `Kim Trần`, after confirming. |
| Missing option feedback | Accountant exercise and one Data Scientist option | Add field-specific instructional feedback. |
| Careers with only one colleague | Seven careers | Add at least one additional, genuinely job-specific colleague or update product claims. |

## Recommended repair order

The first repair pass should correct malformed numbers, duplicate IDs, corrupted text, leaked headings, and missing feedback because these are deterministic and low-risk changes. The second pass should replace all generic quick-trial options and empty day descriptions, starting with aviation, healthcare, emergency response, trades, child protection, weather warnings, and diplomatic security. The third pass should correct career scope and metadata, especially Psychologist, Athletic Trainer / Coach, Social Worker, Meteorologist, Financial Analyst, and Diplomat. The final pass should rewrite week projects and events so they reflect realistic authority, controllable outcomes, and named colleague interactions.

## Validation rules to add

The career dataset should fail validation when an ID is duplicated, an education duration is outside a sensible range, salary minimum exceeds maximum or maximum is implausibly small, a schedule description is empty, a decision option lacks feedback, a colleague reference cannot be resolved, guidance contains category-marker text such as `(new)`, or a safety-critical scenario awards points to unauthorized solo action. A lightweight Node validation script can enforce these rules before the app starts or during CI.

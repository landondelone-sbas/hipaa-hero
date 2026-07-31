/* ============================================================================
   HIPAA HERO — QUESTION BANK
   ----------------------------------------------------------------------------
   This is the only file you need to edit to change quiz content.
   No application logic lives here. Add, remove, or reword freely.

   SCHEMA
   {
     id:          Number  — unique, never reuse a retired id
     category:    String  — must match a module id in data/modules.js
     difficulty:  "Easy" | "Medium" | "Hard"
     type:        "mc" | "tf" | "multi" | "scenario"
     question:    String
     answers:     [String, ...]
     correct:     Number (mc/tf/scenario)  |  [Number, ...] (multi)
     explanation: String  — shown after answering, and in exam review
     reference:   String  — cite the rule or policy source
     tags:        [String, ...]
   }
   ============================================================================ */

const QUESTIONS = [

  /* ---------- MODULE 1 — HIPAA BASICS ---------- */
  {
    id: 1, category: "basics", difficulty: "Easy", type: "mc",
    question: "What does HIPAA stand for?",
    answers: [
      "Health Information Privacy and Access Act",
      "Health Insurance Portability and Accountability Act",
      "Healthcare Industry Protection and Auditing Act",
      "Hospital Information Protection and Authorization Act"
    ],
    correct: 1,
    explanation: "HIPAA is the Health Insurance Portability and Accountability Act, a federal law enacted in 1996 to protect sensitive patient health information from being shared or exposed without the patient's consent or knowledge.",
    reference: "HIPAA overview — enacted 1996",
    tags: ["basics", "definitions"]
  },
  {
    id: 2, category: "basics", difficulty: "Easy", type: "multi",
    question: "HIPAA enforces protection through three main rules. Select all three.",
    answers: [
      "The Privacy Rule",
      "The Security Rule",
      "The Billing Transparency Rule",
      "The Breach Notification Rule"
    ],
    correct: [0, 1, 3],
    explanation: "The three pillars are the Privacy Rule (who may see health information and what they may do with it), the Security Rule (how information must be protected, especially electronic records), and the Breach Notification Rule (who must be told when protection fails).",
    reference: "Core curriculum — three main rules",
    tags: ["basics", "rules"]
  },
  {
    id: 3, category: "basics", difficulty: "Medium", type: "mc",
    question: "Which federal agency enforces HIPAA?",
    answers: [
      "The Centers for Disease Control (CDC)",
      "The Federal Trade Commission (FTC)",
      "The HHS Office for Civil Rights (OCR)",
      "The Department of Justice (DOJ)"
    ],
    correct: 2,
    explanation: "The Department of Health and Human Services (HHS) Office for Civil Rights (OCR) is the federal agency that enforces HIPAA rules and investigates complaints and breaches.",
    reference: "Enforcement — HHS Office for Civil Rights",
    tags: ["basics", "enforcement"]
  },
  {
    id: 4, category: "basics", difficulty: "Medium", type: "tf",
    question: "Because Federally Qualified Health Centers handle PHI, they are considered 'Covered Entities' under HIPAA and must comply with its training requirements.",
    answers: ["True", "False"],
    correct: 0,
    explanation: "FQHCs handle Protected Health Information, which makes them Covered Entities. That status carries the full set of HIPAA obligations, including workforce training requirements.",
    reference: "FQHC status — Covered Entity",
    tags: ["basics", "fqhc"]
  },
  {
    id: 5, category: "basics", difficulty: "Hard", type: "mc",
    question: "How does HIPAA law actually word the training requirement?",
    answers: [
      "Training must be completed every 12 months without exception",
      "Training must be given to new workforce members within a reasonable period, and when there is a material change to policies or procedures",
      "Training is recommended but never required",
      "Training is required only for clinical staff who touch patient charts"
    ],
    correct: 1,
    explanation: "The law does not explicitly mandate a 12-month cycle. It requires training for new workforce members within a reasonable period of joining, and again when there is a material change to policies or procedures. Annual refreshers are the industry standard because gaps longer than 12 months get cited during enforcement actions.",
    reference: "The 'Annual' requirement nuance",
    tags: ["basics", "training"]
  },
  {
    id: 6, category: "basics", difficulty: "Medium", type: "multi",
    question: "Who at the clinic must receive HIPAA training? Select all that apply.",
    answers: [
      "Full-time and part-time employees, clinical and administrative",
      "Volunteers, even if they do not directly handle data",
      "Medical students, interns, contractors, and temporary workers",
      "Only staff with an EHR login"
    ],
    correct: [0, 1, 2],
    explanation: "Training covers all workforce members who handle or could potentially encounter PHI: full- and part-time staff, volunteers, students and interns, contractors and temps, remote workers, and IT staff. An EHR login is not the test — potential exposure to PHI is.",
    reference: "Who must be trained",
    tags: ["basics", "training"]
  },

  /* ---------- MODULE 2 — PROTECTED HEALTH INFORMATION ---------- */
  {
    id: 10, category: "phi", difficulty: "Easy", type: "mc",
    question: "Which of the following best defines Protected Health Information (PHI)?",
    answers: [
      "Only a patient's written diagnosis",
      "Any demographic information that can identify a patient and relates to their past, present, or future health condition, treatment, or payment",
      "Any document stored inside the EHR system",
      "Information a patient has explicitly marked confidential"
    ],
    correct: 1,
    explanation: "PHI is any demographic information that can be used to identify a patient and that relates to their past, present, or future physical or mental health condition, treatment, or payment. Billing records count. So does an appointment list.",
    reference: "Privacy Rule — defining PHI",
    tags: ["phi", "definitions"]
  },
  {
    id: 11, category: "phi", difficulty: "Medium", type: "mc",
    question: "How many specific identifiers must be removed for health data to be considered 'de-identified' by HHS?",
    answers: ["8", "12", "18", "24"],
    correct: 2,
    explanation: "HHS requires the removal of 18 specific identifiers before data is considered de-identified and may be used for research or public health without violating privacy.",
    reference: "HHS de-identification — 18 identifiers",
    tags: ["phi", "deidentification"]
  },
  {
    id: 12, category: "phi", difficulty: "Hard", type: "multi",
    question: "Which of these are among the 18 HHS identifiers? Select all that apply.",
    answers: [
      "IP addresses",
      "Vehicle license plates and VINs",
      "Biometric identifiers such as fingerprints and voiceprints",
      "The patient's blood type"
    ],
    correct: [0, 1, 2],
    explanation: "IP addresses, vehicle identifiers, and biometric identifiers are all on the list of 18, along with names, geographic data smaller than a state, dates, phone and fax numbers, email, SSN, medical record numbers, account numbers, license numbers, device serial numbers, URLs, full-face photographs, and any other unique identifying code. Blood type is clinical data, not an identifier.",
    reference: "HHS de-identification — 18 identifiers",
    tags: ["phi", "deidentification"]
  },
  {
    id: 13, category: "phi", difficulty: "Hard", type: "mc",
    question: "Under the de-identification standard, how are dates handled?",
    answers: [
      "All dates may be retained as-is",
      "All dates except the year must be removed, and exact ages for anyone 89 or older must be removed",
      "Only the date of death must be removed",
      "Dates may be retained if the patient's name is removed"
    ],
    correct: 1,
    explanation: "All dates directly related to the individual — birthdate, admission and discharge dates, date of death — must be stripped except the year. Exact ages for anyone 89 or older must also be removed, because very high ages are themselves identifying.",
    reference: "HHS de-identification — identifier #3, dates",
    tags: ["phi", "deidentification"]
  },
  {
    id: 14, category: "phi", difficulty: "Medium", type: "tf",
    question: "A ZIP code is considered a geographic identifier that must be removed for de-identification.",
    answers: ["True", "False"],
    correct: 0,
    explanation: "All geographic subdivisions smaller than a state must be removed — street address, city, county, precinct, and ZIP code.",
    reference: "HHS de-identification — identifier #2, geographic data",
    tags: ["phi", "deidentification"]
  },

  /* ---------- MODULE 3 — PRIVACY RULE ---------- */
  {
    id: 20, category: "privacy", difficulty: "Easy", type: "mc",
    question: "What does the Minimum Necessary Standard require?",
    answers: [
      "That clinics keep the minimum number of records legally allowed",
      "That covered entities limit access, use, and disclosure of PHI to only what is strictly required to accomplish the intended purpose",
      "That patients receive the minimum information necessary about their own care",
      "That staff complete a minimum number of training hours per year"
    ],
    correct: 1,
    explanation: "The standard limits PHI to what is strictly required for the task at hand. In practice this means role-based access: a medical coder needs diagnostic information to process a claim but does not need psychotherapy notes, and an IT technician maintaining a server does not need to view medical records at all.",
    reference: "Privacy Rule — Minimum Necessary Standard",
    tags: ["privacy", "minimum-necessary"]
  },
  {
    id: 21, category: "privacy", difficulty: "Hard", type: "multi",
    question: "The Minimum Necessary Standard does NOT apply in which situations? Select all that apply.",
    answers: [
      "When a healthcare provider requests full medical records for treatment purposes",
      "When the patient explicitly authorizes the disclosure",
      "When information is required by law, such as an HHS compliance audit",
      "When a coworker asks about a mutual friend's visit"
    ],
    correct: [0, 1, 2],
    explanation: "There are three carve-outs: treatment requests from a provider, disclosures the patient explicitly authorized, and disclosures required by law such as an HHS audit. A coworker's curiosity is never an exception — that is snooping.",
    reference: "Privacy Rule — Minimum Necessary exceptions",
    tags: ["privacy", "minimum-necessary"]
  },
  {
    id: 22, category: "privacy", difficulty: "Medium", type: "mc",
    question: "'TPO' describes the most common category of permissible disclosure. What does it stand for?",
    answers: [
      "Testing, Prescribing, Oversight",
      "Treatment, Payment, Healthcare Operations",
      "Transfer, Processing, Outreach",
      "Triage, Placement, Onboarding"
    ],
    correct: 1,
    explanation: "Treatment, Payment, and Healthcare Operations. Sharing data with another physician for a referral, sending a claim to an insurer, or using data for internal quality assessment all fall under TPO and do not require separate written authorization.",
    reference: "Privacy Rule — permissible disclosures",
    tags: ["privacy", "disclosures"]
  },
  {
    id: 23, category: "privacy", difficulty: "Medium", type: "mc",
    question: "A patient's name is faintly overheard by another patient in a hallway. Under the Privacy Rule this is:",
    answers: [
      "An automatic reportable breach",
      "An incidental disclosure, permitted if the facility has reasonable safeguards in place",
      "Grounds for immediate termination",
      "Only a violation if the patient files a complaint"
    ],
    correct: 1,
    explanation: "Minor, unavoidable disclosures are permitted as incidental disclosures, provided the facility has enacted reasonable administrative and physical safeguards. HIPAA does not require silence — it requires reasonable care.",
    reference: "Privacy Rule — incidental disclosures",
    tags: ["privacy", "disclosures"]
  },
  {
    id: 24, category: "privacy", difficulty: "Medium", type: "multi",
    question: "Which of these count as public interest disclosures permitted without patient authorization? Select all that apply.",
    answers: [
      "Reporting certain contagious diseases to public health departments",
      "Reporting suspected abuse or neglect",
      "Complying with a court order",
      "Selling a patient list to a medical device marketer"
    ],
    correct: [0, 1, 2],
    explanation: "Public health reporting, abuse and neglect reporting, and court orders are all permitted public interest disclosures. Selling PHI to third-party marketers without explicit written patient authorization is an impermissible disclosure — a violation.",
    reference: "Privacy Rule — public interest and benefit",
    tags: ["privacy", "disclosures", "violations"]
  },
  {
    id: 25, category: "privacy", difficulty: "Easy", type: "tf",
    question: "Looking up the medical record of a coworker out of concern for their wellbeing is permitted as long as you do not share what you find.",
    answers: ["True", "False"],
    correct: 1,
    explanation: "False. Snooping into the records of friends, family, coworkers, or celebrities without a job-related need is an impermissible disclosure regardless of intent and regardless of whether the information travels further. Access itself is the violation.",
    reference: "Privacy Rule — impermissible disclosures",
    tags: ["privacy", "violations", "snooping"]
  },

  /* ---------- MODULE 4 — SECURITY RULE ---------- */
  {
    id: 30, category: "security", difficulty: "Easy", type: "mc",
    question: "What distinguishes the Security Rule from the Privacy Rule?",
    answers: [
      "The Security Rule applies only to hospitals",
      "The Privacy Rule dictates who can access data; the Security Rule dictates how that data must be protected",
      "The Security Rule applies only to paper records",
      "They are two names for the same regulation"
    ],
    correct: 1,
    explanation: "The Privacy Rule governs who may access PHI and for what purpose. The Security Rule governs how electronic PHI must be protected, through administrative, physical, and technical safeguards.",
    reference: "Security Rule — scope",
    tags: ["security", "definitions"]
  },
  {
    id: 31, category: "security", difficulty: "Medium", type: "multi",
    question: "The Security Rule requires three categories of safeguard. Select all three.",
    answers: ["Administrative", "Physical", "Technical", "Financial"],
    correct: [0, 1, 2],
    explanation: "Covered entities and business associates must implement administrative, physical, and technical safeguards to ensure the confidentiality, integrity, and availability of ePHI.",
    reference: "Security Rule — safeguard categories",
    tags: ["security", "safeguards"]
  },
  {
    id: 32, category: "security", difficulty: "Medium", type: "mc",
    question: "What is the purpose of Unique User Identification under the Security Rule?",
    answers: [
      "To let staff personalize their workstation settings",
      "To assign every employee a unique name or number so any access, modification, or deletion of ePHI can be audited and traced to a specific individual",
      "To reduce the number of licenses the clinic must purchase",
      "To allow shared logins for staff working the same shift"
    ],
    correct: 1,
    explanation: "Every workforce member gets a unique identifier so the audit trail is meaningful. Shared credentials destroy accountability — if two people use one login, neither access event can be attributed.",
    reference: "Security Rule — unique user identification",
    tags: ["security", "access-control"]
  },
  {
    id: 33, category: "security", difficulty: "Hard", type: "mc",
    question: "Multi-Factor Authentication requires two or more verification factors. Which set correctly describes the three factor types?",
    answers: [
      "Something you know, something you have, something you are",
      "Something you type, something you click, something you sign",
      "Your password, your username, your email",
      "A manager approval, an IT approval, a compliance approval"
    ],
    correct: 0,
    explanation: "The three factor types are something you know (a password), something you have (a security token or a code sent to a mobile device), and something you are (biometrics such as a fingerprint). Passwords alone are no longer considered sufficient for remote access or privileged accounts.",
    reference: "Security Rule — multi-factor authentication",
    tags: ["security", "mfa"]
  },
  {
    id: 34, category: "security", difficulty: "Medium", type: "tf",
    question: "Sharing your login credentials with a trusted coworker is acceptable during a staffing shortage.",
    answers: ["True", "False"],
    correct: 1,
    explanation: "False. Compliance policies must explicitly forbid the sharing of credentials between employees, with no staffing exception. Shared credentials break unique user identification and make the audit trail useless.",
    reference: "Security Rule — password hygiene",
    tags: ["security", "passwords"]
  },
  {
    id: 35, category: "security", difficulty: "Medium", type: "mc",
    question: "How often do typical compliance policies require routine password resets?",
    answers: [
      "Every 7 to 14 days",
      "Every 60 to 90 days, or immediately upon suspected compromise",
      "Once every three years",
      "Only when an employee changes roles"
    ],
    correct: 1,
    explanation: "Policies typically require routine resets every 60 to 90 days, and an immediate reset any time a credential is suspected of being compromised.",
    reference: "Security Rule — password hygiene",
    tags: ["security", "passwords"]
  },

  /* ---------- MODULE 5 — PATIENT RIGHTS ---------- */
  {
    id: 40, category: "rights", difficulty: "Easy", type: "mc",
    question: "Within how many days must a provider respond to a patient's request to access their own PHI?",
    answers: ["7 days", "15 days", "30 days", "90 days"],
    correct: 2,
    explanation: "Providers must respond to a records access request within 30 days, and must provide the data in the format the patient requested — including electronic formats — if it is readily producible.",
    reference: "Privacy Rule — Right to Access",
    tags: ["rights", "access"]
  },
  {
    id: 41, category: "rights", difficulty: "Medium", type: "mc",
    question: "A patient believes their record contains an error and requests an amendment. The provider reviews it and denies the request. What must happen next?",
    answers: [
      "Nothing further is required",
      "The provider must allow the patient to add a statement of disagreement to their record",
      "The record must be deleted and rebuilt",
      "The patient must file with OCR before anything else can occur"
    ],
    correct: 1,
    explanation: "Denial is permitted, but it is not the end of the process. The provider must allow the patient to add a statement of disagreement to the record, so the patient's position travels with the file.",
    reference: "Privacy Rule — Right to Amend",
    tags: ["rights", "amendment"]
  },
  {
    id: 42, category: "rights", difficulty: "Hard", type: "mc",
    question: "When must a provider honor a patient's request to restrict disclosure of their PHI?",
    answers: [
      "Always, without exception",
      "Never — restriction requests are advisory only",
      "When the patient pays for the service entirely out-of-pocket and asks that the data not be shared with their health plan",
      "Only when the patient's attorney submits the request in writing"
    ],
    correct: 2,
    explanation: "Providers are not strictly required to agree to every restriction request, but there is one mandatory case: if a patient pays for a service entirely out-of-pocket and requests that the data for that service not be shared with their insurer, the restriction must be honored.",
    reference: "Privacy Rule — Right to Request Restrictions",
    tags: ["rights", "restrictions"]
  },
  {
    id: 43, category: "rights", difficulty: "Medium", type: "mc",
    question: "A patient exercises their Right to an Accounting of Disclosures. What are they entitled to receive?",
    answers: [
      "A copy of their complete medical record",
      "A log of instances where their PHI was disclosed for reasons other than treatment, payment, or healthcare operations",
      "A list of every staff member employed by the clinic",
      "A refund of any fees paid in the last year"
    ],
    correct: 1,
    explanation: "The accounting covers disclosures made for reasons outside standard treatment, payment, and healthcare operations. Routine TPO disclosures are not included in the log.",
    reference: "Privacy Rule — Right to an Accounting of Disclosures",
    tags: ["rights", "accounting"]
  },
  {
    id: 44, category: "rights", difficulty: "Easy", type: "mc",
    question: "Which document must the clinic use to clearly outline patient rights at intake?",
    answers: [
      "The Business Associate Agreement (BAA)",
      "The Notice of Privacy Practices (NPP)",
      "The Uniform Data System report",
      "The Sliding Fee Discount Program schedule"
    ],
    correct: 1,
    explanation: "The Notice of Privacy Practices is provided to the patient upon intake and must clearly outline their rights, including how to file an internal privacy complaint and the direct contact information for the clinic's Privacy Officer.",
    reference: "Privacy Rule — Notice of Privacy Practices",
    tags: ["rights", "npp"]
  },
  {
    id: 45, category: "rights", difficulty: "Medium", type: "tf",
    question: "A clinic may decline future appointments for a patient who files a privacy complaint against it.",
    answers: ["True", "False"],
    correct: 1,
    explanation: "False. Policy must explicitly state that the clinic will not retaliate against any patient for filing a complaint, whether that complaint is filed internally or externally with OCR.",
    reference: "FQHC policy — patient privacy complaints, non-retaliation",
    tags: ["rights", "complaints"]
  },

  /* ---------- MODULE 6 — DATA HANDLING ---------- */
  {
    id: 50, category: "data", difficulty: "Medium", type: "mc",
    question: "What does 'encryption at rest' protect?",
    answers: [
      "Data moving across the internet",
      "Data stored on hard drives, databases, laptops, and flash drives",
      "Printed documents in a locked cabinet",
      "Verbal conversations in exam rooms"
    ],
    correct: 1,
    explanation: "Encryption at rest secures stored data. If an encrypted device is lost or stolen, the data remains unreadable to anyone without the decryption key.",
    reference: "Security Rule — encryption at rest",
    tags: ["data", "encryption"]
  },
  {
    id: 51, category: "data", difficulty: "Hard", type: "mc",
    question: "A clinic laptop is stolen. Its drive was encrypted to NIST standards and the decryption key was not compromised. Under the Breach Notification Rule, this is:",
    answers: [
      "An automatic reportable breach requiring patient notification",
      "A 'safe harbor' event — legally a non-reportable security incident",
      "Reportable only if the laptop is not recovered within 60 days",
      "Reportable only if it contained more than 500 records"
    ],
    correct: 1,
    explanation: "This is the safe harbor exception. If compromised data was encrypted according to NIST guidelines and the decryption key was not compromised, the event is legally a non-reportable security incident rather than a breach. Encryption is the single highest-leverage safeguard a clinic can deploy.",
    reference: "Breach Notification Rule — Safe Harbor Exception",
    tags: ["data", "encryption", "breach"]
  },
  {
    id: 52, category: "data", difficulty: "Medium", type: "mc",
    question: "What are Integrity Controls designed to verify?",
    answers: [
      "That staff completed their annual training",
      "That ePHI has not been altered or destroyed in an unauthorized manner during transmission",
      "That the clinic's budget is balanced",
      "That patients are satisfied with their care"
    ],
    correct: 1,
    explanation: "Integrity controls corroborate that ePHI was not altered or destroyed without authorization while in transit. This is typically achieved through digital signatures or checksums.",
    reference: "Security Rule — integrity controls",
    tags: ["data", "integrity"]
  },
  {
    id: 53, category: "data", difficulty: "Medium", type: "mc",
    question: "A medical coder requests access to a patient's psychotherapy notes to process a routine claim. What is the correct response?",
    answers: [
      "Grant it — coders have full chart access by default",
      "Deny it — role-based access limits the coder to the diagnostic information required for the claim",
      "Grant it if a supervisor verbally approves",
      "Grant it but ask the coder not to read the notes"
    ],
    correct: 1,
    explanation: "Role-based access is the operational form of the Minimum Necessary Standard. A coder needs diagnostic information to process a claim; psychotherapy notes are not required for that task and therefore should not be accessible.",
    reference: "Privacy Rule — role-based access",
    tags: ["data", "minimum-necessary", "access-control"]
  },

  /* ---------- MODULE 7 — EMAIL & COMMUNICATION ---------- */
  {
    id: 60, category: "email", difficulty: "Easy", type: "tf",
    question: "Sending unencrypted ePHI by standard email or text message is a direct violation of the Security Rule.",
    answers: ["True", "False"],
    correct: 0,
    explanation: "True. Whenever ePHI leaves the internal secure network it must be encrypted — secure file transfer protocols, HTTPS/TLS for web portals, or a specialized secure email service. Standard email and SMS do not meet the standard.",
    reference: "Security Rule — encryption in transit",
    tags: ["email", "encryption"]
  },
  {
    id: 61, category: "email", difficulty: "Medium", type: "mc",
    question: "A staff member sends a clinic-wide patient newsletter using 'CC' instead of 'BCC', exposing every recipient's email address. This is:",
    answers: [
      "A harmless formatting mistake",
      "A breach — email addresses are among the 18 identifiers and were disclosed to unauthorized third parties",
      "Acceptable if the newsletter contained no diagnoses",
      "Only a problem if a patient complains"
    ],
    correct: 1,
    explanation: "Using CC instead of BCC on a mass patient email is a recognized common breach scenario. Email addresses are one of the 18 identifiers, and the recipient list revealed that every person on it is a patient of the clinic.",
    reference: "Breach Notification Rule — common breaches, misdirected email",
    tags: ["email", "breach"]
  },
  {
    id: 62, category: "email", difficulty: "Medium", type: "multi",
    question: "Which of these are recognized signs of a phishing email? Select all that apply.",
    answers: [
      "A spoofed sender address that is subtly misspelled",
      "Urgent demands for immediate action",
      "Grammatical errors and awkward phrasing",
      "A message from a colleague you have emailed many times before with no links or attachments"
    ],
    correct: [0, 1, 2],
    explanation: "Spoofed sender addresses, manufactured urgency, and grammatical errors are the classic tells, along with malicious links. Employees must be trained to identify these before they click.",
    reference: "Security Rule — phishing awareness",
    tags: ["email", "phishing"]
  },
  {
    id: 63, category: "email", difficulty: "Hard", type: "scenario",
    question: "You fax a referral containing patient lab results and later realize the number was wrong — it went to a local business. What has occurred?",
    answers: [
      "Nothing reportable, since fax is not electronic transmission",
      "A breach — a misdirected fax to an unauthorized third party — which must be reported internally right away",
      "A minor incident to mention at the next staff meeting",
      "A violation only if the business opens the fax"
    ],
    correct: 1,
    explanation: "A misdirected fax to an unauthorized recipient is a recognized breach scenario and must be reported through internal channels immediately. Do not wait to find out whether it was read — the Privacy or Security Officer conducts the risk assessment, not you.",
    reference: "Breach Notification Rule — common breaches, misdirected fax",
    tags: ["email", "breach", "reporting"]
  },

  /* ---------- MODULE 8 — PHYSICAL SECURITY ---------- */
  {
    id: 70, category: "physical", difficulty: "Easy", type: "mc",
    question: "What is the purpose of a privacy screen on a front-desk monitor?",
    answers: [
      "To reduce eye strain for staff",
      "To keep ePHI on screen from being viewed by patients and visitors in a high-traffic area",
      "To dim the screen after hours",
      "To prevent screenshots"
    ],
    correct: 1,
    explanation: "Workstation security policies govern the physical surroundings of any computer accessing ePHI. That includes positioning monitors away from public view and using privacy screens in high-traffic areas.",
    reference: "Security Rule — workstation security",
    tags: ["physical", "workstations"]
  },
  {
    id: 71, category: "physical", difficulty: "Medium", type: "mc",
    question: "Typical policy requires an unattended workstation to lock automatically after how long?",
    answers: [
      "5 to 10 minutes of inactivity",
      "45 minutes of inactivity",
      "At the end of the workday",
      "Only when the screensaver is manually enabled"
    ],
    correct: 0,
    explanation: "Policies must mandate automatic session timeouts, typically 5 to 10 minutes of inactivity. Automatic logoff is a backstop, not a substitute — staff must also manually lock their screens every time they step away.",
    reference: "Security Rule — automatic and manual logoff",
    tags: ["physical", "logoff"]
  },
  {
    id: 72, category: "physical", difficulty: "Medium", type: "mc",
    question: "Why does compliance require Mobile Device Management (MDM) tooling?",
    answers: [
      "To monitor employee productivity",
      "Because mobile devices are highly susceptible to theft, MDM allows the organization to remotely track, lock, or wipe a lost or stolen device",
      "To reduce mobile data costs",
      "To install games and productivity apps centrally"
    ],
    correct: 1,
    explanation: "Laptops, tablets, and smartphones are the most theft-prone assets holding ePHI. MDM lets the organization remotely track, lock, or wipe them. Where BYOD is permitted, policy must enforce security software on personal devices too.",
    reference: "Security Rule — mobile device management",
    tags: ["physical", "mobile"]
  },
  {
    id: 73, category: "physical", difficulty: "Hard", type: "scenario",
    question: "A person in a vendor uniform asks you to badge them into the server room, saying IT is expecting them but their badge is not working. What is the correct response?",
    answers: [
      "Let them in — the uniform and the explanation are sufficient verification",
      "Refuse and verify the visit independently with IT or the Security Officer; this matches a known social engineering pattern",
      "Let them in but watch them from the doorway",
      "Let them in and report it afterward"
    ],
    correct: 1,
    explanation: "A vendor requesting unauthorized access to a physical server room is a textbook social engineering tactic, alongside attackers phoning the front desk pretending to be IT support. Verify independently through a known channel before granting any access.",
    reference: "Security Rule — social engineering defenses",
    tags: ["physical", "social-engineering"]
  },
  {
    id: 74, category: "physical", difficulty: "Medium", type: "tf",
    question: "An unencrypted laptop containing PHI is left in a locked car and stolen. Because the car was locked, this is not a breach.",
    answers: ["True", "False"],
    correct: 1,
    explanation: "False. A lost or stolen unencrypted device containing PHI is an automatic breach regardless of where it was left, because the organization has no way to prove the data was not viewed or extracted. Only NIST-standard encryption creates safe harbor.",
    reference: "Breach Notification Rule — lost or stolen clinic laptop",
    tags: ["physical", "breach", "encryption"]
  },

  /* ---------- MODULE 9 — CYBERSECURITY ---------- */
  {
    id: 80, category: "cyber", difficulty: "Medium", type: "mc",
    question: "What is 'pretexting'?",
    answers: [
      "Drafting a message before sending it",
      "A social engineering tactic where an attacker invents a scenario — such as posing as IT support — to extract credentials or access",
      "Encrypting text before transmission",
      "A required preface to any patient communication"
    ],
    correct: 1,
    explanation: "Pretexting is the construction of a false but plausible scenario to manipulate a person into handing over credentials or access. A common example is an attacker calling the front desk pretending to be IT support.",
    reference: "Security Rule — social engineering defenses",
    tags: ["cyber", "social-engineering"]
  },
  {
    id: 81, category: "cyber", difficulty: "Easy", type: "mc",
    question: "You clicked a suspicious link before realizing it was likely phishing. What should you do?",
    answers: [
      "Say nothing — reporting it will get you disciplined",
      "Report it immediately through the clinic's non-punitive internal reporting protocol",
      "Delete your browser history and continue working",
      "Wait to see whether anything bad happens"
    ],
    correct: 1,
    explanation: "Compliance requires clear, non-punitive internal protocols precisely so that staff report immediately rather than hiding mistakes. Speed of reporting is what limits the damage. Staff must know exactly who to contact after clicking a suspicious link.",
    reference: "Security Rule — reporting protocols",
    tags: ["cyber", "phishing", "reporting"]
  },
  {
    id: 82, category: "cyber", difficulty: "Hard", type: "mc",
    question: "An attacker uses stolen employee credentials to deploy ransomware that locks the EHR system. How is this classified?",
    answers: [
      "A non-reportable security incident, since the data was locked rather than stolen",
      "External unauthorized access — a recognized breach scenario",
      "An IT outage, handled outside HIPAA",
      "A breach only if the ransom is paid"
    ],
    correct: 1,
    explanation: "A successful phishing attack yielding employee credentials, allowing the attacker to download databases or deploy ransomware against the EHR, is a recognized example of external unauthorized access and a reportable breach scenario.",
    reference: "Breach Notification Rule — unauthorized access, external",
    tags: ["cyber", "ransomware", "breach"]
  },
  {
    id: 83, category: "cyber", difficulty: "Medium", type: "tf",
    question: "Security awareness training is required for all workforce members, including management.",
    answers: ["True", "False"],
    correct: 0,
    explanation: "True. The Security Rule's administrative safeguards mandate a comprehensive security awareness and training program for all workforce members, management included. Technology alone cannot prevent breaches if the human element is compromised.",
    reference: "Security Rule — administrative safeguards, mandatory training",
    tags: ["cyber", "training"]
  },
  {
    id: 84, category: "cyber", difficulty: "Medium", type: "mc",
    question: "Which of these is a security incident but NOT necessarily a reportable breach?",
    answers: [
      "A firewall successfully blocking an attempted cyberattack",
      "An unencrypted laptop full of PHI stolen from a car",
      "A staff member snooping in a neighbor's chart",
      "Lab results faxed to the wrong business"
    ],
    correct: 0,
    explanation: "A security incident is any attempted or successful unauthorized access, use, disclosure, modification, or destruction of information, or interference with system operations. A blocked attack or a brief network outage is an incident, but no PHI was compromised, so it is not a breach.",
    reference: "Breach Notification Rule — incident vs. breach",
    tags: ["cyber", "breach", "definitions"]
  },

  /* ---------- MODULE 10 — REPORTING INCIDENTS ---------- */
  {
    id: 90, category: "reporting", difficulty: "Easy", type: "mc",
    question: "How many calendar days from discovery does an organization have to notify affected individuals of a reportable breach?",
    answers: ["10 days", "30 days", "60 days", "180 days"],
    correct: 2,
    explanation: "Organizations must notify affected individuals without unreasonable delay and no later than 60 calendar days from discovery. The 'date of discovery' is the day the breach is known, or the day it should have been known with reasonable diligence.",
    reference: "Breach Notification Rule — 60-day deadline",
    tags: ["reporting", "timelines"]
  },
  {
    id: 91, category: "reporting", difficulty: "Hard", type: "mc",
    question: "A breach affects 500 or more individuals. Who must be notified within the 60-day window?",
    answers: [
      "The affected individuals only",
      "The affected individuals and the Secretary of HHS",
      "The affected individuals, the Secretary of HHS, and prominent local media outlets",
      "Only the Secretary of HHS"
    ],
    correct: 2,
    explanation: "At 500 or more individuals, notification scales up: affected individuals, the Secretary of HHS, and prominent local media in the jurisdiction where affected individuals reside — all within 60 days. Below 500, individuals are notified within 60 days but HHS may be notified annually.",
    reference: "Breach Notification Rule — scaling notifications",
    tags: ["reporting", "timelines", "scale"]
  },
  {
    id: 92, category: "reporting", difficulty: "Hard", type: "multi",
    question: "The four-factor risk assessment determines whether an impermissible disclosure is reportable. Select the four factors.",
    answers: [
      "The nature and extent of the PHI involved",
      "Who the unauthorized person receiving it was",
      "Whether the PHI was actually acquired or viewed",
      "The extent to which the risk has been mitigated"
    ],
    correct: [0, 1, 2, 3],
    explanation: "All four apply. The law presumes a reportable breach occurred unless the organization can demonstrate a low probability that PHI was actually compromised, and it must run all four factors to do so.",
    reference: "Breach Notification Rule — four-factor risk assessment",
    tags: ["reporting", "risk-assessment"]
  },
  {
    id: 93, category: "reporting", difficulty: "Medium", type: "scenario",
    question: "You witness a coworker browsing the chart of a local celebrity with no clinical reason. What should you do?",
    answers: [
      "Confront the coworker directly and ask them to stop",
      "Report it immediately through the designated channel — supervisor, compliance hotline, or the Privacy Officer",
      "Take screenshots of their screen as evidence and email them to management",
      "Do nothing unless you see it happen a second time"
    ],
    correct: 1,
    explanation: "Report immediately through designated channels. Employees should not confront the suspected individual directly, and should not attempt to gather or attach unnecessary PHI to the report. Provide a factual account with only the minimum necessary information.",
    reference: "FQHC policy — internal breach reporting procedures",
    tags: ["reporting", "snooping", "procedure"]
  },
  {
    id: 94, category: "reporting", difficulty: "Medium", type: "mc",
    question: "You realize you sent a message containing PHI to the wrong recipient. What should you NOT do?",
    answers: [
      "Report it immediately to your supervisor or the Privacy Officer",
      "Delete the sent message and any related records to clean up the mistake",
      "Write a factual account of who was involved, what happened, and when",
      "Include only the minimum necessary information in your internal report"
    ],
    correct: 1,
    explanation: "Do not attempt to 'fix' the issue by deleting messages or altering records — that impedes the internal investigation and can look like concealment. Preserve the evidence and report it.",
    reference: "FQHC policy — preserve evidence",
    tags: ["reporting", "procedure"]
  },
  {
    id: 95, category: "reporting", difficulty: "Medium", type: "multi",
    question: "A breach notification letter to affected patients must contain which of the following? Select all that apply.",
    answers: [
      "A description of what happened, including the dates of the breach and its discovery",
      "The exact types of unsecured PHI involved",
      "Steps individuals should take to protect themselves, and toll-free contact information",
      "The names of the employees responsible"
    ],
    correct: [0, 1, 2],
    explanation: "Letters sent by first-class mail must describe what happened and when, specify the types of unsecured PHI involved, explain what individuals should do to protect themselves, describe what the organization is doing to investigate and mitigate, and provide toll-free contact information. Naming individual employees is not a required element.",
    reference: "Breach Notification Rule — required notification contents",
    tags: ["reporting", "notification"]
  },
  {
    id: 96, category: "reporting", difficulty: "Hard", type: "mc",
    question: "An employee reports a suspected breach internally and believes the clinic failed to act. What right must policy inform them of?",
    answers: [
      "The right to resign with severance",
      "The right to escalate the complaint directly to the HHS Office for Civil Rights, including if they fear retaliation",
      "The right to notify affected patients themselves",
      "The right to publish the incident publicly"
    ],
    correct: 1,
    explanation: "Policy must inform employees that they may escalate directly to the HHS Office for Civil Rights if they feel the clinic failed to act on their internal report, or if they fear retaliation.",
    reference: "FQHC policy — escalation rights",
    tags: ["reporting", "escalation"]
  },
  {
    id: 97, category: "reporting", difficulty: "Medium", type: "mc",
    question: "Who conducts the formal risk assessment after a suspected breach is reported?",
    answers: [
      "The employee who discovered it",
      "The Privacy or Security Officer, or a designated incident response team",
      "The patient whose data was involved",
      "The clinic's malpractice insurer"
    ],
    correct: 1,
    explanation: "Once reported, the Privacy or Security Officer — or a designated incident response team — conducts the formal risk assessment to determine severity and whether the event is a reportable breach under HHS guidelines. Frontline staff report; officers assess.",
    reference: "FQHC policy — internal investigation",
    tags: ["reporting", "procedure", "roles"]
  },
  {
    id: 98, category: "reporting", difficulty: "Medium", type: "mc",
    question: "How long must the clinic retain HIPAA privacy and security documentation, including training records?",
    answers: [
      "1 year",
      "3 years",
      "6 years from creation or the date it was last in effect, whichever is later",
      "Indefinitely"
    ],
    correct: 2,
    explanation: "Covered entities must retain all privacy and security documentation for a minimum of six years, running from the date the document was created or the date it was last in effect, whichever is later. In OCR's view, if it isn't documented, it didn't happen.",
    reference: "45 CFR § 164.530(j)(2) and 45 CFR § 164.316(b)(2)",
    tags: ["reporting", "documentation", "retention"]
  },
  {
    id: 99, category: "reporting", difficulty: "Hard", type: "multi",
    question: "To withstand an OCR audit, each employee's training log must capture which data elements? Select all that apply.",
    answers: [
      "Name and role",
      "Date completed and the module name or curriculum version",
      "Test score or assessment result",
      "Signature or attestation"
    ],
    correct: [0, 1, 2, 3],
    explanation: "All four are required. Name and role proves who was trained and supports role-based training requirements; date proves when; module name ties the log to the specific version of material; the score proves comprehension; and the signed attestation proves accountability.",
    reference: "Documentation — required data elements per employee record",
    tags: ["reporting", "documentation", "audit"]
  }
];

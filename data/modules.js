/* ============================================================================
   HIPAA HERO — TRAINING MODULES
   ----------------------------------------------------------------------------
   Each module is a learning stage. `id` must match the `category` field used
   by questions in data/questions.js.

   SCHEMA
   {
     id:    String  — matches question.category
     n:     Number  — display order
     title: String
     blurb: String  — one-line summary on the module select screen
     cards: [ { heading, body, points: [String, ...] } ]
   }
   ============================================================================ */

const MODULES = [
  {
    id: "basics", n: 1, title: "HIPAA BASICS",
    blurb: "What the law is, who enforces it, and who must be trained.",
    cards: [
      {
        heading: "What HIPAA Is",
        body: "The Health Insurance Portability and Accountability Act is a federal law enacted in 1996. Its purpose is to protect sensitive patient health information from being shared or exposed without the patient's consent or knowledge.",
        points: [
          "Signing privacy forms at the doctor's office is HIPAA in action.",
          "It protects Protected Health Information (PHI): diagnoses, treatment plans, prescriptions, billing.",
          "Enforced by the HHS Office for Civil Rights (OCR)."
        ]
      },
      {
        heading: "The Three Rules",
        body: "HIPAA enforces protection through three main rules. Every topic in this training maps back to one of them.",
        points: [
          "PRIVACY RULE — who can see health information and what they can do with it.",
          "SECURITY RULE — how information must be protected, especially electronic records.",
          "BREACH NOTIFICATION RULE — who must be told when protection fails."
        ]
      },
      {
        heading: "Why It Exists",
        body: "HIPAA fundamentally changed how medical information is handled in the United States.",
        points: [
          "DIGITAL SHIFT — a hacker can't steal 10,000 paper files, but can steal 10,000 digital ones in seconds.",
          "TRUST — patients who fear exposure avoid seeking care they need.",
          "OWNERSHIP — patients gained the legal right to view records, correct errors, and see who accessed their data.",
          "ANTI-DISCRIMINATION — employers can't reach your medical history to make hiring decisions."
        ]
      },
      {
        heading: "Our Clinic's Obligation",
        body: "Federally Qualified Health Centers handle PHI, which makes us a Covered Entity subject to the full set of HIPAA obligations, including training.",
        points: [
          "Training is required for new workforce members within a reasonable period of joining.",
          "Training is required again whenever there is a material change to policies or procedures.",
          "Annual refreshers are the industry standard — gaps over 12 months get cited in enforcement actions.",
          "Everyone is covered: full-time, part-time, volunteers, students, interns, contractors, temps, remote staff, and IT."
        ]
      }
    ]
  },
  {
    id: "phi", n: 2, title: "PROTECTED HEALTH INFO",
    blurb: "What counts as PHI, and the 18 identifiers that make data identifiable.",
    cards: [
      {
        heading: "Defining PHI",
        body: "PHI is any demographic information that can be used to identify a patient AND relates to their past, present, or future physical or mental health condition, treatment, or payment.",
        points: [
          "Both halves matter: identifiable AND health-related.",
          "Billing records are PHI. So is an appointment list.",
          "It doesn't have to be in the EHR to be PHI."
        ]
      },
      {
        heading: "The 18 Identifiers",
        body: "To use health data for research or public health without violating privacy, HHS requires the removal of 18 specific identifiers to consider the data 'de-identified'.",
        points: [
          "1–3: Names · Geographic data smaller than a state (street, city, county, ZIP) · All dates except the year",
          "4–9: Phone · Fax · Email · SSN · Medical record numbers · Health plan beneficiary numbers",
          "10–14: Account numbers · License numbers · Vehicle IDs and VINs · Device serial numbers · URLs",
          "15–18: IP addresses · Biometrics (fingerprints, retinal scans, voiceprints) · Full-face photos · Any other unique code"
        ]
      },
      {
        heading: "The Date Trap",
        body: "Dates are the identifier staff most often overlook.",
        points: [
          "All dates directly related to the individual must go — birthdate, admission, discharge, death.",
          "Only the year may remain.",
          "Exact ages for anyone 89 or older must also be removed, because extreme age is itself identifying."
        ]
      }
    ]
  },
  {
    id: "privacy", n: 3, title: "PRIVACY RULE",
    blurb: "Minimum necessary access, and permissible vs. impermissible disclosure.",
    cards: [
      {
        heading: "Minimum Necessary Standard",
        body: "Covered entities must make reasonable efforts to limit access, use, and disclosure of PHI to only the information strictly required to accomplish the intended purpose.",
        points: [
          "ROLE-BASED ACCESS — a coder needs diagnostic data for a claim, not psychotherapy notes.",
          "An IT technician maintaining a server does not need to view medical records at all.",
          "ROUTINE DISCLOSURES — policy must define exactly what gets shared for recurring administrative requests."
        ]
      },
      {
        heading: "Three Exceptions",
        body: "The Minimum Necessary Standard does not apply in three situations.",
        points: [
          "A healthcare provider requesting full records for TREATMENT purposes.",
          "A disclosure the PATIENT explicitly authorized.",
          "Information REQUIRED BY LAW, such as an HHS compliance audit."
        ]
      },
      {
        heading: "Permissible Disclosures",
        body: "PHI may be used or shared without written patient authorization in these scenarios.",
        points: [
          "TPO — Treatment, Payment, Healthcare Operations. Referrals, insurance claims, internal quality assessment.",
          "TO THE INDIVIDUAL — records to the patient or their legally authorized representative.",
          "PUBLIC INTEREST — contagious disease reporting, suspected abuse or neglect, court orders, specific law enforcement requests.",
          "INCIDENTAL — a name faintly overheard in a hallway, if reasonable safeguards are in place."
        ]
      },
      {
        heading: "Impermissible Disclosures",
        body: "An impermissible disclosure occurs when PHI is accessed, used, or shared without authorization and no regulatory exception applies. These are violations.",
        points: [
          "SNOOPING — looking into records of friends, family, coworkers, or celebrities with no job-related need.",
          "SELLING PHI to third-party marketers without explicit written authorization.",
          "LOSING unencrypted devices or paper files containing PHI.",
          "DISCUSSING patient details in public areas where others can clearly overhear."
        ]
      }
    ]
  },
  {
    id: "security", n: 4, title: "SECURITY RULE",
    blurb: "Passwords, MFA, unique IDs, and the three safeguard categories.",
    cards: [
      {
        heading: "Privacy vs. Security",
        body: "The Privacy Rule dictates WHO can access data. The Security Rule dictates HOW that data must be protected. The Security Rule governs electronic PHI (ePHI) specifically.",
        points: [
          "Three safeguard categories: ADMINISTRATIVE, PHYSICAL, and TECHNICAL.",
          "Goal: confidentiality, integrity, and availability of ePHI.",
          "Applies to covered entities AND their business associates."
        ]
      },
      {
        heading: "Password Hygiene",
        body: "Technical safeguards require strict access controls to verify a person seeking ePHI is who they claim to be.",
        points: [
          "Minimum length, mixed case, numbers, and special characters.",
          "Sharing credentials between employees is explicitly forbidden — no staffing exceptions.",
          "Routine resets every 60 to 90 days, or immediately upon suspected compromise."
        ]
      },
      {
        heading: "MFA and Unique IDs",
        body: "Passwords alone are no longer a sufficient safeguard for remote access or privileged accounts.",
        points: [
          "MFA uses two or more factors: something you KNOW, something you HAVE, something you ARE.",
          "Know = password. Have = security token or mobile code. Are = fingerprint or other biometric.",
          "UNIQUE USER ID — every employee gets their own identifier so all access can be traced to an individual.",
          "Shared logins destroy the audit trail: if two people use one account, neither action can be attributed."
        ]
      }
    ]
  },
  {
    id: "rights", n: 5, title: "PATIENT RIGHTS",
    blurb: "Access, amendment, restriction, and accounting — plus the 30-day clock.",
    cards: [
      {
        heading: "Right to Access",
        body: "Patients have the right to inspect and obtain a copy of their PHI.",
        points: [
          "Providers must respond within 30 DAYS.",
          "Records must be provided in the format the patient requested — including electronic — if readily producible.",
          "Our clinic must have a standardized process and form for receiving these requests."
        ]
      },
      {
        heading: "Right to Amend",
        body: "If a patient believes their record is inaccurate or incomplete, they can formally request an amendment.",
        points: [
          "The provider may deny the amendment.",
          "But if denied, the patient must be allowed to add a STATEMENT OF DISAGREEMENT to their record."
        ]
      },
      {
        heading: "Right to Request Restrictions",
        body: "Patients can request limits on how their PHI is used or disclosed for standard operations.",
        points: [
          "Providers are not strictly required to agree to every request.",
          "ONE MANDATORY CASE — if a patient pays entirely out-of-pocket for a service and asks that it not be shared with their insurer, the restriction MUST be honored."
        ]
      },
      {
        heading: "Accounting, NPP, and Complaints",
        body: "Patients can request a log of disclosures, and must be told their rights at intake.",
        points: [
          "ACCOUNTING OF DISCLOSURES — a log of PHI disclosures made for reasons OTHER than treatment, payment, or operations.",
          "NOTICE OF PRIVACY PRACTICES (NPP) — given at intake, states rights and how to file a complaint.",
          "The NPP must give direct contact information for the clinic's Privacy Officer.",
          "NO RETALIATION — the clinic will not retaliate against a patient for filing a complaint, internally or with OCR."
        ]
      }
    ]
  },
  {
    id: "data", n: 6, title: "DATA HANDLING",
    blurb: "Encryption at rest and in transit, integrity controls, and safe harbor.",
    cards: [
      {
        heading: "Encryption at Rest",
        body: "Securing data stored on hard drives, databases, laptops, and flash drives. If an encrypted device is lost or stolen, the data stays unreadable without the decryption key.",
        points: [
          "SAFE HARBOR — under the Breach Notification Rule, a lost device encrypted to NIST standards (with the key uncompromised) is NOT a reportable breach.",
          "This makes encryption the single highest-leverage safeguard the clinic deploys.",
          "An UNENCRYPTED lost device is an automatic breach."
        ]
      },
      {
        heading: "Encryption in Transit",
        body: "Whenever ePHI is sent outside the internal secure network, it must be encrypted.",
        points: [
          "Secure file transfer protocols (SFTP).",
          "HTTPS/TLS enforced for web portals.",
          "Specialized secure email services.",
          "Sending unencrypted ePHI by standard email or text message is a DIRECT VIOLATION."
        ]
      },
      {
        heading: "Integrity Controls",
        body: "Policies and procedures to corroborate that ePHI has not been altered or destroyed in an unauthorized manner during transmission.",
        points: [
          "Typically achieved through digital signatures or checksums.",
          "Integrity is one of the three Security Rule goals, alongside confidentiality and availability."
        ]
      }
    ]
  },
  {
    id: "email", n: 7, title: "EMAIL & COMMUNICATION",
    blurb: "Phishing tells, misdirected messages, and the CC/BCC trap.",
    cards: [
      {
        heading: "Recognizing Phishing",
        body: "Technology alone cannot prevent breaches if the human element is compromised. Every workforce member must be able to spot a phishing attempt.",
        points: [
          "SPOOFED SENDER — an address that is subtly misspelled or off-domain.",
          "URGENCY — demands for immediate action designed to bypass your judgment.",
          "ERRORS — grammatical mistakes and awkward phrasing.",
          "MALICIOUS LINKS — hover before you click; check where it actually goes."
        ]
      },
      {
        heading: "Misdirected Messages",
        body: "These are among the most common breaches in clinical settings, and they happen to careful people.",
        points: [
          "Sending lab results to the WRONG FAX NUMBER.",
          "Attaching the WRONG FILE to a patient portal message.",
          "Using CC instead of BCC on a mass patient email — the recipient list itself reveals who is a patient.",
          "If the recipient is an unauthorized third party, it is a breach. Report it immediately."
        ]
      },
      {
        heading: "Social Engineering by Phone",
        body: "Attackers don't always use email. Pretexting means inventing a plausible scenario to extract access.",
        points: [
          "An attacker calls the front desk pretending to be IT support, asking for login credentials.",
          "A 'vendor' requests access to the physical server room.",
          "VERIFY INDEPENDENTLY through a known channel before granting anything."
        ]
      }
    ]
  },
  {
    id: "physical", n: 8, title: "PHYSICAL SECURITY",
    blurb: "Workstations, screen locks, mobile devices, and visitor verification.",
    cards: [
      {
        heading: "Workstation Security",
        body: "Physical safeguards protect electronic systems and the buildings holding them from hazards and unauthorized intrusion.",
        points: [
          "Position monitors AWAY from public view.",
          "Use PRIVACY SCREENS in high-traffic areas such as the front desk.",
          "Restrict installation of unauthorized software."
        ]
      },
      {
        heading: "Logging Off",
        body: "An unattended, unlocked workstation is an open door to every record it can reach.",
        points: [
          "AUTOMATIC session timeout after 5 to 10 minutes of inactivity.",
          "MANUAL lock every single time you step away from your desk.",
          "Automatic logoff is a backstop, not a substitute for the habit."
        ]
      },
      {
        heading: "Mobile Devices",
        body: "Laptops, tablets, and smartphones are the most theft-prone assets holding ePHI.",
        points: [
          "MDM tooling lets the organization remotely TRACK, LOCK, or WIPE a lost device.",
          "Where BYOD is permitted, policy must enforce security software on personal devices.",
          "An unencrypted stolen laptop is an automatic breach — a locked car is not a defense."
        ]
      }
    ]
  },
  {
    id: "cyber", n: 9, title: "CYBERSECURITY",
    blurb: "Incidents vs. breaches, ransomware, and non-punitive reporting.",
    cards: [
      {
        heading: "Incident vs. Breach",
        body: "Not every security event triggers a notification. Knowing the difference prevents both panic and complacency.",
        points: [
          "SECURITY INCIDENT — attempted or successful unauthorized access, use, disclosure, modification, or destruction of information, or interference with system operations.",
          "A firewall blocking an attack, or a brief network outage, is an incident. No PHI was compromised.",
          "REPORTABLE BREACH — an impermissible use or disclosure that compromises the security or privacy of PHI."
        ]
      },
      {
        heading: "External Attacks",
        body: "A successful phishing attack against one employee can compromise the entire EHR.",
        points: [
          "Stolen credentials let an attacker download databases.",
          "Ransomware can lock down the entire Electronic Health Record system.",
          "Both are recognized breach scenarios under external unauthorized access."
        ]
      },
      {
        heading: "Report Without Fear",
        body: "Compliance requires clear, NON-PUNITIVE internal protocols for reporting suspected security incidents.",
        points: [
          "If you click a suspicious link, report it IMMEDIATELY.",
          "Speed of reporting is what limits the damage.",
          "You must know exactly who to contact — hiding a mistake is far worse than making one."
        ]
      }
    ]
  },
  {
    id: "reporting", n: 10, title: "REPORTING INCIDENTS",
    blurb: "The 4-factor test, the 60-day clock, and what to do in the first five minutes.",
    cards: [
      /* ====================================================================
         >>> EDIT THIS CARD BEFORE ROLLOUT <<<
         Replace every [BRACKETED] placeholder with your clinic's real
         details. Generic HIPAA content is not sufficient on its own — the
         source guidance requires training to name the individuals currently
         holding these roles and the exact internal reporting channel.
         Leave the brackets in place and staff will see them on screen,
         which is the intended reminder.
         ==================================================================== */
      {
        heading: "Who To Contact At Our Clinic",
        body: "Every workforce member must know exactly who to reach and how, before they need to. These are the people responsible for HIPAA compliance here.",
        points: [
          "PRIVACY OFFICER — [NAME], [TITLE]. Phone: [PHONE]. Email: [EMAIL].",
          "SECURITY OFFICER — [NAME], [TITLE]. Phone: [PHONE]. Email: [EMAIL].",
          "COMPLIANCE HOTLINE — [PHONE NUMBER]. Confidential; available [HOURS].",
          "TO REPORT A SUSPECTED BREACH — [e.g. tell your direct supervisor immediately, then submit the incident form at [LOCATION]].",
          "FOR A PATIENT RECORDS REQUEST — [e.g. direct the patient to the front desk and use Form [X]; the 30-day clock starts the day the request is received].",
          "FOR A PATIENT PRIVACY COMPLAINT — [e.g. route it to the Privacy Officer the same day; do not attempt to resolve it yourself]."
        ]
      },
      {
        heading: "The Four-Factor Risk Assessment",
        body: "When an impermissible disclosure occurs, the law PRESUMES a reportable breach unless the organization can demonstrate a low probability that PHI was compromised.",
        points: [
          "1. The NATURE AND EXTENT of the PHI involved — sensitive records, or just appointment times?",
          "2. WHO received it — another HIPAA-bound physician, or an unknown cybercriminal?",
          "3. Whether the PHI was ACTUALLY acquired or viewed — was the stolen laptop recovered unopened?",
          "4. The extent to which the risk was MITIGATED — was the misdirected email recalled before it was read?"
        ]
      },
      {
        heading: "The 60-Day Clock",
        body: "Notification must occur without unreasonable delay and no later than 60 calendar days from discovery.",
        points: [
          "'Date of discovery' = when it was known, OR when it should have been known with reasonable diligence.",
          "UNDER 500 PEOPLE — notify individuals within 60 days; HHS may be notified annually.",
          "500 OR MORE — notify individuals, HHS, AND prominent local media, all within 60 days."
        ]
      },
      {
        heading: "Your First Five Minutes",
        body: "If you suspect a breach — a missing laptop, a coworker snooping, a fax to the wrong number — this is the procedure.",
        points: [
          "REPORT IMMEDIATELY to your supervisor, the compliance hotline, or the Privacy Officer — the contacts on the first card of this module.",
          "DOCUMENT factually: who, what, when, where, and how the PHI was affected.",
          "MINIMUM NECESSARY — don't attach full medical records to your internal report.",
          "PRESERVE EVIDENCE — do not delete messages or alter records to 'fix' it.",
          "DO NOT confront the suspected individual directly."
        ]
      },
      {
        heading: "Documentation and Your Rights",
        body: "In OCR's view, if it isn't documented, it didn't happen.",
        points: [
          "Training and privacy records are retained a MINIMUM OF SIX YEARS from creation or last effect, whichever is later.",
          "Each record captures name and role, date completed, module name, test score, and signed attestation.",
          "The Privacy or Security Officer conducts the formal risk assessment — you report, they assess.",
          "You may escalate directly to the HHS OFFICE FOR CIVIL RIGHTS if the clinic fails to act or you fear retaliation."
        ]
      }
    ]
  }
];

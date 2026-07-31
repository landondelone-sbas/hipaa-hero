/* ============================================================================
   HIPAA HERO — GLOSSARY
   ----------------------------------------------------------------------------
   Sorted alphabetically by the app at runtime; order here does not matter.

   SCHEMA
   { term, definition, example, related: [String, ...] }
   ============================================================================ */

const GLOSSARY = [
  {
    term: "Breach",
    definition: "An impermissible use or disclosure under the Privacy Rule that compromises the security or privacy of PHI. The law presumes a breach occurred unless a four-factor risk assessment demonstrates a low probability of compromise.",
    example: "An unencrypted clinic laptop containing patient records is stolen from a vehicle.",
    related: ["Security Incident", "Four-Factor Risk Assessment", "Safe Harbor"]
  },
  {
    term: "Breach Notification Rule",
    definition: "The HIPAA rule requiring covered entities to notify affected individuals, HHS, and sometimes the media when PHI is compromised — no later than 60 calendar days from discovery.",
    example: "A ransomware attack exposes 800 patient records, triggering individual, HHS, and local media notification within 60 days.",
    related: ["Breach", "60-Day Deadline"]
  },
  {
    term: "Business Associate Agreement (BAA)",
    definition: "A contract between a covered entity and a vendor that handles PHI on its behalf, binding the vendor to HIPAA safeguards.",
    example: "The clinic signs a BAA with its cloud EHR vendor before any patient data is uploaded.",
    related: ["Covered Entity", "Privacy Officer"]
  },
  {
    term: "Covered Entity",
    definition: "A healthcare provider, health plan, or clearinghouse subject to HIPAA. Because FQHCs handle PHI, they are Covered Entities and must meet all HIPAA obligations including workforce training.",
    example: "This clinic is a Covered Entity, which is why this training exists.",
    related: ["Business Associate Agreement (BAA)", "FQHC"]
  },
  {
    term: "De-identification",
    definition: "The removal of 18 specific HHS identifiers from health data so it may be used for research or public health without violating privacy.",
    example: "Stripping names, ZIP codes, all dates except the year, and IP addresses from a dataset before analysis.",
    related: ["18 Identifiers", "Protected Health Information (PHI)"]
  },
  {
    term: "18 Identifiers",
    definition: "The HHS list of data elements that must be removed for de-identification: names; geographic subdivisions smaller than a state; all dates except year; phone; fax; email; SSN; medical record numbers; health plan beneficiary numbers; account numbers; certificate or license numbers; vehicle identifiers; device identifiers; URLs; IP addresses; biometric identifiers; full-face photographs; and any other unique identifying code.",
    example: "An IP address alone is enough to make a dataset identifiable.",
    related: ["De-identification", "Protected Health Information (PHI)"]
  },
  {
    term: "ePHI",
    definition: "Electronic Protected Health Information — PHI created, stored, transmitted, or received electronically. It is the specific subject of the Security Rule.",
    example: "A patient chart in the EHR, a lab result in an email, a scan on a shared drive.",
    related: ["Protected Health Information (PHI)", "Security Rule", "Encryption"]
  },
  {
    term: "Encryption",
    definition: "Converting data into a form unreadable without a decryption key. Required at rest (stored data) and in transit (data leaving the secure network).",
    example: "Using SFTP or a secure email service rather than standard email to send lab results externally.",
    related: ["Safe Harbor", "ePHI", "Integrity Controls"]
  },
  {
    term: "Four-Factor Risk Assessment",
    definition: "The test determining whether an impermissible disclosure is a reportable breach: (1) nature and extent of the PHI, (2) who received it, (3) whether it was actually acquired or viewed, (4) the extent the risk was mitigated.",
    example: "A misdirected email recalled and confirmed deleted before being read may score low on all four factors.",
    related: ["Breach", "Security Incident"]
  },
  {
    term: "FQHC",
    definition: "Federally Qualified Health Center — a community-based health center receiving HRSA funding. FQHCs handle PHI and are therefore Covered Entities under HIPAA.",
    example: "This clinic operates as an FQHC and undergoes HRSA Operational Site Visits.",
    related: ["Covered Entity", "Operational Site Visit (OSV)"]
  },
  {
    term: "Incidental Disclosure",
    definition: "A minor, unavoidable disclosure that is permitted provided the facility has enacted reasonable administrative and physical safeguards.",
    example: "A patient's name faintly overheard by another patient in a hallway.",
    related: ["Permissible Disclosure", "Privacy Rule"]
  },
  {
    term: "Integrity Controls",
    definition: "Policies and procedures confirming that ePHI has not been altered or destroyed in an unauthorized manner during transmission, typically via digital signatures or checksums.",
    example: "A checksum verifies a transferred record arrived unmodified.",
    related: ["Encryption", "Security Rule"]
  },
  {
    term: "Minimum Necessary Standard",
    definition: "The requirement to limit access, use, and disclosure of PHI to only what is strictly required to accomplish the intended purpose. Implemented operationally as role-based access.",
    example: "A medical coder can see diagnostic codes for a claim but not psychotherapy notes.",
    related: ["Role-Based Access", "Privacy Rule", "Permissible Disclosure"]
  },
  {
    term: "Multi-Factor Authentication (MFA)",
    definition: "Requiring two or more verification factors to gain access: something you know, something you have, or something you are. Passwords alone are no longer sufficient for remote or privileged access.",
    example: "A password plus a rotating code from a phone app.",
    related: ["Unique User Identification", "Security Rule"]
  },
  {
    term: "Notice of Privacy Practices (NPP)",
    definition: "The document provided to patients at intake outlining their privacy rights, how their PHI may be used, and how to file a complaint, including the Privacy Officer's contact information.",
    example: "The privacy packet a patient signs at their first visit.",
    related: ["Patient Rights", "Privacy Officer"]
  },
  {
    term: "Operational Site Visit (OSV)",
    definition: "A HRSA review evaluating an FQHC's compliance with Health Center Program requirements. Typically 2.5 to 3 days on-site, scheduled in advance, with a final report within 45 days.",
    example: "Reviewers request HIPAA training records as part of the Human Resources and Compliance category.",
    related: ["FQHC", "Six-Year Retention Rule"]
  },
  {
    term: "Permissible Disclosure",
    definition: "A use or sharing of PHI allowed without written patient authorization: TPO, disclosures to the individual, public interest and benefit disclosures, and incidental disclosures.",
    example: "Sending a claim to an insurance company.",
    related: ["TPO", "Incidental Disclosure", "Impermissible Disclosure"]
  },
  {
    term: "Impermissible Disclosure",
    definition: "PHI accessed, used, or shared without authorization where no regulatory exception applies. A HIPAA violation.",
    example: "An employee looking up a neighbor's chart with no job-related need.",
    related: ["Snooping", "Breach", "Permissible Disclosure"]
  },
  {
    term: "Phishing",
    definition: "A fraudulent message designed to trick a recipient into revealing credentials or installing malware. Tells include spoofed sender addresses, urgent demands, grammatical errors, and malicious links.",
    example: "An 'IT department' email demanding you re-enter your password within the hour.",
    related: ["Social Engineering", "Pretexting"]
  },
  {
    term: "Pretexting",
    definition: "A social engineering tactic where an attacker invents a plausible scenario to extract credentials or physical access.",
    example: "A caller claiming to be IT support asking the front desk to read out a login.",
    related: ["Social Engineering", "Phishing"]
  },
  {
    term: "Privacy Officer",
    definition: "The individual responsible for the administrative and human side of HIPAA: the NPP, Business Associate Agreements, workforce training, records requests, and privacy complaints.",
    example: "The person you contact first when you suspect a privacy violation.",
    related: ["Security Officer", "Notice of Privacy Practices (NPP)"]
  },
  {
    term: "Privacy Rule",
    definition: "The HIPAA rule establishing national standards for protecting medical records and identifiable health information. It governs WHO can access PHI and what they may do with it.",
    example: "The Minimum Necessary Standard and patient rights both come from the Privacy Rule.",
    related: ["Security Rule", "Minimum Necessary Standard", "Patient Rights"]
  },
  {
    term: "Protected Health Information (PHI)",
    definition: "Any demographic information that can identify a patient and relates to their past, present, or future physical or mental health condition, treatment, or payment.",
    example: "Diagnoses, treatment plans, prescription records, and billing information.",
    related: ["ePHI", "18 Identifiers", "De-identification"]
  },
  {
    term: "Patient Rights",
    definition: "The controls the Privacy Rule grants patients over their health data: the right to access, to amend, to request restrictions, and to an accounting of disclosures.",
    example: "A patient requesting an electronic copy of their record, which must be provided within 30 days.",
    related: ["Privacy Rule", "Notice of Privacy Practices (NPP)"]
  },
  {
    term: "Role-Based Access",
    definition: "Granting each employee access only to the specific data required to perform their job duties. The operational form of the Minimum Necessary Standard.",
    example: "An IT technician maintaining a server does not need to view patient medical records at all.",
    related: ["Minimum Necessary Standard", "Unique User Identification"]
  },
  {
    term: "Safe Harbor",
    definition: "The exception under which a lost or stolen device is NOT a reportable breach, provided the ePHI was encrypted to NIST standards and the decryption key was not compromised.",
    example: "An encrypted laptop stolen from a car is a security incident, not a breach.",
    related: ["Encryption", "Breach", "Security Incident"]
  },
  {
    term: "Security Incident",
    definition: "Any attempted or successful unauthorized access, use, disclosure, modification, or destruction of information, or interference with system operations. Not every incident is a breach.",
    example: "A firewall blocking an attempted cyberattack.",
    related: ["Breach", "Four-Factor Risk Assessment"]
  },
  {
    term: "Security Officer",
    definition: "The individual responsible for protecting ePHI and the systems housing it: risk analyses, technical safeguards, audit logs, disaster recovery, and cyber threat response.",
    example: "In smaller FQHCs, one person often serves as both Privacy and Security Officer.",
    related: ["Privacy Officer", "Security Rule"]
  },
  {
    term: "Security Rule",
    definition: "The HIPAA rule governing ePHI specifically. It dictates HOW data must be protected, requiring administrative, physical, and technical safeguards.",
    example: "Password policies, MFA, automatic logoff, and encryption all come from the Security Rule.",
    related: ["Privacy Rule", "ePHI", "Encryption"]
  },
  {
    term: "Six-Year Retention Rule",
    definition: "The requirement to retain all HIPAA privacy and security documentation — including training logs — for a minimum of six years from creation or the date last in effect, whichever is later.",
    example: "A 2026 training policy retired in 2028 must be retained with its logs until at least 2034.",
    related: ["Operational Site Visit (OSV)", "Attestation"]
  },
  {
    term: "Attestation",
    definition: "A legally binding signature — physical or electronic with a timestamp — in which an employee certifies they completed training, understand their obligations, and agree to abide by them.",
    example: "The signature line on your training completion record.",
    related: ["Six-Year Retention Rule"]
  },
  {
    term: "Snooping",
    definition: "Accessing the records of friends, family, coworkers, or public figures without a job-related need. A violation regardless of intent, and regardless of whether the information is shared further.",
    example: "Checking a coworker's chart out of concern for their health.",
    related: ["Impermissible Disclosure", "Minimum Necessary Standard"]
  },
  {
    term: "Social Engineering",
    definition: "Manipulating a person rather than a system to gain unauthorized access. Technology alone cannot prevent breaches when the human element is compromised.",
    example: "A 'vendor' requesting badge access to the server room.",
    related: ["Pretexting", "Phishing"]
  },
  {
    term: "TPO",
    definition: "Treatment, Payment, and Healthcare Operations — the most common category of permissible disclosure, requiring no separate patient authorization.",
    example: "Sharing records with a specialist for a referral.",
    related: ["Permissible Disclosure", "Privacy Rule"]
  },
  {
    term: "Unique User Identification",
    definition: "Assigning every workforce member a unique name or number so any access, modification, or deletion of ePHI can be audited and traced to a specific individual.",
    example: "Why sharing a login during a staffing shortage is prohibited — it destroys the audit trail.",
    related: ["Multi-Factor Authentication (MFA)", "Role-Based Access"]
  },
  {
    term: "60-Day Deadline",
    definition: "The maximum time from discovery of a reportable breach to notification of affected individuals. Notification must occur without unreasonable delay and never later than 60 calendar days.",
    example: "Breaches affecting 500 or more people also require HHS and local media notice within the same window.",
    related: ["Breach Notification Rule", "Breach"]
  }
];

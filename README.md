# FairShift ⚖️
**A mobile-first platform for fairer, safer workplaces (UN SDG 8: Decent Work & Economic Growth)**

FairShift protects hourly workers from wage theft, excessive fatigue, and unsafe job conditions. Designed specifically for low-literacy users on basic mobile devices, it pairs a tactile worker interface with an executive safety administration dashboard.

---

## 🏗️ Use Cases & Sectors

FairShift supports two key workplace sectors accessible via the top sector toggle:

### 1. Construction Site (Base Pay: ₹100/h)
* **Environment:** Infrastructure, high-rise masonry, steel fabrication, and crane operations.
* **Workplace Risks:** Fall hazards from scaffolding, exposed 440V electrical cables, heavy equipment fatigue.
* **SDG 8 Impact:** Guarantees transparent tracking of grueling shifts, enforces mandatory 2x overtime pay (₹200/h) for every hour worked beyond 8 hours a day, and safeguards against contractor retaliation through anonymous hazard reporting.

### 2. College Campus (Base Pay: ₹80/h)
* **Environment:** University facilities, chemistry labs, student dining halls, and multi-floor libraries.
* **Workplace Risks:** Wet slippery corridors outside labs, unsecured mobile ladders, repetitive strain.
* **SDG 8 Impact:** Protects service staff and custodial workers from excessive 6+ consecutive working day streaks without rest, calculating equitable pay with clear 8% statutory welfare fund transparency.

---

## 📱 Worker App Features (Low-Literacy & Basic Phones)

1. **Shift Tracking & 2x Overtime:**
   * Oversized tactile **CHECK IN** and **CHECK OUT** buttons with live shift timers.
   * Daily hours >8 are automatically calculated as overtime compensated at double rate (**2x**).
2. **Transparent Weekly Payslip:**
   * Clear breakdown of regular hours, 2x overtime pay, 8% statutory deduction, and net take-home pay.
   * **Daily Hours Bar Chart:** Visualizes weekly shifts with an 8-hour threshold line and distinct 2x overtime bar stacks.
   * **Read-Aloud Button:** Speaks the complete payslip aloud in the worker's selected native language using the browser's Web Speech API (`SpeechSynthesis`).
3. **Safety Hazard Reporting:**
   * One-touch hazard categorization: **Fall Risk**, **Fire Hazard**, **Electric Shock**, and **Wet Floor**.
   * Voice input via Web Speech API (`SpeechRecognition`) allows workers to report hazards hands-free in their mother tongue.
   * **Anonymous Reporting:** When enabled, the system guarantees zero storage or transmission of worker ID or name to protect workers from retribution.
   * Live resolution tracking (**Open**, **In review**, **Fixed**).
4. **7 Supported Languages:**
   * English, Hindi (हिन्दी), Tamil (தமிழ்), Telugu (తెలుగు), Bengali (বাংলা), Marathi (मराठी), and Kannada (ಕನ್ನಡ).

---

## 🛡️ Admin Dashboard (PIN-Protected)

* **Access Control:** Protected by a secret PIN (configured via the `ADMIN_PIN` environment variable; default test PIN: `2026`).
* **4 Core KPI Cards:**
  1. **Total Staff:** Number of active personnel in the current sector.
  2. **Fatigue Alerts:** Count of workers exceeding 48 hours a week OR working 6+ consecutive days without rest.
  3. **Open Hazards:** Active safety dangers awaiting site intervention.
  4. **Weekly Overtime:** Total overtime hours logged and compensated at 2x pay.
* **Worker Workload & Quit Risk Table:**
  * **High Risk:** Triggered if worker is fatigued (>48 hours/week or 6+ days in a row).
  * **Medium Risk:** Triggered if worker worked 6+ hours of overtime.
  * **Low Risk:** Standard sustainable workload.
* **Hazard Remediation Queue:**
  * Immediate status buttons to advance reported issues: `Open` ➔ `In review` ➔ `Fixed`.

---

## 🧪 Unit Tests

FairShift features a dedicated calculation module (`src/utils/fairshift-calculations.ts`) with 100% test coverage for pay, 2x overtime, and fatigue detection.

Run unit tests:
```bash
npm test
```
All 16 test cases validate daily shift splitting, construction and college wage calculation, consecutive day tracking, fatigue thresholds, and quit risk categorization.

---

## 🚀 Running the Application

```bash
# Start development server
npm run dev

# Run unit tests
npm test

# Build for production
npm run build
```

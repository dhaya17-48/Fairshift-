import { LanguageCode } from '../types';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  bcp47: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', bcp47: 'en-IN' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', bcp47: 'hi-IN' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', bcp47: 'ta-IN' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', bcp47: 'te-IN' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা', bcp47: 'bn-IN' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी', bcp47: 'mr-IN' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', bcp47: 'kn-IN' },
];

export interface TranslationDictionary {
  // App & Header
  appName: string;
  appTagline: string;
  unSdgBadge: string;
  workerApp: string;
  adminDashboard: string;
  selectLanguage: string;
  activeSectorLabel: string;
  sectorConstruction: string;
  sectorCollege: string;
  overtimeBannerText: string;
  appFooter: string;
  skipToContent: string;
  loadingApp: string;
  hourAbbr: string;

  // Worker Identity & Profile
  switchWorker: string;
  workerIdPrefix: string;
  rateLabel: string;
  overtimeNotice: string;
  activeSectorInfo: (rate: number) => string;
  formatRole: (role: string) => string;

  // Worker Tabs
  navAriaLabel: string;
  tabShift: string;
  tabPayslip: string;
  tabHazards: string;

  // Shift Tracking
  shiftTrackingAria: string;
  readyToBeginWork: string;
  sdgGuaranteeText: string;
  checkIn: string;
  checkOut: string;
  checkInAria: string;
  checkOutAria: string;
  checkedInStatus: string;
  checkedOutStatus: string;
  activeShiftDuration: string;
  startedAt: string;
  completedShiftHoursLabel: string;
  overtimeCreditHelp: string;
  quickAddShift: string;
  addShiftHelp: string;
  addShiftButton: string;
  savingShift: string;
  weeklyTakeHome: string;
  viewPayslip: string;
  hoursSelectAria: string;

  // Errors
  errorCheckInFailed: string;
  errorCheckOutFailed: string;
  errorLogShiftFailed: string;

  // Hours Dropdown Options
  opt7h: string;
  opt8h: string;
  opt8_5h: string;
  opt9h: string;
  opt10h: string;
  opt11h: string;
  opt12h: string;

  // Payslip & Chart
  payslipTitle: string;
  payslipSubtitle: (rate: number) => string;
  regularHours: string;
  overtimeHours: string;
  overtimeBadge: string;
  totalHoursWorked: string;
  ratePerHour: string;
  regularPay: string;
  overtimePay: string;
  grossPay: string;
  deductions: string;
  deductionsSubtitle: string;
  takeHomePay: string;
  directCompensation: string;
  readAloud: string;
  stopAudio: string;
  audioPlaying: string;
  chartTitle: string;
  chartSubtitle: string;
  chartLegendRegular: string;
  chartLegendOvertime: string;
  chartStandardLimit: string;
  chartEmptyState: string;
  chartAriaLabel: string;
  regularHoursCalc: (hours: number, rate: number) => string;
  overtimeHoursCalc: (hours: number, rate: number) => string;
  grossHoursCalc: (hours: number) => string;
  formatDay: (dayName: string) => string;

  // Hazard Reporting
  hazardTitle: string;
  hazardSubtitle: string;
  hazardStep1: string;
  hazardStep2: string;
  hazardFall: string;
  hazardFire: string;
  hazardElectric: string;
  hazardWetFloor: string;
  voiceNoteStart: string;
  voiceNoteStop: string;
  voiceNoteListening: string;
  voiceMicBlocked: string;
  voiceNotSupported: string;
  voiceInitError: string;
  voiceFallbackNote: string;
  recognizedVoiceLabel: string;
  descriptionPlaceholder: string;
  hazardDescAria: string;
  locationLabel: string;
  locationPlaceholder: string;
  chipLooseWire: string;
  chipWaterPuddle: string;
  chipMissingGuardrail: string;
  chipBlockedExit: string;
  sendAnonymously: string;
  sendAnonymouslyDesc: string;
  submitHazard: string;
  submitting: string;
  hazardSuccessAlert: string;
  recentHazards: string;
  hazardsLoggedCount: string;
  noHazardsReported: string;
  statusOpen: string;
  statusInReview: string;
  statusFixed: string;
  anonymousReporter: string;
  reporterLabel: string;
  reportedDateLabel: string;

  // Screen Reader Announcements
  announceShiftClockedIn: string;
  announceShiftClockedOut: string;
  announceShiftLogged: (hours: number) => string;
  announceHazardReported: string;
  announceSectorSwitched: (sectorName: string) => string;

  // TTS Template
  speechTextTemplate: (takeHome: number, regH: number, otH: number, deductions: number) => string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    // App & Header
    appName: 'FairShift',
    appTagline: 'Fair Pay • 2x Overtime • Safety & Fatigue Shield',
    unSdgBadge: 'UN SDG 8: Decent Work',
    workerApp: 'Worker App',
    adminDashboard: 'Admin Dashboard',
    selectLanguage: 'Select Language',
    activeSectorLabel: 'Active Sector:',
    sectorConstruction: 'Construction Site',
    sectorCollege: 'College Campus',
    overtimeBannerText: 'Overtime >8h = 2x Rate',
    appFooter: 'FairShift • UN SDG 8 Decent Work & Economic Growth • Construction (₹100/h) • College Campus (₹80/h)',
    skipToContent: 'Skip to main content',
    loadingApp: 'Loading FairShift...',
    hourAbbr: 'h',

    // Worker Identity & Profile
    switchWorker: 'Switch Worker',
    workerIdPrefix: 'ID:',
    rateLabel: 'Rate:',
    overtimeNotice: '>8h = 2x Rate',
    activeSectorInfo: (rate) => `Rate: ₹${rate}/h (2x OT: ₹${rate * 2}/h)`,
    formatRole: (role) => role,

    // Worker Tabs
    navAriaLabel: 'Worker Sections',
    tabShift: 'Shift Clock',
    tabPayslip: 'My Payslip',
    tabHazards: 'Report Hazard',

    // Shift Tracking
    shiftTrackingAria: 'Shift Tracking & Clock In',
    readyToBeginWork: 'Ready to Begin Work',
    sdgGuaranteeText: 'Guaranteed transparent tracking under UN SDG 8 Decent Work standards',
    checkIn: 'CHECK IN',
    checkOut: 'CHECK OUT',
    checkInAria: 'CHECK IN to begin work shift',
    checkOutAria: 'CHECK OUT of current shift',
    checkedInStatus: 'Currently on Shift',
    checkedOutStatus: 'Not Clocked In',
    activeShiftDuration: 'Current Time on Shift',
    startedAt: 'Started at:',
    completedShiftHoursLabel: 'Shift Hours Completed (Demo Simulator):',
    overtimeCreditHelp: 'Hours above 8 are automatically credited at 2x rate',
    quickAddShift: 'Record Shift Hours',
    addShiftHelp: 'Select hours worked today (hours above 8 get double pay 2x)',
    addShiftButton: 'Add Shift',
    savingShift: 'Saving...',
    weeklyTakeHome: 'Weekly Take-Home',
    viewPayslip: 'View Payslip',
    hoursSelectAria: 'Select hours worked',

    // Errors
    errorCheckInFailed: 'Check in failed',
    errorCheckOutFailed: 'Check out failed',
    errorLogShiftFailed: 'Failed to log shift',

    // Hours Dropdown Options
    opt7h: '7 hours: 7 regular + 0 overtime',
    opt8h: '8 hours: 8 regular + 0 overtime',
    opt8_5h: '8.5 hours: 8 regular + 0.5 overtime at 2x',
    opt9h: '9 hours: 8 regular + 1 overtime at 2x',
    opt10h: '10 hours: 8 regular + 2 overtime at 2x',
    opt11h: '11 hours: 8 regular + 3 overtime at 2x',
    opt12h: '12 hours: 8 regular + 4 overtime at 2x',

    // Payslip & Chart
    payslipTitle: 'Transparent Weekly Payslip',
    payslipSubtitle: (rate) => `Hourly rate: ₹${rate}/h • Overtime: ₹${rate * 2}/h (2x)`,
    regularHours: 'Regular Hours (Up to 8h/day)',
    overtimeHours: 'Overtime Hours (>8h/day)',
    overtimeBadge: '2x Pay Rate',
    totalHoursWorked: 'Total Hours Worked',
    ratePerHour: 'Pay Rate',
    regularPay: 'Regular Pay',
    overtimePay: 'Overtime Pay (2x)',
    grossPay: 'Gross Total',
    deductions: 'Statutory Deductions (8%)',
    deductionsSubtitle: 'Mandatory worker welfare & insurance fund',
    takeHomePay: 'Take-Home Pay',
    directCompensation: 'Direct worker compensation',
    readAloud: 'Read Aloud Payslip',
    stopAudio: 'Stop Audio',
    audioPlaying: 'Reading your payslip aloud...',
    chartTitle: 'Daily Hours & 2x Overtime',
    chartSubtitle: 'Green = Regular (up to 8h) • Amber = Double Pay 2x (>8h)',
    chartLegendRegular: 'Regular (1x)',
    chartLegendOvertime: 'Overtime (2x)',
    chartStandardLimit: '8h standard limit',
    chartEmptyState: 'No shifts recorded for this week yet',
    chartAriaLabel: 'Daily worked hours bar chart',
    regularHoursCalc: (hours, rate) => `${hours} hrs @ ₹${rate}/h`,
    overtimeHoursCalc: (hours, rate) => `${hours} hrs @ ₹${rate}/h (2x)`,
    grossHoursCalc: (hours) => `(${hours} total hours)`,
    formatDay: (dayName) => dayName,

    // Hazard Reporting
    hazardTitle: 'Report a Safety Hazard',
    hazardSubtitle: 'Tap an icon, speak or write to keep your workplace safe',
    hazardStep1: '1. Select Danger Type',
    hazardStep2: '2. Add Description (Voice or Text)',
    hazardFall: 'Fall Risk',
    hazardFire: 'Fire Hazard',
    hazardElectric: 'Electric Shock',
    hazardWetFloor: 'Wet Floor',
    voiceNoteStart: 'Hold / Tap to Speak',
    voiceNoteStop: 'Stop Voice Input',
    voiceNoteListening: 'Listening in your language... Speak clearly near phone.',
    voiceMicBlocked: 'Microphone access blocked. Please allow mic or type your note.',
    voiceNotSupported: 'Speech recognition not supported on this browser. Please type below.',
    voiceInitError: 'Could not activate microphone. Please type description.',
    voiceFallbackNote: '(Browser mic speech-to-text not available on this device; you can type in any language below)',
    recognizedVoiceLabel: 'Recognized Voice:',
    descriptionPlaceholder: 'Describe the danger or location (e.g. Broken wire near 2nd floor staircase)',
    hazardDescAria: 'Hazard Description',
    locationLabel: 'Location (optional)',
    locationPlaceholder: 'e.g. Pillar 14 / Chemistry Lab corridor',
    chipLooseWire: 'Loose wire hanging',
    chipWaterPuddle: 'Water puddle near stairs',
    chipMissingGuardrail: 'Missing guardrail',
    chipBlockedExit: 'Blocked emergency exit',
    sendAnonymously: 'Report Anonymously',
    sendAnonymouslyDesc: 'Your name and worker ID will never be stored or shared.',
    submitHazard: 'Send Hazard Report',
    submitting: 'Sending report...',
    hazardSuccessAlert: 'Safety hazard reported successfully! Status is set to Open.',
    recentHazards: 'Hazard Safety Status',
    hazardsLoggedCount: 'logged',
    noHazardsReported: 'No safety hazards reported yet',
    statusOpen: 'Open',
    statusInReview: 'In review',
    statusFixed: 'Fixed',
    anonymousReporter: 'Anonymous Worker',
    reporterLabel: 'Reporter:',
    reportedDateLabel: 'Reported on',

    // Screen Reader Announcements
    announceShiftClockedIn: 'Shift clocked in. Timer running.',
    announceShiftClockedOut: 'Shift clocked out. Payslip updated with 2x overtime if applicable.',
    announceShiftLogged: (hours) => `Logged ${hours} hours shift.`,
    announceHazardReported: 'Safety hazard reported successfully.',
    announceSectorSwitched: (sectorName) => `Switched sector to ${sectorName}`,

    // TTS Template
    speechTextTemplate: (takeHome, regH, otH, deductions) =>
      `Hello. Your weekly take home pay is ${takeHome} rupees. You worked ${regH} regular hours and ${otH} overtime hours with double rate. Eight percent deduction was ${deductions} rupees. Have a safe day!`,
  },

  ta: {
    // App & Header
    appName: 'ஃபேர்ஷிப்ட்',
    appTagline: 'நியாயமான ஊதியம் • 2x கூடுதல் நேரம் • பாதுகாப்பு & சோர்வு தடுப்பு',
    unSdgBadge: 'ஐ.நா. SDG 8: கண்ணியமான வேலை',
    workerApp: 'தொழிலாளர் செயலி',
    adminDashboard: 'நிர்வாக பலகை',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    activeSectorLabel: 'தற்போதைய பணித்துறை:',
    sectorConstruction: 'கட்டுமான தளம்',
    sectorCollege: 'கல்லூரி வளாகம்',
    overtimeBannerText: '>8 மணி = 2x இரட்டிப்பு ஊதியம்',
    appFooter: 'ஃபேர்ஷிப்ட் • ஐ.நா. SDG 8 கண்ணியமான வேலை & பொருளாதார வளர்ச்சி • கட்டுமான தளம் (₹100/மணி) • கல்லூரி வளாகம் (₹80/மணி)',
    skipToContent: 'முதன்மை பகுதிக்கு செல்லவும்',
    loadingApp: 'ஃபேர்ஷிப்ட் ஏற்றப்படுகிறது...',
    hourAbbr: 'மணி',

    // Worker Identity & Profile
    switchWorker: 'தொழிலாளியை மாற்றவும்',
    workerIdPrefix: 'எண்:',
    rateLabel: 'ஊதியம்:',
    overtimeNotice: '>8 மணி = 2x இரட்டிப்பு ஊதியம்',
    activeSectorInfo: (rate) => `ஊதியம்: ₹${rate}/மணி (2x கூடுதல்: ₹${rate * 2}/மணி)`,
    formatRole: (role) => {
      const map: Record<string, string> = {
        'Masonry Specialist': 'கொத்தனார் நிபுணர்',
        'Concrete & Pouring Lead': 'கான்கிரீட் பணி தலைவர்',
        'Heavy Rigging & Crane Ops': 'கிரேன் மற்றும் கனரக பணி',
        'Steel & Rebar Fabricator': 'கம்பி வளைப்பு நிபுணர்',
        'Site Safety & Scaffolding Helper': 'தள பாதுகாப்பு உதவியாளர்',
        'Campus Facilities Tech': 'வளாக பராமரிப்பு தொழில்நுட்ப வல்லுநர்',
        'Science Laboratory Assistant': 'அறிவியல் ஆய்வக உதவியாளர்',
        'Central Library Logistics': 'மத்திய நூலக மேலாண்மை',
        'Hostel Maintenance & Electrical': 'விடுதி மின் & பராமரிப்பு',
        'Student Dining Hall Staff': 'மாணவர் உணவக பணியாளர்',
      };
      return map[role] || role;
    },

    // Worker Tabs
    navAriaLabel: 'தொழிலாளர் பிரிவுகள்',
    tabShift: 'பணி நேரம்',
    tabPayslip: 'சம்பள சீட்டு',
    tabHazards: 'ஆபத்து புகார்',

    // Shift Tracking
    shiftTrackingAria: 'பணி நேர பதிவு மற்றும் செக் இன்',
    readyToBeginWork: 'வேலையைத் தொடங்க தயார்',
    sdgGuaranteeText: 'ஐ.நா. SDG 8 கண்ணியமான வேலை விதிகளின்படி வெளிப்படையான பணிநேர பதிவு',
    checkIn: 'பணி தொடங்கு (செக் இன்)',
    checkOut: 'பணி முடி (செக் அவுட்)',
    checkInAria: 'பணியைத் தொடங்க செக் இன் செய்யவும்',
    checkOutAria: 'தற்போதைய பணியை முடிக்க செக் அவுட் செய்யவும்',
    checkedInStatus: 'தற்போது பணியில் உள்ளீர்கள்',
    checkedOutStatus: 'பணி தொடங்கப்படவில்லை',
    activeShiftDuration: 'தற்போதைய பணி நேரம்',
    startedAt: 'தொடங்கிய நேரம்:',
    completedShiftHoursLabel: 'வேலை செய்த நேரம் (சோதனை மாதிரி):',
    overtimeCreditHelp: '8 மணி நேரத்திற்கு மேல் உள்ள நேரம் தானாகவே 2x இரட்டிப்பு ஊதியமாக கணக்கிடப்படும்',
    quickAddShift: 'பணி நேரத்தை பதிவு செய்',
    addShiftHelp: 'இன்று வேலை செய்த நேரத்தை தேர்ந்தெடுக்கவும் (8 மணி நேரத்திற்கு மேல் இரட்டிப்பு ஊதியம் 2x)',
    addShiftButton: 'பணி நேரத்தை சேர்',
    savingShift: 'சேமிக்கப்படுகிறது...',
    weeklyTakeHome: 'வாராந்திர கைக்கு வரும் தொகை',
    viewPayslip: 'சம்பள சீட்டை காண்க',
    hoursSelectAria: 'வேலை செய்த நேரத்தை தேர்ந்தெடுக்கவும்',

    // Errors
    errorCheckInFailed: 'செக் இன் தோல்வியடைந்தது',
    errorCheckOutFailed: 'செக் அவுட் தோல்வியடைந்தது',
    errorLogShiftFailed: 'பணி நேரத்தை பதிவு செய்வதில் தோல்வி',

    // Hours Dropdown Options
    opt7h: '7 மணி நேரம்: 7 சாதாரண நேரம் + 0 கூடுதல் நேரம்',
    opt8h: '8 மணி நேரம்: 8 சாதாரண நேரம் + 0 கூடுதல் நேரம்',
    opt8_5h: '8.5 மணி நேரம்: 8 சாதாரண நேரம் + 0.5 கூடுதல் நேரம் (2x)',
    opt9h: '9 மணி நேரம்: 8 சாதாரண நேரம் + 1 கூடுதல் நேரம் (2x)',
    opt10h: '10 மணி நேரம்: 8 சாதாரண நேரம் + 2 கூடுதல் நேரம் (2x)',
    opt11h: '11 மணி நேரம்: 8 சாதாரண நேரம் + 3 கூடுதல் நேரம் (2x)',
    opt12h: '12 மணி நேரம்: 8 சாதாரண நேரம் + 4 கூடுதல் நேரம் (2x)',

    // Payslip & Chart
    payslipTitle: 'வாராந்திர சம்பள விவரம்',
    payslipSubtitle: (rate) => `மணிநேர ஊதியம்: ₹${rate}/மணி • கூடுதல் நேரம்: ₹${rate * 2}/மணி (2x)`,
    regularHours: 'சாதாரண நேரம் (8 மணி வரை)',
    overtimeHours: 'கூடுதல் நேரம் (8 மணிக்கு மேல்)',
    overtimeBadge: '2 மடங்கு ஊதியம்',
    totalHoursWorked: 'மொத்த வேலை நேரம்',
    ratePerHour: 'மணிநேர ஊதியம்',
    regularPay: 'சாதாரண ஊதியம்',
    overtimePay: 'கூடுதல் ஊதியம் (2x)',
    grossPay: 'மொத்த தொகை',
    deductions: 'நல நிதி பிடித்தம் (8%)',
    deductionsSubtitle: 'தொழிலாளர் நல மற்றும் காப்பீட்டு பிடித்தம்',
    takeHomePay: 'கைக்கு வரும் சம்பளம்',
    directCompensation: 'தொழிலாளிக்கு நேரடியாக வழங்கப்படும் தொகை',
    readAloud: 'சம்பளத்தை வாசிக்கவும்',
    stopAudio: 'ஒலியை நிறுத்து',
    audioPlaying: 'சம்பள விவரம் வாசிக்கப்படுகிறது...',
    chartTitle: 'தினசரி நேரம் & 2x கூடுதல் நேரம்',
    chartSubtitle: 'பச்சை = சாதாரண நேரம் (8 மணி வரை) • மஞ்சள் = இரட்டிப்பு ஊதியம் 2x (>8 மணி)',
    chartLegendRegular: 'சாதாரண நேரம் (1x)',
    chartLegendOvertime: 'கூடுதல் நேரம் (2x)',
    chartStandardLimit: '8 மணி நிலையான வரம்பு',
    chartEmptyState: 'இந்த வாரத்திற்கு பணி நேரம் எதுவும் பதிவாகவில்லை',
    chartAriaLabel: 'தினசரி வேலை நேர வரைபடம்',
    regularHoursCalc: (hours, rate) => `${hours} மணி @ ₹${rate}/மணி`,
    overtimeHoursCalc: (hours, rate) => `${hours} மணி @ ₹${rate}/மணி (2x)`,
    grossHoursCalc: (hours) => `(மொத்தம் ${hours} மணி நேரம்)`,
    formatDay: (dayName) => {
      const map: Record<string, string> = {
        Mon: 'திங்கள்',
        Tue: 'செவ்வாய்',
        Wed: 'புதன்',
        Thu: 'வியாழன்',
        Fri: 'வெள்ளி',
        Sat: 'சனி',
        Sun: 'ஞாயிறு',
      };
      return map[dayName] || dayName;
    },

    // Hazard Reporting
    hazardTitle: 'பாதுகாப்பு அபாயத்தை தெரிவிக்கவும்',
    hazardSubtitle: 'படத்தை தொட்டு, பேசவும் அல்லது எழுதி அனுப்பவும்',
    hazardStep1: '1. ஆபத்தின் வகையை தேர்ந்தெடுக்கவும்',
    hazardStep2: '2. விவரத்தை சேர்க்கவும் (குரல் அல்லது எழுத்து)',
    hazardFall: 'கீழே விழும் ஆபத்து',
    hazardFire: 'தீ விபத்து ஆபத்து',
    hazardElectric: 'மின் அதிர்ச்சி',
    hazardWetFloor: 'வழுக்கும் தரை',
    voiceNoteStart: 'பேசத் தொடங்குங்கள்',
    voiceNoteStop: 'பேச்சை நிறுத்தவும்',
    voiceNoteListening: 'உங்கள் குரல் கேட்கப்படுகிறது... கைபேசியின் அருகில் தெளிவாக பேசுங்கள்.',
    voiceMicBlocked: 'மைக்ரோஃபோன் அனுமதி மறுக்கப்பட்டுள்ளது. தயவுசெய்து கீழே தட்டச்சு செய்யவும்.',
    voiceNotSupported: 'இந்த உலாவியில் குரல் அறிதல் வசதி இல்லை. கீழே தட்டச்சு செய்யவும்.',
    voiceInitError: 'மைக்ரோஃபோனை இயக்க முடியவில்லை. தயவுசெய்து கீழே எழுதவும்.',
    voiceFallbackNote: '(இந்த சாதனத்தில் குரல் அறிதல் இல்லை; நீங்கள் எந்த மொழியிலும் கீழே எழுதலாம்)',
    recognizedVoiceLabel: 'பதிவான குரல்:',
    descriptionPlaceholder: 'ஆபத்தை விவரிக்கவும் (எ.கா. 2வது தள படிக்கட்டு அருகே அறுந்த மின்கம்பி)',
    hazardDescAria: 'ஆபத்து விளக்கம்',
    locationLabel: 'இடம் (விருப்பத்தேர்வு)',
    locationPlaceholder: 'எ.கா. தூண் 14 / வேதியியல் ஆய்வக நடைபாதை',
    chipLooseWire: 'தொங்கும் மின்கம்பி',
    chipWaterPuddle: 'படிக்கட்டு அருகில் தேங்கிய நீர்',
    chipMissingGuardrail: 'பாதுகாப்பு தடுப்பு இல்லை',
    chipBlockedExit: 'அவசர வழி அடைக்கப்பட்டுள்ளது',
    sendAnonymously: 'பெயர் இல்லாமல் அனுப்பவும்',
    sendAnonymouslyDesc: 'உங்கள் பெயர் அல்லது அடையாள எண் சேமிக்கப்படாது.',
    submitHazard: 'புகாரை சமர்ப்பிக்கவும்',
    submitting: 'அனுப்பப்படுகிறது...',
    hazardSuccessAlert: 'பாதுகாப்பு ஆபத்து புகார் வெற்றிகரமாக அனுப்பப்பட்டது! நிலை திறந்துள்ளது.',
    recentHazards: 'புகார்களின் தற்போதைய நிலை',
    hazardsLoggedCount: 'பதிவானவை',
    noHazardsReported: 'பாதுகாப்பு ஆபத்துகள் எதுவும் பதிவாகவில்லை',
    statusOpen: 'திறந்துள்ளது (Open)',
    statusInReview: 'பரிசீலனையில் (In review)',
    statusFixed: 'சரிசெய்யப்பட்டது (Fixed)',
    anonymousReporter: 'அடையாளமற்ற தொழிலாளி',
    reporterLabel: 'புகாரளித்தவர்:',
    reportedDateLabel: 'தேதி',

    // Screen Reader Announcements
    announceShiftClockedIn: 'வேலை தொடங்கியது. நேரம் ஓடுகிறது.',
    announceShiftClockedOut: 'வேலை முடிந்தது. சம்பள சீட்டு இரட்டிப்பு கூடுதல் நேரத்துடன் புதுப்பிக்கப்பட்டது.',
    announceShiftLogged: (hours) => `${hours} மணி நேர வேலை பதிவு செய்யப்பட்டது.`,
    announceHazardReported: 'பாதுகாப்பு ஆபத்து வெற்றிகரமாக தெரிவிக்கப்பட்டது.',
    announceSectorSwitched: (sectorName) => `பணித்துறை ${sectorName} என மாற்றப்பட்டது`,

    // TTS Template
    speechTextTemplate: (takeHome, regH, otH, deductions) =>
      `வணக்கம். உங்கள் வாராந்திர கைக்கு வரும் சம்பளம் ${takeHome} ரூபாய். நீங்கள் ${regH} சாதாரண மணிநேரமும், ${otH} இரட்டிப்பு கூடுதல் நேரமும் வேலை செய்துள்ளீர்கள். எட்டு சதவீத பிடித்தம் ${deductions} ரூபாய். பாதுகாப்பாக இருங்கள்.`,
  },

  hi: {
    // App & Header
    appName: 'फेयरशिफ्ट',
    appTagline: 'उचित वेतन • 2x ओवरटाइम • सुरक्षा और थकान से बचाव',
    unSdgBadge: 'संयुक्त राष्ट्र SDG 8: उचित कार्य',
    workerApp: 'श्रमिक ऐप',
    adminDashboard: 'प्रबंधक डैशबोर्ड',
    selectLanguage: 'भाषा चुनें',
    activeSectorLabel: 'सक्रिय कार्य क्षेत्र:',
    sectorConstruction: 'निर्माण स्थल',
    sectorCollege: 'कॉलेज परिसर',
    overtimeBannerText: '>8 घंटे = 2x दोगुनी दर',
    appFooter: 'फेयरशिफ्ट • संयुक्त राष्ट्र SDG 8 उचित कार्य और आर्थिक वृद्धि • निर्माण स्थल (₹100/घंटा) • कॉलेज परिसर (₹80/घंटा)',
    skipToContent: 'मुख्य सामग्री पर जाएं',
    loadingApp: 'फेयरशिफ्ट लोड हो रहा है...',
    hourAbbr: 'घं',

    // Worker Identity & Profile
    switchWorker: 'श्रमिक बदलें',
    workerIdPrefix: 'आईडी:',
    rateLabel: 'दर:',
    overtimeNotice: '>8 घंटे = 2x दोगुनी दर',
    activeSectorInfo: (rate) => `दर: ₹${rate}/घंटा (2x ओवरटाइम: ₹${rate * 2}/घंटा)`,
    formatRole: (role) => {
      const map: Record<string, string> = {
        'Masonry Specialist': 'चिनाई विशेषज्ञ',
        'Concrete & Pouring Lead': 'कंक्रीट कार्य प्रमुख',
        'Heavy Rigging & Crane Ops': 'क्रेन एवं भारी भार ऑपरेटर',
        'Steel & Rebar Fabricator': 'स्टील एवं सरिया कारीगर',
        'Site Safety & Scaffolding Helper': 'साइट सुरक्षा सहायक',
        'Campus Facilities Tech': 'परिसर सुविधा तकनीशियन',
        'Science Laboratory Assistant': 'विज्ञान प्रयोगशाला सहायक',
        'Central Library Logistics': 'केंद्रीय पुस्तकालय व्यवस्थापक',
        'Hostel Maintenance & Electrical': 'हॉस्टल विद्युत एवं रखरखाव',
        'Student Dining Hall Staff': 'भोजनालय कर्मचारी',
      };
      return map[role] || role;
    },

    // Worker Tabs
    navAriaLabel: 'श्रमिक अनुभाग',
    tabShift: 'शिफ्ट घड़ी',
    tabPayslip: 'मेरी सैलरी पर्ची',
    tabHazards: 'खतरे की सूचना',

    // Shift Tracking
    shiftTrackingAria: 'शिफ्ट ट्रैकिंग और चेक इन',
    readyToBeginWork: 'काम शुरू करने के लिए तैयार',
    sdgGuaranteeText: 'संयुक्त राष्ट्र SDG 8 उचित कार्य मानकों के तहत पारदर्शी कार्य ट्रैकिंग',
    checkIn: 'काम शुरू (चेक इन)',
    checkOut: 'काम समाप्त (चेक आउट)',
    checkInAria: 'काम शुरू करने के लिए चेक इन करें',
    checkOutAria: 'मौजूदा काम समाप्त करने के लिए चेक आउट करें',
    checkedInStatus: 'अभी काम चालू है',
    checkedOutStatus: 'काम शुरू नहीं हुआ',
    activeShiftDuration: 'मौजूदा काम का समय',
    startedAt: 'शुरू होने का समय:',
    completedShiftHoursLabel: 'काम किए गए घंटे (डेमो सिम्युलेटर):',
    overtimeCreditHelp: '8 घंटे से अधिक का समय स्वतः 2x दोगुनी दर से जुड़ेगा',
    quickAddShift: 'शिफ्ट घंटे दर्ज करें',
    addShiftHelp: 'आज काम किए गए घंटे चुनें (8 घंटे से ऊपर 2 गुना ओवरटाइम मिलेगा)',
    addShiftButton: 'शिफ्ट जोड़ें',
    savingShift: 'सहेजा जा रहा है...',
    weeklyTakeHome: 'साप्ताहिक इन-हैंड कमाई',
    viewPayslip: 'सैलरी पर्ची देखें',
    hoursSelectAria: 'काम किए गए घंटे चुनें',

    // Errors
    errorCheckInFailed: 'चेक इन विफल रहा',
    errorCheckOutFailed: 'चेक आउट विफल रहा',
    errorLogShiftFailed: 'शिफ्ट दर्ज करने में विफल',

    // Hours Dropdown Options
    opt7h: '7 घंटे: 7 साधारण + 0 ओवरटाइम',
    opt8h: '8 घंटे: 8 साधारण + 0 ओवरटाइम',
    opt8_5h: '8.5 घंटे: 8 साधारण + 0.5 ओवरटाइम (2x)',
    opt9h: '9 घंटे: 8 साधारण + 1 ओवरटाइम (2x)',
    opt10h: '10 घंटे: 8 साधारण + 2 ओवरटाइम (2x)',
    opt11h: '11 घंटे: 8 साधारण + 3 ओवरटाइम (2x)',
    opt12h: '12 घंटे: 8 साधारण + 4 ओवरटाइम (2x)',

    // Payslip & Chart
    payslipTitle: 'साप्ताहिक पारदर्शी वेतन पर्ची',
    payslipSubtitle: (rate) => `प्रति घंटा दर: ₹${rate}/घंटा • ओवरटाइम: ₹${rate * 2}/घंटा (2x)`,
    regularHours: 'साधारण घंटे (8 घंटे तक)',
    overtimeHours: 'ओवरटाइम घंटे (8 से अधिक)',
    overtimeBadge: '2 गुना मजदूरी',
    totalHoursWorked: 'कुल काम के घंटे',
    ratePerHour: 'घंटे की दर',
    regularPay: 'साधारण वेतन',
    overtimePay: 'ओवरटाइम वेतन (2x)',
    grossPay: 'कुल कमाई',
    deductions: 'कटौती (8% कल्याण फंड)',
    deductionsSubtitle: 'अनिवार्य श्रमिक कल्याण व सुरक्षा फंड',
    takeHomePay: 'हाथ में आने वाला वेतन',
    directCompensation: 'श्रमिक को सीधे मिलने वाली राशि',
    readAloud: 'पर्ची बोलकर सुनाएं',
    stopAudio: 'आवाज रोकें',
    audioPlaying: 'वेतन पर्ची पढ़ी जा रही है...',
    chartTitle: 'दैनिक घंटे और 2x ओवरटाइम',
    chartSubtitle: 'हरा = साधारण (8 घंटे तक) • पीला = दोगुना वेतन 2x (>8 घंटे)',
    chartLegendRegular: 'साधारण (1x)',
    chartLegendOvertime: 'ओवरटाइम (2x)',
    chartStandardLimit: '8 घंटे मानक सीमा',
    chartEmptyState: 'इस सप्ताह के लिए अभी कोई शिफ्ट दर्ज नहीं है',
    chartAriaLabel: 'दैनिक काम के घंटों का बार चार्ट',
    regularHoursCalc: (hours, rate) => `${hours} घंटे @ ₹${rate}/घंटा`,
    overtimeHoursCalc: (hours, rate) => `${hours} घंटे @ ₹${rate}/घंटा (2x)`,
    grossHoursCalc: (hours) => `(कुल ${hours} घंटे)`,
    formatDay: (dayName) => {
      const map: Record<string, string> = {
        Mon: 'सोम',
        Tue: 'मंगल',
        Wed: 'बुध',
        Thu: 'गुरु',
        Fri: 'शुक्र',
        Sat: 'शनि',
        Sun: 'रवि',
      };
      return map[dayName] || dayName;
    },

    // Hazard Reporting
    hazardTitle: 'सुरक्षा खतरे की सूचना दें',
    hazardSubtitle: 'आइकन चुनें, बोलें या लिखें ताकि काम सुरक्षित रहे',
    hazardStep1: '1. खतरे का प्रकार चुनें',
    hazardStep2: '2. विवरण दें (बोलकर या लिखकर)',
    hazardFall: 'गिरने का डर',
    hazardFire: 'आग का खतरा',
    hazardElectric: 'बिजली का करंट',
    hazardWetFloor: 'गीला फर्श / फिसलन',
    voiceNoteStart: 'बोलने के लिए दबाएं',
    voiceNoteStop: 'आवाज बंद करें',
    voiceNoteListening: 'आपकी आवाज सुनी जा रही है... फोन के पास स्पष्ट बोलें।',
    voiceMicBlocked: 'माइक की अनुमति नहीं मिली। कृपया नीचे लिखकर बताएं।',
    voiceNotSupported: 'इस ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है। कृपया नीचे लिखें।',
    voiceInitError: 'माइक शुरू नहीं हो सका। कृपया नीचे लिखकर दर्ज करें।',
    voiceFallbackNote: '(इस डिवाइस पर वॉइस इनपुट उपलब्ध नहीं है; आप नीचे किसी भी भाषा में लिख सकते हैं)',
    recognizedVoiceLabel: 'पहचानी गई आवाज:',
    descriptionPlaceholder: 'खतरे का विवरण दें (जैसे: दूसरी मंजिल पर खुला बिजली का तार)',
    hazardDescAria: 'खतरे का विवरण',
    locationLabel: 'स्थान (वैकल्पिक)',
    locationPlaceholder: 'जैसे: पिलर 14 / रसायन विज्ञान लैब गलियारा',
    chipLooseWire: 'खुला लटकता तार',
    chipWaterPuddle: 'सीढ़ियों के पास पानी का गड्ढा',
    chipMissingGuardrail: 'सुरक्षा रेलिंग गायब',
    chipBlockedExit: 'आपातकालीन निकास अवरुद्ध',
    sendAnonymously: 'गुमनाम रूप से भेजें',
    sendAnonymouslyDesc: 'आपका नाम और आईडी कहीं दर्ज नहीं होगी।',
    submitHazard: 'खतरे की सूचना भेजें',
    submitting: 'सूचना भेजी जा रही है...',
    hazardSuccessAlert: 'सुरक्षा खतरे की सूचना सफलतापूर्वक दर्ज हो गई! स्थिति खुली है।',
    recentHazards: 'खतरों की स्थिति',
    hazardsLoggedCount: 'दर्ज',
    noHazardsReported: 'कोई सुरक्षा खतरा दर्ज नहीं है',
    statusOpen: 'खुला (Open)',
    statusInReview: 'जांच जारी (In review)',
    statusFixed: 'ठीक हो गया (Fixed)',
    anonymousReporter: 'गुमनाम श्रमिक',
    reporterLabel: 'रिपोर्टर:',
    reportedDateLabel: 'दिनांक',

    // Screen Reader Announcements
    announceShiftClockedIn: 'शिफ्ट शुरू हुई। घड़ी चालू है।',
    announceShiftClockedOut: 'शिफ्ट समाप्त हुई। 2x ओवरटाइम के साथ सैलरी अपडेट हुई।',
    announceShiftLogged: (hours) => `${hours} घंटे की शिफ्ट दर्ज की गई।`,
    announceHazardReported: 'सुरक्षा खतरे की रिपोर्ट सफलतापूर्वक दर्ज हुई।',
    announceSectorSwitched: (sectorName) => `कार्यक्षेत्र बदलकर ${sectorName} किया गया`,

    // TTS Template
    speechTextTemplate: (takeHome, regH, otH, deductions) =>
      `नमस्ते। आपका इस हफ्ते का हाथ में आने वाला वेतन ${takeHome} रुपये है। आपने ${regH} सामान्य घंटे और ${otH} घंटे डबल दर पर ओवरटाइम काम किया है। 8 प्रतिशत कटौती ${deductions} रुपये हुई। सुरक्षित रहें।`,
  },

  te: {
    // App & Header
    appName: 'ఫేర్‌షిఫ్ట్',
    appTagline: 'సముచిత వేతనం • 2x ఓవర్‌టైమ్ • భద్రత & అలసట రక్షణ',
    unSdgBadge: 'UN SDG 8: గౌరవప్రదమైన పని',
    workerApp: 'కార్మికుల యాప్',
    adminDashboard: 'అడ్మిన్ డాష్‌బోర్డ్',
    selectLanguage: 'భాషను ఎంచుకోండి',
    activeSectorLabel: 'ప్రస్తుత రంగం:',
    sectorConstruction: 'నిర్మాణ స్థలం',
    sectorCollege: 'కళాశాల ప్రాంగణం',
    overtimeBannerText: '>8 గంటలు = 2x రెట్టింపు రేటు',
    appFooter: 'ఫేర్‌షిఫ్ట్ • UN SDG 8 గౌరవప్రదమైన పని & ఆర్థిక వృద్ధి • నిర్మాణ స్థలం (₹100/గం) • కళాశాల ప్రాంగణం (₹80/గం)',
    skipToContent: 'ప్రధాన విషయానికి వెళ్లండి',
    loadingApp: 'ఫేర్‌షిఫ్ట్ లోడ్ అవుతోంది...',
    hourAbbr: 'గం',

    // Worker Identity & Profile
    switchWorker: 'కార్మికుడిని మార్చండి',
    workerIdPrefix: 'ఐడీ:',
    rateLabel: 'రేటు:',
    overtimeNotice: '>8 గంటలు = 2x రెట్టింపు రేటు',
    activeSectorInfo: (rate) => `రేటు: ₹${rate}/గం (2x ఓటీ: ₹${rate * 2}/గం)`,
    formatRole: (role) => {
      const map: Record<string, string> = {
        'Masonry Specialist': 'మేస్త్రీ నిపుణుడు',
        'Concrete & Pouring Lead': 'కాంక్రీట్ పనుల ఇన్‌ఛార్జ్',
        'Heavy Rigging & Crane Ops': 'క్రేన్ మరియు భారీ పరికరాల ఆపరేటర్',
        'Steel & Rebar Fabricator': 'స్టీల్ మరియు రీబార్ కార్మికుడు',
        'Site Safety & Scaffolding Helper': 'సైట్ భద్రతా సహాయకుడు',
        'Campus Facilities Tech': 'క్యాంపస్ ఫెసిలిటీస్ టెక్నీషియన్',
        'Science Laboratory Assistant': 'సైన్స్ ల్యాబ్ సహాయకుడు',
        'Central Library Logistics': 'సెంట్రల్ లైబ్రరీ సహాయకుడు',
        'Hostel Maintenance & Electrical': 'హాస్టల్ నిర్వహణ & ఎలక్ట్రికల్',
        'Student Dining Hall Staff': 'డైనింగ్ హాల్ సిబ్బంది',
      };
      return map[role] || role;
    },

    // Worker Tabs
    navAriaLabel: 'కార్మికుల విభాగాలు',
    tabShift: 'షిఫ్ట్ గడియారం',
    tabPayslip: 'నా జీతం రసీదు',
    tabHazards: 'ప్రమాద నివేదిక',

    // Shift Tracking
    shiftTrackingAria: 'షిఫ్ట్ ట్రాకింగ్ మరియు చెక్ ఇన్',
    readyToBeginWork: 'పని ప్రారంభించడానికి సిద్ధంగా ఉన్నారు',
    sdgGuaranteeText: 'UN SDG 8 నిబంధనల ప్రకారం పారదర్శక పని గంటల ట్రాకింగ్',
    checkIn: 'పని ప్రారంభం (చెక్ ఇన్)',
    checkOut: 'పని ముగింపు (చెక్ అవుట్)',
    checkInAria: 'పని ప్రారంభించడానికి చెక్ ఇన్ చేయండి',
    checkOutAria: 'పని ముగించడానికి చెక్ అవుట్ చేయండి',
    checkedInStatus: 'ప్రస్తుతం పనిలో ఉన్నారు',
    checkedOutStatus: 'పని ప్రారంభం కాలేదు',
    activeShiftDuration: 'ప్రస్తుత పని సమయం',
    startedAt: 'ప్రారంభ సమయం:',
    completedShiftHoursLabel: 'పూర్తయిన పని గంటలు (డెమో సిమ్యులేటర్):',
    overtimeCreditHelp: '8 గంటల పైన పని సమయం స్వయంచాలకంగా 2x డబుల్ రేటుతో లెక్కించబడుతుంది',
    quickAddShift: 'షిఫ్ట్ గంటలు నమోదు చేయండి',
    addShiftHelp: 'ఈరోజు పనిచేసిన గంటలను నమోదు చేయండి (8 గంటల పైన డబుల్ జీతం 2x)',
    addShiftButton: 'షిఫ్ట్ జోడించండి',
    savingShift: 'భద్రపరుస్తున్నాము...',
    weeklyTakeHome: 'వారపు చేతికి వచ్చే ఆదాయం',
    viewPayslip: 'జీతం రసీదు చూడండి',
    hoursSelectAria: 'పనిచేసిన గంటలను ఎంచుకోండి',

    // Errors
    errorCheckInFailed: 'చెక్ ఇన్ విఫలమైంది',
    errorCheckOutFailed: 'చెక్ అవుట్ విఫలమైంది',
    errorLogShiftFailed: 'షిఫ్ట్ నమోదు కాలేదు',

    // Hours Dropdown Options
    opt7h: '7 గంటలు: 7 సాధారణ + 0 ఓవర్‌టైమ్',
    opt8h: '8 గంటలు: 8 సాధారణ + 0 ఓవర్‌టైమ్',
    opt8_5h: '8.5 గంటలు: 8 సాధారణ + 0.5 ఓవర్‌టైమ్ (2x)',
    opt9h: '9 గంటలు: 8 సాధారణ + 1 ఓవర్‌టైమ్ (2x)',
    opt10h: '10 గంటలు: 8 సాధారణ + 2 ఓవర్‌టైమ్ (2x)',
    opt11h: '11 గంటలు: 8 సాధారణ + 3 ఓవర్‌టైమ్ (2x)',
    opt12h: '12 గంటలు: 8 సాధారణ + 4 ఓవర్‌టైమ్ (2x)',

    // Payslip & Chart
    payslipTitle: 'వారపు పారదర్శక జీతం రసీదు',
    payslipSubtitle: (rate) => `గంట రేటు: ₹${rate}/గం • ఓవర్‌టైమ్: ₹${rate * 2}/గం (2x)`,
    regularHours: 'సాధారణ గంటలు (8 గంటల వరకు)',
    overtimeHours: 'ఓవర్‌టైమ్ గంటలు (8 గంటల పైన)',
    overtimeBadge: '2 రెట్ల జీతం',
    totalHoursWorked: 'మొత్తం పని గంటలు',
    ratePerHour: 'గంట రేటు',
    regularPay: 'సాధారణ వేతనం',
    overtimePay: 'ఓవర్‌టైమ్ వేతనం (2x)',
    grossPay: 'మొత్తం వేతనం',
    deductions: 'మినహాయింపులు (8% సంక్షేమ నిధి)',
    deductionsSubtitle: 'కార్మిక సంక్షేమం మరియు బీమా నిధి',
    takeHomePay: 'చేతికి అందే జీతం',
    directCompensation: 'కార్మికుడికి నేరుగా అందే వేతనం',
    readAloud: 'జీతం చదివి వినిపించండి',
    stopAudio: 'వాయిస్ ఆపండి',
    audioPlaying: 'జీతం వివరాలు చదువుతున్నాము...',
    chartTitle: 'రోజువారీ పని గంటలు & 2x ఓవర్‌టైమ్',
    chartSubtitle: 'ఆకుపచ్చ = సాధారణం (8 గంటల వరకు) • పసుపు = డబుల్ వేతనం 2x (>8 గంటలు)',
    chartLegendRegular: 'సాధారణం (1x)',
    chartLegendOvertime: 'ఓవర్‌టైమ్ (2x)',
    chartStandardLimit: '8 గంటల ప్రామాణిక పరిమితి',
    chartEmptyState: 'ఈ వారానికి పని గంటలు నమోదు కాలేదు',
    chartAriaLabel: 'రోజువారీ పని గంటల బార్ చార్ట్',
    regularHoursCalc: (hours, rate) => `${hours} గంటలు @ ₹${rate}/గం`,
    overtimeHoursCalc: (hours, rate) => `${hours} గంటలు @ ₹${rate}/గం (2x)`,
    grossHoursCalc: (hours) => `(మొత్తం ${hours} గంటలు)`,
    formatDay: (dayName) => {
      const map: Record<string, string> = {
        Mon: 'సోమ',
        Tue: 'మంగళ',
        Wed: 'బుధ',
        Thu: 'గురు',
        Fri: 'శుక్ర',
        Sat: 'శని',
        Sun: 'ఆది',
      };
      return map[dayName] || dayName;
    },

    // Hazard Reporting
    hazardTitle: 'భద్రతా ప్రమాదాన్ని తెలపండి',
    hazardSubtitle: 'చిహ్నాన్ని తాకండి, మాట్లాడండి లేదా రాయండి',
    hazardStep1: '1. ప్రమాద రకాన్ని ఎంచుకోండి',
    hazardStep2: '2. వివరాలను జోడించండి (వాయిస్ లేదా రాతపూర్వకంగా)',
    hazardFall: 'కింద పడే ప్రమాదం',
    hazardFire: 'అగ్ని ప్రమాదం',
    hazardElectric: 'విద్యుత్ షాక్',
    hazardWetFloor: 'తడి నేల / జారే ప్రమాదం',
    voiceNoteStart: 'మాట్లాడటానికి నొక్కండి',
    voiceNoteStop: 'వాయిస్ ఆపండి',
    voiceNoteListening: 'మీ వాయిస్ వింటున్నాము... ఫోన్ దగ్గర స్పష్టంగా మాట్లాడండి.',
    voiceMicBlocked: 'మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. దయచేసి కింద రాయండి.',
    voiceNotSupported: 'ఈ బ్రౌజర్‌లో వాయిస్ రికగ్నిషన్ అందుబాటులో లేదు. దయచేసి కింద రాయండి.',
    voiceInitError: 'మైక్ ప్రారంభం కాలేదు. దయచేసి కింద వివరణ రాయండి.',
    voiceFallbackNote: '(ఈ పరికరంలో వాయిస్ టైపింగ్ లేదు; మీరు కింద రాయవచ్చు)',
    recognizedVoiceLabel: 'రికార్డ్ అయిన వాయిస్:',
    descriptionPlaceholder: 'ప్రమాదం గురించి రాయండి (ఉదా: రెండో అంతస్తులో తెగిన కరెంటు వైరు)',
    hazardDescAria: 'ప్రమాదం వివరణ',
    locationLabel: 'స్థలం (ఐచ్ఛికం)',
    locationPlaceholder: 'ఉదా: పిల్లర్ 14 / కెమిస్ట్రీ ల్యాబ్ కారిడార్',
    chipLooseWire: 'వదులుగా వేలాడుతున్న వైరు',
    chipWaterPuddle: 'మెట్ల దగ్గర నీటి నిల్వ',
    chipMissingGuardrail: 'రక్షణ రెయిలింగ్ లేదు',
    chipBlockedExit: 'ఎమర్జెన్సీ దారి మూసివేయబడింది',
    sendAnonymously: 'పేరు లేకుండా పంపండి',
    sendAnonymouslyDesc: 'మీ పేరు లేదా ఐడీ నమోదు చేయబడదు.',
    submitHazard: 'నివేదికను పంపండి',
    submitting: 'పంపుతున్నాము...',
    hazardSuccessAlert: 'భద్రతా ప్రమాదం విజయవంతంగా నివేదించబడింది! స్థితి తెరిచి ఉంది.',
    recentHazards: 'ప్రమాదాల స్థితి',
    hazardsLoggedCount: 'నమోదైనవి',
    noHazardsReported: 'ఎలాంటి ప్రమాదాలు నమోదు కాలేదు',
    statusOpen: 'ఓపెన్ (Open)',
    statusInReview: 'పరిశీలనలో ఉంది (In review)',
    statusFixed: 'పరిష్కరించబడింది (Fixed)',
    anonymousReporter: 'పేరు లేని కార్మికుడు',
    reporterLabel: 'నివేదించినవారు:',
    reportedDateLabel: 'తేదీ',

    // Screen Reader Announcements
    announceShiftClockedIn: 'పని ప్రారంభమైంది. టైమర్ నడుస్తోంది.',
    announceShiftClockedOut: 'పని పూర్తయింది. 2x ఓవర్‌టైమ్‌తో జీతం అప్‌డేట్ అయింది.',
    announceShiftLogged: (hours) => `${hours} గంటల షిఫ్ట్ నమోదు చేయబడింది.`,
    announceHazardReported: 'భద్రతా ప్రమాదం విజయవంతంగా నివేదించబడింది.',
    announceSectorSwitched: (sectorName) => `రంగం ${sectorName}గా మార్చబడింది`,

    // TTS Template
    speechTextTemplate: (takeHome, regH, otH, deductions) =>
      `నమస్కారం. మీ వారపు చేతికి వచ్చే జీతం ${takeHome} రూపాయలు. మీరు ${regH} సాధారణ గంటలు మరియు ${otH} గంటలు డబుల్ రేటుతో ఓవర్‌టైమ్ పనిచేశారు. 8 శాతం మినహాయింపు ${deductions} రూపాయలు. సురక్షితంగా ఉండండి.`,
  },

  bn: {
    // App & Header
    appName: 'ফেয়ারশিফ্ট',
    appTagline: 'ন্যায্য মজুরি • ২x ওভারটাইম • নিরাপত্তা ও ক্লান্তি প্রতিরোধ',
    unSdgBadge: 'জাতিসংঘ SDG 8: শোভন কাজ',
    workerApp: 'শ্রমিক অ্যাপ',
    adminDashboard: 'অ্যাডমিন ড্যাশবোর্ড',
    selectLanguage: 'ভাষা নির্বাচন করুন',
    activeSectorLabel: 'বর্তমান কাজের ক্ষেত্র:',
    sectorConstruction: 'নির্মাণ ক্ষেত্র',
    sectorCollege: 'কলেজ ক্যাম্পাস',
    overtimeBannerText: '>৮ ঘণ্টা = ২x দ্বিগুণ হার',
    appFooter: 'ফেয়ারশিফ্ট • জাতিসংঘ SDG 8 শোভন কাজ ও অর্থনৈতিক প্রবৃদ্ধি • নির্মাণ ক্ষেত্র (₹১০০/ঘণ্টা) • কলেজ ক্যাম্পাস (₹৮০/ঘণ্টা)',
    skipToContent: 'মূল অংশে যান',
    loadingApp: 'ফেয়ারশিফ্ট লোড হচ্ছে...',
    hourAbbr: 'ঘণ্টা',

    // Worker Identity & Profile
    switchWorker: 'শ্রমিক পরিবর্তন করুন',
    workerIdPrefix: 'আইডি:',
    rateLabel: 'হার:',
    overtimeNotice: '>৮ ঘণ্টা = ২x দ্বিগুণ হার',
    activeSectorInfo: (rate) => `হার: ₹${rate}/ঘণ্টা (২x ওভারটাইম: ₹${rate * 2}/ঘণ্টা)`,
    formatRole: (role) => {
      const map: Record<string, string> = {
        'Masonry Specialist': 'রাজমিস্ত্রি বিশেষজ্ঞ',
        'Concrete & Pouring Lead': 'কংক্রিট ঢালাই প্রধান',
        'Heavy Rigging & Crane Ops': 'ভারী ক্রেন অপারেটর',
        'Steel & Rebar Fabricator': 'স্টিল ও রড কাটার কারিগর',
        'Site Safety & Scaffolding Helper': 'সাইট সুরক্ষা সহায়ক',
        'Campus Facilities Tech': 'ক্যাম্পাস রক্ষণাবেক্ষণ কর্মী',
        'Science Laboratory Assistant': 'বিজ্ঞান গবেষণাগার সহায়ক',
        'Central Library Logistics': 'কেন্দ্রীয় গ্রন্থাগার কর্মী',
        'Hostel Maintenance & Electrical': 'ছাত্রাবাস বৈদ্যুতিক কর্মী',
        'Student Dining Hall Staff': 'ক্যান্টিন কর্মী',
      };
      return map[role] || role;
    },

    // Worker Tabs
    navAriaLabel: 'শ্রমিক বিভাগ',
    tabShift: 'শিফট ট্র্যাকিং',
    tabPayslip: 'আমার পে-স্লিপ',
    tabHazards: 'বিপদের রিপোর্ট',

    // Shift Tracking
    shiftTrackingAria: 'শিফট ট্র্যাকিং এবং চেক ইন',
    readyToBeginWork: 'কাজ শুরু করার জন্য প্রস্তুত',
    sdgGuaranteeText: 'জাতিসংঘ SDG 8 শোভন কাজের মানদণ্ডে স্বচ্ছ কর্মঘণ্টা ট্র্যাকিং',
    checkIn: 'কাজে প্রবেশ (চেক ইন)',
    checkOut: 'কাজ শেষ (চেক আউট)',
    checkInAria: 'কাজ শুরু করতে চেক ইন করুন',
    checkOutAria: 'বর্তমান কাজ শেষ করতে চেক আউট করুন',
    checkedInStatus: 'বর্তমানে কাজের সময় চালু আছে',
    checkedOutStatus: 'কাজ এখনো শুরু হয়নি',
    activeShiftDuration: 'বর্তমান কাজের সময়',
    startedAt: 'শুরুর সময়:',
    completedShiftHoursLabel: 'সম্পন্ন কাজের ঘণ্টা (ডেমো সিমুলেটর):',
    overtimeCreditHelp: '৮ ঘণ্টার বেশি সময় স্বয়ংক্রিয়ভাবে ২x দ্বিগুণ হারে জমা হবে',
    quickAddShift: 'শিফট ঘণ্টা যোগ করুন',
    addShiftHelp: 'আজকের কাজের ঘণ্টা নির্বাচন করুন (৮ ঘণ্টার বেশি হলে দ্বিগুণ মজুরি ২x)',
    addShiftButton: 'শিফট যোগ করুন',
    savingShift: 'সংরক্ষণ হচ্ছে...',
    weeklyTakeHome: 'সাপ্তাহিক হাতে পাওয়া আয়',
    viewPayslip: 'পে-স্লিপ দেখুন',
    hoursSelectAria: 'কাজের ঘণ্টা নির্বাচন করুন',

    // Errors
    errorCheckInFailed: 'চেক ইন ব্যর্থ হয়েছে',
    errorCheckOutFailed: 'চেক আউট ব্যর্থ হয়েছে',
    errorLogShiftFailed: 'শিফট রেকর্ড করা যায়নি',

    // Hours Dropdown Options
    opt7h: '৭ ঘণ্টা: ৭ সাধারণ + ০ ওভারটাইম',
    opt8h: '৮ ঘণ্টা: ৮ সাধারণ + ০ ওভারটাইম',
    opt8_5h: '৮.৫ ঘণ্টা: ৮ সাধারণ + ০.৫ ওভারটাইম (২x)',
    opt9h: '৯ ঘণ্টা: ৮ সাধারণ + ১ ওভারটাইম (২x)',
    opt10h: '১০ ঘণ্টা: ৮ সাধারণ + ২ ওভারটাইম (২x)',
    opt11h: '১১ ঘণ্টা: ৮ সাধারণ + ৩ ওভারটাইম (২x)',
    opt12h: '১২ ঘণ্টা: ৮ সাধারণ + ৪ ওভারটাইম (২x)',

    // Payslip & Chart
    payslipTitle: 'সাপ্তাহিক স্বচ্ছ পে-স্লিপ',
    payslipSubtitle: (rate) => `ঘণ্টার হার: ₹${rate}/ঘণ্টা • ওভারটাইম: ₹${rate * 2}/ঘণ্টা (২x)`,
    regularHours: 'সাধারণ ঘণ্টা (৮ ঘণ্টা পর্যন্ত)',
    overtimeHours: 'ওভারটাইম ঘণ্টা (৮ ঘণ্টার বেশি)',
    overtimeBadge: '২ গুণ ওভারটাইম',
    totalHoursWorked: 'মোট কাজের ঘণ্টা',
    ratePerHour: 'ঘণ্টা প্রতি হার',
    regularPay: 'নিয়মিত বেতন',
    overtimePay: 'ওভারটাইম বেতন (২x)',
    grossPay: 'মোট উপার্জিত টাকা',
    deductions: 'কর্তন (৮% কল্যাণ তহবিল)',
    deductionsSubtitle: 'শ্রমিক কল্যাণ ও বীমা তহবিল কর্তন',
    takeHomePay: 'হাতে পাওয়া বেতন',
    directCompensation: 'শ্রমিকের সরাসরি প্রাপ্য মজুরি',
    readAloud: 'বেতন শুনুন',
    stopAudio: 'শব্দ বন্ধ করুন',
    audioPlaying: 'আপনার বেতন পড়ে শোনানো হচ্ছে...',
    chartTitle: 'দৈনিক কর্মঘণ্টা ও ২x ওভারটাইম',
    chartSubtitle: 'সবুজ = সাধারণ (৮ ঘণ্টা পর্যন্ত) • হলুদ = দ্বিগুণ মজুরি ২x (>৮ ঘণ্টা)',
    chartLegendRegular: 'সাধারণ (১x)',
    chartLegendOvertime: 'ওভারটাইম (২x)',
    chartStandardLimit: '৮ ঘণ্টা সাধারণ সীমা',
    chartEmptyState: 'এই সপ্তাহের জন্য কোনো কাজের শিফট রেকর্ড নেই',
    chartAriaLabel: 'দৈনিক কাজের ঘণ্টার বার চার্ট',
    regularHoursCalc: (hours, rate) => `${hours} ঘণ্টা @ ₹${rate}/ঘণ্টা`,
    overtimeHoursCalc: (hours, rate) => `${hours} ঘণ্টা @ ₹${rate}/ঘণ্টা (২x)`,
    grossHoursCalc: (hours) => `(মোট ${hours} ঘণ্টা)`,
    formatDay: (dayName) => {
      const map: Record<string, string> = {
        Mon: 'সোম',
        Tue: 'মঙ্গল',
        Wed: 'বুধ',
        Thu: 'বৃহস্পতি',
        Fri: 'শুক্র',
        Sat: 'শনি',
        Sun: 'রবি',
      };
      return map[dayName] || dayName;
    },

    // Hazard Reporting
    hazardTitle: 'কাজের নিরাপত্তা ঝুঁকি জানান',
    hazardSubtitle: 'আইকনে চাপ দিন, মুখে বলুন বা লিখে জানান',
    hazardStep1: '১. বিপদের ধরন বেছে নিন',
    hazardStep2: '২. বিবরণ দিন (মুখে বলুন বা লিখে জানান)',
    hazardFall: 'পড়ে যাওয়ার ভয়',
    hazardFire: 'আগুনের ঝুঁকি',
    hazardElectric: 'বিদ্যুৎ শক',
    hazardWetFloor: 'ভেজা মেঝে / পিছলে পড়ার ভয়',
    voiceNoteStart: 'কথা বলতে চাপুন',
    voiceNoteStop: 'রেকর্ডিং বন্ধ করুন',
    voiceNoteListening: 'আপনার কথা শোনা হচ্ছে... ফোনের কাছে স্পষ্ট করে বলুন।',
    voiceMicBlocked: 'মাইক্রোফোন অনুমতি মেলেনি। দয়া করে নিচে লিখে জানান।',
    voiceNotSupported: 'এই ব্রাউজারে ভয়েস সাপোর্ট নেই। দয়া করে নিচে লিখুন।',
    voiceInitError: 'মাইক চালু করা যায়নি। দয়া করে বিবরণ লিখুন।',
    voiceFallbackNote: '(এই ডিভাইসে ভয়েস রিকগনিশন নেই; আপনি নিচে যেকোনো ভাষায় লিখতে পারেন)',
    recognizedVoiceLabel: 'শনাক্ত করা ভয়েস:',
    descriptionPlaceholder: 'বিপদের বিবরণ দিন (যেমন: দ্বিতীয় তলায় খোলা বৈদ্যুতিক তার)',
    hazardDescAria: 'বিপদের বিবরণ',
    locationLabel: 'স্থান (ঐচ্ছিক)',
    locationPlaceholder: 'যেমন: পিলার ১৪ / কেমিস্ট্রি ল্যাব বারান্দা',
    chipLooseWire: 'খোলা ঝুলন্ত তার',
    chipWaterPuddle: 'সিঁড়ির কাছে জমা জল',
    chipMissingGuardrail: 'সুরক্ষা রেলিং নেই',
    chipBlockedExit: 'জরুরি নির্গমন পথ বন্ধ',
    sendAnonymously: 'নাম গোপন রেখে পাঠান',
    sendAnonymouslyDesc: 'আপনার নাম বা পরিচয়পত্র কখনো প্রকাশ বা সংরক্ষণ করা হবে না।',
    submitHazard: 'রিপোর্ট জমা দিন',
    submitting: 'জমা হচ্ছে...',
    hazardSuccessAlert: 'নিরাপত্তা ঝুঁকির রিপোর্ট সফলভাবে জমা হয়েছে! অবস্থা উন্মুক্ত আছে।',
    recentHazards: 'বিপদের বর্তমান অবস্থা',
    hazardsLoggedCount: 'রেকর্ডকৃত',
    noHazardsReported: 'কোনো নিরাপত্তা ঝুঁকি রিপোর্ট করা হয়নি',
    statusOpen: 'ওপেন (Open)',
    statusInReview: 'তদন্তাধীন (In review)',
    statusFixed: 'সমাধান হয়েছে (Fixed)',
    anonymousReporter: 'বেনামী শ্রমিক',
    reporterLabel: 'প্রতিবেদনকারী:',
    reportedDateLabel: 'তারিখ',

    // Screen Reader Announcements
    announceShiftClockedIn: 'শিফট শুরু হয়েছে। টাইমার চলছে।',
    announceShiftClockedOut: 'শিফট শেষ হয়েছে। ২x ওভারটাইম সহ বেতন আপডেট হয়েছে।',
    announceShiftLogged: (hours) => `${hours} ঘণ্টার শিফট রেকর্ড করা হয়েছে।`,
    announceHazardReported: 'বিপদের রিপোর্ট সফলভাবে জমা হয়েছে।',
    announceSectorSwitched: (sectorName) => `ক্ষেত্র পরিবর্তন করে ${sectorName} করা হয়েছে`,

    // TTS Template
    speechTextTemplate: (takeHome, regH, otH, deductions) =>
      `নমস্কার। আপনার এই সপ্তাহের হাতে পাওয়া বেতন ${takeHome} টাকা। আপনি ${regH} সাধারণ ঘণ্টা এবং ${otH} ঘণ্টা দ্বিগুণ হারে ওভারটাইম কাজ করেছেন। ৮ শতাংশ কর্তন ${deductions} টাকা হয়েছে। নিরাপদে থাকুন।`,
  },

  mr: {
    // App & Header
    appName: 'फेअरशिफ्ट',
    appTagline: 'योग्य वेतन • 2x ओव्हरटाईम • सुरक्षा व थकवा संरक्षण',
    unSdgBadge: 'संयुक्त राष्ट्र SDG 8: सन्मानपूर्वक काम',
    workerApp: 'कामगार ॲप',
    adminDashboard: 'व्यवस्थापक डॅशबोर्ड',
    selectLanguage: 'भाषा निवडा',
    activeSectorLabel: 'सध्याचे कार्यक्षेत्र:',
    sectorConstruction: 'बांधकाम साइट',
    sectorCollege: 'कॉलेज कॅम्पस',
    overtimeBannerText: '>8 तास = 2x दुप्पट दर',
    appFooter: 'फेअरशिफ्ट • संयुक्त राष्ट्र SDG 8 सन्मानपूर्वक काम व आर्थिक वाढ • बांधकाम साइट (₹१००/तास) • कॉलेज कॅम्पस (₹८०/तास)',
    skipToContent: 'मुख्य घटकावर जा',
    loadingApp: 'फेअरशिफ्ट सुरू होत आहे...',
    hourAbbr: 'तास',

    // Worker Identity & Profile
    switchWorker: 'कामगार बदला',
    workerIdPrefix: 'आयडी:',
    rateLabel: 'दर:',
    overtimeNotice: '>8 तास = 2x दुप्पट दर',
    activeSectorInfo: (rate) => `दर: ₹${rate}/तास (2x ओव्हरटाईम: ₹${rate * 2}/तास)`,
    formatRole: (role) => {
      const map: Record<string, string> = {
        'Masonry Specialist': 'गवंडीकाम तज्ज्ञ',
        'Concrete & Pouring Lead': 'काँक्रीट ओतकाम प्रमुख',
        'Heavy Rigging & Crane Ops': 'क्रेन व जड भार वाहक',
        'Steel & Rebar Fabricator': 'स्टील व लोखंड कारागीर',
        'Site Safety & Scaffolding Helper': 'सुरक्षा व मचाण सहाय्यक',
        'Campus Facilities Tech': 'परिसर देखभाल तंत्रज्ञ',
        'Science Laboratory Assistant': 'विज्ञान प्रयोगशाळा सहाय्यक',
        'Central Library Logistics': 'मध्यवर्ती ग्रंथालय सहाय्यक',
        'Hostel Maintenance & Electrical': 'वसतिगृह विद्युत देखभाल',
        'Student Dining Hall Staff': 'भोजनालय कर्मचारी',
      };
      return map[role] || role;
    },

    // Worker Tabs
    navAriaLabel: 'कामगार विभाग',
    tabShift: 'शिफ्ट घड्याळ',
    tabPayslip: 'माझी पगार पावती',
    tabHazards: 'धोका तक्रार',

    // Shift Tracking
    shiftTrackingAria: 'शिफ्ट ट्रॅकिंग आणि चेक इन',
    readyToBeginWork: 'काम सुरू करण्यासाठी सज्ज',
    sdgGuaranteeText: 'संयुक्त राष्ट्र SDG 8 मानकांनुसार पारदर्शक कामाची नोंद',
    checkIn: 'काम सुरू (चेक इन)',
    checkOut: 'काम पूर्ण (चेक आउट)',
    checkInAria: 'काम सुरू करण्यासाठी चेक इन करा',
    checkOutAria: 'काम पूर्ण करण्यासाठी चेक आउट करा',
    checkedInStatus: 'सध्या कामावर उपस्थित',
    checkedOutStatus: 'कामावर नाही',
    activeShiftDuration: 'सध्या कामाचा वेळ',
    startedAt: 'सुरू झालेली वेळ:',
    completedShiftHoursLabel: 'पूर्ण केलेले तास (डेमो सिम्युलेटर):',
    overtimeCreditHelp: '8 तासांपेक्षा जास्त वेळ आपोआप 2x दुप्पट दराने मोजला जातो',
    quickAddShift: 'शिफ्टचे तास नोंदवा',
    addShiftHelp: 'आज काम केलेले तास निवडा (८ तासांपेक्षा जास्त वेळेसाठी दुप्पट वेतन २x)',
    addShiftButton: 'शिफ्ट जोडा',
    savingShift: 'जतन करत आहे...',
    weeklyTakeHome: 'साप्ताहिक हातात येणारी कमाई',
    viewPayslip: 'पगार पावती पहा',
    hoursSelectAria: 'काम केलेले तास निवडा',

    // Errors
    errorCheckInFailed: 'चेक इन अयशस्वी झाले',
    errorCheckOutFailed: 'चेक आउट अयशस्वी झाले',
    errorLogShiftFailed: 'शिफ्ट नोंदवण्यात अयशस्वी',

    // Hours Dropdown Options
    opt7h: '7 तास: 7 नियमित + 0 ओव्हरटाईम',
    opt8h: '8 तास: 8 नियमित + 0 ओव्हरटाईम',
    opt8_5h: '8.5 तास: 8 नियमित + 0.5 ओव्हरटाईम (2x)',
    opt9h: '9 तास: 8 नियमित + 1 ओव्हरटाईम (2x)',
    opt10h: '10 तास: 8 नियमित + 2 ओव्हरटाईम (2x)',
    opt11h: '11 तास: 8 नियमित + 3 ओव्हरटाईम (2x)',
    opt12h: '12 तास: 8 नियमित + 4 ओव्हरटाईम (2x)',

    // Payslip & Chart
    payslipTitle: 'साप्ताहिक पारदर्शक पगार पावती',
    payslipSubtitle: (rate) => `ताशी दर: ₹${rate}/तास • ओव्हरटाईम: ₹${rate * 2}/तास (2x)`,
    regularHours: 'नियमित तास (८ तासांपर्यंत)',
    overtimeHours: 'ओव्हरटाईम तास (८ तासांपेक्षा जास्त)',
    overtimeBadge: '२ पट वेतन',
    totalHoursWorked: 'एकूण कामाचे तास',
    ratePerHour: 'ताशी दर',
    regularPay: 'नियमित पगार',
    overtimePay: 'ओव्हरटाईम पगार (२x)',
    grossPay: 'एकूण रक्कम',
    deductions: 'कपात (८% कल्याण निधी)',
    deductionsSubtitle: 'कामगार कल्याण व विमा निधी कपात',
    takeHomePay: 'हातात येणारा पगार',
    directCompensation: 'कामगाराला मिळणारे थेट वेतन',
    readAloud: 'पगार पावती ऐका',
    stopAudio: 'आवाज थांबवा',
    audioPlaying: 'पगार पावती वाचून दाखवली जात आहे...',
    chartTitle: 'दैनिक तास आणि 2x ओव्हरटाईम',
    chartSubtitle: 'हिरवा = नियमित (8 तासांपर्यंत) • पिवळा = दुप्पट वेतन 2x (>8 तास)',
    chartLegendRegular: 'नियमित (1x)',
    chartLegendOvertime: 'ओव्हरटाईम (2x)',
    chartStandardLimit: '8 तास मानक मर्यादा',
    chartEmptyState: 'या आठवड्यासाठी कोणतीही नोंद उपलब्ध नाही',
    chartAriaLabel: 'दैनिक कामाच्या तासांचा बार चार्ट',
    regularHoursCalc: (hours, rate) => `${hours} तास @ ₹${rate}/तास`,
    overtimeHoursCalc: (hours, rate) => `${hours} तास @ ₹${rate}/तास (2x)`,
    grossHoursCalc: (hours) => `(एकूण ${hours} तास)`,
    formatDay: (dayName) => {
      const map: Record<string, string> = {
        Mon: 'सोम',
        Tue: 'मंगळ',
        Wed: 'बुध',
        Thu: 'गुरू',
        Fri: 'शुक्र',
        Sat: 'शनि',
        Sun: 'रवि',
      };
      return map[dayName] || dayName;
    },

    // Hazard Reporting
    hazardTitle: 'सुरक्षा धोक्याची तक्रार करा',
    hazardSubtitle: 'चिन्हावर टॅप करा, बोला किंवा लिहा',
    hazardStep1: '१. धोक्याचा प्रकार निवडा',
    hazardStep2: '२. माहिती द्या (बोलून किंवा लिहून)',
    hazardFall: 'पडण्याचा धोका',
    hazardFire: 'आगीचा धोका',
    hazardElectric: 'विजेचा शॉक',
    hazardWetFloor: 'ओली फरशी / निसरडी जागा',
    voiceNoteStart: 'बोलण्यासाठी दाबा',
    voiceNoteStop: 'आवाज थांबवा',
    voiceNoteListening: 'तुमचा आवाज ऐकत आहोत... फोनजवळ स्पष्ट बोला.',
    voiceMicBlocked: 'माईकची परवानगी नाकारली. कृपया खाली लिहून कळवा.',
    voiceNotSupported: 'या ब्राउझरमध्ये व्हॉइस इनपुट उपलब्ध नाही. कृपया खाली लिहा.',
    voiceInitError: 'माईक सुरू करता आला नाही. कृपया खाली माहिती लिहा.',
    voiceFallbackNote: '(या उपकरणावर व्हॉइस इनपुट उपलब्ध नाही; तुम्ही खाली लिहू शकता)',
    recognizedVoiceLabel: 'नोंदवलेला आवाज:',
    descriptionPlaceholder: 'धोक्याची माहिती लिहा (उदा. दुसऱ्या मजल्यावर उघडी विजेची वायर)',
    hazardDescAria: 'धोक्याचे वर्णन',
    locationLabel: 'ठिकाण (पर्यायी)',
    locationPlaceholder: 'उदा. पिलर 14 / रसायनशास्त्र लॅब कॉरिडॉर',
    chipLooseWire: 'लोबणारी उघडी वायर',
    chipWaterPuddle: 'पायऱ्यांजवळ पाण्याचे तळे',
    chipMissingGuardrail: 'सुरक्षा रेलिंग नाही',
    chipBlockedExit: 'आपत्कालीन निकास बंद आहे',
    sendAnonymously: 'नाव न दाखवता पाठवा',
    sendAnonymouslyDesc: 'तुमचे नाव किंवा ओळखपत्र कुठेही साठवले जाणार नाही.',
    submitHazard: 'तक्रार पाठवा',
    submitting: 'पाठवत आहोत...',
    hazardSuccessAlert: 'सुरक्षा धोक्याची तक्रार यशस्वीपणे पाठवली! स्थिती खुली आहे.',
    recentHazards: 'धोक्याची सद्यस्थिती',
    hazardsLoggedCount: 'नोंदवलेले',
    noHazardsReported: 'कोणतीही तक्रार नोंदवलेली नाही',
    statusOpen: 'सुरू (Open)',
    statusInReview: 'तपासणी सुरू (In review)',
    statusFixed: 'दुरुस्त झाले (Fixed)',
    anonymousReporter: 'निनावी कामगार',
    reporterLabel: 'तक्रारदार:',
    reportedDateLabel: 'दिनांक',

    // Screen Reader Announcements
    announceShiftClockedIn: 'शिफ्ट सुरू झाली. वेळ चालू आहे.',
    announceShiftClockedOut: 'शिफ्ट संपली. 2x ओव्हरटाईमसह पगार अपडेट झाला.',
    announceShiftLogged: (hours) => `${hours} तासांची शिफ्ट नोंदवली.`,
    announceHazardReported: 'सुरक्षा धोक्याची तक्रार यशस्वीरीत्या नोंदवली.',
    announceSectorSwitched: (sectorName) => `कार्यक्षेत्र बदलून ${sectorName} केले`,

    // TTS Template
    speechTextTemplate: (takeHome, regH, otH, deductions) =>
      `नमस्कार. तुमचा या आठवड्याचा हातात येणारा पगार ${takeHome} रुपये आहे. तुम्ही ${regH} नियमित तास आणि ${otH} तास दुप्पट दराने ओव्हरटाईम काम केले आहे. आठ टक्के कपात ${deductions} रुपये झाली आहे. सुरक्षित राहा.`,
  },

  kn: {
    // App & Header
    appName: 'ಫೇರ್‌ಶಿಫ್ಟ್',
    appTagline: 'ನ್ಯಾಯಯುತ ವೇತನ • 2x ಹೆಚ್ಚುವರಿ ಕೆಲಸ • ಸುರಕ್ಷತೆ ಮತ್ತು ಆಯಾಸ ತಡೆ',
    unSdgBadge: 'ವಿಶ್ವಸಂಸ್ಥೆ SDG 8: ಗೌರವಾನ್ವಿತ ಕೆಲಸ',
    workerApp: 'ಕಾರ್ಮಿಕರ ಆ್ಯಪ್',
    adminDashboard: 'ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    selectLanguage: 'ಭಾಷೆಯನ್ನು ಆರಿಸಿ',
    activeSectorLabel: 'ಪ್ರಸ್ತುತ ವಲಯ:',
    sectorConstruction: 'ಕಟ್ಟಡ ನಿರ್ಮಾಣ ತಾಣ',
    sectorCollege: 'ಕಾಲೇಜು ಆವರಣ',
    overtimeBannerText: '>8 ಗಂಟೆ = 2x ದುಪ್ಪಟ್ಟು ದರ',
    appFooter: 'ಫೇರ್‌ಶಿಫ್ಟ್ • ವಿಶ್ವಸಂಸ್ಥೆ SDG 8 ಗೌರವಾನ್ವಿತ ಕೆಲಸ ಮತ್ತು ಆರ್ಥಿಕ ಬೆಳವಣಿಗೆ • ನಿರ್ಮಾಣ ತಾಣ (₹100/ಗಂಟೆ) • ಕಾಲೇಜು ಆವರಣ (₹80/ಗಂಟೆ)',
    skipToContent: 'ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ಹೋಗಿ',
    loadingApp: 'ಫೇರ್‌ಶಿಫ್ಟ್ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    hourAbbr: 'ಗಂ',

    // Worker Identity & Profile
    switchWorker: 'ಕಾರ್ಮಿಕರನ್ನು ಬದಲಾಯಿಸಿ',
    workerIdPrefix: 'ಐಡಿ:',
    rateLabel: 'ದರ:',
    overtimeNotice: '>8 ಗಂಟೆ = 2x ದುಪ್ಪಟ್ಟು ದರ',
    activeSectorInfo: (rate) => `ದರ: ₹${rate}/ಗಂಟೆ (2x ಹೆಚ್ಚುವರಿ: ₹${rate * 2}/ಗಂಟೆ)`,
    formatRole: (role) => {
      const map: Record<string, string> = {
        'Masonry Specialist': 'ಗಾರೆ ಕೆಲಸಗಾರ',
        'Concrete & Pouring Lead': 'ಕಾಂಕ್ರೀಟ್ ಕೆಲಸದ ಮುಖ್ಯಸ್ಥ',
        'Heavy Rigging & Crane Ops': 'ಕ್ರೇನ್ ಮತ್ತು ಭಾರೀ ಯಂತ್ರ ನಿರ್ವಾಹಕ',
        'Steel & Rebar Fabricator': 'ಕಬ್ಬಿಣ ಬಗ್ಗಿಸುವ ನುರಿತ ಕೆಲಸಗಾರ',
        'Site Safety & Scaffolding Helper': 'ಸ್ಥಳ ಸುರಕ್ಷತಾ ಸಹಾಯಕ',
        'Campus Facilities Tech': 'ಕ್ಯಾಂಪಸ್ ಸೌಲಭ್ಯ ತಂತ್ರಜ್ಞ',
        'Science Laboratory Assistant': 'ವಿಜ್ಞಾನ ಪ್ರಯೋಗಾಲಯ ಸಹಾಯಕ',
        'Central Library Logistics': 'ಕೇಂದ್ರ ಗ್ರಂಥಾಲಯ ನಿರ್ವಾಹಕ',
        'Hostel Maintenance & Electrical': 'ವಸತಿನಿಲಯ ವಿದ್ಯುತ್ ಮತ್ತು ನಿರ್ವಹಣೆ',
        'Student Dining Hall Staff': 'ಊಟದ ಕೋಣೆ ಸಿಬ್ಬಂದಿ',
      };
      return map[role] || role;
    },

    // Worker Tabs
    navAriaLabel: 'ಕಾರ್ಮಿಕರ ವಿಭಾಗಗಳು',
    tabShift: 'ಶಿಫ್ಟ್ ಗಡಿಯಾರ',
    tabPayslip: 'ನನ್ನ ಸಂಬಳದ ಚೀಟಿ',
    tabHazards: 'ಅಪಾಯ ವರದಿ',

    // Shift Tracking
    shiftTrackingAria: 'ಶಿಫ್ಟ್ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಚೆಕ್ ಇನ್',
    readyToBeginWork: 'ಕೆಲಸ ಪ್ರಾರಂಭಿಸಲು ಸಿದ್ಧರಾಗಿ',
    sdgGuaranteeText: 'ವಿಶ್ವಸಂಸ್ಥೆ SDG 8 ನಿಯಮಗಳ ಅಡಿಯಲ್ಲಿ ಪಾರದರ್ಶಕ ಕೆಲಸದ ಸಮಯ ಟ್ರ್ಯಾಕಿಂಗ್',
    checkIn: 'ಕೆಲಸ ಪ್ರಾರಂಭ (ಚೆಕ್ ಇನ್)',
    checkOut: 'ಕೆಲಸ ಮುಕ್ತಾಯ (ಚೆಕ್ ಔಟ್)',
    checkInAria: 'ಕೆಲಸ ಪ್ರಾರಂಭಿಸಲು ಚೆಕ್ ಇನ್ ಮಾಡಿ',
    checkOutAria: 'ಕೆಲಸ ಮುಕ್ತಾಯಗೊಳಿಸಲು ಚೆಕ್ ಔಟ್ ಮಾಡಿ',
    checkedInStatus: 'ಪ್ರಸ್ತುತ ಕೆಲಸದಲ್ಲಿದ್ದೀರಿ',
    checkedOutStatus: 'ಕೆಲಸ ಪ್ರಾರಂಭವಾಗಿಲ್ಲ',
    activeShiftDuration: 'ಪ್ರಸ್ತುತ ಕೆಲಸದ ಅವಧಿ',
    startedAt: 'ಪ್ರಾರಂಭವಾದ ಸಮಯ:',
    completedShiftHoursLabel: 'ಪೂರ್ಣಗೊಂಡ ಕೆಲಸದ ಗಂಟೆಗಳು (ಡೆಮೊ ಸಿಮ್ಯುಲೇಟರ್):',
    overtimeCreditHelp: '8 ಗಂಟೆಗಳ ನಂತರದ ಕೆಲಸದ ಸಮಯ ಸ್ವಯಂಚಾಲಿತವಾಗಿ 2x ದುಪ್ಪಟ್ಟು ದರದಲ್ಲಿ ಜಮೆಯಾಗುತ್ತದೆ',
    quickAddShift: 'ಶಿಫ್ಟ್ ಗಂಟೆಗಳನ್ನು ನಮೂದಿಸಿ',
    addShiftHelp: 'ಇಂದು ಕೆಲಸ ಮಾಡಿದ ಗಂಟೆಗಳನ್ನು ಆರಿಸಿ (8 ಗಂಟೆಗಳ ನಂತರ ದುಪ್ಪಟ್ಟು ವೇತನ 2x)',
    addShiftButton: 'ಶಿಫ್ಟ್ ಸೇರಿಸಿ',
    savingShift: 'ಉಳಿಸಲಾಗುತ್ತಿದೆ...',
    weeklyTakeHome: 'ವಾರದ ಕೈಗೆ ಸಿಗುವ ಆದಾಯ',
    viewPayslip: 'ಸಂಬಳ ಚೀಟಿ ವೀಕ್ಷಿಸಿ',
    hoursSelectAria: 'ಕೆಲಸ ಮಾಡಿದ ಗಂಟೆಗಳನ್ನು ಆರಿಸಿ',

    // Errors
    errorCheckInFailed: 'ಚೆಕ್ ಇನ್ ವಿಫಲವಾಗಿದೆ',
    errorCheckOutFailed: 'ಚೆಕ್ ಔಟ್ ವಿಫಲವಾಗಿದೆ',
    errorLogShiftFailed: 'ಶಿಫ್ಟ್ ದಾಖಲಿಸಲು ವಿಫಲವಾಗಿದೆ',

    // Hours Dropdown Options
    opt7h: '7 ಗಂಟೆ: 7 ಸಾಮಾನ್ಯ + 0 ಹೆಚ್ಚುವರಿ',
    opt8h: '8 ಗಂಟೆ: 8 ಸಾಮಾನ್ಯ + 0 ಹೆಚ್ಚುವರಿ',
    opt8_5h: '8.5 ಗಂಟೆ: 8 ಸಾಮಾನ್ಯ + 0.5 ಹೆಚ್ಚುವರಿ (2x)',
    opt9h: '9 ಗಂಟೆ: 8 ಸಾಮಾನ್ಯ + 1 ಹೆಚ್ಚುವರಿ (2x)',
    opt10h: '10 ಗಂಟೆ: 8 ಸಾಮಾನ್ಯ + 2 ಹೆಚ್ಚುವರಿ (2x)',
    opt11h: '11 ಗಂಟೆ: 8 ಸಾಮಾನ್ಯ + 3 ಹೆಚ್ಚುವರಿ (2x)',
    opt12h: '12 ಗಂಟೆ: 8 ಸಾಮಾನ್ಯ + 4 ಹೆಚ್ಚುವರಿ (2x)',

    // Payslip & Chart
    payslipTitle: 'ವಾರದ ಪಾರದರ್ಶಕ ಸಂಬಳ ಚೀಟಿ',
    payslipSubtitle: (rate) => `ಗಂಟೆಯ ದರ: ₹${rate}/ಗಂಟೆ • ಹೆಚ್ಚುವರಿ ಕೆಲಸ: ₹${rate * 2}/ಗಂಟೆ (2x)`,
    regularHours: 'ಸಾಮಾನ್ಯ ಗಂಟೆಗಳು (8 ಗಂಟೆಯವರೆಗೆ)',
    overtimeHours: 'ಹೆಚ್ಚುವರಿ ಗಂಟೆಗಳು (8 ಗಂಟೆಯ ನಂತರ)',
    overtimeBadge: '2 ಪಟ್ಟು ವೇತನ',
    totalHoursWorked: 'ಒಟ್ಟು ಕೆಲಸದ ಗಂಟೆಗಳು',
    ratePerHour: 'ಗಂಟೆಯ ದರ',
    regularPay: 'ಸಾಮಾನ್ಯ ವೇತನ',
    overtimePay: 'ಹೆಚ್ಚುವರಿ ವೇತನ (2x)',
    grossPay: 'ಒಟ್ಟು ಮೊತ್ತ',
    deductions: 'ಕಡಿತಗಳು (8% ಕಲ್ಯಾಣ ನಿಧಿ)',
    deductionsSubtitle: 'ಕಾರ್ಮಿಕರ ಕಲ್ಯಾಣ ಮತ್ತು ವಿಮಾ ನಿಧಿ ಕಡಿತ',
    takeHomePay: 'ಕೈಗೆ ಸಿಗುವ ವೇತನ',
    directCompensation: 'ಕಾರ್ಮಿಕರಿಗೆ ನೇರವಾಗಿ ಸಿಗುವ ವೇತನ',
    readAloud: 'ಸಂಬಳ ಓದಿ ಕೇಳಿ',
    stopAudio: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
    audioPlaying: 'ನಿಮ್ಮ ಸಂಬಳದ ವಿವರವನ್ನು ಓದಲಾಗುತ್ತಿದೆ...',
    chartTitle: 'ದೈನಂದಿನ ಗಂಟೆಗಳು & 2x ಹೆಚ್ಚುವರಿ ಕೆಲಸ',
    chartSubtitle: 'ಹಸಿರು = ಸಾಮಾನ್ಯ (8 ಗಂಟೆವರೆಗೆ) • ಹಳದಿ = ದುಪ್ಪಟ್ಟು ವೇತನ 2x (>8 ಗಂಟೆ)',
    chartLegendRegular: 'ಸಾಮಾನ್ಯ (1x)',
    chartLegendOvertime: 'ಹೆಚ್ಚುವರಿ ಕೆಲಸ (2x)',
    chartStandardLimit: '8 ಗಂಟೆಗಳ ಪ್ರಮಾಣಿತ ಮಿತಿ',
    chartEmptyState: 'ಈ ವಾರಕ್ಕೆ ಯಾವುದೇ ಕೆಲಸದ ಸಮಯ ದಾಖಲಾಗಿಲ್ಲ',
    chartAriaLabel: 'ದೈನಂದಿನ ಕೆಲಸದ ಗಂಟೆಗಳ ಬಾರ್ ಚಾರ್ಟ್',
    regularHoursCalc: (hours, rate) => `${hours} ಗಂಟೆ @ ₹${rate}/ಗಂಟೆ`,
    overtimeHoursCalc: (hours, rate) => `${hours} ಗಂಟೆ @ ₹${rate}/ಗಂಟೆ (2x)`,
    grossHoursCalc: (hours) => `(ಒಟ್ಟು ${hours} ಗಂಟೆಗಳು)`,
    formatDay: (dayName) => {
      const map: Record<string, string> = {
        Mon: 'ಸೋಮ',
        Tue: 'ಮಂಗಳ',
        Wed: 'ಬುಧ',
        Thu: 'ಗುರು',
        Fri: 'ಶುಕ್ರ',
        Sat: 'ಶನಿ',
        Sun: 'ರವಿ',
      };
      return map[dayName] || dayName;
    },

    // Hazard Reporting
    hazardTitle: 'ಸುರಕ್ಷತಾ ಅಪಾಯವನ್ನು ವರದಿ ಮಾಡಿ',
    hazardSubtitle: 'ಚಿಹ್ನೆಯನ್ನು ಒತ್ತಿ, ಮಾತನಾಡಿ ಅಥವಾ ಬರೆಯಿರಿ',
    hazardStep1: '1. ಅಪಾಯದ ಪ್ರಕಾರವನ್ನು ಆರಿಸಿ',
    hazardStep2: '2. ವಿವರವನ್ನು ನೀಡಿ (ಧ್ವನಿ ಅಥವಾ ಬರಹ)',
    hazardFall: 'ಬೀಳುವ ಅಪಾಯ',
    hazardFire: 'ಬೆಂಕಿ ಅಪಾಯ',
    hazardElectric: 'ವಿದ್ಯುತ್ ಆಘಾತ',
    hazardWetFloor: 'ತೇವ ನೆಲ / ಜಾರುವಿಕೆ',
    voiceNoteStart: 'ಮಾತನಾಡಲು ಒತ್ತಿರಿ',
    voiceNoteStop: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
    voiceNoteListening: 'ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ಆಲಿಸಲಾಗುತ್ತಿದೆ... ಫೋನಿನ ಹತ್ತಿರ ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ.',
    voiceMicBlocked: 'ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ದಯವಿಟ್ಟು ಕೆಳಗೆ ಬರೆಯಿರಿ.',
    voiceNotSupported: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಬೆಂಬಲವಿಲ್ಲ. ದಯವಿಟ್ಟು ಕೆಳಗೆ ಬರೆಯಿರಿ.',
    voiceInitError: 'ಮೈಕ್ ಪ್ರಾರಂಭಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಕೆಳಗೆ ಬರೆಯಿರಿ.',
    voiceFallbackNote: '(ಈ ಸಾಧನದಲ್ಲಿ ಧ್ವನಿ ಬೆಂಬಲವಿಲ್ಲ; ನೀವು ಕೆಳಗೆ ಯಾವುದೇ ಭಾಷೆಯಲ್ಲಿ ಬರೆಯಬಹುದು)',
    recognizedVoiceLabel: 'ದಾಖಲಾದ ಧ್ವನಿ:',
    descriptionPlaceholder: 'ಅಪಾಯದ ಬಗ್ಗೆ ಬರೆಯಿರಿ (ಉದಾ: ಎರಡನೇ ಮಹಡಿಯಲ್ಲಿ ತುಂಡಾದ ಕರೆಂಟ್ ವೈರ್)',
    hazardDescAria: 'ಅಪಾಯದ ವಿವರಣೆ',
    locationLabel: 'ಸ್ಥಳ (ಐಚ್ಛಿಕ)',
    locationPlaceholder: 'ಉದಾ: ಕಂಬ 14 / ರಸಾಯನಶಾಸ್ತ್ರ ಲ್ಯಾಬ್ ಕಾರಿಡಾರ್',
    chipLooseWire: 'ನೇತಾಡುತ್ತಿರುವ ತುಂಡಾದ ವೈರ್',
    chipWaterPuddle: 'ಮೆಟ್ಟಿಲುಗಳ ಬಳಿ ನಿಂತ ನೀರು',
    chipMissingGuardrail: 'ಸುರಕ್ಷತಾ ತಡೆಗೋಡೆ ಇಲ್ಲ',
    chipBlockedExit: 'ತುರ್ತು ನಿರ್ಗಮನ ದಾರಿ ಮುಚ್ಚಿದೆ',
    sendAnonymously: 'ಹೆಸರಿಲ್ಲದೆ ಕಳುಹಿಸಿ',
    sendAnonymouslyDesc: 'ನಿಮ್ಮ ಹೆಸರು ಅಥವಾ ಗುರುತನ್ನು ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ.',
    submitHazard: 'ವರದಿ ಕಳುಹಿಸಿ',
    submitting: 'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...',
    hazardSuccessAlert: 'ಸುರಕ್ಷತಾ ಅಪಾಯದ ವರದಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಕೆಯಾಗಿದೆ! ಸ್ಥಿತಿ ಮುಕ್ತವಾಗಿದೆ.',
    recentHazards: 'ಅಪಾಯಗಳ ಸ್ಥಿತಿ',
    hazardsLoggedCount: 'ದಾಖಲಾಗಿರುವುದು',
    noHazardsReported: 'ಯಾವುದೇ ಅಪಾಯಗಳು ದಾಖಲಾಗಿಲ್ಲ',
    statusOpen: 'ತೆರೆದಿದೆ (Open)',
    statusInReview: 'ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ (In review)',
    statusFixed: 'ಸರಿಪಡಿಸಲಾಗಿದೆ (Fixed)',
    anonymousReporter: 'ಅನಾಮಧೇಯ ಕಾರ್ಮಿಕ',
    reporterLabel: 'ವರದಿದಾರರು:',
    reportedDateLabel: 'ದಿನಾಂಕ',

    // Screen Reader Announcements
    announceShiftClockedIn: 'ಕೆಲಸ ಪ್ರಾರಂಭವಾಗಿದೆ. ಸಮಯ ಚಾಲನೆಯಲ್ಲಿದೆ.',
    announceShiftClockedOut: 'ಕೆಲಸ ಮುಕ್ತಾಯವಾಗಿದೆ. 2x ಹೆಚ್ಚುವರಿ ವೇತನದೊಂದಿಗೆ ಚೀಟಿ ನವೀಕರಿಸಲಾಗಿದೆ.',
    announceShiftLogged: (hours) => `${hours} ಗಂಟೆಗಳ ಶಿಫ್ಟ್ ದಾಖಲಿಸಲಾಗಿದೆ.`,
    announceHazardReported: 'ಸುರಕ್ಷತಾ ಅಪಾಯವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ವರದಿ ಮಾಡಲಾಗಿದೆ.',
    announceSectorSwitched: (sectorName) => `ವಲಯವನ್ನು ${sectorName} ಗೆ ಬದಲಾಯಿಸಲಾಗಿದೆ`,

    // TTS Template
    speechTextTemplate: (takeHome, regH, otH, deductions) =>
      `ನಮಸ್ಕಾರ. ಈ ವಾರ ನಿಮ್ಮ ಕೈಗೆ ಸಿಗುವ ಸಂಬಳ ${takeHome} ರೂಪಾಯಿಗಳು. ನೀವು ${regH} ಸಾಮಾನ್ಯ ಗಂಟೆಗಳು ಮತ್ತು ${otH} ಗಂಟೆ ದುಪ್ಪಟ್ಟು ದರದಲ್ಲಿ ಹೆಚ್ಚುವರಿ ಕೆಲಸ ಮಾಡಿದ್ದೀರಿ. ಎಂಟು ಶೇಕಡಾ ಕಡಿತ ${deductions} ರೂಪಾಯಿ. ಸುರಕ್ಷಿತವಾಗಿರಿ.`,
  },
};

/**
 * Speech synthesis speaker helper that matches the active language.
 */
export function speakText(
  text: string,
  langCode: LanguageCode,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  window.speechSynthesis.cancel(); // Stop any currently playing audio

  const utterance = new SpeechSynthesisUtterance(text);
  const langConfig = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
  utterance.lang = langConfig ? langConfig.bcp47 : 'en-IN';
  utterance.rate = 0.95; // Slightly slower, highly clear for low-literacy users
  utterance.pitch = 1.0;

  if (onEnd) {
    utterance.onend = () => onEnd();
    utterance.onerror = () => onEnd();
  }

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export interface Program {
  name: string;
  code: string;
  facultyCode: string;
}

const programs: Program[] = [
  { name: 'BA in Architectural Studies', code: 'BAAS', facultyCode: 'fabe' },
  {
    name: 'Diploma in Architecture Technology',
    code: 'DAT',
    facultyCode: 'fabe',
  },
  { name: 'B Bus in Entrepreneurship', code: 'BEN', facultyCode: 'fbmg' },
  { name: 'BA in Human Resource Management', code: 'BHR', facultyCode: 'fbmg' },
  { name: 'B Bus in International Business', code: 'BIB', facultyCode: 'fbmg' },
  { name: 'Diploma in Business Management', code: 'DBM', facultyCode: 'fbmg' },
  { name: 'Diploma in Marketing', code: 'DMK', facultyCode: 'fbmg' },
  { name: 'Diploma in Retail Management', code: 'DRM', facultyCode: 'fbmg' },
  {
    name: 'BA in Professional Communication',
    code: 'BPC',
    facultyCode: 'fcmb',
  },
  { name: 'Diploma in Journalism & Media', code: 'DJM', facultyCode: 'fcmb' },
  { name: 'Diploma in Public Relations', code: 'DPR', facultyCode: 'fcmb' },
  { name: 'BA in Broadcasting & Journalism', code: 'BBJ', facultyCode: 'fcmb' },
  { name: 'BA in Digital Film Production', code: 'BDF', facultyCode: 'fcmb' },
  {
    name: 'Diploma in Broadcasting Radio & TV',
    code: 'DBRTV',
    facultyCode: 'fcmb',
  },
  { name: 'Diploma in Film Production', code: 'DFP', facultyCode: 'fcmb' },
  { name: 'BA in Tourism Management', code: 'BTM', facultyCode: 'fcth' },
  { name: 'Diploma in Events Management', code: 'DEM', facultyCode: 'fcth' },
  { name: 'Diploma in Hotel Management', code: 'DHM', facultyCode: 'fcth' },
  {
    name: 'Diploma in International Tourism',
    code: 'DITR',
    facultyCode: 'fcth',
  },
  { name: 'Diploma in Tourism Management', code: 'DTM', facultyCode: 'fcth' },
  { name: 'B Des in Professional Design', code: 'BDSPD', facultyCode: 'fdi' },
  { name: 'Diploma in Creative Advertising', code: 'DCAV', facultyCode: 'fdi' },
  { name: 'Diploma in Graphic Design', code: 'DGD', facultyCode: 'fdi' },
  { name: 'BA in Fashion & Retailing', code: 'BAFASH', facultyCode: 'fdi' },
  {
    name: 'Diploma in Fashion & Apparel Design',
    code: 'DFAD',
    facultyCode: 'fdi',
  },
  {
    name: 'BSc in Business Information Technology',
    code: 'BSCBIT',
    facultyCode: 'fict',
  },
  { name: 'BSc in Information Technology', code: 'BSCIT', facultyCode: 'fict' },
  {
    name: 'BSc in Software Engineering with Multimedia',
    code: 'BSCSM',
    facultyCode: 'fict',
  },
  {
    name: 'Diploma in Business Information Technology',
    code: 'DBIT',
    facultyCode: 'fict',
  },
  {
    name: 'Diploma in Information Technology',
    code: 'DIT',
    facultyCode: 'fict',
  },
  {
    name: 'Diploma in Multimedia & Software Engineering',
    code: 'DMSE',
    facultyCode: 'fict',
  },
];

export function getProgramByCode(code: string): Program | undefined {
  return programs.find((program) => program.code === code);
}

export function getProgramByFaculty(facultyCode: string): Program[] {
  return programs.filter((program) => program.facultyCode === facultyCode);
}

export default programs;

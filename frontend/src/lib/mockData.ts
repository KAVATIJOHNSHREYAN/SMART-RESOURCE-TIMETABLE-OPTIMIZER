// Generate realistic mock data programmatically

const DEPARTMENTS = [
  'Computer Science',
  'AI & Computational Intelligence',
  'Information Technology',
  'Electronics',
  'Mechanical',
  'Civil',
  'Business Administration',
];

const SUBJECT_PREFIXES = ['CS', 'AI', 'IT', 'EC', 'ME', 'CE', 'BA'];
const FIRST_NAMES = ['John', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'James', 'Ava', 'Alexander', 'Isabella'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateDepartments = () => {
  return DEPARTMENTS.map((dept, index) => ({
    id: index + 1,
    name: dept,
    code: SUBJECT_PREFIXES[index],
    head: `Dr. ${randomElement(FIRST_NAMES)} ${randomElement(LAST_NAMES)}`,
    facultyCount: randomNumber(15, 45),
    studentCount: randomNumber(300, 1200),
    courses: randomNumber(5, 15),
    description: `The department of ${dept} focuses on cutting edge research and industry-oriented curriculum.`,
  }));
};

export const generateFaculty = (count = 40) => {
  return Array.from({ length: count }).map((_, i) => {
    const dept = randomElement(DEPARTMENTS);
    return {
      id: i + 1,
      name: `Dr. ${randomElement(FIRST_NAMES)} ${randomElement(LAST_NAMES)}`,
      employeeId: `FAC${2000 + i}`,
      department: dept,
      specialization: 'Advanced ' + dept,
      qualification: randomElement(['Ph.D.', 'Post-Doc', 'M.Tech']),
      experience: randomNumber(2, 25),
      email: `faculty${i}@srto.edu`,
      phone: `+1 555-01${randomNumber(10, 99)}`,
      office: `Room ${randomNumber(100, 400)}`,
      workload: randomNumber(8, 18),
      status: randomElement(['Active', 'Active', 'Active', 'On Leave']),
    };
  });
};

export const generateStudents = (count = 500) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    rollNumber: `STU${10000 + i}`,
    name: `${randomElement(FIRST_NAMES)} ${randomElement(LAST_NAMES)}`,
    department: randomElement(DEPARTMENTS),
    semester: randomNumber(1, 8),
    section: randomElement(['A', 'B', 'C']),
    cgpa: (Math.random() * (4.0 - 2.5) + 2.5).toFixed(2),
    attendance: randomNumber(65, 100),
    email: `student${i}@srto.edu`,
    phone: `+1 555-02${randomNumber(10, 99)}`,
    status: randomElement(['Active', 'Active', 'Active', 'Suspended']),
  }));
};

export const generateSubjects = (count = 60) => {
  return Array.from({ length: count }).map((_, i) => {
    const deptIdx = randomNumber(0, DEPARTMENTS.length - 1);
    const dept = DEPARTMENTS[deptIdx];
    const code = SUBJECT_PREFIXES[deptIdx];
    return {
      id: i + 1,
      name: `${dept} Subject ${i + 1}`,
      code: `${code}${randomNumber(100, 499)}`,
      credits: randomNumber(2, 4),
      semester: randomNumber(1, 8),
      department: dept,
      weeklyHours: randomNumber(2, 5),
      status: 'Active',
    };
  });
};

export const generateClassrooms = (count = 35) => {
  return Array.from({ length: count }).map((_, i) => {
    const type = randomElement(['Lecture Hall', 'Lab', 'Seminar Room']);
    return {
      id: i + 1,
      roomNumber: `${randomElement(['A', 'B', 'C'])}-${randomNumber(101, 599)}`,
      building: `Block ${randomElement(['A', 'B', 'C'])}`,
      capacity: type === 'Lecture Hall' ? randomNumber(60, 120) : randomNumber(30, 40),
      floor: randomNumber(1, 5),
      equipment: type === 'Lab' ? 'Workstations, Projector' : 'Projector, Smartboard',
      type: type,
      status: randomElement(['Available', 'Available', 'Under Maintenance']),
    };
  });
};

export const mockData = {
  departments: generateDepartments(),
  faculty: generateFaculty(40),
  students: generateStudents(500),
  subjects: generateSubjects(60),
  classrooms: generateClassrooms(35),
};

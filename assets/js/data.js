// Data contoh untuk demo tampilan — identitas sekolah, kelas, dan nilai
// persis meniru database/seeders/DemoSeeder.php di aplikasi aslinya
// (sekolah "MTs Contoh Nusantara", siswa contoh "Ahmad Fauzan Ramadhan").
// Halaman ini statis: tidak ada server, database, atau login sungguhan.

const SCHOOL = {
    name: 'MTs Contoh Nusantara',
    type: 'Madrasah Tsanawiyah',
    npsn: '20123456',
    address: 'Jl. Pendidikan No. 1, Kota Contoh',
    principalName: 'H. Abdul Karim, M.Pd.',
    principalNip: '196501011990011001',
    curriculum: 'Kurikulum Merdeka',
    yearLabel: '2026/2027',
    termLabel: 'Semester Ganjil',
    termRange: '13 Jul – 18 Des 2026',
    reportDate: '19 Desember 2026',
    effectiveDays: 108,
    minAttendancePercent: 75,
};

const DEMO_PASSWORD = 'Demo#2026';

const ACCOUNTS = {
    admin: {
        role: 'admin', roleLabel: 'Admin / Kepala Sekolah', name: 'Admin Demo',
        username: 'admin.demo', password: DEMO_PASSWORD, initials: 'AD',
    },
    guru: {
        role: 'guru', roleLabel: 'Guru · Wali Kelas VIII A', name: 'Rina Marlina, S.Pd.',
        username: 'rina.marlina', password: DEMO_PASSWORD, initials: 'RM',
    },
    siswa: {
        role: 'siswa', roleLabel: 'Siswa · Kelas VIII A', name: 'Ahmad Fauzan Ramadhan',
        username: '1234567890', password: DEMO_PASSWORD, initials: 'AF',
    },
};

const TEACHERS = [
    { name: 'Rina Marlina, S.Pd.', nip: '198203122008012003', gender: 'P', homeroom: 'VIII A', subject: 'Bahasa Indonesia' },
    { name: 'Ahmad Fauzi, S.Pd.', nip: '198501012010011002', gender: 'L', homeroom: null, subject: 'Matematika' },
    { name: 'Siti Aminah, S.Pd.I.', nip: '198907152012122001', gender: 'P', homeroom: 'VII A', subject: 'Al-Qur’an Hadis & Akidah Akhlak' },
    { name: 'Budi Santoso, S.Pd.', nip: '199003202015031004', gender: 'L', homeroom: 'IX A', subject: 'Ilmu Pengetahuan Alam' },
    { name: 'Dewi Lestari, M.Pd.', nip: '198711052011012005', gender: 'P', homeroom: null, subject: 'Bahasa Inggris' },
];

const SUBJECT_GROUPS = [
    { name: 'Pendidikan Agama Islam', subjects: ['Al-Qur’an Hadis', 'Akidah Akhlak', 'Fikih', 'Sejarah Kebudayaan Islam'] },
    {
        name: 'Mata Pelajaran Umum',
        subjects: [
            'Pendidikan Pancasila', 'Bahasa Indonesia', 'Bahasa Arab', 'Matematika',
            'Ilmu Pengetahuan Alam', 'Ilmu Pengetahuan Sosial', 'Bahasa Inggris',
            'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'Informatika', 'Seni Budaya',
        ],
    },
    { name: 'Muatan Lokal', subjects: ['Bahasa Daerah'] },
];

const SUBJECTS = SUBJECT_GROUPS.flatMap((g) => g.subjects);

const CLASSROOMS = {
    'VII A': {
        name: 'VII A', gradeLevel: 7, homeroom: 'Siti Aminah, S.Pd.I.',
        students: [
            ['Ahmad Setiawan', 'L'], ['Nabila Anggraini', 'P'], ['Budi Pratama', 'L'], ['Dewi Safitri', 'P'],
            ['Rizki Hidayat', 'L'], ['Aisyah Wulandari', 'P'], ['Fajar Kurniawan', 'L'], ['Zahra Permata', 'P'],
            ['Yusuf Ramadhan', 'L'], ['Laila Nurhaliza', 'P'],
        ],
    },
    'VIII A': {
        name: 'VIII A', gradeLevel: 8, homeroom: 'Rina Marlina, S.Pd.',
        students: [
            ['Ahmad Fauzan Ramadhan', 'L'], ['Siti Nur Anggraini', 'P'], ['Iqbal Setiawan', 'L'], ['Maya Safitri', 'P'],
            ['Hendra Pratama', 'L'], ['Zahra Wulandari', 'P'], ['Rahmat Kurniawan', 'L'], ['Nabila Permata', 'P'],
            ['Fajar Hidayat', 'L'], ['Dewi Ramadhan', 'P'],
        ],
    },
    'IX A': {
        name: 'IX A', gradeLevel: 9, homeroom: 'Budi Santoso, S.Pd.',
        students: [
            ['Yusuf Kurniawan', 'L'], ['Aisyah Permata', 'P'], ['Rizki Setiawan', 'L'], ['Laila Safitri', 'P'],
            ['Ahmad Pratama', 'L'], ['Nabila Hidayat', 'P'], ['Budi Ramadhan', 'L'], ['Dewi Nurhaliza', 'P'],
            ['Iqbal Wulandari', 'L'], ['Maya Kurniawan', 'P'],
        ],
    },
};

/** @returns {Array<{name:string, gender:string, nisn:string, nis:string, classroom:string}>} */
function buildStudents() {
    const list = [];
    let counter = 0;

    for (const classroom of Object.values(CLASSROOMS)) {
        classroom.students.forEach(([name, gender]) => {
            counter++;
            list.push({
                name,
                gender,
                nisn: counter === 11 ? '1234567890' : '00510' + String(counter).padStart(5, '0'),
                nis: String(1000 + counter),
                classroom: classroom.name,
            });
        });
    }

    return list;
}

const STUDENTS = buildStudents();

function studentsIn(classroomName) {
    return STUDENTS.filter((s) => s.classroom === classroomName);
}

/** Nilai VIII A persis seperti docs/bahan/rapor-halaman-1.html, untuk Ahmad Fauzan Ramadhan. */
const SHOWCASE_GRADES = {
    'Al-Qur’an Hadis': 88, 'Akidah Akhlak': 90, Fikih: 85, 'Sejarah Kebudayaan Islam': 87,
    'Pendidikan Pancasila': 86, 'Bahasa Indonesia': 89, 'Bahasa Arab': 80, Matematika: 82,
    'Ilmu Pengetahuan Alam': 84, 'Ilmu Pengetahuan Sosial': 86, 'Bahasa Inggris': 83,
    'Pendidikan Jasmani, Olahraga, dan Kesehatan': 91, Informatika: 92, 'Seni Budaya': 88,
    'Bahasa Daerah': 85,
};

/** Nilai VIII A untuk semua siswa & mapel — pola bervariasi tapi masuk akal (bukan acak). */
function gradeFor(studentIndex, subjectIndex) {
    if (studentIndex === 0) {
        return Object.values(SHOWCASE_GRADES)[subjectIndex];
    }
    return 72 + ((studentIndex * 5 + subjectIndex * 7 + 13) % 24);
}

function rata(numbers) {
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

function demoToast(message) {
    const existing = document.getElementById('demo-toast');
    if (existing) existing.remove();

    const el = document.createElement('div');
    el.id = 'demo-toast';
    el.className = 'fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2600);
}

function inert(selector, message) {
    document.querySelectorAll(selector).forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            demoToast(message || 'Ini demo tampilan — fitur ini tidak aktif.');
        });
    });
}

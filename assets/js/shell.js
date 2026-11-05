// Kerangka tampilan bersama (sidebar + topbar) untuk semua halaman demo,
// meniru resources/views/layouts/app/sidebar.blade.php di aplikasi aslinya.
// Peran yang sedang "login" disimpan di sessionStorage — murni kosmetik,
// tidak ada otentikasi sungguhan.

const NAV_GROUPS = [
    {
        heading: 'Beranda',
        items: [
            { route: 'dashboard.html', label: 'Beranda', icon: 'home', roles: ['admin', 'guru', 'siswa'] },
            { route: 'ringkasan.html', label: 'Ringkasan', icon: 'presentation-chart-line', roles: ['admin'] },
            { route: 'siswa-jadwal.html', label: 'Jadwal Saya', icon: 'calendar-days', roles: ['siswa'] },
            { route: 'siswa-materi.html', label: 'Materi Minggu Ini', icon: 'book-open', roles: ['siswa'] },
            { route: 'siswa-nilai.html', label: 'Nilai Saya', icon: 'clipboard-document-list', roles: ['siswa'] },
            { route: 'siswa-kehadiran.html', label: 'Kehadiran Saya', icon: 'clock', roles: ['siswa'] },
            { route: 'siswa-rapor.html', label: 'Rapor Saya', icon: 'document-text', roles: ['siswa'] },
            { route: 'siswa-ujian.html', label: 'Ujian Saya', icon: 'pencil-square', roles: ['siswa'] },
        ],
    },
    {
        heading: 'Penilaian & Rapor',
        items: [
            { route: 'input-nilai.html', label: 'Input Nilai', icon: 'pencil-square', roles: ['admin', 'guru'] },
            { route: 'absensi.html', label: 'Absensi Harian', icon: 'calendar-days', roles: ['admin', 'guru'] },
            { route: 'rapor-kelas.html', label: 'Rapor Kelas Saya', icon: 'clipboard-document-check', roles: ['admin', 'guru'] },
            { route: 'cetak-rapor.html', label: 'Cetak Rapor', icon: 'printer', roles: ['admin'] },
        ],
    },
    {
        heading: 'Data Sekolah',
        items: [
            { route: 'siswa.html', label: 'Data Siswa', icon: 'users', roles: ['admin'] },
            { route: 'guru.html', label: 'Data Guru', icon: 'identification', roles: ['admin'] },
            { route: 'kelas.html', label: 'Kelas', icon: 'building-library', roles: ['admin'] },
        ],
    },
];

function getSession() {
    try {
        const role = sessionStorage.getItem('demo_role');
        return role ? ACCOUNTS[role] : null;
    } catch {
        return null;
    }
}

function requireSession() {
    const session = getSession();
    if (!session) {
        location.href = 'login.html';
        return null;
    }
    return session;
}

function login(role) {
    try {
        sessionStorage.setItem('demo_role', role);
    } catch { /* private mode: lanjut tanpa simpan */ }
    location.href = 'dashboard.html';
}

function logout() {
    try {
        sessionStorage.removeItem('demo_role');
    } catch { /* abaikan */ }
    location.href = 'login.html';
}

function navHtml(session, activeRoute) {
    return NAV_GROUPS.map((group) => {
        const items = group.items.filter((item) => item.roles.includes(session.role));
        if (items.length === 0) return '';

        const links = items.map((item) => {
            const active = item.route === activeRoute;
            return `
                <a href="${item.route}" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${active ? 'bg-brand-100 text-brand-900 dark:bg-brand-900/40 dark:text-brand-100' : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'}">
                    <iconify-icon icon="heroicons:${item.icon}" width="18" class="shrink-0"></iconify-icon>
                    ${item.label}
                </a>`;
        }).join('');

        return `
            <div class="mb-1">
                <p class="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">${group.heading}</p>
                ${links}
            </div>`;
    }).join('');
}

function renderShell(activeRoute) {
    const session = requireSession();
    if (!session) return null;

    document.getElementById('app-sidebar').innerHTML = `
        <div class="flex items-center gap-2.5 px-3 py-4">
            <span class="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
                <iconify-icon icon="heroicons:academic-cap" width="20"></iconify-icon>
            </span>
            <span class="text-[15px] font-bold tracking-tight text-zinc-900 dark:text-white">Sistem Sekolah</span>
        </div>
        <div class="mx-3 rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-800 dark:bg-brand-900/30 dark:text-brand-200">
            <p class="font-semibold">${SCHOOL.yearLabel} · ${SCHOOL.termLabel}</p>
            <p class="text-brand-700/80 dark:text-brand-300/80">${SCHOOL.termRange}</p>
        </div>
        <nav class="mt-1 flex-1 overflow-y-auto px-2">${navHtml(session, activeRoute)}</nav>
        <div class="mt-auto flex items-center gap-2.5 border-t border-zinc-200 px-3 py-3 dark:border-zinc-700">
            <span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">${session.initials}</span>
            <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-semibold text-zinc-900 dark:text-white">${session.name}</p>
                <p class="truncate text-xs text-zinc-500 dark:text-zinc-400">${session.roleLabel}</p>
            </div>
            <button type="button" onclick="logout()" title="Keluar" class="shrink-0 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800">
                <iconify-icon icon="heroicons:arrow-right-start-on-rectangle" width="18"></iconify-icon>
            </button>
        </div>`;

    const topbar = document.getElementById('app-topbar');
    if (topbar) {
        topbar.innerHTML = `
            <button type="button" onclick="document.getElementById('app-sidebar-wrap').classList.toggle('hidden')" class="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 lg:hidden">
                <iconify-icon icon="heroicons:bars-3" width="22"></iconify-icon>
            </button>
            <span class="text-sm font-medium text-zinc-500 dark:text-zinc-400">${SCHOOL.yearLabel} · ${SCHOOL.termLabel}</span>
            <span class="flex-1"></span>
            <span class="hidden text-sm text-zinc-500 sm:inline">${session.name}</span>`;
    }

    const banner = document.getElementById('demo-banner');
    if (banner) {
        banner.innerHTML = `<iconify-icon icon="heroicons:eye" class="-mt-0.5 inline-block align-middle"></iconify-icon> Ini demo tampilan Sistem Sekolah (contoh portofolio) · data fiktif, tidak tersambung ke server sungguhan`;
    }

    inert('[data-inert]', 'Ini demo tampilan — fitur ini tidak aktif.');
    document.querySelectorAll('[data-msg]').forEach((el) => {
        el.addEventListener('click', (e) => { e.preventDefault(); demoToast(el.dataset.msg); });
    });

    return session;
}

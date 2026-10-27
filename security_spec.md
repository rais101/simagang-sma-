# Security Specification & Threat Model (SIMagang SMA)

## 1. Data Invariants
1. **Siswa (Internship Students)**:
   - Must have valid name, school, major, and company within strict character limits (name <= 150 chars, sekolah <= 150 chars).
   - Document ID must be a hardened identifier matching `^[a-zA-Z0-9_-]+$` with length <= 128.
2. **Jurnal Harian (Daily Activity Log)**:
   - Must reference a valid `siswaId`.
   - Activity (`aktivitas`) and result (`hasil`) are required strings <= 1000 characters.
   - Status paraf must strictly be either `'Menunggu Paraf'` or `'Disetujui'`.
   - Mentors/Admins can verify/approve journals (`statusParaf` transition).
3. **Jadwal Monitoring (Mentoring Agenda)**:
   - Must have valid date, time, topic (<= 300 chars), mode ('Daring (Online)' or 'Luring (Kunjungan)'), and status.
4. **Penilaian Kinerja (Performance Evaluation)**:
   - Numerical scores (kedisiplinan, keterampilan, inisiatif, kerjasama, rataRata) must strictly be numbers between 0 and 100.
   - Evaluator (`dinilaiOleh`) must be recorded and <= 150 chars.
5. **Log Aktivitas (Audit Trail)**:
   - Append-only or admin-audited logs with actor name, role ('siswa', 'mentor', 'admin'), action, and timestamp.
6. **Administrator Privilege**:
   - `muh.rais2010@gmail.com` with `email_verified == true` is the bootstrapped system administrator with full oversight.

## 2. The "Dirty Dozen" Threat Payloads (Must Return PERMISSION_DENIED)
1. **Payload 1 (Ghost Field Injection / Shadow Update)**:
   Attempt to inject `isAdmin: true` or `shadowPrivilege: 1` into student document `/siswa/{id}`.
2. **Payload 2 (Unverified Email Spoofing)**:
   Attempt admin operations with `email: "muh.rais2010@gmail.com"` but `email_verified: false`.
3. **Payload 3 (Score Overflow Attack)**:
   Submitting evaluation with `kedisiplinan: 9999` (exceeding range 0-100).
4. **Payload 4 (Negative Score Poisoning)**:
   Submitting evaluation with `keterampilan: -50`.
5. **Payload 5 (Denial of Wallet - Bloated Text)**:
   Submitting journal with `aktivitas` exceeding 50,000 characters to exhaust storage.
6. **Payload 6 (Illegal Document ID Injection)**:
   Creating a document with ID `/siswa/../../malicious_payload_with_null_bytes%00`.
7. **Payload 7 (Unauthenticated Tampering)**:
   Modifying scores or deleting students with `request.auth == null`.
8. **Payload 8 (Invalid Status Spoofing)**:
   Submitting a journal with `statusParaf: "SuperApprovedHacked"`.
9. **Payload 9 (Blanket Scraping Without Auth)**:
   Querying list of students without being an authenticated user.
10. **Payload 10 (Improper Role Escalation)**:
    Non-admin user attempting to delete audit logs in `/logs/{logId}`.
11. **Payload 11 (Empty Name Student Injection)**:
    Creating a student document with `nama: ""` or missing mandatory school field.
12. **Payload 12 (Schedule Mode Tampering)**:
    Submitting monitoring schedule with invalid mode `mode: "Telepathy"`.

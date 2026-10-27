import React, { useState } from 'react';
import { UserRole, Notifikasi, AuthUser } from '../types';
import { 
  Sprout, 
  UserCheck, 
  ShieldCheck, 
  Bell, 
  Sparkles, 
  LogOut, 
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  notifikasiList: Notifikasi[];
  onOpenPromptModal: () => void;
  currentUser: AuthUser | null;
  onOpenEditProfil: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  notifikasiList,
  onOpenPromptModal,
  currentUser,
  onOpenEditProfil,
  onLogout
}) => {
  const [showNotif, setShowNotif] = useState(false);
  const unreadCount = notifikasiList.filter(n => !n.sudahDibaca).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Branding - SMA Islam Alam & Sains Al-Jannah */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-amber-300 shadow-xs border border-emerald-600/80 shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
                  SIMagang <span className="text-emerald-700">Al-Jannah</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 hidden sm:inline-block">
                  IAS Depok
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden md:block">
                SMA Islam Alam & Sains Al-Jannah • Depok
              </p>
            </div>
          </div>

          {/* Simple Role Navigation Switcher (Desktop) */}
          <nav aria-label="Navigasi Peran" className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              id="nav-role-siswa-btn"
              onClick={() => onRoleChange('siswa')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all h-8 ${
                currentRole === 'siswa'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Siswa</span>
            </button>

            <button
              id="nav-role-mentor-btn"
              onClick={() => onRoleChange('mentor')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all h-8 ${
                currentRole === 'mentor'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Mentor Riset</span>
            </button>

            <button
              id="nav-role-admin-btn"
              onClick={() => onRoleChange('admin')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all h-8 ${
                currentRole === 'admin'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Koordinator Sekolah</span>
            </button>
          </nav>

          {/* User Info & Actions */}
          <div className="flex items-center gap-2">
            
            {/* User Info Chip */}
            {currentUser && (
              <button 
                onClick={currentUser.role === 'siswa' ? onOpenEditProfil : undefined}
                className={`flex items-center gap-2 bg-slate-50 border border-slate-200 px-2.5 h-9 rounded-xl ${
                  currentUser.role === 'siswa' ? 'cursor-pointer hover:bg-emerald-50/80 hover:border-emerald-200 transition-colors' : 'cursor-default'
                }`}
                title={currentUser.role === 'siswa' ? 'Klik untuk ganti profil nama Anda' : undefined}
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black shrink-0">
                  {currentUser.nama.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden lg:block pr-1">
                  <p className="text-xs font-bold text-slate-800 leading-tight max-w-[150px] truncate">
                    {currentUser.nama}
                  </p>
                  <p className="text-[10px] text-slate-500 capitalize leading-none mt-0.5">
                    {currentUser.role === 'siswa' ? 'Siswa IAS' : currentUser.role === 'mentor' ? 'Pembimbing Riset' : 'Koordinator'}
                  </p>
                </div>
              </button>
            )}

            {/* Prompt AI Button */}
            <button
              id="open-prompt-modal-btn"
              onClick={onOpenPromptModal}
              className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 px-3 h-9 rounded-xl text-xs font-semibold transition-colors shadow-2xs"
              title="Lihat & Salin Master Prompt AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="hidden xl:inline">Prompt AI</span>
            </button>

            {/* Notifications Button */}
            <div className="relative">
              <button
                id="notif-bell-btn"
                onClick={() => setShowNotif(!showNotif)}
                className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Lihat Notifikasi"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {/* Notification Popup Dropdown */}
              {showNotif && (
                <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-800 uppercase tracking-wider">
                      Notifikasi SMA IAS Al-Jannah
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      {unreadCount} Baru
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                    {notifikasiList.length === 0 ? (
                      <p className="p-4 text-xs text-center text-slate-400">Belum ada notifikasi.</p>
                    ) : (
                      notifikasiList.map((notif) => (
                        <div key={notif.id} className="p-3 hover:bg-slate-50 transition-colors">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-semibold text-slate-900">{notif.judul}</p>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.waktu}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.pesan}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Logout Button */}
            {currentUser && (
              <button
                id="logout-btn"
                onClick={onLogout}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 px-2.5 sm:px-3 h-9 rounded-xl border border-transparent hover:border-rose-100 transition-colors"
                title="Keluar dari Akun"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            )}

          </div>

        </div>

        {/* Mobile Role Switcher (Visible only on small screens for easy presentation switching) */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={() => onRoleChange('siswa')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
              currentRole === 'siswa' ? 'bg-emerald-700 text-white' : 'text-slate-600'
            }`}
          >
            Siswa
          </button>
          <button
            onClick={() => onRoleChange('mentor')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
              currentRole === 'mentor' ? 'bg-emerald-700 text-white' : 'text-slate-600'
            }`}
          >
            Mentor Riset
          </button>
          <button
            onClick={() => onRoleChange('admin')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
              currentRole === 'admin' ? 'bg-emerald-700 text-white' : 'text-slate-600'
            }`}
          >
            Koordinator
          </button>
        </div>

      </div>
    </header>
  );
};

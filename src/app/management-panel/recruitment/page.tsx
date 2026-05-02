'use client';

import React, { useState } from 'react';
import { useAuth } from '@armoyu/ui';
import { 
  Plus, 
  Search, 
  Filter, 
  Briefcase, 
  UserCheck, 
  UserX,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  MoreVertical,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  X,
  Save,
  AlertCircle,
  Settings
} from 'lucide-react';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  status: 'active' | 'closed';
  applicationsCount: number;
  date: string;
}

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  username: string;
  displayName: string;
  avatar: string;
  status: 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected';
  experience: string;
  appliedDate: string;
}

const MOCK_JOBS: JobPosting[] = [
  { id: 'JOB-01', title: 'Oyun Moderatörü', department: 'Disiplin', status: 'active', applicationsCount: 12, date: '01.04.2024' },
  { id: 'JOB-02', title: 'Grafik Tasarımcı', department: 'Medya', status: 'active', applicationsCount: 5, date: '03.04.2024' },
  { id: 'JOB-03', title: 'Discord Yetkilisi', department: 'Topluluk', status: 'closed', applicationsCount: 48, date: '15.03.2024' },
];

const MOCK_APPLICATIONS: Application[] = [
  { id: 'APP-01', jobId: 'JOB-01', jobTitle: 'Oyun Moderatörü', username: 'berkay34', displayName: 'Berkay', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay', status: 'reviewing', experience: '3 yıl farklı sunucularda moderatörlük yaptım. Kurallara hakimim.', appliedDate: '2 saat önce' },
  { id: 'APP-02', jobId: 'JOB-01', jobTitle: 'Oyun Moderatörü', username: 'alperen_x', displayName: 'Alperen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alperen', status: 'pending', experience: 'Aktif bir oyuncuyum, topluluğa katkı sağlamak istiyorum.', appliedDate: '5 saat önce' },
  { id: 'APP-03', jobId: 'JOB-02', jobTitle: 'Grafik Tasarımcı', username: 'art_master', displayName: 'Emir', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emir', status: 'interview', experience: 'Photoshop ve Illustrator uzmanıyım. Portfolyom ektedir.', appliedDate: '1 gün önce' },
];

export default function RecruitmentManagementPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  // Access check
  const isAuthorized = user && ['admin', 'responsible'].includes(user.role?.id || '');

  if (!isAuthorized) {
    return (
      <div className="p-8 text-center glass-panel rounded-[40px] border border-armoyu-card-border">
         <h1 className="text-2xl font-black text-armoyu-text uppercase italic">Erişim Yetkiniz Yok</h1>
         <p className="text-armoyu-text-muted mt-2">Bu sayfayı görüntülemek için Ekip Yönetimi veya Kurucu rolüne sahip olmalısınız.</p>
      </div>
    );
  }

  const updateApplicationStatus = (id: string, status: Application['status']) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left leading-none relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none">EKİP <span className="text-emerald-500">ALIMI</span></h2>
          <p className="text-armoyu-text-muted font-medium mt-1">İş ilanlarını yönetin ve ekip başvurularını değerlendirin.</p>
        </div>
        
        <button 
          onClick={() => setIsJobModalOpen(true)}
          className="px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center gap-2 italic"
        >
           <Plus size={18} /> YENİ İLAN OLUŞTUR
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-black/5 dark:bg-white/5 rounded-2xl w-fit">
         {[
           { id: 'jobs', label: 'AKTİF İLANLAR' },
           { id: 'applications', label: 'BAŞVURULAR', count: applications.filter(a => a.status === 'pending' || a.status === 'reviewing').length }
         ].map((tab) => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
               activeTab === tab.id 
                 ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
                 : 'text-armoyu-text-muted hover:text-armoyu-text'
             }`}
           >
             {tab.label}
             {tab.count !== undefined && tab.count > 0 && (
               <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === tab.id ? 'bg-white text-emerald-600' : 'bg-emerald-500 text-white animate-pulse font-black'}`}>
                  {tab.count}
               </span>
             )}
           </button>
         ))}
      </div>

      {activeTab === 'jobs' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {jobs.map(job => (
             <div key={job.id} className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg group relative overflow-hidden transition-all hover:border-emerald-500/30">
                <div className="flex items-start justify-between mb-6">
                   <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-2xl">
                      <Briefcase size={24} />
                   </div>
                   <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest italic ${job.status === 'active' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                      {job.status === 'active' ? 'YAYINDA' : 'KAPALI'}
                   </span>
                </div>
                <h3 className="text-xl font-black text-armoyu-text uppercase italic leading-tight mb-2">{job.title}</h3>
                <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-6 italic">{job.department} Departmanı</p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                   <div className="flex flex-col">
                      <span className="text-xl font-black text-emerald-500 leading-none">{job.applicationsCount}</span>
                      <span className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-tighter mt-1 italic">Başvuru Alındı</span>
                   </div>
                   <button className="p-3 bg-black/5 dark:bg-white/5 rounded-xl text-armoyu-text-muted hover:text-armoyu-text transition-all">
                      <Settings size={18} />
                   </button>
                </div>
             </div>
           ))}
        </div>
      ) : (
        <div className="glass-panel rounded-[40px] border border-armoyu-card-border overflow-hidden bg-armoyu-card-bg leading-none font-bold">
           <div className="overflow-x-auto">
             <table className="w-full text-left order-collapse">
               <thead>
                 <tr className="border-b border-armoyu-card-border bg-black/5 dark:bg-white/5">
                   <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest font-bold">ADAY BİLGİSİ</th>
                   <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-center font-bold">POZİSYON</th>
                   <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-center font-bold">DURUM</th>
                   <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-right font-bold">İŞLEMLER</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-armoyu-card-border">
                 {applications.map((app) => (
                   <tr key={app.id} className="hover:bg-emerald-600/[0.02] transition-colors group">
                     <td className="px-8 py-6">
                       <div className="flex items-center gap-4 text-left">
                          <img src={app.avatar} className="w-12 h-12 rounded-2xl border border-white/5 object-cover" />
                          <div>
                             <div className="text-sm font-black text-armoyu-text leading-tight uppercase italic">{app.displayName}</div>
                             <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest leading-none mt-1">@{app.username} • {app.appliedDate}</div>
                          </div>
                       </div>
                     </td>
                     <td className="px-8 py-6 text-center">
                        <span className="text-[10px] font-black text-armoyu-text uppercase tracking-widest italic font-bold">{app.jobTitle}</span>
                     </td>
                     <td className="px-8 py-6 text-center">
                        <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest italic font-bold border ${
                          app.status === 'accepted' ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' :
                          app.status === 'rejected' ? 'text-red-500 bg-red-500/10 border-red-500/20' :
                          app.status === 'interview' ? 'text-blue-500 bg-blue-500/10 border-blue-500/20' : 'text-amber-500 bg-amber-500/10 border-amber-500/20'
                        }`}>
                           {app.status === 'pending' ? 'Bekliyor' : 
                            app.status === 'reviewing' ? 'İnceleniyor' : 
                            app.status === 'interview' ? 'Mülakat' : 
                            app.status === 'accepted' ? 'Onaylandı' : 'Reddedildi'}
                        </span>
                     </td>
                     <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-3 leading-none">
                           <button onClick={() => updateApplicationStatus(app.id, 'interview')} className="p-3 bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white rounded-2xl transition-all font-bold">
                              <TrendingUp size={18} />
                           </button>
                           <button onClick={() => updateApplicationStatus(app.id, 'accepted')} className="p-3 bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-2xl transition-all font-bold">
                              <UserCheck size={18} />
                           </button>
                           <button onClick={() => updateApplicationStatus(app.id, 'rejected')} className="p-3 bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl transition-all font-bold">
                              <UserX size={18} />
                           </button>
                        </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}

      {/* Security Info Footer */}
      <div className="p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500">
                <FileText size={32} />
             </div>
             <div>
                <h4 className="text-lg font-black text-armoyu-text uppercase italic leading-tight mb-1">EKİP BAŞVURU <span className="text-emerald-500">KILAVUZU</span></h4>
                <p className="text-xs font-medium text-armoyu-text-muted max-w-lg italic font-bold">Tüm başvurular KVKK kapsamında saklanır. Onaylanan her aday sistem tarafından otomatik olarak ilk etapta 'Nitelikli Oyuncu' rütbesine atanır.</p>
             </div>
          </div>
          <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-500/20 transition-all font-bold italic">
             ALIM SÜRECİ LOGLARI
          </button>
      </div>

      {/* New Job Modal (Simplified Placeholder) */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsJobModalOpen(false)} />
           <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] w-full max-w-lg relative z-10 p-10 animate-in zoom-in-95 leading-none">
              <h3 className="text-2xl font-black text-armoyu-text uppercase underline decoration-emerald-500 font-bold mb-6 italic">YENİ İLAN OLUŞTUR</h3>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest italic font-bold ml-1">POZİSYON ADI</label>
                    <input className="w-full bg-black/5 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:border-emerald-500 transition-all italic" placeholder="Örn: Oyun Moderatörü" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest italic font-bold ml-1">DEPARTMAN</label>
                    <select className="w-full bg-black/5 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:border-emerald-500 transition-all italic">
                       <option>Yönetim</option>
                       <option>Disiplin</option>
                       <option>Medya</option>
                       <option>Yazılım</option>
                    </select>
                 </div>
                 <button className="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-500 transition-all italic font-bold">
                    İLAN YAYINLA
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

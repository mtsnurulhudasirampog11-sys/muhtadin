import React from 'react';
import { Award, Users, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';

export const StatsCounter: React.FC = () => {
  const stats = [
    {
      label: 'Siswa & Santri Aktif',
      value: '450+',
      description: 'Dari Sirampog, Bumiayu & sekitarnya',
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      label: 'Guru & Tenaga Pendidik',
      value: '32+',
      description: 'Lulusan S1 & S2 PTN/PTKIN & Sanad Tahfidz',
      icon: GraduationCap,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      label: 'Akreditasi Madrasah',
      value: 'Grade A',
      description: 'Nilai Unggul dari BAN-S/M',
      icon: Award,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      label: 'Ekstrakurikuler & Kejuruan',
      value: '18+',
      description: 'Robotika, Hadrah, Pramuka, Futsal, Kaligrafi',
      icon: BookOpen,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <div className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-7">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
              <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color} shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight block">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-700 block">
                  {stat.label}
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:block mt-0.5">
                  {stat.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

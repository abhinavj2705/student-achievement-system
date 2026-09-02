'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { FileText, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function CertificatesPage() {
  const [certificates] = useState([
    {
      id: '1',
      title: 'React Native Developer Certification',
      issuingOrganization: 'Meta',
      issueDate: '2024-05-01',
      status: 'VERIFIED',
      achievementTitle: 'React Native Developer Certification',
    },
    {
      id: '2',
      title: 'First Place Hackathon Certificate',
      issuingOrganization: 'National Tech Association',
      issueDate: '2023-11-15',
      status: 'PENDING',
      achievementTitle: 'First Place in National Hackathon',
    }
  ]);

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-card-foreground">Certificates</h1>
          <p className="text-card-foreground/70 text-sm mt-1">
            Manage your uploaded certificates and their verification status.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map(cert => (
          <div key={cert.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            {/* Visual Header */}
            <div className="bg-slate-50 h-32 flex flex-col items-center justify-center border-b border-border/50 p-4 text-center relative">
              <FileText className="w-10 h-10 text-primary/40 mb-2" />
              <p className="text-xs font-bold text-card-foreground/60 uppercase tracking-wider">{cert.issuingOrganization}</p>
              
              {/* Status Pill */}
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-sm
                ${cert.status === 'VERIFIED' ? 'bg-success/10 text-success' : ''}
                ${cert.status === 'PENDING' ? 'bg-warning/10 text-warning' : ''}
                ${cert.status === 'REJECTED' ? 'bg-danger/10 text-danger' : ''}
              `}>
                {cert.status === 'VERIFIED' && <CheckCircle className="w-3 h-3" />}
                {cert.status === 'PENDING' && <Clock className="w-3 h-3" />}
                {cert.status === 'REJECTED' && <AlertCircle className="w-3 h-3" />}
                {cert.status}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-card-foreground mb-1 line-clamp-1" title={cert.title}>{cert.title}</h3>
              <p className="text-xs text-card-foreground/60 mb-4">Issued: {new Date(cert.issueDate).toLocaleDateString()}</p>
              
              <div className="bg-background rounded-md p-3 mb-4">
                <p className="text-[11px] font-semibold text-card-foreground/50 uppercase mb-1">Related Achievement</p>
                <p className="text-sm text-card-foreground line-clamp-1">{cert.achievementTitle}</p>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium py-2 rounded-lg transition-colors">
                  View File
                </button>
                <button className="w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center hover:bg-card-foreground/5 transition-colors text-card-foreground/70">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

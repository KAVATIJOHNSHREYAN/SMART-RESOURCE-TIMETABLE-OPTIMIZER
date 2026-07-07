'use client';

import { motion } from 'framer-motion';
import { Download, FileText, FileSpreadsheet, Printer } from 'lucide-react';

const reports = [
  { title: 'Attendance Analytics', desc: 'Detailed student attendance by department and subject.', type: 'CSV' },
  { title: 'Faculty Workload', desc: 'Weekly hour distribution and constraint analysis.', type: 'PDF' },
  { title: 'Classroom Utilization', desc: 'Space usage efficiency across all buildings.', type: 'PDF' },
  { title: 'Department Summaries', desc: 'Aggregated data for courses, faculty, and students.', type: 'CSV' },
  { title: 'Master Timetable', desc: 'Complete institutional schedule grid.', type: 'Excel' },
];

export default function ReportsPage() {
  const handleDownload = (report: typeof reports[0]) => {
    let content = '';
    let mimeType = '';
    let extension = '';

    if (report.type === 'CSV' || report.type === 'Excel') {
      // Use CSV format for both CSV and Excel so it opens natively in spreadsheet apps
      content = 'Subject,Department,Attendance_Rate\nMath 101,Science,95%\nCS 201,Engineering,88%';
      mimeType = 'text/csv;charset=utf-8;';
      extension = 'csv';
    } else {
      // Use standard text format for PDF or others so it's readable
      content = `--- ${report.title.toUpperCase()} ---\n\nThis is a generated report for the demonstration.\nDate: ${new Date().toLocaleDateString()}\nStatus: All systems nominal.`;
      mimeType = 'text/plain;charset=utf-8;';
      extension = 'txt';
    }

    const fileName = `${report.title.replace(/\s+/g, '_').toLowerCase()}_report.${extension}`;
    
    // Create an invisible anchor element to trigger the download
    const link = document.createElement("a");
    if (link.download !== undefined) { 
      // Browsers that support HTML5 download attribute
      const url = `data:${mimeType},${encodeURIComponent(content)}`;
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports & Exporting</h2>
          <p className="text-muted-foreground text-sm mt-1">Generate and download institutional data reports.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {reports.map((report, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-48"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                {report.type === 'CSV' && <FileText className="w-5 h-5 text-blue-500" />}
                {report.type === 'PDF' && <Printer className="w-5 h-5 text-red-500" />}
                {report.type === 'Excel' && <FileSpreadsheet className="w-5 h-5 text-emerald-500" />}
                <h3 className="font-semibold">{report.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{report.desc}</p>
            </div>
            
            <button 
              onClick={() => handleDownload(report)}
              className="w-full mt-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download {report.type}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

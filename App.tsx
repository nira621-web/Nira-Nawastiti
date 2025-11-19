
import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { StudentPage } from './components/StudentPage';
import { SubjectPage } from './components/SubjectPage';
import { AttendancePage } from './components/AttendancePage';
import type { Student, Subject, Attendance, Page } from './types';
import { Header } from './components/Header';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Data Siswa');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [students, setStudents] = useState<Student[]>([
    { id: 'S001', name: 'Ahmad Dahlan', class: '10A' },
    { id: 'S002', name: 'Budi Santoso', class: '10B' },
    { id: 'S003', name: 'Citra Lestari', class: '11A' },
  ]);

  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 'M01', name: 'Matematika', teacher: 'Dra. Endang S.' },
    { id: 'M02', name: 'Bahasa Indonesia', teacher: 'Drs. Hartono' },
    { id: 'M03', name: 'Fisika', teacher: 'Dr. Wati' },
  ]);

  const [attendance, setAttendance] = useState<Attendance[]>([
    { id: 1, studentId: 'S001', subjectId: 'M01', date: '2024-07-28', status: 'Hadir' },
    { id: 2, studentId: 'S002', subjectId: 'M01', date: '2024-07-28', status: 'Izin' },
    { id: 3, studentId: 'S003', subjectId: 'M02', date: '2024-07-28', status: 'Sakit' },
  ]);
  
  const addStudent = useCallback((student: Omit<Student, 'id'>) => {
    setStudents(prev => [...prev, { ...student, id: `S${String(prev.length + 1).padStart(3, '0')}` }]);
  }, []);

  const addSubject = useCallback((subject: Omit<Subject, 'id'>) => {
    setSubjects(prev => [...prev, { ...subject, id: `M${String(prev.length + 1).padStart(2, '0')}` }]);
  }, []);
  
  const addAttendance = useCallback((att: Omit<Attendance, 'id'>) => {
    setAttendance(prev => [...prev, { ...att, id: prev.length + 1 }]);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'Data Siswa':
        return <StudentPage students={students} addStudent={addStudent} />;
      case 'Mata Pelajaran':
        return <SubjectPage subjects={subjects} addSubject={addSubject} />;
      case 'Absensi':
        return <AttendancePage attendance={attendance} students={students} subjects={subjects} addAttendance={addAttendance} />;
      default:
        return <StudentPage students={students} addStudent={addStudent} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} currentPage={currentPage} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-4 md:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;


import React, { useState, useMemo } from 'react';
import type { Attendance, Student, Subject, AttendanceStatus } from '../types';
import { Modal } from './Modal';
import { PlusIcon } from './icons/PlusIcon';

interface AttendancePageProps {
  attendance: Attendance[];
  students: Student[];
  subjects: Subject[];
  addAttendance: (attendance: Omit<Attendance, 'id'>) => void;
}

const statusColors: Record<AttendanceStatus, string> = {
  Hadir: 'bg-green-100 text-green-800',
  Sakit: 'bg-yellow-100 text-yellow-800',
  Izin: 'bg-blue-100 text-blue-800',
  Alpha: 'bg-red-100 text-red-800',
};

const getDefaultDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const AttendancePage: React.FC<AttendancePageProps> = ({ attendance, students, subjects, addAttendance }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAttendance, setNewAttendance] = useState({ 
    studentId: students[0]?.id || '', 
    subjectId: subjects[0]?.id || '', 
    date: getDefaultDate(), 
    status: 'Hadir' as AttendanceStatus 
  });

  const studentMap = useMemo(() => new Map(students.map(s => [s.id, s.name])), [students]);
  const subjectMap = useMemo(() => new Map(subjects.map(s => [s.id, s.name])), [subjects]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAttendance(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAttendance.studentId && newAttendance.subjectId && newAttendance.date && newAttendance.status) {
      addAttendance(newAttendance);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-700">Daftar Absensi</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Tambah Data
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Tanggal</th>
                <th scope="col" className="px-6 py-3">Nama Siswa</th>
                <th scope="col" className="px-6 py-3">Mata Pelajaran</th>
                <th scope="col" className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((att, index) => (
                <tr key={att.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-6 py-4">{att.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{studentMap.get(att.studentId) || 'N/A'}</td>
                  <td className="px-6 py-4">{subjectMap.get(att.subjectId) || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[att.status]}`}>
                      {att.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Tambah Data Absensi">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Siswa</label>
            <select name="studentId" id="studentId" value={newAttendance.studentId} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
              {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="subjectId" className="block text-sm font-medium text-gray-700">Mata Pelajaran</label>
            <select name="subjectId" id="subjectId" value={newAttendance.subjectId} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Tanggal</label>
            <input type="date" name="date" id="date" value={newAttendance.date} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select name="status" id="status" value={newAttendance.status} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
              {(Object.keys(statusColors) as AttendanceStatus[]).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex justify-end pt-4 space-x-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Batal</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Simpan</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

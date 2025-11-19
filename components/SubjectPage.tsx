
import React, { useState } from 'react';
import type { Subject } from '../types';
import { Modal } from './Modal';
import { PlusIcon } from './icons/PlusIcon';

interface SubjectPageProps {
  subjects: Subject[];
  addSubject: (subject: Omit<Subject, 'id'>) => void;
}

export const SubjectPage: React.FC<SubjectPageProps> = ({ subjects, addSubject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', teacher: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSubject(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubject.name && newSubject.teacher) {
      addSubject(newSubject);
      setNewSubject({ name: '', teacher: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-700">Daftar Mata Pelajaran</h2>
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
                <th scope="col" className="px-6 py-3">ID Mapel</th>
                <th scope="col" className="px-6 py-3">Nama Mata Pelajaran</th>
                <th scope="col" className="px-6 py-3">Guru Pengampu</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={subject.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-6 py-4 font-medium text-gray-900">{subject.id}</td>
                  <td className="px-6 py-4">{subject.name}</td>
                  <td className="px-6 py-4">{subject.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Tambah Data Mata Pelajaran">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Mata Pelajaran</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newSubject.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">Guru Pengampu</label>
            <input
              type="text"
              id="teacher"
              name="teacher"
              value={newSubject.teacher}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
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

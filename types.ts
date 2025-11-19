
export type Page = 'Data Siswa' | 'Mata Pelajaran' | 'Absensi';

export interface Student {
  id: string;
  name: string;
  class: string;
}

export interface Subject {
  id: string;
  name: string;
  teacher: string;
}

export type AttendanceStatus = 'Hadir' | 'Sakit' | 'Izin' | 'Alpha';

export interface Attendance {
  id: number;
  studentId: string;
  subjectId: string;
  date: string;
  status: AttendanceStatus;
}

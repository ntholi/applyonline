'use client';

import { useState } from 'react';
import StudentApplicationForm from './student-form';
import SubjectsForm from './subjects-form';
import { Progress } from '@/components/ui/progress';
import { students } from '@/db/schema';

type Student = typeof students.$inferSelect;

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [studentData, setStudentData] = useState<Student>();

  function handleStudentFormSubmit(data: Student) {
    setStudentData(data);
    setStep(2);
  }

  function handleSubjectsFormSubmit(data: any) {
    // Here we'll combine the data and submit to the server
    const applicationData = {
      ...studentData,
      qualificationDetails: data,
    };
    console.log('Final application data:', applicationData);
    // TODO: Submit to server
  }

  function handlePrevious() {
    setStep(1);
  }

  const progress = (step / 2) * 100;

  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <div className='flex justify-between text-sm'>
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className='h-2' />
      </div>

      {step === 1 ? (
        <StudentApplicationForm onSubmit={handleStudentFormSubmit} />
      ) : (
        <SubjectsForm
          onPrevious={handlePrevious}
          onSubmit={handleSubjectsFormSubmit}
        />
      )}
    </div>
  );
}

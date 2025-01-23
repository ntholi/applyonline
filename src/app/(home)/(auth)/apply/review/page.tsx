import { getApplicationByStudentId } from '@/server/applications/actions';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormNavigation } from '../core/FormNavigation';
import { getFacultyByCode } from '@/app/admin/programs/data/faculties';
import { students, applications } from '@/db/schema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  Check,
  GraduationCap,
  User,
  Users,
  Phone,
  School,
  FileText,
} from 'lucide-react';

type Student = typeof students.$inferSelect;
type Application = typeof applications.$inferSelect;

export default async function ReviewPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const application = await getApplicationByStudentId(session.user.studentId);
  if (!application) return null;

  return (
    <div className='mx-auto max-w-4xl space-y-6'>
      <Card className='bg-white shadow-lg'>
        <CardHeader className='border-b text-center'>
          <CardTitle className='text-2xl font-bold'>
            Application Review
          </CardTitle>
          <p className='text-muted-foreground'>
            Please review your application details before submission
          </p>
        </CardHeader>
        <CardContent className='p-6'>
          <Accordion type='single' collapsible className='w-full space-y-4'>
            {/* Personal Information */}
            <AccordionItem value='personal' className='rounded-lg border px-4'>
              <AccordionTrigger className='hover:no-underline'>
                <div className='flex items-center gap-2'>
                  <User className='h-5 w-5 text-primary' />
                  <span className='font-semibold'>Personal Information</span>
                  <Badge variant='secondary' className='ml-2'>
                    Complete
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className='pb-2 pt-4'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <p className='text-sm text-muted-foreground'>Full Name</p>
                    <p className='font-medium'>{application.student.name}</p>
                  </div>
                  <div className='space-y-2'>
                    <p className='text-sm text-muted-foreground'>
                      Email Address
                    </p>
                    <p className='font-medium'>{application.student.email}</p>
                  </div>
                  <div className='space-y-2'>
                    <p className='text-sm text-muted-foreground'>
                      Phone Number
                    </p>
                    <p className='font-medium'>{application.student.phone1}</p>
                  </div>
                  <div className='space-y-2'>
                    <p className='text-sm text-muted-foreground'>
                      Date of Birth
                    </p>
                    <p className='font-medium'>
                      {new Date(
                        application.student.dateOfBirth,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <p className='text-sm text-muted-foreground'>Gender</p>
                    <p className='font-medium'>{application.student.gender}</p>
                  </div>
                  <div className='space-y-2'>
                    <p className='text-sm text-muted-foreground'>National ID</p>
                    <p className='font-medium'>
                      {application.student.nationalId}
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <p className='text-sm text-muted-foreground'>Religion</p>
                    <p className='font-medium'>
                      {application.student.religion}
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <p className='text-sm text-muted-foreground'>
                      Marital Status
                    </p>
                    <p className='font-medium'>
                      {application.student.maritalStatus}
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Program Choices */}
            <AccordionItem value='programs' className='rounded-lg border px-4'>
              <AccordionTrigger className='hover:no-underline'>
                <div className='flex items-center gap-2'>
                  <GraduationCap className='h-5 w-5 text-primary' />
                  <span className='font-semibold'>Program Choices</span>
                  <Badge variant='secondary' className='ml-2'>
                    Complete
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className='pb-2 pt-4'>
                <div className='space-y-6'>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-2'>
                      <Badge className='bg-primary/10 text-primary hover:bg-primary/20'>
                        First Choice
                      </Badge>
                    </div>
                    <div className='border-l-2 border-primary/20 pl-4'>
                      <h4 className='font-medium'>
                        {application.firstChoice.name}
                      </h4>
                      <p className='text-sm text-muted-foreground'>
                        {
                          getFacultyByCode(application.firstChoice.faculty)
                            ?.name
                        }
                      </p>
                    </div>
                  </div>
                  {application.secondChoice && (
                    <div className='space-y-4'>
                      <div className='flex items-center gap-2'>
                        <Badge variant='outline'>Second Choice</Badge>
                      </div>
                      <div className='border-l-2 border-muted pl-4'>
                        <h4 className='font-medium'>
                          {application.secondChoice.name}
                        </h4>
                        <p className='text-sm text-muted-foreground'>
                          {
                            getFacultyByCode(application.secondChoice.faculty)
                              ?.name
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Next of Kin */}
            <AccordionItem value='nextOfKin' className='rounded-lg border px-4'>
              <AccordionTrigger className='hover:no-underline'>
                <div className='flex items-center gap-2'>
                  <Users className='h-5 w-5 text-primary' />
                  <span className='font-semibold'>Next of Kin</span>
                  <Badge variant='secondary' className='ml-2'>
                    Complete
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className='pb-2 pt-4'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <p className='text-sm text-muted-foreground'>Full Name</p>
                    <p className='font-medium'>
                      {application.student.nextOfKinNames}
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <p className='text-sm text-muted-foreground'>
                      Phone Number
                    </p>
                    <p className='font-medium'>
                      {application.student.nextOfKinPhone}
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <p className='text-sm text-muted-foreground'>
                      Relationship
                    </p>
                    <p className='font-medium'>
                      {application.student.nextOfKinRelationship}
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Education Background */}
            <AccordionItem value='education' className='rounded-lg border px-4'>
              <AccordionTrigger className='hover:no-underline'>
                <div className='flex items-center gap-2'>
                  <School className='h-5 w-5 text-primary' />
                  <span className='font-semibold'>Education Background</span>
                  <Badge variant='secondary' className='ml-2'>
                    Complete
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className='pb-2 pt-4'>
                <div className='grid gap-4'>
                  <div className='space-y-2'>
                    <p className='text-sm text-muted-foreground'>High School</p>
                    <p className='font-medium'>
                      {application.student.highSchool}
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <p className='text-sm text-muted-foreground'>Birth Place</p>
                    <p className='font-medium'>
                      {application.student.birthPlace}
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <p className='text-sm text-muted-foreground'>Home Town</p>
                    <p className='font-medium'>
                      {application.student.homeTown}
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <div className='flex items-center justify-between rounded-lg bg-white p-4 shadow-lg'>
        <div className='flex items-center gap-2'>
          <Check className='h-5 w-5 text-green-500' />
          <span className='text-sm font-medium'>All sections completed</span>
        </div>
        <FormNavigation
          backUrl='/apply/documents'
          saveLabel='Submit Application'
        />
      </div>
    </div>
  );
}

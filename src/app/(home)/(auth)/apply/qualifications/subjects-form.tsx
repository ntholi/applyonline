'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const subjectSchema = z.object({
  subjectId: z.number(),
  gradeId: z.number(),
});

const formSchema = z.object({
  qualificationId: z.number({
    required_error: 'Please select your qualification',
  }),
  subjects: z.array(subjectSchema).min(1, 'Please add at least one subject'),
});

type FormValues = z.infer<typeof formSchema>;

export default function SubjectsForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjects: [{ subjectId: 0, gradeId: 0 }],
    },
  });

  async function handleSubmit(values: FormValues) {
    try {
      const response = await fetch('/api/apply/qualifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to save qualification details');
      }

      toast({
        title: 'Success',
        description: 'Your qualification details have been saved',
      });

      // Navigate to the next step
      router.push('/apply/program');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save your qualifications. Please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Card>
      <CardContent className='pt-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='qualificationId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualification Type</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select your qualification' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* We'll fetch these from the database */}
                      <SelectItem value='1'>IGCSE</SelectItem>
                      <SelectItem value='2'>BGCSE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subject fields will be dynamically added here */}
            <div className='flex justify-between'>
              <Button
                type='button'
                variant='outline'
                onClick={() => router.back()}
              >
                Previous
              </Button>
              <Button type='submit'>Save & Continue</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

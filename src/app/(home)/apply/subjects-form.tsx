'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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

interface SubjectsFormProps {
  onPrevious: () => void;
  onSubmit: (values: FormValues) => void;
}

export default function SubjectsForm({ onPrevious, onSubmit }: SubjectsFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjects: [{ subjectId: 0, gradeId: 0 }],
    },
  });

  function handleSubmit(values: FormValues) {
    onSubmit(values);
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="qualificationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualification Type</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your qualification" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* We'll fetch these from the database */}
                      <SelectItem value="1">IGCSE</SelectItem>
                      <SelectItem value="2">BGCSE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subject fields will be dynamically added here */}
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onPrevious}>
                Previous
              </Button>
              <Button type="submit">Submit Application</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

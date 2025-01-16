"use server";

import { db } from "@/db";
import { students } from "@/db/schema";
import { revalidatePath } from "next/cache";

export type StudentFormData = {
  nationalId: string;
  name: string;
  email: string;
  phone1: string;
  phone2?: string;
  religion: string;
  dateOfBirth: Date;
  gender: "male" | "female";
  maritalStatus: "single" | "married" | "divorced" | "widowed";
  birthPlace: string;
  homeTown: string;
  highSchool: string;
  nextOfKinNames: string;
  nextOfKinPhone: string;
  nextOfKinRelationship: string;
};

export async function createStudent(data: StudentFormData) {
  try {
    const result = await db.query.students.findFirst({
      where: (students, { eq }) => eq(students.email, data.email),
    });

    if (result) {
      return {
        error: "A student with this email already exists",
      };
    }

    await db
      .insert(students)
      .values({
        ...data,
        dateOfBirth: data.dateOfBirth.getTime(),
        programId: "", // This will be updated in the next step
      });

    revalidatePath("/apply");
    return { success: true };
  } catch (error) {
    console.error("Error creating student:", error);
    return {
      error: "An error occurred while creating your application. Please try again.",
    };
  }
}

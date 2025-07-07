"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export type Course = {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  price: string;
  thumbnail: string;
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col">
      <div className="relative w-full h-40 mb-4">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
      <p className="text-sm text-gray-500 mb-2">{course.instructor}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-yellow-500">{course.rating} ★</span>
        <span className="font-bold">{course.price}</span>
      </div>
      <Button className="mt-4">Enroll</Button>
    </div>
  );
}

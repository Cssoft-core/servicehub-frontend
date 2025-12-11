"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Step1() {
  const router = useRouter();
  const params = useSearchParams();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const saved = Object.fromEntries(params.entries());
    setForm((prev) => ({ ...prev, ...saved }));
  }, []);

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const e: any = {};

    if (!form.firstName) e.firstName = "First name is required";
    if (!form.lastName) e.lastName = "Last name is required";
    if (!form.email) e.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";
    if (!form.phone) e.phone = "Phone is required";
    if (!/^[0-9]{10}$/.test(form.phone)) e.phone = "Enter valid number";
    if (!form.password) e.password = "Password required";
    if (form.password.length < 6) e.password = "Min 6 characters";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;

    router.push(`/provider/register/step-2?${new URLSearchParams(form)}`);
  };

  return (
    <div className="max-w-3xl mx-auto py-12">

      {/* Stepper */}
      <div className="flex justify-between mb-10">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white font-bold">1</div>
          <p className="mt-2 text-sm font-medium">Provider Details</p>
        </div>
        <div className="w-1/3 border-t border-gray-300 mt-5"></div>
        <div className="flex flex-col items-center opacity-40">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border">2</div>
          <p className="mt-2 text-sm font-medium">Business Details</p>
        </div>
        <div className="w-1/3 border-t border-gray-300 mt-5"></div>
        <div className="flex flex-col items-center opacity-40">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border">3</div>
          <p className="mt-2 text-sm font-medium">Documents</p>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white shadow-lg rounded-xl p-10 border">

        <h2 className="text-2xl font-semibold mb-8">Provider Registration</h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-6">

          {/* First Name */}
          <div>
            <label className="font-medium text-sm">First Name *</label>
            <input
              className="border rounded-lg w-full p-3 mt-1 focus:ring-2 focus:ring-black"
              value={form.firstName}
              onChange={(e) => set("firstName", e.target.value)}
            />
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          </div>

          {/* Last Name */}
          <div>
            <label className="font-medium text-sm">Last Name *</label>
            <input
              className="border rounded-lg w-full p-3 mt-1 focus:ring-2 focus:ring-black"
              value={form.lastName}
              onChange={(e) => set("lastName", e.target.value)}
            />
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          </div>
        </div>

        {/* Email */}
        <label className="font-medium text-sm block mt-4">Email *</label>
        <input
          className="border rounded-lg w-full p-3 mt-1 focus:ring-2 focus:ring-black"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
        />
        <p className="text-red-500 text-sm">{errors.email}</p>

        {/* Phone */}
        <label className="font-medium text-sm block mt-4">Phone *</label>
        <input
          className="border rounded-lg w-full p-3 mt-1 focus:ring-2 focus:ring-black"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
        />
        <p className="text-red-500 text-sm">{errors.phone}</p>

        {/* Password / Confirm */}
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div>
            <label className="font-medium text-sm">Password *</label>
            <input
              type="password"
              className="border rounded-lg w-full p-3 mt-1 focus:ring-2 focus:ring-black"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
            />
            <p className="text-red-500 text-sm">{errors.password}</p>
          </div>

          <div>
            <label className="font-medium text-sm">Confirm Password *</label>
            <input
              type="password"
              className="border rounded-lg w-full p-3 mt-1 focus:ring-2 focus:ring-black"
              value={form.confirmPassword}
              onChange={(e) => set("confirmPassword", e.target.value)}
            />
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="text-right mt-8">
          <Button className="px-6 py-2 text-base" onClick={next}>
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
}

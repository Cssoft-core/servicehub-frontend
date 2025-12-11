"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const serviceList = [
  "Cleaning",
  "Plumbing",
  "Electrical",
  "Salon & Spa",
  "Carpentry",
  "Painting",
  "Appliances",
];

export default function Step2() {
  const router = useRouter();
  const params = useSearchParams();

  // Load ALL values from Step 1
  const allValues = Object.fromEntries(params.entries());

  // Restore Step 2 fields if user returns back
  const [form, setForm] = useState({
    businessName: params.get("businessName") || "",
    address: params.get("address") || "",
    experience: params.get("experience") || "",
    services: params.get("services")
      ? params.get("services")!.split(",")
      : ([] as string[]),
  });

  const updateService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const next = () => {
    router.push(
      `/provider/register/step-3?${new URLSearchParams({
        ...allValues,
        ...form,
        services: form.services.join(","),
      })}`
    );
  };

  const back = () => {
    router.push(
      `/provider/register/step-1?${new URLSearchParams({
        ...allValues,
        ...form,
        services: form.services.join(","),
      })}`
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-12">

      {/* Stepper */}
      <div className="flex justify-between mb-10">
        {/* Step 1 */}
        <div className="flex flex-col items-center opacity-40">
          <div className="w-10 h-10 rounded-full border flex items-center justify-center font-semibold">
            1
          </div>
          <p className="mt-2 text-sm font-medium">Provider</p>
        </div>

        <div className="w-1/3 border-t border-gray-300 mt-5"></div>

        {/* Step 2 Active */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
            2
          </div>
          <p className="mt-2 text-sm font-medium">Business</p>
        </div>

        <div className="w-1/3 border-t border-gray-300 mt-5"></div>

        {/* Step 3 */}
        <div className="flex flex-col items-center opacity-40">
          <div className="w-10 h-10 rounded-full border flex items-center justify-center font-semibold">
            3
          </div>
          <p className="mt-2 text-sm font-medium">Documents</p>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white shadow-lg rounded-xl p-10 border">

        <h2 className="text-2xl font-semibold mb-8">
          Business Information
        </h2>

        {/* Business Name */}
        <label className="font-medium text-sm">Business Name *</label>
        <input
          className="border rounded-lg w-full p-3 mt-1 focus:ring-2 focus:ring-black"
          value={form.businessName}
          onChange={(e) => setForm({ ...form, businessName: e.target.value })}
        />

        {/* Address */}
        <label className="font-medium text-sm block mt-4">Address *</label>
        <textarea
          className="border rounded-lg w-full p-3 mt-1 focus:ring-2 focus:ring-black"
          placeholder="Full address with pincode"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        {/* Experience */}
        <label className="font-medium text-sm block mt-4">Years of Experience *</label>
        <input
          className="border rounded-lg w-full p-3 mt-1 focus:ring-2 focus:ring-black"
          placeholder="Example: 5 years"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
        />

        {/* Services */}
        <label className="font-medium text-sm block mt-6">Select Services *</label>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
          {serviceList.map((service) => (
            <label
              key={service}
              className={`border rounded-lg px-4 py-3 flex items-center gap-3 cursor-pointer transition ${
                form.services.includes(service)
                  ? "bg-black text-white border-black"
                  : "hover:bg-gray-100"
              }`}
            >
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={form.services.includes(service)}
                onChange={() => updateService(service)}
              />
              {service}
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-10">
          <Button variant="outline" className="px-6 py-2" onClick={back}>
            ← Back
          </Button>

          <Button className="px-6 py-2" onClick={next}>
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
}

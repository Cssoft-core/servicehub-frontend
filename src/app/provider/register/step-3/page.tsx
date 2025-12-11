"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Step3() {
  const params = useSearchParams();
  const router = useRouter();

  // All Step-1 + Step-2 values
  const allData = Object.fromEntries(params.entries());

  const [files, setFiles] = useState({
    idProof: null as File | null,
    addressProof: null as File | null,
    idProofName: params.get("idProofName") || "",
    addressProofName: params.get("addressProofName") || "",
  });

  // Handle file selection
  const handleFile = (
    type: "idProof" | "addressProof",
    fileList: FileList | null
  ) => {
    const file = fileList?.[0] || null;
    setFiles((prev) => ({
      ...prev,
      [type]: file,
      [`${type}Name`]: file ? file.name : "",
    }));
  };

  // SUBMIT → send to backend
  const submit = async () => {
    const payload: any = {
      ...allData,
      idProof: files.idProofName || "",
      addressProof: files.addressProofName || "",
    };

    // REMOVE FIELDS NOT ALLOWED IN DTO
    delete payload.confirmPassword;
    delete payload.idProofName;
    delete payload.addressProofName;

    console.log("FINAL PAYLOAD:", payload);

    const res = await fetch("http://localhost:5000/provider/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.log("ERROR RESPONSE:", errorText);
      alert("Error saving provider");
      return;
    }

    router.push("/dashboard/provider");
  };

  // Navigate back to Step 2
  const back = () => {
    const query = new URLSearchParams({
      ...allData,
      idProofName: files.idProofName,
      addressProofName: files.addressProofName,
    });

    router.push(`/provider/register/step-2?${query.toString()}`);
  };

  return (
    <div className="max-w-3xl mx-auto py-12">

      {/* Stepper */}
      <div className="flex justify-between mb-10">
        <div className="flex flex-col items-center opacity-40">
          <div className="w-10 h-10 rounded-full border flex items-center justify-center">1</div>
          <p className="text-sm">Provider</p>
        </div>

        <div className="w-1/3 border-t mt-5 border-gray-300"></div>

        <div className="flex flex-col items-center opacity-40">
          <div className="w-10 h-10 rounded-full border flex items-center justify-center">2</div>
          <p className="text-sm">Business</p>
        </div>

        <div className="w-1/3 border-t mt-5 border-gray-300"></div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">3</div>
          <p className="text-sm">Documents</p>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white shadow-lg rounded-xl p-10 border">

        <h2 className="text-2xl font-semibold mb-8">Upload Required Documents</h2>

        {/* ID Proof */}
        <label className="font-medium text-sm">ID Proof *</label>
        <div className="border-2 border-dashed rounded-xl p-6 mt-2 text-center cursor-pointer">
          <input
            type="file"
            className="hidden"
            id="idProof"
            onChange={(e) => handleFile("idProof", e.target.files)}
          />
          <label htmlFor="idProof" className="cursor-pointer text-gray-700">
            {files.idProofName ? (
              <span className="font-medium">{files.idProofName}</span>
            ) : (
              <span className="text-gray-500">Click to upload ID Proof</span>
            )}
          </label>
        </div>

        {/* Address Proof */}
        <label className="font-medium text-sm block mt-6">Address Proof *</label>
        <div className="border-2 border-dashed rounded-xl p-6 mt-2 text-center cursor-pointer">
          <input
            type="file"
            className="hidden"
            id="addressProof"
            onChange={(e) => handleFile("addressProof", e.target.files)}
          />
          <label htmlFor="addressProof" className="cursor-pointer text-gray-700">
            {files.addressProofName ? (
              <span className="font-medium">{files.addressProofName}</span>
            ) : (
              <span className="text-gray-500">Click to upload Address Proof</span>
            )}
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-10">
          <Button variant="outline" onClick={back}>← Back</Button>
          <Button onClick={submit}>Submit →</Button>
        </div>

      </div>
    </div>
  );
}

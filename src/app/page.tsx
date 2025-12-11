"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("http://localhost:5000/categories");
        const data = await res.json();

        if (Array.isArray(data)) {
          setCategories(data);
        }
      } catch (error) {
        console.log("Failed to load categories", error);
      }
    }
    loadCategories();
  }, []);

  const visibleCategories = showAll ? categories : categories.slice(0, 7);

  return (
    <main className="w-full">

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <span className="bg-yellow-300 px-3 py-1 text-xs font-semibold rounded">
            #1 Home Services Platform
          </span>

          <h1 className="text-5xl font-extrabold leading-tight mt-4">
            Expert Services <br />
            <span className="text-yellow-500">At Your Doorstep</span>
          </h1>

          <p className="text-gray-600 mt-4">
            From home cleaning to electrical repairs — book trusted professionals in minutes.
            Quality service, guaranteed satisfaction.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-black text-white px-6 py-3 rounded-lg font-medium">
              Book a Service
            </button>
            <button
              className="border border-black px-6 py-3 rounded-lg font-medium"
              onClick={() => window.location.href = "/provider/register/step-1"}
            >
              Become a Provider
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="border-l-8 border-yellow-400 p-6 rounded-lg shadow-md bg-white">
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="h-10 w-10 bg-black text-white rounded flex items-center justify-center font-bold">✓</div>
              <span className="font-medium">Verified Professionals</span>
            </li>

            <li className="flex items-center gap-3">
              <div className="h-10 w-10 bg-black text-white rounded flex items-center justify-center font-bold">✓</div>
              <span className="font-medium">Same Day Service</span>
            </li>

            <li className="flex items-center gap-3">
              <div className="h-10 w-10 bg-black text-white rounded flex items-center justify-center font-bold">★</div>
              <span className="font-medium">4.8+ Average Rating</span>
            </li>

            <li className="flex items-center gap-3">
              <div className="h-10 w-10 bg-black text-white rounded flex items-center justify-center font-bold">✓</div>
              <span className="font-medium">Satisfaction Guaranteed</span>
            </li>
          </ul>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-black text-white py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-3xl font-bold">50K+</h3>
            <p className="text-sm opacity-70">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">2000+</h3>
            <p className="text-sm opacity-70">Service Providers</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">100+</h3>
            <p className="text-sm opacity-70">Services Offered</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">4.8★</h3>
            <p className="text-sm opacity-70">Average Rating</p>
          </div>
        </div>
      </section>

      {/* BROWSE BY CATEGORY - DYNAMIC */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Browse by Category</h2>

          <button
  className="text-black font-medium cursor-pointer"
  onClick={() => setShowAll(!showAll)}
>
  {showAll ? "View Less ←" : "View All →"}
</button>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 mt-6">

          {visibleCategories.map((cat) => (
            <div
              key={cat._id}
              className="border p-4 rounded-lg hover:shadow cursor-pointer"
            >
              <h3 className="font-semibold">{cat.name}</h3>
              <p className="text-sm text-gray-500">View services →</p>
            </div>
          ))}

          {categories.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              Loading categories...
            </p>
          )}
        </div>
      </section>

      {/* POPULAR SERVICES */}
      {/** (Unchanged - same as your code) */}

      {/* HOW IT WORKS */}
      {/** (Unchanged - same as your code) */}

    </main>
  );
}

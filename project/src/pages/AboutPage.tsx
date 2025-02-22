import React from 'react';

export function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">About My Father's Store</h1>
      
      <div className="prose prose-lg">
        <p className="mb-6">
          Founded in 1970, My Father's Store has been a cornerstone of quality furniture
          and exceptional service in our community for over five decades. What started
          as a small family workshop has grown into a trusted destination for
          furniture that combines craftsmanship, style, and comfort.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Quality craftsmanship in every piece</li>
          <li>Personal service and attention to detail</li>
          <li>Supporting local artisans and sustainable practices</li>
          <li>Creating furniture that lasts generations</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Visit Our Store</h2>
        <p className="mb-4">
          123 Furniture Avenue<br />
          Craftstown, ST 12345
        </p>
        <p className="mb-6">
          Monday - Saturday: 9:00 AM - 6:00 PM<br />
          Sunday: 11:00 AM - 4:00 PM
        </p>

        <div className="bg-gray-100 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-semibold mb-4">Custom Orders</h3>
          <p>
            We specialize in custom furniture solutions. Visit our showroom to
            discuss your specific needs with our experienced craftsmen.
          </p>
        </div>
      </div>
    </div>
  );
}
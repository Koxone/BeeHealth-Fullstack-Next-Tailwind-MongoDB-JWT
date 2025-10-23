'use client';

/* simple header */
export default function Header({ title, subtitle, right }) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">{title}</h1>
        <p className="text-sm text-gray-600 md:text-base">{subtitle}</p>
      </div>
      {right}
    </div>
  );
}

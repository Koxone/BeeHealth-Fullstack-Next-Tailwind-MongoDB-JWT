'use client';

/* metrics block */
import { AlertTriangle } from 'lucide-react';

export default function Metrics({ cards, alert }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {cards.map((c, i) => (
          <div
            key={i}
            className={`${c.bordered ? 'border-2' : 'border'} ${c.danger ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'} rounded-xl p-4 shadow-sm md:p-6`}
          >
            <div className="mb-2 flex items-center justify-between">
              <c.icon className={`h-8 w-8 ${c.accent}`} />
              {c.badge !== null && (
                <span
                  className={`rounded ${c.badgeBg} px-2 py-1 text-xs font-medium ${c.badgeText}`}
                >
                  {c.badge}
                </span>
              )}
            </div>
            <p
              className={`mb-1 text-2xl font-bold md:text-3xl ${c.danger ? 'text-red-600' : 'text-gray-900'}`}
            >
              {c.value}
            </p>
            <p className="text-xs text-gray-600 md:text-sm">{c.label}</p>
          </div>
        ))}
      </div>

      {alert?.show && (
        <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <div className="flex-1">
              <h3 className="mb-1 font-semibold text-red-900">Stock Bajo Detectado</h3>
              <p className="text-sm text-red-700">{alert.text}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

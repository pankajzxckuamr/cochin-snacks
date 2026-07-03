'use client'

import { Award } from 'lucide-react'

interface NutritionalTableProps {
  nutritionalInfo?: string
}

interface NutrientItem {
  name: string
  value: string
}

function parseNutrition(text: string | undefined): { header: string; items: NutrientItem[] } | null {
  if (!text) return null

  // Check if it starts with a serving size header, e.g. "Per 100g: Calories 484kcal | Fat 28g"
  const headerMatch = text.match(/^(Per\s+[^:]+):/i)
  const header = headerMatch ? headerMatch[1] : 'Nutritional Information'
  const rest = headerMatch ? text.slice(headerMatch[0].length) : text

  const items = rest
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      // Regular expression to find the last space/number transition to split nutrient name and its value
      const match = item.match(/^(.*?)\s+(\d+(\.\d+)?\s*[a-zA-Z%]+|\d+)$/)
      if (match) {
        return { name: match[1].trim(), value: match[2].trim() }
      }
      return { name: item, value: '' }
    })

  return { header, items }
}

export default function NutritionalTable({ nutritionalInfo }: NutritionalTableProps) {
  const nutritionData = parseNutrition(nutritionalInfo)

  if (!nutritionData) return null

  return (
    <div className="border-4 border-dark bg-white p-6 shadow-xl rounded-2xl relative w-full max-w-md mx-auto">
      {/* Top Header styling */}
      <h4 className="font-black text-2xl sm:text-3xl font-heading text-center tracking-tight border-b-8 border-dark pb-2 mb-3">
        Nutrition Facts
      </h4>
      <div className="text-xs sm:text-sm font-bold text-dark/70 uppercase border-b-4 border-dark pb-1 mb-2">
        {nutritionData.header}
      </div>

      {/* Table listing */}
      <div className="flex flex-col border-b-8 border-dark">
        {nutritionData.items.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between py-2.5 text-xs sm:text-sm border-b border-dark/10 font-bold ${
              idx % 2 === 0 ? 'bg-off-white/45' : ''
            }`}
          >
            <span className="text-dark/90 font-medium">{item.name}</span>
            <span className="font-mono text-dark font-black">{item.value || '-'}</span>
          </div>
        ))}
      </div>

      {/* Regulatory Badge */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-[9px] text-green-brand font-black tracking-widest uppercase">
        <Award className="w-3.5 h-3.5" />
        <span>FSSAI License #11324007000398</span>
      </div>
    </div>
  )
}

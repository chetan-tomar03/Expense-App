import React, { useState } from 'react';

// Color map for default categories
export const CATEGORY_COLORS = {
  Food: '#10b981',         // emerald-500
  Shopping: '#3b82f6',     // blue-500
  Bills: '#ef4444',        // red-500
  Entertainment: '#a855f7',// purple-500
  Others: '#6b7280'        // gray-500
};

export default function CategoryPieChart({ expenses }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Group expenses by category
  const categoryTotals = expenses.reduce((acc, expense) => {
    const category = expense.category || 'Others';
    const amount = parseFloat(expense.amount) || 0;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const data = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
    color: CATEGORY_COLORS[category] || CATEGORY_COLORS['Others']
  })).filter(item => item.value > 0);

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  // Dimensions of SVG
  const width = 360;
  const height = 280;
  const cx = width / 2;
  const cy = height / 2 - 10;
  const r = 80;

  // Render a simple grey placeholder circle if there's no data
  if (totalValue === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl">
        <h3 className="text-gray-700 font-bold mb-4">Spending by Category</h3>
        <div className="relative flex items-center justify-center w-full h-[220px]">
          <svg width={width} height={height} className="max-w-full h-auto">
            <circle cx={cx} cy={cy} r={r} fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="2" />
            <text
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-gray-400 font-medium text-sm fill-gray-400"
            >
              No Data Available
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // Calculate SVG Paths
  let accumulatedAngle = -Math.PI / 2; // Start from top (-90 degrees)

  const slices = data.map((item, index) => {
    const percentage = item.value / totalValue;
    const sliceAngle = percentage * 2 * Math.PI;
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + sliceAngle;
    accumulatedAngle = endAngle;

    // Math for coordinates of slice outline
    const startX = cx + r * Math.cos(startAngle);
    const startY = cy + r * Math.sin(startAngle);
    const endX = cx + r * Math.cos(endAngle);
    const endY = cy + r * Math.sin(endAngle);

    // Large arc flag is 1 if slice is > 180 degrees
    const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

    // SVG path string for a pie slice
    const pathData = `
      M ${cx} ${cy}
      L ${startX} ${startY}
      A ${r} ${r} 0 ${largeArcFlag} 1 ${endX} ${endY}
      Z
    `;

    // Calculate position for lines and text labels
    const midAngle = startAngle + sliceAngle / 2;
    const isLeft = Math.cos(midAngle) < 0;

    // Label and line coordinates
    const labelDistance = r + 32;
    const lineStartDist = r + 5;
    const lineEndDist = r + 24;

    const labelX = cx + labelDistance * Math.cos(midAngle);
    const labelY = cy + labelDistance * Math.sin(midAngle);

    const lineStartX = cx + lineStartDist * Math.cos(midAngle);
    const lineStartY = cy + lineStartDist * Math.sin(midAngle);

    const lineEndX = cx + lineEndDist * Math.cos(midAngle);
    const lineEndY = cy + lineEndDist * Math.sin(midAngle);

    return {
      ...item,
      pathData,
      labelX,
      labelY,
      lineStartX,
      lineStartY,
      lineEndX,
      lineEndY,
      percentage,
      isLeft,
      index
    };
  });

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl w-full">
      <h3 className="text-gray-700 font-bold mb-2">Spending by Category</h3>
      
      <div className="relative w-full flex justify-center h-[260px]">
        <svg width={width} height={height} className="max-w-full h-auto">
          {slices.map((slice) => {
            const isHovered = hoveredIndex === slice.index;
            return (
              <g
                key={slice.index}
                onMouseEnter={() => setHoveredIndex(slice.index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer transition-all duration-200"
              >
                {/* Pie Slice */}
                <path
                  d={slice.pathData}
                  fill={slice.color}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-transform duration-200 origin-center"
                  style={{
                    transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                    transformOrigin: `${cx}px ${cy}px`,
                    filter: isHovered ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' : 'none',
                  }}
                />

                {/* Line pointer to value */}
                <line
                  x1={slice.lineStartX}
                  y1={slice.lineStartY}
                  x2={slice.lineEndX}
                  y2={slice.lineEndY}
                  stroke="#9ca3af"
                  strokeWidth="1.2"
                />

                {/* Value Text */}
                <text
                  x={slice.labelX}
                  y={slice.labelY}
                  textAnchor={slice.isLeft ? 'end' : 'start'}
                  dominantBaseline="middle"
                  className="text-xs font-semibold fill-gray-600 select-none"
                  style={{ fontSize: '11px' }}
                >
                  ₹{Math.round(slice.value)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2 max-w-md">
        {data.map((item) => (
          <div key={item.name} className="flex items-center space-x-2 text-sm font-medium">
            <span
              className="w-3.5 h-3.5 rounded-sm inline-block"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";

const Atom = ({ color = "#f87500", size = "large", text = "", textColor = "" }) => {
  const sizeMap = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
  };

  const sizeClass = sizeMap[size] || sizeMap.large;

  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
      <div className={`${sizeClass} relative`}>
        <svg
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Center nucleus */}
          <circle
            cx="32"
            cy="32"
            r="6"
            fill={color}
          />
          
          {/* Orbital rings */}
          <g className="atom-orbital">
            {/* Horizontal orbital */}
            <ellipse
              cx="32"
              cy="32"
              rx="24"
              ry="8"
              fill="none"
              stroke={color}
              strokeWidth="2"
              opacity="0.6"
              style={{ 
                animation: "orbit-x 2s linear infinite",
                transformOrigin: "32px 32px"
              }}
            />
            {/* Vertical orbital */}
            <ellipse
              cx="32"
              cy="32"
              rx="8"
              ry="24"
              fill="none"
              stroke={color}
              strokeWidth="2"
              opacity="0.6"
              style={{ 
                animation: "orbit-y 1.5s linear infinite",
                transformOrigin: "32px 32px"
              }}
            />
            {/* Diagonal orbital */}
            <ellipse
              cx="32"
              cy="32"
              rx="24"
              ry="8"
              fill="none"
              stroke={color}
              strokeWidth="2"
              opacity="0.4"
              style={{ 
                animation: "orbit-diag 2.5s linear infinite",
                transformOrigin: "32px 32px",
                transform: "rotate(45deg)"
              }}
            />
            
            {/* Electrons */}
            <circle
              cx="56"
              cy="32"
              r="3"
              fill={color}
              style={{ 
                animation: "orbit-x 2s linear infinite",
                transformOrigin: "32px 32px"
              }}
            />
            <circle
              cx="32"
              cy="8"
              r="3"
              fill={color}
              style={{ 
                animation: "orbit-y 1.5s linear infinite",
                transformOrigin: "32px 32px"
              }}
            />
            <circle
              cx="8"
              cy="32"
              r="3"
              fill={color}
              style={{ 
                animation: "orbit-x 2s linear infinite reverse",
                transformOrigin: "32px 32px"
              }}
            />
            <circle
              cx="32"
              cy="56"
              r="3"
              fill={color}
              style={{ 
                animation: "orbit-y 1.5s linear infinite reverse",
                transformOrigin: "32px 32px"
              }}
            />
          </g>
        </svg>
      </div>
      {text && (
        <p 
          className={`text-xs sm:text-sm text-center px-2 ${textColor || "text-gray-600 dark:text-gray-400"}`}
        >
          {text}
        </p>
      )}
      <style>{`
        @keyframes orbit-x {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbit-y {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbit-diag {
          0% { transform: rotate(45deg); }
          100% { transform: rotate(405deg); }
        }
      `}</style>
    </div>
  );
};

export default Atom;


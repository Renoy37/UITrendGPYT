// src/components/ui/Alert.jsx
import React from "react";

export const Alert = ({ variant, children }) => {
  const variantClasses = {
    destructive: "bg-red-100 border-red-400 text-red-700",
    // Add other variants as needed
  };
  return (
    <div className={`rounded-md p-4 mb-4 ${variantClasses[variant]}`}>
      {children}
    </div>
  );
};

export const AlertTitle = ({ children }) => {
  return <h3 className="text-lg font-medium mb-2">{children}</h3>;
};

export const AlertDescription = ({ children }) => {
  return <div className="text-sm">{children}</div>;
};

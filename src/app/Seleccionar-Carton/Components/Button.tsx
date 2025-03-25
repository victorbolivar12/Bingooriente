"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-neutral-950 text-white p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Critical Error</h1>
          
          <p className="text-neutral-400 mb-6">
            A critical error has occurred. Please refresh the page or try again later.
          </p>
          
          <button
            onClick={reset}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 rounded-lg font-medium transition-colors"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}

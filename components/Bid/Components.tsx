"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Star, FileText } from "lucide-react";
import { toast } from "sonner";

// DocumentScore Component
interface DocumentScoreProps {
  label: string;
  initialScore?: number;
  onChange: (score: number) => void;
  readOnly?: boolean;
}

export const DocumentScore = ({
  label,
  initialScore = 0,
  onChange,
  readOnly = false,
}: DocumentScoreProps) => {
  const [score, setScore] = useState(initialScore);
  const [hoverScore, setHoverScore] = useState(0);

  const handleScoreChange = (newScore: number) => {
    if (readOnly) return;

    setScore(newScore);
    onChange(newScore);
    toast.success(`${label} scored ${newScore} out of 5`);
  };

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <p className='text-sm font-medium'>{label}</p>
        <p className='text-sm text-muted-foreground'>{score}/5</p>
      </div>
      <div className='flex'>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type='button'
            className={cn(
              "p-1 focus:outline-none transition-colors",
              readOnly && "cursor-default"
            )}
            onClick={() => handleScoreChange(value)}
            onMouseEnter={() => !readOnly && setHoverScore(value)}
            onMouseLeave={() => !readOnly && setHoverScore(0)}
            disabled={readOnly}>
            <Star
              size={20}
              className={cn(
                "transition-colors",
                (hoverScore ? value <= hoverScore : value <= score)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

// DocumentLink Component
interface DocumentLinkProps {
  url: string;
  label: string;
  score?: number;
  onScoreChange?: (score: number) => void;
  readOnly?: boolean;
}

export const DocumentLink = ({
  url,
  label,
  score,
  onScoreChange,
  readOnly = false,
}: DocumentLinkProps) => {
  return (
    <div className='space-y-3'>
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary/80'>
        <FileText size={16} />
        {label}
      </a>

      {(score !== undefined || onScoreChange) && (
        <DocumentScore
          label={`${label} Score`}
          initialScore={score}
          onChange={onScoreChange || (() => {})}
          readOnly={readOnly}
        />
      )}
    </div>
  );
};

// BidCard Component

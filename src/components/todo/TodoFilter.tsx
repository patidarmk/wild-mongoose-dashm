"use client";

import { Button } from "@/components/ui/button";

type FilterType = "all" | "active" | "completed";

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function TodoFilter({ currentFilter, onFilterChange }: TodoFilterProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="flex gap-2 mb-6">
      {filters.map(({ value, label }) => (
        <Button
          key={value}
          variant={currentFilter === value ? "default" : "outline"}
          onClick={() => onFilterChange(value)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
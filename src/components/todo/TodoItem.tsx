"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit, Save, X } from "lucide-react";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TodoItem({ id, text, completed, onToggle, onDelete, onEdit }: TodoItemProps) {;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(id, editText.trim());
      setIsEditing(false);
    }
  }

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  }

  return (
    <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <Checkbox
        checked={completed}
        onCheckedChange={() => onToggle(id)}
        className="data-[state=checked]:bg-primary"
      />
      
      {isEditing ? (
        <Input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
          className="flex-1"
          autoFocus
        />
      ) : (
        <span className={`flex-1 ${completed ? "line-through text-gray-500" : ""}`}>
          {text}
        </span>
      )}
      
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button size="sm" onClick={handleSave} className="h-8 w-8 p-0">
              <Save className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} className="h-8 w-8 p-0">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete(id)} className="h-8 w-8 p-0">
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
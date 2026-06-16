import React from 'react';

interface InputWithButtonProps {
  type?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  isDimmed?: boolean; // 다른 필드 수정 중일 때(회색 배경) 처리용
  buttonText?: string;
  onButtonClick?: () => void;
  hideButton?: boolean;
}

export default function InputWithButton({
  type = "text",
  value,
  onChange,
  readOnly = true,
  isDimmed = false,
  buttonText,
  onButtonClick,
  hideButton = false
}: InputWithButtonProps) {
  return (
    <div className="relative flex items-center w-full">
      <input 
        type={type} 
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`
          w-full pl-4 pr-28 py-3.5 rounded-xl typo-body2 outline-none transition-colors border
          ${!readOnly 
            ? 'bg-(--gray-0) border-(--gray-500) text-(--gray-900)' 
            : isDimmed 
              ? 'bg-(--gray-200) border-transparent text-(--gray-500)' 
              : 'bg-(--gray-0) border-(--gray-200) text-(--gray-900)'
          }
        `}
      />
      {!hideButton && buttonText && (
        <button 
          onClick={onButtonClick}
          className="absolute right-2 bg-(--gray-900) text-(--gray-0) px-4 py-2 rounded-full typo-body transition-all hover:bg-(--gray-800) active:scale-95"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
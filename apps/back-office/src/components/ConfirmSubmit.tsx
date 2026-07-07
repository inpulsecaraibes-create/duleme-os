"use client";

/** Bouton submit avec confirmation, à placer dans un <form action={...}>. */
export function ConfirmSubmit({
  children,
  message,
  className,
}: {
  children: React.ReactNode;
  message: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
      className={
        className ??
        "rounded-md border border-line px-3 py-1.5 text-[12.5px] text-mut transition-colors hover:border-alert hover:text-alert"
      }
    >
      {children}
    </button>
  );
}

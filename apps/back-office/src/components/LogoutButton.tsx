"use client";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/logout", { method: "POST" });
        window.location.assign("/login");
      }}
      className="rounded-md border border-line px-3 py-1.5 text-[13px] text-mut transition-colors hover:border-bord hover:text-accent"
    >
      Se déconnecter
    </button>
  );
}

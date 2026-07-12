import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import Button from "./Button";

/**
 * Modal — Accessible dialog with backdrop blur, scale animation,
 *         Escape key support, and configurable sizes.
 *
 * Props:
 *  open       : boolean
 *  title      : string
 *  children   : ReactNode
 *  onClose    : () => void
 *  onConfirm  : () => void   (optional — if omitted, no confirm button)
 *  confirmText: string
 *  cancelText : string
 *  loading    : boolean
 *  size       : "sm" | "md" | "lg"
 *  danger     : boolean — styles confirm button as danger variant
 */
const Modal = ({
  open,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Save",
  cancelText  = "Cancel",
  loading     = false,
  size        = "md",
  danger      = false,
}) => {
  /* Close on Escape key */
  const handleKeyDown = useCallback(
    (e) => { if (e.key === "Escape") onClose?.(); },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.5)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Panel */}
      <div
        className={`w-full ${sizes[size] ?? sizes.md} rounded-2xl bg-white shadow-modal animate-scale-in`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <h2 id="modal-title" className="text-lg font-semibold text-slate-800">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">{children}</div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>

          {onConfirm && (
            <Button
              variant={danger ? "danger" : "primary"}
              onClick={onConfirm}
              loading={loading}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
import { ReactNode, useEffect } from "react";
import "./styles-modal.css";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
}: ModalProps) {
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isOpen) {
      htmlElement.classList.add("no-scroll");
    } else {
      htmlElement.classList.remove("no-scroll");
    }

    return () => {
      htmlElement.classList.remove("no-scroll");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span>{title}</span>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

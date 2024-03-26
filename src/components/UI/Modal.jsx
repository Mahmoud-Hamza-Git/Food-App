import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open, className = "", onClose, ...props }) {
  const modalRef = useRef();

  useEffect(() => {
    const modal = modalRef.current;
    if (open) modal.showModal();

    return () => {
      modal.close();
    };
  }, [open]);

  return createPortal(
    <dialog ref={modalRef} className={`modal ${className}`} onClose={onClose} {...props}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;

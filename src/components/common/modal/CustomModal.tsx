import React, { ReactNode } from 'react';
import './customModal.scss';

type CustomModalProps = {
  children: ReactNode;
  show?: boolean;
};

function CustomModal({ children, show = false }: CustomModalProps) {
  return (
    <>
      {/* a css position reference */}
      {show && <div className="customModal">{children}</div>}
    </>
  );
}

export default CustomModal;

import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type OpenModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  saveButtonName: string;
  onConfirm: () => void;
  cancelButtonName: string;
};

const OpenModal: React.FC<OpenModalProps> = ({
  isOpen,
  onClose,
  children,
  saveButtonName = "Save",
  cancelButtonName = "Cancel",
  onConfirm,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}

            <div className="save_button">
              <button onClick={onConfirm}>{saveButtonName}</button>
              <button onClick={onClose}>{cancelButtonName}</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpenModal;

import React, { ReactElement, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type EditCustomDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const EditCustomerDetails: React.FC<EditCustomDetailsProps> = ({
  isOpen,
  onClose,
  children,
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
              <button>Save</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditCustomerDetails;

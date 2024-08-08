"use client";

import { Button, Modal } from "flowbite-react";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type LogoutModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
export const LogoutModal = memo(function LogoutModal({
  visible,
  onConfirm,
  onClose,
}: LogoutModalProps) {
  const translate = useTranslations("LogoutModal");

  return (
    <Modal show={visible} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {translate("title")}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={onConfirm}>
              {translate("confirm")}
            </Button>
            <Button color="gray" onClick={onClose}>
              {translate("cancel")}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
});

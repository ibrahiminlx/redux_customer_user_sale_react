import React from 'react';
import { Modal } from 'antd';

export const ErrorModal = ({ open, header, body, onOk, onCancel, okText, cancelText }) => {
  const handleOk = () => {
    if (onOk) {
      onOk();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const modalProps = {
    title: header.toString(),
    open: open,
    onCancel: onCancel ? handleCancel : null,
    cancelText: cancelText ? cancelText : 'Cancel',
  };

  if (onOk) {
    modalProps.onOk = handleOk;
    modalProps.okText = okText ? okText : 'OK';
  }

  return (
    <Modal {...modalProps}>
      {body}
    </Modal>
  );
};

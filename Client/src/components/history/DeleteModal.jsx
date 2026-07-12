import Modal from "../common/Modal";

const DeleteModal = ({
  open,
  onClose,
  onConfirm,
  loading,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      loading={loading}
      title="Delete Research Report"
      confirmText="Delete Report"
      danger={true}
    >
      <p className="text-slate-600">
        Are you sure you want to delete this research report? This action cannot be undone and will permanently remove all associated data.
      </p>
    </Modal>
  );
};

export default DeleteModal;
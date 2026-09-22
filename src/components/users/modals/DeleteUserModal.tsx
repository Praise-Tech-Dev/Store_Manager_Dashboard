import { Modal } from "@/components/shared/Modal";
import { useDeleteUser } from "@/hooks/users";
import type { DashboardUser } from "@/types/user.types";
import { AlertTriangle, Info } from "lucide-react";

interface DeleteUserModalProps {
    user: DashboardUser;
    isOpen: boolean;
    onClose: () => void;
}

export const DeleteUserModal = ({
    user,
    isOpen,
    onClose,
}: DeleteUserModalProps) => {
    const { mutate: deleteUser, isPending} = useDeleteUser();

    const fullName =
      `${user.name?.firstname ?? ""} ${user.name?.lastname ?? ""}`.trim() ||
      user.username ||
      "this user";

    const handleDelete = () => {
        deleteUser( user.id, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        variant="delete"
        title="Delete User"
        icon={AlertTriangle}
        iconVariant="danger"
        maxWidth="sm"
        bodyClassName=""
        footerBg="bg-[#ECEEF080]/50"
        confirmText="Delete User"
        confirmVariant="danger"
        confirmLoading={isPending}
        onConfirm={handleDelete}
        cancelText="Cancel"
        showCloseButton = {false}
      >
        <div className="space-y-3.5 text-left">
          <p className="text-xs leading-relaxed text-slate-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-900">{fullName}</span>?
            This action cannot be undone and all associated personal data will
            be permanently removed.
          </p>

          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50 p-3 text-slate-500">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <p className="text-[11px] leading-relaxed">
              Content created by this user will be reassigned to the system
              administrator.
            </p>
          </div>
        </div>
      </Modal>
    );
}
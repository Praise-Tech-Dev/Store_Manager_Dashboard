import { Modal } from "@/components/shared/Modal";
import { useSuspendUser } from "@/hooks/users/useSuspendUser";
import type { DashboardUser } from "@/types/user.types";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

interface SuspendUserModalProps {
    user: DashboardUser;
    isOpen: boolean;
    onClose: () => void;
}

export const SuspendUserModal = ({
    user,
    isOpen,
    onClose,
}: SuspendUserModalProps) => {
    const { mutate: suspendUser, isPending} = useSuspendUser();
    const [reason, setReason] = useState("");
    const [notifyUser, setNotifyUser] = useState(true);

    const handleSuspend = () => {
        suspendUser( 
          {
            id: user.id, 
            reason,
            notifyUser,
          },
          {
            onSuccess: () => {
                onClose();
            },
          }
      );
    };

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Suspend Account"
        subtitle="Are you sure you want to suspend this account?"
        headerBorder=""
        icon={AlertTriangle}
        iconVariant="danger"
        maxWidth="md"
        confirmText="Suspend User"
        confirmVariant="danger"
        confirmLoading={isPending}
        onConfirm={handleSuspend}
        variant="suspend"
        cancelText="Cancel"
        footerBg="bg-[#F2F4F6]"
        showCloseButton={false}
        footerBorder=""
      >
        <div className="space-y-4 pt-1 pb-6 px-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="suspend-reason"
              className="text-[11px] font-semibold tracking-[0.55px] leading-4 align-middle text-text-gray"
            >
              Reason for suspension
            </label>
            <textarea
              id="suspension-reason"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide details..."
              className="w-full min-h-25 rounded-lg pt-3 px-3 pb-17 bg-[#f2f4f6] overflow-y-auto placeholder:text-text-gray/50 text-sm font-normal leading-5 tracking-normal align-middle outline-none transition hover:border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* notify user toggle  */}
          <div className="flex items-center justify-between p-3 bg-[#F2F4F6] rounded-lg w-full ">
            <span className="text-base tracking-normal leading-5 align-middle text-text-default ">
              Notify user
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={notifyUser}
              onClick={() => setNotifyUser((prev) => !prev)}
              className={`relative items-center inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                notifyUser ? "bg-[#4F46E5]" : "bg-slate-400"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full  shadow ring-0 transition duration-200 ease-in-out ${
                  notifyUser
                    ? "translate-x-6 bg-[#DAD7FF]"
                    : "translate-x-0 bg-slate-600"
                }`}
              />
            </button>
          </div>
        </div>
      </Modal>
    );
}
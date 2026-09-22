// import { Modal } from "@/components/shared/Modal";
// import type { DashboardUser } from "@/types/user.types";
// import { AlertTriangle } from "lucide-react";

// interface SuspendUserModalProps {
//     user: DashboardUser;
//     isOpen: boolean;
//     onClose: () => void;
// }

// export const SuspendUserModal = ({
//     user,
//     isOpen,
//     onClose,
// }: SuspendUserModalProps) => {
//     // const { mutate: deleteUser, isPending} = useDeleteUser();

//     const fullName =
//       `${user.name?.firstname ?? ""} ${user.name?.lastname ?? ""}`.trim() ||
//       user.username ||
//       "this user";

//     const handleSuspend = () => {
//         // suspendUser( user.id, {
//         //     onSuccess: () => {
//         //         onClose();
//         //     },
//         // });
//     };

//     return (
//       <Modal
//         isOpen={isOpen}
//         onClose={onClose}
//         title="Suspend User"
//         subtitle="Are you sure you want to suspend this account?"
//         icon={AlertTriangle}
//         iconVariant="danger"
//         maxWidth="md"
//         confirmText="Suspend User"
//         confirmVariant="danger"
//         // confirmLoading={isPending}
//         // onConfirm={handleSuspend}
//         variant="suspend"
//         cancelText="Cancel"
//         footerBg="bg-[#F2F4F6]"
//         showCloseButton= {false}
//       >
//         <div></div>
//       </Modal>
//     );
// }
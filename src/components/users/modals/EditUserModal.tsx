import { Input } from "@/components/shared/Input";
import { Modal } from "@/components/shared/Modal";
import { Select } from "@/components/shared/Select";
import { useUpdateUser } from "@/hooks/users";
import type { EditUserFormValues } from "@/types/editUserFormValues.types";
import type { DashboardUser } from "@/types/user.types";
import { Check, Mail, ShieldAlert, User } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import userIcon from "@/assets/icons/user-settings.svg?react"

interface EditUserModalProps {
    user: DashboardUser;
    isOpen: boolean;
    onClose: () => void;
    onRequestDelete: (user: DashboardUser) => void;
}

const ROLE_OPTIONS = [
  { label: "Admin", value: "Admin" },
  { label: "Customer", value: "Customer" },
  { label: "Editor", value: "Editor" },
  { label: "Viewer", value: "Editor" },
];

const STATUS_OPTIONS = [
  { label: "Active", value: "Active" },
  { label: "Suspended", value: "Suspended" },
  { label: "Invited", value: "Invited" },
];

export const EditUserModal = ({
    user,
    isOpen,
    onClose,
    onRequestDelete,
}: EditUserModalProps) => {
  const { mutate: updateUser, isPending }  = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors},
  } = useForm<EditUserFormValues>({
    defaultValues: {
      name: `${user.name.firstname} ${user.name.lastname}`,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });

  // Keep form in sync if the selected user prop changes
  useEffect(() => {
    reset({
        name: `${user.name.firstname} ${user.name.lastname}`,
        email: user.email,
        role: user.role,
        status: user.status,
    });
  }, [user, reset]);

  const onSubmit = async (values: EditUserFormValues) => {
    const [firstname="", ...rest] = values.name.trim().split(" ");
    const lastname = rest.join(" ");

    updateUser(
      {
        id: user.id,
        data: {
          email: values.email,
          name: { firstname, lastname},
          role: values.role,
          status: values.status,
        },
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
      title="Edit User"
      subtitle={`ID: ${user.id}-XYZ`}
      icon={userIcon}
      iconVariant="primary"
      maxWidth="lg"
      confirmText="Save Changes"
      confirmFormId="edit-user-form"
      confirmLoading={isPending}
      confirmIcon={<Check className="h-3.5 w-3.5" />}
      onDelete={() => onRequestDelete(user)}
      deleteText="Delete User"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-surface-light p-3 md:p-6"
        id="edit-user-form"
      >
        <Input
          label="Full Name"
          iconLeft={<User className="w-3.5 h-3.5 text-text-gray" />}
          error={errors.name?.message}
          {...register("name", { required: "Full name is required" })}
          variant="outline"
          className="bg-white border-border-subtle"
        />
        <Input
          label="Email Address"
          iconLeft={<Mail className="w-3.5 h-3.5 text-text-gray" />}
          error={errors.email?.message}
          {...register("email", { required: "Email is required" })}
          variant="outline"
          className="bg-white border-border-subtle"
        />

        {/* Role and system dropdown  */}
        <div className="flex gap-2 md:gap-4">
          <Select
            label="System Role"
            options={ROLE_OPTIONS}
            {...register("role")}
            className="flex-1"
          />
          <Select
            label="Account Status"
            options={STATUS_OPTIONS}
            {...register("status")}
            className="flex-1"
          />
        </div>

        {/* audit trail  */}
        <div className="flex items-start gap-2.5 rounded-xl border border-border-subtle bg-white p-3 text-text-default">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <div className="text-[11px] leading-relaxed">
            <span className="font-semibold text-slate-700">
              Audit Trail Active:
            </span>{" "}
            Changes to user roles or status will be logged in the system audit
            trail for compliance purposes.
          </div>
        </div>

        {/* modal footer  */}
        {/* <div className="bg-white flex items-center justify-between  py-2 md:py-4 ">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onRequestDelete(user)}
            iconLeft={<Trash2 className="w-3.5 h-3.5 text-danger" />}
          >
            Delete User
          </Button>

          <div className=" flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="sm"
              loading={isPending}
              iconRight={<Check className="w-3.5 h-3.5" />}
            >
              Save Changes
            </Button>
          </div>
        </div> */}
      </form>
    </Modal>
  );
}
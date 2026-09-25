import { Input } from "@/components/shared/Input";
import { Modal } from "@/components/shared/Modal";
import { Select } from "@/components/shared/Select";
import { useUpdateUser } from "@/hooks/users";
import type { DashboardUser } from "@/types/user.types";
import { Check, Info, Mail, User } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import userIcon from "@/assets/icons/user-settings.svg?react"
import { createEditUserSchema, type EditUserSchemaType} from "@/validationSchema"
import { useAuth } from "@/hooks/auth/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { USER_ROLES, USER_STATUSES } from "@/constants/user.constants";
interface EditUserModalProps {
  user: DashboardUser;
  isOpen: boolean;
  onClose: () => void;
  onRequestDelete: (user: DashboardUser) => void;
  existingEmails: string[];
}

const ROLE_OPTIONS = USER_ROLES.map((role) => ({ label: role, value: role }));

const STATUS_OPTIONS = USER_STATUSES.map((status) => ({ label: status, value: status }))

export const EditUserModal = ({
    user,
    isOpen,
    onClose,
    onRequestDelete,
    existingEmails,
}: EditUserModalProps) => {
  const { user: currentUser } = useAuth();
  const { mutate: updateUser, isPending }  = useUpdateUser();

  const isSelf = Boolean(currentUser?.id && currentUser.id === user.id);

  // Regenerate schema whenever target user or existing emails change 
  const validationSchema = useMemo(
    () => createEditUserSchema(existingEmails, isSelf),
    [existingEmails, isSelf]
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors},
  } = useForm<EditUserSchemaType>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
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

  const handleClose = () => {
    reset();
    onClose();
  }
  const onSubmit = async (values: EditUserSchemaType) => {
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
        onSuccess: handleClose,
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      variant="default"
      title="Edit User"
      subtitle={`ID: ${user.id}-XYZ`}
      icon={userIcon}
      iconVariant="primary"
      bodyClassName="bg-surface-light p-3 md:p-6"
      maxWidth="lg"
      confirmText="Save Changes"
      confirmFormId="edit-user-form"
      confirmLoading={isPending}
      confirmIcon={<Check className="h-3.5 w-3.5" />}
      onDelete={!isSelf ? () => onRequestDelete(user) : undefined}
      deleteText="Delete User"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 "
        id="edit-user-form"
      >
        <Input
          label="Full Name"
          iconLeft={<User className="w-3.5 h-3.5 text-text-gray" />}
          error={errors.name?.message}
          {...register("name")}
          variant="outline"
          className="bg-white border-border-subtle"
        />
        <Input
          label="Email Address"
          iconLeft={<Mail className="w-3.5 h-3.5 text-text-gray" />}
          error={errors.email?.message}
          {...register("email")}
          variant="outline"
          className="bg-white border-border-subtle"
        />

        {/* Role and system dropdown  */}
        <div className="flex gap-2 md:gap-4">
          <div className="flex flex-col">
            <Select
              label="System Role"
              options={ROLE_OPTIONS}
              disabled={isSelf}
              {...register("role")}
              className="flex-1"
            />
            {isSelf && (
              <p className="mt-1 text-[11px] text-slate-400">
                You cannot alter your own administrative role.
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <Select
              label="Account Status"
              options={STATUS_OPTIONS}
              disabled={isSelf}
              {...register("status")}
              className="flex-1"
            />
            {isSelf && (
              <p className="mt-1 text-[11px] text-slate-400">
                You cannot suspend your own account.
              </p>
            )}
          </div>
        </div>

        {/* audit trail  */}
        <div className="bg-[#D0E1FB]/30 flex items-start gap-2.5 rounded-lg  p-3 text-text-default">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <div className="flex flex-col text-[11px] leading-relaxed">
            <span className="font-semibold text-[#54647ACC]">
              Audit Trail Active:
            </span>
            <span className="text-wrap text-[#54647ACC]/80">
              Changes to user roles or status will be logged in the system audit
              trail for compliance purposes.
            </span>
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
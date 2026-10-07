import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Mail,
  Phone,
  Image as ImageIcon,
  User,
  UserPlus,
} from "lucide-react";


import { Modal } from "@/components/shared/Modal";
import { Input } from "@/components/shared/Input";
import { Select } from "@/components/shared/Select";
import { useCreateUser } from "@/hooks/users";
import { USER_ROLES, USER_STATUSES } from "@/constants/user.constants";
import {
  createUserSchema,
  type CreateUserSchemaType,
} from "@/validationSchema/createUser.schema";
import { generateUsername } from "@/utils/generateUsername";
import type { CreateUserModalProps } from "@/types/shared/modals/createUserModal.types";

const ROLE_OPTIONS = USER_ROLES.map((role) => ({ label: role, value: role }));
const STATUS_OPTIONS = USER_STATUSES.map((status) => ({
  label: status,
  value: status,
}));

export const CreateUserModal = ({
  isOpen,
  onClose,
  existingEmails,
}: CreateUserModalProps) => {
  const { mutate: createUser, isPending } = useCreateUser();

  const validationSchema = useMemo(
    () => createUserSchema(existingEmails),
    [existingEmails],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserSchemaType>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      avatar: "",
      role: "Customer",
      status: "Invited",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (values: CreateUserSchemaType) => {
    createUser(
      {
        email: values.email,
        username: generateUsername(values.firstname),
        name: {
          firstname: values.firstname,
          lastname: values.lastname,
        },
        phone: values.phone || undefined,
        avatar: values.avatar?.trim() || null,
        role: values.role,
        status: values.status,
      },
      {
        onSuccess: handleClose,
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      variant="default"
      title="Add New User"
      subtitle="Provision a new team member and configure initial permissions"
      icon={UserPlus}
      iconVariant="primary"
      bodyClassName="bg-surface-light p-4 md:p-6"
      maxWidth="lg"
      confirmText="Create User"
      confirmFormId="create-user-form"
      confirmLoading={isPending}
      confirmIcon={<Check className="h-3.5 w-3.5" />}
    >
      <form
        id="create-user-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            placeholder="e.g. John"
            iconLeft={<User className="w-3.5 h-3.5 text-text-gray" />}
            error={errors.firstname?.message}
            {...register("firstname")}
            variant="outline"
            className="bg-white border-border-subtle"
          />

          <Input
            label="Last Name"
            placeholder="e.g. Doe"
            iconLeft={<User className="w-3.5 h-3.5 text-text-gray" />}
            error={errors.lastname?.message}
            {...register("lastname")}
            variant="outline"
            className="bg-white border-border-subtle"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. john@example.com"
            iconLeft={<Mail className="w-3.5 h-3.5 text-text-gray" />}
            error={errors.email?.message}
            {...register("email")}
            variant="outline"
            className="bg-white border-border-subtle"
          />

          <Input
            label="Phone Number (Optional)"
            placeholder="e.g. +1 555-0199"
            iconLeft={<Phone className="w-3.5 h-3.5 text-text-gray" />}
            error={errors.phone?.message}
            {...register("phone")}
            variant="outline"
            className="bg-white border-border-subtle"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="System Role"
            options={ROLE_OPTIONS}
            error={errors.role?.message}
            {...register("role")}
            className="flex-1 "
          />

          <Select
            label="Account Status"
            options={STATUS_OPTIONS}
            error={errors.status?.message}
            {...register("status")}
            className="flex-1 cursor-not-allowed"
            disabled={true}
          />
        </div>

        <Input
          label="Avatar URL (Optional)"
          placeholder="https://images.unsplash.com/..."
          iconLeft={<ImageIcon className="w-3.5 h-3.5 text-text-gray" />}
          error={errors.avatar?.message}
          {...register("avatar")}
          variant="outline"
          className="bg-white border-border-subtle"
        />
      </form>
    </Modal>
  );
};

import { Lock, Mail } from "lucide-react";
import { Input } from "../../components/shared/Input";
import { AuthCard } from "../../components/auth/shared/AuthCard";
import Button from "../../components/shared/Button";
import Google from "../../assets/icons/google.svg"
import Github from "../../assets/icons/github.svg"
import { useLoginMutation } from "../../hooks/useAuthMutation";
import { useForm } from 'react-hook-form'
import { loginSchema, type LoginFormValues } from "../../validationSchema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { mutate: login, isPending, error} = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (values: LoginFormValues)  => {
    login(values);
  }

  return (
    <div>
      <AuthCard
        title="Welcome back"
        subtitle="Enter your credentials to access your store dashboard."
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-200">
              {error.response?.data?.message ||
                "Invalid credentials."}
            </div>
          )}
          <Input
            label="Work Email Address"
            placeholder="admin@fakeapistore.com"
            iconLeft={<Mail className="h-5 w-5" />}
            error={errors.email?.message}
            {...register("email")}
          />

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-gray-700 tracking-tight"
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-primary hover:underline leading-4"
              >
                Forgot password?
              </Link>
            </div>

            <Input
              id="password"
              isPassword
              placeholder="••••••••"
              iconLeft={<Lock className="h-5 w-5" />}
              error={errors.password?.message}
              {...register("password")}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              className="rounded border-gray-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer"
              {...register("rememberMe")}
            />
            {/* checkbox for remember me */}
            <label
              htmlFor="rememberMe"
              className="text-sm text-text-gray select-none"
            >
              Remember me for 30 days
            </label>
          </div>
          <div className="">
            <Button
              className="w-full "
              variant="primary"
              size="lg"
              loading={isPending}
              type="submit"
            >
              Sign In
            </Button>
          </div>

          <p className="text-center text-xs font-medium tracking-normal leading-4 text-text-gray">
            Or continue with
          </p>

          <div className="flex gap-4">
            <Button
              iconLeft={<img className="h-5 w-5" src={Google} alt="Google" />}
              className="flex-1"
              variant="secondary"
              size="lg"
            >
              Google
            </Button>
            <Button
              iconLeft={<img src={Github} alt="Github" />}
              className="flex-1"
              variant="secondary"
              size="lg"
            >
              Github
            </Button>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}

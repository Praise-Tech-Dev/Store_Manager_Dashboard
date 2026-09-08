import { AuthCard } from "../../components/auth/shared/AuthCard";
import { Input } from "../../components/shared/Input";

import name from "../../assets/icons/name.svg";
import Button from "../../components/shared/Button";
import { Check, Circle, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../../hooks/useAuthMutation";
import { signupSchema, type SignupFormValues } from "../../validationSchema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
export default function SignUpPage() {

  const { mutate: signup, isPending, error} = useSignupMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },

  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: "onTouched"
  });

  // password indicator check 
  const password = watch("password", "");

  // The 3 rules corresponding to the 3 visual bars
  const rules = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One number", valid: /[0-9]/.test(password) },
    {
      label: "One uppercase or special symbol",
      valid: /[A-Z]/.test(password) || /[^A-Za-z0-9]/.test(password),
    },
  ];

  const passedRulesCount = rules.filter((r) => r.valid).length;

  // Determine text label & colors based on passed count
  const getStrengthInfo = () => {
    if (passedRulesCount === 0)
      return { label: "", color: "bg-gray-200", textColor: "text-gray-400" };
    if (passedRulesCount === 1)
      return { label: "WEAK", color: "bg-red-500", textColor: "text-red-500" };
    if (passedRulesCount === 2)
      return {
        label: "MEDIUM",
        color: "bg-amber-500",
        textColor: "text-amber-600",
      };
    return {
      label: "STRONG",
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
    };
  };

  const strength = getStrengthInfo();

  const onSubmit = (values: SignupFormValues) => {
    signup(values);
  };

  return (
    <div>
      <AuthCard
        title="Admin Registration"
        subtitle="Configure your administrator account access."
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-200">
              {error.message || "Registration failed"}
            </div>
          )}
          <Input
            label="Full Name"
            placeholder="Alex Rivera"
            iconLeft={<img src={name} alt="Name" className="h-5 w-5" />}
            error={errors.fullName?.message}
            {...register("fullName")}
          />
          <Input
            label="Work Email"
            placeholder="alex.rivera@example.com"
            iconLeft={<Mail className="h-5 w-5" />}
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Password"
            placeholder="••••••••"
            iconLeft={<Lock className="h-5 w-5" />}
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="">
            <Button
              className="w-full "
              variant="primary"
              size="lg"
              type="submit"
              loading={isPending}
            >
              Create Account
            </Button>
            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <div className="mt-2.5 space-y-2">
                {/* 3 Segments + Text on the right */}
                <div className="flex items-center gap-3">
                  <div className="flex h-1 flex-1 gap-1.5">
                    {[1, 2, 3].map((bar) => (
                      <div
                        key={bar}
                        className={`h-full flex-1 rounded-full transition-all duration-300 ${
                          bar <= passedRulesCount
                            ? strength.color
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  <span
                    className={`text-[11px] font-bold tracking-wider ${strength.textColor}`}
                  >
                    {strength.label}
                  </span>
                </div>

                {/* Requirements Checklist */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                  {rules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 text-xs"
                    >
                      {rule.valid ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      ) : (
                        <Circle className="h-2.5 w-2.5 text-gray-300 shrink-0" />
                      )}
                      <span
                        className={
                          rule.valid
                            ? "text-emerald-700 font-medium"
                            : "text-gray-500"
                        }
                      >
                        {rule.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-xs font-medium tracking-normal leading-4 text-gray-500">
            Already have an administrator account?{" "}
            <Link
              className="text-xs font-semibold text-primary hover:underline leading-4 cursor-pointer"
              to="/login"
            >
              Log in here
            </Link>
          </p>
        </form>
      </AuthCard>
    </div>
  );

  
}

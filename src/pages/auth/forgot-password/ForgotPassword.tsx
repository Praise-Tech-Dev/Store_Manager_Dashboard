import { AuthCard } from "@/components/auth/AuthCard";
import Button from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPassword() {
  return (
    <div>
      <AuthCard
        title="Reset Password"
        subtitle="Enter your credentials to access your store dashboard."
        titleSize="text-2xl"
      >
        <div className="space-y-6">
          <Input
            label="Work Email Address"
            placeholder="name@company.com"
            iconLeft={<Mail />}
          />

          <Button className="w-full " variant="primary" size="md">
            Send Reset Link
          </Button>

          <Button variant="outline" iconLeft={<ArrowLeft />} className="w-full">
            Back to Login
          </Button>
        </div>
      </AuthCard>
    </div>
  );
}

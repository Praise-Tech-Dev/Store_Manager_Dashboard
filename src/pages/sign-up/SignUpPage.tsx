import { AuthCard } from "../../components/auth/shared/AuthCard";
import { Input } from "../../components/shared/Input";

import name from "../../assets/icons/name.svg";
import Button from "../../components/shared/Button";
import { Lock, Mail } from "lucide-react";
export default function SignUpPage() {
  return (
    <div>
      <AuthCard
        title="Admin Registration"
        subtitle="Configure your administrator account access."
      >
        <div className="space-y-6">
          <Input
            label="Full Name"
            placeholder="Alex Rivera"
            iconLeft={<img src={name} alt="Name" />}
          />
          <Input
            label="Work Email"
            placeholder="alex.rivera@example.com"
            iconLeft={<Mail />}
          />
          <Input label="Password" placeholder="••••••••" iconLeft={<Lock />} />

          <div className="">
            <Button className="w-full " variant="primary" size="lg">
              Create Account
            </Button>
            {/* password indicator  */}
            <div className=""></div>
          </div>

          <p className="text-center text-xs font-medium tracking-normal leading-4 text-gray-500">
            Already have an administrator account?{" "}
            <span className="text-[#464555] hover:underline cursor-pointer">
              Log in here
            </span>
          </p>
        </div>
      </AuthCard>
    </div>
  );

  
}

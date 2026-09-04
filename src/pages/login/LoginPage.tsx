import { Lock, Mail } from "lucide-react";
import { Input } from "../../components/shared/Input";
import { AuthCard } from "../../components/auth/shared/AuthCard";
import Button from "../../components/shared/Button";
import Google from "../../assets/icons/google.svg"
import Github from "../../assets/icons/google.svg"

export default function LoginPage() {
  return (
    <div>
      <AuthCard
        title="Welcome back"
        subtitle="Enter your credentials to access your store dashboard."
      >
        <div className="space-y-6">
          <Input
            label="Work Email Address"
            placeholder="admin@fakeapistore.com"
            iconLeft={<Mail />}
          />
          <Input label="Password" placeholder="••••••••" iconLeft={<Lock />} />

          <div className="text-sm text-gray-500">
            {/* checkbox for remember me */}
            <p>Remember me for 30 days</p>
          </div>
          <div className="">
            <Button className="w-full " variant="primary" size="lg">
              Sign In
            </Button>
          </div>

          <p className="text-center text-xs font-medium tracking-normal leading-4 text-gray-500">
            Or continue with
          </p>

          <div className="flex gap-4">
            <Button
              iconLeft={<img src={Google} alt="Google" />}
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
        </div>
      </AuthCard>
    </div>
  );
}

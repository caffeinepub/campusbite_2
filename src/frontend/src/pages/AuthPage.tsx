import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CampusUser } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface AuthPageProps {
  onAuthSuccess?: () => void;
  login?: (
    email: string,
    password: string,
  ) => { success: boolean; error?: string };
  signup?: (userData: Omit<CampusUser, "id">) => {
    success: boolean;
    error?: string;
  };
}

export default function AuthPage({
  onAuthSuccess,
  login: loginProp,
  signup: signupProp,
}: AuthPageProps = {}) {
  const auth = useAuth();
  const navigate = useNavigate();

  const loginFn = loginProp ?? auth.login;
  const signupFn = signupProp ?? auth.signup;

  const handleSuccess = () => {
    if (onAuthSuccess) {
      onAuthSuccess();
    } else {
      navigate({ to: "/" });
    }
  };

  return (
    <main className="min-h-screen bg-muted flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl shadow-lg p-8 w-full max-w-md"
        data-ocid="auth.modal"
      >
        <div className="text-center mb-6">
          <img
            src="/assets/campusbite-logo.png"
            alt="CampusBite"
            className="h-14 w-auto mx-auto mb-3"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <h1 className="font-bold text-2xl text-foreground">
            Welcome to CampusBite
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Skip the queue, pre-order your food 🍕
          </p>
        </div>

        <Tabs defaultValue="signup" data-ocid="auth.tab">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="signup" data-ocid="auth.tab">
              Sign Up
            </TabsTrigger>
            <TabsTrigger value="login" data-ocid="auth.tab">
              Login
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signup">
            <SignupForm onSuccess={handleSuccess} signup={signupFn} />
          </TabsContent>

          <TabsContent value="login">
            <LoginForm onSuccess={handleSuccess} login={loginFn} />
          </TabsContent>
        </Tabs>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Saraswati College of Engineering, Kharghar, Navi Mumbai
        </p>
      </motion.div>
    </main>
  );
}

function LoginForm({
  onSuccess,
  login,
}: {
  onSuccess: () => void;
  login: (
    email: string,
    password: string,
  ) => { success: boolean; error?: string };
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = login(email, password);
    if (result.success) {
      onSuccess();
    } else {
      setError(result.error ?? "Login failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-ocid="auth.input"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="login-password">Password</Label>
        <div className="relative">
          <Input
            id="login-password"
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pr-10"
            data-ocid="auth.input"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive" data-ocid="auth.error_state">
          {error}
        </p>
      )}

      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11"
        data-ocid="auth.primary_button"
      >
        Login
      </Button>
    </form>
  );
}

function SignupForm({
  onSuccess,
  signup,
}: {
  onSuccess: () => void;
  signup: (userData: Omit<CampusUser, "id">) => {
    success: boolean;
    error?: string;
  };
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Student" as "Student" | "Faculty",
    collegeId: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState("");

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    const result = signup({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      role: form.role,
      collegeId: form.collegeId.trim(),
      password: form.password,
    });
    if (result.success) {
      onSuccess();
    } else {
      setError(result.error ?? "Signup failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="signup-name">Full Name</Label>
        <Input
          id="signup-name"
          placeholder="e.g. Priya Sharma"
          value={form.name}
          onChange={set("name")}
          required
          data-ocid="auth.input"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={set("email")}
          required
          data-ocid="auth.input"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-phone">Phone Number</Label>
        <Input
          id="signup-phone"
          type="tel"
          placeholder="e.g. 9876543210"
          value={form.phone}
          onChange={set("phone")}
          required
          data-ocid="auth.input"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="signup-role">Role</Label>
          <Select
            value={form.role}
            onValueChange={(v) =>
              setForm((f) => ({ ...f, role: v as "Student" | "Faculty" }))
            }
          >
            <SelectTrigger data-ocid="auth.select">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Faculty">Faculty</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="signup-college-id">College ID</Label>
          <Input
            id="signup-college-id"
            placeholder="e.g. SCOE2024001"
            value={form.collegeId}
            onChange={set("collegeId")}
            required
            data-ocid="auth.input"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-password">Password</Label>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPass ? "text" : "password"}
            placeholder="Min. 6 characters"
            value={form.password}
            onChange={set("password")}
            required
            className="pr-10"
            data-ocid="auth.input"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-confirm-password">Confirm Password</Label>
        <div className="relative">
          <Input
            id="signup-confirm-password"
            type={showConfirmPass ? "text" : "password"}
            placeholder="Re-enter password"
            value={form.confirmPassword}
            onChange={set("confirmPassword")}
            required
            className="pr-10"
            data-ocid="auth.input"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowConfirmPass(!showConfirmPass)}
          >
            {showConfirmPass ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive" data-ocid="auth.error_state">
          {error}
        </p>
      )}

      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11"
        data-ocid="auth.primary_button"
      >
        Create Account
      </Button>
    </form>
  );
}

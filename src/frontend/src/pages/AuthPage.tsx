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
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useGetUserProfile, useSaveUserProfile } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, Hash, Loader2, LogIn, Phone, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AuthPage() {
  const navigate = useNavigate();
  const { identity, login, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { data: profile, isLoading: profileLoading } = useGetUserProfile();
  const saveProfile = useSaveUserProfile();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    role: "Student",
    collegeId: "",
  });

  // Redirect when already logged in with profile
  useEffect(() => {
    if (identity && profile && !profileLoading) {
      navigate({ to: "/" });
    }
  }, [identity, profile, profileLoading, navigate]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.collegeId.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await saveProfile.mutateAsync({
        name: form.name.trim(),
        phone: form.phone.trim(),
        role: form.role,
        collegeId: form.collegeId.trim(),
      });
      toast.success("Profile saved! Welcome to CampusBite 🎉");
      navigate({ to: "/" });
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  const showProfileForm = !!identity && !profileLoading && profile === null;
  const showLoading = isInitializing || (!!identity && profileLoading);

  if (showLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-muted">
        <div
          className="flex flex-col items-center gap-3"
          data-ocid="auth.loading_state"
        >
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm">Loading your profile…</p>
        </div>
      </main>
    );
  }

  if (showProfileForm) {
    return (
      <main className="min-h-screen bg-muted flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl shadow-card p-8 w-full max-w-md"
          data-ocid="profile.modal"
        >
          <div className="text-center mb-6">
            <img
              src="/assets/campusbite-logo.png"
              alt="CampusBite"
              className="h-14 w-auto mx-auto mb-3"
            />
            <h1 className="font-display text-2xl font-bold text-foreground">
              Complete Your Profile
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Just a few details to get you started!
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" /> Full Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. Priya Sharma"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                required
                data-ocid="profile.input"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="e.g. 9876543210"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                required
                data-ocid="profile.input"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="role" className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" /> Role
              </Label>
              <Select
                value={form.role}
                onValueChange={(v) => setForm((f) => ({ ...f, role: v }))}
              >
                <SelectTrigger data-ocid="profile.select">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Faculty">Faculty</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="collegeId" className="flex items-center gap-1.5">
                <Hash className="h-3.5 w-3.5" /> College ID
              </Label>
              <Input
                id="collegeId"
                placeholder="e.g. SCOE2024001"
                value={form.collegeId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, collegeId: e.target.value }))
                }
                required
                data-ocid="profile.input"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={saveProfile.isPending}
              data-ocid="profile.submit_button"
            >
              {saveProfile.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save & Continue"
              )}
            </Button>
          </form>
        </motion.div>
      </main>
    );
  }

  // Default: Login/Signup UI
  return (
    <main className="min-h-screen bg-muted flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl shadow-card p-8 w-full max-w-md"
        data-ocid="auth.modal"
      >
        <div className="text-center mb-6">
          <img
            src="/assets/campusbite-logo.png"
            alt="CampusBite"
            className="h-14 w-auto mx-auto mb-3"
          />
          <h1 className="font-display text-2xl font-bold text-foreground">
            Welcome to CampusBite
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Skip the queue, pre-order your food 🍕
          </p>
        </div>

        <Tabs defaultValue="login" data-ocid="auth.tab">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="login" data-ocid="auth.tab">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" data-ocid="auth.tab">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="bg-muted rounded-xl p-4 text-sm text-muted-foreground">
              <p>
                CampusBite uses <strong>Internet Identity</strong> — a secure,
                password-free login system. No password to remember!
              </p>
            </div>
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11"
              onClick={login}
              disabled={isLoggingIn}
              data-ocid="auth.primary_button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting…
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login with Internet Identity
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <div className="bg-muted rounded-xl p-4 text-sm text-muted-foreground">
              <p>
                New to CampusBite? Click below to create your secure account.
                After signing in, you&apos;ll complete a short profile form.
              </p>
            </div>
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11"
              onClick={login}
              disabled={isLoggingIn}
              data-ocid="auth.primary_button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Create Account
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our canteen terms and policies.
        </p>
      </motion.div>
    </main>
  );
}

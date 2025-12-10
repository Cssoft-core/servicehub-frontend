"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { api } from "@/api";

export default function LoginPage() {
  const [tab, setTab] = useState<"phone" | "email">("email");
  const [mode, setMode] = useState<"login" | "register">("login");

  // Phone states
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Email states
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");

  // Errors
  const [errors, setErrors] = useState<any>({});
  const clear = () => setErrors({});

  // Role based redirect
  function redirectRole(role: string) {
    const r = (role || "").toLowerCase();
    if (r === "admin") return (window.location.href = "/admin/dashboard");
    if (r === "provider") return (window.location.href = "/provider/dashboard");
    return (window.location.href = "/");
  }

  function extract(data: any) {
    const u = data?.user ?? data;
    return {
      user: u,
      role: u?.role ?? data?.role,
      token: u?.token ?? data?.token,
    };
  }

  // ---------------- GOOGLE LOGIN ----------------
  const googleLogin = () => {
    window.location.href = `${api.defaults.baseURL}/auth/google`;
  };

  // ---------------- SEND OTP ----------------
  const sendOtp = async () => {
    clear();
    if (!phone.trim()) return setErrors({ phone: "Phone required" });

    try {
      await api.post("/auth/phone/send-otp", { phoneNumber: "+91" + phone });
      setOtpSent(true);
      toast.success("OTP Sent!");
    } catch (err: any) {
      setErrors({ phone: err.response?.data?.message || "Failed to send OTP" });
    }
  };

  // ---------------- VERIFY OTP REGISTER ----------------
  const verifyOtp = async () => {
    clear();

    if (!otp.trim()) return setErrors({ otp: "OTP required" });

    try {
      const res = await api.post("/auth/phone/verify-otp", {
        phoneNumber: "+91" + phone,
        code: otp,
      });

      toast.success("OTP Verified!");
      const { user, role } = extract(res.data);

      localStorage.setItem("user", JSON.stringify(user));
      // redirectRole(role);
      setMode("login");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Invalid OTP";
      toast.error(msg);
      setErrors({ otp: msg });
    }
  };

  // ---------------- EMAIL REGISTER ----------------
  const registerEmail = async () => {
    clear();

    let e: any = {};
    if (!first) e.first = "First name required";
    if (!last) e.last = "Last name required";
    if (!email) e.email = "Email required";
    if (!pass) e.pass = "Password required";
    if (!cpass) e.cpass = "Confirm password required";
    if (Object.keys(e).length) return setErrors(e);

    try {
      const res = await api.post("/auth/email/register", {
        fullName: `${first} ${last}`,
        email,
        password: pass,
        confirmPassword: cpass,
      });

      toast.success("Registered!");
      const { user, role } = extract(res.data);

      localStorage.setItem("user", JSON.stringify(user));
      // redirectRole(role);
      setMode("login");
    } catch (err: any) {
      setErrors({ email: err.response?.data?.message || "Registration failed" });
    }
  };

  // ---------------- EMAIL LOGIN ----------------
  const loginEmail = async () => {
  clear();

  if (!email.trim()) return setErrors({ email: "Email is required" });
  if (!pass.trim()) return setErrors({ pass: "Password is required" });

  try {
    // Send login request to backend
    const res = await api.post("/auth/email/login", {
      email,
      password: pass,
    });

    toast.success("Login successful!");

    // Extract user & role safely
    const { user, role } = extract(res.data);

    // Store in localStorage
    localStorage.setItem("user", JSON.stringify(user));

    // Redirect based on role
    redirectRole(role);
  } catch (err: any) {
    setErrors({
      email: err.response?.data?.message || "Invalid email or password",
    });
  }
};


  // ---------------- REUSABLE BOTTOM TEXT ----------------
  const BottomText = () => (
    <p className="text-center text-sm">
      {mode === "login" ? (
        <>
          Don’t have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => {
              setMode("register");
              setTab("phone");
            }}
          >
            Register
          </span>
        </>
      ) : (
        <>
          Already have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => {
              setMode("login");
              setTab("email");
            }}
          >
            Login
          </span>
        </>
      )}
    </p>
  );

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-lg rounded-xl border">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          {mode === "login" ? "Welcome Back" : "Join ServiceHub"}
        </CardTitle>
        <CardDescription>
          {mode === "login"
            ? "Login to your account"
            : "Create your ServiceHub account"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={tab} onValueChange={(v: any) => setTab(v)}>

          {/* ---------------- TABS ---------------- */}
          {mode === "login" ? (
            <TabsList className="grid grid-cols-1 mb-5 w-full">
              <TabsTrigger value="email">Email Login</TabsTrigger>
            </TabsList>
          ) : (
            <TabsList className="grid grid-cols-2 mb-5 w-full">
              <TabsTrigger value="phone">Phone</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
            </TabsList>
          )}

          {/* ---------------- EMAIL LOGIN ---------------- */}
          {mode === "login" && (
            <TabsContent value="email">
              <div className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                  {errors.pass && <p className="text-red-500 text-sm">{errors.pass}</p>}
                </div>

                <Button className="w-full" onClick={loginEmail}>
                  Login
                </Button>

                <Button
                  variant="outline"
                  className="w-full flex gap-2"
                  onClick={googleLogin}
                >
                  🌐 Continue with Google
                </Button>

                <Button variant="outline" className="w-full">
                  Register as Provider
                </Button>

                <BottomText />
              </div>
            </TabsContent>
          )}

          {/* ---------------- REGISTER (PHONE) ---------------- */}
          {mode === "register" && (
            <TabsContent value="phone">
              <div className="space-y-4">

                <div>
                  <Label>Phone Number</Label>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <span>+91</span>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border-none shadow-none"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <Button className="w-full" onClick={sendOtp}>
                  Send OTP
                </Button>

                {otpSent && (
                  <div className="space-y-2">
                    <Label>Enter OTP</Label>
                    <Input value={otp} onChange={(e) => setOtp(e.target.value)} />
                    {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}

                    <Button className="w-full" onClick={verifyOtp}>
                      Verify & Register
                    </Button>
                  </div>
                )}

                <Separator />

                <Button
                  variant="outline"
                  className="w-full flex gap-2"
                  onClick={googleLogin}
                >
                  🌐 Continue with Google
                </Button>

                <Button variant="outline" className="w-full">
                  Register as Provider
                </Button>

                <BottomText />
              </div>
            </TabsContent>
          )}

          {/* ---------------- REGISTER (EMAIL) ---------------- */}
          {mode === "register" && (
            <TabsContent value="email">
              <div className="space-y-4">

                <div>
                  <Label>First Name</Label>
                  <Input value={first} onChange={(e) => setFirst(e.target.value)} />
                  {errors.first && <p className="text-red-500 text-sm">{errors.first}</p>}
                </div>

                <div>
                  <Label>Last Name</Label>
                  <Input value={last} onChange={(e) => setLast(e.target.value)} />
                  {errors.last && <p className="text-red-500 text-sm">{errors.last}</p>}
                </div>

                <div>
                  <Label>Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <Label>Password</Label>
                  <Input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                </div>

                <div>
                  <Label>Confirm Password</Label>
                  <Input type="password" value={cpass} onChange={(e) => setCpass(e.target.value)} />
                  {errors.cpass && <p className="text-red-500 text-sm">{errors.cpass}</p>}
                </div>

                <Button className="w-full" onClick={registerEmail}>
                  Register
                </Button>

                <Separator />

                <Button
                  variant="outline"
                  className="w-full flex gap-2"
                  onClick={googleLogin}
                >
                  🌐 Continue with Google
                </Button>

                <Button variant="outline" className="w-full">
                  Register as Provider
                </Button>

                <BottomText />
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}

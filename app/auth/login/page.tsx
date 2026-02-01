"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
  const [role, setRole] = useState<"recruiter" | "candidate">("recruiter");
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    // Simulate login
    router.push("/dashboard");
  }

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="space-y-1 px-0">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription>
          Enter your email to sign in to your {role} account
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        {/* Role Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg mb-6">
          <button
            onClick={() => setRole("recruiter")}
            className={`text-sm font-medium py-2 rounded-md transition-all ${role === "recruiter" ? "bg-white shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Recruiter
          </button>
          <button
            onClick={() => setRole("candidate")}
            className={`text-sm font-medium py-2 rounded-md transition-all ${role === "candidate" ? "bg-white shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Candidate
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" variant="accent">
              Sign In as {role === "recruiter" ? "Recruiter" : "Candidate"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="px-0 flex flex-col gap-4">
        <div className="text-center text-sm text-muted-foreground w-full">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="underline underline-offset-4 hover:text-primary">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

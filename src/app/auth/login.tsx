"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import type { Login } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/auth";
import { handleSignIn } from "@/actions";
import { toast } from "sonner";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (data: Login) => {
    try {
      console.log(data);
      await handleSignIn(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email and password to login.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password")}
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Login;

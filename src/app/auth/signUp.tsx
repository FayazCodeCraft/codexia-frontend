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
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/schemas/auth";
import type { SignUp } from "@/types/auth";
import { signUp } from "@/services/auth";
import { toast } from "sonner";
import { GENERIC_ERROR_MESSAGE } from "@/constants";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>({
    resolver: zodResolver(SignupSchema),
  });

  const handleRegister = async (data: SignUp) => {
    const response = await signUp(data);
    if (response.type === "error") {
      if (response.errors.errorMessages) {
        response.errors.errorMessages.forEach((err) => toast.error(err));
        return;
      }
      toast.error(GENERIC_ERROR_MESSAGE);
      return;
    }
    toast.success("Registration successfull!!!");
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>
            Create a new account by filling in the details below.
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
          <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              {...register("confirmPassword")}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Signup
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SignUp;

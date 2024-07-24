import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./login";
import SignUp from "./signUp";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Auth() {
  const session = await auth();

  // if (session) {
  //   redirect("/");
  // }
  return (
    <div className="flex items-center justify-center h-screen">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
}

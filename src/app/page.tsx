import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const x = session?.user.email;
  return <main>{x}</main>;
}

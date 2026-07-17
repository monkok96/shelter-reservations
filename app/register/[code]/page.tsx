import { RegisterForm } from "@/components/RegisterForm";

export default async function RegisterWithCodePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return <RegisterForm initialCode={code} />;
}

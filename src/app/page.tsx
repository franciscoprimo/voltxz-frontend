"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/signup"); // Redireciona para a página de cadastro
  }, [router]);

  return null;
}

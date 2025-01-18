"use server";
import Image from "next/image";
import StartPage from "@/app/components/startpage";
import Phone from "@/app/components/Phone";

export default async function Home() {
  return (
    <div>
      <StartPage/>
    </div>
  );
}
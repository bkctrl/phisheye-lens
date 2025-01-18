"use server";
import Image from "next/image";
import Intro from "./components/Intro";
import StartPage from "./components/startpage";

export default async function Home() {
  return <StartPage/>;
}

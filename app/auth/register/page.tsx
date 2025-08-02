"use client";

import Card from "@/components/card";
import CardForm from "@/components/cardForm";
import Image from "next/image";
import React from "react";

export default function page() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };

  const handleRegisterSuccess = (data: any) => {
    console.log(data);
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <CardForm
        buttonText="Cadastrar"
        isRegister={true}
        onSubmit={() => {}}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </section>
  );
}

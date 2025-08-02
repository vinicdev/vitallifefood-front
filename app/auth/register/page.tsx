"use client";

import CardForm from "@/components/cardForm";
import AddressForm from "@/components/addressForm";
import React, { useState } from "react";
import { RegisterData } from "@/types/api";

export default function page() {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [userData, setUserData] = useState<Partial<RegisterData> | null>(null);

  const handleRegisterSuccess = (data: Partial<RegisterData>) => {
    console.log("Dados do usuário:", data);
    setUserData(data);
    setShowAddressForm(true);
  };

  const handleAddressSubmit = (addressData: any) => {
    console.log("Dados completos:", { ...userData, ...addressData });
    // Aqui você pode fazer a chamada para a API para salvar os dados completos
    // Por exemplo: saveUserData({ ...userData, ...addressData });
  };

  return (
    <section className="flex justify-center items-center h-screen">
      {!showAddressForm ? (
        <CardForm
          buttonText="Cadastrar"
          isRegister={true}
          onSubmit={() => {}}
          onRegisterSuccess={handleRegisterSuccess}
        />
      ) : (
        <AddressForm onSubmit={handleAddressSubmit} />
      )}
    </section>
  );
}

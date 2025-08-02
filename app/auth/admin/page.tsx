"use client";

import AddressForm from "@/components/addressForm";
import CardForm from "@/components/cardForm";
import React, { useState } from "react";
import { authService } from "@/services/api";

export default function Admin() {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const handleRegisterSuccess = (data: any) => {
    setUserData(data);
    setShowAddressForm(true);
  };

  const handleLogin = async (data: any) => {
    try {
      const response = await authService.login(data);
      console.log("Login realizado:", response);
      // Aqui você pode redirecionar para a dashboard ou fazer outras ações
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const handleAddressSubmit = async (addressData: any) => {
    try {
      // Aqui você pode salvar o endereço e finalizar o registro
      console.log("Dados do usuário:", userData);
      console.log("Dados do endereço:", addressData);

      // Chamar a API de registro com todos os dados
      const fullUserData = {
        ...userData,
        address: addressData,
      };

      const response = await authService.register(fullUserData);
      console.log("Registro completo:", response);

      // Redirecionar ou mostrar mensagem de sucesso
    } catch (error) {
      console.error("Erro no registro:", error);
    }
  };

  if (showAddressForm) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <AddressForm onSubmit={handleAddressSubmit} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 pt-4 pb-4">
      <CardForm buttonText="Entrar" isRegister={false} onSubmit={handleLogin} />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import InputComponent from "./inputComponent";
import SelectComponent from "./selectComponent";
import ButtonComponent from "./buttonComponent";
import Card from "./card";

interface CardFormProps {
  buttonText: string;
  isRegister?: boolean;
  onSubmit: (data: any) => void;
  onRegisterSuccess?: (data: any) => void;
}

export default function CardForm({
  buttonText,
  isRegister,
  onSubmit,
  onRegisterSuccess,
}: CardFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthDate: "",
    gender: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (isRegister && formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (isRegister) {
      const { confirmPassword, ...registrationData } = formData;
      onRegisterSuccess?.(registrationData);
    } else {
      onSubmit({
        email: formData.email,
        password: formData.password,
      });
    }
  };

  return (
    <Card onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8">
        <span className="flex justify-center">
          <Image
            src="/logo-vital-life-foods.png"
            alt="logo"
            width={180}
            height={100}
          />
        </span>
        <div className="flex flex-col gap-4 relative">
          <InputComponent
            label="E-mail"
            type="email"
            value={formData.email}
            required
            onChange={(value) => handleInputChange("email", value)}
          />
          <InputComponent
            label="Senha"
            type="password"
            required
            onChange={(value) => handleInputChange("password", value)}
            value={formData.password}
            hasError={!!error && isRegister}
          />
          {isRegister && (
            <>
              <InputComponent
                label="Confirmar senha"
                type="password"
                value={formData.confirmPassword}
                required
                onChange={(value) =>
                  handleInputChange("confirmPassword", value)
                }
                hasError={!!error}
              />

              <InputComponent
                label="Telefone"
                type="tel"
                value={formData.phone}
                required
                onChange={(value) => handleInputChange("phone", value)}
              />

              <InputComponent
                label="Data de nascimento"
                type="date"
                required
                value={formData.birthDate}
                onChange={(value) => handleInputChange("birthDate", value)}
              />

              <SelectComponent
                label="Gênero"
                options={[
                  { value: "masculino", label: "Masculino" },
                  { value: "feminino", label: "Feminino" },
                  { value: "outro", label: "Outro" },
                ]}
                required
                onChange={(value) => handleInputChange("gender", value)}
              />
            </>
          )}
          {error && (
            <span
              className="text-[14px] absolute -bottom-6 left-0"
              style={{ color: "var(--color-vermelho)" }}
            >
              {error}
            </span>
          )}
        </div>

        <ButtonComponent
          text={buttonText}
          type="submit"
          variant="contained"
          onClick={() => {}}
        />
      </div>
    </Card>
  );
}

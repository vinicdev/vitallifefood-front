import React, { useState } from "react";
import { cepService } from "../services/api";
import InputComponent from "./inputComponent";
import ButtonComponent from "./buttonComponent";
import Image from "next/image";
import Card from "./card";

interface AddressFormProps {
  onSubmit?: (data: any) => void;
}

export default function AddressForm({ onSubmit }: AddressFormProps) {
  const [formData, setFormData] = useState({
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const handleInputChange = (field: string, value: string) => {
    console.log(`Mudando ${field} para:`, value);
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      console.log("Novo formData:", newData);
      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    onSubmit?.(formData);
  };

  const handleSearchCep = async () => {
    try {
      const data = await cepService.searchCep(formData.cep);
      console.log(data);

      // Preencher automaticamente os campos com os dados do CEP
      if (!data.erro) {
        setFormData((prev) => ({
          ...prev,
          street: data.logradouro || "",
          neighborhood: data.bairro || "",
          city: data.localidade || "",
          state: data.uf || "",
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
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
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <InputComponent
              label="CEP"
              type="text"
              required
              value={formData.cep}
              onChange={(value) => handleInputChange("cep", value)}
            />
            <ButtonComponent
              text="Buscar"
              type="button"
              variant="outlined"
              onClick={handleSearchCep}
            />
          </div>

          <InputComponent
            label="Rua"
            type="text"
            required
            value={formData.street}
            onChange={(value) => handleInputChange("street", value)}
          />

          <InputComponent
            label="Número"
            type="text"
            required
            value={formData.number}
            onChange={(value) => handleInputChange("number", value)}
          />

          <InputComponent
            label="Complemento"
            type="text"
            value={formData.complement}
            onChange={(value) => handleInputChange("complement", value)}
          />

          <InputComponent
            label="Bairro"
            type="text"
            required
            value={formData.neighborhood}
            onChange={(value) => handleInputChange("neighborhood", value)}
          />

          <InputComponent
            label="Cidade"
            type="text"
            required
            value={formData.city}
            onChange={(value) => handleInputChange("city", value)}
          />

          <InputComponent
            label="Estado"
            type="text"
            required
            value={formData.state}
            onChange={(value) => handleInputChange("state", value)}
          />

          <ButtonComponent text="Cadastrar" type="submit" variant="contained" />
        </div>
      </div>
    </Card>
  );
}

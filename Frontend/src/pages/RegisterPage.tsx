import React, { useState } from "react";
import { Button, OutlinedInput } from "@mui/material";
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from "../hooks/usersHook";

export const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  
  const { mutate: registerUser, isPending } = useRegisterUser();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    registerUser(
      { email, password, username },
      {
        onSuccess: () => {
          navigate(`/verification`);
        },
        onError: (error) => {
          alert("Registration failed. Please try again.");
          console.error("Registration error:", error);
        },
      }
    );
  };

  return (
    <main className="w-full min-h-screen flex items-center">
      <div className="md:w-[33%] mx-auto flex flex-col">
        <div className="flex flex-col items-center justify-center">
          <label>Step {step}/2</label>
          <h2 className="font-semibold text-3xl text-indigo-500">Create your profile</h2>
        </div>

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-neutral-500 text-base">Email</label>
              <OutlinedInput
                placeholder="example@email.com"
                className="h-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-neutral-500 text-base">Password</label>
              <OutlinedInput
                type="password"
                placeholder="kittens!123"
                className="h-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-neutral-500 text-base">Repite tu contraseña</label>
              <OutlinedInput
                type="password"
                placeholder="kittens!123"
                className="h-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button onClick={() => setStep(2)} variant="contained" className="bg-indigo-500 text-white flex-1">
              Continuar
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            {/* Avatar y Nombre */}
            <div className="flex flex-col md:flex-row items-center gap-8 mt-8">
              <div className="flex flex-col gap-2">
                <label className="text-neutral-500 text-base">Avatar</label>
                <div className="border-2 border-dashed border-indigo-300 rounded-sm size-32 items-center justify-center flex flex-col gap-1">
                  <AddAPhoto className="text-indigo-500" fontSize="large" />
                  <label className="text-indigo-500">Agregar foto</label>
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-between flex-1">
                <div className="flex flex-col gap-2">
                  <label className="text-neutral-500 text-base">Name to display</label>
                  <OutlinedInput
                    placeholder="@davidkim_"
                    className="h-12"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex mt-4 gap-4">
              <Button onClick={() => setStep(1)} variant="contained" className="bg-indigo-500 text-white flex-1">
                Volver
              </Button>
              <Button onClick={handleRegister} variant="contained" className="bg-indigo-500 text-white flex-1" disabled={isPending}>
                {isPending ? "Registrando..." : "Registrarse"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
import { AddAPhoto, ChevronLeft } from "@mui/icons-material";
import { Avatar, Button, OutlinedInput } from "@mui/material";
import { useState } from "react";

export const RegisterPage = () => {

    const [step, setStep] = useState(1);

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
                            <OutlinedInput placeholder="example@email.com" className="h-10" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-neutral-500 text-base">Password</label>
                            <OutlinedInput placeholder="kittens!123" className="h-10" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-neutral-500 text-base">Repeat your password</label>
                            <OutlinedInput placeholder="kittens!123" className="h-10" />
                        </div>

                        <Button onClick={() => setStep(2)} variant="contained" className="bg-indigo-500 text-white flex-1">Continue</Button>

                    </div>
                )}

                {step === 2 && (
                    <div>
                        <div className="flex flex-col md:flex-row items-center gap-8 mt-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-neutral-500 text-base">Avatar</label>
                                <div className="border-2 border-dashed border-indigo-300 rounded-sm size-32 items-center justify-center flex flex-col gap-1">
                                    <AddAPhoto className="text-indigo-500" fontSize="large" />
                                    <label className="text-indigo-500">Add a photo</label>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 justify-between flex-1">
                                <div className="flex flex-col gap-2">
                                    <label className="text-neutral-500 text-base">Name to display</label>
                                    <OutlinedInput placeholder="@davidkim_" className="h-12" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-neutral-500 text-base">Select an accent</label>
                                    <div className="flex flex-row flex-1 justify-between">
                                        <button className="bg-teal-300 w-12 h-8 rounded-md cursor-pointer"></button>
                                        <button className="bg-pink-300 w-12 h-8 rounded-md cursor-pointer"></button>
                                        <button className="bg-blue-300 w-12 h-8 rounded-md cursor-pointer"></button>
                                        <button className="bg-amber-300 w-12 h-8 rounded-md cursor-pointer"></button>
                                        <button className="bg-purple-300 w-12 h-8 rounded-md cursor-pointer"></button>
                                        <button className="bg-red-300 w-12 h-8 rounded-md cursor-pointer border border-neutral-500"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-4 gap-4">
                            <Button onClick={() => setStep(1)} variant="contained" className="bg-indigo-500 text-white flex-1">Back</Button>
                            <Button onClick={() => setStep(2)} variant="contained" className="bg-indigo-500 text-white flex-1">Register</Button>
                        </div>
                    </div>
                )}



            </div>

        </main>
    );
}
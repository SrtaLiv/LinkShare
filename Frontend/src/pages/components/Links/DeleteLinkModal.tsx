import React from "react";
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface DeleteLinkModalProps {
    open: boolean;
    onClose: () => void;
    platformName?: string;
    onConfirm: () => void;
}

export const DeleteLinkModal = ({ 
    open, 
    onClose, 
    platformName, 
    onConfirm 
}: DeleteLinkModalProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                className: "!rounded-3xl overflow-hidden"
            }}
        >
            <div className="bg-gradient-to-r from-red-400 to-red-500 p-6 flex justify-between items-center">
                <h2 className="text-white text-2xl font-bold">Eliminar Link</h2>
                <IconButton
                    onClick={onClose}
                    className="text-white hover:text-gray-200 transition-colors"
                    size="large"
                >
                    <CloseIcon fontSize="medium" />
                </IconButton>
            </div>

            <div className="p-8 bg-white">
                <p className="text-lg text-gray-700 mb-8">
                    ¿Estás seguro que deseas eliminar este link de {platformName}?
                </p>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-8 py-3 rounded-xl text-gray-600 
                                hover:bg-gray-100 transition-colors
                                font-medium text-lg"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-8 py-3 rounded-xl bg-gradient-to-r 
                                from-red-400 to-red-500 
                                hover:from-red-500 hover:to-red-600
                                text-white font-medium text-lg
                                transform transition-all duration-200
                                hover:shadow-lg active:scale-95"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </Dialog>
    );
}; 
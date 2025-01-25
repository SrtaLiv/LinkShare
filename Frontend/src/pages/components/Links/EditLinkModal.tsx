import React from "react";
import { Dialog, IconButton, FormControl, InputLabel, Select, MenuItem, TextField, SelectChangeEvent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const PLATFORMS = [
    'Instagram',
    'Twitter',
    'LinkedIn',
    'GitHub',
    'YouTube',
    'Facebook',
    'TikTok',
    'Personal Website',
    'Other'
] as const;

interface EditLinkModalProps {
    open: boolean;
    onClose: () => void;
    editFormData: {
        platform: string;
        link: string;
        id: string;
    };
    handleEditChange: (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) => void;
    handleEditSubmit: (e: React.FormEvent) => void;
}

export const EditLinkModal = ({ 
    open, 
    onClose, 
    editFormData, 
    handleEditChange, 
    handleEditSubmit 
}: EditLinkModalProps) => {
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
            <div className="bg-gradient-to-r from-teal-400 to-teal-500 p-6 flex justify-between items-center">
                <h2 className="text-white text-2xl font-bold">Editar Link</h2>
                <IconButton
                    onClick={onClose}
                    className="text-white hover:text-gray-200 transition-colors"
                    size="large"
                >
                    <CloseIcon fontSize="medium" />
                </IconButton>
            </div>

            <form onSubmit={handleEditSubmit} className="p-8 bg-white">
                <div className="space-y-8">
                    <FormControl fullWidth>
                        <InputLabel id="platform-label" className="text-lg">
                            Plataforma
                        </InputLabel>
                        <Select
                            labelId="platform-label"
                            name="platform"
                            value={editFormData.platform}
                            label="Plataforma"
                            onChange={handleEditChange}
                            required
                            className="rounded-xl text-lg"
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderRadius: '12px',
                                },
                            }}
                        >
                            {PLATFORMS.map((platform) => (
                                <MenuItem 
                                    key={platform} 
                                    value={platform}
                                    className="text-lg hover:bg-teal-50"
                                >
                                    {platform}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        name="link"
                        label="URL del Link"
                        type="url"
                        fullWidth
                        value={editFormData.link}
                        onChange={handleEditChange}
                        required
                        placeholder="https://ejemplo.com"
                        className="rounded-xl"
                        InputProps={{
                            className: "text-lg rounded-xl"
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                            },
                        }}
                    />
                </div>

                <div className="mt-10 flex justify-end space-x-4">
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
                        type="submit"
                        className="px-8 py-3 rounded-xl bg-gradient-to-r 
                                from-teal-400 to-teal-500 
                                hover:from-teal-500 hover:to-teal-600
                                text-white font-medium text-lg
                                transform transition-all duration-200
                                hover:shadow-lg active:scale-95"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </Dialog>
    );
}; 
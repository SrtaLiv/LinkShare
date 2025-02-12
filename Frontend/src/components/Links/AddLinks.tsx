import React, { useState } from 'react';
import {
    Dialog,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    SelectChangeEvent
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { createLink } from '../../services/api';
import { Link } from '../../types/Link';
import { useGlobalContext } from '../../context/GlobalContext';

const INITIAL_FORM_STATE = {
    link: '',
    platform: ''
};

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

export const AddLinkBTN: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useGlobalContext();

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData(INITIAL_FORM_STATE);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSubmitting(true);
        try {
            const linkData: Link = {
                platform: formData.platform.toUpperCase(),
                link: formData.link,  // Asegúrate de que en tu tipo Link sea 'url' y no 'link'
                userId: user.id
            };

            await createLink(linkData);
            handleClose();
        } catch (error) {
            console.error('Error al guardar el link:', error);
            // Aquí podrías agregar un toast o notificación de error
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="group relative w-full flex items-center justify-center px-8 py-5 
                         bg-gradient-to-r from-teal-400 to-teal-500 
                         hover:from-teal-500 hover:to-teal-600
                         text-white font-semibold rounded-2xl
                         transform transition-all duration-200 ease-in-out
                         hover:scale-[1.02] hover:shadow-xl
                         focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
            >
                <AddCircleIcon className="mr-3 text-2xl" />
                <span className="text-xl">Agregar Nuevo Link</span>
            </button>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    className: "!rounded-3xl overflow-hidden"
                }}
            >
                <div className="bg-gradient-to-r from-teal-400 to-teal-500 p-6 flex justify-between items-center">
                    <h2 className="text-white text-2xl font-bold">Agregar Nuevo Link</h2>
                    <IconButton
                        onClick={handleClose}
                        className="text-white hover:text-gray-200 transition-colors"
                        size="large"
                    >
                        <CloseIcon fontSize="medium" />
                    </IconButton>
                </div>

                <form onSubmit={handleSubmit} className="p-8 bg-white">
                    <div className="space-y-8">
                        <FormControl fullWidth>
                            <InputLabel id="platform-label" className="text-lg">
                                Plataforma
                            </InputLabel>
                            <Select
                                labelId="platform-label"
                                name="platform"
                                value={formData.platform}
                                label="Plataforma"
                                onChange={handleChange}
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
                            value={formData.link}
                            onChange={handleChange}
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
                            onClick={handleClose}
                            className="px-8 py-3 rounded-xl text-gray-600 
                                     hover:bg-gray-100 transition-colors
                                     font-medium text-lg"
                            disabled={isSubmitting}
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
                                     hover:shadow-lg active:scale-95
                                     disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </Dialog>
        </>
    );
};
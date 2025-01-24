import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    IconButton
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../../utils/axios';

export const AddLinkBTN = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        link: '',
        platform: ''
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/links', {
                platform: formData.platform.toUpperCase(),
                link: formData.link
            });

            console.log('Link guardado exitosamente:', response.data);
            setFormData({ link: '', platform: '' });
            handleClose();
        } catch (error) {
            console.error('Error al guardar el link:', error);
        }
    };

    const platforms = [
        'Instagram',
        'Twitter',
        'LinkedIn',
        'GitHub',
        'YouTube',
        'Facebook',
        'TikTok',
        'Personal Website',
        'Other'
    ];

    return (
        <>
            <Button
                variant="contained"
                onClick={handleOpen}
                startIcon={<AddCircleIcon />}
                sx={{
                    backgroundColor: '#14b8a6',
                    color: 'white',
                    borderRadius: '24px',
                    padding: '16px 24px',
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    border: '1px solid #14b8a6',
                    width: '100%',
                    '&:hover': {
                        backgroundColor: '#14b8a6',
                        transform: 'scale(1.05)',
                        transition: 'all 0.2s ease'
                    },
                }}
            >
                AGREGAR LINK
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        borderRadius: '15px',
                        padding: '10px',
                        minWidth: '350px'
                    }
                }}
            >
                <DialogTitle sx={{
                    m: 0,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    Agregar Nuevo Link
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            color: 'grey.500',
                            '&:hover': {
                                color: 'grey.800',
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <form onSubmit={handleSubmit}>
                    <DialogContent dividers>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="platform-label">Plataforma</InputLabel>
                                <Select
                                    labelId="platform-label"
                                    name="platform"
                                    value={formData.platform}
                                    label="Plataforma"
                                    onChange={handleChange}
                                    required
                                >
                                    {platforms.map((platform) => (
                                        <MenuItem key={platform} value={platform}>
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
                            />
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ padding: 2 }}>
                        <Button
                            onClick={handleClose}
                            sx={{
                                color: 'grey.600',
                                '&:hover': { backgroundColor: 'grey.100' }
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: '#2c3e50',
                                '&:hover': {
                                    backgroundColor: '#34495e'
                                }
                            }}
                        >
                            Guardar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
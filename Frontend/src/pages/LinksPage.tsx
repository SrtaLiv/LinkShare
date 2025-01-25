import React, { useEffect, useState } from "react";
import axios from "axios";
import { IconButton, Box, Dialog, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

interface LinkData {
  platform: string;
  link: string;
  id: string;
}

const LinksByUser = ({ username, showActions = false }) => {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<LinkData | null>(null);
  const [editFormData, setEditFormData] = useState<LinkData>({ platform: '', link: '', id: '' });

  useEffect(() => {
    fetchLinks();
  }, [username]);

  const fetchLinks = () => {
    axios
      .get(`http://localhost:8081/api/links/user/${username}`)
      .then((response) => setLinks(response.data))
      .catch((error) => console.error("Error fetching links:", error));
  };

  const handleEdit = (link: LinkData) => {
    setSelectedLink(link);
    setEditFormData(link);
    setEditModalOpen(true);
  };

  const handleDelete = (link: LinkData) => {
    setSelectedLink(link);
    setDeleteModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/links/${editFormData.id}`, {
        platform: editFormData.platform.toUpperCase(),
        link: editFormData.link
      });
      setEditModalOpen(false);
      fetchLinks();
    } catch (error) {
      console.error('Error al actualizar el link:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedLink) {
      try {
        await axios.delete(`http://localhost:8081/api/links/${selectedLink.id}`);
        setDeleteModalOpen(false);
        fetchLinks();
      } catch (error) {
        console.error('Error al eliminar el link:', error);
      }
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {links.map((link, index) => (
          <li key={index} className="flex items-center gap-2">
            <a
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-6 border border-teal-500 rounded-3xl hover:scale-105 transition-all duration-200 ease cursor-pointer flex-1 text-center text-teal-900 font-bold"
            >
              {link.platform}
            </a>
            {showActions && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => handleEdit(link)}
                  sx={{
                    border: '1px solid',
                    '&:hover': { backgroundColor: 'primary.light' }
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDelete(link)}
                  sx={{
                    border: '1px solid',
                    '&:hover': { backgroundColor: 'error.light' }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </li>
        ))}
      </ul>

      {/* Modal de Edición */}
      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: "!rounded-3xl overflow-hidden"
        }}
      >
        <div className="bg-gradient-to-r from-teal-400 to-teal-500 p-6 flex justify-between items-center">
          <h2 className="text-white text-2xl font-bold">Editar Link</h2>
          <IconButton
            onClick={() => setEditModalOpen(false)}
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
              onClick={() => setEditModalOpen(false)}
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

      {/* Modal de Eliminación */}
      <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: "!rounded-3xl overflow-hidden"
        }}
      >
        <div className="bg-gradient-to-r from-red-400 to-red-500 p-6 flex justify-between items-center">
          <h2 className="text-white text-2xl font-bold">Eliminar Link</h2>
          <IconButton
            onClick={() => setDeleteModalOpen(false)}
            className="text-white hover:text-gray-200 transition-colors"
            size="large"
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
        </div>

        <div className="p-8 bg-white">
          <p className="text-lg text-gray-700 mb-8">
            ¿Estás seguro que deseas eliminar este link de {selectedLink?.platform}?
          </p>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setDeleteModalOpen(false)}
              className="px-8 py-3 rounded-xl text-gray-600 
                       hover:bg-gray-100 transition-colors
                       font-medium text-lg"
            >
              Cancelar
            </button>
            <button
              onClick={handleDeleteConfirm}
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
    </div>
  );
};

export default LinksByUser;

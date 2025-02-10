import React, { useState } from "react";
import { IconButton, Box, SelectChangeEvent } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditLinkModal } from "../components/Links/EditLinkModal";
import { DeleteLinkModal } from "../components/Links/DeleteLinkModal";
import { useGlobalContext } from "../context/GlobalContext";
import { useLinks, useUpdateLink, useDeleteLink } from "../hooks/linksHook";
import { Link } from "../types/Link";

const LinksByUser = ({ username, showActions = false }) => {
  const { user, isAuthenticated } = useGlobalContext();
  const { data: links, isLoading, error } = useLinks(user?.username);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [editFormData, setEditFormData] = useState<Link>({
    id: null,
    platform: '', // Aquí el nombre de la plataforma
    link: '' // Aquí la URL
  });

  // Inicializar las mutaciones
  const updateLinkMutation = useUpdateLink(editFormData.id);
  const deleteLinkMutation = useDeleteLink();

  if (!isAuthenticated) return <p>Inicia sesión para ver tus enlaces.</p>;
  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEdit = (link: Link) => {
    setEditFormData({
      platform: link.platform,
      link: link.link,
      id: link.id,
    });
    setEditModalOpen(true);
  };


  const handleDelete = (link: Link) => {
    setSelectedLink(link);
    setDeleteModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateLinkMutation.mutateAsync({
        ...editFormData,
        platform: editFormData.platform.toUpperCase()
      });
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error al actualizar el link:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedLink?.id) return;

    try {
      await deleteLinkMutation.mutateAsync(selectedLink.id);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  return (
    <div>
      <ul className="flex flex-col gap-4">
        {links?.map((link: Link) => (
          <li key={link.id} className="flex items-center gap-2">
            <a
              href={link.platform} // Aquí va la URL
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-6 border border-teal-500 rounded-3xl hover:scale-105 transition-all duration-200 ease cursor-pointer flex-1 text-center text-teal-900 font-bold"
            >
              {link.link} {/* Aquí va el nombre de la plataforma */}
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

      <EditLinkModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        editFormData={editFormData}
        handleEditChange={handleEditChange}
        handleEditSubmit={handleEditSubmit}
      />

      <DeleteLinkModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        platformName={selectedLink?.platform}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default LinksByUser;
import React, { useEffect, useState } from "react";
import api from '../utils/axios';
import { IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditLinkModal } from "../components/Links/EditLinkModal";
import { DeleteLinkModal } from "../components/Links/DeleteLinkModal";

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
  id: number;
  platform: string;
  link: string;
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
    api
      .get(`/links/user/${username}`)
      .then((response) => {
        const linksConId = response.data.map((link: any) => ({
          ...link,
          id: link.id || null
        }));
        setLinks(linksConId);
      })
      .catch((error) => console.error("Error fetching links:", error));
  };

  const handleEdit = (link: LinkData) => {
    if (!link) return;
    setSelectedLink(link);
    setEditFormData(link);
    setEditModalOpen(true);
  };
  
  const handleDelete = (link: LinkData) => {
    if (!link) return;
    setSelectedLink(link);
    setDeleteModalOpen(true);
  };
  
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/links/${editFormData.id}`, {
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
    if (!selectedLink?.id) return;

    try {
      const response = await api.delete(`/links/${selectedLink.id}`);
      if (response.status === 204) {
        setDeleteModalOpen(false);
        fetchLinks();
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };
  
  const handleEditChange = (e: any) => {
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

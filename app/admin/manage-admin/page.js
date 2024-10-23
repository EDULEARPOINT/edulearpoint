"use client";
import { useEffect, useState } from 'react';
import { useAppContext } from '@/utils/GlobalContext';
import AdminModal from '../_components/AdminModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { Table, Button, Typography } from 'antd';
import 'antd/dist/reset.css';

const { Column } = Table;

export default function ManageAdmins() {
  const { user, isUserAdmin, fetchAllAdmins, createNewAdmin, deleteAdmin } = useAppContext();
  const [admins, setAdmins] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAdmins = async () => {
      const adminList = await fetchAllAdmins();
      setAdmins(adminList);
    };
    fetchAdmins();
  }, [fetchAllAdmins]);

  const handleCreateAdmin = async (adminData) => {
    try {
      await createNewAdmin(adminData);
      setAdmins(await fetchAllAdmins());
      setIsModalOpen(false);
      toast.success('Admin created successfully!');
    } catch (error) {
      toast.error('Failed to create admin.');
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      await deleteAdmin(adminId);
      setAdmins(await fetchAllAdmins());
      toast.success('Admin deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete admin.');
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography.Title level={2}>Manage Admins</Typography.Title>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add New Admin
        </Button>
      </div>
      <Table dataSource={admins} rowKey="id" scroll={{ x: true }}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Phone Number" dataIndex="phone_number" key="phone_number" />
        <Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <Button danger onClick={() => handleDeleteAdmin(record.id)}>
              Delete
            </Button>
          )}
        />
      </Table>
      {isModalOpen && (
        <AdminModal 
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateAdmin}
        />
      )}
    </div>
  );
}

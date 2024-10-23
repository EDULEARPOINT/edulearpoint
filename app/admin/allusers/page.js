"use client";
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/utils/GlobalContext';
import { Table, Modal, Button, Typography, Spin, Collapse } from 'antd';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const AllUsers = () => {
  const { fetchAllUsers } = useAppContext();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const allUsers = await fetchAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, [fetchAllUsers]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const renderTeamMembers = (members) => {
    return members.map((memberId, index) => (
      <Text key={index}>{memberId}</Text>
    ));
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'UID', dataIndex: 'userId', key: 'userId' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone_number', key: 'phone_number' },
    { title: 'Package', dataIndex: 'package', key: 'package' },
  ];

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>All Users</Title>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="userId"
        onRow={(record) => ({
          onClick: () => handleUserClick(record),
        })}
      />

      {selectedUser && (
        <Modal
          title="User Details"
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={[
            <Button key="close" onClick={() => setShowModal(false)}>
              Close
            </Button>,
          ]}
        >
          <Title level={4}>Basic Information</Title>
          <Text>Name: {selectedUser.name}</Text>
          <br />
          <Text>UID: {selectedUser.userId}</Text>
          <br />
          <Text>Email: {selectedUser.email}</Text>
          <br />
          <Text>Phone: {selectedUser.phone_number}</Text>
          <br />
          <Text>Package: {selectedUser.package}</Text>
          <br />
          <Text>Total Earnings: {selectedUser.totalEarnings}</Text>
          <br />
          <Text>Refer Amount: {selectedUser.referAmount}</Text>
          <br />
          <Text>Direct Earnings: {selectedUser.directEarnings}</Text>
          <br />
          <Text>Passive Earnings: {selectedUser.passiveEarnings}</Text>
          <br />
          <Text>Turnover Income: {selectedUser.turnOverIncome}</Text>
          <br />
          <Text>Reward Income: {selectedUser.rewardIncome}</Text>

          <Title level={4} style={{ marginTop: '16px' }}>Referral Information</Title>
          <Collapse>
            <Panel header={`Direct Team Members (${selectedUser.directTeamMembers?.length || 0})`} key="1">
              {renderTeamMembers(selectedUser.directTeamMembers || [])}
            </Panel>
            <Panel header="Passive Team Members" key="2">
              {selectedUser.passiveTeamMembers && Object.entries(selectedUser.passiveTeamMembers).map(([level, members]) => (
                <div key={level}>
                  <Text strong>Level {level.replace('level', '')} ({members.length})</Text>
                  {renderTeamMembers(members)}
                </div>
              ))}
            </Panel>
          </Collapse>

          {selectedUser.referredBy && (
            <div style={{ marginTop: '16px' }}>
              <Text strong>Referred By</Text>
              <br />
              <Text>Name: {selectedUser.referredBy.name}</Text>
              <br />
              <Text>Email: {selectedUser.referredBy.email}</Text>
              <br />
              <Text>Level: {selectedUser.referredBy.level}</Text>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default AllUsers;

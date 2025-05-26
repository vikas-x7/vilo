'use client';

import { useState, useEffect, createRef } from 'react';
import { usePortfolioQuery, useSavePortfolio, useDeployPortfolio, useUploadPortfolioImage, PortfolioData, createEmptyPortfolio } from '@/features/portfolio';

import { buildPortfolioUrl, getErrorMessage } from './portfolio.utils';
import { PortfolioCanvas } from './components/PortfolioCanvas';
import { PortfolioSidebar } from './components/PortfolioSidebar';

const defaultData: PortfolioData = createEmptyPortfolio();

export default function PortfolioPage() {
  const { data: qData } = usePortfolioQuery();
  const saveMutation = useSavePortfolio();
  const deployMutation = useDeployPortfolio();
  const uploadImageMutation = useUploadPortfolioImage();

  const [data, setData] = useState<PortfolioData>(defaultData);
  const [copied, setCopied] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [avatarRef] = useState(() => createRef<HTMLInputElement>());
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusTone, setStatusTone] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    if (qData) {
      setData(qData);
    }
  }, [qData]);

  const portfolioUrl = buildPortfolioUrl(data.username, data.deployedUrl);
  const avatarFallback = (data.name.trim()[0] ?? data.username.trim()[0] ?? 'U').toUpperCase();

  const handleSave = async () => {
    try {
      const savedData = await saveMutation.mutateAsync(data);
      setData(savedData);
      setStatusTone('success');
      setStatusMessage('Portfolio changes saved to the database.');
    } catch (error) {
      const message = getErrorMessage(error);
      console.error('Failed to save portfolio:', error);
      setStatusTone('error');
      setStatusMessage(message);
      alert(message);
    }
  };

  const handleDeploy = async () => {
    try {
      const savedData = await saveMutation.mutateAsync(data);
      const deployedData = await deployMutation.mutateAsync();
      setData({
        ...deployedData,
        username: deployedData.username || savedData.username,
      });
      setStatusTone('success');
      setStatusMessage(deployedData.isPublic ? 'Portfolio deployed and public link is live.' : 'Portfolio deployed. Switch visibility to public to share it.');
    } catch (e) {
      console.error('Failed to deploy:', e);
      const message = getErrorMessage(e);
      setStatusTone('error');
      setStatusMessage(message);
      alert(message);
    }
  };

  const setField = <K extends keyof PortfolioData>(key: K, val: PortfolioData[K]) => setData((p) => ({ ...p, [key]: val }));

  const updateItem = <K extends 'experience' | 'projects' | 'education' | 'activities'>(key: K, id: number, patch: Partial<PortfolioData[K][number]>) =>
    setField(key, data[key].map((x) => (x.id === id ? { ...x, ...patch } : x)) as PortfolioData[K]);

  const removeItem = <K extends 'experience' | 'projects' | 'education' | 'activities'>(key: K, id: number) => setField(key, data[key].filter((x) => x.id !== id) as PortfolioData[K]);

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await uploadImageMutation.mutateAsync(formData);
      if (res && res.url) {
        setField('avatar', res.url);
        setStatusTone('success');
        setStatusMessage('Profile image saved to the database.');
      }
    } catch (err) {
      console.error('Failed to upload image:', err);
      const message = getErrorMessage(err);
      setStatusTone('error');
      setStatusMessage(message);
      alert(message);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const totalSections =
    (data.experience.length > 0 ? 1 : 0) + (data.projects.length > 0 ? 1 : 0) + (data.education.length > 0 ? 1 : 0) + (data.activities.length > 0 ? 1 : 0) + (data.skills.length > 0 ? 1 : 0);

  return (
    <div className="flex flex-col h-screen bg-black font-gothic text-white overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        <PortfolioCanvas
          data={data}
          avatarFallback={avatarFallback}
          uploadingAvatar={uploadingAvatar}
          avatarRef={avatarRef}
          onAvatarChange={handleAvatarChange}
          setField={setField}
          updateItem={updateItem}
          removeItem={removeItem}
        />
        <PortfolioSidebar
          data={data}
          portfolioUrl={portfolioUrl}
          copied={copied}
          rightSidebarOpen={rightSidebarOpen}
          totalSections={totalSections}
          savePending={saveMutation.isPending}
          deployPending={deployMutation.isPending}
          statusMessage={statusMessage}
          statusTone={statusTone}
          onCopy={handleCopy}
          onSave={handleSave}
          onDeploy={handleDeploy}
          onToggleSidebar={setRightSidebarOpen}
          setField={setField}
        />
      </div>
    </div>
  );
}

export interface LatexVersion {
  id: number;
  content: string;
  createdAt: string;
}

export interface LatexDocument {
  id: number;
  title: string;
  updatedAt: string;
  versions: LatexVersion[];
}

export function formatUpdatedAt(updatedAt: string) {
  const date = new Date(updatedAt);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hour = 1000 * 60 * 60;
  const day = hour * 24;

  if (diff < hour) {
    return 'Just now';
  }

  if (diff < day) {
    return `${Math.max(1, Math.floor(diff / hour))} hours ago`;
  }

  if (diff < day * 2) {
    return 'Yesterday';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function buildPortfolioUrl(username: string, deployedUrl: string) {
  if (deployedUrl) {
    return deployedUrl;
  }

  if (!username) {
    return '';
  }

  if (typeof window !== 'undefined') {
    return `${window.location.origin}/${username}`;
  }

  return `/${username}`;
}

export function getErrorMessage(error: unknown) {
  if (error && typeof error === 'object') {
    const responseData = (error as { response?: { data?: unknown } }).response?.data;

    if (responseData && typeof responseData === 'object') {
      const record = responseData as Record<string, unknown>;

      if (typeof record.message === 'string' && record.message.trim()) {
        return record.message;
      }

      if (typeof record.error === 'string' && record.error.trim()) {
        return record.error;
      }
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
}

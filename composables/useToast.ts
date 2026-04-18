// app/composables/useToast.ts
export const useToast = () => {
  const toasts = useState<{id: number, message: string, type: 'success' | 'error' | 'info'}[]>('toasts', () => []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    toasts.value.push({ id, message, type });

    // 3秒后自动移除
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  };

  return {
    toasts,
    success: (msg: string) => showToast(msg, 'success'),
    error: (msg: string) => showToast(msg, 'error'),
    info: (msg: string) => showToast(msg, 'info')
  };
};
import { toast } from 'sonner-native';

const toastService = (() => {
    /**
     * Display a success toast notification
     * @param message The message to display
     * @param subtitle Optional subtitle text
     */
    function success(message: string, subtitle?: string) {
        toast.success(message, {
            description: subtitle,
        });
    }

    /**
     * Display an error toast notification
     * @param message The message to display
     * @param subtitle Optional subtitle text
     */
    function error(message: string, subtitle?: string) {
        toast.error(message, {
            description: subtitle,
        });
    }

    /**
     * Display an info toast notification
     * @param message The message to display
     * @param subtitle Optional subtitle text
     */
    function info(message: string, subtitle?: string) {
        toast.info(message, {
            description: subtitle,
        });
    }

    /**
     * Display a warning toast notification
     * @param message The message to display
     * @param subtitle Optional subtitle text
     */
    function warning(message: string, subtitle?: string) {
        toast.warning(message, {
            description: subtitle,
        });
    }

    /**
     * Display a loading toast notification
     * @param message The message to display
     * @param subtitle Optional subtitle text
     */
    function loading(message: string, subtitle?: string) {
        toast.loading(message, {
            description: subtitle,
        });
    }

    /**
     * Dismiss all currently displayed toast notifications
     */
    function dismiss() {
        toast.dismiss();
    }

    return {
        success,
        error,
        info,
        warning,
        loading,
        dismiss,
    };
})();

export default toastService;

import type { QueryParams } from 'expo-linking';
import { Href, router } from 'expo-router';

/**
 * Replace the current route with a new one
 * @param route The route to navigate to
 * @param params Optional parameters to pass to the route
 */
export function replace(route: string, params?: Record<string, any> | QueryParams): void {
    router.replace({ pathname: route as any, params });
}

/**
 * Navigate to a new route while keeping the current route in history
 * @param route The route to navigate to
 * @param params Optional parameters to pass to the route
 */
export function navigate(route: string, params?: Record<string, any> | QueryParams): void {
    router.navigate({ pathname: route as any, params });
}

/**
 * Push a new route onto the navigation stack
 * @param route The route to navigate to
 * @param params Optional parameters to pass to the route
 */
export function push(route: string, params?: Record<string, any> | QueryParams): void {
    router.push({ pathname: route as any, params });
}

/**
 * Pop the specified number of screens from the navigation stack
 * @param count Number of screens to pop (defaults to 1)
 */
export function pop(count: number = 1): void {
    router.dismiss(count);
}

/**
 * Pop to the first screen in the navigation stack
 */
export function popToTop(): void {
    router.dismissAll();
}

/**
 * Go back to the previous screen
 */
export function goBack(): void {
    router.back();
}

export function pathGenerator(route: string, params?: Record<string, any>): Href {
    if (params) {
        return {
            pathname: `/${route}` as any,
            params,
        };
    }
    return `/${route}` as Href;
}

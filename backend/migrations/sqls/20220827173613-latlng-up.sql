/* Replace with your SQL commands */
ALTER TABLE public.user_info ADD lat varchar NULL;
ALTER TABLE public.user_info ADD lng varchar NULL;
ALTER TABLE public.user_info DROP COLUMN location;
/* Replace with your SQL commands */
CREATE TABLE swipe_actions(
    from_user_id int NULL,
    to_user_id int null,
    action_id int NOT NULL,
	action_time timestamp NOT NULL DEFAULT NOW()
);
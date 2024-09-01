import React from "react";

function Profile() {
	const user = JSON.parse(localStorage.getItem("user"));

	if (!user) return <div>No user data found. Please log in again.</div>;

	return (
		<div>
			<h2>User Profile</h2>
			<p>Username: {user.username}</p>
			<p>Email: {user.email}</p>
		</div>
	);
}

export default Profile;

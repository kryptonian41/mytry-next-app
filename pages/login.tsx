import Login from "components/Login";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAppSelector } from "redux-state/hooks";
import Layout from "../components/Layout";

const login = () => {
	const { user } = useAppSelector((state) => state.auth);
	const { query, push } = useRouter();

	useEffect(() => {
		const redirectRoute = (query.redirect as string) || "/";
		if (user) push(redirectRoute);
	}, [user, push, query.redirect]);

	return (
		<Layout title="Login">
			<Login />
		</Layout>
	);
};

export default login;

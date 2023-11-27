/* import { redirect } from "next/navigation";
import { refresh } from "../actions";
import { cookies } from "next/headers";

export default async function Refresh() {
    const tryRefresh = async () => {
        const user = cookies().get("user")?.value;

        if (!user)
            redirect("/login");

        const { id } = JSON.parse(user);

        const output = await refresh(id);

        console.log(output);
    }

    return await tryRefresh();
} */
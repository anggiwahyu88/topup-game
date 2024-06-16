import { createClient } from "@/utils/supabase/server";
import Content from "./Content";

const Navbar = async () => {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser();
    let response
    if (user) response = await supabase.from("user").select("role").eq("id", user?.id).single()
    return (
        <Content  user={user} isAdmin={response?.data?.role =="admin"||false}/>
    )
}

export default Navbar;
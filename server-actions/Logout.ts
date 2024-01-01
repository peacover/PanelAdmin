export const Logout = async () => {
    try {
        const res = await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.json();
        // cookies().delete(cookieName);
    }
    catch (e) {
        return { message: "logout failed" };
    }
}
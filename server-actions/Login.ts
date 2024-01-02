export const fetchLogin = async (email: string, password: string) => {
    try{
      console.log("email: ", email);
      console.log("password: ", password);
        const res = await fetch("/api/auth/signIn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        return res.json();
    }
    catch(e){
        return { message: "login failed" };
    }
};

import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

interface User {
  username: string;
  password: string;
}

let users: User[] = [];

const login = async (username: string, password: string) => {
  const genSalt: string = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, genSalt);
  users.push({ username, password: hashedPassword });
  console.log(users);
}

const register = async (username: string, password: string) => {
  
}

import bcrypt from "bcryptjs";

const password = "SATISH2468"; // apna plain password

const hashPassword = async () => {
  const hashed = await bcrypt.hash(password, 10); // 10 = salt rounds
  console.log("Hashed Password:", hashed);
};

hashPassword();

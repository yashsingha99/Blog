import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

const VITE_APPWRITE_URL = "https://cloud.appwrite.io/v1";
const VITE_APPWRITE_PROJECT_ID = "65a801b15c02044e1987";

export class AuthServices {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(VITE_APPWRITE_URL)
      .setProject(VITE_APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }

  async  handleLogin() {
    const user =  this.account.createOAuth2Session(
      "google",
      "http://localhost:5173/",
      "http://localhost:5173/login",
    );
    console.log(user);
  }

  async CreateAccount(email, password, name) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      //  only purpose of create this if else  when user create his accout then he is already login ....

      if (userAccount) {
        return this.Login(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("AuthServices :: CreateAccount :: ", error);
    }
  }

  async Login(email, password) {
    try {
      const userData = await this.account.createEmailSession(email, password);
      // dispatch(login(userData))
      return userData;
    } catch (error) {
      console.log("AuthServices :: login :: ", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async Logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("AuthServices :: logout :: ", error);
    }
  }
}

const authServices = new AuthServices();

export default authServices;
